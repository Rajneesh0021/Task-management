const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../Utils/authUtils');
const { generateToken } = require('../Utils/JwtUtils');

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(password);
    
  
    const user = await User.create({ email, password: hashedPassword });
    

    const token = generateToken(user._id);
    
    // Respond with success message and token
    res.status(200).json({ message: 'Signup Successfully!', token });
  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not Found !' });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Password incorrect !' });
    }
    const token = generateToken(user._id); // Generate JWT token
    res.status(200).json({ message: 'Login Successfully!', token });
  } catch (error) {
    next(error);
  }
};
