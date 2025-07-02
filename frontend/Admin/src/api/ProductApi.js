import axios from "axios";

const API = import.meta.env.VITE_BASE_API_URL || "http://localhost:5000/api";

// Helper function to always get latest token

export const getProducts = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API}/product`, config);
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

export const createProduct = async (productData,token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${API}/product/create`, productData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Creating product failed!");
  }
};

export const updateProduct = async (id, uProductData,token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API}/product/update/${id}`, uProductData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Updating product failed!");
  }
};

export const deleteProduct = async (id,token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${API}/product/delete/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Deleting product failed!");
  }
};
