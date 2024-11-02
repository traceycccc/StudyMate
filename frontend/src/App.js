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



// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './screens/Register';
// import Login from './screens/Login';
// import ForgotPassword from './screens/ForgotPassword';
// import Dashboard from './screens/Dashboard';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [emailVerified, setEmailVerified] = useState(false); // State to check email verification
//   const [polling, setPolling] = useState(false); // State to manage polling for email verification

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false); // Stop loading once we know the user's state

//       if (currentUser) {
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//         } else {
//           setEmailVerified(false);
//           startPollingVerification(currentUser); // Start polling for email verification
//         }
//       }
//     });

//     // Clean up the listener on unmount
//     return () => unsubscribe();
//   }, []);

//   const startPollingVerification = (currentUser) => {
//     if (!polling) {
//       setPolling(true);
//       const interval = setInterval(async () => {
//         await currentUser.reload(); // Reload the user to update the emailVerified status
//         if (currentUser.emailVerified) {
//           setEmailVerified(true); // If verified, update the state
//           clearInterval(interval); // Stop polling once verified
//           setPolling(false); // Reset polling state
//         }
//       }, 3000); // Check every 3 seconds
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading indicator until the user state is known
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

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





// ////fixed the startPollingVerificaton
// import React, { useCallback, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './screens/Register';
// import Login from './screens/Login';
// import ForgotPassword from './screens/ForgotPassword';
// import Dashboard from './screens/Dashboard';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [emailVerified, setEmailVerified] = useState(false); // State to check email verification
//   const [polling, setPolling] = useState(false); // State to manage polling for email verification

//   // Memoized startPollingVerification function
//   const startPollingVerification = useCallback((currentUser) => {
//     if (!polling) {
//       setPolling(true);
//       const interval = setInterval(async () => {
//         await currentUser.reload(); // Reload the user to update emailVerified status
//         if (currentUser.emailVerified) {
//           setEmailVerified(true); // Update the state
//           clearInterval(interval); // Stop polling
//           setPolling(false); // Reset polling state
//         }
//       }, 3000); // Poll every 3 seconds
//     }
//   }, [polling]); // Dependency array for polling

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);

//       if (currentUser) {
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//         } else {
//           setEmailVerified(false);
//           startPollingVerification(currentUser); // Call the memoized function
//         }
//       }
//     });

//     return () => unsubscribe(); // Cleanup on unmount
//   }, [startPollingVerification]); // Add startPollingVerification as a dependency

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading indicator until the user state is known
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//         <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

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


// // after adding mantine (fail)
// import React, { useCallback, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './screens/Register';
// import Login from './screens/Login';
// import ForgotPassword from './screens/ForgotPassword';
// import Dashboard from './screens/Dashboard';

// // Mantine imports
// import { MantineProvider, Loader, Container, Button, Text, Title } from '@mantine/core';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [polling, setPolling] = useState(false);

//   // Memoized startPollingVerification function
//   const startPollingVerification = useCallback((currentUser) => {
//     if (!polling) {
//       setPolling(true);
//       const interval = setInterval(async () => {
//         await currentUser.reload();
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//           clearInterval(interval);
//           setPolling(false);
//         }
//       }, 3000);
//     }
//   }, [polling]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);

//       if (currentUser) {
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//         } else {
//           setEmailVerified(false);
//           startPollingVerification(currentUser);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [startPollingVerification]);

//   if (loading) {
//     return (
//       <Container mt={50}>
//         <Loader size="lg" variant="bars" />
//         <Text align="center" mt="md">Loading...</Text>
//       </Container>
//     );
//   }

//   return (
//     <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles withNormalizeCSS>
//       <Router>
//         <Routes>
//           <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//           <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           <Route
//             path="/dashboard"
//             element={
//               user && emailVerified ? (
//                 <Dashboard />
//               ) : user && !emailVerified ? (
//                 <Container mt={50} align="center">
//                   <Title order={2}>Please verify your email before accessing the dashboard.</Title>
//                   <Text mt="sm">
//                     Check your email and click the verification link to proceed.
//                   </Text>
//                   <Button
//                     mt="md"
//                     color="blue"
//                     onClick={() => auth.currentUser.sendEmailVerification()}
//                   >
//                     Resend Verification Email
//                   </Button>
//                   <Button mt="sm" color="red" onClick={() => auth.signOut()}>
//                     Log Out
//                   </Button>
//                 </Container>
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </MantineProvider>
//   );
// };

// export default App;








//test
// import React from 'react';
// import { MantineProvider, Button, Text } from '@mantine/core';

// const App = () => {
//   return (
//     <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles withNormalizeCSS>
//       <div style={{ padding: '20px' }}>
//         <Text>This is a test.</Text>
//         <Button>Test Button</Button>
//       </div>
//     </MantineProvider>
//   );
// };

