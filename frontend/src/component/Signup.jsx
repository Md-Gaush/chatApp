import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_END_POINT } from "../../constant/constant";
import toast from "react-hot-toast";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate()
  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${USER_END_POINT}/user/register`,
        inputData,
        {
          withCredentials: true,
        }
      );
      toast.success(res?.data?.message)
      navigate('/login')
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
    setInputData({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label">FullName</label>
            <input
              type="text"
              name="fullname"
              onChange={handleInput}
              value={inputData.fullname}
              className="input"
              placeholder="FullName"
            />
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
            {/* <div><a className="link link-hover">Forgot password?</a></div> */}
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
              Already have account?
              <Link to="/login">
                <span className="text-blue-300 cursor-pointer"> Login</span>
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
                Signup
              </button>
            )}
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Signup;
