const userModel = require("../Models/userModel");

const User = async function (req, res) {
    try{
        let {title, name, phone, email, password, address} = req.body
        const requestbody = req.body;
        if(Object.keys(requestbody).length == 0){
            return res.status(400).send({
                status: false,
                message: "Invalid Request. Please provide user details",
            });
        }
        if(!title){
            return res.status(400).send({
                status: false,
                message: "Title is Required",
            })
        
        }
        if(!name){
            return res.status(400).send({
                status: false,
                message: "Name is Required",
            })
        }
        //check name is valid or not 
        if(!/^[A-Za-z ]+$/.test(name)) {
            res.status(400).send({status: false, message: "Invalid name"})
        }
        if(!phone){
            return res.status(400).send({
                status: false,
                message: "Phone is Required",
            })
        }
        //check mobile number is valid or not
        const isValidNumber = /^\d{10}$/.test(phone)
        if (!isValidNumber) {
            return res.status(400).send({ status: false, message: "Invalid phone number" })
        }

        // check phone is already used
        const isPhoneUsed = await userModel.findOne({phone: phone });
        if (isPhoneUsed) {
            return res.status(400).send({ status: false, message:  "phone is already used, try different one "})
        }

        if(!email){
            return res.status(400).send({
                status: false,
                message: "Email is Required",
            })
        }
        // check email is valid or not
        const isValidEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email);
        if (!isValidEmail) {
            return res.status(400).send({ status: false, message: "Invalid email address" })
        }

        // check email is already used
        const isEmailUsed = await userModel.findOne({email: email });
        if (isEmailUsed) {
            return res.status(400).send({ status: false, message:  "email is already used, try different one" })
        }

        if(!password){
            return res.status(400).send({
                status: false,
                message: "Password is Required",
            })
        }
        // check password is valid or not
        const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password);
        if (!isValidPassword) {
            return res.status(400).send({ status: false, message: "Invalid password" })
        }

        if(!address){
            return res.status(400).send({
                status: false,
                message: "Address is Required",
            })
        }
        let data = await userModel.create(req.body);
        return res.status(201).send({ status: true, data: data});
    }
    catch(error){
        res.status(500).send({message: error.message});
    }
};
module.exports.User = User;