import { errorLogger, logger } from '../../../../shared/logger';
import { MainNspStore } from '../main.store';
import { ChatEventServer, ChatEventSocket, IDirectMessageData } from './chat.interface';
import { Conversation, Message } from './chat.model';

const updateChatHistory = async (conversationId: string, toSpecifiedSocketId = '') => {
  try {
    const conversation = await Conversation.findById(conversationId).populate({
      path: 'messages',
      model: 'Message',
      populate: {
        path: 'author',
        model: 'User',
        select: 'username _id',
      },
    });

    if (conversation) {
      const io: ChatEventServer = MainNspStore.getSocketMainNspInstance();

      if (toSpecifiedSocketId) {
        // initial update of chat history
        return io.to(toSpecifiedSocketId).emit('directChatHistory', {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      }

      // check if users of this conversation are online
      // if yes emit to them update of messages
      conversation.participants.forEach(userId => {
        const activeConnections = MainNspStore.getActiveConnections(userId.toString());

        activeConnections.forEach(socketId => {
          io.to(socketId).emit('directChatHistory', {
            messages: conversation.messages,
            participants: conversation.participants,
          });
        });
      });
    }
  } catch (error) {
    errorLogger.error(error);
  }
};

const directMessageHandler = async (socket: ChatEventSocket, data: IDirectMessageData) => {
  try {
    logger.info('direct message event is being handled');

    const { userId } = socket.data.user;
    const { receiverUserId, content } = data;

    // create new message
    const message = await Message.create({
      content: content,
      author: userId,
      date: new Date(),
      type: 'DIRECT',
    });

    // find if conversation exist with this two users - if not create new
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      // perform and update to sender and receiver if is online
      await updateChatHistory(conversation._id.toString());
    } else {
      // create new conversation if not exists
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });

      // perform and update to sender and receiver if is online
      await updateChatHistory(newConversation._id.toString());
    }
  } catch (err) {
    errorLogger.error(err);
  }
};

const directChatHistoryHandler = async (socket: ChatEventSocket, data: IDirectMessageData) => {
  try {
    const { userId } = socket.data.user;
    const { receiverUserId } = data;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
      type: 'DIRECT',
    });

    if (conversation) {
      await updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (err) {
    errorLogger.error(err);
  }
};

export const ChatSocketService = {
  directMessageHandler,
  updateChatHistory,
  directChatHistoryHandler,
};
