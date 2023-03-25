const express=require("express");
const { allrestaurants, allrestaurantsID, addrestaurants, addMenu, restaurantmenu, deletemenu } = require("../controller/rest");
const router=express.Router();

router.post('/restaurants/add',addrestaurants)
router.get('/restaurants',allrestaurants)
router.get('/restaurants/:id',allrestaurantsID)
router.get('/restaurants/:id/menu',restaurantmenu)
router.post('/restaurants/:id/menu',addMenu)
router.delete('/restaurants/:id/menu/:menuid',deletemenu)
// /api/restaurants/:id/menu
module.exports=router