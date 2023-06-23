import { Server } from 'socket.io';
import { Server as IServer } from 'http';
//routes
import { onMainNamespaceConnect } from './modules/socket/chat/chat.namespace';

const registerServer = (server: IServer) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  // const totalConnectedUser = io.engine.clientsCount;
  // logger.info(`total socket io connected user: ${totalConnectedUser}`);
  //client side
  // or with a function
  // const socket = io({
  //   auth: (cb) => {
  //     cb({
  //       token: "abc"
  //     });
  //   }
  // });

  // Note: this function will be executed only once per connection (even if the connection consists in multiple HTTP requests)
  // io.use(async (socket, next) => {
  //   const token = socket.handshake.auth.token;
  //   logger.log(token);
  //   try {
  //     // const user = await fetchUser(socket);
  //     // socket.user = user;
  //   } catch (e) {
  //     next(new Error('unknown user'));
  //   }
  // });

  io.on('connection', socket => onMainNamespaceConnect(io, socket));
};

export const SocketServer = {
  registerServer,
};

// logger.info(socket);

// //-----socket middleware------
// socket.use(([event, ...args], next) => {
//   logger.info({ event, args });
//   // do something with the packet (logging, authorization, rate limiting...)
//   // do not forget to call next() at the end
//   next();
// });
// //---------------------------------
