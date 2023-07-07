import * as webRTCHandler from "@/socket/mainNsp/events/webrtc";
import { setScreenSharingStream } from "@/store/slice/room";
import { useDispatch } from "react-redux";

const constraints = {
  audio: false,
  video: true,
};

const ScreenShare = ({
  localStream,
  screenSharingStream,
  isScreenSharingActive,
}) => {
  const dispatch = useDispatch();
  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log(
          "error occured when trying to get an access to screen share stream"
        );
      }

      if (stream) {
        dispatch(
          setScreenSharingStream({
            screenSharingStream: stream,
            isScreenSharingActive: true,
          })
        );
        webRTCHandler.switchOutgoingTracks(stream);
      }
    } else {
      webRTCHandler.switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((t) => t.stop());
      dispatch(
        setScreenSharingStream({
          screenSharingStream: null,
          isScreenSharingActive: false,
        })
      );
    }
  };

  return (
    <button onClick={handleScreenShareToggle} className="text-white">
      {isScreenSharingActive ? "stop ss" : "start ss"}
    </button>
  );
};

export default ScreenShare;
