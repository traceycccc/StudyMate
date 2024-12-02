import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';  // Assuming your firebase.js is in src


// function to add the image into firebase storage
export const uploadImageToFirebase = async (file) => {
    // Generate a unique name using timestamp and the file's original name
    const uniqueFileName = `${Date.now()}-${file.name}`;

    //Generate a Firebase Storage reference in the images/ directory with the unique file name.
    const storageRef = ref(storage, `images/${uniqueFileName}`);

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get the file's download URL
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;  // Return the URL to be used in the editor
};

// Function to delete the image from Firebase storage
export const deleteImageFromFirebase = async (imageUrl) => {
    try {
        const storageRef = ref(storage, imageUrl);  // Get reference by image URL
        await deleteObject(storageRef);  // Delete the object
        console.log('Image deleted from Firebase Storage:', imageUrl);
    } catch (error) {
        console.error('Error deleting image:', error);
    }
};