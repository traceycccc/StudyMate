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


// // Fetch user data by ID, ver 1.45
// router.get('/users/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findOne({ uid: id });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;



//ver 2.1
const express = require('express');
const router = express.Router();
const User = require('../client/src/models/Users');

// Register a user with Google
// router.post('/registerUserGoogle', async (req, res) => {
//   const { uid, displayName, email } = req.body;

//   try {
//     let user = await User.findOne({ uid });
//     if (!user) {
//       user = new User({ uid, name: displayName, email });
//       await user.save();
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

//
// Register user with Google
// router.post('/registerUserGoogle', async (req, res) => {
//   const { uid, displayName, email } = req.body;

//   try {
//     let user = await User.findOne({ uid });
//     if (user) {
//       return res.status(400).json({ message: 'The Google Account is already registered! Please try again!' });
//     }

//     // Create and save new user
//     user = new User({ googleId: uid, name: displayName, email });
//     await user.save();

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error during registration:', error.message); // Log error message
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// router.post('/registerUserGoogle', async (req, res) => {
//   try {
//     const { uid, email, displayName } = req.body;

//     // Check if the user already exists
//     const existingUser = await User.findOne({ googleId: uid });
//     if (existingUser) {
//       return res.status(400).json({ message: 'The Google Account is already registered!' });
//     }

//     // Create a new user
//     const newUser = new User({
//       googleId: uid,
//       email,
//       name: displayName
//     });

//     await newUser.save();

//     res.status(200).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error('Error during user registration:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

router.post('/registerUserGoogle', async (req, res) => {
  const { uid, displayName, email } = req.body;

  try {
    let user = await User.findOne({ uid });
    if (user) {
      return res.status(400).json({ message: 'The Google Account is already registered! Please try again!' });
    }

    user = new User({ uid, name: displayName, email });
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;

router.post('/testRegister', async (req, res) => {
  try {
    const userData = {
      uid: 'hardcodedUid12345test',
      email: 'hardcoded2@example.com',
      name: 'Hardcoded User 2'
    };

    console.log('Registering hardcoded user with data:', userData);

    // Check if the user already exists based on `uid`
    const existingUser = await User.findOne({ uid: userData.uid });
    if (existingUser) {
      return res.status(400).json({ message: 'The UID is already registered!' });
    }

    const newUser = new User(userData);

    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// Login a user with Google
router.post('/loginUserGoogle', async (req, res) => {
  const { uid } = req.body;

  try {
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found! Please try agains!' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Fetch user data by ID, for profile display
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

