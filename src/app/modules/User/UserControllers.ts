import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './UserServices';


const signUpUser = catchAsync(async (req, res) => {
 
  const result = await UserServices.signUpUser(req.body);

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  
  const result = await UserServices.loginUser()

  // Send success response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result,
  });
});

export const UserControllers = {
  signUpUser,loginUser
};