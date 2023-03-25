const { Order } = require("../model/order.model");
const { Restuarnt } = require("../model/resturant.model");



exports.order=async (req,res)=>{
   try{
    const user=req.user;
    const {restaurantid,name,price,quantity,totalprice,deliveryAddress}=req.body;
    const restaurant= await Restuarnt.findById(restaurantid);
    if(!restaurant){
     return res.status(500).send({"msg":"Invaild credential"})
    }
    const neworder=await Order.insertMany([
     {
         user,restaurant:restaurantid,
         totalprice:quantity*price,
         deliveryAddress,
         status:"preparing"
     }
    ])
    neworder[0].items.push({name,price,quantity})
    await neworder[0].save()
    return res.status(201).send({"msg":"Order created successfully"})
   }
   catch(err){
      return res.status(501).send({"msg":err.message})
   }
}


exports.orderbyid=async (req,res)=>{
    try{
        const id=req.params
        const user=req.user
        console.log(user)
        const order=await Order.find({_id:id,user})
         return res.status(200).send(order)
    }
    catch(err){
        return res.status(501).send({"msg":err.message})
    }
}

exports.updatestatus=async (req,res)=>{
    try{
        const id=req.params.id
       
        const {status}=req.body
        const order=await Order.findByIdAndUpdate(id,{status})
         return res.status(204).send({"msg":"Status has been updated successfully"})
    }
    catch(err){
        return res.status(501).send({"msg":err.message})
    }
}