const express = require('express');
const router = express.Router();
const { createWishlist, getUserWishlist, removeFromWishlist } = require('../../Controllers/Wishlist/WishlistController');

const {authenticateUser} = require('../../Middleware/authMiddleware')

router.post('/create',authenticateUser,createWishlist)
router.get('/get',authenticateUser,getUserWishlist)
router.post('/remove',authenticateUser,removeFromWishlist)
module.exports =router