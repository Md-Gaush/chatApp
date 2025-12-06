import axios from 'axios'
import { USER_END_POINT } from '../../constant/constant'
import { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { setOtherUsers } from '../../redux/userSlice'

export const useGetOtherUser = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
    const fetchOtherUsers = async()=>{
        try {
            const res = await axios.get(`${USER_END_POINT}/user/allusers`,{
                withCredentials:true
            })
            dispatch(setOtherUsers(res?.data?.otherUsers))
        } catch (error) {
            console.log(error)
        }
    }
    fetchOtherUsers()
    },[])
}