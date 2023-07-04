export type IConStoredUser = { socketId: string; userId: string };

export type IActiveRoom = {
  roomCreator: IConStoredUser;
  participants: IConStoredUser[];
  roomId: string;
};
