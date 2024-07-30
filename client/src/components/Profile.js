
//ver1.35
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';

// const Profile = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [userData, setUserData] = useState(null);

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

//   return (
//     <div>
//       <h1>Profile</h1>
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

// export default Profile;


// //ver1.4
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';

// const Profile = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [userData, setUserData] = useState(null);

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

//   if (!currentUser) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <h1>Profile</h1>
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

// export default Profile;


//1.45
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          // Fetch user data using UID
          console.log('Fetching user data for UID:', currentUser.uid);
          //const response = await axios.get(`/api/users/${currentUser.uid}`);
          const response = await axios.get(`http://localhost:5000/api/users/${currentUser.uid}`);
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data', error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Profile;



