// import React from 'react';
// import { Button } from '@mantine/core';
// import { useNavigate } from 'react-router-dom';

// const Flashcard = () => {
//     const navigate = useNavigate();

//     return (
//         <div style={{ padding: '20px' }}>
//             {/* Back button to navigate back to the ModuleOverview page */}
//             <Button variant="subtle" onClick={() => navigate(-1)}>
//                 ← Back
//             </Button>

//             <h1>Flashcards</h1> {/* Title of the Flashcard page */}

//             {/* You can add more content or logic here for displaying flashcards */}
//         </div>
//     );
// };

// export default Flashcard;



// import React from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button } from '@mantine/core';

// const Flashcards = () => {
//     const { moduleId } = useParams(); // Get the module ID from the route
//     const navigate = useNavigate(); // Initialize navigate
//     const location = useLocation(); // Access the current location's state

//     // Determine where the user came from
//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>
//             <h1>Flashcards for Module {moduleId}</h1>
//             <p>This is the flashcards page. You can start adding flashcard content here.</p>
//         </div>
//     );
// };

// export default Flashcards;




// import React, { useState } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, Group } from '@mantine/core';
// import TagSection from '../components/TagSection'; // Import the TagSection component

// const Flashcards = () => {
//     const { moduleId } = useParams(); // Get the module ID from the route
//     const navigate = useNavigate(); // Initialize navigate
//     const location = useLocation(); // Access the current location's state

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]); // Store all tag sections

//     // Go Back Button Logic
//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     // Add New Tag Section
//     const handleAddTag = () => {
//         const newTag = {
//             id: Date.now(), // Temporary ID; use a unique ID generator or database ID in production
//             name: newTagName,
//             color: newTagColor,
//             flashcards: [], // Initialize with an empty flashcards array
//         };
//         setTags([...tags, newTag]);
//         setIsModalOpen(false); // Close the modal
//         setNewTagName(''); // Reset the input fields
//         setNewTagColor('#FFFFFF');
//     };

//     // Tag Management Functions
//     const handleEditTag = (tag) => {
//         // Logic to edit tag properties like name and color
//     };

//     const handleDeleteTag = (tagId) => {
//         setTags(tags.filter((tag) => tag.id !== tagId));
//     };

//     const handleAddFlashcard = (tagId) => {
//         // Logic to add flashcards to a specific tag
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             {/* Back Button */}
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             {/* Add New Tag Section Button */}
//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={() => setIsModalOpen(true)}
//             >
//                 + Add Tag Section
//             </Button>

//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => setNewTagName(e.currentTarget.value)}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Tag Sections */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={tag.flashcards}
//                     onEditTag={handleEditTag}
//                     onDeleteTag={handleDeleteTag}
//                     onAddFlashcard={() => handleAddFlashcard(tag.id)}
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;







// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, Group } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase'; // Import firestore
// import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);

//     // Fetch tags from Firebase on component mount
//     useEffect(() => {
//         const tagsRef = collection(firestore, 'tags');
//         const unsubscribe = onSnapshot(tagsRef, (snapshot) => {
//             const fetchedTags = snapshot.docs
//                 .filter((doc) => doc.data().moduleId === moduleId)
//                 .map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         return () => unsubscribe();
//     }, [moduleId]);

//     // Add New Tag Section to Firebase
//     const handleAddTag = async () => {

        

//         // Check if the name is empty
//         if (!newTagName.trim()) {
//             alert("Tag name cannot be empty");
//             return;
//         }

//         // Check for uniqueness within the current module
//         const existingTag = tags.find(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (existingTag) {
//             alert("Tag name already exists in this module");
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName,
//             color: newTagColor,
//             moduleId, // Associate with the current module
//             userId,
//             flashcards: [],
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         // Reset the modal fields after adding
//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//     };

//     // Flashcards.js
//     // Inside Flashcards.js
//     const handleEditTag = async (updatedTag) => {
//          // Ensure the name is non-empty
//         if (!updatedTag.name.trim()) {
//             alert("Tag name cannot be empty");
//             return;
//         }

//         // Check for uniqueness within the current module, excluding the current tag being edited
//         const duplicateTag = tags.find(
//             (tag) =>
//                 tag.name.toLowerCase() === updatedTag.name.trim().toLowerCase() &&
//                 tag.id !== updatedTag.id
//         );
//         if (duplicateTag) {
//             alert("Tag name already exists in this module");
//             return;
//         }

    
//         try {
//             const tagRef = doc(firestore, 'tags', updatedTag.id);
//             await updateDoc(tagRef, {
//                 name: updatedTag.name,
//                 color: updatedTag.color,
//             });
//         } catch (error) {
//             console.error("Error updating tag:", error);
//         }
//     };


//     // Inside Flashcards component
//     const handleDeleteTag = async (tagId) => {
//         try {
//             const tagRef = doc(firestore, 'tags', tagId);
//             await deleteDoc(tagRef); // Delete the document from Firebase
//         } catch (error) {
//             console.error("Error deleting tag:", error);
//         }
//     };

//     const handleAddFlashcard = (tagId) => {
//         // Placeholder function - you may open a modal or handle other logic here
//         console.log(`Adding flashcard to tag with ID: ${tagId}`);
//     };


