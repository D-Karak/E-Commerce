// routes/reviewRoutes.js
const express = require("express");
const { createReview,editReview, getProductReviews,getUserProductReviews } = require("../../Controllers/Review/ReviewController");
const {authenticateUser} = require("../../Middleware/authMiddleware")

const router = express.Router();

router.post("/:productId", authenticateUser, createReview); // POST /reviews/:productId
router.put("/edit", authenticateUser, editReview); // PUT /reviews/edit
router.get("/:productId", authenticateUser,getProductReviews); // GET /reviews/:productId
router.get("/user/review", authenticateUser,getUserProductReviews); // GET /reviews/user/review

module.exports = router;