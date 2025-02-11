import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectcloudinary from './config/cloudinary.js';
import userRouter from './routes/userrout.js';


// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectcloudinary();


// middleware
app.use(express.json());
app.use(cors());

// api endpoint
app.use('/api/user/',userRouter);
app.get('/',(req, res)=>{
    res.send("hello world");
})

app.listen(port,()=>{
    console.log("server is run at " + port);
})

