const jwt = require('jsonwebtoken');
const bookModel = require('../Models/bookModel');
const Validator = require("../Validator/valid")



const Authentication = async function (req, res, next) {
    try {
        // getting token from req(header)
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["X-Api-Key"];
        if (!token) {return res.status(400).send({status:false, mmsg: "Enter x-api-key In Header" });}
        // token verification
        let checktoken = jwt.verify(token, "fasterGroup7th");
        //check the token are verify or not
        if (!checktoken) {return res.status(404).send({ Status: false, msg: "Enter Valid Token" });}
        else {console.log("Token Verified");}
        next();
    }
    catch (err) {
        res.status(500).send({ msg: err.message });
    }
}
module.exports.Authentication = Authentication;


const Authrization = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["X-Api-Key"]; //taking the x-api-key of value token in headers
        // check the token are prenent or not in headers
        if (!token) {return res.status(400).send({ Error: "Enter x-api-key In Header" });}
        // verify the token 
        let decodedToken = jwt.verify(token, "fasterGroup7th")
         let decoded = decodedToken.userId
        let bookId = req.params.bookId;
        // check the value of bookid are present in params  or not
        if(!Validator.isValid(bookId)){
            let userId = req.body.userId;
            // check the user id present in body
            if(!Validator.isValid(userId)) return res.status(400).send({status: false,message: "userId is Required"});
            //validation of user id
            if(!Validator.isValidObjectId(userId))  return res.status(400).send({status: false,message: "userId is not valid"});

           //check the  user id are present in decoded token
            if (userId != decoded) { return res.status(401).send({status:false,msg:"Not Authorised!!"})}
        }else{
            // check the book id are present in db
            let book = await bookModel.findById(bookId);
            if (!book) { return res.status(404).send({status:false,msg:"book id not exists!!"}); }
            //taking the user id in book model
            let user = book.userId.toString() // the user id is convert to string and save to user variable
            
            //check the user id and decoded token in user id same or not 
            if (user != decoded) { return res.status(401).send({status:false,msg:"Not Authorised!!"})}
        }
        next()
    }
    catch (err) {
        return res.status(500).send({ status:false,msg: err.message });
    }
}
module.exports.Authrization = Authrization;