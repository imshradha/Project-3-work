const express = require("express"); //import express
const router = express.Router(); //used express to create route handlers
const userController = require("../Controller/userController")
const bookController = require("../Controller/bookController");
const { route } = require("express/lib/application");

router.post('/register', userController.User)

router.post("/login",userController.Login)

router.post('/books', bookController.Book)

router.get('/getbooks', bookController.getBooks)

router.put("/books/:bookId",bookController.updateBook)


module.exports = router;