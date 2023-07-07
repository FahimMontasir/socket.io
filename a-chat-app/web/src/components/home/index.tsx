import { connectWithSocketServer } from "@/socket/mainNsp";
import { logout, setUserDetails } from "@/store/slice/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import FriendsSideBar from "./components/FriendsSidebar";
import Room from "./components/Room";
import Message from "./components/Message";

const HomePage = () => {
  const { isUserInRoom } = useSelector((state) => state?.room);
  const dispatch = useDispatch();

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
      <Sidebar />
      <FriendsSideBar />
      <Message />
      <button
        onClick={() => dispatch(logout())}
        className="px-4 py-2 bg-blue-500 text-white rounded-sm"
      >
        Logout
      </button>

      {isUserInRoom && <Room />}
    </div>
  );
};
export default HomePage;
