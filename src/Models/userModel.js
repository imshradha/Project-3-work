const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            enum: [Mr, Mrs, Miss],
            trim: true
        },
        name: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            trim: true
        },
        address: {
            street: { string },
            city: { string },
            pincode: { string }
        },
    }, { timeStamp: true }
);

module.exports = mongoose.model('User', userSchema)