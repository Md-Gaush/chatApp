import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { USER_END_POINT } from "../../constant/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUsers } from "../../redux/userSlice";

const Sidebar = () => {
  const [search,setSearch] = useState("")
  const {otherUsers} = useSelector((store)=>store.user)
  const [filteredUsers, setFilteredUsers] = useState([]);

 const navigate = useNavigate()
 const dispatch = useDispatch()

const handleLogout = async()=>{
  try {
    const res = await axios.get(`${USER_END_POINT}/user/logout`,{
      withCredentials:true
    })
    toast.success(res?.data?.message)
    navigate("/login")
    dispatch(setAuthUser(null))
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.message)
  }
}
const searchHandleSubmit = (e) => {
  e.preventDefault();

  const users = otherUsers?.filter((user) =>
    user?.fullname?.toLowerCase().includes(search.toLowerCase())
  );

  if (users.length > 0) {
    setFilteredUsers(users); // local only
  } else {
    toast.error("User Not Found!");
  }
};


  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form className="flex items-center" onSubmit={searchHandleSubmit}>
        <div className="flex items-center gap-3">
          <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
            type="text"
            className="input input-borderd rounded-md"
            placeholder="search"
          />
          <button className="btn bg-zinc-500">
            {" "}
            <CiSearch size={26} />
          </button>
        </div>
      </form>
      <div className="divider px-3"></div>
      <OtherUsers userss={filteredUsers.length > 0 ? filteredUsers : otherUsers} />

      <div className="mt-4">
        <button className="bg-blue-400 h-10 w-20 rounded-2xl" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
