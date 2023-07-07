import { useState } from "react";
import {
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} from "@/store/api/friendInvitation";

export const PendingInvitationsListItem = ({ id, username, mail }) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [acceptFriendInvitation] = useAcceptInvitationMutation();
  const [rejectFriendInvitation] = useRejectInvitationMutation();

  const handleAcceptInvitation = async () => {
    await acceptFriendInvitation({ id });
    setButtonsDisabled(true);
  };

  const handleRejectInvitation = async () => {
    await rejectFriendInvitation({ id });
    setButtonsDisabled(true);
  };

  return (
    <div className="w-full px-1">
      <div className="flex items-center justify-between w-full h-[42px] mt-[10px]">
        <button disabled={buttonsDisabled} onClick={handleAcceptInvitation}>
          accept
        </button>
        <h1 className="ml-[10px] font-bold text-gray-600 flex-grow">
          {username}
        </h1>
        <button disabled={buttonsDisabled} onClick={handleRejectInvitation}>
          reject
        </button>
      </div>
    </div>
  );
};
