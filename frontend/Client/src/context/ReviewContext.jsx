import React, { createContext, useContext, useState,useEffect } from "react";
import { fetchReviews } from "../API/Review/ReviewAPI";
import { AuthContext } from "./authContext";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {

  const { token} = useContext(AuthContext);
    const [productId,setProductId]=useState("");
    const [allReviews, setAllReviews] = useState([]);
    const [avgRatings,setAvgRatings]=useState({})
 useEffect(() => {
     const fetchAllReviews = async () => {
       try {
         const data = await fetchReviews(productId, token);
        //  console.log(productId)
         setAllReviews(data.reviews);
         setAvgRatings(data.avgRatings)
         // console.log("All reviews fetched:", data);
         // console.log(data.avgRatings)
       } catch (error) {
         console.error("Failed to fetch reviews", error);
       }
     };
 
     if (productId) {
       fetchAllReviews();
     }
   }, [productId,token]);

  return (
    <ReviewContext.Provider
      value={{
        setProductId,
        avgRatings,
        allReviews
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
