import axios from 'axios';

const API=import.meta.env.VITE_BASE_API_URL || 'http://localhost:5000/api';

export const getUserOrders = async (userId, token)=>{
    try{
        const config={
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const response = await axios.get(`${API}/orders/${userId}`,config);
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error("Error adding to wishlist:", error);
    }
}