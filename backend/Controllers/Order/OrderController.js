const Order = require('../../Models/Order/OrderSchema')

const createOrder = async (req,res)=>{
    try{
        const { userId, products, totalAmount,shippingAddress, paymentStatus} = req.body;

        // Validate request body
        if (!userId || !products || !totalAmount) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create new order
        const newOrder = new Order({
            userId,
            products,
            totalAmount,
            shippingAddress,
            paymentStatus: paymentStatus||'Unpaid',
            orderStatus: 'Pending'
        });

        // Save order to database
        const savedOrder = await newOrder.save();

        // Respond with the created order
        res.status(201).json(savedOrder);
    }
    catch(error){
        console.error("Error creating order:",error)
    }
}

const getUserOrders = async (req, res) => {
    try {
        const userId = req.params.userId;//body
        // console.log("userID",userId)
        
        // Find order by ID
        const orders = await Order.find({ userId })
            .populate('userId', 'name email')
            .populate('products.productId');

        // If order not found, return 404
        if (!orders) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Respond with the found orders
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // Latest orders first
      .populate('userId', 'name email'); // Optional: Populate user name & email

    // console.log("Fetched all orders");

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;

        // Validate request body
        if (!orderStatus) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Update order status
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { orderStatus },
            { new: true }
        );

        // If order not found, return 404
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Respond with the updated order
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports={createOrder,getUserOrders,getAllOrders,updateOrderStatus}