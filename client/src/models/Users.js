// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Only manual registration will use this field
  isLinked: {type: Boolean, default: false}
});




module.exports = mongoose.model('User', userSchema);


