import { sendDirectMessage } from "@/socket/mainNsp";
import { setChosenChatDetails } from "@/store/slice/chat";
import { useDispatch } from "react-redux";

export const FriendsListItem = ({ id, username, isOnline }) => {
  const dispatch = useDispatch();
  const handleChooseActiveConversation = () => {
    dispatch(
      setChosenChatDetails({
        chatDetails: { id: id, name: username },
        chatType: "DIRECT",
      })
    );
    // sendDirectMessage({
    //   receiverUserId: id,
    // });
  };

  return (
    <button
      onClick={handleChooseActiveConversation}
      className="w-full h-[12px] mt-[20px] flex items-center justify-start text-base text-black relative"
    >
      <h2 className="ml-[10px] text-black">{username}</h2>
      {isOnline && <div>*</div>}
    </button>
  );
};
