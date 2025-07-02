import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"; // Needed to clear the user's cart

// --- Helper function for placing a generic order ---
// This contains the core logic that is shared by all payment methods to avoid repetition.
const placeOrderLogic = async (userId, items, amount, address, paymentMethod, paymentStatus) => {
    const newOrder = new orderModel({
        userId: userId,
        items: items,
        amount: amount,
        address: address,
        paymentMethod: paymentMethod,
        payment: paymentStatus,
        status: "Processing", // Set a default status
        date: new Date()      // Set the current date
    });
    await newOrder.save();

    // After placing the order, clear the user's cart from their user document.
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return newOrder;
};

// --- Placing Orders (Payment Methods) ---

// Placing an order using Cash on Delivery (COD)
const placeOrder = async (req, res) => {
    try {
        // Correctly destructure the address, items, and amount from the request body.
        const { address, items, amount } = req.body;
        // Use the userId from the auth middleware, not the body.
        await placeOrderLogic(req.userId, items, amount, address, "COD", false);
        
        // Send a single, successful response.
        res.json({ success: true, message: "Order Placed (COD)" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error placing order." });
    }
};

// Placing an order using JazzCash (Simulated)
const placeOrderJazzCash = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        await placeOrderLogic(req.userId, items, amount, address, "JazzCash", true);
        res.json({ success: true, message: "Order Placed (JazzCash)" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error placing order." });
    }
};

// Placing an order using EasyPaisa (Simulated)
const placeOrderEasyPaisa = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        await placeOrderLogic(req.userId, items, amount, address, "EasyPaisa", true);
        res.json({ success: true, message: "Order Placed (EasyPaisa)" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error placing order." });
    }
};

// Placing an order using Card (Not Available)
const placeOrderCard = async (req, res) => {
    res.status(501).json({ success: false, message: "Card payments are not available." });
};

// --- Viewing and Managing Orders ---

// All orders data for admin panel 
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching orders." });
    }
};

// User orders data for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching user orders." });
    }
};

// Update order status from Admin panel
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status: status });
        res.json({ success: true, message: "Order status updated." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating status." });
    }
};

export { placeOrder, placeOrderJazzCash, placeOrderEasyPaisa, placeOrderCard, allOrders, userOrders, updateOrderStatus };
