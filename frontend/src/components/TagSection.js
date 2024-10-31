// import React, { useState } from 'react';
// import { Card, ActionIcon, Menu, Collapse, Progress } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardCard from './FlashcardCard'; // Import the FlashcardCard component

// const TagSection = ({ tag, flashcards, onEditTag, onDeleteTag, onAddFlashcard }) => {
//     const [opened, setOpened] = useState(false); // Track collapse state

//     // Calculate progress (number of completed flashcards out of total)
//     const completedCount = flashcards.filter((fc) => fc.completed).length;
//     const totalFlashcards = flashcards.length;
//     const progressPercentage = totalFlashcards > 0 ? (completedCount / totalFlashcards) * 100 : 0;

//     return (
//         <div style={{ marginBottom: '20px' }}>
//             {/* Tag Header (clickable for collapsibility) */}
//             <Card
//                 onClick={() => setOpened(!opened)}
//                 style={{
//                     backgroundColor: tag.color,
//                     padding: '15px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                 }}
//             >
//                 <h3>{tag.name}</h3>

//                 {/* Three-dot Menu */}
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEditTag(tag)}>Edit Tag Name</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDeleteTag(tag.id)}>
//                             Delete Tag
//                         </Menu.Item>
//                         <Menu.Item onClick={() => onAddFlashcard(tag.id)}>Add Flashcard</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </Card>

//             {/* Progress Tracking */}
//             <div style={{ marginTop: '10px', padding: '0 15px' }}>
//                 <p>Progress: {completedCount}/{totalFlashcards} flashcards completed</p>
//                 <Progress value={progressPercentage} />
//             </div>

//             {/* Collapsible Flashcard List */}
//             <Collapse in={opened}>
//                 <div style={{ padding: '10px 15px' }}>
//                     {flashcards.map((flashcard) => (
//                         <FlashcardCard key={flashcard.id} flashcard={flashcard} />
//                     ))}
//                 </div>
//             </Collapse>
//         </div>
//     );
// };

// export default TagSection;



// import React, { useState } from 'react';
// import { Card, ActionIcon, Menu, Collapse, Progress, Modal, TextInput, ColorInput, Button, Group } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardCard from './FlashcardCard';

// const TagSection = ({ tag, flashcards, onEditTag, onDeleteTag, onAddFlashcard }) => {
//     const [opened, setOpened] = useState(false); // Toggle for collapse
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Toggle for edit modal
//     const [editedTagName, setEditedTagName] = useState(tag.name); // Store edited name
//     const [editedTagColor, setEditedTagColor] = useState(tag.color); // Store edited color

//     const completedCount = flashcards.filter((fc) => fc.completed).length;
//     const totalFlashcards = flashcards.length;
//     const progressPercentage = totalFlashcards > 0 ? (completedCount / totalFlashcards) * 100 : 0;

//     // Open edit modal with current tag details
//     const handleOpenEditModal = () => {
//         setEditedTagName(tag.name);
//         setEditedTagColor(tag.color);
//         setIsEditModalOpen(true);
//     };

//     // Save changes to the tag
//     const handleSaveChanges = () => {
//         onEditTag({
//             ...tag,
//             name: editedTagName,
//             color: editedTagColor,
//         });
//         setIsEditModalOpen(false); // Close the modal
//     };

//     return (
//         <div style={{ marginBottom: '20px' }}>
//             {/* Tag Header */}
//             <Card
//                 onClick={() => setOpened(!opened)}
//                 style={{
//                     backgroundColor: tag.color,
//                     padding: '15px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                 }}
//             >
//                 <h3>{tag.name}</h3>

//                 {/* Three-dot Menu */}
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={handleOpenEditModal}>Edit Tag</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDeleteTag(tag.id)}>
//                             Delete Tag
//                         </Menu.Item>
//                         <Menu.Item onClick={() => onAddFlashcard(tag.id)}>Add Flashcard</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </Card>

//             {/* Progress Tracking */}
//             <div style={{ marginTop: '10px', padding: '0 15px' }}>
//                 <p>Progress: {completedCount}/{totalFlashcards} flashcards completed</p>
//                 <Progress value={progressPercentage} />
//             </div>

//             {/* Collapsible Flashcard List */}
//             <Collapse in={opened}>
//                 <div style={{ padding: '10px 15px' }}>
//                     {flashcards.map((flashcard) => (
//                         <FlashcardCard key={flashcard.id} flashcard={flashcard} />
//                     ))}
//                 </div>
//             </Collapse>

//             {/* Edit Tag Modal */}
//             <Modal
//                 opened={isEditModalOpen}
//                 onClose={() => setIsEditModalOpen(false)}
//                 title="Edit Tag"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={editedTagName}
//                     onChange={(e) => setEditedTagName(e.currentTarget.value)}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={editedTagColor}
//                     onChange={setEditedTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleSaveChanges}>Save Changes</Button>
//                 </Group>
//             </Modal>
//         </div>
//     );
// };

// export default TagSection;




// import React, { useState } from 'react';
// import { Card, ActionIcon, Menu, Collapse, Progress, Modal, TextInput, ColorInput, Button, Group } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardCard from './FlashcardCard';
// import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';

// const TagSection = ({ tag, flashcards, onEditTag, allTags }) => {
//     const [opened, setOpened] = useState(false); // Toggle for collapse
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Toggle for edit modal
//     const [editedTagName, setEditedTagName] = useState(tag.name); // Store edited name
//     const [editedTagColor, setEditedTagColor] = useState(tag.color); // Store edited color
//     const [editError, setEditError] = useState(''); // Error state for edit validation

//     const completedCount = flashcards.filter((fc) => fc.completed).length;
//     const totalFlashcards = flashcards.length;
//     const progressPercentage = totalFlashcards > 0 ? (completedCount / totalFlashcards) * 100 : 0;

//     // Open edit modal with current tag details
//     const handleOpenEditModal = () => {
//         setEditedTagName(tag.name);
//         setEditedTagColor(tag.color);
//         setIsEditModalOpen(true);
//         setEditError('');
//     };

//     // Save changes to the tag with validation
//     const handleSaveChanges = async () => {
//         if (!editedTagName.trim()) {
//             setEditError('Tag name cannot be empty.');
//             return;
//         }

//         // Check for duplicate name within the same module (excluding the current tag's ID)
//         const isDuplicate = allTags.some(
//             (existingTag) =>
//                 existingTag.name.toLowerCase() === editedTagName.trim().toLowerCase() &&
//                 existingTag.id !== tag.id
//         );

//         if (isDuplicate) {
//             setEditError('Tag name must be unique within this module.');
//             return;
//         }

