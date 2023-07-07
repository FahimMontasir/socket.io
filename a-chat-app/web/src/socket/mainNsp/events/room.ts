import { store } from "@/store";
import * as socketConnection from "../index";
import * as webRTCHandler from "./webrtc";
import {
  setActiveRooms,
  setIsUserJoinedOnlyWithAudio,
  setLocalStream,
  setOpenRoom,
  setRemoteStreams,
  setRoomDetails,
  setScreenSharingStream,
} from "@/store/slice/room";
import { IActiveRoom } from "../interface";

export const createNewRoom = () => {
  const successCallbackFunc = () => {
    store.dispatch(
      setOpenRoom({ isUserInRoom: true, isUserRoomCreator: true })
    );

    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    socketConnection.createNewRoom();
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
};

export const newRoomCreated = (data: { roomDetails: IActiveRoom }) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data: { activeRooms: IActiveRoom[] }) => {
  const { activeRooms } = data;

  const friends = store.getState().friend.friends;
  const rooms: any[] = [];

  const userId = store.getState().auth.userData?._id;

  activeRooms.forEach((room) => {
    const isRoomCreatedByMe = room.roomCreator.userId === userId;

    if (isRoomCreatedByMe) {
      rooms.push({ ...room, creatorUsername: "Me" });
    } else {
      friends.forEach((f: any) => {
        if (f.id === room.roomCreator.userId) {
          rooms.push({ ...room, creatorUsername: f.username });
        }
      });
    }
  });

  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId: string) => {
  const successCallbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(
      setOpenRoom({ isUserInRoom: false, isUserRoomCreator: true })
    );
    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    socketConnection.joinRoom({ roomId });
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunc);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails?.roomId;

  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  const screenSharingStream = store.getState().room.screenSharingStream;
  if (screenSharingStream) {
    screenSharingStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenSharingStream(null));
  }

  store.dispatch(setRemoteStreams([]));
  webRTCHandler.closeAllConnections();

  socketConnection.leaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(
    setOpenRoom({ isUserInRoom: false, isUserRoomCreator: false })
  );
};
