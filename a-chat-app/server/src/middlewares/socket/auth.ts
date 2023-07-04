import jwt, { Secret } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';

import configs from '../../configs';

type Next = (err?: ExtendedError | undefined) => void;

export const verifySocketToken = (socket: Socket, next: Next) => {
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
