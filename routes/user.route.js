const express=require("express");
const { register, login, updatepassword } = require("../controller/user");
const router=express.Router();

router.post('/register',register)
router.post('/login',login)
router.put('/user/:id/reset',updatepassword)
router.patch('/user/:id/reset',updatepassword)


module.exports=router;