const Wishlist = require('../../Models/Wishlist/WishlistModel');
const Review = require('../../Models/Reviews/ReviewSchema')
const createWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // Check if wishlist already exists for the user    
        let wishlist = await Wishlist.findOne({ userId });
        if (wishlist) {
            // Check if product already exists in wishlist
            const productExists = wishlist.items.some(item => item.productId.toString() === productId);
            if (productExists) {
                return res.status(400).json({ message: "Product already exists in wishlist" });
            }

            wishlist.items.push({ productId: productId })
            await wishlist.save();
            return res.status(200).json({ message: "Product added to wishlist", wishlist })
        }
        // Create new wishlist if it doesn't exist
        wishlist = new Wishlist({
            userId: userId,
            items: [{ productId: productId }]
        })
        await wishlist.save();
        return res.status(201).json({ message: "Wishlist created and product added", wishlist })
    }
    catch (error) {
        console.error("Error creating wishlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getUserWishlist = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from request parameters
        // console.log(userId)
        // Find wishlist by userId
        const wishlist = await Wishlist.findOne({ userId: userId })
            .populate('items.productId', 'name price image stock');

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        const itemsWithAvgRating = await Promise.all(
            wishlist.items.map(async (item) => {
                const product = item.productId;
                const reviews = await Review.find({ productId: product._id });
                const avgRating =
                    reviews.length > 0
                        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
                        : 0;
                return {
                    ...item.toObject(),
                    productId: {
                        ...product.toObject(),
                        avgRating: Number(avgRating.toFixed(1)),
                        reviewCount: reviews.length,
                    },
                };
            })
        );

        return res.status(200).json({
            ...wishlist.toObject(),
            items: itemsWithAvgRating,
        });

        // Respond with the found wishlist
        // res.status(200).json(wishlist);
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Validate request body
        if (!userId || !productId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Find wishlist by userId
        const wishlist = await Wishlist.findOne({ userId: userId });

        // If wishlist not found, return 404
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        // Remove product from wishlist
        wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);

        // Save updated wishlist
        await wishlist.save();
        res.status(200).json({ message: "Product removed from wishlist", wishlist });

    } catch (error) {
        console.error("Error removing product from wishlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    createWishlist,
    getUserWishlist,
    removeFromWishlist
};