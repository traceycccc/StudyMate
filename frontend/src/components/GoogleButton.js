// import React from 'react';
// import { signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '../firebase';
// import Button from './Button';

// const GoogleButton = () => {
//     const handleGoogleSignIn = async () => {
//         try {
//             const result = await signInWithPopup(auth, googleProvider);
//             console.log('User signed in with Google:', result.user);
//         } catch (error) {
//             console.error('Error during Google sign-in:', error);
//         }
//     };

//     return (
//         <Button
//             text="Sign in with Google"
//             onClick={handleGoogleSignIn}
//         />
//     );
// };

// export default GoogleButton;


// import React from 'react';
// import { signInWithPopup, fetchSignInMethodsForEmail, linkWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '../firebase';

// const GoogleButton = ({ isRegister }) => {
//     const handleGoogleSignIn = async () => {
//         try {
//             const result = await signInWithPopup(auth, googleProvider);
//             const user = result.user;

//             // Check if the user has an existing account with email/password
//             const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);

//             if (signInMethods.includes('password') && !isRegister) {
//                 // If user registered with email/password, prompt to link accounts when logging in
//                 if (window.confirm('You already registered with email/password. Do you want to link your Google account?')) {
//                     // Link accounts if they confirm
//                     await linkWithPopup(auth.currentUser, googleProvider);
//                     console.log('Accounts linked successfully.');
//                 } else {
//                     console.log('Accounts not linked.');
//                 }
//             } else if (isRegister && signInMethods.includes('google.com')) {
//                 // If trying to register with Google again, send to dashboard
//                 console.log('User already registered with Google. Redirecting...');
//             } else {
//                 console.log('User signed in with Google:', user);
//             }

//         } catch (error) {
//             console.error('Error during Google sign-in:', error);
//         }
//     };

//     return (
//         <button
//             onClick={handleGoogleSignIn}
//             className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded w-full flex justify-center items-center hover:bg-gray-100 transition duration-300"
//         >
//             <img
//                 src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//                 alt="Google Logo"
//                 className="mr-2"
//             />
//             {isRegister ? 'Sign up with Google' : 'Sign in with Google'}
//         </button>
//     );
// };

// export default GoogleButton;


// import React, { useState } from 'react';
// import { signInWithPopup, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth, googleProvider } from '../firebase';
// import { useNavigate } from 'react-router-dom';

// const GoogleButton = () => {
//     const [error, setError] = useState('');
//     const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleGoogleSignIn = async () => {
//         try {
//             const result = await signInWithPopup(auth, googleProvider);
//             console.log('User signed in with Google:', result.user);
//         } catch (error) {
//             const email = error.customData?.email;
//             if (error.code === 'auth/account-exists-with-different-credential' && email) {
//                 // Fetch existing sign-in methods for this email
//                 const methods = await fetchSignInMethodsForEmail(auth, email);
//                 if (methods.includes('password')) {
//                     // If the user is already registered manually, show password prompt
//                     setEmail(email);
//                     setShowPasswordPrompt(true);
//                 }
//             } else {
//                 setError(error.message);
//             }
//         }
//     };

//     const handleManualSignIn = async () => {
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             console.log('User confirmed manual sign-in with password');
//             setShowPasswordPrompt(false); // Close the modal on successful sign-in
//         } catch (error) {
//             setError('Incorrect password. Please try again.');
//         }
//     };

//     return (
//         <>
//             <button
//                 onClick={handleGoogleSignIn}
//                 className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded w-full flex justify-center items-center hover:bg-gray-100 transition duration-300"
//             >
//                 <img
//                     src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//                     alt="Google Logo"
//                     className="mr-2"
//                 />
//                 Sign in with Google
//             </button>

//             {showPasswordPrompt && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Enter Your Password</h3>
//                         <p>This email is already registered manually. Enter your password to confirm.</p>
//                         <input
//                             type="password"
//                             placeholder="Enter password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="input"
//                         />
//                         <button onClick={handleManualSignIn} className="btn">
//                             Confirm
//                         </button>
//                         {error && <p className="error-message">{error}</p>}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default GoogleButton;

import React, { useState } from 'react';
import { signInWithPopup, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';

const GoogleButton = ({ isRegister }) => {
    const [error, setError] = useState('');
    const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const email = result.user.email;

            // If on the Register page, check if the email is already registered with Google
            if (isRegister) {
                const methods = await fetchSignInMethodsForEmail(auth, email);
                if (methods.includes('google.com')) {
                    // If email is already registered with Google, redirect to login
                    setError('This email is already registered with Google. Please log in.');
                    setTimeout(() => navigate('/login'), 2000);
                    return;
                }
            } else {
                // If on the login page, check if the email has a manual login method
                const methods = await fetchSignInMethodsForEmail(auth, email);
                if (methods.includes('password')) {
                    // Show the password prompt for users with both manual and Google methods
                    setEmail(email);
                    setShowPasswordPrompt(true);
                } else {
                    console.log('User signed in with Google:', result.user);
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleManualSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User confirmed manual sign-in with password');
            setShowPasswordPrompt(false); // Close the modal on successful sign-in
        } catch (error) {
            setError('Incorrect password. Please try again.');
        }
    };

    return (
        <>
            <button
                onClick={handleGoogleSignIn}
                className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded w-full flex justify-center items-center hover:bg-gray-100 transition duration-300"
            >
                <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google Logo"
                    className="mr-2"
                />
                {isRegister ? 'Register with Google' : 'Sign in with Google'}
            </button>

            {showPasswordPrompt && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Enter Your Password</h3>
                        <p>This email is already registered manually. Enter your password to confirm.</p>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                        <button onClick={handleManualSignIn} className="btn">
                            Confirm
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            )}

            {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </>
    );
};

export default GoogleButton;

