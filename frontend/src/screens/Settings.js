import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore, storage } from '../firebase';
import { Container, Text, Avatar, Group, Divider, Modal, TextInput, PasswordInput, Button } from '@mantine/core';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const Settings = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profilePic, setProfilePic] = useState(null);
    const [nameModalOpen, setNameModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [nameError, setNameError] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser; // Get the currently authenticated user
                if (user) {
                    const userDoc = doc(firestore, 'users', user.uid); // Reference to the user's Firestore document
                    const userSnapshot = await getDoc(userDoc);// Fetch the document

                    if (userSnapshot.exists()) {
                        setUserData(userSnapshot.data()); // Store user data in state
                        setProfilePic(userSnapshot.data().profilePic || null); // Store profile picture URL
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData(); // Invoke the function
    }, []);

    // Handles the selection and upload of a new profile picture
    const handleProfilePicChange = async (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            setProfilePic(URL.createObjectURL(file)); // Display the profile picture in the page

            try {
                const user = auth.currentUser; // Get the currently authenticated user
                const storageRef = ref(storage, `profile_pics/${user.uid}`); // Create a reference in Firebase Storage
                await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
                const downloadURL = await getDownloadURL(storageRef); // Get the download URL

                // Update the user's profile picture URL in Firestore
                await updateDoc(doc(firestore, 'users', user.uid), { profilePic: downloadURL });
                setUserData((prevData) => ({ ...prevData, profilePic: downloadURL })); // Update the state
            } catch (error) {
                console.error("Error saving profile picture:", error);
            }
        }
    };

    // Opens the modal for changing the user's name
    const handleChangeNameClick = () => {
        setNewName(userData.name); // Pre-fill the current name
        setNameModalOpen(true);
    };

    // Saves the new name to Firestore
    const handleSaveName = async () => {
        if (newName.trim() === '') {
            setNameError('Name cannot be empty');
            return;
        }

        try {
            const user = auth.currentUser;
            await updateDoc(doc(firestore, 'users', user.uid), { name: newName });// Update the name in Firestore
            setUserData((prevData) => ({ ...prevData, name: newName })); // Update the local state
            setNameModalOpen(false);
        } catch (error) {
            console.error("Error updating name:", error);
        }
    };

    // Opens the modal for changing the password
    const handleChangePasswordClick = () => {
        
        setPasswordModalOpen(true);

        setCurrentPassword('');
        setNewPassword('');

        setCurrentPasswordError('');
        setNewPasswordError('');
    };

    // Validates the strength of the new password
    const validatePasswordStrength = (password) => {
        // Regex to enforce at least 8 characters, one uppercase, one number, and one special character
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSavePassword = async () => {
        let valid = true; // Flag to track input validity
        setCurrentPasswordError('');// Clear previous error messages
        setNewPasswordError('');

        if (currentPassword.trim() === '') {
            setCurrentPasswordError('Current password is required');
            valid = false;
        }

        if (newPassword.trim() === '') {
            setNewPasswordError('New password is required');
            valid = false;
        } else if (!validatePasswordStrength(newPassword)) {
            setNewPasswordError(
                'Password must be at least 8 characters, include an uppercase letter, a number, and a special character'
            );
            valid = false;
        }

        if (!valid) return;// Stop if validation fails

        const user = auth.currentUser; // Get the currently authenticated user
        // Create credentials for reauthentication, required in firebase for sensitive operation
        //ensures that only the legitimate owner of the account can make critical changes.
        const credential = EmailAuthProvider.credential(user.email, currentPassword); //must know current password

        try {
            await reauthenticateWithCredential(user, credential);// Reauthenticate the user
            await updatePassword(user, newPassword); // Update the user's password
            setPasswordModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Error changing password:", error);
            setCurrentPasswordError('Incorrect current password'); // Set error if reauthentication fails
        }
    };

    // Show a loading message while user data is being fetched
    if (loading) {
        return <Text>Loading...</Text>;
    }

    // Show an error message if no user data is found
    if (!userData) {
        return <Text>No user data found.</Text>;
    }

    return (
        <Container
            fluid
            style={{
                backgroundColor: 'transparent',
                padding: '0px',
                borderRadius: '8px',
                color: '#333',
                width: '',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10px',
            }}
        >
            <div style={{ maxWidth: '100vw', width: '100%', padding: '0px 20px 20px 20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ }}>Profile</h1>

                <Group align="flex-start" spacing="xl">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar src={profilePic} radius="90px" size="xl" style={{ backgroundColor: '#e0e0e0' }} />

                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="upload-profile-pic"
                            onChange={handleProfilePicChange}
                        />

                        <Text
                            size="sm"
                            color="blue"
                            component="label"
                            htmlFor="upload-profile-pic" // Links this label to the input with id="upload-profile-pic"
                            style={{ cursor: 'pointer', marginTop: '10px' }}
                        >
                            Change Profile Picture
                        </Text>
                    </div>

                    <div style={{ flex: 1 }}>
                        <Text size="sm" style={{ color: '#666' }}>Name</Text>
                        <Text size="lg" weight="bold" style={{ color: '#333' }}>{userData.name}</Text>
                        <Text
                            size="sm"
                            color="blue"
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                            onClick={handleChangeNameClick}
                        >
                            Change name
                        </Text>

                        <Divider my="sm" />

                        <Text size="sm" style={{ color: '#666' }}>Email</Text>
                        <Text size="lg" style={{ color: '#333' }}>{userData.email}</Text>

                        <Divider my="sm" />

                        <Text
                            size="sm"
                            color="blue"
                            style={{ cursor: 'pointer', marginTop: '10px' }}
                            onClick={handleChangePasswordClick}
                        >
                            Change password
                        </Text>
                    </div>
                </Group>
            </div>

            {/* Modals for changing name and password */}
            <Modal
                opened={nameModalOpen}
                onClose={() => setNameModalOpen(false)}
                title="Change Name"
            >
                <TextInput
                    label="New Name"
                    placeholder="Enter new name"
                    value={newName}
                    onChange={(e) => {
                        setNewName(e.target.value);
                        setNameError('');
                    }}
                    error={nameError}
                    required
                />
                <Button fullWidth mt="md" color="blue" onClick={handleSaveName}>
                    Save Name
                </Button>
            </Modal>

            <Modal
                opened={passwordModalOpen}
                onClose={() => setPasswordModalOpen(false)}
                title="Change Password"
            >
                <PasswordInput
                    label="Current Password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    error={currentPasswordError}
                    required
                    mt="sm"
                />
                <PasswordInput
                    label="New Password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    error={newPasswordError}
                    required
                    mt="sm"
                />
                <Button fullWidth mt="md" color="blue" onClick={handleSavePassword}>
                    Save Password
                </Button>
            </Modal>
        </Container>
    );
};

export default Settings;










