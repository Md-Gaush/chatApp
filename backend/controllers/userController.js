import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv from 'dotenv'

// dotenv.config()

export const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        message: "All failed are required",
        success: false,
      });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(201).json({
        message: "User Already Exist ",
        success: false,
      });
    }
    const hasedPassword = await bcrypt.hash(password, 16);

    // profilePhoto

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    await User.create({
      fullname,
      username,
      password: hasedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    return res.status(200).json({
      message: "User register successfully...",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
      return res.status(401).json({
        message: "Something is missing",
        success: false,
      });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "Incorrect user and password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        message: "Incorrect user and password",
        success: false,
      });
    }
    const token = await jwt.sign({ userId:user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
  let  data = {
    _id: user._id,
    username: user.username,
    fullname: user.fullname,
    profilePhoto: user.profilePhoto,
  }

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login Successfully",
        success: true,
       data,
      });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const logout = async(req,res)=>{
    try {
        return res.status(200).cookie('token',"",{maxAge:0}).json({
            message:'Logout Successfully...',
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
          message: "Internal Server Error",
          success: false,
        });
    }
}

// all user
export const allUsers = async(req,res)=>{
    try {
        const userId = req.id;
        const otherUsers = await User.find({ _id: { $ne: userId.toString() } }).select('-password');
        return res.status(200).json({
            message:"Get all users",
            success:true,
            otherUsers
        })
    } catch (error) {
        console.log(error);
        return res.status(501).json({
          message: "Internal Server Error",
          success: false,
        });
    }
}