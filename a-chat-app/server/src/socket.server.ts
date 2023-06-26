import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { instrument } from '@socket.io/admin-ui';
//namespaces
import { onMainNamespaceConnect } from './modules/socket/main/main.namespace';
import { onLeaderBoardNspConnect } from './modules/socket/leaderboard/leaderboard.namespace';
import { authUser } from './middlewares/socket/authUser';

const registerServer = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  // for admin ui view -> ui: https://admin.socket.io/
  instrument(io, {
    auth: false,
    mode: 'development',
  });

  // ----------main nsp------------
  const mainNsp = io.of('/');
  // middleware of main nsp
  mainNsp.use(authUser);

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
  mainNsp.on('connection', socket => onMainNamespaceConnect(mainNsp, socket));

  // ----------other namespaces-----------
  const leaderBoardNsp = io.of('/leader-board');
  //middleware goose here
  leaderBoardNsp.use((socket, next) => {
    next();
  });
  leaderBoardNsp.on('connection', socket => onLeaderBoardNspConnect(leaderBoardNsp, socket));
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
