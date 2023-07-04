import { Schema, model } from 'mongoose';
import { IFriendInvitation, IFriendInvitationModel } from './friendInvitation.interface';

const friendInvitationSchema = new Schema<IFriendInvitation>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const FriendInvitation = model<IFriendInvitation, IFriendInvitationModel>(
  'FriendInvitation',
  friendInvitationSchema
);
