import express from 'express'
let userRoute = express.Router()
import { register,userLogin ,getProfile} from '../controllers/userController.js'

userRoute.post('/register',register)
userRoute.post('/login',userLogin)
userRoute.get('/profile/:email',getProfile)

export default userRoute
