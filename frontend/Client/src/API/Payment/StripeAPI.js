import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise=loadStripe(import.meta.env.VITE_STRIPE_PUBLISHED_KEY)
// console.log(import.meta.env.VITE_STRIPE_PUBLISHED_KEY)
 const API=import.meta.env.VITE_BASE_API_URL || 'http://localhost:5000/api';

export const checkout= async(product)=>{
    // console.log(product)
    try{
    const stripe=await stripePromise;
    const response=await axios.post(`${API}/checkouts/create-checkout-session`,{product});
    // console.log(response.data)
    const result=await stripe.redirectToCheckout({
        sessionId:response.data.id,
    })
    if(result.error){
        alert(result.error.message)
    }
}catch(error){
    console.log(error);
}
}

export const allCheckout= async(productsToCheckout,userId,token,selectedAddress,cartId)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
    try{
    const stripe=await stripePromise;
    const response=await axios.post(`${API}/checkouts/all/create-checkout-session`,{userId,productsToCheckout,selectedAddress,cartId},config);
    // console.log(response.data)
    const result=await stripe.redirectToCheckout({
        sessionId:response.data.id,
        
    })
    if(result.error){
        alert(result.error.message)
    }
    return response.data
}catch(error){
    console.log(error);
    throw error;
}
}