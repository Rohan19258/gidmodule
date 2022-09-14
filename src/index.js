const express=require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const connection=require("./connection")
const Loginuser=require("./model/login")
const port=3000
const User=require("./model/register")
const app=express()
const jwt=require("jsonwebtoken")
const jwtkey="jwt"
const auth=require("./middleware/Auth")
const Userpost=require("./model/post")

app.use(bodyParser.urlencoded({extended:false}))

app.use(express.json())


app.post("/register",async(req,res)=>{
try{var new_user=  new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
})



User.findOne({email:req.body.email}).then((user)=>{
if(user){
    res.send("email already exist")
}else{
  result= new_user.save()

}
res.status(201).json({
    status:"success",
    data:new_user
})
})
}
catch(error){

res.status(400).send(error)

}
})


app.post("/login",async(req,res)=>{
try{

let data= new Loginuser({
    email:req.body.email,
    password:req.body.password
})

const userlogin=await User.findOne({email:req.body.email});

if(userlogin.password == req.body.password){
 const token= await data.generateAuthToken();
res.status(200).json({
    status:"success",
    token
})
}
else{
    res.status(400).send("invaild credential")
}
}catch(error){
res.status(400).send("Invalid credential")
}
})


//user post _____

app.get("/posts",auth,async(req,res)=>{
    try{
const data= await Userpost.find()
res.json({
    status:"success",
    result:data
})
    }
    catch(error){
        res.status(401).send(error)
    }
})


app.post("/posts", auth ,async(req,res)=>{  
    try{
const newpost=new Userpost({

    title:req.body.title,
    body:req.body.body,
    image:req.body.image,
    user:req.body.user
})

const result= await newpost.save()
        res.json({
            status:"success",
            result:result
        })
    }catch(error){
        res.status(401).send(error)
    }

})

app.put("/posts/:id",auth,async(req,res)=>{
    try{
        const _id=req.params.id
        const data =await Userpost.findByIdAndUpdate(_id,req.body,{new:true})
        res.json({
            status:"success",
            result:data
        })
        }
        catch(err){
            res.status(401).send(error)
        }
})

app.delete("/posts/:id",auth,async(req,res)=>{
    try{
        const _id=req.params.id;
        const deletedata=await Userpost.findByIdAndDelete(_id,req.body)
        res.json({
            status:"Successfully deleted",
            result:deletedata
        })
            }
            catch(err){
               res.status(401).send(error)
            }
})

app.listen(port,()=>{console.log("server is up at 8080")})