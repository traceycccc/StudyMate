// // src/components/Login.js
// import React from 'react';
// import { auth, googleProvider } from '../firebase';

// const Login = () => {
//   const handleGoogleSignIn = async () => {
//     try {
//       await auth.signInWithPopup(googleProvider);
//       alert('Signed in successfully');
//     } catch (error) {
//       console.error('Error during sign-in:', error);
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleGoogleSignIn}>Sign in with Google</button>
//     </div>
//   );
// };

// export default Login;


// src/components/Login.js
// import React from 'react';
// import { auth, googleProvider } from '../firebase';

// const Login = () => {
//   const handleLogin = async () => {
//     try {
//       await auth.signInWithPopup(googleProvider);
//     } catch (error) {
//       console.error("Error during login", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login to StudyMate</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;


// import React from 'react';
// import { auth, googleProvider, signInWithPopup } from '../firebase';

// const Login = () => {
//   const handleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (error) {
//       console.error("Error during login", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login to StudyMate</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;

// import React from 'react';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       navigate('/'); // Redirect to homepage after login
//     } catch (error) {
//       console.error("Error during login", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login to StudyMate</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;

// Login.js
// import React from 'react';
// import axios from 'axios';  // Import axios
// import { auth, googleProvider, signInWithPopup } from '../firebase';

// const Login = () => {
//   const handleLogin = async () => {
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
//       await axios.post('http://localhost:5000/api/saveUser', userData);

//       // Redirect or update state as needed
//     } catch (error) {
//       console.error("Error during login", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login to StudyMate</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;


// import React from 'react';
// import { auth, googleProvider, signInWithPopup } from '../firebase';

// const Login = () => {
//   const handleLogin = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//     } catch (error) {
//       console.error("Error during login", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login to StudyMate</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;



// import React from 'react';
// import axios from 'axios';  // Import axios
// import { auth, googleProvider, signInWithPopup } from '../firebase';

// const Login = () => {
//   const handleLogin = async () => {
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
//       await axios.post('http://localhost:5000/api/saveUser', userData);

//       // Redirect or update state as needed
//       // For example, redirect to the homepage
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Error during login", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login to StudyMate</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;


// import React from 'react';
// import axios from 'axios';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

// const Login = () => {
//   const navigate = useNavigate();  // Initialize useNavigate

//   const handleLogin = async () => {
//     try {
//       console.log('Attempting Google Sign-In...');
//       const result = await signInWithPopup(auth, googleProvider);
//       const { user } = result;

//       // Prepare user data to send to the backend
//       const userData = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName
//       };

//       // Send user data to the backend
//       console.log('Sending user data to backend:', userData);
//       await axios.post('http://localhost:5000/api/saveUser', userData);

//       // Redirect to the homepage
//       console.log('User authenticated, navigating to homepage...');
//       navigate('/');
//       console.log('redirecting to homepage2 ');
//     } catch (error) {
//       console.error("Error during login", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login to StudyMate</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//     </div>
//   );
// };

// export default Login;


//ver 1.35
// import React from 'react';
// import axios from 'axios';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();

//   const handleLogin = async () => {
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
//       await axios.post('http://localhost:5000/api/saveUser', userData);

//       // Redirect to the homepage
//       navigate('/');
//     } catch (error) {
//       console.error("Error during login", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Login to StudyMate</h1>
//       <button onClick={handleLogin}>Login with Google</button>
//       <p>
//         No account? <Link to="/register">Create one!</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;


//2.1
import React from 'react';
import axios from 'axios';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      // Prepare user data to send to the backend
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      };

      console.log('Sending user data to backend:', userData);
      // Send user data to the backend for login
      const response = await axios.post('http://localhost:5000/api/loginUserGoogle', userData);

      if (response.status === 200) {
        // Redirect to the homepage
        navigate('/');
      }
    } catch (error) {
      console.error("Error during login", error);
      if (error.response && error.response.status === 404) {
        alert('User not found! Please try again!');
      }
    }
  };

  return (
    <div>
      <h1>Login to StudyMate</h1>
      <button onClick={handleLogin}>Login with Google</button>
      <p>
        No account? <Link to="/register">Create one!</Link>
      </p>
    </div>
  );
};

export default Login;



