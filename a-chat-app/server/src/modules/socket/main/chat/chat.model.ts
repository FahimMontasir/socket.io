import { Schema, model } from 'mongoose';
import { IConversation, IConversationModel, IMessage, IMessageModel } from './chat.interface';

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

// ----------------------------------------------
const conversationSchema = new Schema<IConversation>({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

export const Conversation = model<IConversation, IConversationModel>(
  'Conversation',
  conversationSchema
);
