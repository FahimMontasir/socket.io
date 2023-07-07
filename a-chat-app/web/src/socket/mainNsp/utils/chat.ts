import { store } from "@/store";
import { setMessages } from "@/store/slice/chat";

type IUpdateDirectChatHistoryIfActive = {
  participants: string[];
  messages: string[];
};
type IUpdateChatHistoryIfSameConversationActive =
  IUpdateDirectChatHistoryIfActive & {
    usersInConversation: string[];
  };

export const updateDirectChatHistoryIfActive = (
  data: IUpdateDirectChatHistoryIfActive
) => {
  const { participants, messages } = data;

  // find id of user from token and id from active conversation
  const receiverId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState().auth.userData?._id;

  if (receiverId && userId) {
    const usersInConversation = [receiverId, userId];

    updateChatHistoryIfSameConversationActive({
      participants,
      usersInConversation,
      messages,
    });
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInConversation,
  messages,
}: IUpdateChatHistoryIfSameConversationActive) => {
  const result = participants.every((participantId) => {
    return usersInConversation.includes(participantId);
  });

  if (result) {
    store.dispatch(setMessages(messages));
  }
};
