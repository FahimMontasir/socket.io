"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { ConnectionState } from "@/components/ConnectionState";
import { Events } from "@/components/Events";
import { ConnectionManager } from "@/components/ConnectionManager";
import { MyForm } from "@/components/MyForm";

export default function Home() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  console.log(isConnected);

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    function onFooEvent(value: any) {
      setFooEvents(fooEvents.concat(value));
    }

    socket.on("foo", onFooEvent);

    return () => {
      socket.off("foo", onFooEvent);
    };
  }, [fooEvents]);

  return (
    <main>
      <h1>hello socket world</h1>
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <MyForm />
    </main>
  );
}
