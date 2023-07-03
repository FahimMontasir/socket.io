import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { instrument } from '@socket.io/admin-ui';
// namespaces
import { onMainNamespaceConnect } from './modules/socket/main/main.namespace';
import { onLeaderBoardNspConnect } from './modules/socket/leaderboard/leaderboard.namespace';
// middlewares
import { verifySocketToken } from './middlewares/socket/auth';

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
  mainNsp.use(verifySocketToken);
  // connection
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
