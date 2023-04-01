const express = require('express');
const auth_route = express();

const authController = require('../controller/authController')



//register
auth_route.post("/register", authController.register);


//Login
auth_route.post("/login",authController.login)
module.exports = auth_route;