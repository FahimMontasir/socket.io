import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';

type ServerToClientEvents = {
  chatHistory: (history: { text: string; date: Date }[]) => void;
};

type ClientToServerEvents = {
  chatText: (text: string) => void;
  chatUser: (payload: { id: number; name: string }, callback: (message: string) => void) => void;
};

type InterServerEvents = {
  ping: () => void;
};

type SocketData = {
  token: string;
};

export type ChatServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type ChatSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

// ------------ model------------

export type IChatUser = {
  id: number;
  name: string;
};

export type IChatUserModel = Model<IChatUser, Record<string, unknown>>;
