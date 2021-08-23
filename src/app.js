//install express
const express = require('express');
const app = express();
// install dotenv
require('dotenv').config();
// require user route
const userRoute = require('../app/routes/user.route');
require('../app/db/mongoose')


app.use(express.json());
app.use(userRoute);

Port = process.env.PORT || 3000;

module.exports = {
    app,
    Port
}