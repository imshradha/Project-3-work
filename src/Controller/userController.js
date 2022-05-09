const mongoose = require("mongoose");
const userModel = require("../Models/userModel");
const collegeModel = require("../Models/userModel");

const User = async function (req, res) {
    try{
        let {title, name, phone, email, password , address} = req.body
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
        if(!phone){
            return res.status(400).send({
                status: false,
                message: "Phone is Required",
            })
        }
        if(!email){
            return res.status(400).send({
                status: false,
                message: "Email is Required",
            })
        }
        if(!password){
            return res.status(400).send({
                status: false,
                message: "Password is Required",
            })
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