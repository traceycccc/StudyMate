import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Dashboard = () => {
    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('User logged out');
        }).catch((error) => {
            console.error('Error logging out:', error);
        });
    };

    return (
        <div>
            <h1>Welcome to your Dashboard</h1>
            <p>This is a protected route.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
