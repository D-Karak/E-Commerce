// controllers/reviewController.js
const Review = require("../../Models/Reviews/ReviewSchema");
const Order = require("../../Models/Order/OrderSchema");

// Check if user can review this product
const hasPurchased = async (userId, productId) => {
  const order = await Order.findOne({
    userId,
    "products.productId": productId,
    orderStatus: "Delivered",
  });
  return !!order;
};

const createReview = async (req, res) => {
//   console.log("BODY:", req.body);
// console.log("USER:", req.user);
// console.log("PARAMS:", req.params);
  const {rating, comment } = req.body;
  const userId=req.user.id
  const { productId } = req.params;
  // console.log({"user":userId,'product':productId,'data':{rating,comment}})
  try {
    const allowed = await hasPurchased(userId, productId);
    const isReviewed =await Review.findOne({productId, userId})
    if (!allowed) {
      return res.status(403).json({ message: "You can only review delivered products." });
    }
    if(isReviewed){
      return res.status(400).json({ message: "You have already reviewed this product." });
    }

    const review = await Review.create({ productId, userId:userId, rating, comment });
    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const editReview = async (req, res) => {
  const { reviewId, rating, comment } = req.body;
  if (!reviewId || !rating || !comment) {
    return res.status(400).json({ message: "Review ID, rating, and comment are required" });
  }
  const isReviewed = await Review.findById(reviewId);

  if (!isReviewed) {
    return res.status(404).json({ message: "Review not found" });
  }
  try {
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update review" });
  }
}

const getProductReviews = async (req, res) => {
  const { productId } = req.params;
  try {
    const reviews = await Review.find({ productId }).populate("userId", "name");
    const productReviews = reviews.map(r=>({
      userId: r.userId,
      rating:r.rating,
      comment: r.comment,
      createdAt: r.createdAt
    }))
    const avgRatings= {
      ratings:reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0,
      totalReviews: reviews.length
    };
    res.status(200).json({reviews:productReviews,avgRatings:avgRatings});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

const getUserProductReviews = async (req, res) => {
  // const { productId } = req.params;
  const userId=req.user.id;
  // console.log("userId: ",userId)
  if (!userId ) {
    return res.status(400).json({ message: "userId and productId are required" });
  }
  try {
    const reviews = await Review.find({userId}).populate("userId", "name");
    const userReviews = reviews.map(r => ({
      reviewId:r._id,
      productId: r.productId,
      rating: r.rating,
      comment: r.comment
    }));
    res.status(200).json({message:"All user reviews fetched successfully",user:userId,reviews:userReviews});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

module.exports = {
  createReview,
  editReview,
  getProductReviews,
  getUserProductReviews
}