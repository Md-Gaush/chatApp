import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_END_POINT } from "../../constant/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../../redux/userSlice";

const Login = () => {
    const [loading,setLoading] = useState(false)
    const {authUser} = useSelector((store)=> store.user)
    const dispatch = useDispatch()
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    gender:""
  });
  const navigate = useNavigate()
  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async() => {
    setLoading(true)
    try {
        const res = await axios.post(`${USER_END_POINT}/user/login`,inputData,{
            withCredentials:true
        })
        toast.success(res?.data?.message)
        dispatch(setAuthUser(res?.data?.data))
        navigate('/')
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }finally{
        setLoading(false)
    }
    setInputData({
      username: "",
      password: "",
      confirmPassword: "",
      gender:""
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label">Username</label>
            <input
              type="text"
              name="username"
              value={inputData.username}
              onChange={handleInput}
              className="input"
              placeholder="Username"
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              value={inputData.password}
              onChange={handleInput}
              className="input"
              placeholder="Password"
            />
            <label className="label">ConfirmPassword</label>
            <input
              type="password"
              name="confirmPassword"
              value={inputData.confirmPassword}
              onChange={handleInput}
              className="input"
              placeholder="ConfirmPassword"
            />
            <label className="label">Gender</label>
            <select
              className="select"
              name="gender"
              value={inputData.gender}
              onChange={handleInput}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div>
              Account Created ?
              <Link to="/signup">
                <span className="text-blue-300 cursor-pointer"> register</span>
              </Link>
            </div>
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-neutral mt-4"
              >
                Login
              </button>
            )}
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
