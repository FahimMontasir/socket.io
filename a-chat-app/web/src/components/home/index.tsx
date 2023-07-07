import { connectWithSocketServer } from "@/socket/mainNsp";
import { logout, setUserDetails } from "@/store/slice/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const users: any[] = [];

  useEffect(() => {
    const userDetails = localStorage.getItem("a-chat-app-user");

    if (!userDetails) {
      dispatch(logout());
    } else {
      dispatch(setUserDetails(JSON.parse(userDetails)));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-200">
        {users.map((user) => (
          <div
            key={user.userID}
            // className={`p-4 cursor-pointer ${
            //   selectedUser?.userID === user.userID
            //     ? "bg-blue-500 text-white"
            //     : ""
            // }`}
            // onClick={() => setSelectedUser(user)}
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
          {/* {selectedUser && (
            <h1 className="text-xl font-bold">{selectedUser.username}</h1>
          )} */}
          <button
            onClick={() => dispatch(logout())}
            className="px-4 py-2 bg-blue-500 text-white rounded-sm"
          >
            Logout
          </button>
        </div>

        <div>
          {/* Chat Messages */}
          <div className="flex flex-col p-4 overflow-y-auto">
            {/* {selectedUser?.messages?.length &&
              selectedUser?.messages.map((chat, index) => (
                <div key={index} className="mb-2">
                  <span className="font-bold">
                    {chat.fromSelf ? "yourself" : selectedUser.username}:
                  </span>{" "}
                  {chat.content}
                </div>
              ))} */}
          </div>

          {/* Chat Input */}
          <div className="flex p-4 bg-gray-200">
            <input
              type="text"
              // value={message}
              // onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 mr-2 p-2 rounded-sm"
            />
            <button
              // onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
