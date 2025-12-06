import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { setSelectedUser } from '../../redux/userSlice'

const OtherUser = ({users}) => {
 const dispatch = useDispatch()
 const {selectedUser,onlineUsers} = useSelector((store)=>store.user)
 const isOnline = onlineUsers?.includes(users._id)
   const selectedUserHandler = (user) =>{
       dispatch(setSelectedUser(user))
    }
   
  return (
    <>
        <div 
      className={`flex gap-3 items-center hover:bg-gray-700 rounded-2xl mt-3 cursor-pointer ${selectedUser?._id === users?._id ? 'bg-gray-700' : ""}`}
         onClick={()=>selectedUserHandler(users)}>
          <div className={`avatar ${isOnline ? 'online' : ''} relative`}>
            <div className="w-14 rounded-full">
              <img
                src={users?.profilePhoto}
                alt="img"
              />
            </div>
          </div>
          <div className="">
            <div className="flex gap-3 flex-1">
              <p>{users?.fullname}</p>
            </div>
          </div>
        </div>
        <div className="divider my-0 py-0 h-1"></div>
      </>
  )
}

export default OtherUser
