import mongoose from "mongoose";
import { Booking } from "./BookingModel";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TBooking } from "./BookingType";
import { Slot } from "../Slot/SlotModel";
import { User } from "../User/UserModel";
import { Room } from "../Room/RoomModel";

type TBookingData = {
  roomId: string;
  slotId: string;
  userId: string;
  paymentIntentId: string;
}

const createBookingIntoDB = async (bookingData: TBookingData) => {
  const { roomId, slotId, userId } = bookingData;

  let totalAmount = 0;

 

  // Verify Room
  const isRoomExist = await Room.findById(roomId);
  if (!isRoomExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No room exists for this ID.');
  }

  
  totalAmount += isRoomExist.pricePerSlot;

  // Attempt to book the slot atomically
  const result = await Slot.updateOne(
    { _id: slotId, isBooked: false },
    { $set: { isBooked: true } }
  );

  // console.log('is book result', result)

  // if (result.modifiedCount === 0) {
  //   console.log('error is throwing in modified count')
  //   throw new AppError(httpStatus.BAD_REQUEST, 'Slot is already booked.');
  // }
  // console.log('modified count passed')
  // Create the booking
  const newBookingData = new Booking({
    room: roomId,
    slots: [slotId],
    user: userId,
    date: new Date(),
    totalAmount: totalAmount,
    isConfirmed: 'unconfirmed',
  });

  const booking = await newBookingData.save();

  // Populate booking data
  const populatedBooking = await Booking.findById(booking._id)
    .populate('room')
    .populate('slots')
    .populate('user');

  return populatedBooking;
};


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

const getAvailableSlotsForBooking = async (id: string) => {
  const result = await Slot.find({ isBooked: false, room:id  }, { __v: 0, createdAt: 0, updatedAt: 0 })

  return result;
}


const getAllBookingsFromDB = async () => {
  const result = await Booking.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })
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
};

const getUserBooking = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await Booking.find(
    { user: user?._id },
    { user: 0, createdAt: 0, updatedAt: 0, __v: 0 }
  )
    .populate({
      path: "slots",
      select: "-__v -updatedAt -createdAt",
    })
    .populate({
      path: "room",
      select: "-__v",
    });

  return result;
};

const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  const result = await Booking.findByIdAndUpdate(id, payload, {
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
};

const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (result) {
    const updatedBookingResult = result.toObject();

    delete updatedBookingResult.__v;
    delete updatedBookingResult.createdAt;
    delete updatedBookingResult.updatedAt;

    return updatedBookingResult;
  }

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBooking,
  updateBookingIntoDB,
  deleteBookingFromDB,
  getAvailableSlotsForBooking,
};
