const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController")
const bookController = require("../Controller/bookController")

router.post('/register', userController.User)

router.post("/login",userController.Login)

router.post('/books', bookController.Book)


module.exports = router;