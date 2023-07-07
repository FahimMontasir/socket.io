const Message = ({ content, sameAuthor, username, date, sameDay }) => {
  if (sameAuthor && sameDay) {
    return (
      <div className="w-[97%]">
        <span className="ml-[70px]">{content}</span>
      </div>
    );
  }

  return (
    <div className="w-[97%] flex mt-[10px]">
      <div className="flex flex-col">
        <p className="text-[16px]">
          {username} <span className="text-[12px] text-[#72767d]">{date}</span>
        </p>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Message;
