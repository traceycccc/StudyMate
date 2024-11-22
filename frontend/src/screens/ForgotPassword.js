import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { TextInput, Button, Container, Text } from '@mantine/core';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');



    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous error
        setSuccessMessage(''); // Clear success message

        // Define actionCodeSettings to redirect after password reset
        const actionCodeSettings = {
            url: 'http://localhost:3000/login', // This will be the login page
            handleCodeInApp: false, // False means Firebase will handle the reset link in the web browser
        };

        try {
            // Check if the email exists in the backend
            const { data } = await axios.post('http://localhost:5000/api/checkUserExists', { email });
            if (!data.exists) {
                throw new Error('auth/user-not-found'); // Fix: Use Error object
            }

            // Attempt to send password reset email with redirection
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            setSuccessMessage(`Password reset email sent to ${email}. Please check your inbox.`);
        } catch (error) {
            if (error.message === 'auth/user-not-found') {
                setError('No account exists for this email.');
            } else {
                setError('Error sending password reset email: ' + (error.response?.data?.error || error.message));
            }
        }
    };

    return (
        <Container size="xs" mt={50}>
            <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Reset Password</h2>
            <form onSubmit={handleEmailSubmit}>
                <TextInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    mt="sm"
                />
                <Button type="submit" fullWidth mt="md" color="blue">
                    Submit
                </Button>
            </form>

            {error && <Text color="red" size="sm" mt="md" align="center">{error}</Text>}
            {successMessage && <Text color="green" size="sm" mt="md" align="center">{successMessage}</Text>}
        </Container>
    );
};

export default ForgotPassword;