//     // Go Back Button Logic
//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={() => setIsModalOpen(true)}
//             >
//                 + Add Tag Section
//             </Button>

//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => setNewTagName(e.currentTarget.value)}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={tag.flashcards || []}
//                     onEditTag={(updatedTag) => handleEditTag(updatedTag)}
//                     onDeleteTag={() => handleDeleteTag(tag.id)}
//                     onAddFlashcard={() => handleAddFlashcard(tag.id)}
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;



// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, Group } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [error, setError] = useState(''); // State to store validation errors

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         return () => unsubscribe();
//     }, [moduleId]);

//     // Add New Tag Section with Validation
//     const handleAddTag = async () => {
//         // Check if the name is empty
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         // Check for uniqueness within the current module
//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//             flashcards: [],
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         // Reset modal and error state after adding
//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError(''); // Clear any existing error
//     };

//     const handleEditTag = async (updatedTag) => {
//         // Check if the edited name is empty
//         if (!updatedTag.name.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         // Check for uniqueness within the current module, excluding the current tag's ID
//         const isDuplicate = tags.some(
//             (tag) =>
//                 tag.name.toLowerCase() === updatedTag.name.trim().toLowerCase() &&
//                 tag.id !== updatedTag.id
//         );

//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         try {
//             const tagRef = doc(firestore, 'tags', updatedTag.id);
//             await updateDoc(tagRef, {
//                 name: updatedTag.name.trim(),
//                 color: updatedTag.color,
//             });
//             setError(''); // Clear error on successful update
//         } catch (error) {
//             console.error("Error updating tag:", error);
//             setError('Failed to update tag.');
//         }
//     };

//     // Function to handle deleting a tag from Firebase
//     const handleDeleteTag = async (tagId) => {
//         try {
//             const tagRef = doc(firestore, 'tags', tagId);
//             await deleteDoc(tagRef); // Delete the tag document from Firebase
//         } catch (error) {
//             console.error("Error deleting tag:", error);
//         }
//     };

//     // Placeholder function for adding a flashcard
//     const handleAddFlashcard = (tagId) => {
//         console.log(`Adding flashcard to tag with ID: ${tagId}`);
//         // Implement the flashcard addition logic here or open a modal to add a flashcard
//     };


//     // Go Back Button Logic
//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={() => setIsModalOpen(true)}
//             >
//                 + Add Tag Section
//             </Button>

//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError(''); // Clear error on input change
//                     }}
//                     error={error} // Display error in input field
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={tag.flashcards || []}
//                     onEditTag={(updatedTag) => handleEditTag(updatedTag)}
//                     onDeleteTag={() => handleDeleteTag(tag.id)}
//                     onAddFlashcard={() => handleAddFlashcard(tag.id)}
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;




// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, Group } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [error, setError] = useState(''); // State to store validation errors

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         return () => unsubscribe();
//     }, [moduleId]);

//     // Add New Tag Section with Validation
//     const handleAddTag = async () => {
//         // Check if the name is empty
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         // Check for uniqueness within the current module
//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//             flashcards: [],
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         // Reset modal and error state after adding
//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError(''); // Clear any existing error
//     };

//     // Open Modal with Error Reset
//     const openModal = () => {
//         setIsModalOpen(true);
//         setError(''); // Reset error whenever the modal opens
//     };

//     // Function to handle editing a tag with validation
//     const handleEditTag = async (updatedTag) => {
//         if (!updatedTag.name.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         const isDuplicate = tags.some(
//             (tag) =>
//                 tag.name.toLowerCase() === updatedTag.name.trim().toLowerCase() &&
//                 tag.id !== updatedTag.id
//         );

//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         try {
//             const tagRef = doc(firestore, 'tags', updatedTag.id);
//             await updateDoc(tagRef, {
//                 name: updatedTag.name.trim(),
//                 color: updatedTag.color,
//             });
//             setError(''); // Clear error on successful update
//             setIsEditModalOpen(false); // Close the edit modal after successful update
//         } catch (error) {
//             console.error("Error updating tag:", error);
//             setError('Failed to update tag.');
//         }
//     };

//     // Function to handle deleting a tag from Firebase
//     const handleDeleteTag = async (tagId) => {
//         try {
//             const tagRef = doc(firestore, 'tags', tagId);
//             await deleteDoc(tagRef); // Delete the tag document from Firebase
//         } catch (error) {
//             console.error("Error deleting tag:", error);
//         }
//     };

//     // Placeholder function for adding a flashcard
//     const handleAddFlashcard = (tagId) => {
//         console.log(`Adding flashcard to tag with ID: ${tagId}`);
//         // Implement the flashcard addition logic here or open a modal to add a flashcard
//     };

//     // Go Back Button Logic
//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={openModal}
//             >
//                 + Add Tag Section
//             </Button>

//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setNewTagName(''); // Clear the tag name input when modal is closed
//                     setNewTagColor('#FFFFFF'); // Optionally reset color as well
//                     setError(''); // Reset error on modal close
//                 }}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError(''); // Clear error on input change
//                     }}
//                     error={error} // Display error in input field
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={tag.flashcards || []}
//                     onEditTag={(updatedTag) => handleEditTag(updatedTag)}
//                     onDeleteTag={() => handleDeleteTag(tag.id)}
//                     onAddFlashcard={() => handleAddFlashcard(tag.id)}
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;




// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, Group } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [error, setError] = useState(''); // State to store validation errors

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         return () => unsubscribe();
//     }, [moduleId]);

//     // Add New Tag Section with Validation
//     const handleAddTag = async () => {
//         // Check if the name is empty
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         // Check for uniqueness within the current module
//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//             flashcards: [],
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         // Reset modal and error state after adding
//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError(''); // Clear any existing error
//     };

//     // Open Modal with Error Reset
//     const openModal = () => {
//         setIsModalOpen(true);
//         setError(''); // Reset error whenever the modal opens
//     };

//     // Function to handle editing a tag with validation
//     const handleEditTag = async (updatedTag) => {
//         if (!updatedTag.name.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         const isDuplicate = tags.some(
//             (tag) =>
//                 tag.name.toLowerCase() === updatedTag.name.trim().toLowerCase() &&
//                 tag.id !== updatedTag.id
//         );

//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         try {
//             const tagRef = doc(firestore, 'tags', updatedTag.id);
//             await updateDoc(tagRef, {
//                 name: updatedTag.name.trim(),
//                 color: updatedTag.color,
//             });
//             setError(''); // Clear error on successful update
//             setIsEditModalOpen(false); // Close the edit modal after successful update
//         } catch (error) {
//             console.error("Error updating tag:", error);
//             setError('Failed to update tag.');
//         }
//     };

//     // Function to handle deleting a tag from Firebase
//     const handleDeleteTag = async (tagId) => {
//         try {
//             const tagRef = doc(firestore, 'tags', tagId);
//             await deleteDoc(tagRef); // Delete the tag document from Firebase
//         } catch (error) {
//             console.error("Error deleting tag:", error);
//         }
//     };

//     // Placeholder function for adding a flashcard
//     const handleAddFlashcard = (tagId) => {
//         console.log(`Adding flashcard to tag with ID: ${tagId}`);
//         // Implement the flashcard addition logic here or open a modal to add a flashcard
//     };

//     // Go Back Button Logic
//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={openModal}
//             >
//                 + Add Tag Section
//             </Button>

//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setNewTagName(''); // Clear the tag name input when modal is closed
//                     setNewTagColor('#FFFFFF'); // Optionally reset color as well
//                     setError(''); // Reset error on modal close
//                 }}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Names"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError(''); // Clear error on input change
//                     }}
//                     error={error} // Display error in input field
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={tag.flashcards || []}
//                     onEditTag={(updatedTag) => handleEditTag(updatedTag)}
//                     onDeleteTag={() => handleDeleteTag(tag.id)}
//                     onAddFlashcard={() => handleAddFlashcard(tag.id)}
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;








// //fixed both 
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, Group } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         return () => unsubscribe();
//     }, [moduleId]);

//     // Add New Tag Section with Validation
//     const handleAddTag = async () => {
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//             flashcards: [],
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError('');
//     };

//     // Open Modal with Error Reset
//     const openModal = () => {
//         setIsModalOpen(true);
//         setError('');
//     };

//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={openModal}
//             >
//                 + Add Tag Section
//             </Button>

//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setNewTagName('');
//                     setNewTagColor('#FFFFFF');
//                     setError('');
//                 }}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={tag.flashcards || []}
//                     allTags={tags}
//                     onEditTag={() => setTags((prevTags) => [...prevTags])} // optional callback to refresh
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;







//fixing display flashcard
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, Group } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [flashcardsByTag, setFlashcardsByTag] = useState({});
//     const [error, setError] = useState('');

//     // useEffect(() => {
//     //     const userId = auth.currentUser?.uid;
//     //     const tagsRef = collection(firestore, 'tags');
//     //     const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//     //     const unsubscribe = onSnapshot(q, (snapshot) => {
//     //         const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     //         setTags(fetchedTags);
//     //     });

//     //     return () => unsubscribe();
//     // }, [moduleId]);


//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeTags = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         // Fetch all flashcards grouped by tagId
//         const flashcardsRef = collection(firestore, 'flashcards');
//         const qFlashcards = query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeFlashcards = onSnapshot(qFlashcards, (snapshot) => {
//             const flashcards = {};
//             snapshot.docs.forEach((doc) => {
//                 const flashcard = { id: doc.id, ...doc.data() };
//                 const tagId = flashcard.tagId;
//                 if (!flashcards[tagId]) {
//                     flashcards[tagId] = [];
//                 }
//                 flashcards[tagId].push(flashcard);
//             });
//             setFlashcardsByTag(flashcards);
//         });

//         return () => {
//             unsubscribeTags();
//             unsubscribeFlashcards();
//         };
//     }, [moduleId]);

//     // Add New Tag Section with Validation
//     const handleAddTag = async () => {
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError('');
//     };

//     // Open Modal with Error Reset
//     const openModal = () => {
//         setIsModalOpen(true);
//         setError('');
//     };

//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={openModal}
//             >
//                 + Add Tag Section
//             </Button>

//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setNewTagName('');
//                     setNewTagColor('#FFFFFF');
//                     setError('');
//                 }}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={flashcardsByTag[tag.id] || []} // Pass flashcards by tagId
//                     allTags={tags}
//                     onEditTag={() => setTags((prevTags) => [...prevTags])} // optional callback to refresh
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;





// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, Group } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [flashcardsByTag, setFlashcardsByTag] = useState({});
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeTags = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         // Fetch all flashcards grouped by tagId
//         const flashcardsRef = collection(firestore, 'flashcards');
//         const qFlashcards = query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeFlashcards = onSnapshot(qFlashcards, (snapshot) => {
//             const flashcards = {};
//             snapshot.docs.forEach((doc) => {
//                 const flashcard = { id: doc.id, ...doc.data() };
//                 const tagId = flashcard.tagId;
//                 if (!flashcards[tagId]) {
//                     flashcards[tagId] = [];
//                 }
//                 flashcards[tagId].push(flashcard);
//             });
//             setFlashcardsByTag(flashcards);
//         });

//         return () => {
//             unsubscribeTags();
//             unsubscribeFlashcards();
//         };
//     }, [moduleId]);

//     // Add New Tag Section with Validation
//     const handleAddTag = async () => {
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError('');
//     };

//     // Open Modal with Error Reset
//     const openModal = () => {
//         setIsModalOpen(true);
//         setError('');
//     };

//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={openModal}
//             >
//                 + Add Tag Section
//             </Button>

//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setNewTagName('');
//                     setNewTagColor('#FFFFFF');
//                     setError('');
//                 }}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={flashcardsByTag[tag.id] || []} // Pass flashcards by tagId
//                     allTags={tags}
//                     onEditTag={() => setTags((prevTags) => [...prevTags])} // optional callback to refresh
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;




//add test button
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, Group, Checkbox, NumberInput, Text } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isTestModalOpen, setIsTestModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [flashcardsByTag, setFlashcardsByTag] = useState({});
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [numberOfFlashcards, setNumberOfFlashcards] = useState(1);
//     const [totalFlashcardsAvailable, setTotalFlashcardsAvailable] = useState(0);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeTags = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         // Fetch all flashcards grouped by tagId
//         const flashcardsRef = collection(firestore, 'flashcards');
//         const qFlashcards = query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeFlashcards = onSnapshot(qFlashcards, (snapshot) => {
//             const flashcards = {};
//             snapshot.docs.forEach((doc) => {
//                 const flashcard = { id: doc.id, ...doc.data() };
//                 const tagId = flashcard.tagId;
//                 if (!flashcards[tagId]) {
//                     flashcards[tagId] = [];
//                 }
//                 flashcards[tagId].push(flashcard);
//             });
//             setFlashcardsByTag(flashcards);
//         });

//         return () => {
//             unsubscribeTags();
//             unsubscribeFlashcards();
//         };
//     }, [moduleId]);

//     useEffect(() => {
//         // Update the total flashcards available whenever selectedTags changes
//         if (selectedTags.length > 0) {
//             const total = selectedTags.reduce((acc, tagId) => {
//                 return acc + (flashcardsByTag[tagId]?.length || 0);
//             }, 0);
//             setTotalFlashcardsAvailable(total);
//         } else {
//             setTotalFlashcardsAvailable(0);
//         }
//     }, [selectedTags, flashcardsByTag]);

//     // Add New Tag Section with Validation
//     const handleAddTag = async () => {
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError('');
//     };

//     // Start Flashcard Test
//     const handleStartTest = () => {
//         if (selectedTags.length === 0 || numberOfFlashcards <= 0) {
//             setError('Please select tags and specify a valid number of flashcards to test.');
//             return;
//         }

//         // Gather all flashcards from selected tags
//         const selectedFlashcards = selectedTags.flatMap(tagId => flashcardsByTag[tagId] || []);

//         if (selectedFlashcards.length < numberOfFlashcards) {
//             setError('Not enough flashcards available for the test.');
//             return;
//         }

//         // Shuffle and pick the specified number of flashcards
//         const shuffledFlashcards = [...selectedFlashcards].sort(() => 0.5 - Math.random());
//         const flashcardsForTest = shuffledFlashcards.slice(0, numberOfFlashcards);

//         // Console log for testing purposes
//         console.log('Flashcards selected for the test:', flashcardsForTest);

//         // TODO: Proceed with implementing the test session logic
//         setIsTestModalOpen(false);
//     };

//     const openTestModal = () => {
//         setIsTestModalOpen(true);
//         setError('');
//     };

//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
//                 <Button color="teal" size="md" onClick={openTestModal}>
//                     Start Test
//                 </Button>
//                 <Button
//                     color="blue"
//                     size="md"
//                     onClick={() => setIsModalOpen(true)}
//                 >
//                     + Add Tag Section
//                 </Button>
//             </div>

//             {/* Modal for Flashcard Test Settings */}
//             <Modal
//                 opened={isTestModalOpen}
//                 onClose={() => {
//                     setIsTestModalOpen(false);
//                     setError('');
//                 }}
//                 title="Test Settings"
//             >
//                 <div style={{ marginBottom: '20px' }}>
//                     <Text>Number of flashcards</Text>
//                     <NumberInput
//                         value={numberOfFlashcards}
//                         onChange={(val) => setNumberOfFlashcards(val)}
//                         min={1}
//                         max={totalFlashcardsAvailable}
//                         step={1}
//                         disabled={totalFlashcardsAvailable === 0}
//                     />
//                     <Text size="xs" style={{ color: '#6e6e6e' }}>
//                         Available: {totalFlashcardsAvailable}
//                     </Text>
//                 </div>

