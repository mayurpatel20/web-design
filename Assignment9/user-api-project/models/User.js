/**const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    validate: /^[a-zA-Z\s]+$/, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, 
  },
  password: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);**/
// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);

