import { ManagerOptions, SocketOptions, io } from "socket.io-client";
import { LeaderBoardNspEvents } from "./interface";

const URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:5000"
    : "http://localhost:5000";

// leaderBoard nsp
const LEADER_BOARD_NSP_OPTIONS: Partial<ManagerOptions & SocketOptions> = {
  autoConnect: false,
};

export const leaderBoardNsp: LeaderBoardNspEvents = io(
  `${URL}/leader-board`,
  LEADER_BOARD_NSP_OPTIONS
);