//                 <div style={{ marginBottom: '20px' }}>
//                     <Text>Select Tags to Test</Text>
//                     {tags.map(tag => (
//                         <Checkbox
//                             key={tag.id}
//                             label={tag.name}
//                             value={tag.id}
//                             checked={selectedTags.includes(tag.id)}
//                             onChange={(e) => {
//                                 const { checked, value } = e.currentTarget;
//                                 setSelectedTags(prevTags =>
//                                     checked
//                                         ? [...prevTags, value]
//                                         : prevTags.filter(tagId => tagId !== value)
//                                 );
//                             }}
//                             style={{ marginTop: '10px' }}
//                         />
//                     ))}
//                 </div>

//                 {error && <Text color="red" style={{ marginBottom: '10px' }}>{error}</Text>}

//                 <Group position="right">
//                     <Button onClick={handleStartTest} disabled={selectedTags.length === 0 || numberOfFlashcards <= 0}>
//                         Start Test
//                     </Button>
//                 </Group>
//             </Modal>

//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setNewTagName('');
//                     setNewTagColor('#FFFFFF');
//                     setError('');
//                 }}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={flashcardsByTag[tag.id] || []} // Pass flashcards by tagId
//                     allTags={tags}
//                     onEditTag={() => setTags((prevTags) => [...prevTags])} // optional callback to refresh
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;




// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, Checkbox, Group, NumberInput, Text, Divider } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [flashcardsByTag, setFlashcardsByTag] = useState({});
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [numberOfFlashcards, setNumberOfFlashcards] = useState(1);
//     const [maxFlashcards, setMaxFlashcards] = useState(0);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeTags = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         // Fetch all flashcards grouped by tagId
//         const flashcardsRef = collection(firestore, 'flashcards');
//         const qFlashcards = query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeFlashcards = onSnapshot(qFlashcards, (snapshot) => {
//             const flashcards = {};
//             snapshot.docs.forEach((doc) => {
//                 const flashcard = { id: doc.id, ...doc.data() };
//                 const tagId = flashcard.tagId;
//                 if (!flashcards[tagId]) {
//                     flashcards[tagId] = [];
//                 }
//                 flashcards[tagId].push(flashcard);
//             });
//             setFlashcardsByTag(flashcards);
//         });

//         return () => {
//             unsubscribeTags();
//             unsubscribeFlashcards();
//         };
//     }, [moduleId]);

//     const handleAddTag = async () => {
//         // Tag addition logic...
//     };

//     // Handle Start Test - Opening the Modal
//     const handleOpenTestModal = () => {
//         setIsModalOpen(true);
//         setError('');
//     };

//     // Handle Tag Selection Change
//     const handleTagSelection = (tagId) => {
//         const updatedTags = selectedTags.includes(tagId)
//             ? selectedTags.filter((id) => id !== tagId)
//             : [...selectedTags, tagId];

//         setSelectedTags(updatedTags);

//         // Update max number of flashcards available
//         const selectedFlashcards = updatedTags.flatMap(tag => flashcardsByTag[tag] || []);
//         setMaxFlashcards(selectedFlashcards.length);
//         setNumberOfFlashcards(1); // Reset to minimum
//     };

//     // Handle Starting Test Session
//     const handleStartTestSession = () => {
//         if (selectedTags.length === 0 || numberOfFlashcards === 0) {
//             setError('Please select at least one tag and specify the number of flashcards to test.');
//             return;
//         }

//         const selectedFlashcards = selectedTags.flatMap(tag => flashcardsByTag[tag] || []);
//         if (selectedFlashcards.length < numberOfFlashcards) {
//             setError('Not enough flashcards available for the test.');
//             return;
//         }

//         // Shuffle and pick the specified number of flashcards
//         const shuffledFlashcards = [...selectedFlashcards].sort(() => 0.5 - Math.random());
//         const flashcardsForTest = shuffledFlashcards.slice(0, numberOfFlashcards);

//         console.log('Flashcards selected for the test:', flashcardsForTest);

//         // TODO: Implement the actual test session
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
//                 <Button color="blue" size="md" onClick={() => setIsModalOpen(true)}>
//                     + Add Tag Section
//                 </Button>
//                 <Button color="teal" size="md" onClick={handleOpenTestModal}>
//                     Start Test
//                 </Button>
//             </div>

//             {/* Modal for Flashcard Test Settings */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => setIsModalOpen(false)}
//                 title="Test Settings"
//             >
//                 <Divider label="Number of Flashcards" />
//                 <NumberInput
//                     value={numberOfFlashcards}
//                     onChange={(value) => setNumberOfFlashcards(value)}
//                     min={1}
//                     max={maxFlashcards}
//                     step={1}
//                     styles={{ input: { textAlign: 'center' } }}
//                     rightSection={<Text>{` / ${maxFlashcards}`}</Text>}
//                     style={{ marginBottom: '20px', marginTop: '10px' }}
//                 />

//                 <Divider label="Tags" />
//                 <div style={{ marginBottom: '20px' }}>
//                     {tags.map(tag => (
//                         <Checkbox
//                             key={tag.id}
//                             label={tag.name}
//                             checked={selectedTags.includes(tag.id)}
//                             onChange={() => handleTagSelection(tag.id)}
//                             style={{ marginBottom: '10px' }}
//                         />
//                     ))}
//                 </div>

