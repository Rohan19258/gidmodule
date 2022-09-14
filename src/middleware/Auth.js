const jwt = require("jsonwebtoken");
const Loginuser=require("../model/login");


const auth=async(req,res,next)=>{
    try{
        const token=req.headers.authorization;
        const verifyUser=jwt.verify(token,"authenticationpagenodejsassignmentgdfhghghjhg");
//console.log(verifyUser)

const user= await Loginuser.findOne({_id:verifyUser._id})
//console.log(user)
next()
    }catch(error){
res.status(401).send(error)
    }
}

module.exports=auth