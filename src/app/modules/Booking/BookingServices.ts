import mongoose from "mongoose";
import { Booking } from "./BookingModel"
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { TBooking } from "./BookingType";
import { Slot } from "../Slot/SlotModel";


const createBookingIntoDB = async (bookingData : TBooking) => {
    const { slots } = bookingData;

    const session = await mongoose.startSession()
    try {
      session.startTransaction();

      for (const slot of slots){
        const isSlotExist = await Slot.findById(slot).session(session)
  
        if(!isSlotExist){
          throw new AppError(httpStatus.BAD_REQUEST, "Slot does not exist.")
        }
      }
    
       // Commit and end session for successful operation
    await session.commitTransaction();
    await session.endSession();

    return slots
    } catch (error) {
      console.log(error)
      await session.abortTransaction()
      await session.endSession()
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to book slots")
    }



}


export const BookingServices = {
  createBookingIntoDB
}