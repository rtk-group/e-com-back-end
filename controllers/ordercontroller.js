import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";

// placing order using COD method
const placeorder = async(req, res) =>{
    try{
       const {userid, items, amount, address} = req.body;

       const orderdata = {
        userid,
        items,
        address,
        amount,
        paymentmethod: 'COD',
        payment: false,
        date: Date.now()
       }

       const neworder = new ordermodel(orderdata)
       await neworder.save()

       await usermodel.findByIdAndUpdate(userid,{cartData:{}});
       res.json({success:true, message:'Order placed'})



    }catch(error){
        console.log(error)
        res.json({success:false,message: error.message})

    }
}

// placing order using Stripe method
const placeorderstrip = async(req, res) =>{

}

// placing order using Razorpay method
const placeorderrazorpay = async(req, res) =>{

}

// All orders data for admin panel
const allorders = async(req, res) =>{

}

// user order data for front-end
const userorders = async(req, res) =>{

}

// update order status only admin can change
const updatestatus = async(req, res) =>{

}

export { placeorder, placeorderstrip, placeorderrazorpay, allorders, userorders, updatestatus }

