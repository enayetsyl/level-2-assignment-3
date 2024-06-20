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
    const {userId} = req.params

    const result = await BookingServices.getUserBooking(userId)

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully',
    data: result,
  });
})
const getAllBookings = catchAsync(async(req,res) => {
  const result = await BookingServices.getAllBookingsFromDB()

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All bookings retrieved successfully',
    data: result,
  });
})
const updateABooking = catchAsync(async(req,res) => {
  const { id } = req.params;
  const result = await BookingServices.updateBookingIntoDB(id, req.body)
  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking updated successfully',
    data: result,
  });
})

const deleteABooking = catchAsync(async(req,res) => {
  const { id } = req.params
  const result = await BookingServices.deleteBookingFromDB(id)
  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking deleted successfully',
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