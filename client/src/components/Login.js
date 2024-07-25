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

import React from 'react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Redirect to homepage after login
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  return (
    <div>
      <h1>Login to StudyMate</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;