// export default App;


// import React, { useCallback, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './screens/Register';
// import Login from './screens/Login';
// import ForgotPassword from './screens/ForgotPassword';
// import Dashboard from './screens/Dashboard';
// import { MantineProvider, createTheme } from '@mantine/core';  // Added Mantine imports
// import PageA from './screens/PageA'; // Add PageA
// import Modules from './screens/Modules'; 
// import ModuleOverview from './screens/ModuleOverview'; 

// const theme = createTheme({
//   // Customize your Mantine theme here if needed
// });

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [polling, setPolling] = useState(false);

//   const startPollingVerification = useCallback((currentUser) => {
//     if (!polling) {
//       setPolling(true);
//       const interval = setInterval(async () => {
//         await currentUser.reload();
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//           clearInterval(interval);
//           setPolling(false);
//         }
//       }, 3000);
//     }
//   }, [polling]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);

//       if (currentUser) {
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//         } else {
//           setEmailVerified(false);
//           startPollingVerification(currentUser);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [startPollingVerification]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <MantineProvider theme={theme}>  {/* Wrap the app with MantineProvider */}
//       <Router>
//         <Routes>
//           <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//           <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/pageA" element={user && emailVerified ? <PageA /> : <Navigate to="/login" />} />
//           <Route path="/modules" element={user && emailVerified ? <Modules /> : <Navigate to="/login" />} />
//           <Route path="/module-overview" element={user && emailVerified ? <ModuleOverview /> : <Navigate to="/login" />} />

//           <Route
//             path="/dashboard"
//             element={
//               user && emailVerified ? (
//                 <Dashboard />
//               ) : user && !emailVerified ? (
//                 <div>
//                   <h2>Please verify your email before accessing the dashboard.</h2>
//                   <p>Check your email and click the verification link to proceed.</p>
//                   <button onClick={() => auth.currentUser.sendEmailVerification()}>Resend Verification Email</button>
//                   <button onClick={() => auth.signOut()}>Log Out</button>
//                 </div>
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </MantineProvider>  
//   );
// };

// export default App;






////acn work but cuz of the going back to Modules page from ModuleOverview page, there is no nav bar
// import React, { useCallback, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './screens/Register';
// import Login from './screens/Login';
// import ForgotPassword from './screens/ForgotPassword';
// import Dashboard from './screens/Dashboard';
// import { MantineProvider, createTheme } from '@mantine/core';  // Added Mantine imports
// import PageA from './screens/PageA'; // Add PageA
// import Modules from './screens/Modules'; 
// import ModuleOverview from './screens/ModuleOverview'; 

// const theme = createTheme({
//   // Customize your Mantine theme here if needed
// });

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [polling, setPolling] = useState(false);

//   const startPollingVerification = useCallback((currentUser) => {
//     if (!polling) {
//       setPolling(true);
//       const interval = setInterval(async () => {
//         await currentUser.reload();
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//           clearInterval(interval);
//           setPolling(false);
//         }
//       }, 3000);
//     }
//   }, [polling]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);

//       if (currentUser) {
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//         } else {
//           setEmailVerified(false);
//           startPollingVerification(currentUser);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [startPollingVerification]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <MantineProvider theme={theme}>  {/* Wrap the app with MantineProvider */}
//       <Router>
//         <Routes>
//           <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//           <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/pageA" element={user && emailVerified ? <PageA /> : <Navigate to="/login" />} />
//           <Route path="/modules" element={user && emailVerified ? <Modules /> : <Navigate to="/login" />} />
//           <Route path="/module-overview" element={user && emailVerified ? <ModuleOverview /> : <Navigate to="/login" />} />

//           <Route
//             path="/dashboard"
//             element={
//               user && emailVerified ? (
//                 <Dashboard />
//               ) : user && !emailVerified ? (
//                 <div>
//                   <h2>Please verify your email before accessing the dashboard.</h2>
//                   <p>Check your email and click the verification link to proceed.</p>
//                   <button onClick={() => auth.currentUser.sendEmailVerification()}>Resend Verification Email</button>
//                   <button onClick={() => auth.signOut()}>Log Out</button>
//                 </div>
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </MantineProvider>  
//   );
// };

// export default App;



// import React, { useCallback, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './screens/Register';
// import Login from './screens/Login';
// import ForgotPassword from './screens/ForgotPassword';
// import AppLayout from './components/AppLayout'; // New Layout Component
// import { MantineProvider, createTheme } from '@mantine/core';

// const theme = createTheme({
//   // Customize your Mantine theme here if needed
// });

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [polling, setPolling] = useState(false);

//   const startPollingVerification = useCallback((currentUser) => {
//     if (!polling) {
//       setPolling(true);
//       const interval = setInterval(async () => {
//         await currentUser.reload();
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//           clearInterval(interval);
//           setPolling(false);
//         }
//       }, 3000);
//     }
//   }, [polling]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);