//                 {error && <p style={{ color: 'red' }}>{error}</p>}

//                 <Group position="right">
//                     <Button onClick={handleStartTestSession}>Start Test Session</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={flashcardsByTag[tag.id] || []}
//                     allTags={tags}
//                     onEditTag={() => setTags((prevTags) => [...prevTags])}
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;





// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, CheckboxGroup, Checkbox, Group } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isTestModalOpen, setIsTestModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [flashcardsByTag, setFlashcardsByTag] = useState({});
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [numFlashcards, setNumFlashcards] = useState(0);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeTags = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         // Fetch all flashcards grouped by tagId
//         const flashcardsRef = collection(firestore, 'flashcards');
//         const qFlashcards = query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeFlashcards = onSnapshot(qFlashcards, (snapshot) => {
//             const flashcards = {};
//             snapshot.docs.forEach((doc) => {
//                 const flashcard = { id: doc.id, ...doc.data() };
//                 const tagId = flashcard.tagId;
//                 if (!flashcards[tagId]) {
//                     flashcards[tagId] = [];
//                 }
//                 flashcards[tagId].push(flashcard);
//             });
//             setFlashcardsByTag(flashcards);
//         });

//         return () => {
//             unsubscribeTags();
//             unsubscribeFlashcards();
//         };
//     }, [moduleId]);

//     // Add New Tag Section with Validation
//     const handleAddTag = async () => {
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError('');
//     };

//     // Logic to select flashcards for the test session
//     const handleStartTest = () => {
//         if (selectedTags.length === 0 || numFlashcards <= 0) {
//             console.error("Please select tags and specify a valid number of flashcards.");
//             return;
//         }

//         let availableFlashcards = [];
//         selectedTags.forEach(tagId => {
//             if (flashcardsByTag[tagId]) {
//                 availableFlashcards = availableFlashcards.concat(flashcardsByTag[tagId]);
//             }
//         });

//         if (availableFlashcards.length < numFlashcards) {
//             console.error("Not enough flashcards available.");
//             return;
//         }

//         // Shuffle and pick flashcards
//         const shuffledFlashcards = availableFlashcards.sort(() => 0.5 - Math.random());
//         const selectedFlashcards = shuffledFlashcards.slice(0, numFlashcards);

//         console.log("Selected Flashcards for Test:", selectedFlashcards);
//         setIsTestModalOpen(false);
//     };

//     // Open Modal with Error Reset
//     const openModal = () => {
//         setIsModalOpen(true);
//         setError('');
//     };

//     const openTestModal = () => {
//         setIsTestModalOpen(true);
//     };

//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Group position="apart" style={{ marginBottom: '20px' }}>
//                 <Button color="blue" size="md" onClick={openModal}>
//                     + Add Tag Section
//                 </Button>
//                 <Button color="green" size="md" onClick={openTestModal}>
//                     Start Test
//                 </Button>
//             </Group>

//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setNewTagName('');
//                     setNewTagColor('#FFFFFF');
//                     setError('');
//                 }}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Modal for Test Settings */}
//             <Modal
//                 opened={isTestModalOpen}
//                 onClose={() => setIsTestModalOpen(false)}
//                 title="Test Settings"
//             >
//                 <CheckboxGroup
//                     label="Select Tags to Test"
//                     value={selectedTags}
//                     onChange={setSelectedTags}
//                 >
//                     {tags.map((tag) => (
//                         <Checkbox key={tag.id} value={tag.id} label={tag.name} />
//                     ))}
//                 </CheckboxGroup>
//                 <TextInput
//                     label="Number of Flashcards"
//                     type="number"
//                     value={numFlashcards}
//                     onChange={(e) => setNumFlashcards(parseInt(e.currentTarget.value))}
//                     placeholder={`Enter number (Max: ${Object.values(flashcardsByTag).flat().length})`}
//                     style={{ marginTop: '20px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleStartTest}>Start Test</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={flashcardsByTag[tag.id] || []} // Pass flashcards by tagId
//                     allTags={tags}
//                     onEditTag={() => setTags((prevTags) => [...prevTags])} // optional callback to refresh
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;




// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, Group, Checkbox, NumberInput } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isTestModalOpen, setIsTestModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [flashcardsByTag, setFlashcardsByTag] = useState({});
//     const [flashcardsToTest, setFlashcardsToTest] = useState(0);
//     const [totalAvailableFlashcards, setTotalAvailableFlashcards] = useState(0); // New state for total flashcards
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeTags = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         // Fetch all flashcards grouped by tagId
//         const flashcardsRef = collection(firestore, 'flashcards');
//         const qFlashcards = query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeFlashcards = onSnapshot(qFlashcards, (snapshot) => {
//             const flashcards = {};
//             snapshot.docs.forEach((doc) => {
//                 const flashcard = { id: doc.id, ...doc.data() };
//                 const tagId = flashcard.tagId;
//                 if (!flashcards[tagId]) {
//                     flashcards[tagId] = [];
//                 }
//                 flashcards[tagId].push(flashcard);
//             });
//             setFlashcardsByTag(flashcards);
//         });

//         return () => {
//             unsubscribeTags();
//             unsubscribeFlashcards();
//         };
//     }, [moduleId]);

