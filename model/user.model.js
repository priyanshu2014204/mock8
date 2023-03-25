const mongoose=require("mongoose");
require("dotenv").config()
// {
//     _id: ObjectId,
//     name: String,
//     email: String,
//     password: String,
//     address: {
//       street: String,
//       city: String,
//       state: String,
//       country: String,
//       zip: String
//     }
  
const addressSchema=new mongoose.Schema({
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
})

const schema=new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   address:addressSchema
})


const User=mongoose.model("user",schema);



module.exports={User}