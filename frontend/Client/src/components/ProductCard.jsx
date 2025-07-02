import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Stack
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToCart } from '../API/Cart/CartApi';
import { AuthContext } from '../context/authContext';
import { WishlistContext } from '../context/WishlistContext';

function ProductCard({ product, Toast }) {
  const navigate = useNavigate();
  const { userId, token } = useContext(AuthContext);
  const avgRatings = product?.avgRating;

  const {
    handleAddToWishlist,
    handleRemoveFromWishlist,
    isWishlisted,
  } = useContext(WishlistContext);

  const addToCartHandler = async (e) => {
    e.stopPropagation();

    if (!userId || !token) {
      Toast.setWarningToast('Please login to add items to cart');
      return;
    }

    try {
      const cartItem = {
        productId: product._id,
        price: product.price,
        quantity: 1,
      };
      const res = await addToCart(userId, cartItem, token);
      console.log(res)
      Toast.setSuccessToast(res.message || 'Added to cart successfully');
    } catch (error) {
      Toast.setErrorToast('Failed to add to cart');
    }
  };

  const wishlistToggle = (e) => {
    e.stopPropagation();

    if (!userId || !token) {
      Toast.setErrorToast('Please login to add to wishlist');
      return;
    }

    if (isWishlisted(product._id)) {
      handleRemoveFromWishlist(product._id);
      Toast.setErrorToast('Removed from wishlist');
    } else {
      handleAddToWishlist(product._id);
      Toast.setSuccessToast('Added to wishlist');
    }
  };

  const openProductPage = () => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        i <= rating ? (
          <StarIcon key={i} sx={{ fontSize: 16 }} color="warning" />
        ) : (
          <StarBorderIcon key={i} sx={{ fontSize: 16 }} color="disabled" />
        )
      );
    }
    return stars;
  };

  return (
    <Paper
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
          '& .product-actions': {
            opacity: 1,
          }
        },
      }}
      onClick={openProductPage}
    >
      {/* Wishlist button positioned absolutely */}
      <IconButton
        onClick={wishlistToggle}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 1,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
          }
        }}
        size="small"
      >
        {isWishlisted(product._id) ?
          <FavoriteIcon color="error" fontSize="small" /> :
          <FavoriteBorderIcon fontSize="small" />
        }
      </IconButton>

      {/* Product Image */}
      <Box
        sx={{
          position: 'relative',
          paddingTop: '75%', // 4:3 Aspect Ratio
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        />
      </Box>

      {/* Product Details */}
      <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '3em',
            mb: 1
          }}
        >
          {product.name}
        </Typography>

        {/* Price and Rating Row */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" color="primary" fontWeight={700}>
            ₹{product.price.toLocaleString('en-IN')}
          </Typography>

          {avgRatings > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ display: 'flex' }}>
                {renderStars(avgRatings)}
              </Box>
              <Typography variant="caption" color="text.secondary">
                ({avgRatings.toFixed(1)})
              </Typography>
            </Box>
          )}
        </Stack>

        {/* Add to Cart Button */}
        <Box
          className="product-actions"
          sx={{
            mt: 'auto',
            opacity: { xs: 1, md: 0 },
            transition: 'opacity 0.3s ease'
          }}
        >
          <Tooltip title={product.stock === 0 || !product.stock ? "Out of Stock" : "Add to Cart"}>
            <span>
              <IconButton
                onClick={addToCartHandler}
                color="primary"
                // disabled={product.stock === 0 || !product.stock}
                sx={{
                  width: '100%',
                  borderRadius: 1,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  // Optional: visually indicate disabled state
                  opacity: (product.stock === 0 || !product.stock) ? 0.6 : 1,
                  cursor: (product.stock === 0 || !product.stock) ? 'not-allowed' : 'pointer',
                }}
              >
                <AddShoppingCartIcon />
                <Typography variant="button" sx={{ ml: 1 }}>
                  Add to Cart
                </Typography>
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      {/* Optional: Stock Status */}
      {(product.stock === 0 || !product.stock) ? (
        <Chip
          label="Out of Stock"
          size="small"
          color="error"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
          }}
        />
      ) : product.stock < 10 ? (
        <Chip
          label={`Only ${product.stock} left`}
          size="small"
          color="warning"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
          }}
        />
      ) : null}
    </Paper>
  );
}

export default ProductCard;