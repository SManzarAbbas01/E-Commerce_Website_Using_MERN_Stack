import bcrypt from 'bcrypt';
import validator from 'validator';
import userModel from '../models/usermodel.js';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {

};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password should be at least 8 characters" });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPass,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  
};

export { loginUser, registerUser, adminLogin };
