
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



// // Temporary storage for OTP and user details (consider using a more persistent store)
// const otpStorage = new Map();

// router.post('/registerUserManual', async (req, res) => {
//   try {
//     const { name, email, password , uid} = req.body;

//     // Check if email already exists
//     const existingUserByEmail = await User.findOne({ email });
//     if (existingUserByEmail) {
//       return res.status(400).json({ message: 'The email is already registered!' });
//     }

//     // Generate a unique UID
//     //const uid = 'uid-' + Math.random().toString(36).substr(2, 16);

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Generate OTP
//     const otp = otpGenerator.generate(6, { digits: true });
//     const hashedOtp = await bcrypt.hash(otp, 10);

//     // Store OTP and user details temporarily
//     otpStorage.set(email, { uid, name, email, password: hashedPassword, hashedOtp });

//     // Send OTP via email
//     // Nodemailer transporter setup
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       }
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USERNAME,
//       to: email,
//       subject: 'Your OTP Code',
//       text: `Your OTP code is ${otp}`
//     };

//     console.log('otp is ', otp);

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending OTP email:', error);
//         return res.status(500).json({ message: 'Error sending OTP' });
//       }
//       res.status(200).json({ message: 'OTP sent to email' });
//     });
//   } catch (error) {
//     console.error('Error during manual user registration:', error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// });

// router.post('/verifyOTP', async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     // Retrieve stored OTP and user details
//     const userDetails = otpStorage.get(email);
//     if (!userDetails) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     // Compare OTP
//     const isMatch = await bcrypt.compare(otp, userDetails.hashedOtp);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     // Save the user to the database
//     const newUser = new User({
//       uid: userDetails.uid,
//       name: userDetails.name,
//       email: userDetails.email,
//       password: userDetails.password
//     });

//     await newUser.save();
//     otpStorage.delete(email); // Clean up stored OTP

//     res.status(200).json({ message: 'User registered successfully' });
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



//5.1
// require('dotenv').config();
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../client/src/models/Users');
// const nodemailer = require('nodemailer');
// const otpGenerator = require('otp-generator');


// // Send OTP via email
// // Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD,
//   }
// });


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



// // Temporary storage for OTP and user details (consider using a more persistent store)
// const otpStorage = new Map();

// router.post('/registerUserManual', async (req, res) => {
//   try {
//     const { name, email, password , uid} = req.body;

//     // Check if email already exists
//     const existingUserByEmail = await User.findOne({ email });
//     if (existingUserByEmail) {
//       return res.status(400).json({ message: 'The email is already registered!' });
//     }

//     // Generate a unique UID
//     //const uid = 'uid-' + Math.random().toString(36).substr(2, 16);

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Generate OTP
//     const otp = otpGenerator.generate(6, { digits: true });
//     const hashedOtp = await bcrypt.hash(otp, 10);

//     // Store OTP and user details temporarily
//     otpStorage.set(email, { uid, name, email, password: hashedPassword, hashedOtp });

//     //writing the mail 
//     const mailOptions = {
//       from: process.env.EMAIL_USERNAME,
//       to: email,
//       subject: 'Your OTP Code',
//       text: `Your OTP code is ${otp}`
//     };

//     console.log('otp is ', otp);

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending OTP email:', error);
//         return res.status(500).json({ message: 'Error sending OTP' });
//       }
//       res.status(200).json({ message: 'OTP sent to email' });
//     });
//   } catch (error) {
//     console.error('Error during manual user registration:', error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// });

// router.post('/verifyOTP', async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     // Retrieve stored OTP and user details
//     const userDetails = otpStorage.get(email);
//     if (!userDetails) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     // Compare OTP
//     const isMatch = await bcrypt.compare(otp, userDetails.hashedOtp);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     // Save the user to the database
//     const newUser = new User({
//       uid: userDetails.uid,
//       name: userDetails.name,
//       email: userDetails.email,
//       password: userDetails.password
//     });

//     await newUser.save();
//     otpStorage.delete(email); // Clean up stored OTP

//     res.status(200).json({ message: 'User registered successfully' });
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



// //-----------------reset password------------------------
// // POST route to send OTP for password reset
// router.post('/sendOtpForPasswordReset', async (req, res) => {
//   const { email } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate OTP and hash it
//     const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
//     const hashedOtp = await bcrypt.hash(otp, 10);

//     // Save hashed OTP to user object
//     user.otp = hashedOtp;
//     await user.save();

//     // Send OTP to user's email
//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: 'Your OTP for Password Reset',
//       text: `Your OTP for password reset is: ${otp}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Error sending OTP email:', error);
//         return res.status(500).json({ message: 'Error sending OTP email' });
//       }
//       console.log('OTP sent:', info.response);
//       res.status(200).json({ message: 'OTP sent to your email' });
//     });
//   } catch (error) {
//     console.error('Error in sending OTP:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // POST route to verify OTP and reset password
// router.post('/resetPassword', async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Verify OTP
//     const isMatch = await bcrypt.compare(otp, user.otp);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     // Hash new password and update user
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     user.otp = undefined; // Clear OTP after use
//     await user.save();

//     res.status(200).json({ message: 'Password reset successfully' });
//   } catch (error) {
//     console.error('Error in resetting password:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


// //--------------------end of reset password--------------


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


//5.2
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../client/src/models/Users');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');


// Send OTP via email
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  }
});


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

    //writing the mail 
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

//------forgot password----------------
// Request Password Reset (Send OTP)
router.post('/forgotPassword', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true });
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Store OTP temporarily (in practice, use a more persistent store like Redis)
    otpStorage.set(email, { hashedOtp, uid: user.uid });

    // Send OTP to the user's email
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Your OTP Code for Password Reset',
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
    console.error('Error during password reset request:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Verify OTP for Password Reset
router.post('/verifyForgotPasswordOTP', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Retrieve stored OTP and user details
    const otpDetails = otpStorage.get(email);
    if (!otpDetails) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Compare OTP
    const isMatch = await bcrypt.compare(otp, otpDetails.hashedOtp);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, now the user can reset the password
    res.status(200).json({ message: 'OTP verified, proceed to reset password', uid: otpDetails.uid });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// Reset Password
router.post('/resetPassword', async (req, res) => {
  const { uid, newPassword } = req.body;

  try {
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    await User.updateOne({ uid }, { password: hashedPassword });

    // Clear the stored OTP
    otpStorage.delete(uid);

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


//-------------end of forgot password----------------------

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