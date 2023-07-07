import { io } from "socket.io-client";
import { MainNspEvents } from "./interface";
import { IUser } from "@/interfaces/common";
import { store } from "@/store";
import {
  setFriends,
  setOnlineUsers,
  setPendingFriendsInvitations,
} from "@/store/slice/friend";
import { updateDirectChatHistoryIfActive } from "./utils/chat";
import * as webRTCHandler from "./events/webrtc";
import * as roomHandler from "./events/room";

const URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:5000"
    : "http://localhost:5000";

export let socket: MainNspEvents;

export const connectWithSocketServer = (userDetails: IUser) => {
  const jwtToken = userDetails.token;

  socket = io(URL, {
    auth: {
      token: jwtToken,
    },
  });
  // user
  socket.on("connect", () => {
    console.log("succesfully connected with socket.io server", socket.id);
  });

  socket.on("friendsInvitations", (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friendsList", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  socket.on("onlineUsers", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  // chat
  socket.on("directChatHistory", (data) => {
    console.log("directChatHistory:", data);
    updateDirectChatHistoryIfActive(data);
  });

  // room
  socket.on("roomCreate", (data) => {
    roomHandler.newRoomCreated(data);
  });

  socket.on("activeRooms", (data) => {
    roomHandler.updateActiveRooms(data);
  });

  socket.on("connPrepare", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
    socket.emit("connInit", { connUserSocketId: connUserSocketId });
  });

  socket.on("connInit", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("connSignal", (data) => {
    webRTCHandler.handleSignalingData(data);
  });

  socket.on("roomParticipantLeft", (data) => {
    console.log("user left room");
    webRTCHandler.handleParticipantLeftRoom(data);
  });
};

export const sendDirectMessage = (data) => {
  console.log("directMessage: ", data);
  socket.emit("directMessage", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("directChatHistory", data);
};

export const createNewRoom = () => {
  socket.emit("roomCreate");
};

export const joinRoom = (data) => {
  socket.emit("roomJoin", data);
};

export const leaveRoom = (data) => {
  socket.emit("roomLeave", data);
};

export const signalPeerData = (data) => {
  socket.emit("connSignal", data);
};
