import { ChatEventServer, ChatEventSocket } from './chat.interface';
import { ChatSocketService } from './chat.service';

export const chatEvent = (io: ChatEventServer, socket: ChatEventSocket) => {
  socket.on('directMessage', data => {
    ChatSocketService.directMessageHandler(socket, data);
  });

  socket.on('directChatHistory', data => {
    ChatSocketService.directChatHistoryHandler(socket, data);
  });
};
