const mongoose=require("mongoose");
const Schema= mongoose.Schema ;
const jwt = require("jsonwebtoken");

const LoginSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
        type:String,
        required:true
        } 
    }]

})


LoginSchema.methods.generateAuthToken=async function(){
    try{
      //  console.log(this._id)
const token=jwt.sign({_id:this._id.toString()},"authenticationpagenodejsassignmentgdfhghghjhg");
this.tokens=this.tokens.concat({token:token})
await this.save();
return token;
//console.log(token)
    }catch(error){
res.send(error.message)
    }
}

const Loginuser=mongoose.model("Loginuser",LoginSchema)

module.exports=Loginuser
