const express = require("express"); //import express
const router = express.Router(); //used express to create route handlers
const userController = require("../Controller/userController")
const bookController = require("../Controller/bookController")
const {Authentication,Authrization} = require("../middleware/auth")

router.post('/register', userController.User)

router.post("/login",userController.Login)

router.post('/books',Authentication,Authrization, bookController.Book)

router.get('/getbooks',Authentication, bookController.getBooks)

router.put("/books/:bookId",Authentication, Authrization, bookController.updateBook)


module.exports = router;