require("dotenv").config();
const ConnectDB = require("./Config/db.js");
const express = require("express");
const cors = require("cors");
const app = express();

const webhookRoutes=require('./Routes/PaymentRoutes/webhookRoutes.js')
const authRoutes = require("./Routes/authRoutes.js");
const userRoutes = require("./Routes/userRoutes.js");
const productRoutes = require("./Routes/Product Routes/productRoutes.js");
const categoryRoutes = require("./Routes/Category Routes/categoryRoutes.js");
const cartRoutes = require("./Routes/CartRoutes/CartRoutes.js");
const addressRoutes=require('./Routes/AddressRoutes/AddressRoutes.js')
const paymentRoutes=require('./Routes/PaymentRoutes/StripeRoutes.js')
const orderRoutes=require('./Routes/Order/OrderRoutes.js')
const wishlistRoutes=require('./Routes/Wishlist/WishlistRoutes.js')
const reviewRoutes = require("./Routes/ReviewRoutes/reviewRoutes.js");
//MongoDB connection
ConnectDB();
//middleware
// Mount webhook route BEFORE express.json() cause If you use express.json() (or any body parser) before your webhook route, the body is parsed and the raw data is lost, so Stripe's verification fails.
app.use('/api/webhook', webhookRoutes);//
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);// Authentication Routes
app.use("/api/user", userRoutes); // User Routes
app.use('/api/product', productRoutes); // Product Routes
app.use('/api/category', categoryRoutes); // Category Routes
app.use('/api/cart', cartRoutes); // Cart Routes
app.use('/api/address',addressRoutes)// Address Routes
app.use('/api/checkouts',paymentRoutes)//Payment Routes
app.use('/api/orders',orderRoutes)//Order Routes
app.use('/api/wishlist',wishlistRoutes)//Wishlist Routes
app.use("/api/reviews", reviewRoutes);

// Then later you can use JSON for all other routes
// app.use(express.json());

//Demo Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Website" });
});

//server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
