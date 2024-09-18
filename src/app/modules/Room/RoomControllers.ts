import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { RoomServices } from "./RoomServices";


const createRoom = catchAsync(async (req,res) => {

  const result = await RoomServices.createRoomIntoDB(req.body)

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room added successfully',
    data: result,
  });

})


const getAllRooms = catchAsync(async (req,res) => {
  const filters = req.query;
  console.log('Received query parameters:', req.query);
  const result = await RoomServices.getAllRoomsFromDB(filters);

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rooms retrieved successfully',
    data: result,
  });

})

const getARoom = catchAsync(async (req,res) => {
  const { id } = req.params
  const result = await RoomServices.getARoomFromDB(id)

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room retrieved successfully',
    data: result,
  });

})


const updateRoomInfo = catchAsync(async (req,res) => {
  const { id } = req.params;
  const result = await RoomServices.updateARoomIntoDB(id, req.body)

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room updated successfully',
    data: result,
  });

})


const deleteRoom = catchAsync(async (req,res) => {
  const { id } = req.params;
  const result = await RoomServices.deleteRoom(id)

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room deleted successfully',
    data: result,
  });

})


export const RoomControllers = {
  createRoom, getAllRooms, getARoom, updateRoomInfo, deleteRoom
}