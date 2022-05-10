const jwt = require('jsonwebtoken');
const bookModel = require('../Models/bookModel');




const Authentication = async function (req, res, next) {
    try {
        // getting token from req(header)
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["X-Api-Key"];
        if (!token) {return res.status(400).send({status:false, mmsg: "Enter x-api-key In Header" });}

        // token verification
        let checktoken = jwt.verify(token, "fasterGroup7th");

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
        if (!token) token = req.headers["X-Api-Key"]

        if (!token) {return res.status(400).send({ Error: "Enter x-api-key In Header" });}

        let decodedToken = jwt.verify(token, "fasterGroup7th",{expiresIn: "120m" })
        let bookId = req.params.bookId
        if (bookId.length < 24) {
            return res.status(404).send({ msg: "Enter Valid Blog-Id" });
        }
        let decoded = decodedToken.userId
        let book = await bookModel.findById(bookId);
        if (!book) { return res.send("Blog doesn't exist");
    }
        let user = book.userId.toString()
        console.log(author)

        if (user != decoded) { return res.status(401).send("Not Authorised!!")}
        next()
    }
    catch (err) {
        return res.status(500).send({ status:false,msg: err.message });
    }
}
module.exports.Authrization = Authrization;