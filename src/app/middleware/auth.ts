import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/User/UserType";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from "../config";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from "../modules/User/UserModel";


const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization

    token = token?.split(" ")[1]
    console.log('token', token)

    if(!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized")
    }

    const decoded = jwt.verify(
      token, config.jwt_access_secret as string,
    )

    console.log('decoded', decoded)

    const { role, email } = decoded;

    const user = await User.findOne({email})

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }

    req.user = decoded as JwtPayload

    next();

  })
}

export default auth