import { useState } from "react";
import { useSelector } from "react-redux";
import ScreenShare from "./ScreenShare";
import * as roomHandler from "@/socket/mainNsp/events/room";

export const RoomButton = () => {
  const roomStore = useSelector((state) => state?.room);
  const { localStream, isUserJoinedWithOnlyAudio } = roomStore;

  const [micEnabled, setMicEnabled] = useState(true);
  const handleToggleMic = () => {
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicEnabled(!micEnabled);
  };

  const [cameraEnabled, setCameraEnabled] = useState(true);
  const handleToggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };
  return (
    <div className="h-[15%] w-full bg-indigo-500 rounded-t-lg flex items-center justify-center">
      {!isUserJoinedWithOnlyAudio && <ScreenShare {...roomStore} />}

      <button className="text-white mx-3" onClick={handleToggleMic}>
        {micEnabled ? "mic" : "mic off"}
      </button>

      <button
        className="text-white mx-3"
        onClick={() => roomHandler.leaveRoom()}
      >
        close room
      </button>

      {!isUserJoinedWithOnlyAudio && (
        <button className="text-white mx-3" onClick={handleToggleCamera}>
          {cameraEnabled ? "video" : "video off"}
        </button>
      )}
    </div>
  );
};
