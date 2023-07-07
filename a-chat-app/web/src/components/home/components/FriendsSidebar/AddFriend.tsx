import { useState } from "react";
import { AddFriendDialog } from "./AddFriendDialog";

const AddFriend = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenAddFriendDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddFriendDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        className="my-2 p-2 bg-indigo-400 rounded-md"
        onClick={handleOpenAddFriendDialog}
      >
        Add Friend
      </button>

      <AddFriendDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddFriendDialog}
      />
    </>
  );
};

export default AddFriend;
