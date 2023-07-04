import { Namespace, Socket } from 'socket.io';
import configs from '../../../configs';
import { logger } from '../../../shared/logger';
import { userEvent } from './user/user.event';
import { MainNspStore } from './main.store';
import { UserSocketService } from './user/user.service';
import { chatEvent } from './chat/chat.event';
import { roomEvent } from './room/room.event';

export const onMainNamespaceConnect = (io: Namespace, socket: Socket) => {
  MainNspStore.setSocketMainNspInstance(io);

  // for debugging purpose
  const isProd = configs.env === 'production';
  if (!isProd) {
    socket.use(([event, ...args], next) => {
      // do something with the packet (logging, rate limiting etc...)
      logger.info({ event, args });
      next();
    });
  }

  // ----------event registry---------
  userEvent(io, socket);
  chatEvent(io, socket);
  roomEvent(io, socket);
  //-----------------------------------

  //when user leave from the website or app
  socket.on('disconnect', () => {
    UserSocketService.disconnectHandler(socket);
  });
};