//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await updateDoc(tagRef, {
//                 name: editedTagName.trim(),
//                 color: editedTagColor,
//             });
//             setIsEditModalOpen(false); // Close modal on success
//             setEditError(''); // Clear any existing errors
//             onEditTag(); // Optional callback to refresh UI in parent component
//         } catch (error) {
//             console.error("Error updating tag:", error);
//             setEditError('Failed to update tag.');
//         }
//     };

//     // Delete Tag
//     const handleDeleteTag = async () => {
//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await deleteDoc(tagRef); // Delete tag from Firestore
//             onEditTag(); // Optional callback to update UI in parent component
//         } catch (error) {
//             console.error("Error deleting tag:", error);
//         }
//     };

//     return (
//         <div style={{ marginBottom: '20px' }}>
//             {/* Tag Header */}
//             <Card
//                 onClick={() => setOpened(!opened)}
//                 style={{
//                     backgroundColor: tag.color,
//                     padding: '15px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                 }}
//             >
//                 <h3>{tag.name}</h3>

//                 {/* Three-dot Menu */}
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={handleOpenEditModal}>Edit Tag</Menu.Item>
//                         <Menu.Item color="red" onClick={handleDeleteTag}>Delete Tag</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </Card>

//             {/* Progress Tracking */}
//             <div style={{ marginTop: '10px', padding: '0 15px' }}>
//                 <p>Progress: {completedCount}/{totalFlashcards} flashcards completed</p>
//                 <Progress value={progressPercentage} />
//             </div>

//             {/* Collapsible Flashcard List */}
//             <Collapse in={opened}>
//                 <div style={{ padding: '10px 15px' }}>
//                     {flashcards.map((flashcard) => (
//                         <FlashcardCard key={flashcard.id} flashcard={flashcard} />
//                     ))}
//                 </div>
//             </Collapse>

//             {/* Edit Tag Modal */}
//             <Modal
//                 opened={isEditModalOpen}
//                 onClose={() => {
//                     setIsEditModalOpen(false);
//                     setEditError(''); // Clear error on modal close
//                 }}
//                 title="Edit Tag"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={editedTagName}
//                     onChange={(e) => {
//                         setEditedTagName(e.currentTarget.value);
//                         setEditError('');
//                     }}
//                     error={editError}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={editedTagColor}
//                     onChange={setEditedTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleSaveChanges}>Save Changes</Button>
//                 </Group>
//             </Modal>
//         </div>
//     );
// };

// export default TagSection;




//adding the create flashcard
// import React, { useState } from 'react';
// import { Card, ActionIcon, Menu, Collapse, Progress, Modal, TextInput, ColorInput, Button, Group } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardCard from './FlashcardCard';
// import FlashcardTextEditor from './FlashcardTextEditor';
// import { doc, updateDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// const TagSection = ({ tag, flashcards, onEditTag, allTags }) => {
//     const [opened, setOpened] = useState(false); // Toggle for collapse
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Toggle for edit modal
//     const [editedTagName, setEditedTagName] = useState(tag.name); // Store edited name
//     const [editedTagColor, setEditedTagColor] = useState(tag.color); // Store edited color
//     const [editError, setEditError] = useState(''); // Error state for edit validation

//     const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
//     const [questionContent, setQuestionContent] = useState('');
//     const [answerContent, setAnswerContent] = useState('');

//     const completedCount = flashcards.filter((fc) => fc.completed).length;
//     const totalFlashcards = flashcards.length;
//     const progressPercentage = totalFlashcards > 0 ? (completedCount / totalFlashcards) * 100 : 0;



//     const openFlashcardModal = () => {
//         setIsFlashcardModalOpen(true);
//         setQuestionContent(''); // Reset content when opening modal
//         setAnswerContent('');
//     };

//     const closeFlashcardModal = () => {
//         setIsFlashcardModalOpen(false);
//         setQuestionContent('');
//         setAnswerContent('');
//     };



//     // Open edit modal with current tag details
//     const handleOpenEditModal = () => {
//         setEditedTagName(tag.name);
//         setEditedTagColor(tag.color);
//         setIsEditModalOpen(true);
//         setEditError('');
//     };

//     // Save changes to the tag with validation
//     const handleSaveChanges = async () => {
//         if (!editedTagName.trim()) {
//             setEditError('Tag name cannot be empty.');
//             return;
//         }

//         // Check for duplicate name within the same module (excluding the current tag's ID)
//         const isDuplicate = allTags.some(
//             (existingTag) =>
//                 existingTag.name.toLowerCase() === editedTagName.trim().toLowerCase() &&
//                 existingTag.id !== tag.id
//         );

//         if (isDuplicate) {
//             setEditError('Tag name must be unique within this module.');
//             return;
//         }

//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await updateDoc(tagRef, {
//                 name: editedTagName.trim(),
//                 color: editedTagColor,
//             });
//             setIsEditModalOpen(false); // Close modal on success
//             setEditError(''); // Clear any existing errors
//             onEditTag(); // Optional callback to refresh UI in parent component
//         } catch (error) {
//             console.error("Error updating tag:", error);
//             setEditError('Failed to update tag.');
//         }
//     };

//     // Delete Tag
//     const handleDeleteTag = async () => {
//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await deleteDoc(tagRef); // Delete tag from Firestore
//             onEditTag(); // Optional callback to update UI in parent component
//         } catch (error) {
//             console.error("Error deleting tag:", error);
//         }
//     };

    
//     // Save flashcard to Firestore
//     const saveFlashcard = async (clearAfterSave = false) => {
//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not authenticated");
//             return;
//         }

//         const newFlashcard = {
//             question: questionContent,
//             answer: answerContent,
//             tagId: tag.id,
//             completed: false,
//             createdAt: new Date(),
//             userId,
//         };

//         try {
//             // Attempt to save the flashcard to Firestore
//             await addDoc(collection(firestore, 'flashcards'), newFlashcard);
//             console.log("Flashcard added successfully");

//             // Clear fields or close modal based on button click
//             if (clearAfterSave) {
//                 setQuestionContent('');
//                 setAnswerContent('');
//             } else {
//                 closeFlashcardModal();
//             }
//         } catch (error) {
//             console.error("Error adding flashcard:", error);
//         }
//     };



//     return (
//         <div style={{ marginBottom: '20px' }}>
//             {/* Tag Header */}
//             <Card
//                 onClick={() => setOpened(!opened)}
//                 style={{
//                     backgroundColor: tag.color,
//                     padding: '15px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                 }}
//             >
//                 <h3>{tag.name}</h3>

