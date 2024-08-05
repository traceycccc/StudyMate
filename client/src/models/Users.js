// models/User.js
// models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   uid: { type: String, required: true, unique: true },
//   email: { type: String, required: true },
//   name: { type: String },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;

// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String } // Only manual registration will use this field
});


// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);


