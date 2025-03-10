import usermodel from '../models/usermodel.js'


// add products to user cart
const addcart = async (req, res)=>{
    try {
       const {userid, itemid, size} = req.body
       
       const userData = await usermodel.findById(userid)
       let cartData = await userData.cartData;

       if (cartData[itemid]) {
        if (cartData[itemid][size]) {
            cartData[itemid][size] += 1
        }else{
            cartData[itemid][size] = 1
        }
       }else{
        cartData[itemid] = {}
        cartData[itemid][size] = 1
       }

       await usermodel.findByIdAndUpdate(userid, {cartData})

       res.json({success:true, message:'Add to cart'})



    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// update user cart
const updatecart = async (req, res)=>{
    try {
        const { userid, itemid, size, quantity } = req.body;
        const userdata = await usermodel.findById(userid);
        let cartdata = await userdata.cartdata;

        cartdata[itemid][size] = quantity
        await usermodel.findByIdAndUpdate(userid, {cartdata})
        res.json({success:true, message:"Cart Updated"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// get user cart data
const getusercart = async (req, res)=>{
    try {
        const { userid } = req.body
        const userdata = await usermodel.findById(userid);
        let cartdata = await userdata.cartdata;

        res.json({success:true, cartdata})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export { addcart, updatecart, getusercart }




// const { userid, itemid, size } = req.body;
//         console.log(userid, itemid, size)

//         const userdata = await usermodel.findById(userid);
//         console.log(userdata)
    
//         const cartdata = await userdata.cartdata || {};
//         console.log(cartdata);

//         if(cartdata[itemid]){

//             console.log("hdfdk")
//             if (cartdata[itemid][size]) {
//                 cartdata[itemid][size] += 1
//             }else{
//                 cartdata[itemid][size] = 1
//             }
//         }else{
//             console.log('else is working')
//             cartdata[itemid] = {}
//             cartdata[itemid][size] = 1
//         }

//         await usermodel.findByIdAndUpdate(userid, {cartdata})
//         res.json({success:true, message:"Added to cart"})