import { Namespace, Socket } from 'socket.io';
import { DecodedUser } from '../../../../interfaces/user';
import { IActiveRoom } from '../main.interface';

export type IRoomJoinHandlerData = {
  roomId: string;
};

export type IRoomConnData = { connUserSocketId: string };
export type IRoomConnDataWithSignal = IRoomConnData & { signal: string };

type ServerToClientEvents = {
  activeRooms: ({ activeRooms }: { activeRooms: IActiveRoom[] }) => void;
  roomParticipantLeft: ({ connUserSocketId }: { connUserSocketId: string }) => void;
  roomCreate: ({ roomDetails }: { roomDetails: IActiveRoom }) => void;
  connPrepare: (connUserSocketId: IRoomConnData) => void;
  connInit: (initData: IRoomConnData) => void;
  connSignal: (signalingData: IRoomConnDataWithSignal) => void;
};

type ClientToServerEvents = {
  roomCreate: () => void;
  roomJoin: (data: IRoomJoinHandlerData) => void;
  roomLeave: (data: IRoomJoinHandlerData) => void;
  connInit: (data: IRoomConnData) => void;
  connSignal: (data: IRoomConnDataWithSignal) => void;
};

type InterServerEvents = {
  // ping: () => void;
};

type SocketData = {
  user: DecodedUser;
};

export type RoomEventServer = Namespace<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type RoomEventSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
