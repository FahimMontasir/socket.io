import { Socket } from "socket.io-client";

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
  chatUser: (
    payload: { id: number; name: string },
    callback: (message: string) => void
  ) => void;
};

export type MainNspEvents = Socket<ServerToClientEvents, ClientToServerEvents>;
