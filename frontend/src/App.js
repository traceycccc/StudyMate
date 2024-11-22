import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Register from './screens/Register';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import AppLayout from './components/AppLayout'; // New Layout Component
import { MantineProvider, Button } from '@mantine/core';
import 'katex/dist/katex.min.css';




const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [polling, setPolling] = useState(false);

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




  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={user ? <Navigate to="/modules" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/modules" /> : <Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          {user && (
            <>
              <Route
                path="/*"
                element={
                  emailVerified ? (
                    <AppLayout user={user}  /> //user state extra layer of protection, prevent access to protected pages when user is null 
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

          {/* Redirect to login or home based on the user's status */}
          <Route path="/" element={user ? <Navigate to="/modules" /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;



