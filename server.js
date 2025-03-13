import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectcloudinary from './config/cloudinary.js';
import userRouter from './routes/userrout.js';
import productrouter from './routes/productrout.js'
import cartrout from './routes/cartrout.js';
import orderrouter from './routes/orderrout.js';


// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectcloudinary();


// middleware
app.use(express.json());
app.use(cors());

// api endpoint
app.use('/api/user',userRouter);
app.use('/api/product',productrouter);
app.use('/api/cart', cartrout)
app.use('/api/order', orderrouter)


app.get('/',(req, res)=>{
    res.send("hello world jgf");
})

app.listen(port,()=>{
    console.log("server is run at " + port);
})

