import React from "react";
import Message from "./Message";
import useGetMessages from "../hook/useGetMessages";
import { useSelector } from "react-redux";
import { useGetRealTimeMessages } from "../hook/useGetRealTimeMessages";

const Messages = () => {
   useGetMessages();
  useGetRealTimeMessages();  
  const { messages } = useSelector((store) => store.message);

  if (!messages) return null;

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <Message key={msg?._id} msg={msg} />
      ))}
    </div>
  );
};

export default Messages;
