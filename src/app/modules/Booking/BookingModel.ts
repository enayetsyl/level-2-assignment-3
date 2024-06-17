import { Schema, model } from "mongoose";
import { TBooking } from "./BookingType";


const bookingModel = new Schema<TBooking>({
  room:{
    type: Schema.Types.ObjectId,
    required: true
  },
  slots:{
    type:[Schema.Types.ObjectId],
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    required: true
  },
  date:{
    type: Date,
    required: true,
  },
  totalAmount:{
    type: Number
    },
  isConfirmed:{
    type: String,
    enum: ["confirmed", "unconfirmed", "canceled"]
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
}, {timestamps: true })

export const Booking = model<TBooking>('Booking', bookingModel)