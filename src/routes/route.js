const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController")
const bookController = require("../Controller/bookController")
const {Authentication,Authrization} = require("../middleware/auth")

router.post('/register', userController.User)

router.post("/login",userController.Login)

router.post('/books',Authentication, bookController.Book)


module.exports = router;