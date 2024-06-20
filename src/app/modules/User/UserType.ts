import { USER_ROLE } from "./User.Constant";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string,
};

export type TUserRole = keyof typeof USER_ROLE;