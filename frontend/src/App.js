import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; //navigation within the web app
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth'; //manage user state and email verification
import Register from './screens/Register';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import AppLayout from './components/AppLayout'; // New Layout Component
import { MantineProvider, Button } from '@mantine/core'; //provide UI components and styling
import 'katex/dist/katex.min.css'; //support for rendering math formulas.



const App = () => {
  const [user, setUser] = useState(null); // store current user object from firebase auth
  const [loading, setLoading] = useState(true); //loading indication, for user authen state
  const [emailIsVerified, setEmailVerified] = useState(false); //tracks whether user's email is verified
  const [polling, setPolling] = useState(false); //prevents multiple polling intervals for email verification


  // email Verification Polling,  keep checking if the user’s email is verified
  const startPollingVerification = useCallback((currentUser) => {
    if (!polling) {// ensure one polling loop runs at a time
      setPolling(true); //indicate the polling loop is running
      const interval = setInterval(async () => { //start loop to repeatedly check
        await currentUser.reload();// refresh firebase User object
        if (currentUser.emailVerified) {
          setEmailVerified(true); //mark email is verified
          clearInterval(interval);// stop the polling loop
          setPolling(false); 
        }
      }, 3000); //loop every 3 seconds
    }
  }, [polling]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {// registered user
        if (currentUser.emailVerified) { // verified user logs in (using firebase's )
          setEmailVerified(true);
        } else {  // user registered but haven't verify their emails yet 
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




  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          {/* Public Routes */}
          {/* Redirect to pages based on the user's status */}
          {/* if user not logged in, stay out */}
          <Route path="/" element={user ? <Navigate to="/modules" /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/modules" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/modules" /> : <Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          

          {/* Protected Routes */}
          {/* as long as user is logged in, stays in */}
          {user && (
            <>
              <Route
                path="/*"
                element={
                  emailIsVerified ? (
                    <AppLayout user={user} /> //user state extra layer of protection, prevent access to protected pages when user is null 
                  ) : (
                    <div style={{ padding: '20px' }}>
                      <h2>Please verify your email before accessing the app.</h2>
                      <p>Check your email and click the verification link to proceed.</p>

                      <Button onClick={() => auth.signOut()}>Log Out</Button>
                    </div>
                  )
                }
              />
            </>
          )}
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;



