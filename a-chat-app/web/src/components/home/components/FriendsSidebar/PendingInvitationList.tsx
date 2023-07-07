import { useSelector } from "react-redux";
import { PendingInvitationsListItem } from "./PendingInvitationLIstItem";

export const PendingInvitationsList = () => {
  const { pendingFriendsInvitations } = useSelector((state) => state?.friend);

  return (
    <div className="w-full h-[22%] flex flex-col items-center overflow-auto">
      {pendingFriendsInvitations.map((invitation) => (
        <PendingInvitationsListItem
          key={invitation._id}
          id={invitation._id}
          username={invitation.senderId.username}
          mail={invitation.senderId.mail}
        />
      ))}
    </div>
  );
};
