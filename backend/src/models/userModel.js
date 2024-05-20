const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role:{type:String, enum:['Admin','User'], default:'User'}
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
