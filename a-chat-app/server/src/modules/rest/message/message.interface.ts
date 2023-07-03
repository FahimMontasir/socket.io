import { Model, Types } from 'mongoose';

export type IMessage = {
  author: Types.ObjectId;
  content: string;
  date: Date;
  type: string;
};

export type IMessageModel = Model<IMessage, Record<string, unknown>>;
