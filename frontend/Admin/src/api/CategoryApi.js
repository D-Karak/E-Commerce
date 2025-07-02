import axios from 'axios';

const API=import.meta.env.VITE_BASE_API_URL || 'http://localhost:5000/api';  

 export const createCategory = async (categoryData,token) => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        const response = await axios.post(`${API}/category/create`, categoryData,config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Creating category failed!");
    }
}

export const getCategories = async (token) => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        const response = await axios.get(`${API}/category/`,config);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Fetching categories failed!");
    }
}

export const updateCategory = async (id, categoryData,token) => {     
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        const response = await axios.put(`${API}/category/update/${id}`, categoryData,config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Updating category failed!");
    }
}

export const deleteCategory = async (id,token) => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        const response = await axios.delete(`${API}/category/delete/${id}`,config);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Deleting category failed!");
    }
}