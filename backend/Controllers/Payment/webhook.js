require("dotenv").config();
const sendEmail = require("../../Utils/sendMail");
const User = require("../../Models/UserModel");
const Cart = require("../../Models/Cart/Cart");
const Product =require("../../Models/Product/ProductModel")
const Stripe = require("stripe");
const Order = require("../../Models/Order/OrderSchema"); // Adjust path based on your structure
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body, // make sure you're using raw body middleware
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // console.log('metadata-',session.metadata)
    // console.log('event object-',event.data.object)
    try {
      const userId = session.metadata.userId;
      const cartId = session.metadata.cartId;
      const address = JSON.parse(session.metadata.selectedAddress);
      const user = await User.findById(userId);
      const cart = await Cart.findById(cartId);
      if (!user) {
        console.error("User not found");
        return res.status(404).send("User not found");
      }
      const email = user.email;
      console.log(email);
      // You'd fetch products from DB or cartId and create an order
      if (!cart) {
        console.error("Cart not found");
        return res.status(404).send("Cart not found");
      }
      // Update inventory for each ordered product
      await Promise.all(
        cart.Items.map((item) =>
          Product.findByIdAndUpdate(
            item.productId,
            { $inc: { stock: -item.quantity } }, // Decrement stock
            { new: true }
          )
        )
      );

      // You'd fetch products from DB or cartId and create an order
      const order = new Order({
        userId,
        products: cart.Items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          productPrice: item.price,
        })),
        totalAmount: session.amount_total / 100,
        shippingAddress: address._id,
        paymentStatus: "Paid",
        orderStatus: "Pending",
      });

      // console.log(order);
      await order.save();
      console.log("Order created successfully");
      //clear the cart after order creation
      await Cart.findByIdAndDelete(cartId);
      console.log("Cart deleted");
      // Send confirmation email
      await sendEmail({
        to: email, // Make sure address contains an email field
        subject: "Order Confirmation",
        text: `Thank you for your order! Your order ID is ${order._id}.`,
      });
    } catch (err) {
      console.error("Error creating order:", err.message);
    }
  }

  res.status(200).send("Received");
};
