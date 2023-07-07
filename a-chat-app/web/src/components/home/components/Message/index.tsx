import { useSelector } from "react-redux";
import MessageContent from "./MessageContent";

const Message = () => {
  const { chosenChatDetails } = useSelector((state) => state?.chat);

  return (
    <div className="flex flex-grow bg-white mt-[48px] ">
      {!chosenChatDetails ? (
        <div className="flex flex-grow items-center justify-center">
          <h1>To start chatting - choose conversation</h1>
        </div>
      ) : (
        <MessageContent chosenChatDetails={chosenChatDetails} />
      )}
    </div>
  );
};

export default Message;
