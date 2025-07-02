import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { getUserOrders } from "../API/Orders/OrdersAPI";
import { useNavigate } from "react-router-dom";
import {
  Box, Card, CardContent, Typography, Chip, Button, Avatar, Divider, Stack
} from "@mui/material";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const { userId, token } = useContext(AuthContext);

  useEffect(() => {
    if (userId && token) {
      getUserOrders(userId, token).then(setOrders).catch(console.error);
    }
  }, [userId, token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "success";
      case "Shipped": return "info";
      case "Pending": return "warning";
      case "Cancelled": return "error";
      default: return "default";
    }
  };

  const goToReviewPage=(orderId)=>{
    navigate(`/review/${orderId}`,{
      state:{
        orders: orders.find(order=> order._id===orderId)
      }
    });
  }
  return (
    <Box p={4} minHeight="80vh" bgcolor="#f9f9f9">
      <Typography variant="h5" fontWeight={600} mb={4}>
        My Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography align="center" color="text.secondary">
          You haven’t placed any orders yet.
        </Typography>
      ) : (
        <Stack spacing={3}>
          {orders.map(order => (
            <Card key={order._id} elevation={3}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1">
                    Order ID: <strong>{order._id.toUpperCase()}</strong>
                  </Typography>
                  <Chip
                    label={order.orderStatus}
                    color={getStatusColor(order.orderStatus)}
                    variant="outlined"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Placed on: {new Date(order.createdAt).toLocaleDateString()}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Stack display={{ xs: "block", sm: "flex" }} direction="row" spacing={2} alignItems="center">
                  <Avatar
                    variant="rounded"
                    src={order.products[0]?.productId?.image || "/placeholder.jpg"}
                    alt="product preview"
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box>
                    <Typography>{order.products[0]?.productId?.name || "Product Name"}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      +{order.products.length - 1} more item(s)
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={2} mt={2}>
                  <Chip label={`₹${order.totalAmount}`} variant="outlined" />
                  <Chip
                    label={order.paymentStatus}
                    color={order.paymentStatus === "Paid" ? "success" : "warning"}
                    variant="outlined"
                  />
                </Stack>

                <Stack direction="row" spacing={2} mt={3}>
                  <Button variant="outlined" onClick={() => {goToReviewPage(order._id)}} startIcon={<ReceiptLongIcon />}>Check Order Details</Button>
                  
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default MyOrders;
