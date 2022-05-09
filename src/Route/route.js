const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController")

router.post('/register', userController.User)

router.post("/login",userController.Login)


module.exports = router;