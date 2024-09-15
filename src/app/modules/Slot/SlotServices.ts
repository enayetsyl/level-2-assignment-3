import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { Room } from "../Room/RoomModel"
import { TSlot } from "./SlotType"
import { Slot } from "./SlotModel"


const createNewSlot = async (slotData: TSlot) => {
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
    const savedData = await newSlot.save();

    const newSaveData = savedData.toObject()

    delete newSaveData.__v;
    delete newSaveData.createdAt;
    delete newSaveData.updatedAt;

    result.push(newSaveData);

    // Move to the next hour
    currentStartTime = nextEndTime;
  }

  return result;
}



const getAvailableSlots = async () => {
  const result = await Slot.find({},{__v:0, createdAt:0, updatedAt:0}).populate({
    path: 'room',
    select: "-__v",
  })

  
  return result
  
}

const updateSlot = async (id: string, updatedSlotData: Partial<TSlot>) => {
  const result = await Slot.findByIdAndUpdate(id, updatedSlotData, {new: true, runValidators: true})

  return result
}

const deleteSlot = async(id: string) => {
  const result = await Slot.findByIdAndDelete(id)

  return result
}


export const SlotServices = {
  createNewSlot,
getAvailableSlots, updateSlot, deleteSlot
}