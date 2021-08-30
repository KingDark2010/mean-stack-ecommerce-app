//install express
const express = require('express');
const app = express();
// install dotenv
require('dotenv').config();
// install cors
const cors = require('cors');
app.use(cors());

// require user route
const userRoute = require('../app/routes/user.route');
// require category route
const categoryRoute = require('../app/routes/category.route');
require('../app/db/mongoose')
// require product route
const productRoute = require('../app/routes/product.route');
// require order route
const orderRoute = require('../app/routes/order.route');


app.use(express.json());
app.use('/product', productRoute);
app.use('/category', categoryRoute);
app.use('/order', orderRoute);
app.use(userRoute);

Port = process.env.PORT || 3000;

module.exports = {
    app,
    Port
}