import userModel from '../models/userModel.js';

// Add items to user cart
const addCart = async (req, res) => {
    try {
        // *** FIX: Read userId from req.userId (set by auth middleware) ***
        let userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        let cartData = userData.cartData || {};
        const { itemId, size } = req.body;

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding to cart." });
    }
};

// Update item quantity in the user's cart
const updateCart = async (req, res) => {
    try {
        // *** FIX: Read userId from req.userId ***
        const { itemId, size, quantity } = req.body;
        const userData = await userModel.findById(req.userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId] && cartData[itemId][size] !== undefined) {
             if (quantity > 0) {
                cartData[itemId][size] = quantity;
             } else {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
             }
        } else {
            return res.status(400).json({success: false, message: "Item not found in cart."})
        }

        await userModel.findByIdAndUpdate(req.userId, { cartData });
        res.json({ success: true, message: "Cart updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating cart." });
    }
};

// Fetch user cart data
const getUser = async (req, res) => {
    try {
        // *** FIX: Read userId from req.userId ***
        let userData = await userModel.findById(req.userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        let cartData = userData.cartData || {};
        res.json({ success: true, cartData: cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching cart data." });
    }
};

export { addCart, updateCart, getUser };
