const express = require("express"); //import express
const router = express.Router(); //used express to create route handlers
const userController = require("../Controller/userController")
const bookController = require("../Controller/bookController")
const reviewController = require("../Controller/reviewController")
const {Authentication,Authorization} = require("../middleware/auth")

router.post('/register', userController.User)

router.post("/login",userController.Login)

router.post('/books',Authentication,Authorization, bookController.Book)

router.get('/getbooks',Authentication, bookController.getBooks)

router.put("/books/:bookId", Authentication, Authorization, bookController.updateBook)

router.delete("/books/:bookId",Authentication,Authorization,bookController.deleteBook)

router.post("/books/:bookId/review",reviewController.createReview)



module.exports = router;
