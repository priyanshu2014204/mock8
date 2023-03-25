const { Restuarnt } = require("../model/resturant.model")


exports.addrestaurants=async (req,res)=>{
    try{
        const {name,street,city,state,country,zip}=req.body;

        if(name==undefined || street==undefined || city==undefined || state==undefined ||country==undefined || zip==undefined){
           return  res.status(501).send({"msg":"Enter all details"})
        }
        await Restuarnt.insertMany([{name,address:{
            street,city,state,country,zip
        }}])
        return res.status(201).send({"msg":"Created successfully"})
    }
    catch(err){
        return res.status(400).send(err.message)
    }

}


exports.allrestaurants=async( req, res )=>{
    try{
       const rest=await Restuarnt.find();
       return res.status(200).send(rest)
    }
    catch(err){
        return res.status(500).send({"msg":err.message})
    }
}

exports.allrestaurantsID=async( req, res )=>{
    try{
        const id=req.params.id
       const rest=await Restuarnt.findById(id);
       return res.status(200).send(rest)
    }
    catch(err){
        return res.status(500).send({"msg":err.message})
    }
}


exports.restaurantmenu=async( req, res )=>{
    try{
        const id=req.params.id
       const rest=await Restuarnt.findById(id);
       return res.status(200).send(rest.menu)
    }
    catch(err){
        return res.status(500).send({"msg":err.message})
    }
}

exports.addMenu=async (req,res)=>{
    try{
        const {name, description,price,image}=req.body
        const id=req.params.id;
        const restaurant=await Restuarnt.findById(id);
        restaurant.menu.push({name,description,price,image})
         await restaurant.save()
         res.status(201).send(restaurant)
    }
    catch(err){
        return res.status(500).send({"msg":err.message})
    }
}


exports.deletemenu= async (req,res)=>{
    try{
        
        const id=req.params.id;
        const menuid=req.params.menuid
        const restaurant=await Restuarnt.updateOne({_id:id},{
            $pull: { menu: { _id: menuid } }
        });
        // const menu=await restaurant.findById(menuid)
         res.status(201).send(restaurant)
    }
    catch(err){
        return res.status(500).send({"msg":err.message})
    }
}