//       if (currentUser) {
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//         } else {
//           setEmailVerified(false);
//           startPollingVerification(currentUser);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [startPollingVerification]);


  

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <MantineProvider theme={theme}>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
//           <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* Protected Routes */}
//           {user && (
//             <>
//               <Route
//                 path="/*"
//                 element={
//                   emailVerified ? (
//                     <AppLayout /> 
//                   ) : (
//               <div>
//                 <h2>Please verify your email before accessing the app.</h2>
//                 <p>Check your email and click the verification link to proceed.</p>
//                 <button onClick={() => auth.currentUser.sendEmailVerification()}>
//                   Resend Verification Email
//                 </button>
//                 <button onClick={() => auth.signOut()}>Log Out</button>
//               </div>
//               )
//                 }
//               />
//             </>
//           )}

//           {/* Redirect to login or home based on the user's status */}
//           <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </MantineProvider>
//   );
// };

// export default App;



// //fixing log out issue
// import React, { useCallback, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged, signOut } from 'firebase/auth';
// import Register from './screens/Register';
// import Login from './screens/Login';
// import ForgotPassword from './screens/ForgotPassword';
// import AppLayout from './components/AppLayout'; // New Layout Component
// import { MantineProvider, createTheme } from '@mantine/core';

// const theme = createTheme({
//   // Customize your Mantine theme here if needed
// });

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [polling, setPolling] = useState(false);

//   const startPollingVerification = useCallback((currentUser) => {
//     if (!polling) {
//       setPolling(true);
//       const interval = setInterval(async () => {
//         await currentUser.reload();
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//           clearInterval(interval);
//           setPolling(false);
//         }
//       }, 3000);
//     }
//   }, [polling]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);

//       if (currentUser) {
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//         } else {
//           setEmailVerified(false);
//           startPollingVerification(currentUser);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [startPollingVerification]);

//   // Logout function
//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         setUser(null);  // Set user state to null after signing out
//         console.log('User signed out');
//       })
//       .catch((error) => {
//         console.error('Error signing out:', error);
//       });
//   };




//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <MantineProvider theme={theme}>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
//           <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* Protected Routes */}
//           {user && (
//             <>
//               <Route
//                 path="/*"
//                 element={
//                   emailVerified ? (
//                     <AppLayout onLogout={handleLogout} />
//                   ) : (
//                     <div>
//                       <h2>Please verify your email before accessing the app.</h2>
//                       <p>Check your email and click the verification link to proceed.</p>
//                       <button onClick={() => auth.currentUser.sendEmailVerification()}>
//                         Resend Verification Email
//                       </button>
//                         <button onClick={handleLogout}>Log Out</button>
//                     </div>
//                   )
//                 }
//               />
//             </>
//           )}

//           {/* Redirect to login or home based on the user's status */}
//           <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </MantineProvider>
//   );
// };

// export default App;




//fixing log out issue
//part 2
//fixed
// import React, { useCallback, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './screens/Register';
// import Login from './screens/Login';
// import ForgotPassword from './screens/ForgotPassword';
// import AppLayout from './components/AppLayout'; // New Layout Component
// import { MantineProvider, createTheme } from '@mantine/core';

// const lightTheme = createTheme({
//   // Customize your Mantine theme here if needed
//   colorScheme: 'light',
// });

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [polling, setPolling] = useState(false);

//   const startPollingVerification = useCallback((currentUser) => {
//     if (!polling) {
//       setPolling(true);
//       const interval = setInterval(async () => {
//         await currentUser.reload();
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//           clearInterval(interval);
//           setPolling(false);
//         }
//       }, 3000);
//     }
//   }, [polling]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);

//       if (currentUser) {
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//         } else {
//           setEmailVerified(false);
//           startPollingVerification(currentUser);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [startPollingVerification]);

  


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <MantineProvider theme={lightTheme}>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
//           <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* Protected Routes */}
//           {user && (
//             <>
//               <Route
//                 path="/*"
//                 element={
//                   emailVerified ? (
//                     <AppLayout />
//                   ) : (
//                     <div>
//                       <h2>Please verify your email before accessing the app.</h2>
//                       <p>Check your email and click the verification link to proceed.</p>
//                       <button onClick={() => auth.currentUser.sendEmailVerification()}>
//                         Resend Verification Email
//                       </button>
//                         <button onClick={() => auth.signOut()}>Log Out</button>
//                     </div>
//                   )
//                 }
//               />
//             </>
//           )}

//           {/* Redirect to login or home based on the user's status */}
//           <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </MantineProvider>
//   );
// };

// export default App;





