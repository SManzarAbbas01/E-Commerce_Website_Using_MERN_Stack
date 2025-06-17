// productController.js
import cloudinary from 'cloudinary';
import productModel from '../models/productmodel.js';

const addProduct = async (req, res) => {
    try {
       
        const { name, description, price, category, subCategory, Sizes, bestSeller } = req.body;
        // --- END CHANGE ---

        const Image1 = req.files.Image1 && req.files.Image1[0];
        const Image2 = req.files.Image2 && req.files.Image2[0];
        const Image3 = req.files.Image3 && req.files.Image3[0];
        const Image4 = req.files.Image4 && req.files.Image4[0];

        const images = [Image1, Image2, Image3, Image4].filter((item) => item !== undefined);
        let imageUrls = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url;
            })
        );

        // Safely parse 'Sizes'
        let parsedSizes = [];
        if (Sizes && typeof Sizes === 'string') { // Use 'Sizes' (capital S) here
            try {
                parsedSizes = JSON.parse(Sizes);
                if (!Array.isArray(parsedSizes)) {
                    throw new Error("Sizes field must be a valid JSON array string.");
                }
            } catch (parseError) {
                console.error("Error parsing Sizes:", parseError);
                return res.status(400).json({ success: false, message: "Sizes field must be a valid JSON array string (e.g., [\"M\", \"L\"])." });
            }
        } else if (Sizes === undefined || Sizes === null) {
            // Handle missing Sizes if it's required (your schema says it is)
            return res.status(400).json({ success: false, message: "Sizes field is required." });
        } else {
            // If Sizes exists but is not a string (e.g., an object if not parsed by multer correctly)
            return res.status(400).json({ success: false, message: "Sizes field has an invalid format. Expected a JSON array string." });
        }


        const productData = {
            name,
            description,
            price: Number(price),
            Image: imageUrls,
            category,
            subCategory: subCategory, // Use subCategory (capital C) here
            Sizes: parsedSizes,       // Use the parsed array here
            bestSeller: bestSeller === "true" ? true : false, // Use bestSeller (capital S) here
            date: Date.now(),
        };
        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added successfully" });
    } catch (error) {
        console.log("--- CATCH BLOCK ERROR DETAILS ---");
        console.log("Full error object:", error);
        console.log("Error message property:", error ? error.message : "Error object was null/undefined");
        console.log("--- END ERROR DETAILS ---");
        res.json({ success: false, message: error.message || "An unknown server error occurred." });
    }
};



// 2. Function to list all products
const listProduct = async (req, res) => {
    try{

        const products = await productModel.find({})
        res.json({success:true,products})
    }
    catch(error){
        console.log("--- CATCH BLOCK ERROR DETAILS ---");
        console.log("Full error object:", error);
        console.log("Error message property:", error ? error.message : "Error object was null/undefined");
        console.log("--- END ERROR DETAILS ---");
        res.json({ success: false, message: error.message || "An unknown server error occurred." });
    }





};

// 3. Function to remove a product
const removeProduct = async (req, res) => {
    try{
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" });
    }
    catch(error){
        console.log("--- CATCH BLOCK ERROR DETAILS ---");
        console.log("Full error object:", error);
        console.log("Error message property:", error ? error.message : "Error object was null/undefined");
        console.log("--- END ERROR DETAILS ---");
        res.json({ success: false, message: error.message || "An unknown server error occurred." });
    }



};

// 4. Function to get a single product's info
const singleProduct = async (req, res) => {
  try{

    const {productId} = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });


  }
   catch(error){
        console.log("--- CATCH BLOCK ERROR DETAILS ---");
        console.log("Full error object:", error);
        console.log("Error message property:", error ? error.message : "Error object was null/undefined");
        console.log("--- END ERROR DETAILS ---");
        res.json({ success: false, message: error.message || "An unknown server error occurred." });
    }

  
};


export { addProduct, listProduct, removeProduct, singleProduct };
