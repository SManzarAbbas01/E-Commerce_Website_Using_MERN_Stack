import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Helper function to create a token
const createToken = (id) => {
    // This function signs the token with the secret key from your .env file
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '3d' // Token will expire in 3 days
    });
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }
        
        // This is where the crash was happening. It calls createToken.
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists." });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email." });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// You have an adminLogin route, so you need a controller for it.
// This is a basic placeholder. You should add your specific admin logic.
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // IMPORTANT: Add your admin login logic here.
        // For example, check against a specific admin email and password.
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // You might want a different kind of token for admins
            const token = jwt.sign({ id: email, isAdmin: true }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
            res.json({ success: true, token: token, message: "Admin login successful." });
        } else {
            res.status(403).json({ success: false, message: "Not a valid admin." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export { loginUser, registerUser, adminLogin };
