const express=require('express');
const connection = require('./config/db');
const app=express();
require('dotenv').config()
app.use(express.json());

const Port=process.env.port || 8080
// 
const order=require('./routes/orders.route')
const user=require('./routes/user.route')
const restaurant=require('./routes/resturant.route')


app.use('/api',user) 
app.use('/api',restaurant)
app.use('/api',order)

app.listen(Port,()=>{
try{
    connection 
    console.log(`connected to port ${Port}`)
}catch(err){
    console.log(err.message)
}
})