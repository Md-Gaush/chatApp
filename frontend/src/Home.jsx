import React from "react";
import Sidebar from "./component/Sidebar";
import MessageContainer from "./component/MessageContainer";

const Home = () => {
  return (
    <div className="flex h-screen rounded-lg overflow-hidden items-start justify-evenly mt-10">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
