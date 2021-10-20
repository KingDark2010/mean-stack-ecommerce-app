// require express router module
const router = require('express').Router();
//require category model
const Order = require('../db/models/order.model');
const OrderItem = require('../db/models/orderItem.model');
const User = require('../db/models/user.model');
const responseCreator = require('../helpers/response.helper')
const Product = require('../db/models/product.model');
const auth = require('../middleware/auth');

// get all orders
router.get('/', auth.AuthAdmin, async (req, res) => {
    try {
        // populate the order with the user firstName lastName email and orderItems's product with product name
        const orders = await Order.find().populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                select: 'name price category brand',
                populate: {
                    path: 'category',
                    select: 'name'
                }
            
        }}).populate('user', 'firstName lastName email');

        //const orders = await Order.find({}).populate('user', 'firstName lastName email').populate('orderItems', 'product quantity').populate('product', 'name price');
        if(!orders){
            return res.status(404).send(responseCreator(404, null, 'No orders found'));
        }
        return res.status(200).send(responseCreator(200, orders, 'Orders found'));
    } catch (error) {
        return res.status(500).send(responseCreator(500, null, error.message));
    }
});

// post new order
router.post('/add', async (req, res) => {
    try {
        const product = await Product.findById(req.body.orderItems.product);
        if(!product){
            return res.status(404).send(responseCreator(404, null, 'Product not found'));
        }
        const user = await User.findById(req.body.user);
        if(!user){
            return res.status(404).send(responseCreator(404, null, 'User not found'));
        }
        const orderItemsId = Promise.all(req.body.orderItems.map(async item => {
            let newItem = new OrderItem({
                quantity: item.quantity,
                product: item.product
            });
            let newOrderItem = await newItem.save();
            return newOrderItem._id;
        }));
        const orderPromiseResult = await orderItemsId; 
        const totalPrice = Promise.all(orderPromiseResult.map(async item => {
            const orderItem = await OrderItem.findById(item).populate('product', 'price');
            return orderItem.product.price * orderItem.quantity;
            }));
        const totalPriceResult = await totalPrice;
        console.log(totalPriceResult);
        const order = new Order(req.body);
        order.orderItems = orderPromiseResult;
        order.user = user._id;
        order.totalPrice = totalPriceResult.reduce((a, b) => a + b, 0);
        // reduce the product countInStock by the quantity
        product.countInStock -= req.body.orderItems.quantity;
        await product.save();
        await order.save();
        res.status(201).send(responseCreator(201, order, 'Order created'));
    } catch (error) {
        res.status(500).send(responseCreator(500, null, error.message));
    }
});

// get order by id
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                select: 'name price category brand',
                populate: {
                    path: 'category',
                    select: 'name'
                }
            
        }}).populate('user', 'firstName lastName email');
        if(!order){
            return res.status(404).send(responseCreator(404, null, 'No order found'));
        }
        return res.status(200).send(responseCreator(200, order, 'Order found'));
    } catch (error) {
        return res.status(500).send(responseCreator(500, null, error.message));
    }
});

// update order
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!order){
            return res.status(404).send(responseCreator(404, null, 'No order found'));
        }
        return res.status(200).send(responseCreator(200, order, 'Order updated'));
    } catch (error) {
        return res.status(500).send(responseCreator(500, null, error.message));
    }
});

// delete order
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order){
            return res.status(404).send(responseCreator(404, null, 'No order found'));
        }
        await order.orderItems.forEach(async item => {
            await OrderItem.findByIdAndDelete(item);
        });
        return res.status(200).send(responseCreator(200, order, 'Order deleted'));
    } catch (error) {
        return res.status(500).send(responseCreator(500, null, error.message));
    }
});



//export order router
module.exports = router;