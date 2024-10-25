


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail, linkWithPopup } from 'firebase/auth';
// import { auth } from '../firebase';
// import InputField from '../components/InputField';
// import PasswordField from '../components/PasswordField';
// import Button from '../components/Button';
// import FormContainer from '../components/FormContainer';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     // Handle manual login with email/password
//     const handleLogin = (e) => {
//         e.preventDefault();
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 console.log('User logged in:', userCredential.user);
//             })
//             .catch((err) => {
//                 console.error('Login error code:', err.code);
//                 console.error('Login error message:', err.message);
//                 setError(err.message);
//             });
//     };

    

//     return (
//         <FormContainer>
//             <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//             <form onSubmit={handleLogin}>
//                 <InputField
//                     label="Email"
//                     type="email"
//                     placeholder="example@gmail.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />

//                 {/* Use PasswordField instead of direct input for password */}
//                 <PasswordField
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />

//                 <Button text="Login" type="submit" />
//             </form>
//             {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}

            

//             <p className="mt-4 text-center">
//                 Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
//             </p>

//             <p className="mt-4 text-center">
//                 Forgot your password? <Link to="/forgot-password" className="text-blue-500">Reset it here</Link>
//             </p>
//         </FormContainer>
//     );
// };

// export default Login;





//no more google account, no time, its okk, functions matter more, and the MFA thing, cant work on it
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { TextInput, PasswordInput, Button, Container, Text } from '@mantine/core';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Handle manual login with email/password
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('User logged in:', userCredential.user);
            })
            .catch((err) => {
                console.error('Login error code:', err.code);
                console.error('Login error message:', err.message);
                setError(err.message);
            });
    };

    

    return (

        <Container size="xs" mt={50}>
            <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Login</h2>
            <form onSubmit={handleLogin}>
                <TextInput
                    label="Email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <Button type="submit" fullWidth mt="md" color="blue">
                    Login
                </Button>
            </form>

            {error && <Text color="red" size="sm" mt="md" align="center">{error}</Text>}

            <Text align="center" mt="lg">
                Don't have an account? <Link to="/register">Sign up</Link>
            </Text>

            <Text align="center" mt="sm">
                Forgot your password? <Link to="/forgot-password">Reset it here</Link>
            </Text>
        </Container>
    );
};

export default Login;



