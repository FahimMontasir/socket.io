import { logger } from '../../../../shared/logger';
import { MainNspStore } from '../main.store';
import {
  IRoomConnData,
  IRoomConnDataWithSignal,
  IRoomJoinHandlerData,
  RoomEventServer,
  RoomEventSocket,
} from './room.interface';

const updateRooms = (toSpecifiedSocketId = '') => {
  const io: RoomEventServer = MainNspStore.getSocketMainNspInstance();
  const activeRooms = MainNspStore.getActiveRooms();

  if (toSpecifiedSocketId) {
    io.to(toSpecifiedSocketId).emit('activeRooms', {
      activeRooms,
    });
  } else {
    io.emit('activeRooms', {
      activeRooms,
    });
  }
};

const roomLeaveHandler = (socket: RoomEventSocket, data: { roomId: string }) => {
  const { roomId } = data;

  const activeRoom = MainNspStore.getActiveRoom(roomId);

  if (activeRoom) {
    MainNspStore.leaveActiveRoom(roomId, socket.id);

    const updatedActiveRoom = MainNspStore.getActiveRoom(roomId);

    if (updatedActiveRoom) {
      updatedActiveRoom.participants.forEach(participant => {
        socket.to(participant.socketId).emit('roomParticipantLeft', {
          connUserSocketId: socket.id,
        });
      });
    }

    updateRooms();
  }
};

const roomCreateHandler = (socket: RoomEventSocket) => {
  logger.info('handling room create event');
  const socketId = socket.id;
  const userId = socket.data.user.userId;

  const roomDetails = MainNspStore.addNewActiveRoom(userId, socketId);

  socket.emit('roomCreate', {
    roomDetails,
  });

  updateRooms();
};

const roomJoinHandler = (socket: RoomEventSocket, data: IRoomJoinHandlerData) => {
  const { roomId } = data;

  const participantDetails = {
    userId: socket.data.user.userId,
    socketId: socket.id,
  };

  const roomDetails = MainNspStore.getActiveRoom(roomId);
  MainNspStore.joinActiveRoom(roomId, participantDetails);

  if (roomDetails) {
    // send information to users in room that they should prepare for incoming connection
    roomDetails.participants.forEach(participant => {
      if (participant.socketId !== participantDetails.socketId) {
        socket.to(participant.socketId).emit('connPrepare', {
          connUserSocketId: participantDetails.socketId,
        });
      }
    });
  }

  updateRooms();
};

const roomInitializeConnectionHandler = (socket: RoomEventSocket, data: IRoomConnData) => {
  const { connUserSocketId } = data;

  const initData = { connUserSocketId: socket.id };
  socket.to(connUserSocketId).emit('connInit', initData);
};

const roomSignalingDataHandler = (socket: RoomEventSocket, data: IRoomConnDataWithSignal) => {
  const { connUserSocketId, signal } = data;

  const signalingData = { signal, connUserSocketId: socket.id };
  socket.to(connUserSocketId).emit('connSignal', signalingData);
};

export const RoomSocketService = {
  updateRooms,
  roomLeaveHandler,
  roomCreateHandler,
  roomJoinHandler,
  roomInitializeConnectionHandler,
  roomSignalingDataHandler,
};
