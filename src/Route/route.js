const express = require("express");//import express
const router = express.Router();//used express to create route handlers
const userController = require("../Controller/userController")

router.post('/register', userController.User)

router.post("/login",userController.Login)

//export router
module.exports = router;