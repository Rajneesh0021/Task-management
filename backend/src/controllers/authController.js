const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../Utils/authUtils');
const { generateToken } = require('../Utils/JwtUtils');
const { ResponseHandler } = require('../responseHandler/responseHandler');


exports.signup = async (req, res, next) => {
  try {
    const { email, password,role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ResponseHandler(res, null, 'User already exists', 401);
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword, role });
    const token = generateToken(user._id); 

    ResponseHandler(res, { token }, 'Signup Successfully!', 200);
  } catch (error) {
    ResponseHandler(res, null, error.message,  500);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return ResponseHandler(res, null, 'User not Found!', 401);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return ResponseHandler(res, null, 'Password incorrect!', 400);
    }

    const token = generateToken(user._id);
    ResponseHandler(res, { token }, 'Login Successfully!', 200);
  } catch (error) {
    ResponseHandler(res,null, error.message, 500);
  }
};
