const express = require("express");
const { addToCart, getCartItems,updateCartItemQty,removeCartItem} = require("../../Controllers/Cart/CartController");
const { authenticateUser } = require("../../Middleware/authMiddleware");    
const router = express.Router();


router.post("/add", authenticateUser, addToCart); // All authenticated users can add items to cart
router.get("/get/:userId", authenticateUser, getCartItems); // All authenticated users can view their cart   
router.put("/update", authenticateUser, updateCartItemQty); // All authenticated users can update their cart
router.delete("/removeitem", authenticateUser, removeCartItem); // All authenticated users can delete their cart

module.exports = router; // Export the router to be used in the main app