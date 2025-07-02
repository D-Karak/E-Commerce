import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#fff5f5"
      px={2}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          height:"400",
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        <img
          src="images/failure.png"
          alt="Payment Failed"
          style={{margin:"auto", marginBottom: 24,maxHeight:"200px" }}
        />
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Payment Failed
        </Typography>
        <Typography color="text.secondary" mb={3}>
          Sorry, your payment could not be processed.<br />
          Please try again or contact support.
        </Typography>
        <Button
          variant="contained"
          color="error"
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

export default PaymentFailure;