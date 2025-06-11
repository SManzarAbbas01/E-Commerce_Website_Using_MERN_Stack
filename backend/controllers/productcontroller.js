// productController.js

// 1. Function to add a product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, sizes, bestseller } = req.body;

    const Image1 = req.files.Image1?.[0];
    const Image2 = req.files.Image2?.[0];
    const Image3 = req.files.Image3?.[0];
    const Image4 = req.files.Image4?.[0];

    // Check product details in console
    console.log(name, description, price, category, subcategory, sizes, bestseller);
    console.log(Image1, Image2, Image3, Image4);

    res.json({ success: true, message: "Product data received successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// 2. Function to list all products
const listProduct = async (req, res) => {
  // Logic goes here
};

// 3. Function to remove a product
const removeProduct = async (req, res) => {
  // Logic goes here
};

// 4. Function to get a single product's info
const singleProduct = async (req, res) => {
  // Logic goes here
};


export { addProduct, listProduct, removeProduct, singleProduct };
