import { mainNsp } from "@/socket";
import { User } from "@/socket/interfaces/mainNsp";
import { useEffect, useState } from "react";

export default function Login() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  const handleLogin = () => {
    mainNsp.auth = { username };
    mainNsp.connect();
  };
  // console.log(mainNsp.connected, connected);

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
    setUsers((prev) => {
      if (prev.find((u) => u.userID === user.userID)) {
        return prev;
      } else {
        return [...prev, user];
      }
    });
  });

  const handleSendMessage = () => {
    if (message.trim() === "") {
      return;
    }

    const newChat = {
      user: selectedUser,
      message: message.trim(),
    };

    // setChats((prevChats) => [...prevChats, newChat]);
    setMessage("");
  };

  // it works in production build
  //useEffect(() => {
  //   if (connected) {
  //     router.push("/home");
  //     console.log("inside useeffect");
  //   }
  // }, [connected]);
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
                {chats.map((chat, index) => (
                  <div key={index} className="mb-2">
                    <span className="font-bold">{chat}:</span> {chat}
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
