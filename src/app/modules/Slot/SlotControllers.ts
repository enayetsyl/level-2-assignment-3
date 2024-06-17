import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./SlotServices";

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createNewSlot(req.body);

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created  successfully',
    data: result,
  });
}
)

const getAllAvailableSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAvailableSlots();

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: result,
  });
})




export const SlotControllers = {
  createSlot,getAllAvailableSlots
}