const mongoose=require("mongoose");
const Schema = mongoose.Schema;



const postSchema=new Schema({

    title:String,
    body:String,
    image:String,
    user:String
})

const Userpost=mongoose.model("Userpost",postSchema)

module.exports=Userpost