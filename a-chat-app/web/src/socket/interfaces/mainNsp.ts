import { Socket } from "socket.io-client";

export type User = {
  userID: string;
  username: string;
};
type PrivateMessage = {
  content: string;
  to: string;
};
type PrivateMessageFromServer = {
  content: string;
  from: string;
};

type ServerToClientEvents = {
  privateMessage: (privateMessage: PrivateMessageFromServer) => void;
  users: (users: User[]) => void;
  userConnected: (user: User) => void;
  chatHistory: (history: { text: string; date: Date }[]) => void;
};

type ClientToServerEvents = {
  privateMessage: (privateMessage: PrivateMessage) => void;
  chatText: (text: string) => void;
  chatUser: (
    payload: { id: number; name: string },
    callback: (message: string) => void
  ) => void;
};

export type MainNspEvents = Socket<ServerToClientEvents, ClientToServerEvents>;
