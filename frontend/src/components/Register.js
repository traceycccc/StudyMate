


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';
// import InputField from './InputField';
// import Button from './Button';
// import FormContainer from './FormContainer';

// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleRegister = (e) => {
//         e.preventDefault();
//         createUserWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 console.log('User registered:', userCredential.user);
//             })
//             .catch((err) => {
//                 setError(err.message);
//             });
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
//                     label="Password"
//                     type="password"
//                     placeholder="********"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <Button text="Sign up" type="submit" />
//             </form>
//             {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
//             <p className="mt-4 text-center">
//                 Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
//             </p>
//         </FormContainer>
//     );
// };

// export default Register;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
// import { auth } from '../firebase';
// import InputField from './InputField';
// import PasswordField from './PasswordField';
// import Button from './Button';
// import FormContainer from './FormContainer';
// import { v4 as uuidv4 } from 'uuid'; // For generating OTP

// const Register = () => {
//     const [email, setEmail] = useState('');
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [otp, setOtp] = useState(''); // To hold the OTP input
//     const [generatedOtp, setGeneratedOtp] = useState(''); // To store generated OTP
//     const [otpSent, setOtpSent] = useState(false);
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleRegister = (e) => {
//         e.preventDefault();

//         // Validate password and confirm password
//         if (password !== confirmPassword) {
//             setError('Passwords do not match!');
//             return;
//         }

//         // Generate OTP and send to user's email
//         const generatedOtp = uuidv4().slice(0, 6); // Generate 6-digit OTP
//         setGeneratedOtp(generatedOtp);
//         sendOtpToEmail(email, generatedOtp); // Simulate sending OTP via email
//         setOtpSent(true);
//     };

//     // Simulate OTP sending via email (you should use a real email service here)
//     const sendOtpToEmail = (email, otp) => {
//         console.log(`Sending OTP ${otp} to ${email}`);
//         // In real app, integrate email service to send the OTP
//         setSuccessMessage(`OTP has been sent to ${email}`);
//     };

//     const handleVerifyOtp = async () => {
//         if (otp === generatedOtp) {
//             try {
//                 // Register user after OTP is verified
//                 const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//                 const user = userCredential.user;

//                 // Send email verification
//                 await sendEmailVerification(user);
//                 console.log('User registered and verification email sent:', user);

//                 setSuccessMessage('Registration successful! Check your email for verification.');
//             } catch (error) {
//                 setError(error.message);
//             }
//         } else {
//             setError('Invalid OTP. Please check your email.');
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

//                 {/* Show OTP input only after OTP is sent */}
//                 {otpSent && (
//                     <InputField
//                         label="Enter OTP"
//                         type="text"
//                         placeholder="Enter the OTP sent to your email"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                     />
//                 )}

//                 {!otpSent ? (
//                     <Button text="Register" type="submit" />
//                 ) : (
//                     <Button text="Verify OTP" onClick={handleVerifyOtp} />
//                 )}
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
// import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
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

//         // Validate password and confirm password
//         if (password !== confirmPassword) {
//             setError('Passwords do not match!');
//             return;
//         }

//         try {
//             // Register the user
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             // Send email verification
//             await sendEmailVerification(user);
//             setSuccessMessage('Registration successful! A verification email has been sent to your email address.');
//             console.log('Verification email sent to:', email);

//             // Clear input fields
//             setEmail('');
//             setName('');
//             setPassword('');
//             setConfirmPassword('');
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
import InputField from './InputField';
import PasswordField from './PasswordField';
import Button from './Button';
import FormContainer from './FormContainer';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate email and password match
        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        if (!email){
            setError('enter email!');
            return;
        }

        if (!name) {
            setError('enter name!');
            return;
        }

        // Check if the email is already registered
        try {
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
        <FormContainer>
            <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>
            <form onSubmit={handleRegister}>
                <InputField
                    label="Email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <PasswordField
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordField
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button text="Register" type="submit" />
            </form>

            {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
            {successMessage && <p className="text-green-500 text-xs italic mt-4">{successMessage}</p>}

            <p className="mt-4 text-center">
                Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
            </p>
        </FormContainer>
    );
};

export default Register;


