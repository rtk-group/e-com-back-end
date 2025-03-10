import express from 'express'
import { addcart, getusercart, updatecart } from '../controllers/cartcontroller.js'
import authuser from '../middleware/auth.js';

const cartrout = express.Router();

cartrout.post('/get', authuser, getusercart)
cartrout.post('/add', authuser, addcart)
cartrout.post('/update', authuser, updatecart)

export default cartrout