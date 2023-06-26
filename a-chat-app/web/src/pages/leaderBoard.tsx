// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });
import { leaderBoardNsp } from "@/socket";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    leaderBoardNsp.connect();

    return () => {
      leaderBoardNsp.disconnect();
    };
  }, []);

  leaderBoardNsp.on("connect", () => {
    console.log("connect", { leaderBoardNsp: leaderBoardNsp.connected });
  });

  leaderBoardNsp.on("connect_error", () => {
    leaderBoardNsp.connect();
  });

  leaderBoardNsp.on("disconnect", (reason) => {
    // console.log("disconnect", leaderBoardNsp.connected, reason);
    if (reason === "io server disconnect") {
      // the disconnection was initiated by the server, you need to reconnect manually
      leaderBoardNsp.connect();
    }
    // else the mainNsp will automatically try to reconnect
  });

  //other namespaces
  leaderBoardNsp.on("connect", () => {
    console.log({ leaderBoardNsp: leaderBoardNsp.connected });
  });
  leaderBoardNsp.emit("upvote", 10);
  leaderBoardNsp.on("leaderBoard", (history) => {
    console.log({ leaderBoardNsp: history });
  });

  return (
    <div>
      <h1>hi</h1>
      <Link href="/">main</Link>
    </div>
  );
}
