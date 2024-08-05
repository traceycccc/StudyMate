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

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);


