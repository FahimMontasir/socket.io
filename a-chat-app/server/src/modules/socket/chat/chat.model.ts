import { Schema, model } from 'mongoose';
import { IChatUser, IChatUserModel } from './chat.interface';

const chatUserSchema = new Schema<IChatUser>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const ChatUser = model<IChatUser, IChatUserModel>('ChatUser', chatUserSchema);
