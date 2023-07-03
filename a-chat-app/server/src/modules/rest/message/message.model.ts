import { Schema, model } from 'mongoose';
import { IMessage, IMessageModel } from './message.interface';

const messageSchema = new Schema<IMessage>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  content: { type: String },
  date: { type: Date },
  type: { type: String },
});

export const Message = model<IMessage, IMessageModel>('Message', messageSchema);
