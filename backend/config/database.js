import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const DB = process.env.MONN
export const dataBase = async() => {
   await mongoose.connect(DB).then((res)=>{
    console.log("DB Connected")
   }).catch((error)=>{
    console.log(error)
   })
}