//                 {/* Three-dot Menu */}
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={handleOpenEditModal}>Edit Tag</Menu.Item>
//                         <Menu.Item onClick={openFlashcardModal}>Add Flashcard</Menu.Item>
//                         <Menu.Item color="red" onClick={handleDeleteTag}>Delete Tag</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </Card>

//             {/* Progress Tracking */}
//             <div style={{ marginTop: '10px', padding: '0 15px' }}>
//                 <p>Progress: {completedCount}/{totalFlashcards} flashcards completed</p>
//                 <Progress value={progressPercentage} />
//             </div>

//             {/* Collapsible Flashcard List */}
//             <Collapse in={opened}>
//                 <div style={{ padding: '10px 15px' }}>
//                     {flashcards.map((flashcard) => (
//                         <FlashcardCard key={flashcard.id} flashcard={flashcard} />
//                     ))}
//                 </div>
//             </Collapse>

//             {/* Edit Tag Modal */}
//             <Modal
//                 opened={isEditModalOpen}
//                 onClose={() => {
//                     setIsEditModalOpen(false);
//                     setEditError(''); // Clear error on modal close
//                 }}
//                 title="Edit Tag"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={editedTagName}
//                     onChange={(e) => {
//                         setEditedTagName(e.currentTarget.value);
//                         setEditError('');
//                     }}
//                     error={editError}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={editedTagColor}
//                     onChange={setEditedTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleSaveChanges}>Save Changes</Button>
//                 </Group>
//             </Modal>

//             {/* Flashcard Creation Modal */}
//             <Modal
//                 opened={isFlashcardModalOpen}
//                 onClose={closeFlashcardModal}
//                 title="Create Flashcard"
//                 size="xl" // Set a fixed width
//             >
//                 <div style={{ marginBottom: '10px' }}>
//                     <p><strong>Question</strong></p>
//                     <FlashcardTextEditor content={questionContent} onChange={setQuestionContent} />
//                 </div>
//                 <div style={{ marginBottom: '20px' }}>
//                     <p><strong>Answer</strong></p>
//                     <FlashcardTextEditor content={answerContent} onChange={setAnswerContent} />
//                 </div>
//                 <Group position="apart">
//                     <Button onClick={() => saveFlashcard(false)}>Save</Button>
//                     <Button color="blue" onClick={() => saveFlashcard(true)}>Save and Add Another</Button>
//                 </Group>
//             </Modal>



//         </div>
//     );
// };

// export default TagSection;




//fix the save and move another issue
// import React, { useState, useRef } from 'react';
// import { Card, ActionIcon, Menu, Collapse, Progress, Modal, TextInput, ColorInput, Button, Group } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardCard from './FlashcardCard';
// import FlashcardTextEditor from './FlashcardTextEditor';
// import { doc, updateDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// const TagSection = ({ tag, flashcards, onEditTag, allTags }) => {
//     const [opened, setOpened] = useState(false); // Toggle for collapse
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Toggle for edit modal
//     const [editedTagName, setEditedTagName] = useState(tag.name); // Store edited name
//     const [editedTagColor, setEditedTagColor] = useState(tag.color); // Store edited color
//     const [editError, setEditError] = useState(''); // Error state for edit validation

//     const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
//     const [questionContent, setQuestionContent] = useState('');
//     const [answerContent, setAnswerContent] = useState('');

//     // Refs for question and answer text editors to reset their content
//     const questionEditorRef = useRef(null);
//     const answerEditorRef = useRef(null);

//     const completedCount = flashcards.filter((fc) => fc.completed).length;
//     const totalFlashcards = flashcards.length;
//     const progressPercentage = totalFlashcards > 0 ? (completedCount / totalFlashcards) * 100 : 0;



//     const openFlashcardModal = () => {
//         setIsFlashcardModalOpen(true);
//         setQuestionContent(''); // Reset content when opening modal
//         setAnswerContent('');
//     };

//     const closeFlashcardModal = () => {
//         setIsFlashcardModalOpen(false);
//         setQuestionContent('');
//         setAnswerContent('');
//     };



//     // Open edit modal with current tag details
//     const handleOpenEditModal = () => {
//         setEditedTagName(tag.name);
//         setEditedTagColor(tag.color);
//         setIsEditModalOpen(true);
//         setEditError('');
//     };

//     // Save changes to the tag with validation
//     const handleSaveChanges = async () => {
//         if (!editedTagName.trim()) {
//             setEditError('Tag name cannot be empty.');
//             return;
//         }

//         // Check for duplicate name within the same module (excluding the current tag's ID)
//         const isDuplicate = allTags.some(
//             (existingTag) =>
//                 existingTag.name.toLowerCase() === editedTagName.trim().toLowerCase() &&
//                 existingTag.id !== tag.id
//         );

//         if (isDuplicate) {
//             setEditError('Tag name must be unique within this module.');
//             return;
//         }

//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await updateDoc(tagRef, {
//                 name: editedTagName.trim(),
//                 color: editedTagColor,
//             });
//             setIsEditModalOpen(false); // Close modal on success
//             setEditError(''); // Clear any existing errors
//             onEditTag(); // Optional callback to refresh UI in parent component
//         } catch (error) {
//             console.error("Error updating tag:", error);
//             setEditError('Failed to update tag.');
//         }
//     };

//     // Delete Tag
//     const handleDeleteTag = async () => {
//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await deleteDoc(tagRef); // Delete tag from Firestore
//             onEditTag(); // Optional callback to update UI in parent component
//         } catch (error) {
//             console.error("Error deleting tag:", error);
//         }
//     };


//     // Save flashcard to Firestore
//     const saveFlashcard = async (clearAfterSave = false) => {
//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not authenticated");
//             return;
//         }

//         const newFlashcard = {
//             question: questionContent,
//             answer: answerContent,
//             tagId: tag.id,
//             completed: false,
//             createdAt: new Date(),
//             userId,
//         };

//         try {
//             // Attempt to save the flashcard to Firestore
//             await addDoc(collection(firestore, 'flashcards'), newFlashcard);
//             console.log("Flashcard added successfully");

//             // Clear fields or close modal based on button click
//             if (clearAfterSave) {
//                 setQuestionContent('');
//                 setAnswerContent('');

//                 // Reset editor contents to empty after saving
//                 questionEditorRef.current?.insertText('');
//                 answerEditorRef.current?.insertText('');
//             } else {
//                 closeFlashcardModal();
//             }
//         } catch (error) {
//             console.error("Error adding flashcard:", error);
//         }
//     };



//     return (
//         <div style={{ marginBottom: '20px' }}>
//             {/* Tag Header */}
//             <Card
//                 onClick={() => setOpened(!opened)}
//                 style={{
//                     backgroundColor: tag.color,
//                     padding: '15px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                 }}
//             >
//                 <h3>{tag.name}</h3>

