import axios from 'axios';

const API=import.meta.env.VITE_BASE_API_URL || 'http://localhost:5000/api';

export const getProducts = async (token, page, limit, category) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API}/product?page=${page}&limit=${limit}&category=${category}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Fetching products failed!");
  }
};

  
  export const getProductById = async (id,token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API}/product/${id}`, config);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Fetching product failed!");
    }
  };