import React, { useState } from "react";
import { Video } from "./Video";
import { RoomButton } from "./Button";

const Room = () => {
  const [isRoomMinimized, setIsRoomMinimized] = useState(true);

  const roomResizeHandler = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };

  return (
    <div
      className={`absolute rounded-md flex flex-col items-center justify-center ${
        isRoomMinimized ? "bottom-0 right-0 w-1/3 h-[40vh]" : "w-[90%] h-screen"
      } bg-gray-400`}
    >
      <Video />

      <RoomButton />

      <button
        onClick={roomResizeHandler}
        className="absolute text-white bottom-2 right-2"
      >
        {isRoomMinimized ? "full s" : "X full s"}
      </button>
    </div>
  );
};

export default Room;
