import { useState } from "react";
import { useInviteInvitationMutation } from "@/store/api/friendInvitation";

export const AddFriendDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const [mail, setMail] = useState("");
  const [sendFriendInvitation] = useInviteInvitationMutation();

  const handleSendInvitation = async () => {
    const res = await sendFriendInvitation({
      targetMailAddress: mail,
    });
    if (res?.data?.success) {
      handleCloseDialog();
    }
  };

  const handleCloseDialog = () => {
    closeDialogHandler();
    setMail("");
  };

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 ${
          isDialogOpen ? "block" : "hidden"
        } bg-black bg-opacity-50`}
        onClick={handleCloseDialog}
      ></div>
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 bg-white rounded-md ${
          isDialogOpen ? "block" : "hidden"
        }`}
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold">Invite a Friend</h2>
        </div>
        <div className="p-4">
          <p className="text-base">
            Enter the email address of the friend you would like to invite:
          </p>
          <input
            type="text"
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
            placeholder="Enter email address"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="p-4">
          <button onClick={handleSendInvitation}>Send</button>
        </div>
      </div>
    </div>
  );
};
