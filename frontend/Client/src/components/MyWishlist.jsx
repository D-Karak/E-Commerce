import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import ProductCard from './ProductCard'
import { WishlistContext } from '../context/WishlistContext'; // adjust path

const MyWishlist = () => {
  const { wishlist } = useContext(WishlistContext);

  if (!wishlist || wishlist.length === 0) {
    return (
      <Box sx={{ pt: 4,height:`80vh`, textAlign: 'center',backgroundColor:'#F9F9F9' }}>
        <Typography variant="h5">Your wishlist is empty.</Typography>
      </Box>
    );
  }

  return (
   <Box sx={{ p: 4,minHeight:`80vh`,backgroundColor:'#F9F9F9' }}>
      <Typography variant="h4" gutterBottom>My Wishlist</Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </div>
    </Box>
  );
};

export default MyWishlist;
