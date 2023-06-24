import { Server, Socket } from 'socket.io';
import { ChatController } from './chat.controller';

export const onMainNamespaceConnect = (io: Server, socket: Socket) => {
  // const totalConnect = io.engine.clientsCount;
  // socket.on('order:create', ChatController.sendText);

  socket.on('demo-route', arg => {
    console.log({ arg });
  });
};
