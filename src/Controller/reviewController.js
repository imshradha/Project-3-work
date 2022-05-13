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

        //check review is valid or not
        if(!Validator.isValid(review)) return res.status(400).send({status: false,message: "review is Required"});
        if(!/^[A-Za-z . - ]+$/.test(review))  return res.status(400).send({status: false, message: "Invalid review"});

        //check rating is valid or not

        if(!Validator.isValid(rating)) return res.status(400).send({status: false,message: "rating is Required"});
        if(!/^[0-5]{1}$/.test(rating)) return res.status(400).send({status: false,message: "rating is not valid"});

        let fieldToUpdate = {
            bookId : req.params.bookId.trim(),
            reviewedBy : req.body.reviewedBy.trim(),
            rating : req.body.rating.trim(),
            review : req.body.review.trim()
        };
        for (const [key, value] of Object.entries(fieldToUpdate)) {
            if (!value) delete fieldToUpdate[key];  
        }

        const bookReview = await bookModel.findByIdAndUpdate(bookId, {$inc:{reviews: 1}});
        data.bookId = req.params.bookId;

        const savedData = await reviewModel.create(data)
        return res.status(201).send({ status: true, message: "success",  data: savedData});

    }catch(error) {
        return res.status(500).send({status : false, message: error.message});

    }
}

const updateReviews = async function(req,res){
    try{
        let bookId = req.params.bookId;
        let reviewId = req.params.reviewId;

        let fieldToUpdate = {
            reviewedBy : req.body.reviewedBy,
            rating : req.body.rating.trim(),
            review : req.body.review
        };
        if (!Validator.isValid(reviewId)) return res.status(400).send({ status: false, message: "reviewId is Required" });
        if (!Validator.isValidObjectId(reviewId)) return res.status(400).send({ status: false, message: "reviewId is not valid" });

        for (const [key, value] of Object.entries(fieldToUpdate)) {
            if (!value) delete fieldToUpdate[key];
        }
        let books = await bookModel.findById(bookId , {isDeleted : false})
        if(!books) return res.status(404).send({ status: false, message: "book with this id , not found"});

        if(bookId.reviews!=0){
        let reviews = await reviewModel.findOneAndUpdate({_id : reviewId} ,{ $set : {...fieldToUpdate}}, {new : true})
       
        if(!reviews) return res.status(404).send({ status: false, message: "review with this id , not found"});

        let temp = JSON.stringify(books);
        let obj = JSON.parse(temp);
        obj.reviews = reviews;

        return res.status(200).send({ status: false, message: "success", data : obj});
        }

    }
    catch(err){
    return res.status(500).send({message : err.message})
    }
}

const deleteReviews = async function(req,res){
    try{
        let bookId = req.params.bookId;
        let reviewId = req.params.reviewId;

        let book = await bookModel.findOne({_id : bookId, isDeleted : false})
      
        if(!book) return res.status(404).send({status : false , message : "book with this id does not exist"})
        else{

        if (!Validator.isValid(reviewId)) return res.status(400).send({ status: false, message: "reviewId is Required" });
        if (!Validator.isValidObjectId(reviewId)) return res.status(400).send({ status: false, message: "reviewId is not valid" });

        let reviews = await reviewModel.findById(reviewId,{isDeleted: false})
        if(!reviews) return res.status(404).send({status : false , message : "review with this id does not exist"})

        reviews.isDeleted = true;
        await reviews.save();
        book.reviews = book.reviews-1
        await book.save();

        return res.status(200).send({status : true , message : "success"})
        }
    }
    catch(err){
        return res.status(500).send({message : err.message})
    }
    }


module.exports = { createReview,updateReviews,deleteReviews }




