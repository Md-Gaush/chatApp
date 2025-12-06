import express from "express"
import { allUsers, login, logout, register } from "../controllers/userController.js"
import { isAuthentication } from "../config/isAuthentication.js"

const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/allusers',isAuthentication,allUsers)
export default router