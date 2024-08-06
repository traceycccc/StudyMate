// // src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import { auth } from '../firebase';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     auth.onAuthStateChanged(user => {
//       setCurrentUser(user);
//     });
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import { auth } from '../firebase';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setCurrentUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import { auth } from '../firebase';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         // Check if the user exists in the database
//         try {
//           const response = await axios.post('/api/users', {
//             uid: user.uid,
//             name: user.displayName,
//             email: user.email,
//           });
//           setCurrentUser(response.data);
//         } catch (error) {
//           console.error('Error checking/creating user:', error);
//         }
//       } else {
//         setCurrentUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import React, { createContext, useState, useEffect } from 'react';
// import { auth } from '../firebase';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         // Check if the user exists in the database
//         try {
//           const response = await axios.post('http://localhost:5000/api/saveUser', {
//             uid: user.uid,
//             name: user.displayName,
//             email: user.email,
//           });
//           setCurrentUser(response.data);
//         } catch (error) {
//           console.error('Error checking/creating user:', error);
//         }
//       } else {
//         setCurrentUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


//ver 1.35
// import React, { createContext, useState, useEffect } from 'react';
// import { auth } from '../firebase';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         // Check if the user exists in the database
//         try {
//           const response = await axios.post('http://localhost:5000/api/saveUser', {
//             uid: user.uid,
//             name: user.displayName,
//             email: user.email,
//           });
//           setCurrentUser(response.data);
//         } catch (error) {
//           console.error('Error checking/creating user:', error);
//         }
//       } else {
//         setCurrentUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


//2.1
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};



