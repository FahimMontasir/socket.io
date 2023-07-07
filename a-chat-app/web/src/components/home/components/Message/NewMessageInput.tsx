import { useState } from "react";
import { useSelector } from "react-redux";
import { sendDirectMessage } from "@/socket/mainNsp";

const NewMessageInput = () => {
  const { chosenChatDetails } = useSelector((state) => state?.chat);
  const [message, setMessage] = useState("");

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="flex p-4 bg-gray-200">
      <input
        placeholder={`Write message to ${chosenChatDetails.name}`}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
        className="flex-1 mr-2 p-2 rounded-sm"
      />
      <button
        // onClick={handleSendMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded-sm"
      >
        Send
      </button>
    </div>
  );
};

export default NewMessageInput;
