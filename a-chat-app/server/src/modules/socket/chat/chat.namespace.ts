import { ChatServer, ChatSocket } from './chat.interface';
import { ChatController } from './chat.controller';
// import { ChatUser } from './chat.model';

export const onMainNamespaceConnect = (io: ChatServer, socket: ChatSocket) => {
  // const totalConnect = io.engine.clientsCount;
  socket.on('chatText', ChatController.chatText);
  socket.emit('chatHistory', [{ text: 'hello', date: new Date() }]);
  // socket.on('demo-route', arg => {
  //   console.log({ arg });
  // });

  socket.on('chatUser', async (payload, callback) => {
    if (typeof callback !== 'function') {
      // not an acknowledgement
      return socket.disconnect();
    }
    try {
      // await ChatUser.create(payload);
      // console.log({ createdUser });

      callback('success');
    } catch (error) {
      // console.log({ error });
      callback('error');
    }
  });

  // socket.join('room');
  // // and then later
  // io.to('room').emit('chatHistory', [{ text: 'acb', date: new Date() }]);
  // io.in("room")
};