// import React, { useCallback, useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { auth } from './firebase';
// import { onAuthStateChanged } from 'firebase/auth';
// import Register from './screens/Register';
// import Login from './screens/Login';
// import ForgotPassword from './screens/ForgotPassword';
// import AppLayout from './components/AppLayout'; // New Layout Component
// import { MantineProvider, createTheme } from '@mantine/core';



// const App = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [polling, setPolling] = useState(false);
//   const [theme, setTheme] = useState('light'); // Move theme state to App.js

//   const startPollingVerification = useCallback((currentUser) => {
//     if (!polling) {
//       setPolling(true);
//       const interval = setInterval(async () => {
//         await currentUser.reload();
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//           clearInterval(interval);
//           setPolling(false);
//         }
//       }, 3000);
//     }
//   }, [polling]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);

//       if (currentUser) {
//         if (currentUser.emailVerified) {
//           setEmailVerified(true);
//         } else {
//           setEmailVerified(false);
//           startPollingVerification(currentUser);
//         }
//       }
//     });

//     return () => unsubscribe();
//   }, [startPollingVerification]);

//   const getTheme = () => {
//     return createTheme({
//       colorScheme: theme,  // This will dynamically apply light or dark theme
//       colors: {
//         dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5C5F66', '#373A40', '#2C2E33', '#25262B', '#1A1B1E', '#141517', '#101113'],
//         light: ['#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD', '#6C757D', '#495057', '#343A40', '#212529', '#121314'],
//       },
//       primaryColor: 'blue',
//       fontFamily: 'Arial, sans-serif',
//       headings: {
//         fontFamily: 'Arial, sans-serif',
//         fontWeight: 700,
//       },
//     });
//   };



//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <MantineProvider theme={getTheme()} withGlobalStyles withNormalizeCSS>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
//           <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* Protected Routes */}
//           {user && (
//             <>
//               <Route
//                 path="/*"
//                 element={
//                   emailVerified ? (
//                     <AppLayout theme={theme} setTheme={setTheme} />
//                   ) : (
//                     <div>
//                       <h2>Please verify your email before accessing the app.</h2>
//                       <p>Check your email and click the verification link to proceed.</p>
//                       <button onClick={() => auth.currentUser.sendEmailVerification()}>
//                         Resend Verification Email
//                       </button>
//                       <button onClick={() => auth.signOut()}>Log Out</button>
//                     </div>
//                   )
//                 }
//               />
//             </>
//           )}

//           {/* Redirect to login or home based on the user's status */}
//           <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </MantineProvider>
//   );
// };

// export default App;




//stupid issue from the rules and paths url undefined
import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Register from './screens/Register';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import AppLayout from './components/AppLayout'; // New Layout Component
import { MantineProvider, createTheme } from '@mantine/core';
import 'katex/dist/katex.min.css';




const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [polling, setPolling] = useState(false);
  const [theme, setTheme] = useState('light'); // Move theme state to App.js

  const startPollingVerification = useCallback((currentUser) => {
    if (!polling) {
      setPolling(true);
      const interval = setInterval(async () => {
        await currentUser.reload();
        if (currentUser.emailVerified) {
          setEmailVerified(true);
          clearInterval(interval);
          setPolling(false);
        }
      }, 3000);
    }
  }, [polling]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        if (currentUser.emailVerified) {
          setEmailVerified(true);
        } else {
          setEmailVerified(false);
          startPollingVerification(currentUser);
        }
      } else {
        setUser(null); // Ensure user is set to null when logged out
        setEmailVerified(false); // Reset email verification status
      }
    });

    return () => unsubscribe();
  }, [startPollingVerification]);

  const getTheme = () => {
    return createTheme({
      colorScheme: theme,  // This will dynamically apply light or dark theme
      colors: {
        dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5C5F66', '#373A40', '#2C2E33', '#25262B', '#1A1B1E', '#141517', '#101113'],
        light: ['#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD', '#6C757D', '#495057', '#343A40', '#212529', '#121314'],
      },
      primaryColor: 'blue',
      fontFamily: 'Arial, sans-serif',
      headings: {
        fontFamily: 'Arial, sans-serif',
        fontWeight: 700,
      },
    });
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MantineProvider theme={getTheme()} withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          {user && (
            <>
              <Route
                path="/*"
                element={
                  emailVerified ? (
                    <AppLayout user={user} theme={theme} setTheme={setTheme} /> //user state extra layer of protection, prevent access to protected pages when user is null 
                  ) : (
                    <div>
                      <h2>Please verify your email before accessing the app.</h2>
                      <p>Check your email and click the verification link to proceed.</p>
                      <button onClick={() => auth.currentUser.sendEmailVerification()}>
                        Resend Verification Email
                      </button>
                      <button onClick={() => auth.signOut()}>Log Out</button>
                    </div>
                  )
                }
              />
            </>
          )}

          {/* Redirect to login or home based on the user's status */}
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;



