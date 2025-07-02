const express=require("express");
const router=express.Router();
const {Checkout,allCheckout}=require("../../Controllers/Payment/StripeController")
const {authenticateUser}=require('../../Middleware/authMiddleware')

router.post("/create-checkout-session",authenticateUser,Checkout);
router.post("/all/create-checkout-session",authenticateUser,allCheckout)
module.exports=router;