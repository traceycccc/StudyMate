// src/components/Home.js
// import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const Home = () => {
//   const { currentUser } = useContext(AuthContext);

//   return (
//     <div>
//       <h1>Welcome to StudyMate</h1>
//       {currentUser ? (
//         <p>You are logged in as: {currentUser.email}</p>
//       ) : (
//         <p>Loading user information...</p>
//       )}
//     </div>
//   );
// };

// export default Home;


// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { Link } from 'react-router-dom';
// import axios from 'axios'; // Make sure to install axios if you haven't already

// const Home = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [userProfile, setUserProfile] = useState(null);

//   const fetchUserProfile = async () => {
//     if (currentUser) {
//       try {
//         const response = await axios.get(`/api/users/${currentUser.uid}`);
//         setUserProfile(response.data);
//       } catch (error) {
//         console.error("Error fetching user profile", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <nav>
//         <Link to="/">Home</Link>
//         <button onClick={fetchUserProfile}>User Details</button>
//       </nav>
//       <h1>Welcome to StudyMate</h1>
//       {currentUser ? (
//         <div>
//           <p>You are logged in as: {currentUser.email}</p>
//           {userProfile && (
//             <div>
//               <h2>User Profile</h2>
//               <p>Name: {userProfile.name}</p>
//               <p>Email: {userProfile.email}</p>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>Loading user information...</p>
//       )}
//     </div>
//   );
// };

// export default Home;

// src/components/Home.js
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';

// const Home = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (currentUser) {
//         try {
//           console.log('Fetching user data for:', currentUser.email);
//           const response = await axios.get(`/api/users/${currentUser.email}`);
//           setUserData(response.data);
//         } catch (error) {
//           console.error('Error fetching user data', error);
//         }
//       }
//     };

//     fetchUserData();
//   }, [currentUser]);

//   return (
//     <div>
//       <h1>Welcome to StudyMate</h1>
//       {userData ? (
//         <div>
//           <p>Name: {userData.name}</p>
//           <p>Email: {userData.email}</p>
//         </div>
//       ) : (
//         <p>Loading user information...</p>
//       )}
//     </div>
//   );
// };

// export default Home;


// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';

// const Home = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (currentUser) {
//         try {
//           console.log('Fetching user data for UID:', currentUser.uid);
//           const response = await axios.get(`http://localhost:5000/api/users/uid/${currentUser.uid}`);
//           setUserData(response.data);
//         } catch (error) {
//           console.error('Error fetching user data', error);
//         }
//       }
//     };

//     fetchUserData();
//   }, [currentUser]);

//   return (
//     <div>
//       <h1>Welcome to StudyMate</h1>
//       {userData ? (
//         <div>
//           <p>Name: {userData.name}</p>
//           <p>Email: {userData.email}</p>
//         </div>
//       ) : (
//         <p>Loading user information...</p>
//       )}
//     </div>
//   );
// };

// export default Home;



//ver1.355
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (currentUser) {
//         try {
//           const response = await axios.get(`/api/users/${currentUser.email}`);
//           setUserData(response.data);
//         } catch (error) {
//           console.error('Error fetching user data', error);
//         }
//       }
//     };

//     fetchUserData();
//   }, [currentUser]);

//   const handleProfileClick = () => {
//     navigate('/profile');
//   };

//   return (
//     <div>
//       <nav>
//         <button onClick={handleProfileClick}>Profile</button>
//       </nav>
//       <h1>Welcome to StudyMate</h1>
//       {userData ? (
//         <div>
//           <p>Name: {userData.name}</p>
//           <p>Email: {userData.email}</p>
//         </div>
//       ) : (
//         <p>Loading user information...</p>
//       )}
//     </div>
//   );
// };

// export default Home;

//ver 1,4
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css'; // If you want to style your homepage

// const Home = () => {
//   console.log("home")
//   return (
//     <div>
//       <nav>
//         <ul>
//           <li>
//             <Link to="/profile">Profile</Link>
//           </li>
//         </ul>
//       </nav>
//       <div className="content">
//         <h1>Welcome</h1>
//       </div>
//     </div>
//   );
// };

// export default Home;


//9.6
// src/components/Home.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase auth

const Home = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
      setCurrentUser(null);
      console.log(currentUser);
      //localStorage.removeItem('authToken'); // Clear local token
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {currentUser && (
            <>
              <li> <Link to="/profile">Profile</Link></li>
              {/*<li> <Link to="/upload-component">Upload document</Link></li>*/}
              <li><Link to="/upload">Upload document</Link></li>

              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </nav>
      <h1>Welcome to the Home Page</h1>
      {/* Other content */}
    </div>
  );
};

export default Home;


