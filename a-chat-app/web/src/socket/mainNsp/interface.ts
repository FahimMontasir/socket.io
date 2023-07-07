import { Socket } from "socket.io-client";

//user
type IFriends = {
  id: string;
  mail: string;
  username: string;
}[];

//chat
type IDirectMessageData = {
  receiverUserId: string;
  content: string;
};
type IChatHistoryData = {
  messages: string[];
  participants: string[];
};

// room
type IRoomJoinHandlerData = {
  roomId: string;
};
type IConStoredUser = { socketId: string; userId: string };
type IRoomConnData = { connUserSocketId: string };
type IRoomConnDataWithSignal = IRoomConnData & { signal: string };
export type IActiveRoom = {
  roomCreator: IConStoredUser;
  participants: IConStoredUser[];
  roomId: string;
};

type ServerToClientEvents = {
  //user
  onlineUsers: ({ onlineUsers }: { onlineUsers: IConStoredUser[] }) => void;
  friendsInvitations: ({
    pendingInvitations,
  }: {
    pendingInvitations: any[] | [];
  }) => void;
  friendsList: ({ friends }: { friends: IFriends }) => void;
  //chat
  directChatHistory: ({ messages, participants }: IChatHistoryData) => void;
  //room
  activeRooms: ({ activeRooms }: { activeRooms: IActiveRoom[] }) => void;
  roomParticipantLeft: ({
    connUserSocketId,
  }: {
    connUserSocketId: string;
  }) => void;
  roomCreate: ({ roomDetails }: { roomDetails: IActiveRoom }) => void;
  connPrepare: (connUserSocketId: IRoomConnData) => void;
  connInit: (initData: IRoomConnData) => void;
  connSignal: (signalingData: IRoomConnDataWithSignal) => void;
};

type ClientToServerEvents = {
  //chat
  directMessage: (data: IDirectMessageData) => void;
  directChatHistory: (data: IDirectMessageData) => void;
  //room
  roomCreate: () => void;
  roomJoin: (data: IRoomJoinHandlerData) => void;
  roomLeave: (data: IRoomJoinHandlerData) => void;
  connInit: (data: IRoomConnData) => void;
  connSignal: (data: IRoomConnDataWithSignal) => void;
};

export type MainNspEvents = Socket<ServerToClientEvents, ClientToServerEvents>;
