import { Schema, model } from "mongoose";
import { TSlot } from "./SlotType";


const slotModel = new Schema<TSlot>({
room:{
  type: Schema.Types.ObjectId,
  ref: "Room",
  required: [true, "Room id is required"]
}, 
date: {
type: Date, 
required: true
},
startTime: {
type: String,
required: true
},
endTime: {
  type: String,
  required: true
},
isBooked: {
type: Boolean,
default: false
}
}, {timestamps: true})

// Add a virtual property to format the date
slotModel.virtual('formattedDate').get(function() {
  const date = new Date(this.date);
  const year = date.getFullYear().toString().slice(-4); // Get last two digits of year
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month and pad with leading zero if needed
  const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
  return `${year}-${month}-${day}`;
});

// Ensure virtual fields are included when converting documents to JSON
slotModel.set('toJSON', { virtuals: true });

export const Slot = model<TSlot>("Slot", slotModel)