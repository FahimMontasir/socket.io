import { Model, Types } from 'mongoose';

export type IUser = {
  mail: string;
  username: string;
  password: string;
  friends?: Types.ObjectId[];
};

export type ICreatedUser = Partial<IUser> & {
  token: string;
  _id: Types.ObjectId;
};

export type IUserModel = Model<IUser, Record<string, unknown>>;
