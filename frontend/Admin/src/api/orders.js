import axios from "axios";

const API = import.meta.env.VITE_BASE_API_URL || "http://localhost:5000/api";

// Helper function to always get latest token

export const getAllOrders = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API}/orders/order/all`, config);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Fetching products failed!");
  }
};

