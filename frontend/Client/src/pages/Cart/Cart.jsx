import React, { useState, useEffect, useContext } from 'react';
import {
  Box, Button, Typography, IconButton, Divider, Paper
} from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import ShippingAddress from '../../components/ShippingAdress';
import { getCartItems, updateCartItemQty, removeCartItem } from '../../API/Cart/CartApi';
import { allCheckout } from '../../API/Payment/StripeAPI';
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
const CartPage = () => {
  const navigate = useNavigate();
  const { userId, token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchCartItems = async () => {
    const data = await getCartItems(userId, token);
    setCartItems(data.Items);
    setCartId(data._id);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price) * parseInt(item.quantity), 0);
  const gst = (subtotal * 18) / 100;
  const total = subtotal + gst;

// const handleQuantityInputChange = (itemId, value) => {
//   const updatedItems = cartItems.map(item => {
//     if (item._id === itemId) {
//       const numericValue = parseInt(value, 10);

//       // Fallback if stock is nested under item.product
//       const stock = item.stock || item.product?.stock || 0;

//       // Validate input
//       if (isNaN(numericValue) || numericValue < 1) {
//         return { ...item, quantity: 1 }; // default to 1 if invalid
//       } else if (numericValue > stock) {
//         return { ...item, quantity: stock }; // max allowed quantity
//       } else {
//         return { ...item, quantity: numericValue };
//       }
//     }
//     return item;
//   });

//   setCartItems(updatedItems);
// };


  // const handleQuantityBlur = async (itemId) => {
  //   const item = cartItems.find(item => item._id === itemId);
  //   let parsedQty = parseInt(item.quantity);
  //   if (isNaN(parsedQty) || parsedQty < 1) parsedQty = 1;

  //   const updatedItems = cartItems.map(i =>
  //     i._id === itemId ? { ...i, quantity: parsedQty } : i
  //   );
  //   setCartItems(updatedItems);
  //   await updateCartItemQty(userId, itemId, parsedQty, token);
  // };

  const handleIncreaseQuantity = async (itemId) => {
    const updatedItems = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: parseInt(item.quantity) + 1 } : item
    );
    setCartItems(updatedItems);
    const newQty = updatedItems.find(i => i._id === itemId).quantity;
    await updateCartItemQty(userId, itemId, newQty, token);
  };

  const handleDecreaseQuantity = async (itemId) => {
    const item = cartItems.find(item => item._id === itemId);
    const currentQty = parseInt(item.quantity);
    if (currentQty <= 1) return;

    const updatedItems = cartItems.map(item =>
      item._id === itemId ? { ...item, quantity: currentQty - 1 } : item
    );
    setCartItems(updatedItems);
    const newQty = updatedItems.find(i => i._id === itemId).quantity;
    await updateCartItemQty(userId, itemId, newQty, token);
  };

  const handleRemoveItem = async (itemId) => {
    const updatedCartItems = cartItems.filter(i => i._id !== itemId);
    setCartItems(updatedCartItems);
    try {
      await removeCartItem(userId, itemId, token);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = async (items) => {
    if (!selectedAddress) {
      alert("Please select an address to proceed with checkout.");
      return;
    }

    const productsToCheckout = items.map(item => ({
      name: item.productId.name || "No name",
      description: item.description || "No description",
      price: parseFloat(item.price),
      img: item.productId?.image || "",
      quantity: parseInt(item.quantity),
    }));

    try {
      const response = await allCheckout(productsToCheckout, userId, token, selectedAddress, cartId);
      console.log(response);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Order Summary - Left Side */}
          <div className='lg:w-2/3'>
            <div className='bg-white rounded-lg shadow-sm p-6'>
              <Typography variant="h5" className='text-gray-800 mb-4'>
                Shopping Cart ({cartItems.length} items)
              </Typography>
              <Divider sx={{ mb: 4 }} />
              
              {cartItems.length === 0 ? (
                <div className='text-center py-12'>
                  <Typography variant="h6" color="textSecondary" className='mb-4'>
                    Your cart is empty
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => navigate('/products')}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className='space-y-4'>
                  {cartItems.map((item) => (
                    <Paper
                      key={item._id}
                      elevation={0}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 3,
                        border: '1px solid #e5e7eb',
                        borderRadius: 2,
                        '&:hover': {
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                          transition: 'all 0.3s ease'
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={item.productId?.image || "https://via.placeholder.com/100"}
                        alt={item.name}
                        sx={{ 
                          width: 120, 
                          height: 120, 
                          objectFit: 'cover', 
                          borderRadius: 2, 
                          mr: 3 
                        }}
                      />
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" className='text-gray-800 mb-1'>
                          {item.productId?.name}
                        </Typography>
                        <Typography variant="body2" className='text-gray-500 mb-2'>
                          Unit Price: ₹{item.price}
                        </Typography>
                        
                        {/* Quantity Controls */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleDecreaseQuantity(item._id)}
                              disabled={parseInt(item.quantity) === 1}
                            >
                              <RemoveShoppingCartIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ px: 2, minWidth: 40, textAlign: 'center' }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleIncreaseQuantity(item._id)}
                              disabled={parseInt(item.quantity) === parseInt(item.productId.stock)}
                            >
                              <AddShoppingCartIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          
                          <Typography variant="body2" className='text-gray-500'>
                            {item.productId.stock} available
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" className='text-gray-800 mb-2'>
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton 
                          onClick={() => handleRemoveItem(item._id)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Paper>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Checkout Panel - Right Side */}
          <div className='lg:w-1/3'>
            <div className='bg-white rounded-lg shadow-sm p-6 sticky top-4'>
              <Typography variant="h5" className='text-gray-800 mb-4'>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 4 }} />

              {/* Address Selection */}
              <div className="mb-6">
                <Typography variant="subtitle1" className='text-gray-700 mb-2'>
                  Delivery Address
                </Typography>
                <ShippingAddress
                  setSelectedAddress={setSelectedAddress}
                  selectedAddress={selectedAddress}
                />
              </div>

              {/* Price Breakdown */}
              <div className='space-y-3 mb-6'>
                <div className='flex justify-between text-gray-600'>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">₹{subtotal.toFixed(2)}</Typography>
                </div>
                
                <div className='flex justify-between text-gray-600'>
                  <Typography variant="body1">GST (18%)</Typography>
                  <Typography variant="body1">₹{gst.toFixed(2)}</Typography>
                </div>
                
                <div className='flex justify-between text-gray-600'>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1" className='text-green-600'>FREE</Typography>
                </div>
                
                <Divider />
                
                <div className='flex justify-between'>
                  <Typography variant="h6" className='text-gray-800'>Total</Typography>
                  <Typography variant="h6" className='text-gray-800'>
                    ₹{total.toFixed(2)}
                  </Typography>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                disabled={cartItems.length === 0 || !selectedAddress}
                onClick={() => handleCheckout(cartItems)}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem',
                  borderRadius: 2,
                  backgroundColor: '#10b981',
                  '&:hover': {
                    backgroundColor: '#059669',
                  },
                  '&:disabled': {
                    backgroundColor: '#e5e7eb',
                    color: '#9ca3af'
                  },
                  transition: 'all 0.2s ease-in-out',
                  textTransform: 'none'
                }}
              >
                {cartItems.length === 0 
                  ? 'Add items to cart' 
                  : !selectedAddress 
                  ? 'Select delivery address' 
                  : 'Proceed to Payment'}
              </Button>

              {/* Security Badge */}
              <div className='mt-4 text-center'>
                <Typography variant="caption" className='text-gray-500'>
                  🔒 Secure checkout powered by Razorpay
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
export default CartPage;
