import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Box, Typography, Button, TextField, Rating, Avatar
} from "@mui/material";
import { fetchUserReviews, submitReview, editReview } from "../API/Review/ReviewAPI";
import { AuthContext } from "../context/authContext";
import { ToastContainer, toast } from 'react-toastify';

const ReviewPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const { orders } = location.state || {};
  const { token } = useContext(AuthContext);

  const [userReviews, setUserReviews] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);

  // Fetch all user reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchUserReviews(token);
        setUserReviews(data.reviews || []);
      } catch (error) {
        console.error("Failed to fetch user reviews", error);
      }
    };
    fetchReviews();
  }, [token]);

  if (!orders) return <p>No order data received</p>;

  //for submitting or editing a review
  const handleReviewSubmit = async (productId) => {
    try {
      if (editingReviewId) {
        // Edit existing review
        const updatedReview = await editReview(editingReviewId, { rating, comment }, token);
        toast.success(updatedReview?.message);
        const data = await fetchUserReviews(token);
        setUserReviews(data.reviews || []);
      } else {
        // Submit new review
        const newReview = await submitReview(productId, { rating, comment }, token);
        const data = await fetchUserReviews(token);
        setUserReviews(data.reviews || []);
        toast.success("Review submitted!");
      }
      setEditingProduct(null);
      setEditingReviewId(null);
      setRating(0);
      setComment("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6" style={{ minHeight: "80vh", backgroundColor: "#f9f9f9" }}>
      <Typography variant="h5" className="mb-4">Review Order: {orderId}</Typography>

      {orders.products.map((product) => {
        const productId = product.productId._id;
        const isDelivered = orders.orderStatus === "Delivered";
        // Find the latest review for this product
        const productReviews = userReviews.filter(
          (review) => review?.productId === productId
        );
        // You can decide to show the latest review or all reviews
        const existingReview = productReviews.length > 0
          ? productReviews[productReviews.length - 1]
          : null;

        return (
          <Box key={productId} className="mb-6 p-4 border rounded shadow bg-white">
            <Box className="flex items-center mb-3 gap-4">
              <Avatar src={product.productId.image} variant="square" />
              <Typography variant="h6">{product.productId.name}</Typography>
            </Box>

            <Typography>Price: ₹{product.productPrice}</Typography>
            <Typography>Quantity: {product.quantity}</Typography>

            {isDelivered && (
              <Box className="mt-3">
                {editingProduct === productId ? (
                  <>
                    <Rating
                      value={rating}
                      onChange={(e, newVal) => setRating(newVal)}
                    />
                    <TextField
                      label="Write your review"
                      multiline
                      rows={3}
                      fullWidth
                      className="my-3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleReviewSubmit(productId)}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => {
                        setEditingProduct(null);
                        setEditingReviewId(null);
                        setRating(0);
                        setComment("");
                      }}
                      sx={{ ml: 2 }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outlined"
                    className="mt-2"
                    onClick={() => {
                      setEditingProduct(productId);
                      if (existingReview) {
                        setEditingReviewId(existingReview.reviewId);
                        setRating(existingReview.rating);
                        setComment(existingReview.comment);
                      } else {
                        setEditingReviewId(null);
                        setRating(0);
                        setComment("");
                      }
                    }}
                  >
                    {existingReview ? "Edit your review" : "Write a review"}
                  </Button>
                )}
                {existingReview && editingProduct !== productId && (
                  <Box className="mt-2 p-2 bg-gray-100 rounded">
                    <Rating value={existingReview.rating} readOnly />
                    <Typography variant="body2">{existingReview.comment}</Typography>
                  </Box>
                )}
              </Box>
            )}

          </Box>
        );
      })}
      <ToastContainer/>
    </div>
  );
};

export default ReviewPage;