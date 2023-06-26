import { ExtendedError } from 'socket.io/dist/namespace';
import { MainSocket } from '../../modules/socket/main/main.interface';

type Next = (err?: ExtendedError | undefined) => void;

export const authUser = (socket: MainSocket, next: Next) => {
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error('invalid username'));
  }

  socket.data.username = username;
  next();
};
