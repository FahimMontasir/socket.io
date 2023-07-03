import { Model, Types } from 'mongoose';

export type IConversation = {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
};

export type IConversationModel = Model<IConversation, Record<string, unknown>>;
