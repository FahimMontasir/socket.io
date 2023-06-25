import { Namespace, Socket } from 'socket.io';

type ServerToClientEvents = {
  leaderBoard: (history: { id: number; text: string; position: number }[]) => void;
};

type ClientToServerEvents = {
  upvote: (id: number) => void;
};

type InterServerEvents = {
  ping: () => void;
};

type SocketData = {
  token: string;
};

export type LeaderBoardServer = Namespace<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type LeaderBoardSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
