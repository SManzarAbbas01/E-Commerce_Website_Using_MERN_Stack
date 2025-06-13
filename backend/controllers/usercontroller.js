import express from 'express';
import userModel from '../models/usermodel.js';
import validator from 'validator'; // Assuming you have a validator library for email and password validation
import bcrypt from 'bcrypt'; // Assuming you will use bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Assuming you will use jsonwebtoken for token generation
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}


//route for user login
const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token })


    }
    else {
      res.json({ success: false, message: 'Invalid Credentials' });
    }

  }
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }






}
//route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }
    // validationg email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'please enter a valid email address' });
    }

    if (password.length < 8 || !validator.isStrongPassword(password)) {
      return res.json({ success: false, message: 'please enter a strong password with at least 8 characters, including uppercase, lowercase, numbers, and symbols' });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    //save the user to the database
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }


}

//route for admin login
const adminLogin = async (req, res) => { }


export { loginUser, registerUser, adminLogin };