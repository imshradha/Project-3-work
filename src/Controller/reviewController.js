const reviewModel = require("../Models/reviewModel");
const bookModel = require("../Models/bookModel");
const Validator = require("../Validator/valid");


const createReview = async function(req, res) {
    try {
        const bookId = req.params.bookId;

        const data = req.body;
        const {reviewedBy, rating, review} = data;

        //check req.body is empty or not
        if(Object.keys(data).length == 0){return res.status(400).send({status:false,msg:"No data provided!"})}

        //check reviewBy is valid or not
        if(!Validator.isValid(reviewedBy)) return res.status(400).send({status: false,message: "reviewedBy is Required"});
        if(!/^[A-Za-z ]+$/.test(reviewedBy))  return res.status(400).send({status: false, message: "Invalid reviewedBy"});
        
        //check review is valid or not
        if(!Validator.isValid(review)) return res.status(400).send({status: false,message: "review is Required"});
        if(!/^[A-Za-z . - ]+$/.test(review))  return res.status(400).send({status: false, message: "Invalid review"});

        //check rating is valid or not

        if(!Validator.isValid(rating)) return res.status(400).send({status: false,message: "rating is Required"});
        if(!/^[0-9]{1,2}$/.test(rating)) return res.status(400).send({status: false,message: "rating is not valid"});

        const bookReview = await bookModel.findByIdAndUpdate(bookId, {$inc:{reviews: 1}});
        data.bookId = req.params.bookId;
        const savedData = await reviewModel.create(data)
        return res.status(201).send({ status: true, message: "success",  data: savedData});

    }catch(error) {
        return res.status(500).send({status : false, message: error.message});

    }
}

module.exports.createReview = createReview




