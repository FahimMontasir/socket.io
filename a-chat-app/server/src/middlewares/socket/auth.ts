import jwt, { Secret } from 'jsonwebtoken';
import { ExtendedError } from 'socket.io/dist/namespace';
import { MainSocket } from '../../modules/socket/main/main.interface';
import configs from '../../configs';

type Next = (err?: ExtendedError | undefined) => void;

export const verifySocketToken = (socket: MainSocket, next: Next) => {
  const token = socket.handshake.auth?.token;

  try {
    const decoded = jwt.verify(token, configs.token_key as Secret);
    socket.data.user = decoded;
  } catch (err) {
    const socketError = new Error('NOT_AUTHORIZED');
    return next(socketError);
  }

  next();
};
