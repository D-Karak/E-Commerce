import axios from 'axios';

const API=`${import.meta.env.VITE_BASE_API_URL}`;

export const addToWishlist = async (userId, productId, token)=>{
    try{
        const config={
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const response = await axios.post(`${API}/wishlist/create`,{userId,productId},config);
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error("Error adding to wishlist:", error);
    }
}

export const getUserWishlist = async (token)=>{
    try{
        const config={
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const response = await axios.get(`${API}/wishlist/get`,config);
        // console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error("Error fetching the wishlist:", error);
    }
}
export const deleteItemOnWishlist = async (userId, productId, token)=>{
    try{
        const config={
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
        const response = await axios.post(`${API}/wishlist/remove`,{userId,productId},config);
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error("Error adding to wishlist:", error);
    }
}