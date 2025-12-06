import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/messageSlice";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export const useGetRealTimeMessages = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!authUser) return;

    // create socket only once
    const newSocket = io("http://localhost:8000", {
      query: { userId: authUser._id },
    });

    setSocket(newSocket);

    // listen message
    newSocket.on("newMessage", (newMsg) => {
      dispatch(setMessages([...messages, newMsg])); // functional update
    });

    // cleanup
    return () => {
      newSocket.off("newMessage");
      newSocket.close();
    };
  }, [dispatch,setMessages,messages]); 
};
