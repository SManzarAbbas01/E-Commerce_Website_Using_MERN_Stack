import jwt from 'jsonwebtoken';
const adminAuth = (req, res, next) => {
    try{
        const {token} = req.headers; // Assuming the token is stored in cookies
        if(!token){
            return res.status(401).json({ success: false, message: "No token provided, authorization denied." });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if(token_decode!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(401).json({ success: false, message: "Invalid token, authorization denied." });
        }
        next(); // Proceed to the next middleware or route handler
   
    }
    catch(error){
        console.log("--- CATCH BLOCK ERROR DETAILS ---");
        console.log("Full error object:", error);
        console.log("Error message property:", error ? error.message : "Error object was null/undefined");
        console.log("--- END ERROR DETAILS ---");
        res.status(500).json({ success: false, message: error.message || "An unknown server error occurred." });
    }


}
export default adminAuth;