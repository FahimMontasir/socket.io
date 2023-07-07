import { useSelector } from "react-redux";
import { VideoPlayer } from "./VideoPlayer";

export const Video = () => {
  const { localStream, remoteStreams, screenSharingStream } = useSelector(
    (state) => state?.room
  );

  return (
    <div className="h-[85%] w-full flex flex-wrap">
      <VideoPlayer
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams.map((stream) => (
        <VideoPlayer stream={stream} key={stream.id} />
      ))}
    </div>
  );
};
