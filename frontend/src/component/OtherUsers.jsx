import React from "react";
import OtherUser from "./OtherUser";
import { useGetOtherUser } from "../hook/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = ({userss}) => {
  useGetOtherUser();

  // const { otherUsers } = useSelector((store) => store.user);

  // const listToShow = users?.length > 0 ? users : otherUsers;
  if (!userss) return <h1>Loading...</h1>;
  return (
    <>
      <div className="overflow-auto h-98 flex-1">
        {userss?.map((users) => {
          return <OtherUser users={users} key={users?._id} />;
        })}
      </div>
    </>
  );
};

export default OtherUsers;
