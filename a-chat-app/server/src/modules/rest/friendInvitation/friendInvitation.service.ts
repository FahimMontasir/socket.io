import ApiError from '../../../errors/ApiError';
import { DecodedUser } from '../../../interfaces/user';
import { User } from '../user/user.model';
import { IInvite } from './friendInvitation.interface';
import { FriendInvitation } from './friendInvitation.model';

const invite = async (body: IInvite, decodedUser: DecodedUser): Promise<string | null> => {
  const { targetMailAddress } = body;
  const { userId, mail } = decodedUser;

  // check if friend that we would like to invite is not you
  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    throw new ApiError(409, 'Sorry. You cannot become friend with yourself');
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    throw new ApiError(
      404,
      `Friend of ${targetMailAddress} has not been found. Please check mail address.`
    );
  }

  // check if invitation has been already sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });
  if (invitationAlreadyReceived) {
    throw new ApiError(409, 'Invitation has been already sent');
  }

  // check if the user whom we would like to invite is already our friend
  const usersAlreadyFriends =
    targetUser.friends &&
    targetUser.friends.find(friendId => friendId.toString() === userId.toString());
  if (usersAlreadyFriends) {
    throw new ApiError(409, 'Friend already added. Please check friends list');
  }

  // create new invitation in database
  await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // if invitation has been successfully created we would like to update friends invitations if other user is online
  // send pending invitations update to specific user
  // friendsUpdates.updateFriendsPendingInvitations(targetUser._id.toString());

  return 'Invitation has been sent';
};

const accept = async (body: { id: string }): Promise<string | null> => {
  const { id } = body;

  const invitation = await FriendInvitation.findById(id);

  if (!invitation) {
    throw new ApiError(401, 'Invitation not found. Please try again!');
  }

  const { senderId, receiverId } = invitation;

  // add friends to both users
  const senderUser = await User.findById(senderId);
  if (!senderUser) {
    throw new ApiError(404, 'Sender user not found!!');
  }
  if (senderUser.friends) {
    senderUser.friends = [...senderUser.friends, receiverId];
  } else {
    senderUser.friends = [receiverId];
  }

  const receiverUser = await User.findById(receiverId);
  if (!receiverUser) {
    throw new ApiError(404, 'Receiver user not found!!');
  }
  if (receiverUser.friends) {
    receiverUser.friends = [...receiverUser.friends, senderId];
  } else {
    receiverUser.friends = [senderId];
  }

  // todo: add mongoose transaction here
  await senderUser.save();
  await receiverUser.save();

  // delete invitation
  await FriendInvitation.findByIdAndDelete(id);

  // update list of the friends if the users are online
  // friendsUpdates.updateFriends(senderId.toString());
  // friendsUpdates.updateFriends(receiverId.toString());

  // update list of friends pending invitations
  // friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());

  return 'Friend successfully added';
};

const reject = async (body: { id: string }, decodedUser: DecodedUser): Promise<string | null> => {
  const { id } = body;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userId } = decodedUser; // need for socket io

  // remove that invitation from friend invitations collection
  const invitationExists = await FriendInvitation.exists({ _id: id });
  if (!invitationExists) {
    throw new ApiError(404, 'Invitation already deleted!!!');
  }

  await FriendInvitation.findByIdAndDelete(id);

  // update pending invitations socket
  // friendsUpdates.updateFriendsPendingInvitations(userId);

  return 'Invitation successfully rejected';
};

export const FriendInvitationService = {
  invite,
  accept,
  reject,
};
