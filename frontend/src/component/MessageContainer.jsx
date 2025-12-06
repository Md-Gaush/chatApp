import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";

const MessageContainer = () => {
  const {selectedUser,onlineUsers,authUser} = useSelector((store)=>store.user)
  const isOnline = onlineUsers?.includes(selectedUser?._id)
  const dispatch = useDispatch()

  // useEffect(()=>{
  //  return ()=> dispatch( setSelectedUser)
  // },[selectedUser])

  if (!selectedUser) return (
    <div className="flex items-center justify-center w-[50%] text-gray-400">
      Select a user to start chat
    </div>
  );

  return (
    <div className="flex flex-col h-170 w-[50%] ml-0">

      {/* HEADER */}
      <div className="flex gap-3 items-center border-b pb-3">
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-14 rounded-full">
            <img src={selectedUser?.profilePhoto} alt="img" />
          </div>
        </div>
        <p className="text-lg font-semibold">{selectedUser.fullname}</p>
      </div>

      {/* MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <Messages />
      </div>

      {/* INPUT */}
      <SendInput />
    </div>
  );
};

export default MessageContainer;
