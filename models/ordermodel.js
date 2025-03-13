import mongoose from 'mongoose'

const orderschema = new mongoose.Schema({
    userid: {type: String, require: true},
    items: {type: Array, require: true},
    amount: {type: Number, require: true},
    address: {type: Object, require: true},
    status: {type: String, require: true, default: 'Order Placed'},
    paymentmethod: {type: String, require: true},
    payment: {type: Boolean, require: true, default:false},
    date: {type: Number, require: true}
})

const ordermodel = mongoose.model.order || mongoose.model('order', orderschema)
export default ordermodel;