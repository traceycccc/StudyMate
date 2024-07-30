// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const DB_URI = process.env.DB_URI;

// mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const User = require('./models/User'); // Import your User model

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const DB_URI = process.env.DB_URI;

// mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// // Add the API route to get user details
// app.get('/api/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).send('User not found');
//     res.json(user);
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const User = require('./models/User');  // Import your User model

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const DB_URI = process.env.DB_URI;

// mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// // Endpoint to save user data
// app.post('/api/saveUser', async (req, res) => {
//   const { uid, email, displayName } = req.body;

//   try {
//     let user = await User.findOne({ uid });
//     if (user) {
//       // If user exists, update the information
//       user.email = email;
//       user.displayName = displayName;
//       await user.save();
//     } else {
//       // If user does not exist, create a new one
//       user = new User({
//         uid,
//         email,
//         displayName
//       });
//       await user.save();
//     }
//     res.status(200).json({ message: 'User saved successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const DB_URI = process.env.DB_URI;

// mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// const userSchema = new mongoose.Schema({
//   uid: String,
//   name: String,
//   email: String,
// });

// const User = mongoose.model('User', userSchema);

// app.post('/api/users', async (req, res) => {
//   const { uid, name, email } = req.body;
//   try {
//     let user = await User.findOne({ uid });
//     if (!user) {
//       user = new User({ uid, name, email });
//       await user.save();
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const DB_URI = process.env.DB_URI;

// mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// const userSchema = new mongoose.Schema({
//   uid: String,
//   name: String,
//   email: String,
// });

// const User = mongoose.model('User', userSchema);

// app.post('/api/users', async (req, res) => {
//   const { uid, name, email } = req.body;
//   try {
//     let user = await User.findOne({ uid });
//     if (!user) {
//       user = new User({ uid, name, email });
//       await user.save();
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// with logic
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const DB_URI = process.env.DB_URI;

// mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// const userSchema = new mongoose.Schema({
//   uid: String,
//   name: String,
//   email: String,
// });

// const User = mongoose.model('User', userSchema);

// app.post('/api/saveUser', async (req, res) => {
//   const { uid, displayName, email } = req.body;
//   try {
//     let user = await User.findOne({ uid });
//     if (!user) {
//       user = new User({ uid, name: displayName, email });
//       await user.save();
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const DB_URI = process.env.DB_URI;

// mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// const userSchema = new mongoose.Schema({
//   uid: String,
//   name: String,
//   email: String,
// });

// const User = mongoose.model('User', userSchema);

// app.post('/api/saveUser', async (req, res) => {
//   const { uid, displayName, email } = req.body;
//   try {
//     let user = await User.findOne({ uid });
//     if (!user) {
//       user = new User({ uid, name: displayName, email });
//       await user.save();
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error saving user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

//ver 1.35
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes'); // Import userRoutes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api', userRoutes); // Use userRoutes for /api

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


