const ObjectId = require('mongoose').Types.ObjectId;


const isValid = function(value) {
    if(typeof (value) == "undefined" || typeof (value) == null) {return false}
    if(typeof (value).trim().length == 0){ return false}
    if(typeof (value) == "string" && (value).trim().length > 0) {return true}
}

const isValidEmail = function(value){
    if(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)==true){return true}
    else return false

}

const isValidPassword = function(value){
    if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)==true) {return true}
    else return false
}
function isValidObjectId(id){
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}
module.exports = {isValid , isValidEmail , isValidPassword,isValidObjectId}
