import { Namespace, Socket } from 'socket.io';
import { DecodedUser } from '../../../../interfaces/user';

export type IDirectMessageData = {
  receiverUserId: string;
  content: string;
};

type IChatHistoryData = {
  messages: Types.ObjectId[];
  participants: Types.ObjectId[];
};

type ServerToClientEvents = {
  directChatHistory: ({ messages, participants }: IChatHistoryData) => void;
};

type ClientToServerEvents = {
  directMessage: (data: IDirectMessageData) => void;
  directChatHistory: (data: IDirectMessageData) => void;
};

type InterServerEvents = {
  // ping: () => void;
};

type SocketData = {
  user: DecodedUser;
};

export type ChatEventServer = Namespace<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type ChatEventSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

//---------models----------

import { Model, Types } from 'mongoose';

export type IMessage = {
  author: Types.ObjectId;
  content: string;
  date: Date;
  type: string;
};

export type IMessageModel = Model<IMessage, Record<string, unknown>>;

export type IConversation = {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
};

export type IConversationModel = Model<IConversation, Record<string, unknown>>;
