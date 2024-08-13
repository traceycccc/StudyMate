
//2.1
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

//       console.log('Sending user data to backend:', userData);
//       // Send user data to the backend for login
//       const response = await axios.post('http://localhost:5000/api/loginUserGoogle', userData);

//       if (response.status === 200) {
//         // Redirect to the homepage
//         navigate('/');
//       }
//     } catch (error) {
//       console.error("Error during login", error);
//       if (error.response && error.response.status === 404) {
//         alert('User not found! Please try again!');
//       }
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


//3.1
// import React, { useState } from 'react';
// import { auth, googleProvider, signInWithPopup } from '../firebase';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLoginWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const { user } = result;

//       const userData = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName
//       };

//       // Ensure the correct backend URL
//       const response = await axios.post('http://localhost:5000/api/loginUserGoogle', userData);

//       if (response.status === 200) {
//         // Login successful, redirect to home page
//         navigate('/');
//       } else {
//         alert('An error occurred during login. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during login:', error.response ? error.response.data : error.message);
//       alert('An error occurred during login. Please try again.');
//     }
//   };

//   const handleManualLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/loginUserManual', { email, password });

//       // Handle successful login (e.g., save token, redirect user)
//       console.log('Login response:', response.data);

//       if (response.status === 200) {
//         // Login successful, redirect to home page
//         console.log('Login successful. Redirecting to home page.');
//         navigate('/');
//       } else {
//         console.log('Login failed with status:', response.status);
//         alert('Invalid email or password. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during manual login:', error.response ? error.response.data : error.message);
//       alert('An error occurred during login. Please try again.');
//     }
//   };



//   return (
//     <div>
//       <h1>Login</h1>
//       <button onClick={handleLoginWithGoogle}>Login with Google</button>
//       <h2>Manual Login</h2>
//       <form onSubmit={handleManualLogin}>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <Link to="/forgot-password">Forgot Password?</Link> {/* Add this link */}
//       <p>
//          No account? <Link to="/register">Create one!</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;



//7.1
import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // const handleLoginWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const { user } = result;
  
  //     const userData = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName
  //     };
  
  //     const response = await axios.post('http://localhost:5000/api/loginUserGoogle', userData);
  
  //     if (response.status === 200) {
  //       console.log('Full response data:', response.data); // Log the full response data
        
  //       const isLinked = response.data.isLinked;
  //       console.log('isLinked:', isLinked);
  
  //       if (isLinked) {
  //         navigate('/');
  //       } else {
  //         alert(response.data.message);
  //         navigate('/link-account', { state: { email: user.email, uid: user.uid } });
  //       }
  //     } else {
  //       alert('An error occurred during login. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error.response ? error.response.data : error.message);
  //     alert('An error occurred during login. Please try again.');
  //   }
  // };

  // const handleLoginWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const { user } = result;
  
  //     const userData = {
  //       uid: user.uid,
  //       email: user.email,
  //       displayName: user.displayName
  //     };
  
  //     const response = await axios.post('http://localhost:5000/api/loginUserGoogle', userData);
  //     console.log('Full response data:', response.data); // Log the full response data
  
  //     const isLinked = response.data.isLinked;
  //     console.log('isLinked:', isLinked);
  
  //     if (isLinked) {
  //       navigate('/');
  //     } else {
  //       alert(response.data.message);
  //       navigate('/link-account', { state: { email: user.email, uid: user.uid } });
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error.response ? error.response.data : error.message);
  //     alert('An error occurred during login. Please try again.');
  //   }
  // };

  const handleLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
  
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      };
  
      const response = await axios.post('http://localhost:5000/api/loginUserGoogle', userData);
  
      if (response.status === 200) {
        console.log('Full response data:', response.data); // Log the full response data
        
        const { isLinked, hasPassword } = response.data;
        console.log('isLinked:', isLinked);
        console.log('hasPassword:', hasPassword);
  
        if (isLinked) {
          // User's account is linked, redirect to home page
          navigate('/');
        } else if (!hasPassword) {
          // User is registered with Google, no need to link, redirect to home page
          navigate('/');
        } else {
          // User has a manual account and is not linked, redirect to link account page
          alert(response.data.message);
          navigate('/link-account', { state: { email: user.email, uid: user.uid } });
        }
      } else {
        alert('An error occurred during login. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
      alert('An error occurred during login. Please try again.');
    }
  };
  
  
  
  

  const handleManualLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/loginUserManual', { email, password });

      // Handle successful login (e.g., save token, redirect user)
      console.log('Login response:', response.data);

      if (response.status === 200) {
        // Login successful, redirect to home page
        console.log('Login successful. Redirecting to home page.');
        navigate('/');
      } else {
        console.log('Login failed with status:', response.status);
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during manual login:', error.response ? error.response.data : error.message);
      alert('An error occurred during login. Please try again.');
    }
  };



  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLoginWithGoogle}>Login with Google</button>
      <h2>Manual Login</h2>
      <form onSubmit={handleManualLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/forgot-password">Forgot Password?</Link> {/* Add this link */}
      <p>
         No account? <Link to="/register">Create one!</Link>
      </p>
    </div>
  );
};

export default Login;





