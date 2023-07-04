import { RoomEventServer, RoomEventSocket } from './room.interface';
import { RoomSocketService } from './room.service';

export const roomEvent = (io: RoomEventServer, socket: RoomEventSocket) => {
  socket.on('roomCreate', () => {
    RoomSocketService.roomCreateHandler(socket);
  });

  socket.on('roomJoin', data => {
    RoomSocketService.roomJoinHandler(socket, data);
  });

  socket.on('roomLeave', data => {
    RoomSocketService.roomLeaveHandler(socket, data);
  });

  socket.on('connInit', data => {
    RoomSocketService.roomInitializeConnectionHandler(socket, data);
  });

  socket.on('connSignal', data => {
    RoomSocketService.roomSignalingDataHandler(socket, data);
  });
};
