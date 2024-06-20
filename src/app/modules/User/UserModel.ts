import { Schema, model } from 'mongoose';
import { TUser } from './UserType';
import bcrypt from 'bcrypt';
import config from '../../config';


const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
    address: {
      type: String,
      required: true,
    }
  },
  // {
  //   timestamps: true,
  // },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    // hashing password and save into DB
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  }
  next();
});

// userSchema.pre('save', async function (next) {

//   const user = this; 
//   // hashing password and save into DB
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


export const User = model<TUser>('User', userSchema);


export type TLoginUser = {
  email: string;
  password: string;
}