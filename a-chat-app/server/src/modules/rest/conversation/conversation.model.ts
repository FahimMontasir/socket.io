import { Schema, model } from 'mongoose';
import { IConversation, IConversationModel } from './conversation.interface';

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
