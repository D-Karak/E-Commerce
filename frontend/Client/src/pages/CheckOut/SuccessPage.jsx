import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f6fff8"
      px={2}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        <img
          src="/images/success.png"
          alt="Payment Success"
          style={{ marginBottom: 24 }}
        />
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Payment Successful!
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Thank you for your purchase. Your payment has been processed successfully.
        </Typography>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => navigate("/products")}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Back to Products
        </Button>
      </Paper>
    </Box>
  );
};

export default PaymentSuccess;