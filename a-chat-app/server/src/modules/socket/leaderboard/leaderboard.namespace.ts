import { LeaderBoardServer, LeaderBoardSocket } from './leaderboard.interface';

export const onLeaderBoardNspConnect = (io: LeaderBoardServer, socket: LeaderBoardSocket) => {
  socket.on('upvote', id => {
    console.log('/leader-board -> upvote', { id });
  });
  socket.emit('leaderBoard', [{ id: 1, text: 'hello', position: 1 }]);
};
