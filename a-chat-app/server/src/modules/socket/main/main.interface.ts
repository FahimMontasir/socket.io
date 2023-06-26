import { Model } from 'mongoose';
import { Namespace, Socket } from 'socket.io';

export type User = {
  userID: string;
  username: string;
};

type ServerToClientEvents = {
  users: (users: User[]) => void;
  userConnected: (user: User) => void;
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
  username: string;
};

export type MainServer = Namespace<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type MainSocket = Socket<
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
