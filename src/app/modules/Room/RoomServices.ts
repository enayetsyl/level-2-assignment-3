import mongoose from "mongoose"
import { Room } from "./RoomModel"
import { TRoom } from "./RoomType"


const createRoomIntoDB = async (roomData: TRoom ) => {
  
  const result = await Room.create(roomData)

  return result
}

const getAllRoomsFromDB = async () => {
  const result = await Room.find()

  return result
}

const getARoomFromDB = async (id: string) => {
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error('Invalid Room ID format:', id);
  }
  const result = await Room.findById(id)
  console.log(result)
  return result
}

const updateARoomIntoDB = async (id : string, updatedRoomData : Partial<TRoom>) => {
  const result = await Room.findByIdAndUpdate(id, updatedRoomData, {new: true, runValidators: true})
  console.log('result', result)
  return result
}

const deleteRoom = async (id: string) => {
  const result = await Room.findByIdAndDelete(id)

  return result
}





export const RoomServices = {
  createRoomIntoDB, getAllRoomsFromDB, getARoomFromDB, updateARoomIntoDB, deleteRoom
}