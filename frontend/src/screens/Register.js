import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { TextInput, PasswordInput, Button, Container, Text } from '@mantine/core';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to validate password strength
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    // Function to validate name
    const validateName = (name) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        return nameRegex.test(name);
    };



    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        // Validate email format
        if (!validateEmail(email)) {
            setError('Please enter a valid email address format.');
            return;
        }

        // Validate name
        if (!validateName(name)) {
            setError('Name should only contain letters and spaces.');
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Validate password strength
        if (!validatePassword(password)) {
            setError(
                'Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.'
            );
            return;
        }

        try {
            // Check if the email is already registered
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (signInMethods.length > 0) {
                setError('Email is already registered.');
                return;
            }
        } catch (error) {
            console.error("Error checking email registration:", error);
            setError("Failed to check email registration. Please try again later.");
            return;
        }

        try {
            // create the user with email and password, with Firebase Authentication
            //using Firebase's createUserWithEmailAndPassword
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create a user document in Firestore
            await setDoc(doc(firestore, 'users', user.uid), {
                name: name,
                email: email
            });

            // Send email verification, extra layer of security to prevent spam or fake accounts.
            await sendEmailVerification(user);

            // Show success message and ask user to check their email
            setSuccessMessage('Registration successful! Please check your email for verification.');
        } catch (error) {
            // Handle specific Firebase errors
            if (error.code === 'auth/email-already-in-use') {
                setError('Email is already registered.');
            } else {
                console.error("Error creating user:", error);
                setError("An error occurred during registration. Please try again.");
            }
        }
    };



    return (
        <Container size="xs" mt={50}>
            <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Sign up</h2>
            <form onSubmit={handleRegister}>
                <TextInput
                    label="Email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}//Real-Time State Update Before Submit
                    required
                    mt="sm"   //margin top prop using Mantine, xs, sm, md, lg, xl
                />
                <TextInput
                    label="Name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    mt="sm"
                />
                <PasswordInput
                    label="Password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    mt="sm"
                />
                <PasswordInput
                    label="Confirm Password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    mt="sm"
                />
                <Button type="submit" fullWidth mt="md" color="blue">
                    Register
                </Button>
            </form>

            {error && <Text color="red" size="sm" mt="md" align="center">{error}</Text>}
            {successMessage && <Text color="green" size="sm" mt="md" align="center">{successMessage}</Text>}

            <Text align="center" mt="lg">
                Already have an account? <Link to="/login">Login</Link>
            </Text>
        </Container>
    );
};

export default Register;