//                 {/* Three-dot Menu */}
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={handleOpenEditModal}>Edit Tag</Menu.Item>
//                         <Menu.Item onClick={openFlashcardModal}>Add Flashcard</Menu.Item>
//                         <Menu.Item color="red" onClick={handleDeleteTag}>Delete Tag</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </Card>

//             {/* Progress Tracking */}
//             <div style={{ marginTop: '10px', padding: '0 15px' }}>
//                 <p>Progress: {completedCount}/{totalFlashcards} flashcards completed</p>
//                 <Progress value={progressPercentage} />
//             </div>

//             {/* Collapsible Flashcard List */}
//             <Collapse in={opened}>
//                 <div style={{ padding: '10px 15px' }}>
//                     {flashcards.map((flashcard) => (
//                         <FlashcardCard key={flashcard.id} flashcard={flashcard} />
//                     ))}
//                 </div>
//             </Collapse>

//             {/* Edit Tag Modal */}
//             <Modal
//                 opened={isEditModalOpen}
//                 onClose={() => {
//                     setIsEditModalOpen(false);
//                     setEditError(''); // Clear error on modal close
//                 }}
//                 title="Edit Tag"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={editedTagName}
//                     onChange={(e) => {
//                         setEditedTagName(e.currentTarget.value);
//                         setEditError('');
//                     }}
//                     error={editError}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={editedTagColor}
//                     onChange={setEditedTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleSaveChanges}>Save Changes</Button>
//                 </Group>
//             </Modal>

//             {/* Flashcard Creation Modal */}
//             <Modal
//                 opened={isFlashcardModalOpen}
//                 onClose={closeFlashcardModal}
//                 title="Create Flashcard"
//                 size="xl" // Set a fixed width
//             >
//                 <div style={{ marginBottom: '10px' }}>
//                     <p><strong>Question</strong></p>
//                     <FlashcardTextEditor content={questionContent} onChange={setQuestionContent} />
//                 </div>
//                 <div style={{ marginBottom: '20px' }}>
//                     <p><strong>Answer</strong></p>
//                     <FlashcardTextEditor content={answerContent} onChange={setAnswerContent} />
//                 </div>
//                 <Group position="apart">
//                     <Button onClick={() => saveFlashcard(false)}>Save</Button>
//                     <Button color="blue" onClick={() => saveFlashcard(true)}>Save and Add Another</Button>
//                 </Group>
//             </Modal>



//         </div>
//     );
// };

// export default TagSection;





//save part 2, fixed
// import React, { useState, useRef } from 'react';
// import { Card, ActionIcon, Menu, Collapse, Progress, Modal, TextInput, ColorInput, Button, Group } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardCard from './FlashcardCard';
// import FlashcardTextEditor from './FlashcardTextEditor';
// import { doc, updateDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// const TagSection = ({ tag, flashcards, onEditTag, allTags }) => {
//     const [opened, setOpened] = useState(false); // Toggle for collapse
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Toggle for edit modal
//     const [editedTagName, setEditedTagName] = useState(tag.name); // Store edited name
//     const [editedTagColor, setEditedTagColor] = useState(tag.color); // Store edited color
//     const [editError, setEditError] = useState(''); // Error state for edit validation

//     const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
//     const [questionContent, setQuestionContent] = useState('');
//     const [answerContent, setAnswerContent] = useState('');

//     const [error, setError] = useState('');

//     // Refs for question and answer text editors to reset their content
//     const questionEditorRef = useRef(null);
//     const answerEditorRef = useRef(null);

//     const completedCount = flashcards.filter((fc) => fc.completed).length;
//     const totalFlashcards = flashcards.length;
//     const progressPercentage = totalFlashcards > 0 ? (completedCount / totalFlashcards) * 100 : 0;



//     const openFlashcardModal = () => {
//         setIsFlashcardModalOpen(true);
//         setQuestionContent(''); // Reset content when opening modal
//         setAnswerContent('');
//     };

//     const closeFlashcardModal = () => {
//         setIsFlashcardModalOpen(false);
//         setQuestionContent('');
//         setAnswerContent('');
//     };



//     // Open edit modal with current tag details
//     const handleOpenEditModal = () => {
//         setEditedTagName(tag.name);
//         setEditedTagColor(tag.color);
//         setIsEditModalOpen(true);
//         setEditError('');
//     };

//     // Save changes to the tag with validation
//     const handleSaveChanges = async () => {
//         if (!editedTagName.trim()) {
//             setEditError('Tag name cannot be empty.');
//             return;
//         }

//         // Check for duplicate name within the same module (excluding the current tag's ID)
//         const isDuplicate = allTags.some(
//             (existingTag) =>
//                 existingTag.name.toLowerCase() === editedTagName.trim().toLowerCase() &&
//                 existingTag.id !== tag.id
//         );

//         if (isDuplicate) {
//             setEditError('Tag name must be unique within this module.');
//             return;
//         }

//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await updateDoc(tagRef, {
//                 name: editedTagName.trim(),
//                 color: editedTagColor,
//             });
//             setIsEditModalOpen(false); // Close modal on success
//             setEditError(''); // Clear any existing errors
//             onEditTag(); // Optional callback to refresh UI in parent component
//         } catch (error) {
//             console.error("Error updating tag:", error);
//             setEditError('Failed to update tag.');
//         }
//     };

//     // Delete Tag
//     const handleDeleteTag = async () => {
//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await deleteDoc(tagRef); // Delete tag from Firestore
//             onEditTag(); // Optional callback to update UI in parent component
//         } catch (error) {
//             console.error("Error deleting tag:", error);
//         }
//     };


//     // Save flashcard to Firestore
//     const saveFlashcard = async (clearAfterSave = false) => {

//         // Validation: Ensure question and answer are not empty
//         if (!questionContent.trim() || !answerContent.trim()) {
//             // Display an error message to the user if either field is empty
//             setError("Both question and answer fields must be filled.");
//             return;
//         }

//         // Clear any previous error message when both fields are filled
//         setError('');


//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not authenticated");
//             return;
//         }

//         const newFlashcard = {
//             question: questionContent,
//             answer: answerContent,
//             tagId: tag.id,
//             completed: false,
//             createdAt: new Date(),
//             userId,
//         };

//         try {
//             // Attempt to save the flashcard to Firestore
//             await addDoc(collection(firestore, 'flashcards'), newFlashcard);
//             console.log("Flashcard added successfully");

//             // Clear fields or close modal based on button click
//             if (clearAfterSave) {
//                 setQuestionContent('');
//                 setAnswerContent('');

