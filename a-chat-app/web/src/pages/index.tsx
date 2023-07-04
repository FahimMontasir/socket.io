import { mainNsp } from "@/socket";
import { User } from "@/socket/interfaces/mainNsp";
import { useEffect, useState } from "react";

type LocalUser = User & {
  messages?: { content: string; fromSelf: boolean }[];
  hasNewMessages?: boolean;
};

export default function Login() {
  const [users, setUsers] = useState<LocalUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<LocalUser | null>(null);
  const [message, setMessage] = useState("");

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  const handleLogin = () => {
    mainNsp.auth = { username };
    mainNsp.connect();
  };

  const handleSendMessage = () => {
    if (message.trim() === "") {
      return;
    }
    if (selectedUser?.userID) {
      mainNsp.emit("privateMessage", {
        content: message,
        to: selectedUser.userID,
      });

      setSelectedUser((prev: any) => {
        if (prev?.messages?.length) {
          return {
            ...prev,
            messages: [
              ...prev?.messages,
              {
                content: message,
                fromSelf: true,
              },
            ],
          };
        } else {
          return {
            ...prev,
            messages: [
              {
                content: message,
                fromSelf: true,
              },
            ],
          };
        }
      });
    }
    setMessage("");
  };

  // always call on event handlers inside use Effect otherwise it is called multiple times
  useEffect(() => {
    mainNsp.on("connect_error", (error) => {
      console.log({ error: error });
      setError(error.message);
    });

    mainNsp.on("connect", () => {
      setConnected(true);
      setError("");
    });

    mainNsp.on("users", (users) => {
      setUsers(users);
      console.log({ users });
    });

    mainNsp.on("userConnected", (user) => {
      setUsers((prev) => [...prev, user]);
    });

    mainNsp.on("privateMessage", ({ content, from }) => {
      setSelectedUser((prev: any) => {
        if (prev?.messages?.length) {
          return {
            ...prev,
            messages: [
              ...prev?.messages,
              {
                content,
                fromSelf: false,
              },
            ],
          };
        } else {
          return {
            ...prev,
            messages: [
              {
                content,
                fromSelf: false,
              },
            ],
          };
        }
      });
      console.log({ content, from });
    });

    return () => {
      mainNsp.off("connect_error");
      mainNsp.off("connect");
      mainNsp.off("users");
      mainNsp.off("userConnected");
      mainNsp.off("privateMessage");
    };
  }, []);
  return (
    <div>
      {error && error}
      {connected ? (
        <div className="flex h-screen">
          {/* Left Sidebar */}
          <div className="w-1/4 bg-gray-200">
            {users.map((user) => (
              <div
                key={user.userID}
                className={`p-4 cursor-pointer ${
                  selectedUser?.userID === user.userID
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => setSelectedUser(user)}
              >
                {user.username}
                {/* {user.connected && (
                  <span className="inline-block w-3 h-3 ml-2 bg-green-500 rounded-full"></span>
                )} */}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Navbar */}
            <div className="bg-gray-200 p-4">
              {selectedUser && (
                <h1 className="text-xl font-bold">{selectedUser.username}</h1>
              )}
            </div>

            <div>
              {/* Chat Messages */}
              <div className="flex flex-col p-4 overflow-y-auto">
                {selectedUser?.messages?.length &&
                  selectedUser?.messages.map((chat, index) => (
                    <div key={index} className="mb-2">
                      <span className="font-bold">
                        {chat.fromSelf ? "yourself" : selectedUser.username}:
                      </span>{" "}
                      {chat.content}
                    </div>
                  ))}
              </div>

              {/* Chat Input */}
              <div className="flex p-4 bg-gray-200">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 mr-2 p-2 rounded-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // login
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4">Login</h1>
          <div className="flex flex-col w-64">
            <label htmlFor="name" className="mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleLogin}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
