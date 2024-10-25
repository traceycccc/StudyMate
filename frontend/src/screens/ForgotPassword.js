// import React, { useState } from 'react';
// import { auth } from '../firebase';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import InputField from './InputField';
// import PasswordField from './PasswordField';
// import Button from './Button';
// import FormContainer from './FormContainer';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [emailSent, setEmailSent] = useState(false); // Track if email has been sent

//     const handleEmailSubmit = async (e) => {
//         e.preventDefault();
//         setError(''); // Clear previous error
//         setSuccessMessage(''); // Clear success message

//         try {
//             // Attempt to send password reset email
//             await sendPasswordResetEmail(auth, email);
//             setSuccessMessage(`Password reset email sent to ${email}. Please check your inbox.`);
//             setEmailSent(true); // Email was successfully sent
//         } catch (error) {
//             if (error.code === 'auth/user-not-found') {
//                 setError('No account exists for this email.');
//             } else {
//                 setError('Error sending password reset email: ' + error.message);
//             }
//         }
//     };

//     const handlePasswordReset = (e) => {
//         e.preventDefault();

//         if (newPassword !== confirmPassword) {
//             setError('Passwords do not match.');
//             return;
//         }

//         // Proceed to update password after successful verification (email link)
//         setSuccessMessage('Password has been reset successfully.');
//     };

//     return (
//         <FormContainer>
//             <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

//             {!emailSent ? (
//                 <form onSubmit={handleEmailSubmit}>
//                     <InputField
//                         label="Email"
//                         type="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <Button text="Submit" type="submit" />
//                 </form>
//             ) : (
//                 <form onSubmit={handlePasswordReset}>
//                     <PasswordField
//                         label="New Password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                     />
//                     <PasswordField
//                         label="Confirm New Password"
//                         value={confirmPassword}
//                         onChange={(e) => setConfirmPassword(e.target.value)}
//                     />
//                     <Button text="Reset Password" type="submit" />
//                 </form>
//             )}

//             {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
//             {successMessage && <p className="text-green-500 text-xs italic mt-4">{successMessage}</p>}
//         </FormContainer>
//     );
// };

// export default ForgotPassword;



// import React, { useState } from 'react';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { auth } from '../firebase';
// import InputField from './InputField';
// import Button from './Button';
// import FormContainer from './FormContainer';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleEmailSubmit = async (e) => {
//         e.preventDefault();
//         setError(''); // Clear previous error
//         setSuccessMessage(''); // Clear success message

//         try {
//             // Attempt to send password reset email
//             await sendPasswordResetEmail(auth, email);
//             setSuccessMessage(`Password reset email sent to ${email}. Please check your inbox.`);
//         } catch (error) {
//             if (error.code === 'auth/user-not-found') {
//                 setError('No account exists for this email.');
//             } else {
//                 setError('Error sending password reset email: ' + error.message);
//             }
//         }
//     };

//     return (
//         <FormContainer>
//             <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
//             <form onSubmit={handleEmailSubmit}>
//                 <InputField
//                     label="Email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <Button text="Submit" type="submit" />
//             </form>

//             {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
//             {successMessage && <p className="text-green-500 text-xs italic mt-4">{successMessage}</p>}
//         </FormContainer>
//     );
// };

// export default ForgotPassword;



// import React, { useState } from 'react';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { auth } from '../firebase';
// import InputField from './components/InputField';
// import Button from './components/Button';
// import FormContainer from './components/FormContainer';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleEmailSubmit = async (e) => {
//         e.preventDefault();
//         setError(''); // Clear previous error
//         setSuccessMessage(''); // Clear success message

//         // Define actionCodeSettings to redirect after password reset
//         const actionCodeSettings = {
//             url: 'http://localhost:3000/login', // This will be the login page
//             handleCodeInApp: false, // False means Firebase will handle the reset link in the web browser
//         };

//         try {
//             // Attempt to send password reset email with redirection
//             await sendPasswordResetEmail(auth, email, actionCodeSettings);
//             setSuccessMessage(`Password reset email sent to ${email}. Please check your inbox.`);
//         } catch (error) {
//             if (error.code === 'auth/user-not-found') {
//                 setError('No account exists for this email.');
//             } else {
//                 setError('Error sending password reset email: ' + error.message);
//             }
//         }
//     };

//     return (
//         <FormContainer>
//             <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
//             <form onSubmit={handleEmailSubmit}>
//                 <InputField
//                     label="Email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <Button text="Submit" type="submit" />
//             </form>

//             {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
//             {successMessage && <p className="text-green-500 text-xs italic mt-4">{successMessage}</p>}
//         </FormContainer>
//     );
// };

// export default ForgotPassword;




import React, { useState } from 'react';
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
            // Attempt to send password reset email with redirection
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            setSuccessMessage(`Password reset email sent to ${email}. Please check your inbox.`);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('No account exists for this email.');
            } else {
                setError('Error sending password reset email: ' + error.message);
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