//                 // Reset editor contents to empty after saving
//                 questionEditorRef.current?.clearContent('');
//                 answerEditorRef.current?.clearContent('');
//             } else {
//                 closeFlashcardModal();
//             }
//         } catch (error) {
//             console.error("Error adding flashcard:", error);
//         }
//     };



//     return (
//         <div style={{ marginBottom: '20px' }}>
//             {/* Tag Header */}
//             <Card
//                 onClick={() => setOpened(!opened)}
//                 style={{
//                     backgroundColor: tag.color,
//                     padding: '15px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                 }}
//             >
//                 <h3>{tag.name}</h3>

//                 {/* Three-dot Menu */}
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={handleOpenEditModal}>Edit Tag</Menu.Item>
//                         <Menu.Item onClick={openFlashcardModal}>Add Flashcard</Menu.Item>
//                         <Menu.Item color="red" onClick={handleDeleteTag}>Delete Tag</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </Card>

//             {/* Progress Tracking */}
//             <div style={{ marginTop: '10px', padding: '0 15px' }}>
//                 <p>Progress: {completedCount}/{totalFlashcards} flashcards completed</p>
//                 <Progress value={progressPercentage} />
//             </div>

//             {/* Collapsible Flashcard List */}
//             <Collapse in={opened}>
//                 <div style={{ padding: '10px 15px' }}>
//                     {flashcards.map((flashcard) => (
//                         <FlashcardCard key={flashcard.id} flashcard={flashcard} />
//                     ))}
//                 </div>
//             </Collapse>

//             {/* Edit Tag Modal */}
//             <Modal
//                 opened={isEditModalOpen}
//                 onClose={() => {
//                     setIsEditModalOpen(false);
//                     setEditError(''); // Clear error on modal close
//                 }}
//                 title="Edit Tag"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={editedTagName}
//                     onChange={(e) => {
//                         setEditedTagName(e.currentTarget.value);
//                         setEditError('');
//                     }}
//                     error={editError}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={editedTagColor}
//                     onChange={setEditedTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleSaveChanges}>Save Changes</Button>
//                 </Group>
//             </Modal>

//             {/* Flashcard Creation Modal */}
//             <Modal
//                 opened={isFlashcardModalOpen}
//                 onClose={closeFlashcardModal}
//                 title="Create Flashcard"
//                 size="xl" // Set a fixed width
//             >
//                 <div style={{ marginBottom: '10px' }}>
//                     <p><strong>Question</strong></p>
//                     <FlashcardTextEditor
//                         ref={questionEditorRef}
//                         content={questionContent}
//                         onChange={setQuestionContent}
//                         key={`question-${isFlashcardModalOpen}`} // Forcing re-render on open
//                     />
//                 </div>
//                 <div style={{ marginBottom: '20px' }}>
//                     <p><strong>Answer</strong></p>
//                     <FlashcardTextEditor
//                         ref={answerEditorRef}
//                         content={answerContent}
//                         onChange={setAnswerContent}
//                         key={`answer-${isFlashcardModalOpen}`} // Forcing re-render on open
//                     />
//                 </div>
//                 {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
//                 <Group position="apart">
//                     <Button onClick={() => saveFlashcard(false)}>Save</Button>
//                     <Button color="blue" onClick={() => saveFlashcard(true)}>Save and Add Another</Button>
//                 </Group>
//             </Modal>



//         </div>
//     );
// };

// export default TagSection;





//fix show flashcard
// import React, { useState, useRef } from 'react';
// import { Card, ActionIcon, Menu, Collapse, Progress, Modal, TextInput, ColorInput, Button, Group } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardCard from './FlashcardCard';
// import FlashcardTextEditor from './FlashcardTextEditor';
// import { doc, updateDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// const TagSection = ({ tag, flashcards, onEditTag, allTags }) => {
//     const [opened, setOpened] = useState(false); // Toggle for collapse
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Toggle for edit modal
//     const [editedTagName, setEditedTagName] = useState(tag.name); // Store edited name
//     const [editedTagColor, setEditedTagColor] = useState(tag.color); // Store edited color
//     const [editError, setEditError] = useState(''); // Error state for edit validation

//     const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
//     const [questionContent, setQuestionContent] = useState('');
//     const [answerContent, setAnswerContent] = useState('');

//     const [error, setError] = useState('');

//     // Refs for question and answer text editors to reset their content
//     const questionEditorRef = useRef(null);
//     const answerEditorRef = useRef(null);

//     const completedCount = flashcards.filter((fc) => fc.completed).length;
//     const totalFlashcards = flashcards.length;
//     const progressPercentage = totalFlashcards > 0 ? (completedCount / totalFlashcards) * 100 : 0;


//     const toggleCollapse = () => setOpened((prev) => !prev);


//     const openFlashcardModal = () => {
//         setIsFlashcardModalOpen(true);
//         setQuestionContent(''); // Reset content when opening modal
//         setAnswerContent('');
//     };

//     const closeFlashcardModal = () => {
//         setIsFlashcardModalOpen(false);
//         setQuestionContent('');
//         setAnswerContent('');
//     };



//     // Open edit modal with current tag details
//     const handleOpenEditModal = () => {
//         setEditedTagName(tag.name);
//         setEditedTagColor(tag.color);
//         setIsEditModalOpen(true);
//         setEditError('');
//     };

//     // Save changes to the tag with validation
//     const handleSaveChanges = async () => {
//         if (!editedTagName.trim()) {
//             setEditError('Tag name cannot be empty.');
//             return;
//         }

//         // Check for duplicate name within the same module (excluding the current tag's ID)
//         const isDuplicate = allTags.some(
//             (existingTag) =>
//                 existingTag.name.toLowerCase() === editedTagName.trim().toLowerCase() &&
//                 existingTag.id !== tag.id
//         );

//         if (isDuplicate) {
//             setEditError('Tag name must be unique within this module.');
//             return;
//         }

//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await updateDoc(tagRef, {
//                 name: editedTagName.trim(),
//                 color: editedTagColor,
//             });
//             setIsEditModalOpen(false); // Close modal on success
//             setEditError(''); // Clear any existing errors
//             onEditTag(); // Optional callback to refresh UI in parent component
//         } catch (error) {
//             console.error("Error updating tag:", error);
//             setEditError('Failed to update tag.');
//         }
//     };

//     // Delete Tag
//     const handleDeleteTag = async () => {
//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await deleteDoc(tagRef); // Delete tag from Firestore
//             onEditTag(); // Optional callback to update UI in parent component
//         } catch (error) {
//             console.error("Error deleting tag:", error);
//         }
//     };


//     // Save flashcard to Firestore
//     const saveFlashcard = async (clearAfterSave = false) => {

