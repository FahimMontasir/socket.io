import Image from "next/image";
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
import { io } from "socket.io-client";

export default function Home() {
  const socket = io("http://localhost:5000", {
    auth: (cb) => {
      cb({ token: "abc-test-1234" });
    },
  });
  console.log({ socket });

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

  socket.emit("demo-route", "hi i am fahim");

  return <h1>hi</h1>;
}
