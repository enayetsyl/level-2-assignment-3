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
  const result = await Room.findById(id)

  return result
}

const updateARoomIntoDB = async (id : string, updatedRoomData : Partial<TRoom>) => {
  const result = await Room.findByIdAndUpdate(id, updatedRoomData, {new: true, runValidators: true})

  return result
}

const deleteRoom = async (id: string) => {
  const result = await Room.findByIdAndDelete(id)

  return result
}





export const RoomServices = {
  createRoomIntoDB, getAllRoomsFromDB, getARoomFromDB, updateARoomIntoDB, deleteRoom
}