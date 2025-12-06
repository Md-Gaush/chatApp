import axios from "axios";
import React, { useState } from "react";
import { USER_END_POINT } from "../../constant/constant";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/messageSlice";

const SendInput = () => {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const handleInput = async (e) => {
    e.preventDefault();
    if (!msg.trim()) return;

    try {
      const res = await axios.post(
        `${USER_END_POINT}/message/send/${selectedUser?._id}`,
        { message: msg },
        { withCredentials: true }
      );

      dispatch(
        setMessages([...(messages || []), res?.data?.newMessage])
      );
    } catch (error) {
      console.log(error);
    }

    setMsg("");
  };

  return (
    <form className="flex items-center gap-3 mt-3" onSubmit={handleInput}>
      <input
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded-xl px-4 py-2"
      />
      <button
        className="px-6 py-2 bg-blue-500 text-white rounded-xl"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default SendInput;
