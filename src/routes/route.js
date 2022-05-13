const express = require("express"); //import express
const router = express.Router(); //used express to create route handlers
const userController = require("../Controller/userController")
const bookController = require("../Controller/bookController")
const reviewController = require("../Controller/reviewController")
const {Authentication,Authorization} = require("../middleware/auth")

router.post('/register', userController.User)

router.post("/login",userController.Login)

router.post('/books',Authentication,Authorization, bookController.Book)

router.get('/books',Authentication, bookController.getBooks)

router.get('/books/:bookId',Authentication, bookController.getBooksBybookId)

router.put("/books/:bookId",Authentication,Authorization, bookController.updateBook)

router.delete("/books/:bookId",Authentication,Authorization, bookController.deleteBook)

router.post("/books/:bookId/review",Authentication, reviewController.createReview)

router.put("/books/:bookId/review/:reviewId",Authentication, reviewController.updateReviews)

router.delete("/books/:bookId/review/:reviewId",Authentication, reviewController.deleteReviews)


module.exports = router;
