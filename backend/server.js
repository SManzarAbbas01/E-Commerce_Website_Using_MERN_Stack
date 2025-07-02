// server.js
import 'dotenv/config'; // IMPORTANT: This should be the very first line to load .env variables
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js'; // Assuming this exports a function to call
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js'; // Assuming this exports the orderRouter
// App config
const app = express();
const port = process.env.PORT || 4000;

// ADDING CONNECT DB
connectDB();

// ADDING CLOUDINARY CONFIGURATION
// Assuming connectCloudinary() handles the cloudinary.config({...}) setup
connectCloudinary();

// Middleware
// Whatever request we will get, it will be passed by json
app.use(express.json());
app.use(cors());

// API Endpoints
// IMPORTANT: Paths should start with a '/'
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',cartRouter)
// Add other routes as needed, e.g., orderRouter, etc.
app.use('/api/order', orderRouter); // Assuming orderRouter is defined in routes/orderRoute.js



app.get('/', (req, res) => {
  res.send("API working");
});

app.listen(port, () => console.log('server started on port: ' + port));