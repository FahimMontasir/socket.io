import { Server, Socket } from 'socket.io';
import { ChatController } from './chat.controller';

export const onMainNamespaceConnect = (io: Server, socket: Socket) => {
  socket.on('order:create', ChatController.sendText);
  // socket.on("order:read", readOrder);
};
