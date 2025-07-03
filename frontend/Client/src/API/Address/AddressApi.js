import axios from 'axios';
const API=`${import.meta.env.VITE_BASE_API_URL}`;

export const addAddress = async (userId, shippingAddress,token)=>{
    // console.log({userId,shippingAddress})
    
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
    try {
        const response = await axios.post(`${API}/address/add`,{userId,shippingAddress},config)
        return response.data;
    }catch(error){
        console.error('Error adding address:',error)
    }
}

export const fetchAddress = async(userId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        },
        params:{
            userId
        }
    }
    try {
        const response = await axios.get(`${API}/address/get`,config)
        return response.data;
    }catch(error){
        console.error('Error adding address:',error)
    }
}

export const deleteAddress = async (userId,addressId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        },
        data:{
            userId,
            addressId
        }
    }
    try {
        const response = await axios.delete(`${API}/address/remove`,config)
        return response.data;
    }catch(error){
        console.error('Error adding address:',error)
    }
}