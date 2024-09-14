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

const updateSlot = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SlotServices.updateSlot(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot updated successfully',
    data: result,
  });
})


const deleteSlot = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SlotServices.deleteSlot(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slot deleted successfully',
    data: result,
  });
})


export const SlotControllers = {
  createSlot,getAllAvailableSlots, updateSlot, deleteSlot
}