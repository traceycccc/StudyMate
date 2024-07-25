// src/components/Home.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to StudyMate</h1>
      {currentUser ? (
        <p>You are logged in as: {currentUser.email}</p>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default Home;
