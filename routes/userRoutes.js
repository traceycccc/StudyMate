


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
    //let user = await User.findOne({ uid });  //5.2 uid
    //let user = await User.findOne({ uid, email }); //6.1 adding email parameter to prevent linking google account and manuals
    let user = await User.findOne({ email }); //6.2 check using email instead
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




//7.4
// Login a user with Google
router.post('/loginUserGoogle', async (req, res) => {
  const { uid } = req.body;

  try {
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found! Please try again!' });
    }

    // Ensure no manipulation of user.isLinked here
    console.log('Backend isLinked:', user.isLinked);

    res.status(200).json({ isLinked: user.isLinked, message: 'Login successful', redirect: null });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});




//7.1
// Link a manually registered account with a Google account
router.post('/linkAccount', async (req, res) => {
  const { email, password, uid } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Update the user to link their account with Google
    user.uid = uid;
    user.isLinked = true;

    await user.save();

    res.status(200).json({ message: 'Account linked successfully' });
  } catch (error) {
    console.error('Error linking account:', error);
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


    res.status(200).json({ message: 'Login successful', user: user });
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
router.get('/:id', async (req, res) => {
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