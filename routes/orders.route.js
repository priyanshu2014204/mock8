const express=require("express");
const { order, orderbyid, updatestatus } = require("../controller/order");
const authentication = require("../middleware/auth");
// console.log(order)
const router=express.Router();

router.post('/order',authentication,order)
router.get('/order/:id',authentication,orderbyid)
router.put('/order/:id',authentication,updatestatus)



module.exports=router
