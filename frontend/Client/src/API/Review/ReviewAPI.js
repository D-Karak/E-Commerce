import axios from "axios";

const API=`${import.meta.env.VITE_BASE_API_URL}`;

export const fetchReviews = async (productId, token) => {
  try{
    const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response= await axios.get(`${API}/reviews/${productId}`,config)
  return response.data;
  }
  catch (error) {
    throw new Error(error.response?.data?.message || "Fetching reviews failed!");
  }
}

export const fetchUserReviews = async (token) => {
  try{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
    const response = await axios.get(`${API}/reviews/user/review`, config);
    console.log("chala")
    return response.data;
  }
  catch (error) {
    throw new Error(error.response?.data?.message || "Fetching reviews failed!");
  }
}



export const submitReview = async (productId, data, token) => {
  console.log({'product':productId,'data':data})
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${API}/reviews/${productId}`, {...data}, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Submitting review failed!");
  }
};

export const editReview=async(reviewId,data,token)=>{
  try{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API}/reviews/edit`, { reviewId, ...data }, config);
    console.log(response.data)
    return response.data;
  }catch (error) {
    throw new Error(error.response?.data?.message || "Editing review failed!");
  }
}