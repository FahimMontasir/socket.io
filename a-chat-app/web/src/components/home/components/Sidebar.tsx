import { useSelector } from "react-redux";
import * as roomHandler from "@/socket/mainNsp/events/room";

const Sidebar = () => {
  const { activeRooms, isUserInRoom } = useSelector((state) => state?.room);

  return (
    <div className="w-[90px] h-full flex flex-col items-center bg-gray-200">
      <button
        disabled={isUserInRoom}
        onClick={() => roomHandler.createNewRoom()}
        className="px-4 py-2 bg-blue-500 text-white rounded-sm"
      >
        create room
      </button>
      {activeRooms.map((room) => (
        <button
          className="bg-blue-500 text-white rounded-sm m-2"
          disabled={isUserInRoom || room.participants.length > 3}
          key={room.roomId}
          onClick={() => {
            if (room.participants.length < 4) {
              roomHandler.joinRoom(room.roomId);
            }
          }}
        >
          {room.creatorUsername}
        </button>
      ))}
    </div>
  );
};
export default Sidebar;
