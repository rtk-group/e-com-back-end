
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usermodel from '../models/usermodel.js';

const createtoken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// route for login user
const loginuser = async(req , res)=>{
    try{

        const {email, password} = req.body;
        const user = await usermodel.findOne({email});
        if(!user){
            return res.json({success: false , msg: "user doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = createtoken(user._id);
            res.json({success: true, token })
        }else{
            res.json({success: false, message: "invalid credentials"})
        }


    }catch(error){
        console.log(error)
        res.json({success: false, msg: error.message})
    }

}

// route for register user
const registeruser = async(req , res)=>{
    try{
        const {name, email, password} = req.body;

    // checking user already axist or not
    const exist = await usermodel.findOne({email});
    if(exist){
        return res.json({success: false , msg: "user already exist"})
    }
    // validating email and password
    if(!validator.isEmail(email)){
        return res.json({success: false , msg: "please enter valid email"})
    }
    if(password.length < 8){
        return res.json({success: false , msg: "please enter a strong password"})
    }

    // hashing username and password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newuser = new usermodel({
        name,
        email,
        password: hashedpassword
    });

    const user = await newuser.save();

    const token = createtoken(user._id);

    res.json({sccess:true,token});

    }catch(error){
        console.log(error)
        res.json({success: false, msg: error.message})
    }
}

// route for admin  login
const adminlogin = async (req, res)=>{

}

export {loginuser, registeruser, adminlogin}
