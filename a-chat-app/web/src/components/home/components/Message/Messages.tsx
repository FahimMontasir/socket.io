import { useSelector } from "react-redux";
import Message from "./Message";

const convertDateToHumanReadable = (date, format) => {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
};

export const Messages = () => {
  const { chosenChatDetails, messages } = useSelector((state) => state?.chat);
  console.log({ chosenChatDetails, messages });

  return (
    <div className="h-[calc(100% - 60px)] overflow-auto flex flex-col items-center">
      {/* message header */}
      <div className="w-[98%] table-column mt-[10px]">
        <h1 className="text-2xl font-bold text-white ml-[5px] mr-[5px]">
          {chosenChatDetails?.name}
        </h1>
        <p className="text-gray-400 ml-[5px] mr-[5px]">
          This is the beginning of your conversation with{" "}
          {chosenChatDetails?.name}
        </p>
      </div>

      {messages.map((message, index) => {
        const sameAuthor =
          index > 0 &&
          messages[index].author._id === messages[index - 1].author._id;

        const sameDay =
          index > 0 &&
          convertDateToHumanReadable(new Date(message.date), "dd/mm/yy") ===
            convertDateToHumanReadable(
              new Date(messages[index - 1].date),
              "dd/mm/yy"
            );

        return (
          <div key={message._id} style={{ width: "97%" }}>
            {(!sameDay || index === 0) && (
              <div className="w-[95%] bg-gray-400 h-px relative mt-[5px] mb-[2px]">
                <span className="bg-gray-900 absolute left-1/2 top-[-10px] text-gray-400 px-[2px] text-sm">
                  {convertDateToHumanReadable(
                    new Date(message.date),
                    "dd/mm/yy"
                  )}
                </span>
              </div>
            )}

            <Message
              content={message.content}
              username={message.author.username}
              sameAuthor={sameAuthor}
              date={convertDateToHumanReadable(
                new Date(message.date),
                "dd/mm/yy"
              )}
              sameDay={sameDay}
            />
          </div>
        );
      })}
    </div>
  );
};
