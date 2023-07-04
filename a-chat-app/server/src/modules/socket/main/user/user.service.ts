import { FriendSocketService } from '../friend/friend.service';
import { MainNspStore } from '../main.store';
import { RoomSocketService } from '../room/room.service';
import { UserEventServer, UserEventSocket } from './user.interface';

const emitOnlineUsers = (io: UserEventServer) => {
  const onlineUsers = MainNspStore.getOnlineUsers();
  io.emit('onlineUsers', { onlineUsers });
};

const newConnectionHandler = async (socket: UserEventSocket) => {
  const userDetails = socket.data.user;

  MainNspStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update pending friends invitations list
  await FriendSocketService.updateFriendsPendingInvitations(userDetails.userId);

  // update friends list
  await FriendSocketService.updateFriends(userDetails.userId);

  setTimeout(() => {
    RoomSocketService.updateRooms(socket.id);
  }, 500);
};

const disconnectHandler = (socket: UserEventSocket) => {
  const activeRooms = MainNspStore.getActiveRooms();

  activeRooms.forEach(activeRoom => {
    const userInRoom = activeRoom.participants.some(
      participant => participant.socketId === socket.id
    );

    if (userInRoom) {
      RoomSocketService.roomLeaveHandler(socket, { roomId: activeRoom.roomId });
    }
  });

  MainNspStore.removeConnectedUser(socket.id);
};

export const UserSocketService = {
  emitOnlineUsers,
  newConnectionHandler,
  disconnectHandler,
};
