import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const LinkAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, uid } = location.state; // Email and UID from the Google account

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLinkAccount = async (e) => {
    e.preventDefault();

    try {
      // Send the email, password, and UID to the backend for verification and linking
      const response = await axios.post('http://localhost:5000/api/linkAccount', {
        email,
        password,
        uid,
      });

      if (response.status === 200) {
        alert('Account successfully linked! You can now log in with Google.');
        navigate('/'); // Redirect to the home page or login page
      } else {
        setErrorMessage('Failed to link accounts. Please try again.');
      }
    } catch (error) {
      console.error('Error linking account:', error.response ? error.response.data : error.message);
      setErrorMessage('An error occurred. Please check your password and try again.');
    }
  };

  return (
    <div>
      <h1>Link Account</h1>
      <p>Your email: {email}</p>
      <p>Please verify your identity by entering the password of your manually created account.</p>

      <form onSubmit={handleLinkAccount}>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Link Account</button>
      </form>
      <button onClick={() => navigate('/login')}>Cancel</button>
    </div>
  );
};

export default LinkAccount;
