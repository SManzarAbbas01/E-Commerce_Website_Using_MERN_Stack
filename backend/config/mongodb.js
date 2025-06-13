

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // THIS IS THE CORRECT WAY TO CONNECT TO YOUR ATLAS CLUSTER
    // It reads the complete connection string (including the database name) from your .env file
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully to LeelafPK Atlas cluster!');
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // console.error(error); // Uncomment for more detailed error logging during debugging
    process.exit(1); // Exit process on connection error
  }
};

export default connectDB;