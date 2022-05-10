const express = require("express");//import express
const router = express.Router();//used express to create route handlers
const userController = require("../Controller/userController")
const bookController = require("../Controller/bookController")

router.post('/register', userController.User)

router.post("/login",userController.Login)

router.post('/books', bookController.Book)


module.exports = router;