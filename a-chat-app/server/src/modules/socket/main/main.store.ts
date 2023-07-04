import { Namespace } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { IActiveRoom, IConStoredUser } from './main.interface';
import { logger } from '../../../shared/logger';

// ----------in memory storage-------------
const connectedUsers = new Map<string, { userId: string }>();
let activeRooms: IActiveRoom[] = [];
let mainNspIO: Namespace;

const setSocketMainNspInstance = (ioInstance: Namespace) => {
  mainNspIO = ioInstance;
};

const getSocketMainNspInstance = () => {
  return mainNspIO;
};

// ------------------user-------------------
const addNewConnectedUser = ({ socketId, userId }: IConStoredUser) => {
  connectedUsers.set(socketId, { userId });

  logger.info(`new connected user: ${{ socketId, userId }}`);
  logger.info(`all connected users: ${connectedUsers}`);
};

const removeConnectedUser = (socketId: string) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);

    logger.info(`deleted connected users id: ${socketId}`);
    logger.info(`all existing connected users: ${connectedUsers}`);
  }
};

const getActiveConnections = (userId: string) => {
  const activeConnections: string[] = [];

  connectedUsers.forEach((value, key) => {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

const getOnlineUsers = () => {
  const onlineUsers: IConStoredUser[] = [];

  connectedUsers.forEach((value, key) => {
    onlineUsers.push({ socketId: key, userId: value.userId });
  });

  return onlineUsers;
};

// ------------room-----------------------
const addNewActiveRoom = (userId: string, socketId: string) => {
  const newActiveRoom = {
    roomCreator: {
      userId,
      socketId,
    },
    participants: [
      {
        userId,
        socketId,
      },
    ],
    roomId: uuidv4(),
  };

  activeRooms.push(newActiveRoom);

  logger.info(`new active room: ${newActiveRoom}`);
  logger.info(`all active room: ${activeRooms}`);

  return newActiveRoom;
};

const getActiveRooms = () => {
  return activeRooms;
};

const getActiveRoom = (roomId: string) => {
  const activeRoom = activeRooms.find(activeRoom => activeRoom.roomId === roomId);

  if (activeRoom) {
    return activeRoom;
  } else {
    return null;
  }
};

const joinActiveRoom = (roomId: string, newParticipant: IConStoredUser) => {
  const room = activeRooms.find(room => room.roomId === roomId);

  if (room) {
    // removing the room from the activeRooms list to update
    activeRooms = activeRooms.filter(room => room.roomId !== roomId);
    logger.info('room has been found');
    logger.info(activeRooms);

    const updatedRoom = {
      ...room,
      participants: [...room.participants, newParticipant],
    };
    activeRooms.push(updatedRoom);
  }
};

const leaveActiveRoom = (roomId: string, participantSocketId: string) => {
  const activeRoom = activeRooms.find(room => room.roomId === roomId);

  if (activeRoom) {
    const copyOfActiveRoom = { ...activeRoom };

    copyOfActiveRoom.participants = copyOfActiveRoom.participants.filter(
      participant => participant.socketId !== participantSocketId
    );

    activeRooms = activeRooms.filter(room => room.roomId !== roomId);

    if (copyOfActiveRoom.participants.length > 0) {
      activeRooms.push(copyOfActiveRoom);
    }
  }
};

export const MainNspStore = {
  setSocketMainNspInstance,
  getSocketMainNspInstance,
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  getOnlineUsers,
  addNewActiveRoom,
  getActiveRooms,
  getActiveRoom,
  joinActiveRoom,
  leaveActiveRoom,
};
