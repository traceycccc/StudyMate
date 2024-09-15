


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../firebase';
// import InputField from './InputField';
// import Button from './Button';
// import FormContainer from './FormContainer';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleLogin = (e) => {
//         e.preventDefault();
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 console.log('User logged in:', userCredential.user);
//             })
//             .catch((err) => {
//                 setError(err.message);
//             });
//     };

//     const handleGoogleLogin = async () => {
//         const provider = new GoogleAuthProvider();
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;
//             console.log('User logged in with Google:', user);
//         } catch (err) {
//             setError('Error during Google login: ' + err.message);
//         }
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
//                 <InputField
//                     label="Password"
//                     type="password"
//                     placeholder="********"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <Button text="Login" type="submit" />
//             </form>
//             {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}

//             {/* Add the Google login button */}
//             <div className="my-4 text-center">
//                 <p className="text-gray-500">Or Login with</p>
//                 <Button text="Login with Google" onClick={handleGoogleLogin} />
//             </div>

//             <p className="mt-4 text-center">
//                 Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
//             </p>
//         </FormContainer>
//     );
// };

// export default Login;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../firebase';
// import InputField from './InputField';
// import Button from './Button';
// import FormContainer from './FormContainer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false); // New state for password visibility

//     const handleLogin = (e) => {
//         e.preventDefault();
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 console.log('User logged in:', userCredential.user);
//             })
//             .catch((err) => {
//                 setError(err.message);
//             });
//     };

//     const handleGoogleLogin = async () => {
//         const provider = new GoogleAuthProvider();
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;
//             console.log('User logged in with Google:', user);
//         } catch (err) {
//             setError('Error during Google login: ' + err.message);
//         }
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

//                 {/* Password field with eye icon to toggle visibility */}
//                 <div className="relative mb-4"> {/* Added mb-4 for margin */}
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10" // Added pr-10 for icon space
                        
//                         type={showPassword ? "text" : "password"}  // Toggle between password and text
//                         placeholder="********"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <span
//                         className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 cursor-pointer"
//                         onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
//                     >
//                         <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                     </span>
//                 </div>

//                 <Button text="Login" type="submit" />
//             </form>
//             {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}

//             <div className="my-4 text-center">
//                 <p className="text-gray-500">Or Login with</p>
//                 <Button text="Login with Google" onClick={handleGoogleLogin} />
//             </div>

//             <p className="mt-4 text-center">
//                 Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
//             </p>
//         </FormContainer>
//     );
// };

// export default Login;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../firebase';
// import InputField from './InputField';
// import Button from './Button';
// import FormContainer from './FormContainer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false); // New state for password visibility

//     const handleLogin = (e) => {
//         e.preventDefault();
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 console.log('User logged in:', userCredential.user);
//             })
//             .catch((err) => {
//                 setError(err.message);
//             });
//     };

//     const handleGoogleLogin = async () => {
//         const provider = new GoogleAuthProvider();
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;
//             console.log('User logged in with Google:', user);
//         } catch (err) {
//             setError('Error during Google login: ' + err.message);
//         }
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

//                 {/* Password field with label */}
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Password</label> {/* Added Password label */}
//                     <div className="relative">
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10" // Added pr-10 for icon space
//                             type={showPassword ? "text" : "password"}  // Toggle between password and text
//                             placeholder="********"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <span
//                             className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700 cursor-pointer"
//                             onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
//                         >
//                             <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                         </span>
//                     </div>
//                 </div>

//                 <Button text="Login" type="submit" />
//             </form>
//             {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}

//             <div className="my-4 text-center">
//                 <p className="text-gray-500">Or Login with</p>
//                 <Button text="Login with Google" onClick={handleGoogleLogin} />
//             </div>

//             <p className="mt-4 text-center">
//                 Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
//             </p>
//         </FormContainer>
//     );
// };

// export default Login;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../firebase';
// import InputField from './InputField';
// import PasswordField from './PasswordField';
// import Button from './Button';
// import FormContainer from './FormContainer';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');

//     const handleLogin = (e) => {
//         e.preventDefault();
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 console.log('User logged in:', userCredential.user);
//             })
//             .catch((err) => {
//                 setError(err.message);
//             });
//     };

//     const handleGoogleLogin = async () => {
//         const provider = new GoogleAuthProvider();
//         try {
//             //const result = await signInWithPopup(auth, provider);
//             await signInWithPopup(auth, provider);
//             //const user = result.user;
//             //console.log('User logged in with Google:', user);
//         } catch (err) {
//             setError('Error during Google login: ' + err.message);
//         }
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

//             <div className="my-4 text-center">
//                 <p className="text-gray-500">Or Login with</p>
//                 <Button text="Login with Google" onClick={handleGoogleLogin} />
//             </div>

//             <p className="mt-4 text-center">
//                 Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
//             </p>
//         </FormContainer>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail, linkWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import InputField from './InputField';
import PasswordField from './PasswordField';
import Button from './Button';
import FormContainer from './FormContainer';

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
                setError(err.message);
            });
    };

    // Handle login with Google
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            // Check if the email already exists in Firebase with a different method
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);

            if (signInMethods.includes('password')) {
                // The user has already registered manually with email/password
                // Prompt them to link their Google account to their existing email/password account
                if (window.confirm('It looks like you have already registered with this email using password. Do you want to link your Google account with it?')) {
                    const result = await linkWithPopup(auth.currentUser, provider);
                    console.log('Google account linked with existing email/password account:', result.user);
                }
            } else {
                // No conflict, proceed with Google sign-in
                const result = await signInWithPopup(auth, provider);
                console.log('User logged in with Google:', result.user);
            }
        } catch (err) {
            setError('Error during Google login: ' + err.message);
        }
    };

    return (
        <FormContainer>
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form onSubmit={handleLogin}>
                <InputField
                    label="Email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Use PasswordField instead of direct input for password */}
                <PasswordField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button text="Login" type="submit" />
            </form>
            {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}

            <div className="my-4 text-center">
                <p className="text-gray-500">Or Login with</p>
                <Button text="Login with Google" onClick={handleGoogleLogin} />
            </div>

            <p className="mt-4 text-center">
                Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link>
            </p>

            <p className="mt-4 text-center">
                Forgot your password? <Link to="/forgot-password" className="text-blue-500">Reset it here</Link>
            </p>
        </FormContainer>
    );
};

export default Login;









