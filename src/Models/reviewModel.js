const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        ref: "Book",
        trim: true  
    },
    reviewedBy: {
        type: String,
        required: true,
        trim: true  

    },
    reviewedAt: {
        type : Date, 
        trim: true  
    },
    rating: {
        type: Number,
        default: 0,
        min: 1,
        max: 5    
    },
    review: {
        type : String,
        trim: true  
    }  
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema)
