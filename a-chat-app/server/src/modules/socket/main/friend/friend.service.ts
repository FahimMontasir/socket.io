import { errorLogger } from '../../../../shared/logger';
import { FriendInvitation } from '../../../rest/friendInvitation/friendInvitation.model';
import { User } from '../../../rest/user/user.model';
import { MainNspStore } from '../main.store';
import { UserEventServer } from '../user/user.interface';

const updateFriendsPendingInvitations = async (userId: string): Promise<void> => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username mail');

    // find all active connections of specific userId
    const receiverList = MainNspStore.getActiveConnections(userId);

    // to get socket server in rest api route as well
    const io: UserEventServer = MainNspStore.getSocketMainNspInstance();
    receiverList.forEach(receiverSocketId => {
      io.to(receiverSocketId).emit('friendsInvitations', {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (err) {
    errorLogger.error(err);
  }
};

const updateFriends = async (userId: string) => {
  try {
    // find active connections of specific id (online users)
    const receiverList = MainNspStore.getActiveConnections(userId);

    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        'friends',
        '_id username mail'
      );

      if (user?.friends) {
        const friendsList = user.friends.map((f: any) => {
          return {
            id: f._id,
            mail: f.mail,
            username: f.username,
          };
        });

        const io: UserEventServer = MainNspStore.getSocketMainNspInstance();
        receiverList.forEach(receiverSocketId => {
          io.to(receiverSocketId).emit('friendsList', {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (err) {
    errorLogger.error(err);
  }
};

export const FriendSocketService = {
  updateFriendsPendingInvitations,
  updateFriends,
};
