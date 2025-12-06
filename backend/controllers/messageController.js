import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const senderId = req.id;
    const receiverId = req.params.id;
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    await gotConversation.save();
    // socket io
      const receiverSocketId = getReceiverSocketId(receiverId)
    if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage',newMessage)
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
       newMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async(req,res)=>{
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
   const conversation = await Conversation.findOne({
    participants:{$all:[senderId,receiverId]}
}).populate({path:"messages", populate: {
  path: "senderId receiverId",
  select: "username profilePhoto"
}})
  return res.status(200).json({
    message:"get messages",
    success:true,
   data:conversation?.messages || []
  })
    } catch (error) {
        console.log(error)
    }
}