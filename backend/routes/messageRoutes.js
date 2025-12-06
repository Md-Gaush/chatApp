import express from "express"
import { getMessage, sendMessage } from "../controllers/messageController.js"
import { isAuthentication } from "../config/isAuthentication.js"
const router = express.Router()


router.post("/send/:id",isAuthentication,sendMessage)
router.get("/:id",isAuthentication,getMessage)

export default router