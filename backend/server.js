// server.js
import 'dotenv/config'; // IMPORTANT: This should be the very first line to load .env variables
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js'; // Assuming this exports a function to call
import userRouter from './routes/userroute.js';
import productRouter from './routes/productroute.js';

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

app.get('/', (req, res) => {
  res.send("API working");
});

app.listen(port, () => console.log('server started on port: ' + port));