// require mongooose
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    shippingAddress1: {
        type: String,
        required: true,
        trim: true
    },
    shippingAddress2: {
        type: String,
        trim: true
    },
    shippingCity: {
        type: String,
        required: true,
        trim: true
    },
    shippingZip: {
        type: String,
        required: true,
        trim: true
    },
    shippingCountry: {
        type: String,
        required: true,
        trim: true
    },
    shippingPhone: {
        type: String,
        required: true,
        trim: true
    },
    shipmentStatus: {
        type: String,
        trim: true,
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        trim: true,
        default: 'Pending'
    },
    totalPrice: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateOfOrder: {
        type: Date,
        default: Date.now
    }
});

//export the model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;