//         // Validation: Ensure question and answer are not empty
//         if (!questionContent.trim() || !answerContent.trim()) {
//             // Display an error message to the user if either field is empty
//             setError("Both question and answer fields must be filled.");
//             return;
//         }

//         // Clear any previous error message when both fields are filled
//         setError('');


//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not authenticated");
//             return;
//         }

//         const newFlashcard = {
//             question: questionContent,
//             answer: answerContent,
//             tagId: tag.id,
//             completed: false,
//             createdAt: new Date(),
//             userId,
//         };

//         try {
//             // Attempt to save the flashcard to Firestore
//             await addDoc(collection(firestore, 'flashcards'), newFlashcard);
//             console.log("Flashcard added successfully");

//             // Clear fields or close modal based on button click
//             if (clearAfterSave) {
//                 setQuestionContent('');
//                 setAnswerContent('');

//                 // Reset editor contents to empty after saving
//                 questionEditorRef.current?.clearContent('');
//                 answerEditorRef.current?.clearContent('');
//             } else {
//                 closeFlashcardModal();
//             }
//         } catch (error) {
//             console.error("Error adding flashcard:", error);
//         }
//     };



//     return (
//         <div style={{ marginBottom: '20px' }}>
//             {/* Tag Header */}
//             <Card
//                 onClick={toggleCollapse}
//                 style={{
//                     backgroundColor: tag.color,
//                     padding: '15px',
//                     cursor: 'pointer',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                 }}
//             >
//                 <h3>{tag.name}</h3>

//                 {/* Three-dot Menu */}
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={handleOpenEditModal}>Edit Tag</Menu.Item>
//                         <Menu.Item onClick={openFlashcardModal}>Add Flashcard</Menu.Item>
//                         <Menu.Item color="red" onClick={handleDeleteTag}>Delete Tag</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </Card>

//             {/* Progress Tracking */}
//             <div style={{ marginTop: '10px', padding: '0 15px' }}>
//                 <p>Progress: {completedCount}/{totalFlashcards} flashcards completed</p>
//                 <Progress value={progressPercentage} />
//             </div>

//             {/* Collapsible Flashcard List */}
//             <Collapse in={opened}>
//                 <div style={{ padding: '10px 15px' }}>
//                     {flashcards.map((flashcard) => (
//                         <FlashcardCard key={flashcard.id} flashcard={flashcard} />
//                     ))}
//                 </div>
//             </Collapse>

//             {/* Edit Tag Modal */}
//             <Modal
//                 opened={isEditModalOpen}
//                 onClose={() => {
//                     setIsEditModalOpen(false);
//                     setEditError(''); // Clear error on modal close
//                 }}
//                 title="Edit Tag"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={editedTagName}
//                     onChange={(e) => {
//                         setEditedTagName(e.currentTarget.value);
//                         setEditError('');
//                     }}
//                     error={editError}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={editedTagColor}
//                     onChange={setEditedTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleSaveChanges}>Save Changes</Button>
//                 </Group>
//             </Modal>

//             {/* Flashcard Creation Modal */}
//             <Modal
//                 opened={isFlashcardModalOpen}
//                 onClose={closeFlashcardModal}
//                 title="Create Flashcard"
//                 size="xl" // Set a fixed width
//             >
//                 <div style={{ marginBottom: '10px' }}>
//                     <p><strong>Question</strong></p>
//                     <FlashcardTextEditor
//                         ref={questionEditorRef}
//                         content={questionContent}
//                         onChange={setQuestionContent}
//                         key={`question-${isFlashcardModalOpen}`} // Forcing re-render on open
//                     />
//                 </div>
//                 <div style={{ marginBottom: '20px' }}>
//                     <p><strong>Answer</strong></p>
//                     <FlashcardTextEditor
//                         ref={answerEditorRef}
//                         content={answerContent}
//                         onChange={setAnswerContent}
//                         key={`answer-${isFlashcardModalOpen}`} // Forcing re-render on open
//                     />
//                 </div>
//                 {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
//                 <Group position="apart">
//                     <Button onClick={() => saveFlashcard(false)}>Save</Button>
//                     <Button color="blue" onClick={() => saveFlashcard(true)}>Save and Add Another</Button>
//                 </Group>
//             </Modal>



//         </div>
//     );
// };

// export default TagSection;




// import React, { useState, useRef } from 'react';
// import { Card, ActionIcon, Menu, Collapse, Progress, Modal, TextInput, ColorInput, Button, Group } from '@mantine/core';
// import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
// import FlashcardCard from './FlashcardCard';
// import FlashcardTextEditor from './FlashcardTextEditor';
// import { doc, updateDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// const TagSection = ({ tag, flashcards, onEditTag, allTags }) => {
//     const [opened, setOpened] = useState(false); // Toggle for collapse
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Toggle for edit modal
//     const [editedTagName, setEditedTagName] = useState(tag.name); // Store edited name
//     const [editedTagColor, setEditedTagColor] = useState(tag.color); // Store edited color
//     const [editError, setEditError] = useState(''); // Error state for edit validation

//     const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
//     const [questionContent, setQuestionContent] = useState('');
//     const [answerContent, setAnswerContent] = useState('');

//     const [error, setError] = useState('');

//     // Refs for question and answer text editors to reset their content
//     const questionEditorRef = useRef(null);
//     const answerEditorRef = useRef(null);

//     const completedCount = flashcards.filter((fc) => fc.completed).length;
//     const totalFlashcards = flashcards.length;
//     const progressPercentage = totalFlashcards > 0 ? (completedCount / totalFlashcards) * 100 : 0;

//     const toggleCollapse = () => setOpened((prev) => !prev);

//     const openFlashcardModal = () => {
//         setIsFlashcardModalOpen(true);
//         setQuestionContent(''); // Reset content when opening modal
//         setAnswerContent('');
//     };

//     const closeFlashcardModal = () => {
//         setIsFlashcardModalOpen(false);
//         setQuestionContent('');
//         setAnswerContent('');
//     };

//     // Open edit modal with current tag details
//     const handleOpenEditModal = () => {
//         setEditedTagName(tag.name);
//         setEditedTagColor(tag.color);
//         setIsEditModalOpen(true);
//         setEditError('');
//     };

//     // Save changes to the tag with validation
//     const handleSaveChanges = async () => {
//         if (!editedTagName.trim()) {
//             setEditError('Tag name cannot be empty.');
//             return;
//         }

//         // Check for duplicate name within the same module (excluding the current tag's ID)
//         const isDuplicate = allTags.some(
//             (existingTag) =>
//                 existingTag.name.toLowerCase() === editedTagName.trim().toLowerCase() &&
//                 existingTag.id !== tag.id
//         );

