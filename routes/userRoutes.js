
//4.1
// require('dotenv').config();
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../client/src/models/Users');
// const nodemailer = require('nodemailer');
// const otpGenerator = require('otp-generator');



// //google register
// router.post('/registerUserGoogle', async (req, res) => {
//   const { uid, displayName, email } = req.body;

//   try {
//     let user = await User.findOne({ uid });
//     if (user) {
//       return res.status(400).json({ message: 'The Google Account is already registered! Please try again!' });
//     }

//     user = new User({ uid, name: displayName, email });
//     await user.save();

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


// // Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// // Function to send OTP email
// const sendOTPEmail = async (email, otp) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USERNAME,
//       to: email,
//       subject: 'Your OTP Code',
//       text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error('Error sending OTP email:', error);
//     throw new Error('Failed to send OTP email');
//   }
// };

// router.post('/registerUserManual', async (req, res) => {
//   try {
//     const { uid, name, email, password } = req.body;

//     const existingUserByEmail = await User.findOne({ email });
//     if (existingUserByEmail) {
//       return res.status(400).json({ message: 'The email is already registered!' });
//     }

//     const existingUserByUID = await User.findOne({ uid });
//     if (existingUserByUID) {
//       return res.status(400).json({ message: 'The UID is already registered!' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({ uid, name, email, password: hashedPassword });

//     const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

//     newUser.otp = otp;
//     newUser.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

//     //await newUser.save();

//     await sendOTPEmail(email, otp);

//     res.status(200).json({ message: 'OTP sent to your email' });
//   } catch (error) {
//     console.error('Error during manual user registration:', error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// });

// router.post('/verifyOTP', async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     // get current time 
//     const currentTime = Date.now();
//     // check for OTP expiration
//     if (currentTime > user.otpExpires) {
//       return res.status(400).json({ message: 'OTP expired' });
//     }

   

//     if (user.otp !== otp || user.otpExpires < Date.now()) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     // if is not expired, compare the string entered
//     const isOtpValid = await bcrypt.compare(submittedOTP, user.otp);
//     console.log(`OTP Valid: ${isOtpValid}`);

//     if (!isOtpValid) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     // clear the OTP and its expiration time in database after successful verification
//     user.otp = undefined;
//     user.otpExpires = undefined;

//     await user.save();

//     res.status(200).json({ message: 'OTP verfied successfully. User registered successfully' });
//   } catch (error) {
//     console.error('Error during OTP verification:', error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// });



// // Login a user with Google
// router.post('/loginUserGoogle', async (req, res) => {
//   const { uid } = req.body;

//   try {
//     const user = await User.findOne({ uid });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found! Please try agains!' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });



// router.post('/loginUserManual', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     console.log('Login attempt with:', { email, password });

//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('User not found');
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     console.log('User found:', { email: user.email, storedPasswordHash: user.password });

//     // Compare the plain-text password with the hashed password stored in the database
//     const isMatch = await bcrypt.compare(password, user.password);

//     console.log('Password comparison:', {
//       inputPassword: password,
//       storedPasswordHash: user.password,
//       isMatch
//     });

//     if (!isMatch) {
//       console.log('Password does not match');
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Generate a JWT token if needed (optional)
//     // const token = jwt.sign({ uid: user.uid }, 'your_jwt_secret', { expiresIn: '1h' });

//     res.status(200).json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error during manual login:', error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// });



// // Fetch user data by ID, for profile display
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



//4.2
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../client/src/models/Users');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');



//google register
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



// Temporary storage for OTP and user details (consider using a more persistent store)
const otpStorage = new Map();

router.post('/registerUserManual', async (req, res) => {
  try {
    const { name, email, password , uid} = req.body;

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'The email is already registered!' });
    }

    // Generate a unique UID
    //const uid = 'uid-' + Math.random().toString(36).substr(2, 16);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true });
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Store OTP and user details temporarily
    otpStorage.set(email, { uid, name, email, password: hashedPassword, hashedOtp });

    // Send OTP via email
    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`
    };

    console.log('otp is ', otp);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending OTP email:', error);
        return res.status(500).json({ message: 'Error sending OTP' });
      }
      res.status(200).json({ message: 'OTP sent to email' });
    });
  } catch (error) {
    console.error('Error during manual user registration:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

router.post('/verifyOTP', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Retrieve stored OTP and user details
    const userDetails = otpStorage.get(email);
    if (!userDetails) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Compare OTP
    const isMatch = await bcrypt.compare(otp, userDetails.hashedOtp);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Save the user to the database
    const newUser = new User({
      uid: userDetails.uid,
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password
    });

    await newUser.save();
    otpStorage.delete(email); // Clean up stored OTP

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
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
