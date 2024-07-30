//routes/userRoutes.js
// routes/userRoutes.js
// routes/userRoutes.js
// const express = require('express');
// const router = express.Router();
// const User = require('../client/src/models/Users');

// // Route to create or update user data
// router.post('/login', async (req, res) => {
//   const { email, name } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       // Update user data if user already exists
//       user.name = name;
//       user = await user.save();
//     } else {
//       // Create new user if doesn't exist
//       user = new User({ email, name });
//       user = await user.save();
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Route to get user data
// router.get('/:email', async (req, res) => {
//   const { email } = req.params;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('../client/src/models/Users');

// router.post('/saveUser', async (req, res) => {
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
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;



//ver 1.35
const express = require('express');
const router = express.Router();
const User = require('../client/src/models/Users');

router.post('/saveUser', async (req, res) => {
  const { uid, displayName, email } = req.body;

  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, name: displayName, email });
      await user.save();
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Fetch user data by ID, ver 1.45
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ uid: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
