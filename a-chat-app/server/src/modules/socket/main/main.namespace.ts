import { MainServer, MainSocket, User } from './main.interface';
// import { MainController } from './main.controller';
// import { ChatUser } from './chat.model';

export const onMainNamespaceConnect = (io: MainServer, socket: MainSocket) => {
  const users: User[] = [];
  for (const [id, socket] of io.sockets) {
    users.push({
      userID: id,
      username: socket.data.username,
    });
  }
  console.log({ users });
  socket.emit('users', users);

  socket.broadcast.emit('userConnected', { userID: socket.id, username: socket.data.username });

  // // const totalConnect = io.engine.clientsCount;
  // socket.on('chatText', MainController.chatText);
  // socket.emit('chatHistory', [{ text: 'hello', date: new Date() }]);
  // // socket.on('demo-route', arg => {
  // //   console.log({ arg });
  // // });
  // socket.on('chatUser', async (payload, callback) => {
  //   if (typeof callback !== 'function') {
  //     // not an acknowledgement
  //     return socket.disconnect();
  //   }
  //   try {
  //     // await ChatUser.create(payload);
  //     // console.log({ createdUser });
  //     callback('success');
  //   } catch (error) {
  //     // console.log({ error });
  //     callback('error');
  //   }
  // });
  // socket.join('room');
  // // and then later
  // io.to('room').emit('chatHistory', [{ text: 'acb', date: new Date() }]);
  // io.in("room")
};
