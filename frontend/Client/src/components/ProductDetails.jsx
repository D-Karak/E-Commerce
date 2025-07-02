import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Chip,
  Container,
  Rating,
  Avatar,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import { toast } from 'react-toastify';

import { AuthContext } from '../context/authContext';
import { WishlistContext } from '../context/WishlistContext';
import { ReviewContext } from '../context/ReviewContext';
import { addToCart } from '../API/Cart/CartApi';

function ProductDetails() {
  const location = useLocation();
  const { product } = location.state || {};
  const { userId, token } = useContext(AuthContext);
  const {
    handleAddToWishlist,
    handleRemoveFromWishlist,
    isWishlisted,
  } = useContext(WishlistContext);
  const {
    setProductId,
    avgRatings,
    allReviews
  } = useContext(ReviewContext);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product?._id) {
      setProductId(product._id);
    }
  }, [product, setProductId]);

  // Mock additional images - in real app, these would come from your product data
  const productImages = [
    product?.image,
    product?.image, // Replace with actual additional images
    product?.image,
    product?.image,
  ];

  if (!product) {
    return <Typography textAlign="center" mt={4}>Product not found</Typography>;
  }

  const handleAddToCart = async () => {
    const cartItem = {
      productId: product._id,
      price: product.price,
      quantity: quantity,
    };
    const res = await addToCart(userId, cartItem, token);
    if (res) {
      toast.success('Added to cart successfully!');
    }
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Grid container>
            {/* Image Gallery Section */}
            <Grid item xs={12} md={6} sx={{ p: 3 }}>
              <Box sx={{ position: 'sticky', top: 20 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {/* Main Image */}
                  <Box
                    sx={{
                      flex: 1,
                      height: 500,
                      borderRadius: 2,
                      overflow: 'hidden',
                      backgroundColor: '#f9f9f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={productImages[selectedImage]}
                      alt={product.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  {/* Vertical Thumbnail Strip */}
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1,
                    width: 80,
                  }}>
                    {productImages.map((image, index) => (
                      <Box
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 1,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: selectedImage === index ? '3px solid #1976d2' : '1px solid #e0e0e0',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            border: '3px solid #90caf9',
                            transform: 'scale(1.05)',
                          },
                        }}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
                
              </Box>
            </Grid>

            {/* Product Info Section */}
            <Grid item xs={12} md={6} sx={{ p: 4 }}>
              <Box>
                {/* Product Title and Wishlist */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Typography variant="h4" fontWeight="600" sx={{ flex: 1, pr: 2 }}>
                    {product.name}
                  </Typography>
                  <Tooltip title={isWishlisted(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}>
                    <IconButton
                      onClick={() =>
                        isWishlisted(product._id)
                          ? handleRemoveFromWishlist(product._id)
                          : handleAddToWishlist(product._id)
                      }
                      sx={{
                        border: '1px solid #e0e0e0',
                        '&:hover': {
                          backgroundColor: '#fff0f0',
                        },
                      }}
                    >
                      {isWishlisted(product._id) ? 
                        <FavoriteIcon color="error" /> : 
                        <FavoriteBorderIcon />
                      }
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Rating value={avgRatings?.ratings || 0} readOnly precision={0.5} />
                  <Typography variant="body2" color="text.secondary">
                    {avgRatings?.ratings?.toFixed(1) || '0.0'}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="body2" color="text.secondary">
                    {avgRatings?.totalReviews || 0} Reviews
                  </Typography>
                  <Chip 
                    icon={<VerifiedIcon />} 
                    label="Verified Product" 
                    size="small" 
                    color="success" 
                    variant="outlined"
                  />
                </Box>

                {/* Price */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h3" fontWeight="700" color="primary">
                    ₹{product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    ₹{(product.price * 1.2).toFixed(2)}
                  </Typography>
                  <Chip label="20% OFF" color="error" size="small" sx={{ mt: 1 }} />
                </Box>

                {/* Description */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {product.description || 'No description available for this product.'}
                  </Typography>
                </Box>

                {/* Stock Status */}
                <Box sx={{ mb: 3 }}>
                  {product.stock > 0 ? (
                    <Chip 
                      label={`In Stock (${product.stock} available)`} 
                      color="success" 
                      variant="outlined"
                    />
                  ) : (
                    <Chip label="Out of Stock" color="error" variant="outlined" />
                  )}
                </Box>

                {/* Quantity Selector
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Quantity
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleQuantityChange('decrease')}
                      disabled={quantity <= 1}
                      sx={{ minWidth: 40 }}
                    >
                      -
                    </Button>
                    <Typography sx={{ minWidth: 40, textAlign: 'center', fontWeight: 600 }}>
                      {quantity}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => handleQuantityChange('increase')}
                      disabled={quantity >= product.stock}
                      sx={{ minWidth: 40 }}
                    >
                      +
                    </Button>
                  </Box>
                </Box> */}

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<AddShoppingCartIcon />}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    startIcon={<ShoppingBagIcon />}
                    disabled={product.stock === 0}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                      }
                    }}
                  >
                    Buy Now
                  </Button>
                </Box>

                {/* Shipping Info */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  p: 2, 
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                }}>
                  <LocalShippingIcon color="action" />
                  <Typography variant="body2">
                    Free delivery on orders above ₹499
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Reviews Section */}
          <Box sx={{ p: 4, backgroundColor: '#fafafa' }}>
            <Typography variant="h5" fontWeight="600" mb={3}>
              Customer Reviews
            </Typography>

            {allReviews.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  No reviews yet. Be the first to review this product!
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {allReviews.map((review) => (
                  <Grid item xs={12} key={review._id}>
                    <Paper sx={{ p: 3, borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {review.userId?.name?.charAt(0) || 'A'}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" fontWeight="600">
                            {review.userId?.name || 'Anonymous'}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Rating value={review.rating} readOnly size="small" />
                            <Typography variant="caption" color="text.secondary">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {review.comment}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ProductDetails;