import express from 'express'
// const app = express();
import { app, server } from "./socket/socket.js";
import dotenv from 'dotenv';
import { dataBase } from './config/database.js';
import userRoute from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path'

dotenv.config({})

const _dirname = path.resolve()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "https://chatapp-ngqw.onrender.com",
    credentials: true,
  }));

app.use('/user',userRoute)
app.use('/message',messageRouter)

dataBase()
const port = process.env.PORT 

app.use(express.static(path.join(_dirname,'/frontend/dist')))
app.get(/.*/,(req,res)=>{
  res.sendFile(path.resolve(_dirname,'frontend','dist','index.html'))
})

server.listen(port,()=>{
    console.log("port is running on",port)
})