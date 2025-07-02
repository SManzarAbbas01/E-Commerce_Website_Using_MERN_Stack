import express from 'express';
import {
    placeOrder,
    placeOrderJazzCash,
    placeOrderEasyPaisa,
    placeOrderCard,
    allOrders,
    userOrders,
    updateOrderStatus
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'; // Assuming you have created this middleware
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// --- Admin Features (Protected by adminAuth) ---
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

// --- Payment & Placing Order Features (Protected by user auth) ---
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/jazzcash', authUser, placeOrderJazzCash);
orderRouter.post('/easypaisa', authUser, placeOrderEasyPaisa);
orderRouter.post('/stripe', authUser, placeOrderCard);

// --- User Features (Protected by user auth) ---
// Note: Using GET is more standard for fetching data.
// CORRECT & BEST PRACTICE
orderRouter.get('/userorders', authUser, userOrders);

export default orderRouter;
