import { mainNsp } from "@/socket";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    mainNsp.connect();

    return () => {
      mainNsp.disconnect();
    };
  }, []);

  mainNsp.on("chatHistory", (history) => {
    console.log({ history });
  });

  console.log({ mainNsp: mainNsp.connected });

  if (mainNsp.connected) {
    mainNsp.emit("chatText", "hi");
    mainNsp.emit("chatUser", { id: 1, name: "fahim" }, (message) => {
      console.log({ message });
    });
  }

  return (
    <div>
      <h1>hi</h1>
      <Link href="/leaderBoard">leader board</Link>
    </div>
  );
}
