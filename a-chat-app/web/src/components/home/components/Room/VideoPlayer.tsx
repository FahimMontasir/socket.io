import { useEffect, useRef } from "react";

type IVideoPlayer = {
  stream: any;
  isLocalStream?: any;
};

export const VideoPlayer = ({ stream, isLocalStream }: IVideoPlayer) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <div className="h-1/2 w-1/2 bg-black rounded-md">
      <video
        ref={videoRef}
        className="w-full h-full"
        autoPlay
        muted={isLocalStream ? true : false}
      />
    </div>
  );
};
