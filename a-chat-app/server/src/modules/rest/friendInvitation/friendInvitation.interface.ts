import { Model, Types } from 'mongoose';

export type IFriendInvitation = {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
};

export type IInvite = {
  targetMailAddress: string;
};

export type IFriendInvitationModel = Model<IFriendInvitation, Record<string, unknown>>;
