const express=require("express");
const router=express.Router();
const {createOrder,getUserOrders,getAllOrders,updateOrderStatus} =require('../../Controllers/Order/OrderController')

router.post('/create',createOrder)
router.get('/:userId',getUserOrders)
router.get('/order/all',getAllOrders)
router.put('/update/:orderId',updateOrderStatus)
module.exports=router