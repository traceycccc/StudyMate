
//2.1
// import React, { useState } from 'react';
// import axios from 'axios';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const navigate = useNavigate();

//   const handleRegisterWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const { user } = result;

//       const userData = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName
//       };

//       await axios.post('http://localhost:5000/api/registerWithGoogle', userData);
//       navigate('/');
//     } catch (error) {
//       console.error("Error during registration", error);
//     }
//   };

//   const handleRegisterWithEmail = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       // Send registration data to backend
//       const response = await axios.post('http://localhost:5000/api/register', { name, email, password });
//       if (response.status === 200) {
//         setIsOtpSent(true);
//       }
//     } catch (error) {
//       console.error("Error during registration", error);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/verifyOtp', { email, otp });
//       if (response.status === 200) {
//         navigate('/');
//       }
//     } catch (error) {
//       console.error("Error during OTP verification", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Register for StudyMate</h1>
//       <button onClick={handleRegisterWithGoogle}>Register with Google</button>
//       <form onSubmit={handleRegisterWithEmail}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//           required
//         />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="Confirm Password"
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       {isOtpSent && (
//         <form onSubmit={handleVerifyOtp}>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//             required
//           />
//           <button type="submit">Verify OTP</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Register;



//2.2
// import React, { useState } from 'react';
// import axios from 'axios';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const navigate = useNavigate();

//   const handleRegisterWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const { user } = result;

//       const userData = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName,
//       };

//       await axios.post('http://localhost:5000/api/users/registerWithGoogle', userData);
//       navigate('/');
//     } catch (error) {
//       console.error('Error during registration', error);
//     }
//   };

//   const handleRegisterWithEmail = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
//       if (response.status === 200) {
//         setIsOtpSent(true);
//       }
//     } catch (error) {
//       console.error('Error during registration', error);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/verifyOtp', { email, otp });
//       if (response.status === 200) {
//         navigate('/');
//       }
//     } catch (error) {
//       console.error('Error during OTP verification', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Register for StudyMate</h1>
//       <button onClick={handleRegisterWithGoogle}>Register with Google</button>
//       <form onSubmit={handleRegisterWithEmail}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//           required
//         />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="Confirm Password"
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       {isOtpSent && (
//         <form onSubmit={handleVerifyOtp}>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//             required
//           />
//           <button type="submit">Verify OTP</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Register;

//2.21
// Register.js
// Register.js
// import React from 'react';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();

//   const handleRegisterWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const { user } = result;

//       // Prepare user data to send to the backend
//       const userData = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName
//       };

//       // Send user data to the backend
//       const response = await axios.post('http://localhost:5000/api/registerUserGoogle', userData);

//       // Check for errors from the backend
//       if (response.status === 400) {
//         alert('The Google Account is already registered! Please try again!');
//       } else {
//         // Registration successful, redirect to login page
//         navigate('/login');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <button onClick={handleRegisterWithGoogle}>Register with Google</button>
//     </div>
//   );
// };

// export default Register;


//2.22
// Register.js
// import React from 'react';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();

//   const handleRegisterWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const { user } = result;

//       // Prepare user data to send to the backend
//       const userData = {
//         uid: user.uid, // Use uid
//         email: user.email,
//         displayName: user.displayName
//       };

//       // Send user data to the backend
//       const response = await axios.post('http://localhost:5000/api/registerUserGoogle', userData);

//       // Check for errors from the backend
//       if (response.status === 400) {
//         alert('The Google Account is already registered! Please try again!');
//       } else {
//         // Registration successful, redirect to login page
//         navigate('/login');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <button onClick={handleRegisterWithGoogle}>Register with Google</button>
//     </div>
//   );
// };

// export default Register;



//2.23
// Register.js
// import React from 'react';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();

//   const handleRegisterWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const { user } = result;

//       const userData = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName
//       };

//       // Send user data to the backend
//       const response = await axios.post('http://localhost:5000/api/registerUserGoogle', userData);

//       if (response.status === 400) {
//         alert('The Google Account is already registered! Please try again!');
//       } else {
//         // Registration successful, redirect to login page
//         navigate('/login');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error.response ? error.response.data : error.message);
//       alert('An error occurred during registration. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <button onClick={handleRegisterWithGoogle}>Register with Google</button>
//     </div>
//   );
// };

// export default Register;


//3.1
// Register.js
// Register.js
// import React from 'react';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();

//   const handleRegisterWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const { user } = result;

//       const userData = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName
//       };

//       console.log('User Data:', userData); // Log the user data

//       // Ensure the correct backend URL
//       const response = await axios.post('http://localhost:5000/api/registerUserGoogle', userData);

//       if (response.status === 200) {
//         // Registration successful, redirect to login page
//         navigate('/login');
//       } else if (response.status === 400) {
//         alert('The Google Account is already registered! Please try again!');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error.response ? error.response.data : error.message);
//       alert('An error occurred during registration. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <button onClick={handleRegisterWithGoogle}>Register with Google</button>
//     </div>
//   );
// };

// export default Register;

//3.1
// import React from 'react';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();

//   const handleRegisterWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const { user } = result;

//       const userData = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName
//       };

//       console.log('User Data:', userData); // Log the user data

//       // Ensure the correct backend URL
//       const response = await axios.post('http://localhost:5000/api/registerUserGoogle', userData);

//       if (response.status === 200) {
//         // Registration successful, redirect to login page
//         navigate('/login');
//       } else if (response.status === 400) {
//         alert('The Google Account is already registered! Please try again!');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error.response ? error.response.data : error.message);
//       alert('An error occurred during registration. Please try again.');
//     }
//   };

//   const handleHardcodedRegister = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/testRegister');
  
//       if (response.status === 200) {
//         alert('Hardcoded user registered successfully!');
//       } else if (response.status === 400) {
//         alert('The Google Account is already registered!');
//       }
//     } catch (error) {
//       console.error('Error during hardcoded registration:', error.response ? error.response.data : error.message);
//       alert('An error occurred during registration. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <button onClick={handleRegisterWithGoogle}>Register with Google</button>
//       <button onClick={handleHardcodedRegister}>Register with Hardcoded Data</button>
//     </div>
//   );
// };

// export default Register;


//3.2
// import React, { useState } from 'react';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();

//   const [manualUser, setManualUser] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setManualUser({ ...manualUser, [name]: value });
//   };

//   const handleRegisterWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const { user } = result;

//       const userData = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName
//       };

//       console.log('User Data:', userData);

//       const response = await axios.post('http://localhost:5000/api/registerUserGoogle', userData);

//       if (response.status === 200) {
//         navigate('/login');
//       } else if (response.status === 400) {
//         alert('The Google Account is already registered! Please try again!');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error.response ? error.response.data : error.message);
//       alert('An error occurred during registration. Please try again.');
//     }
//   };

//   const handleManualRegister = async (e) => {
//     e.preventDefault();

//     if (manualUser.password !== manualUser.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     const userData = {
//       name: manualUser.name,
//       email: manualUser.email,
//       password: manualUser.password,
//       uid: generateUID() // Function to generate a unique UID
//     };

//     try {
//       const response = await axios.post('http://localhost:5000/api/registerUserManual', userData);

//       if (response.status === 200) {
//         navigate('/login');
//       } else if (response.status === 400) {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error during manual registration:', error.response ? error.response.data : error.message);
//       alert('An error occurred during registration. Please try again.');
//     }
//   };

//   // Function to generate a unique UID
//   const generateUID = () => {
//     return 'uid-' + Math.random().toString(36).substr(2, 16);
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <button onClick={handleRegisterWithGoogle}>Register with Google</button>
//       <p> OR </p>
//       <form onSubmit={handleManualRegister}>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={manualUser.name} onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={manualUser.email} onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" name="password" value={manualUser.password} onChange={handleInputChange} required />
//         </div>
//         <div>
//           <label>Confirm Password:</label>
//           <input type="password" name="confirmPassword" value={manualUser.confirmPassword} onChange={handleInputChange} required />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;


//3.3
import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [manualUser, setManualUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualUser({ ...manualUser, [name]: value });
  };

  const handleRegisterWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      };

      console.log('User Data:', userData);

      const response = await axios.post('http://localhost:5000/api/registerUserGoogle', userData);

      if (response.status === 200) {
        navigate('/login');
      } else if (response.status === 400) {
        alert('The Google Account is already registered! Please try again!');
      }
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
      alert('An error occurred during registration. Please try again.');
    }
  };

  const handleManualRegister = async (e) => {
    e.preventDefault();

    if (manualUser.password !== manualUser.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const userData = {
      name: manualUser.name,
      email: manualUser.email,
      password: manualUser.password,
      uid: generateUID() // Function to generate a unique UID
    };

    try {
      const response = await axios.post('http://localhost:5000/api/registerUserManual', userData);

      if (response.status === 200) {
        navigate('/login');
      } else if (response.status === 400) {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during manual registration:', error.response ? error.response.data : error.message);
      alert('An error occurred during registration. Please try again.');
    }
  };

  // Function to generate a unique UID
  const generateUID = () => {
    return 'uid-' + Math.random().toString(36).substr(2, 16);
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={handleRegisterWithGoogle}>Register with Google</button>
      <form onSubmit={handleManualRegister}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={manualUser.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={manualUser.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={manualUser.password} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={manualUser.confirmPassword} onChange={handleInputChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;










