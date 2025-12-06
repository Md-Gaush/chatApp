import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ msg }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  const isMyMessage =
    msg?.senderId?._id?.toString() === authUser?._id?.toString() ||
    msg?.senderId?.toString() === authUser?._id?.toString();

  const profileImage = isMyMessage
    ? authUser?.profilePhoto
    : selectedUser?.profilePhoto;

  useEffect(() => {
    scroll.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [msg]);

  return (
    <div
      ref={scroll}
      className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profileImage} alt="profile" />
        </div>
      </div>

      <div className="chat-bubble">{msg?.message}</div>
    </div>
  );
};

export default Message;