//     const handleTagSelectionChange = (tagId) => {
//         setSelectedTags((prevSelectedTags) => {
//             let newSelectedTags;
//             if (prevSelectedTags.includes(tagId)) {
//                 newSelectedTags = prevSelectedTags.filter((id) => id !== tagId);
//             } else {
//                 newSelectedTags = [...prevSelectedTags, tagId];
//             }

//             // Calculate the total available flashcards for the new selection
//             const availableFlashcards = newSelectedTags.reduce(
//                 (acc, tagId) => acc + (flashcardsByTag[tagId]?.length || 0),
//                 0
//             );

//             console.log('Total available flashcards for selected tags:', availableFlashcards); // Log for checking
//             setTotalAvailableFlashcards(availableFlashcards);

//             return newSelectedTags;
//         });
//     };

//     const handleAddTag = async () => {
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError('');
//     };

//     const openModal = () => {
//         setIsModalOpen(true);
//         setError('');
//     };

//     const openTestModal = () => {
//         setIsTestModalOpen(true);
//         setTotalAvailableFlashcards(0); // Reset total when opening modal
//         setSelectedTags([]); // Reset selected tags
//     };

//     const handleTestSettingsSubmit = () => {
//         if (selectedTags.length === 0) {
//             alert('Please select at least one tag.');
//             return;
//         }

//         if (flashcardsToTest < 1 || flashcardsToTest > totalAvailableFlashcards) {
//             alert(`Please enter a number between 1 and ${totalAvailableFlashcards}.`);
//             return;
//         }

//         // Fetch flashcards randomly from each selected tag
//         const selectedFlashcards = [];
//         selectedTags.forEach((tagId) => {
//             const flashcards = flashcardsByTag[tagId] || [];
//             const count = Math.min(flashcards.length, Math.floor(flashcardsToTest / selectedTags.length));
//             selectedFlashcards.push(...flashcards.sort(() => 0.5 - Math.random()).slice(0, count));
//         });

//         console.log('Flashcards selected for test:', selectedFlashcards);
//         setIsTestModalOpen(false);
//     };

//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px', marginRight: '10px' }}
//                 onClick={openModal}
//             >
//                 + Add Tag Section
//             </Button>

//             <Button
//                 color="green"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={openTestModal}
//             >
//                 Start Test
//             </Button>

//             <Modal
//                 opened={isTestModalOpen}
//                 onClose={() => setIsTestModalOpen(false)}
//                 title="Test Settings"
//             >
//                 <div>
//                     {tags.map((tag) => (
//                         <Checkbox
//                             key={tag.id}
//                             label={tag.name}
//                             checked={selectedTags.includes(tag.id)}
//                             onChange={() => handleTagSelectionChange(tag.id)}
//                         />
//                     ))}
//                 </div>
//                 <NumberInput
//                     label={`Number of Flashcards to Test (Available: ${totalAvailableFlashcards})`} // Display available count
//                     value={flashcardsToTest}
//                     onChange={setFlashcardsToTest}
//                     min={1}
//                     max={totalAvailableFlashcards}
//                     required
//                     style={{ marginTop: '20px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleTestSettingsSubmit}>Start Test</Button>
//                 </Group>
//             </Modal>

//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setNewTagName('');
//                     setNewTagColor('#FFFFFF');
//                     setError('');
//                 }}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={flashcardsByTag[tag.id] || []}
//                     allTags={tags}
//                     onEditTag={() => setTags((prevTags) => [...prevTags])}
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;




import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button, Modal, TextInput, ColorInput, Group, Checkbox, NumberInput } from '@mantine/core';
import TagSection from '../components/TagSection';
import { firestore, auth } from '../firebase';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

