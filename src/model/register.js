const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const validator=require("validator")
const jwt = require("jsonwebtoken");

const userSchema=new Schema({
    name:{
         type:String,
         required:true},
    email:{
        type:String,
        required:true,
        unique:true,
validate(value){
    if(!validator.isEmail(value)){
        throw new Error("Email is Invalid");
    }
}
    },
    password:{
        type:Schema.Types.Mixed,
        required:true
    }    


})


const User=mongoose.model("User",userSchema);


module.exports=User