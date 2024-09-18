import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./BookingServices";
import { verifyToken } from "../../utils/authUtils";
import config from "../../config";

const createBooking = catchAsync(async(req,res) => {
  
  
  const result = await BookingServices.createBookingIntoDB(req.body)
  console.log('Booking route called at', new Date().toISOString());
  
  console.log('result in create booking controller', result)
// Send success response
sendResponse(res, {
  success: true,
  statusCode: httpStatus.OK,
  message: 'Booking created successfully',
  data: result,
});
})

const getAvailableSlotsForBooking = catchAsync(async (req,res) => {
 

  const { roomId } = req.params
  const result = await BookingServices.getAvailableSlotsForBooking(roomId)

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: result,
  });
})

const getMyBooking = catchAsync(async(req,res) => {
  let token = req.headers.authorization

  token = token?.split(' ')[1]

  const decoded = verifyToken(token as string, config.jwt_access_secret as string)

  const {email} = decoded

  const result = await BookingServices.getUserBooking(email)

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
getAvailableSlotsForBooking
}

