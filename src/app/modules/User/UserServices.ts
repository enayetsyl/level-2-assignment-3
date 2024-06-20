import httpStatus from 'http-status';
import { TUser } from './UserType';
import { TLoginUser, User } from './UserModel';
import AppError from '../../errors/AppError';
import bcrypt from 'bcrypt';
import { createToken } from '../../utils/authUtils';
import config from '../../config';

const signUpUser = async (userData: TUser) => {
  
  const result = await User.create(userData)

  if(result){
    const editedResult = result.toObject()

    delete editedResult.__v;
    delete editedResult.createdAt;
    delete editedResult.updatedAt;

    return editedResult    
  } 
  

  return result

};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({email: payload.email})

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isPasswordMatched = await bcrypt.compare( payload.password, user.password)



  if (!isPasswordMatched){
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role
  }

  let accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string)

  if(user){
    const editedUser = user.toObject()

    delete editedUser.__v;
    delete editedUser.createdAt;
    delete editedUser.updatedAt;

    return editedUser
  }

  // accessToken = `Bearer ${accessToken}`
  return {accessToken, user}

};

export const UserServices = {
  signUpUser, loginUser
};