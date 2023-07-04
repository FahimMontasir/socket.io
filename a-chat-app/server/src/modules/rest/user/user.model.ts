import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    mail: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const User = model<IUser, IUserModel>('User', userSchema);
