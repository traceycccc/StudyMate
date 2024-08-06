


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










