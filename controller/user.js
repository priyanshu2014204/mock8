const { User } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt")
require('dotenv').config()

exports.register=async (req,res)=>{
    try{
      const {name,email,password,street,city,state,country,zip}=req.body;
      if(name==undefined || email== undefined || password==undefined || street==undefined || city==undefined || state==undefined || country==undefined || zip==undefined){
        return   res.status(400).send({"msg":"Fields are missing"})
    }
    const validUser=await User.findOne({email})
      if(validUser){
          return   res.status(500).send({"msg":"User already present Try loggin"})
      }
      bcrypt.hash(password, 5, async function(err, hash) {
         if(err){
            return   res.status(400).send({"msg":"An error occured"})
         } 
         await User.insertMany([{email,name,password:hash,address:{
            street,city,state,country,zip
         }}])
         return res.status(201).send({"msg":"User register successfully"})
    });
      
    }
    catch(err){
        return res.status(400).send(err.message)
    }
}


exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body
        if(email==undefined || password==undefined){
            return res.status(400).send({"msg":"Fields are missing"})
        }
        const validUser=await User.findOne({email})
        if(!validUser){
            return   res.status(500).send({"msg":"User not present Try register"})
        }
        bcrypt.compare(password, validUser.password, function(err, result) {
            if(err){
                return   res.status(400).send({"msg":"An error occured"})
            }
            if(result==true){
                 const token=jwt.sign({
                   id:validUser._id
                  }, process.env.secretkey , { expiresIn:60 * 60});
                  return   res.status(201).send({"token":token})
            }else{
                return   res.status(401).send({"msg":"Unauth wrong credential"})
            }
        });

    }
    catch(err){
        return res.status(400).send(err.message)
    }
}


exports.updatepassword=async (req,res)=>{
    try{
        const userId=req.params.id;
        const {password}=req.body;
        if(password==undefined){
            return res.status(500).send({"msg":"Enter all credential"})
        }
        bcrypt.hash(password, 5, async function(err, hash) {
            if(err){
               return   res.status(400).send({"msg":"An error occured"})
            } 
            const user=await User.findByIdAndUpdate(userId,{password:hash})
            if(user){
                
                return res.status(204).send({"msg":"Your password has been updated successfully"})
            }else{
                return res.status(401).send({"msg":"Something went wrong"})
            }
       });
     
        
    }
    catch(err){
      res.status(500).send({"msg":err.message})
    }
}