//         if (isDuplicate) {
//             setEditError('Tag name must be unique within this module.');
//             return;
//         }

//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await updateDoc(tagRef, {
//                 name: editedTagName.trim(),
//                 color: editedTagColor,
//             });
//             setIsEditModalOpen(false); // Close modal on success
//             setEditError(''); // Clear any existing errors
//             onEditTag(); // Optional callback to refresh UI in parent component
//         } catch (error) {
//             console.error("Error updating tag:", error);
//             setEditError('Failed to update tag.');
//         }
//     };

//     // Delete Tag
//     const handleDeleteTag = async () => {
//         try {
//             const tagRef = doc(firestore, 'tags', tag.id);
//             await deleteDoc(tagRef); // Delete tag from Firestore
//             onEditTag(); // Optional callback to update UI in parent component
//         } catch (error) {
//             console.error("Error deleting tag:", error);
//         }
//     };

//     // Save flashcard to Firestore
//     const saveFlashcard = async (clearAfterSave = false) => {
//         // Validation: Ensure question and answer are not empty
//         if (!questionContent.trim() || !answerContent.trim()) {
//             // Display an error message to the user if either field is empty
//             setError("Both question and answer fields must be filled.");
//             return;
//         }

//         // Clear any previous error message when both fields are filled
//         setError('');

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not authenticated");
//             return;
//         }

//         const newFlashcard = {
//             question: questionContent,
//             answer: answerContent,
//             tagId: tag.id,
//             completed: false,
//             createdAt: new Date(),
//             userId,
//         };

//         try {
//             // Attempt to save the flashcard to Firestore
//             await addDoc(collection(firestore, 'flashcards'), newFlashcard);
//             console.log("Flashcard added successfully");

//             // Clear fields or close modal based on button click
//             if (clearAfterSave) {
//                 setQuestionContent('');
//                 setAnswerContent('');

//                 // Reset editor contents to empty after saving
//                 questionEditorRef.current?.clearContent('');
//                 answerEditorRef.current?.clearContent('');
//             } else {
//                 closeFlashcardModal();
//             }
//         } catch (error) {
//             console.error("Error adding flashcard:", error);
//         }
//     };

//     return (
//         <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleCollapse}>
//                     {opened ? <IconChevronDown /> : <IconChevronRight />}
//                     <h3 style={{ marginLeft: '10px' }}>{tag.name}</h3>
//                 </div>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={handleOpenEditModal}>Edit Tag</Menu.Item>
//                         <Menu.Item onClick={openFlashcardModal}>Add Flashcard</Menu.Item>
//                         <Menu.Item color="red" onClick={handleDeleteTag}>Delete Tag</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>

//             {/* Progress Tracking */}
//             <div style={{ marginTop: '10px', padding: '0 15px' }}>
//                 <p>Progress: {completedCount}/{totalFlashcards} flashcards completed</p>
//                 <Progress value={progressPercentage} />
//             </div>

//             {/* Collapsible Flashcard List */}
//             {opened && (
//                 <div style={{ padding: '10px 15px' }}>
//                     {flashcards.length > 0 ? (
//                         flashcards.map((flashcard) => (
//                             <FlashcardCard key={flashcard.id} flashcard={flashcard} />
//                         ))
//                     ) : (
//                         <p>No flashcards available. Add a new flashcard to get started.</p>
//                     )}
//                 </div>
//             )}

//             {/* Edit Tag Modal */}
//             <Modal
//                 opened={isEditModalOpen}
//                 onClose={() => {
//                     setIsEditModalOpen(false);
//                     setEditError(''); // Clear error on modal close
//                 }}
//                 title="Edit Tag"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={editedTagName}
//                     onChange={(e) => {
//                         setEditedTagName(e.currentTarget.value);
//                         setEditError('');
//                     }}
//                     error={editError}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={editedTagColor}
//                     onChange={setEditedTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleSaveChanges}>Save Changes</Button>
//                 </Group>
//             </Modal>

//             {/* Flashcard Creation Modal */}
//             <Modal
//                 opened={isFlashcardModalOpen}
//                 onClose={closeFlashcardModal}
//                 title="Create Flashcard"
//                 size="xl"
//             >
//                 <div style={{ marginBottom: '10px' }}>
//                     <p><strong>Question</strong></p>
//                     <FlashcardTextEditor
//                         ref={questionEditorRef}
//                         content={questionContent}
//                         onChange={setQuestionContent}
//                         key={`question-${isFlashcardModalOpen}`}
//                     />
//                 </div>
//                 <div style={{ marginBottom: '20px' }}>
//                     <p><strong>Answer</strong></p>
//                     <FlashcardTextEditor
//                         ref={answerEditorRef}
//                         content={answerContent}
//                         onChange={setAnswerContent}
//                         key={`answer-${isFlashcardModalOpen}`}
//                     />
//                 </div>
//                 {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
//                 <Group position="apart">
//                     <Button onClick={() => saveFlashcard(false)}>Save</Button>
//                     <Button color="blue" onClick={() => saveFlashcard(true)}>Save and Add Another</Button>
//                 </Group>
//             </Modal>
//         </Card>
//     );
// };

// export default TagSection;







