import httpStatus from 'http-status';
import { TUser } from './UserType';
import { User } from './UserModel';


const signUpUser = async (userData: TUser) => {
  console.log('user data', userData)
  
  const result = await User.create(userData)
  
  console.log('result', result)

  return result

};

const loginUser = async () => {
  
};

export const UserServices = {
  signUpUser, loginUser
};