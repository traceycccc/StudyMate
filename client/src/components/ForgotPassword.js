// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP and new password
//   const [message, setMessage] = useState('');

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/sendOtpForPasswordReset', { email });
//       if (response.status === 200) {
//         setStep(2); // Move to the OTP and new password step
//         setMessage('OTP sent to your email.');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error.response ? error.response.data : error.message);
//       setMessage('Error sending OTP. Please try again.');
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/resetPassword', { email, otp, newPassword });
//       if (response.status === 200) {
//         setMessage('Password reset successfully.');
//       }
//     } catch (error) {
//       console.error('Error resetting password:', error.response ? error.response.data : error.message);
//       setMessage('Error resetting password. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h1>Forgot Password</h1>
//       {step === 1 ? (
//         <form onSubmit={handleSendOtp}>
//           <label>
//             Enter your email:
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </label>
//           <button type="submit">Send OTP</button>
//         </form>
//       ) : (
//         <form onSubmit={handleResetPassword}>
//           <label>
//             Enter OTP:
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Enter new password:
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//           </label>
//           <button type="submit">Reset Password</button>
//         </form>
//       )}
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ForgotPassword;




//5.2
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // To manage steps in the process
  const [uid, setUid] = useState(''); // To store user ID after OTP verification
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    try {
      const response = await axios.post('http://localhost:5000/api/users/forgotPassword', { email });
      setSuccessMessage(response.data.message);
      setStep(2); // Move to OTP entry step
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    try {
      const response = await axios.post('http://localhost:5000/api/users/verifyForgotPasswordOTP', { email, otp });
      setSuccessMessage(response.data.message);
      setUid(response.data.uid); // Store UID for the password reset step
      setStep(3); // Move to password reset step
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid OTP');
    }
  };


  const handlePasswordReset = async (e) => {
    e.preventDefault();
    clearMessages();

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/resetPassword', { uid, newPassword });
      setSuccessMessage(response.data.message);
      setStep(4); // Password reset successful, show success message
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

    return (
    <div>
      <h2>Forgot Password</h2>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send OTP</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <div>
            <label>OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handlePasswordReset}>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}

      {step === 4 && <p>Password has been successfully reset!</p>}
    </div>
  );
};

export default ForgotPassword;






