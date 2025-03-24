import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import Stripe from 'stripe'

// global variable
const currency = 'inr'
const deliverycharge = 10

// get way initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order using COD method
const placeorder = async (req, res) => {
    try {
        const { userid, items, amount, address } = req.body;

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

        await usermodel.findByIdAndUpdate(userid, { cartData: {} });
        res.json({ success: true, message: 'Order placed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// placing order using Stripe method
const placeorderstrip = async (req, res) => {

    try {
        const { userid, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderdata = {
            userid,
            items,
            address,
            amount,
            paymentmethod: 'Stripe',
            payment: false,
            date: Date.now()
        }

        const neworder = new ordermodel(orderdata)
        await neworder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100
            },
            quantity: item.quantity

        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: { name: 'Delivery Charges' },
                unit_amount: deliverycharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderid=${neworder._id}`,
            cancel_url: `${origin}/verify?success=false&orderid=${neworder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// veryfy strife
const verifystripe = async (req, res) => {
    const { orderid, success, userid } = req.body;

    try {
        if (success === 'true') {
            await ordermodel.findByIdAndUpdate(orderid, { payment: true })
        await usermodel.findByIdAndUpdate(userid, { cartData: {} })
        res.json({success:true})
        }else{
             await ordermodel.findByIdAndDelete(orderid)
             res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// placing order using Razorpay method
const placeorderrazorpay = async (req, res) => {

}

// All orders data for admin panel
const allorders = async (req, res) => {
    try {
        const orders = await ordermodel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// user order data for front-end
const userorders = async (req, res) => {
    try {
        const { userid } = req.body;
        // console.log(userid)
        const orders = await ordermodel.find({ userid })
        // console.log(orders)
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}

// update order status only admin can change
const updatestatus = async (req, res) => {
    try {
        const { orderid, status } = req.body
        await ordermodel.findByIdAndUpdate(orderid, { status })
        res.json({ success: true, message: 'status updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}

export { verifystripe, placeorder, placeorderstrip, placeorderrazorpay, allorders, userorders, updatestatus }

