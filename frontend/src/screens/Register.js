



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'firebase/auth';
// import { auth } from '../firebase';
// import InputField from './InputField';
// import PasswordField from './PasswordField';
// import Button from './Button';
// import FormContainer from './FormContainer';

// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleRegister = async (e) => {
//         e.preventDefault();

//         // Validate email and password match
//         if (password !== confirmPassword) {
//             setError('Passwords do not match!');
//             return;
//         }

//         if (!email){
//             setError('enter email!');
//             return;
//         }

//         if (!name) {
//             setError('enter name!');
//             return;
//         }

//         // Check if the email is already registered
//         try {
//             const signInMethods = await fetchSignInMethodsForEmail(auth, email);
//             if (signInMethods.length > 0) {
//                 setError('Email is already registered.');
//                 return;
//             }
//         } catch (error) {
//             setError('Error checking email registration.');
//             return;
//         }

//         try {
//             // Create the user with email and password
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Send email verification
//             await sendEmailVerification(user);

//             // Show success message and ask user to check their email
//             setSuccessMessage('Registration successful! Please check your email for verification.');
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <FormContainer>
//             <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>
//             <form onSubmit={handleRegister}>
//                 <InputField
//                     label="Email"
//                     type="email"
//                     placeholder="example@gmail.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <InputField
//                     label="Name"
//                     type="text"
//                     placeholder="Your name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <PasswordField
//                     label="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <PasswordField
//                     label="Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                 />

//                 <Button text="Register" type="submit" />
//             </form>

//             {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
//             {successMessage && <p className="text-green-500 text-xs italic mt-4">{successMessage}</p>}

//             <p className="mt-4 text-center">
//                 Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
//             </p>
//         </FormContainer>
//     );
// };

// export default Register;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'firebase/auth';
// import { auth } from '../firebase';
// import InputField from './components/InputField';
// import PasswordField from './components/PasswordField';
// import Button from './Button';
// import FormContainer from './components/FormContainer';

// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     // Function to validate email format
//     const validateEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     // Function to validate password strength
//     const validatePassword = (password) => {
//         const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//         return passwordRegex.test(password);
//     };

//     // Function to validate name
//     const validateName = (name) => {
//         const nameRegex = /^[A-Za-z\s]+$/;
//         return nameRegex.test(name);
//     };

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccessMessage('');

//         // Validate email format
//         if (!validateEmail(email)) {
//             setError('Please enter a valid email address.');
//             return;
//         }

//         // Validate name
//         if (!validateName(name)) {
//             setError('Name should only contain letters and spaces.');
//             return;
//         }

//         // Validate password match
//         if (password !== confirmPassword) {
//             setError('Passwords do not match!');
//             return;
//         }

//         // Validate password strength
//         if (!validatePassword(password)) {
//             setError('Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.');
//             return;
//         }

//         try {
//             // Check if the email is already registered
//             const signInMethods = await fetchSignInMethodsForEmail(auth, email);
//             if (signInMethods.length > 0) {
//                 setError('Email is already registered.');
//                 return;
//             }
//         } catch (error) {
//             setError('Error checking email registration.');
//             return;
//         }

//         try {
//             // Create the user with email and password
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Send email verification
//             await sendEmailVerification(user);

//             // Show success message and ask user to check their email
//             setSuccessMessage('Registration successful! Please check your email for verification.');
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <FormContainer>
//             <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>
//             <form onSubmit={handleRegister}>
//                 <InputField
//                     label="Email"
//                     type="email"
//                     placeholder="example@gmail.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <InputField
//                     label="Name"
//                     type="text"
//                     placeholder="Your name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <PasswordField
//                     label="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <PasswordField
//                     label="Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                 />

//                 <Button text="Register" type="submit" />
//             </form>

//             {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
//             {successMessage && <p className="text-green-500 text-xs italic mt-4">{successMessage}</p>}

//             <p className="mt-4 text-center">
//                 Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
//             </p>
//         </FormContainer>
//     );
// };

// export default Register;




import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { TextInput, PasswordInput, Button, Container, Text } from '@mantine/core';

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
            setError('Please enter a valid email address.');
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
            setError('Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.');
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
            setError('Error checking email registration.');
            return;
        }

        try {
            // Create the user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Send email verification
            await sendEmailVerification(user);

            // Show success message and ask user to check their email
            setSuccessMessage('Registration successful! Please check your email for verification.');
        } catch (error) {
            setError(error.message);
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    mt="sm"
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

