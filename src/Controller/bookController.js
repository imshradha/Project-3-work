const bookModel = require("../Models/bookModel");
const Validator = require("../Validator/valid");



const Book = async function (req, res) {

    try{
        const data = req.body;
        let {title , excerpt, userId, ISBN, category, subcategory} = data

        //check req.body is empty or not
        if(Object.keys(data).length == 0){return res.status(400).send({status:false,msg:"No data provided!"})}

         //check title is valid or not
        if(!Validator.isValid(title)) return res.status(400).send({status: false,message: "Title is Required"});
        if(!/^[A-Za-z ]+$/.test(title))  return res.status(400).send({status: false, message: "Invalid title"});
        let titleCheck = await bookModel.findOne({title : title})
        if(titleCheck) return res.status(400).send({status : false , message :" title already exists , Enter unique value"})


         //check excerpt is valid or not
        if(!Validator.isValid(excerpt)) return res.status(400).send({status: false,message: "Excerpt is Required"});
        if(!/^[A-Za-z ]+$/.test(excerpt))  return res.status(400).send({status: false, message: "Invalid excerpt"});

        //check userId is valid or not
        if(!Validator.isValid(userId)) return res.status(400).send({status: false,message: "userId is Required"});
        if(!Validator.isValidObjectId(userId))  return res.status(400).send({status: false,message: "userId is not valid"});

        //check ISBN is valid or not
        if(!Validator.isValid(ISBN)) return res.status(400).send({status: false,message: "ISBN is Required"});
        if(!/^[0123456789-]{10,13}$/.test(ISBN)) return res.status(400).send({status: false,message: "ISBN is not valid"});

        let userIdCheck = await bookModel.findOne({ISBN : ISBN})
        if(userIdCheck) return res.status(400).send({status : false , message :" ISBN already exists , Enter unique value"})


        //check category is valid or not
        if(!Validator.isValid(category)) return res.status(400).send({status: false,message: "category is Required"});

        //check subcategory is valid or not
        if(!Validator.isValid(subcategory)) return res.status(400).send({status: false,message: "subcategory is Required"});

        let savedData = await bookModel.create(data)
        return res.status(201).send({ status: true,message : "success",  data: savedData});
    }
    catch(err){
        return res.status(500).send({status : false, message: err.message});
    }


}


/**************************************** Delete book ********************************************/

const deleteBook = async function(req,res){
    let bookid = req.params.bookId;
    //check the book id are present in query params or not
    if(!Validator.isValid(bookid)) return res.status(400).send({status: false,message: "book id is Required"});
    // check validation of book id 
    if(!Validator.isValidObjectId(bookid))  return res.status(400).send({status: false,message: "bookId is not valid"});
    //check the book id are exists in db or not
    let bookDetails = await bookModel.findById(bookid)
    if(!bookDetails){return res.status(404).send({status:false,msg:"This book id are not exists"})}
    //check the book data is delete or not
    if(bookDetails.isDeleted == false){
        let deleted = await bookModel.findByIdAndUpdate(bookid,{$set:{isDeleted:true,deletedAt: new String(Date())}},{new:true});
        return res.status(200).send({status:true,msg:deleted}) // delet tehe book data and update the deleted at date
    }else{
        return res.status(400).send({status:false,msg:"this book is already deleted"})
    }

}
module.exports = {Book,deleteBook}