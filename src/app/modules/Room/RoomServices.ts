import mongoose from "mongoose"
import { Room } from "./RoomModel"
import { TRoom } from "./RoomType"


const createRoomIntoDB = async (roomData: TRoom ) => {
  
  const result = await Room.create(roomData)

  return result
}

const getAllRoomsFromDB = async (filters: any) => {
  let queryObject: any = {};
  let sortOption: any = {};

  const { name, capacity, maxPrice, sortBy, sortOrder } = filters;

  // Filters
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (capacity) {
    queryObject.capacity = { $gte: Number(capacity) };
  }

  if (maxPrice) {
    queryObject.pricePerSlot = { $lte: Number(maxPrice) };
  }

  // Sort Options
  if (sortBy) {
    const sortField = sortBy;
    const sortOrderValue = sortOrder === "desc" ? -1 : 1;
    sortOption[sortField] = sortOrderValue;
  }

  const result = await Room.find(queryObject).sort(sortOption);

  return result;
};

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