// import React from 'react';
// //import Register from './components/Register';
// import Login from './components/Login';

// const App = () => {
//   return (
//     <div>
//       <h1>StudyMate</h1>
//       <Login />
//     </div>
//   );
// };

// export default App;


// import React, { useEffect, useState } from 'react';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// //import Register from './Register';
// import Login from './Login';
// import { doc, getDoc } from 'firebase/firestore';

// const App = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       const fetchUserData = async () => {
//         const userDoc = await getDoc(doc(db, 'users', user.uid));
//         if (userDoc.exists()) {
//           console.log('User data:', userDoc.data());
//           // You can set this data to the component's state
//         } else {
//           console.log('No such document!');
//         }
//       };
//       fetchUserData();
//     }
//   }, [user]);


//   const handleLogout = () => {
//     signOut(auth).then(() => {
//       console.log('User logged out');
//     }).catch((error) => {
//       console.error('Error logging out:', error);
//     });
//   };

//   return (
//     <div>
//       <h1>StudyMate</h1>
//       {user ? (
//         <div>
//           <h2>Welcome back, {user.email}!</h2>
//           {/* Add functionality for logging out */}
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//           <Login />
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; //BrowserRouter: Provides the routing context.
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';

// const App = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected Route */}
//         <Route
//           path="/dashboard"
//           element={user ? <Dashboard /> : <Navigate to="/login" />}
//         />

//         {/* Redirect to dashboard if logged in, or register if not */}
//         <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // State for loading status

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false); // Stop loading once we know the user's state
//     });

//     // Clean up the listener on unmount
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading indicator until the user state is known
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

//         {/* Protected Route */}
//         <Route
//           path="/dashboard"
//           element={user ? <Dashboard /> : <Navigate to="/login" />}
//         />

//         {/* Default Route */}
//         <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth, onAuthStateChanged, signOut } from './firebase';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Add a loading state
//   const [registrationRejected, setRegistrationRejected] = useState(false); // New state to track registration rejection

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser && registrationRejected) {
//         // If registration was rejected, sign out the user immediately
//         signOut(auth).then(() => {
//           console.log('User signed out due to registration rejection');
//           setUser(null); // Ensure no user is logged in
//         });
//       } else {
//         setUser(currentUser); // Set the user if fully authenticated
//       }
//       setLoading(false); // Stop loading once the user state is known
//     });

//     return () => unsubscribe();
//   }, [registrationRejected]); // Track the registration rejection

//   if (loading) {
//     return <div>Loading...</div>; // Show loading indicator while we determine the user's state
//   }

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register setRegistrationRejected={setRegistrationRejected} />} />
//         <Route path="/dashboard" element={user && !registrationRejected ? <Dashboard /> : <Navigate to="/login" />} />
//         <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // State for loading status

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false); // Stop loading once we know the user's state
//     });

//     // Clean up the listener on unmount
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading indicator until the user state is known
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

//         {/* Protected Route */}
//         <Route
//           path="/dashboard"
//           element={user ? <Dashboard /> : <Navigate to="/login" />}
//         />

//         {/* Default Route */}
//         <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;




// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [emailVerified, setEmailVerified] = useState(false); // State to check email verification

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false); // Stop loading once we know the user's state

//       // Check if the user's email is verified
//       if (currentUser && currentUser.emailVerified) {
//         setEmailVerified(true);
//       } else {
//         setEmailVerified(false);
//       }
//     });

//     // Clean up the listener on unmount
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading indicator until the user state is known
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

//         {/* Protected Route */}
//         <Route
//           path="/dashboard"
//           element={
//             user && emailVerified ? (
//               <Dashboard />
//             ) : user && !emailVerified ? (
//               <div>
//                 <h2>Please verify your email before accessing the dashboard.</h2>
//                 <p>Check your email and click the verification link to proceed.</p>
//                 <button onClick={() => auth.currentUser.sendEmailVerification()}>Resend Verification Email</button>
//                 <button onClick={() => auth.signOut()}>Log Out</button>
//               </div>
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         {/* Default Route */}
//         <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [emailVerified, setEmailVerified] = useState(false); // State to check email verification
//   const [verificationCheck, setVerificationCheck] = useState(false); // Flag to track verification check

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       setLoading(false); // Stop loading once we know the user's state

//       // Check if the user's email is verified
//       if (currentUser) {
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//         } else {
//           setEmailVerified(false);
//           // Automatically refresh user state after they verify the email
//           try {
//             await currentUser.reload(); // Refresh the user to check email verification status
//             if (currentUser.emailVerified) {
//               setEmailVerified(true); // If verified after reload, update the state
//             }
//           } catch (error) {
//             console.error('Error refreshing user:', error);
//           }
//         }
//       }
//     });

//     // Clean up the listener on unmount
//     return () => unsubscribe();
//   }, [verificationCheck]);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading indicator until the user state is known
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

//         {/* Protected Route */}
//         <Route
//           path="/dashboard"
//           element={
//             user && emailVerified ? (
//               <Dashboard />
//             ) : user && !emailVerified ? (
//               <div>
//                 <h2>Please verify your email before accessing the dashboard.</h2>
//                 <p>Check your email and click the verification link to proceed.</p>
//                 <button onClick={() => auth.currentUser.sendEmailVerification()}>Resend Verification Email</button>
//                 <button onClick={() => auth.signOut()}>Log Out</button>
//               </div>
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         {/* Default Route */}
//         <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading status
  const [emailVerified, setEmailVerified] = useState(false); // State to check email verification
  const [polling, setPolling] = useState(false); // State to manage polling for email verification

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once we know the user's state

      if (currentUser) {
        if (currentUser.emailVerified) {
          setEmailVerified(true);
        } else {
          setEmailVerified(false);
          startPollingVerification(currentUser); // Start polling for email verification
        }
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const startPollingVerification = (currentUser) => {
    if (!polling) {
      setPolling(true);
      const interval = setInterval(async () => {
        await currentUser.reload(); // Reload the user to update the emailVerified status
        if (currentUser.emailVerified) {
          setEmailVerified(true); // If verified, update the state
          clearInterval(interval); // Stop polling once verified
          setPolling(false); // Reset polling state
        }
      }, 3000); // Check every 3 seconds
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator until the user state is known
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            user && emailVerified ? (
              <Dashboard />
            ) : user && !emailVerified ? (
              <div>
                <h2>Please verify your email before accessing the dashboard.</h2>
                <p>Check your email and click the verification link to proceed.</p>
                <button onClick={() => auth.currentUser.sendEmailVerification()}>Resend Verification Email</button>
                <button onClick={() => auth.signOut()}>Log Out</button>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default Route */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;









