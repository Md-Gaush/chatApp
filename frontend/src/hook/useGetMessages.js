import { useEffect } from "react";
import axios from "axios";
import { USER_END_POINT } from "../../constant/constant";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/messageSlice";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!selectedUser?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${USER_END_POINT}/message/${selectedUser?._id}`,
          { withCredentials: true }
        );

        dispatch(setMessages(res?.data?.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
