const Cart = require("../../Models/Cart/Cart");
const ProductModel = require("../../Models/Product/ProductModel")

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, price } = req.body;

    // 1. Check if product exists and has enough stock
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available." });
    }

    // 2. Check if the user already has a cart
    const existingCart = await Cart.findOne({ userId });
    if (existingCart) {
      // If the user has a cart, check if the product is already in the cart
      const existingItem = existingCart.Items.find(
        (item) => item.productId.toString() === productId.toString()
      );
      if (existingItem) {
        return res.status(200).json({ message: "Item already exists in your cart." });
      } else {
        // If the product is not in the cart, add it to the cart
        existingCart.Items.push({ productId, quantity, price });
        await existingCart.save();
        return res.status(200).json({ message: "Product added to cart successfully.", existingCart });
      }
    } else {
      // If the user does not have a cart, create a new one
      let NewCart = new Cart({ userId, Items: [{ productId, quantity, price }] });
      await NewCart.save();
      return res.status(201).json({ message: "Cart created successfully.", NewCart });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId }).populate("Items.productId", "name price image stock");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

const removeCartItem = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ messege: "Cart not found." })
    }
    const itemIndex = cart.Items.findIndex((item) => item._id.toString() === itemId)

    if (itemIndex === -1) {
      return res.status(404).json({ messege: "Item not found in cart." })
    }
    await cart.Items.splice(itemIndex, 1)
    await cart.save()
    res.status(200).json({ message: "Item removed from cart successfully.", cart })
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

const updateCartItemQty = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }
    const itemIndex = cart.Items.findIndex((item) => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    // Check product stock before updating quantity
    const productId = cart.Items[itemIndex].productId;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available." });
    }

    cart.Items[itemIndex].quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Item updated successfully.", cart });
  } catch (error) {
    console.error("Error updating item in cart:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
module.exports = { addToCart, getCartItems, removeCartItem, updateCartItemQty };