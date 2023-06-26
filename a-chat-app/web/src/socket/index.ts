import { ManagerOptions, SocketOptions, io } from "socket.io-client";
import { MainNspEvents } from "./interfaces/mainNsp";
import { LeaderBoardNspEvents } from "./interfaces/leaderBoardNsp";

const URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:5000"
    : "http://localhost:5000";

// main nsp
const MAIN_NSP_OPTIONS: Partial<ManagerOptions & SocketOptions> = {
  autoConnect: false,
};

export const mainNsp: MainNspEvents = io(URL, MAIN_NSP_OPTIONS);

// leaderBoard nsp
const LEADER_BOARD_NSP_OPTIONS: Partial<ManagerOptions & SocketOptions> = {
  autoConnect: false,
};

export const leaderBoardNsp: LeaderBoardNspEvents = io(
  `${URL}/leader-board`,
  LEADER_BOARD_NSP_OPTIONS
);
