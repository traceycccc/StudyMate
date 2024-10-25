// // utils/uploadImage.js
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebase';  // Make sure this path points to your firebase config

// export const uploadImageToFirebase = async (file) => {
//     const storageRef = ref(storage, `images/${file.name}`);

//     // Upload the file
//     await uploadBytes(storageRef, file);

//     // Get the download URL after upload
//     const downloadURL = await getDownloadURL(storageRef);

//     return downloadURL;  // Return the URL for the uploaded image
// };



// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebase';  // Assuming your firebase.js is in src

// export const uploadImageToFirebase = async (file) => {
//     // Generate a unique name using timestamp or random string
//     const uniqueFileName = `${Date.now()}-${file.name}`;

//     const storageRef = ref(storage, `images/${uniqueFileName}`);

//     // Upload the file to Firebase Storage
//     await uploadBytes(storageRef, file);

//     // Get the file's download URL
//     const downloadURL = await getDownloadURL(storageRef);

//     return downloadURL;  // Return the URL to be used in the editor
// };



//add delete for storage
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';  // Assuming your firebase.js is in src

export const uploadImageToFirebase = async (file) => {
    // Generate a unique name using timestamp or random string
    const uniqueFileName = `${Date.now()}-${file.name}`;

    const storageRef = ref(storage, `images/${uniqueFileName}`);

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file);

    // Get the file's download URL
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;  // Return the URL to be used in the editor
};

// Function to delete the image from Firebase
export const deleteImageFromFirebase = async (imageUrl) => {
    try {
        const storageRef = ref(storage, imageUrl);  // Get reference by image URL
        await deleteObject(storageRef);  // Delete the object
        console.log('Image deleted from Firebase Storage:', imageUrl);
    } catch (error) {
        console.error('Error deleting image:', error);
    }
};