import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Correction 1: cartData should be an array of Objects if it's meant to hold items
    // If cartData will contain a list of structured items, you'd define a sub-schema or use an array of objects.
    // For a simple array that might contain anything (like product IDs and quantities), you can use:
    cartData: { type: Array, default: [] }, // Or { type: Object, default: {} } if it's meant to be an empty object

    // If you intend for cartData to be a JavaScript Object (like {productId: quantity}),
    // then the type should be 'Object' (capital O) and default to an empty object:
    // cartData: { type: Object, default: {} },

    // If cartData will be an array of objects (e.g., [{ productId: "123", quantity: 2 }]),
    // a common pattern is to define it as an array of 'Mixed' type or a sub-schema:
    // cartData: { type: [mongoose.Schema.Types.Mixed], default: [] },
    // Or if you want a specific structure for each item in the cart:
    // cartData: [{
    //     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    //     quantity: { type: Number, default: 1 }
    // }]

}, { minimize: false }); // Correction 2: minimize:false goes into an options object

// Correction 3: Use mongoose.models.User to check if the model already exists
// This prevents errors if you're hot-reloading or defining the model multiple times
const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;