import { io } from "socket.io-client";
import { MainNspEvents } from "@/interfaces/socket/mainNsp";
import { LeaderBoardNspEvents } from "@/interfaces/socket/leaderboarNsp";

// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const socket: MainNspEvents = io("http://localhost:5000", {
    auth: (cb) => {
      cb({ token: "abc-test-1234" });
    },
  });
  // console.log({ socket });

  socket.on("connect_error", () => {
    socket.connect();
  });

  socket.on("connect", () => {
    console.log("connect", socket.connected);
  });
  socket.on("disconnect", (reason) => {
    console.log("disconnect", socket.connected, reason);
    if (reason === "io server disconnect") {
      // the disconnection was initiated by the server, you need to reconnect manually
      socket.connect();
    }
    // else the socket will automatically try to reconnect
  });

  // if (socket.connected) {
  //   socket.emit("demo-route", "hi i am fahim");
  // }

  socket.emit("chatText", "hi");
  socket.on("chatHistory", (history) => {
    console.log({ history });
  });
  socket.emit("chatUser", { id: 1, name: "fahim" }, (message) => {
    console.log({ message });
  });

  //other namespaces
  const leaderBoardNsp: LeaderBoardNspEvents = io(
    "http://localhost:5000/leader-board"
  );
  leaderBoardNsp.on("connect", () => {
    console.log({ leaderBoardNsp: leaderBoardNsp.connected });
  });
  leaderBoardNsp.emit("upvote", 10);
  leaderBoardNsp.on("leaderBoard", (history) => {
    console.log({ leaderBoardNsp: history });
  });

  return <h1>hi</h1>;
}
