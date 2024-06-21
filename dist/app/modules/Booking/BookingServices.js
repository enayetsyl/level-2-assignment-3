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
const mongoose_1 = __importDefault(require("mongoose"));
const BookingModel_1 = require("./BookingModel");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const SlotModel_1 = require("../Slot/SlotModel");
const UserModel_1 = require("../User/UserModel");
const RoomModel_1 = require("../Room/RoomModel");
const createBookingIntoDB = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    const { slots, room, user, date } = bookingData;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        let totalAmount = 0;
        const isUserExist = yield UserModel_1.User.findById(user);
        if (!isUserExist) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "No user exist for this id.");
        }
        const isRoomExist = yield RoomModel_1.Room.findById(room);
        if (!isRoomExist) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "No room exist for this id.");
        }
        for (const slot of slots) {
            const isSlotExist = yield SlotModel_1.Slot.findById(slot).session(session);
            if (!isSlotExist || isSlotExist.isBooked === true) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Slot does not exist / Slot is already booked.");
            }
            if ((isSlotExist === null || isSlotExist === void 0 ? void 0 : isSlotExist.room.toString()) !== room) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Room does not match with slot id.");
            }
            totalAmount += isRoomExist === null || isRoomExist === void 0 ? void 0 : isRoomExist.pricePerSlot;
            yield SlotModel_1.Slot.findByIdAndUpdate(slot, { isBooked: true }, { session });
        }
        const newBookingData = new BookingModel_1.Booking({
            room,
            slots,
            user,
            date,
            totalAmount,
            isConfirmed: "unconfirmed",
        });
        const booking = yield newBookingData.save({ session });
        const populatedBooking = yield BookingModel_1.Booking.findById(booking._id)
            .session(session)
            .populate("room")
            .populate("slots")
            .populate("user");
        // Commit and end session for successful operation
        yield session.commitTransaction();
        yield session.endSession();
        return populatedBooking;
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to book slots");
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookingModel_1.Booking.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })
        .populate({
        path: "user",
        select: "-__v -createdAt -updatedAt"
    })
        .populate({
        path: "slots",
        select: "-__v -createdAt -updatedAt"
    })
        .populate({
        path: "room",
        select: "-__v"
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
        select: "-__v -updatedAt -createdAt"
    })
        .populate({
        path: "room",
        select: "-__v"
    });
    return result;
});
const updateBookingIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookingModel_1.Booking.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
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
    updateBookingIntoDB, deleteBookingFromDB
};
