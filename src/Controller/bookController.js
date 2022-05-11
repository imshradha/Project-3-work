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
/**************************************** GET BOOKS ******************************************/

const getBooks = async function(req, res) {
    try {

        let fieldToUpdate = {
           userId : req.query.userId,
           category : req.query.category,
           subcategory : req.query.subcategory
          };

          for (const [key, value] of Object.entries(fieldToUpdate)) {
            if (!value) delete fieldToUpdate[key];
      
          }

          
        const book = await bookModel.find({ $and: [{ isDeleted: false }, fieldToUpdate] }).sort({title:1}).select({_id: 1,title: 1, excerpt: 1, userId: 1,category: 1, releasedAt: 1, reviews: 1});
        if(book.length == 0) return res.status(404).send({status: false, message: "Book not found"})

        return res.status(200).send({status: true, message: "Success", data: book})
        

    }catch(error){
        return res.status(500).send({message: error.message});
    }
}

/************************************************ Update Book data ***************************************************/

const updateBook = async function (req, res) {
    try{
    let bookId = req.params.bookId

    let fieldToUpdate = {
      title : req.body.title,
      excerpt : req.body.excerpt,
      releasedAt : req.body.releasedAt,
      ISBN : req.body.ISBN

       };

       for (const [key, value] of Object.entries(fieldToUpdate)) {
         if (!value) delete fieldToUpdate[key];
       }
    
    const checktitle = await bookModel.findOne({title: req.body.title, isDeleted:false})
    if(checktitle){
        return res.status(400).send({ status: false, message: 'title should be unique please try with another option'})
    }
 
    const checkISBN = await bookModel.findOne({ISBN: req.body.ISBN, isDeleted: false})
    if(checkISBN){
        return res.status(400).send({ status: false, message: 'ISBN should be unique please try with another option'})
    }
    
    const checkBook = await bookModel.findOneAndUpdate(
      { _id: bookId, isDeleted: false },
      { $set: { ...fieldToUpdate } },
      { new: true })
    res.status(201).send({ Status: true, message:"Updated", Data: checkBook })
    }
    catch(error){
        return res.status(500).send({message: error.message});
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
module.exports = {Book, getBooks,deleteBook}
module.exports.updateBook = updateBook