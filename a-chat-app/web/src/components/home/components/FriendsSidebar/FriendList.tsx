import { useSelector } from "react-redux";
import { FriendsListItem } from "./FriendListItem";

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  return friends.map((f) => {
    const isUserOnline = onlineUsers.find((user) => user?.userId === f?.id);
    return {
      ...f,
      isOnline: isUserOnline ? true : false,
    };
  });
};

export const FriendsList = () => {
  const { friends, onlineUsers } = useSelector((state) => state?.friend);

  return (
    <div className="w-full flex-grow">
      {checkOnlineUsers(friends, onlineUsers).map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </div>
  );
};
