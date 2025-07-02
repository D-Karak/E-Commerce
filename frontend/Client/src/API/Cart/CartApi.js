import axios from 'axios';

const API=import.meta.env.VITE_BASE_API_URL || 'http://localhost:5000/api';


export const addToCart = async (userId,productData,token) => {
    // console.log(userId) //works
    // console.log(productData)//works
    // console.log(token)//works
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
    // console.log({userId, ...productData})
    // console.log(config)
  try {
    const response = await axios.post(`${API}/cart/add`,{userId, ...productData},config);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

export const getCartItems =async (userId,token)=>{

  const config={
    headers:{
        Authorization:`Bearer ${token}`,
    }}
    try {
      const response= await axios.get(`${API}/cart/get/${userId}`, config);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }

  export const updateCartItemQty= async (userId,itemId,quantity,token)=>{
    // console.log(userId)
    // console.log(productId)
    // console.log(quantity)
    const config={
      headers:{
          Authorization:`Bearer ${token}`,
      }}
      try{
        const response= await axios.put(`${API}/cart/update`,{userId,itemId,quantity},config);
        // console.log(response.data);
        return response.data;
      }
      catch(error){
        console.error('Error updating cart item quantity:',error)
      }
  }

  export const removeCartItem= async (userId,itemId,token)=>{
    const config={
      headers:{
        Authorization:`Bearer ${token}`,
      },
      data:{
        userId,
        itemId
      }
    }
      try{
        const response = await axios.delete(`${API}/cart/removeitem`,config);
        return response.data
      }catch(error){
        console.error('Error removing cart item',error);
      }
      }
  