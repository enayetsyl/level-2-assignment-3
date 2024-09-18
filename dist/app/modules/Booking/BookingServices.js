"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const BookingModel_1 = require("./BookingModel");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const SlotModel_1 = require("../Slot/SlotModel");
const UserModel_1 = require("../User/UserModel");
const RoomModel_1 = require("../Room/RoomModel");
const createBookingIntoDB = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const { roomId, slotId, userId } = bookingData;
    let totalAmount = 0;
    // Verify Room
    const isRoomExist = yield RoomModel_1.Room.findById(roomId);
    if (!isRoomExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'No room exists for this ID.');
    }
    totalAmount += isRoomExist.pricePerSlot;
    // Attempt to book the slot atomically
    const result = yield SlotModel_1.Slot.updateOne({ _id: slotId, isBooked: false }, { $set: { isBooked: true } });
    // console.log('is book result', result)
    // if (result.modifiedCount === 0) {
    //   console.log('error is throwing in modified count')
    //   throw new AppError(httpStatus.BAD_REQUEST, 'Slot is already booked.');
    // }
    // console.log('modified count passed')
    // Create the booking
    const newBookingData = new BookingModel_1.Booking({
        room: roomId,
        slots: [slotId],
        user: userId,
        date: new Date(),
        totalAmount: totalAmount,
        isConfirmed: 'unconfirmed',
    });
    const booking = yield newBookingData.save();
    // Populate booking data
    const populatedBooking = yield BookingModel_1.Booking.findById(booking._id)
        .populate('room')
        .populate('slots')
        .populate('user');
    return populatedBooking;
});
// earlier schema
// const createBookingIntoDB = async (bookingData: TBooking) => {
//   const { slots, room, user, date } = bookingData;
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     let totalAmount = 0;
//     const isUserExist = await User.findById(user);
//     if (!isUserExist) {
//       throw new AppError(httpStatus.BAD_REQUEST, "No user exist for this id.");
//     }
//     const isRoomExist = await Room.findById(room);
//     if (!isRoomExist) {
//       throw new AppError(httpStatus.BAD_REQUEST, "No room exist for this id.");
//     }
//     for (const slot of slots) {
//       const isSlotExist = await Slot.findById(slot).session(session);
//       if (!isSlotExist || isSlotExist.isBooked === true) {
//         throw new AppError(
//           httpStatus.BAD_REQUEST,
//           "Slot does not exist / Slot is already booked."
//         );
//       }
//       if (isSlotExist?.room.toString() !== room) {
//         throw new AppError(
//           httpStatus.BAD_REQUEST,
//           "Room does not match with slot id."
//         );
//       }
//       totalAmount += isRoomExist?.pricePerSlot;
//       await Slot.findByIdAndUpdate(slot, { isBooked: true }, { session });
//     }
//     const newBookingData = new Booking({
//       room,
//       slots,
//       user,
//       date,
//       totalAmount,
//       isConfirmed: "unconfirmed",
//     });
//     const booking = await newBookingData.save({ session });
//     const populatedBooking = await Booking.findById(booking._id)
//       .session(session)
//       .populate("room")
//       .populate("slots")
//       .populate("user");
//     // Commit and end session for successful operation
//     await session.commitTransaction();
//     await session.endSession();
//     return populatedBooking;
//   } catch (error) {
//     console.log(error);
//     await session.abortTransaction();
//     await session.endSession();
//     throw new AppError(httpStatus.BAD_REQUEST, "Failed to book slots");
//   }
// };
const getAvailableSlotsForBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SlotModel_1.Slot.find({ isBooked: false, room: id }, { __v: 0, createdAt: 0, updatedAt: 0 });
    return result;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookingModel_1.Booking.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })
        .populate({
        path: "user",
        select: "-__v -createdAt -updatedAt",
    })
        .populate({
        path: "slots",
        select: "-__v -createdAt -updatedAt",
    })
        .populate({
        path: "room",
        select: "-__v",
    });
    return result;
});
const getUserBooking = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield BookingModel_1.Booking.find({ user: user === null || user === void 0 ? void 0 : user._id }, { user: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        .populate({
        path: "slots",
        select: "-__v -updatedAt -createdAt",
    })
        .populate({
        path: "room",
        select: "-__v",
    });
    return result;
});
const updateBookingIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookingModel_1.Booking.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (result) {
        const updatedBookingResult = result.toObject();
        delete updatedBookingResult.__v;
        delete updatedBookingResult.createdAt;
        delete updatedBookingResult.updatedAt;
        return updatedBookingResult;
    }
    return result;
});
const deleteBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookingModel_1.Booking.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (result) {
        const updatedBookingResult = result.toObject();
        delete updatedBookingResult.__v;
        delete updatedBookingResult.createdAt;
        delete updatedBookingResult.updatedAt;
        return updatedBookingResult;
    }
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getUserBooking,
    updateBookingIntoDB,
    deleteBookingFromDB,
    getAvailableSlotsForBooking,
};
