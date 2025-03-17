// import express from "express";
// import { register, login, getAllUsers } from "../controllers/authController.js";

// const router = express.Router(); // Correct way to create a router

// router.post("/register", register);
// router.post("/login", login);
// router.get("/users", getAllUsers); // Get all users

// export default router; // ✅ Ensure this is `export default router;`



import express from 'express'
let userRoute = express.Router()
import { register,userLogin ,getProfile} from '../controllers/userController.js'

userRoute.post('/register',register)
userRoute.post('/login',userLogin)
userRoute.get('/profile/:email',getProfile)

export default userRoute
