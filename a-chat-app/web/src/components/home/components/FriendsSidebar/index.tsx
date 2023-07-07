import AddFriend from "./AddFriend";
import { FriendsList } from "./FriendList";
import { PendingInvitationsList } from "./PendingInvitationList";

const FriendsSideBar = () => {
  return (
    <div className="w-[224px] h-full flex flex-col items-center bg-gray-100">
      <AddFriend />

      <h1 className="my-10 text-xl"> Private Messages</h1>
      <FriendsList />

      <h1 className="my-10 text-xl"> Invitations</h1>
      <PendingInvitationsList />
    </div>
  );
};

export default FriendsSideBar;
