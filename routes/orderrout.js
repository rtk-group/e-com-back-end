import express from 'express'

import { placeorder, placeorderstrip, placeorderrazorpay, allorders, userorders, updatestatus } from '../controllers/ordercontroller.js'
import adminauth from '../middleware/adminauth.js'
import authuser from '../middleware/auth.js'
const orderrouter = express.Router()

// admin features
orderrouter.post('/list',adminauth,allorders)
orderrouter.post('/status',adminauth,updatestatus)

// pament features
orderrouter.post('/place',authuser,placeorder)
orderrouter.post('/stripe',authuser,placeorderstrip)
orderrouter.post('/razorpay',authuser,placeorderrazorpay)

// user feature
orderrouter.post('/userorders',authuser,userorders)

export default orderrouter;


