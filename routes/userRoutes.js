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
const bcrypt = require('bcryptjs');
const User = require('../client/src/models/Users');
//const jwt = require('jsonwebtoken');

//const JWT_SECRET = 'your_jwt_secret'; // Replace with a strong, unique secret


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




router.post('/registerUserManual', async (req, res) => {
  try {
    const { uid, name, email, password } = req.body;

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'The email is already registered!' });
    }

    // Check if UID already exists
    const existingUserByUID = await User.findOne({ uid });
    if (existingUserByUID) {
      return res.status(400).json({ message: 'The UID is already registered!' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ uid, name, email, password: hashedPassword });

    await newUser.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during manual user registration:', error);
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



router.post('/loginUserManual', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt with:', { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User found:', { email: user.email, storedPasswordHash: user.password });

    // Compare the plain-text password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    console.log('Password comparison:', {
      inputPassword: password,
      storedPasswordHash: user.password,
      isMatch
    });

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token if needed (optional)
    // const token = jwt.sign({ uid: user.uid }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during manual login:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
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

