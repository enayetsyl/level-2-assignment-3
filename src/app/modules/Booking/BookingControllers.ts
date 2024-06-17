import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./BookingServices";

const createBooking = catchAsync(async(req,res) => {
  const result = await BookingServices.createBookingIntoDB(req.body)

// Send success response
sendResponse(res, {
  success: true,
  statusCode: httpStatus.OK,
  message: 'Booking created successfully',
  data: result,
});
})
const getMyBooking = catchAsync(async(req,res) => {
  
  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created  successfully',
    data: result,
  });
})
const getAllBookings = catchAsync(async(req,res) => {
  
  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created  successfully',
    data: result,
  });
})
const updateABooking = catchAsync(async(req,res) => {
  
  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created  successfully',
    data: result,
  });
})
const deleteABooking = catchAsync(async(req,res) => {
  
  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created  successfully',
    data: result,
  });
})


export const BookingControllers = {
createBooking,
getMyBooking,
getAllBookings,
updateABooking,
deleteABooking,
}