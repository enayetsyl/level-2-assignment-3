import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { Room } from "../Room/RoomModel"
import { TSlot } from "./SlotType"
import { Slot } from "./SlotModel"


const createNewSlot = async (slotData: TSlot) => {
  console.log('slot data', slotData)
  const isRoomExist = await Room.findById(slotData.room)

  if(!isRoomExist){
    return new AppError(httpStatus.BAD_REQUEST, "No Room found")
  }

  let currentStartTime = new Date(`1970-01-01T${slotData.startTime}`);
  const endTime = new Date(`1970-01-01T${slotData.endTime}`);

  const result = [];

  // Check if currentStartTime is not aligned with the hour boundary
  if (currentStartTime.getMinutes() !== 0 || currentStartTime.getSeconds() !== 0) {
    // Move currentStartTime to the next hour boundary
    currentStartTime.setHours(currentStartTime.getHours() + 1);
    currentStartTime.setMinutes(0);
    currentStartTime.setSeconds(0);
  }

  // Save each time slot individually to the database
  while (currentStartTime < endTime) {
    const nextEndTime = new Date(currentStartTime);
    nextEndTime.setHours(nextEndTime.getHours() + 1);

    // Check if nextEndTime exceeds endTime, adjust it if necessary
    if (nextEndTime > endTime) {
      break; // Exit the loop if nextEndTime exceeds endTime
    }

    const slot: TSlot = {
      room: slotData.room,
      date: slotData.date,
      startTime: currentStartTime.toTimeString().slice(0, 5),
      endTime: nextEndTime.toTimeString().slice(0, 5),
      isBooked: false,
    };

    // Create a new Slot document and save it
    const newSlot = new Slot(slot);
    await newSlot.save();
    result.push(slot);

    // Move to the next hour
    currentStartTime = nextEndTime;
  }

  return result;
}



const getAvailableSlots = async () => {
  const result = await Slot.find().populate('room')
  return result.map(slot => ({
    ...slot.toObject(),
    date: slot.formattedDate 
  }));
}


export const SlotServices = {
  createNewSlot,
getAvailableSlots
}