import React, { useState, useRef, useEffect } from 'react';
import { Card, ActionIcon, Menu, Progress, Modal, TextInput, ColorInput, Button, Group } from '@mantine/core';
import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import FlashcardCard from './FlashcardCard';
import FlashcardTextEditor from './FlashcardTextEditor';
import { doc, updateDoc, deleteDoc, addDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { firestore, auth } from '../firebase';

const TagSection = ({ tag, flashcards, onEditTag, allTags }) => {
    const [opened, setOpened] = useState(false); // Toggle for collapse
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Toggle for edit modal
    const [editedTagName, setEditedTagName] = useState(tag.name); // Store edited name
    const [editedTagColor, setEditedTagColor] = useState(tag.color); // Store edited color
    const [editError, setEditError] = useState(''); // Error state for edit validation

    const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
    const [questionContent, setQuestionContent] = useState('');
    const [answerContent, setAnswerContent] = useState('');

    const [error, setError] = useState('');
    const [tagFlashcards, setTagFlashcards] = useState([]); // State to store flashcards for the tag

    // Refs for question and answer text editors to reset their content
    const questionEditorRef = useRef(null);
    const answerEditorRef = useRef(null);

    const completedCount = tagFlashcards.filter((fc) => fc.completed).length;
    const totalFlashcards = tagFlashcards.length;
    const progressPercentage = totalFlashcards > 0 ? (completedCount / totalFlashcards) * 100 : 0;

    const toggleCollapse = () => setOpened((prev) => !prev);

    useEffect(() => {
        if (opened) {
            const userId = auth.currentUser?.uid;
            if (userId) {
                const flashcardsRef = collection(firestore, 'flashcards');
                const q = query(flashcardsRef, where('tagId', '==', tag.id), where('userId', '==', userId));
                const unsubscribe = onSnapshot(q, (snapshot) => {
                    const fetchedFlashcards = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setTagFlashcards(fetchedFlashcards);
                });
                return () => unsubscribe();
            }
        }
    }, [opened, tag.id]);

    const openFlashcardModal = () => {
        setIsFlashcardModalOpen(true);
        setQuestionContent(''); // Reset content when opening modal
        setAnswerContent('');
    };

    const closeFlashcardModal = () => {
        setIsFlashcardModalOpen(false);
        setQuestionContent('');
        setAnswerContent('');
    };

    // Open edit modal with current tag details
    const handleOpenEditModal = () => {
        setEditedTagName(tag.name);
        setEditedTagColor(tag.color);
        setIsEditModalOpen(true);
        setEditError('');
    };

    // Save changes to the tag with validation
    const handleSaveChanges = async () => {
        if (!editedTagName.trim()) {
            setEditError('Tag name cannot be empty.');
            return;
        }

        // Check for duplicate name within the same module (excluding the current tag's ID)
        const isDuplicate = allTags.some(
            (existingTag) =>
                existingTag.name.toLowerCase() === editedTagName.trim().toLowerCase() &&
                existingTag.id !== tag.id
        );

        if (isDuplicate) {
            setEditError('Tag name must be unique within this module.');
            return;
        }

        try {
            const tagRef = doc(firestore, 'tags', tag.id);
            await updateDoc(tagRef, {
                name: editedTagName.trim(),
                color: editedTagColor,
            });
            setIsEditModalOpen(false); // Close modal on success
            setEditError(''); // Clear any existing errors
            onEditTag(); // Optional callback to refresh UI in parent component
        } catch (error) {
            console.error("Error updating tag:", error);
            setEditError('Failed to update tag.');
        }
    };

    // Delete Tag
    const handleDeleteTag = async () => {
        try {
            const tagRef = doc(firestore, 'tags', tag.id);
            await deleteDoc(tagRef); // Delete tag from Firestore
            onEditTag(); // Optional callback to update UI in parent component
        } catch (error) {
            console.error("Error deleting tag:", error);
        }
    };

    // Save flashcard to Firestore
    const saveFlashcard = async (clearAfterSave = false) => {
        // Validation: Ensure question and answer are not empty
        if (!questionContent.trim() || !answerContent.trim()) {
            // Display an error message to the user if either field is empty
            setError("Both question and answer fields must be filled.");
            return;
        }

        // Clear any previous error message when both fields are filled
        setError('');

        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.error("User not authenticated");
            return;
        }

        const newFlashcard = {
            question: questionContent,
            answer: answerContent,
            tagId: tag.id,
            completed: false,
            createdAt: new Date(),
            userId,
            rating: null,
        };

        try {
            // Attempt to save the flashcard to Firestore
            await addDoc(collection(firestore, 'flashcards'), newFlashcard);
            console.log("Flashcard added successfully");

            // Clear fields or close modal based on button click
            if (clearAfterSave) {
                setQuestionContent('');
                setAnswerContent('');

                // Reset editor contents to empty after saving
                questionEditorRef.current?.clearContent('');
                answerEditorRef.current?.clearContent('');
            } else {
                closeFlashcardModal();
            }
        } catch (error) {
            console.error("Error adding flashcard:", error);
        }
    };

    return (
        <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleCollapse}>
                    {opened ? <IconChevronDown /> : <IconChevronRight />}
                    <h3 style={{ marginLeft: '10px' }}>{tag.name}</h3>
                </div>
                <Menu position="bottom-end">
                    <Menu.Target>
                        <ActionIcon>
                            <IconDots />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={handleOpenEditModal}>Edit Tag</Menu.Item>
                        <Menu.Item onClick={openFlashcardModal}>Add Flashcard</Menu.Item>
                        <Menu.Item color="red" onClick={handleDeleteTag}>Delete Tag</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>

            {/* Progress Tracking */}
            <div style={{ marginTop: '10px', padding: '0 15px' }}>
                <p>Progress: {completedCount}/{totalFlashcards} flashcards completed</p>
                <Progress value={progressPercentage} />
            </div>

            {/* Collapsible Flashcard List */}
            {opened && (
                <div style={{ padding: '10px 15px' }}>
                    {tagFlashcards.length > 0 ? (
                        tagFlashcards.map((flashcard) => (
                            <FlashcardCard key={flashcard.id} flashcard={flashcard} />
                        ))
                    ) : (
                        <p>No flashcards available. Add a new flashcard to get started.</p>
                    )}
                </div>
            )}

            {/* Edit Tag Modal */}
            <Modal
                opened={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditError(''); // Clear error on modal close
                }}
                title="Edit Tag"
            >
                <TextInput
                    label="Tag Name"
                    placeholder="Enter tag name"
                    value={editedTagName}
                    onChange={(e) => {
                        setEditedTagName(e.currentTarget.value);
                        setEditError('');
                    }}
                    error={editError}
                    required
                />
                <ColorInput
                    label="Tag Color"
                    value={editedTagColor}
                    onChange={setEditedTagColor}
                    placeholder="Choose color or enter hex code"
                    required
                    style={{ marginTop: '10px' }}
                />
                <Group position="right" style={{ marginTop: '20px' }}>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </Group>
            </Modal>

            {/* Flashcard Creation Modal */}
            <Modal
                opened={isFlashcardModalOpen}
                onClose={closeFlashcardModal}
                title="Create Flashcard"
                size="xl"
            >
                <div style={{ marginBottom: '10px' }}>
                    <p><strong>Question</strong></p>
                    <FlashcardTextEditor
                        ref={questionEditorRef}
                        content={questionContent}
                        onChange={setQuestionContent}
                        key={`question-${isFlashcardModalOpen}`}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <p><strong>Answer</strong></p>
                    <FlashcardTextEditor
                        ref={answerEditorRef}
                        content={answerContent}
                        onChange={setAnswerContent}
                        key={`answer-${isFlashcardModalOpen}`}
                    />
                </div>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                <Group position="apart">
                    <Button onClick={() => saveFlashcard(false)}>Save</Button>
                    <Button color="blue" onClick={() => saveFlashcard(true)}>Save and Add Another</Button>
                </Group>
            </Modal>
        </Card>
    );
};

export default TagSection;