import { createContext, useEffect, useState } from "react";
import { getUserWishlist,addToWishlist,deleteItemOnWishlist } from "../API/Wishlist/Wishlist";
import { useContext } from "react";
import { AuthContext } from "./authContext";


export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const userId = useContext(AuthContext).userId
    const token = useContext(AuthContext).token
    const [wishlist, setWishlist] = useState([]);

    const fetchWishlist = async () => {
        try {
            const response = await getUserWishlist( token)
            // console.log(response.items)
            if (response && response.items) {
                setWishlist(response.items.map(item => item.productId))
            }
        }
        catch (error) {
            console.log("Error fetching wishlist:", error)
        }
    }
    // Load wishlist from localStorage on mount
    useEffect(() => {
        if (userId && token) {
            fetchWishlist();
        }else{setWishlist([])}
    }, [userId,token]);
    const handleAddToWishlist = async (productId) => {
        try {
        await addToWishlist(userId, productId, token);
        await fetchWishlist(); // This will refresh with server data
    } catch (err) {
        console.error("Failed to add:", err.message);
    }
    };

    const handleRemoveFromWishlist = async (productId) => {
        try {
            const response = await deleteItemOnWishlist(userId, productId, token);
            setWishlist(prevWishlist => prevWishlist.filter(id => id !== productId));
            console.log("Removed:", response);
            fetchWishlist();
        } catch (err) {
            console.error("Failed to remove:", err.message);
        }
    };
//     useEffect(() => {
//   console.log("Wishlist after fetch:", wishlist);
// }, [wishlist]);//the saviour

    const isWishlisted =(productId)=> wishlist.some(item => item._id === productId)
    // console.log(isWishlisted("68160b9d58737a83eabf842f"))
    return (
        <WishlistContext.Provider value={{
            isWishlisted,
            handleAddToWishlist,
            handleRemoveFromWishlist,
            wishlist,
        }}>
            {children}
        </WishlistContext.Provider>
    );
};
