import { useEffect } from "react";
import { getDirectChatHistory } from "@/socket/mainNsp";
import { Messages } from "./Messages";
import NewMessageInput from "./NewMessageInput";

const MessageContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <div className="flex-1 flex flex-col justify-between">
      <Messages />
      <NewMessageInput />
    </div>
  );
};

export default MessageContent;
