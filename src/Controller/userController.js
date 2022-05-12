const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const Validator = require("../Validator/valid")


/************************************************ Create User data ************************************************** */
const User = async function (req, res) {
    try{
        let data1 = req.body

        let {title, name, phone, email, password} = data1

        if(Object.keys(data1).length == 0){return res.status(400).send({status:false,msg:"No data provide!!"})}
        
        if(!Validator.isValid(title)) return res.status(400).send({status: false,message: "Title is Required"});
        
        if (["Mr", "Miss", "Mrs"].indexOf(title) == -1) return res.status(400).send({ status: false, message: "Invalid title" })
        
        if(!Validator.isValid(name)) return res.status(400).send({status: false,message: "Name is Required"});
        
        //check name is valid or not 
        if(!/^[A-Za-z ]+$/.test(name)) return res.status(400).send({status: false, message: "Invalid name"});
        
        if(!Validator.isValid(phone)) return res.status(400).send({status: false,message: "Phone is Required"});
        
        //check mobile number is valid or not
        const isValidNumber = /^\d{10}$/.test(phone)
        if (!isValidNumber)  return res.status(400).send({ status: false, message: "Invalid phone number"});

        // check phone is already used
        const isPhoneUsed = await userModel.findOne({phone: phone });
        if (isPhoneUsed) return res.status(400).send({ status: false, message:"phone is already used, try different one"});


        if(!Validator.isValid(email)) return res.status(400).send({status: false,message: "Email is Required"});
        
       // check email is valid or not
      if (!Validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "Invalid email address"});
        

        //check email is already used
        const isEmailUsed = await userModel.findOne({email: email });
        if (isEmailUsed) return res.status(400).send({ status: false, message:  "email is already used, try different one"});
    

        if(!Validator.isValid(password)) return res.status(400).send({status: false,message: "Password is Required"});
        
        // check password is valid or not
        if (!Validator.isValidPassword(password)) return res.status(400).send({ status: false, message: "Invalid password Ex:- Abcd@123456"});

        let data = await userModel.create(data1);
        return res.status(201).send({ status: true, data: data});
    }
    catch(err){
       return res.status(500).send({ status : false , message: err.message});
    }
};
module.exports.User = User;

/**************************************** Login user ******************************************/

const Login =async function(req,res){
    try{
        let data =req.body
        const{ email, password} = data
        // no present the key in body 
        if(Object.keys(data).length == 0){return res.status(400).send({status:false,msg:"NO data provide!!"})}
        //check the email is present or not
        if(!Validator.isValid(email)){ return res.status(400).send({status: false,message: "Email is Required"});}
        // check the email is valid or not
        if (!Validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "Invalid email address"});
          // check password is present or not
          if(!Validator.isValid(password)){return res.status(400).send({status: false,message: "Password is Required"});}
        //check the password is valid or not
        if(!Validator.isValidPassword(password)) return res.status(400).send({status: false,message: "Password is Required Ex:-Abcdd@234567"});

        // check the email and password are exists in user db
        let logCheck = await userModel.findOne({email:email,password:password});
        if(!logCheck){
            return res.status(400).send({ status: false, message: "This email id and password not valid"});
        }
        //create the jwt token 
        let token = jwt.sign({
            userId:logCheck._id.toString(),
            group:7

        },"fasterGroup7th",{expiresIn: "200m" });// give the token expires time 120m 

        res.setHeader("x-api-key", token);
       return res.status(200).send({ status: true, data: "login Successful",iat:new String(Date()), token});
    }catch(err){
        return res.status(500).send({status : false , message: err.message});
    }
}
module.exports.Login = Login;



