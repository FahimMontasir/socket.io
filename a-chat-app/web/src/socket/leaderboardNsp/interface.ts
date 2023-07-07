import { Socket } from "socket.io-client";

type ServerToClientEvents = {
  leaderBoard: (
    history: { id: number; text: string; position: number }[]
  ) => void;
};

type ClientToServerEvents = {
  upvote: (id: number) => void;
};

export type LeaderBoardNspEvents = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;
