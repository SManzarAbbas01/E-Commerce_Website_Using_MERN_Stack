import express from 'express'
import { addCart,updateCart,getUser } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()
cartRouter.get('/get',authUser,getUser)
cartRouter.post('/add',authUser,addCart)
cartRouter.post('/update',authUser,updateCart)

export default cartRouter