const Flashcards = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('#FFFFFF');
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [flashcardsByTag, setFlashcardsByTag] = useState({});
    const [flashcardsToTest, setFlashcardsToTest] = useState(0);
    const [totalAvailableFlashcards, setTotalAvailableFlashcards] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = auth.currentUser?.uid;

        // Load tags for this module
        const tagsRef = collection(firestore, 'tags');
        const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
        const unsubscribeTags = onSnapshot(q, (snapshot) => {
            const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTags(fetchedTags);
            console.log("Tags loaded:", fetchedTags); // Log tags
        });

        // Load flashcards and group them by tagId
        const flashcardsRef = collection(firestore, 'flashcards');
        const qFlashcards = query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
        const unsubscribeFlashcards = onSnapshot(qFlashcards, (snapshot) => {
            const flashcards = {};

            snapshot.docs.forEach((doc) => {
                const flashcard = { id: doc.id, ...doc.data() };
                const tagId = flashcard.tagId;  // This associates the flashcard with a tag

                // Group flashcards under their tagId
                if (!flashcards[tagId]) {
                    flashcards[tagId] = [];
                }
                flashcards[tagId].push(flashcard);
            });

            setFlashcardsByTag(flashcards);
            console.log("Flashcards by tag loaded:", flashcards); // Log flashcards by tag to verify structure
        });

        return () => {
            unsubscribeTags();
            unsubscribeFlashcards();
        };
    }, [moduleId]);


    useEffect(() => {
        // Log flashcardsByTag whenever it changes
        console.log("Updated flashcardsByTag:", flashcardsByTag);
    }, [flashcardsByTag]);

    const handleTagSelectionChange = (tagId) => {
        setSelectedTags((prevSelectedTags) => {
            let newSelectedTags;
            if (prevSelectedTags.includes(tagId)) {
                newSelectedTags = prevSelectedTags.filter((id) => id !== tagId);
            } else {
                newSelectedTags = [...prevSelectedTags, tagId];
            }

            // Calculate the total available flashcards for the new selection
            const availableFlashcards = newSelectedTags.reduce(
                (acc, tagId) => acc + (flashcardsByTag[tagId]?.length || 0),
                0
            );

            console.log('Selected tags:', newSelectedTags); // Log selected tags
            console.log('Total available flashcards for selected tags:', availableFlashcards); // Log available flashcards

            setTotalAvailableFlashcards(availableFlashcards);

            return newSelectedTags;
        });
    };

    const handleAddTag = async () => {
        if (!newTagName.trim()) {
            setError('Tag name cannot be empty.');
            return;
        }

        const isDuplicate = tags.some(
            (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
        );
        if (isDuplicate) {
            setError('Tag name must be unique within this module.');
            return;
        }

        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.error("User not logged in.");
            return;
        }

        const newTag = {
            name: newTagName.trim(),
            color: newTagColor,
            moduleId,
            userId,
        };

        await addDoc(collection(firestore, 'tags'), newTag);

        setIsModalOpen(false);
        setNewTagName('');
        setNewTagColor('#FFFFFF');
        setError('');
    };

    const openModal = () => {
        setIsModalOpen(true);
        setError('');
    };

    const openTestModal = () => {
        setIsTestModalOpen(true);
        setTotalAvailableFlashcards(0); // Reset total when opening modal
        setSelectedTags([]); // Reset selected tags
    };

    const handleTestSettingsSubmit = () => {
        if (selectedTags.length === 0) {
            alert('Please select at least one tag.');
            return;
        }

        if (flashcardsToTest < 1 || flashcardsToTest > totalAvailableFlashcards) {
            alert(`Please enter a number between 1 and ${totalAvailableFlashcards}.`);
            return;
        }

        // Fetch flashcards randomly from each selected tag
        const selectedFlashcards = [];
        selectedTags.forEach((tagId) => {
            const flashcards = flashcardsByTag[tagId] || [];
            const count = Math.min(flashcards.length, Math.floor(flashcardsToTest / selectedTags.length));
            selectedFlashcards.push(...flashcards.sort(() => 0.5 - Math.random()).slice(0, count));
        });

        console.log('Flashcards selected for test:', selectedFlashcards);
        setIsTestModalOpen(false);
    };

    const goBack = () => {
        if (location.state?.from === 'module-overview') {
            navigate(`/modules/${moduleId}/overview`);
        } else {
            navigate('/modules');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Button variant="subtle" onClick={goBack}>
                ← Back
            </Button>

            <h1>Flashcards for Module {moduleId}</h1>

            <Button
                color="blue"
                size="md"
                style={{ marginBottom: '20px', marginRight: '10px' }}
                onClick={openModal}
            >
                + Add Tag Section
            </Button>

            <Button
                color="green"
                size="md"
                style={{ marginBottom: '20px' }}
                onClick={openTestModal}
            >
                Start Test
            </Button>

            <Modal
                opened={isTestModalOpen}
                onClose={() => setIsTestModalOpen(false)}
                title="Test Settings"
            >
                <div>
                    {tags.map((tag) => (
                        <Checkbox
                            key={tag.id}
                            label={tag.name}
                            checked={selectedTags.includes(tag.id)}
                            onChange={() => handleTagSelectionChange(tag.id)}
                        />
                    ))}
                </div>
                <NumberInput
                    label={`Number of Flashcards to Test (Available: ${totalAvailableFlashcards})`} // Display available count
                    value={flashcardsToTest}
                    onChange={setFlashcardsToTest}
                    min={1}
                    max={totalAvailableFlashcards}
                    required
                    style={{ marginTop: '20px' }}
                />
                <Group position="right" style={{ marginTop: '20px' }}>
                    <Button onClick={handleTestSettingsSubmit}>Start Test</Button>
                </Group>
            </Modal>

            <Modal
                opened={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setNewTagName('');
                    setNewTagColor('#FFFFFF');
                    setError('');
                }}
                title="Create New Tag Section"
            >
                <TextInput
                    label="Tag Name"
                    placeholder="Enter tag name"
                    value={newTagName}
                    onChange={(e) => {
                        setNewTagName(e.currentTarget.value);
                        setError('');
                    }}
                    error={error}
                    required
                />
                <ColorInput
                    label="Tag Color"
                    value={newTagColor}
                    onChange={setNewTagColor}
                    placeholder="Choose color or enter hex code"
                    required
                    style={{ marginTop: '10px' }}
                />
                <Group position="right" style={{ marginTop: '20px' }}>
                    <Button onClick={handleAddTag}>Add Tag</Button>
                </Group>
            </Modal>

            {tags.map((tag) => (
                <TagSection
                    key={tag.id}
                    tag={tag}
                    flashcards={flashcardsByTag[tag.id] || []}
                    allTags={tags}
                    onEditTag={() => setTags((prevTags) => [...prevTags])}
                />
            ))}
        </div>
    );
};

export default Flashcards;








