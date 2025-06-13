
import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = () => { // Removed 'async'
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
  console.log('Cloudinary configured successfully!'); // Added confirmation log
};

// Export the configured cloudinary instance for use in other files (e.g., controllers)
// This is crucial if you plan to use 'cloudinary.uploader.upload()' in other files.
export { cloudinary };
export default connectCloudinary;