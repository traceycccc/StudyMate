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








//fixed both 
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button, Modal, TextInput, ColorInput, Group } from '@mantine/core';
import TagSection from '../components/TagSection';
import { firestore, auth } from '../firebase';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

const Flashcards = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('#FFFFFF');
    const [tags, setTags] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        const tagsRef = collection(firestore, 'tags');
        const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTags(fetchedTags);
        });

        return () => unsubscribe();
    }, [moduleId]);

    // Add New Tag Section with Validation
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
            flashcards: [],
        };

        await addDoc(collection(firestore, 'tags'), newTag);

        setIsModalOpen(false);
        setNewTagName('');
        setNewTagColor('#FFFFFF');
        setError('');
    };

    // Open Modal with Error Reset
    const openModal = () => {
        setIsModalOpen(true);
        setError('');
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
                style={{ marginBottom: '20px' }}
                onClick={openModal}
            >
                + Add Tag Section
            </Button>

            {/* Modal to Create New Tag Section */}
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

            {/* Render each TagSection */}
            {tags.map((tag) => (
                <TagSection
                    key={tag.id}
                    tag={tag}
                    flashcards={tag.flashcards || []}
                    allTags={tags}
                    onEditTag={() => setTags((prevTags) => [...prevTags])} // optional callback to refresh
                />
            ))}
        </div>
    );
};

export default Flashcards;
