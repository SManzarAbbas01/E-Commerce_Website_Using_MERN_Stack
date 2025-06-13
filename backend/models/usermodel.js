import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   
    cartData: { type: Object, default: {} }, // Or { type: Object, default: {} } if it's meant to be an empty object

   

}, { minimize: false }); // Correction 2: minimize:false goes into an options object

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;