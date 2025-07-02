import axios from 'axios';

const API=import.meta.env.VITE_BASE_API_URL || 'http://localhost:5000/api';

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Signing up failed!');
  }
}

export const signin = async (userData) => {
  try {
    const response = await axios.post(`${API}/auth/signin`, userData);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'signing in failed!');
  }
}
