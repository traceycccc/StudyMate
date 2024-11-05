// // FlashcardCard.js
// import React from 'react';
// import { Card, Group, Menu, ActionIcon } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';

// const FlashcardCard = ({ flashcard, onEdit, onDelete }) => {
//     return (
//         <Card shadow="sm" padding="sm" style={{ marginBottom: '10px' }}>
//             <Group position="apart">
//                 <h4 style={{ margin: 0 }}>{flashcard.question}</h4>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon variant="light">
//                             <IconDots size={16} />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={onEdit}>Edit</Menu.Item>
//                         <Menu.Item onClick={onDelete} color="red">
//                             Delete
//                         </Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </Group>
//         </Card>
//     );
// };

// export default FlashcardCard;




// import React from 'react';
// import { Card, Text } from '@mantine/core';

// const FlashcardCard = ({ flashcard }) => {
//     return (
//         <Card shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
//             <Text weight={500} size="lg" style={{ marginBottom: '5px' }}>Q: {flashcard.question}</Text>
//             <Text color="dimmed">A: {flashcard.answer}</Text>
//         </Card>
//     );
// };

// export default FlashcardCard;



// import React from 'react';
// import { Card, Text } from '@mantine/core';

// const FlashcardCard = ({ flashcard }) => {
//     return (
//         <Card shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
//             <Text weight={500} size="lg" style={{ marginBottom: '5px' }}>Q: {flashcard.question}</Text>
//             <Text color="dimmed">A: {flashcard.answer}</Text>
//         </Card>
//     );
// };

// export default FlashcardCard;



//trying to render using the FlashcardTextEditor.js
// import React, { useEffect } from 'react';
// import FlashcardTextEditor from './FlashcardTextEditor';
// import { Card, Text } from '@mantine/core';

// const FlashcardCard = ({ flashcard }) => {
//     // Log the question and answer content for debugging
//     useEffect(() => {
//         console.log("Flashcard Question:", flashcard.question);
//         console.log("Flashcard Answer:", flashcard.answer);
//     }, [flashcard]);

//     return (
//         <Card shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
//             <div style={{ marginBottom: '5px' }}>Q:</div>
//             <FlashcardTextEditor content={flashcard.question} readOnly={true} />
            
//             <div style={{ marginTop: '10px' }}>A:</div>
//             <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
//         </Card>
//     );
// };
// export default FlashcardCard;


// import React, { useEffect } from 'react';
// import FlashcardTextEditor from './FlashcardTextEditor';
// import { Card, Divider, Text } from '@mantine/core';

// const FlashcardCard = ({ flashcard }) => {
//     useEffect(() => {
//         console.log("Flashcard Question:", flashcard.question);
//         console.log("Flashcard Answer:", flashcard.answer);
//     }, [flashcard]);

//     return (
//         <Card shadow="sm" padding="lg" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column' }}>
//             {/* Content Container */}
//             <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '10px' }}>
//                 {/* Question */}
//                 <Text weight={500}>Q:</Text>
//                 <FlashcardTextEditor content={flashcard.question} readOnly={true} />

//                 {/* Horizontal Divider */}
//                 <Divider my="sm" />

//                 {/* Answer */}
//                 <Text weight={500}>A:</Text>
//                 <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
//             </div>

//             {/* Bottom Bar */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
//                 <Text size="sm" color="dimmed">
//                     Last Rating: {flashcard.rating || 'N/A'}
//                 </Text>
//                 <div>
//                     {/* Three-dot Menu Placeholder */}
//                     <Text size="sm" style={{ cursor: 'pointer' }}>•••</Text>
//                 </div>
//             </div>
//         </Card>
//     );
// };

// export default FlashcardCard;


//ateempt to restyle
// import React, { useEffect } from 'react';
// import FlashcardTextEditor from './FlashcardTextEditor';
// import { Card, Divider, Text } from '@mantine/core';

// const FlashcardCard = ({ flashcard }) => {
//     useEffect(() => {
//         console.log("Flashcard Question:", flashcard.question);
//         console.log("Flashcard Answer:", flashcard.answer);
//     }, [flashcard]);

//     return (
//         <Card
//             shadow="sm"
//             padding="md"
//             style={{
//                 width: '250px',  // Fixed width to align as cards in a grid
//                 marginBottom: '10px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between'
//             }}
//         >
//             {/* Content Container */}
//             <div style={{ maxHeight: '150px', overflowY: 'auto', padding: '10px' }}>
//                 {/* Question */}
//                 <Text weight={500}>Q:</Text>
//                 <FlashcardTextEditor content={flashcard.question} readOnly={true} />

//                 {/* Horizontal Divider */}
//                 <Divider my="sm" />

//                 {/* Answer */}
//                 <Text weight={500}>A:</Text>
//                 <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
//             </div>

//             {/* Bottom Bar */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
//                 <Text size="xs" color="dimmed">
//                     Last Rating: {flashcard.rating || 'N/A'}
//                 </Text>
//                 <div>
//                     {/* Three-dot Menu Placeholder */}
//                     <Text size="sm" style={{ cursor: 'pointer' }}>•••</Text>
//                 </div>
//             </div>
//         </Card>
//     );
// };

// export default FlashcardCard;



// FlashcardCard.js
//another ver
// import React from 'react';
// import { Card, Text, Menu, ActionIcon } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardTextEditor from './FlashcardTextEditor';

// const FlashcardCard = ({ flashcard }) => {
//     return (
//         <Card shadow="sm" padding="lg" style={{ width: '100%', marginBottom: '10px' }}>
//             {/* Content Area */}
//             <div style={{
//                 height: '150px',
//                 overflowY: 'auto',
//                 borderBottom: '1px solid #ccc',
//                 padding: '10px',
//                 display: 'flex',
//                 flexDirection: 'column'
//             }}>
//                 <Text weight={500}>Q: </Text>
//                 <FlashcardTextEditor content={flashcard.question} readOnly={true} style={{ fontSize: '14px', height: 'auto' }} />

//                 <Text weight={500} mt="md">A: </Text>
//                 <FlashcardTextEditor content={flashcard.answer} readOnly={true} style={{ fontSize: '14px', height: 'auto' }} />
//             </div>

//             {/* Bottom Bar */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '10px 0'
//             }}>
//                 <Text size="sm">Last scored rating: {flashcard.rating || 'N/A'}/5</Text>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots size={18} />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item>Edit</Menu.Item>
//                         <Menu.Item color="red">Delete</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//         </Card>
//     );
// };

// export default FlashcardCard;



// FlashcardCard.js

// import React from 'react';
// import { Card, Text, Menu, ActionIcon } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardTextEditor from './FlashcardTextEditor';

// const FlashcardCard = ({ flashcard }) => {
//     return (
//         <Card shadow="sm" padding="lg" style={{ width: '100%', height: '200px', marginBottom: '10px' }}>
//             {/* Content Area */}
//             <div style={{
//                 height: '120px',
//                 overflowY: 'auto',
//                 padding: '5px',
//                 display: 'flex',
//                 flexDirection: 'column'
//             }}>
//                 <Text weight={500}>Q:</Text>
//                 <FlashcardTextEditor content={flashcard.question} readOnly={true} />

//                 <Text weight={500} mt="sm">A:</Text>
//                 <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
//             </div>

//             {/* Bottom Bar */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '5px 0'
//             }}>
//                 <Text size="xs">Last scored rating: {flashcard.rating || 'N/A'}/5</Text>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots size={16} />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item>Edit</Menu.Item>
//                         <Menu.Item color="red">Delete</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//         </Card>
//     );
// };

// export default FlashcardCard;


//beutify
// import React from 'react';
// import { Card, Text, Menu, ActionIcon } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardTextEditor from './FlashcardTextEditor';

// const FlashcardCard = ({ flashcard }) => {
//     return (
//         <Card shadow="sm" padding="lg" style={{ width: '100%', height: '240px', marginBottom: '10px' }}>
//             {/* Content Area */}
//             <div style={{
//                 overflowY: 'auto',
//                 padding: '5px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '0px'
//             }}>
                
//                 <FlashcardTextEditor content={flashcard.question} readOnly={true} />
//                 {/* Horizontal line between question and answer */}
//                 <hr style={{
//                     width: '100%',
//                     border: 'none',
//                     borderTop: '1px solid #d1d1d1', // Customize color as needed
//                 }} />

              

//                 <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
//             </div>

//             {/* Bottom Bar */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '5px 0',
//                 borderTop: '1px solid #d1d1d1',
//                 marginTop: '10px',
//             }}>
//                 <Text size="xs">Last scored rating: {flashcard.rating || 'N/A'}/5</Text>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots size={16} />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item>Edit</Menu.Item>
//                         <Menu.Item color="red">Delete</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//         </Card>
//     );
// };

// export default FlashcardCard;



////getting there
// import React from 'react';
// import { Card, Text, Menu, ActionIcon } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardTextEditor from './FlashcardTextEditor';

// const FlashcardCard = ({ flashcard }) => {
//     return (
//         <Card shadow="sm" padding={0} style={{ width: '100%', height: '240px', marginBottom: '10px' }}>
//             {/* Content Area */}
//             <div style={{
//                 overflowY: 'auto',
//                 padding: '10px', // Add padding here for content area
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '0px',
//                 height: '180px' // Adjust height as needed to control the overall layout
//             }}>
//                 <FlashcardTextEditor content={flashcard.question} readOnly={true} />

//                 {/* Horizontal line between question and answer */}
//                 <hr style={{
//                     width: '100%',
//                     border: 'none',
//                     borderTop: '1px solid #d1d1d1'
//                 }} />

//                 <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
//             </div>

//             {/* Bottom Bar */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '5px 10px', // Add padding to bottom bar if needed
//                 borderTop: '1px solid #d1d1d1', // Top border to separate from content area
//                 height: '60px' // Set a fixed height if needed for consistency
//             }}>
//                 <Text size="xs">Last scored rating: {flashcard.rating || 'N/A'}/5</Text>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots size={16} />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item>Edit</Menu.Item>
//                         <Menu.Item color="red">Delete</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//         </Card>
//     );
// };

// export default FlashcardCard;



// FlashcardCard.js

// import React from 'react';
// import { Card, Text, Menu, ActionIcon } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardTextEditor from './FlashcardTextEditor';

// const FlashcardCard = ({ flashcard }) => {
//     return (
//         <Card shadow="sm" padding={0} style={{ width: '100%', height: '240px', marginBottom: '10px' }}>
//             {/* Content Area */}
//             <div style={{
//                 overflowY: 'auto',
//                 padding: '10px', // Add padding here for content area
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '0px',
//                 height: '180px', // Adjust height as needed to control the overall layout
//                 boxSizing: 'border-box' // Ensure padding is included within the width
//             }}>
//                 <FlashcardTextEditor content={flashcard.question} readOnly={true} />

//                 {/* Horizontal line between question and answer */}
//                 <hr style={{
//                     width: '100%',
//                     border: 'none',
//                     borderTop: '1px solid #d1d1d1'
//                 }} />

//                 <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
//             </div>

//             {/* Bottom Bar */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '5px 10px', // Add padding to bottom bar if needed
//                 borderTop: '1px solid #d1d1d1', // Top border to separate from content area
//                 height: '60px' // Set a fixed height if needed for consistency
//             }}>
//                 <Text size="xs">Last scored rating: {flashcard.rating || 'N/A'}/5</Text>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots size={16} />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item>Edit</Menu.Item>
//                         <Menu.Item color="red">Delete</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//         </Card>
//     );
// };

// export default FlashcardCard;




// FlashcardCard.js

// FlashcardCard.js
// FlashcardCard.js

// import React from 'react';
// import { Card, Text, Menu, ActionIcon } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardTextEditor from './FlashcardTextEditor';

// const FlashcardCard = ({ flashcard }) => {
//     return (
//         <Card shadow="sm" padding={0} style={{ width: '100%', height: '240px', marginBottom: '10px' }}>
//             {/* Outer Content Container with Padding */}
//             <div style={{
//                 padding: '15px', // Outer container padding
//                 height: '180px', // Adjust height for layout consistency
//                 boxSizing: 'border-box',
//             }}>
//                 {/* Inner Scrollable Container */}
//                 <div style={{
//                     overflowY: 'auto',
//                     height: '100%',
//                     paddingRight: '10px' // Adds space between content and scrollbar
//                 }}>
//                     <FlashcardTextEditor content={flashcard.question} readOnly={true} />

//                     {/* Horizontal line between question and answer */}
//                     <hr style={{
//                         width: '100%',
//                         border: 'none',
//                         borderTop: '1px solid #d1d1d1'
//                     }} />

//                     <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
//                 </div>
//             </div>

//             {/* Bottom Bar */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '5px 10px', // Add padding to bottom bar if needed
//                 borderTop: '1px solid #d1d1d1', // Top border to separate from content area
//                 height: '60px' // Set a fixed height if needed for consistency
//             }}>
//                 <Text size="xs">Last scored rating: {flashcard.rating || 'N/A'}/5</Text>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon
//                             style={{
//                                 backgroundColor: 'transparent', // Set the default background color of the button
//                                 color: 'black', // Default color of the icon
//                                 transition: 'background-color 0.3s ease', // Smooth transition for hover
//                             }}
//                             radius="xl"
//                             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} // Hover color
//                             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
//                         >
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item>Edit</Menu.Item>
//                         <Menu.Item color="red">Delete</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//         </Card>
//     );
// };

// export default FlashcardCard;




//edit and delete
// import React, { useState, useRef } from 'react';
// import { Card, Text, Menu, ActionIcon, Modal, Button, Group, } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardTextEditor from './FlashcardTextEditor';
// import { doc, updateDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';

// const FlashcardCard = ({ flashcard }) => {
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [loading, setLoading] = useState(false); // Loading state for save button
//     const questionEditorRef = useRef(null);
//     const answerEditorRef = useRef(null);

//     // Open the edit modal and populate it with the current flashcard data
//     const openEditModal = () => {
//         setIsEditModalOpen(true);
//     };

//     // Close the edit modal
//     const closeEditModal = () => {
//         setIsEditModalOpen(false);
//     };

//     // Save the edited flashcard to Firestore
//     const saveEditedFlashcard = async () => {
//         const updatedQuestionContent = questionEditorRef.current.getContent();
//         const updatedAnswerContent = answerEditorRef.current.getContent();

//         if (!updatedQuestionContent.trim() || !updatedAnswerContent.trim()) {
//             alert("Both question and answer fields must be filled.");
//             return;
//         }

//         setLoading(true); // Start loading
//         try {
//             const flashcardRef = doc(firestore, 'flashcards', flashcard.id);
//             await updateDoc(flashcardRef, {
//                 question: updatedQuestionContent,
//                 answer: updatedAnswerContent,
//             });
//             closeEditModal(); // Close modal after saving
//             console.log("Flashcard updated successfully");
//         } catch (error) {
//             console.error("Error updating flashcard:", error);
//         } finally {
//             setLoading(false); // Stop loading
//         }
//     };


//     return (
//         <Card shadow="sm" padding={0} style={{ width: '100%', height: '240px', marginBottom: '10px' }}>
//             {/* Outer Content Container with Padding */}
//             <div style={{
//                 padding: '15px', // Outer container padding
//                 height: '180px', // Adjust height for layout consistency
//                 boxSizing: 'border-box',
//             }}>
//                 {/* Inner Scrollable Container */}
//                 <div style={{
//                     overflowY: 'auto',
//                     height: '100%',
//                     paddingRight: '10px' // Adds space between content and scrollbar
//                 }}>
//                     <FlashcardTextEditor content={flashcard.question} readOnly={true} />

//                     {/* Horizontal line between question and answer */}
//                     <hr style={{
//                         width: '100%',
//                         border: 'none',
//                         borderTop: '1px solid #d1d1d1'
//                     }} />

//                     <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
//                 </div>
//             </div>

//             {/* Bottom Bar */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '5px 10px', // Add padding to bottom bar if needed
//                 borderTop: '1px solid #d1d1d1', // Top border to separate from content area
//                 height: '60px' // Set a fixed height if needed for consistency
//             }}>
//                 <Text size="xs">Last scored rating: {flashcard.rating || 'N/A'}/5</Text>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon
//                             style={{
//                                 backgroundColor: 'transparent', // Set the default background color of the button
//                                 color: 'black', // Default color of the icon
//                                 transition: 'background-color 0.3s ease', // Smooth transition for hover
//                             }}
//                             radius="xl"
//                             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} // Hover color
//                             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
//                         >
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={openEditModal}>Edit</Menu.Item>
//                         <Menu.Item color="red">Delete</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>


//             {/* Edit Flashcard Modal */}
//             <Modal
//                 opened={isEditModalOpen}
//                 onClose={closeEditModal}
//                 title="Edit Flashcard"
//                 size="xl"
//             >
//                 <div style={{ marginBottom: '10px' }}>
//                     <p><strong>Question</strong></p>
//                     <FlashcardTextEditor
//                         ref={questionEditorRef}
//                         content={flashcard.question}
//                         autosave={false}  // Disable autosave for editing
//                     />
//                 </div>
//                 <div style={{ marginBottom: '20px' }}>
//                     <p><strong>Answer</strong></p>
//                     <FlashcardTextEditor
//                         ref={answerEditorRef}
//                         content={flashcard.answer}
//                         autosave={false}  // Disable autosave for editing
//                     />
//                 </div>
//                 <Group position="right">
//                     <Button onClick={saveEditedFlashcard} loading={loading}>Save Changes</Button>
//                 </Group>
//             </Modal>
//         </Card>
//     );
// };

// export default FlashcardCard;



//edit we do later, i wanna do view flashcard
// import React, { useState, useRef } from 'react';
// import { Card, Text, Menu, ActionIcon, Modal, Button, Group, } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardTextEditor from './FlashcardTextEditor';
// import { doc, updateDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import { useNavigate } from 'react-router-dom';

// const FlashcardCard = ({ flashcard }) => {
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [loading, setLoading] = useState(false); // Loading state for save button
//     const questionEditorRef = useRef(null);
//     const answerEditorRef = useRef(null);
//     const navigate = useNavigate();

//     const handleFlashcardClick = () => {
//         navigate(`/practice-flashcard/${flashcard.tagId}`, { state: { flashcardId: flashcard.id } });
//     };

//     // Open the edit modal and populate it with the current flashcard data
//     const openEditModal = () => {
//         setIsEditModalOpen(true);
//     };

//     // Close the edit modal
//     const closeEditModal = () => {
//         setIsEditModalOpen(false);
//     };

//     // Save the edited flashcard to Firestore
//     const saveEditedFlashcard = async () => {
//         const updatedQuestionContent = questionEditorRef.current.getContent();
//         const updatedAnswerContent = answerEditorRef.current.getContent();

//         if (!updatedQuestionContent.trim() || !updatedAnswerContent.trim()) {
//             alert("Both question and answer fields must be filled.");
//             return;
//         }

//         setLoading(true); // Start loading
//         try {
//             const flashcardRef = doc(firestore, 'flashcards', flashcard.id);
//             await updateDoc(flashcardRef, {
//                 question: updatedQuestionContent,
//                 answer: updatedAnswerContent,
//             });
//             closeEditModal(); // Close modal after saving
//             console.log("Flashcard updated successfully");
//         } catch (error) {
//             console.error("Error updating flashcard:", error);
//         } finally {
//             setLoading(false); // Stop loading
//         }
//     };


//     return (
//         <Card 
//             shadow="sm" 
//             padding={0} 
//             style={{ 
//                 width: '100%', 
//                 height: '240px', 
//                 marginBottom: '10px',
//                 cursor: 'pointer', // Set cursor to pointer 
//             }}
//             onClick={handleFlashcardClick}  //navigate to view and practice flashcard
//         >
//             {/* Outer Content Container with Padding */}
//             <div style={{
                
//                 padding: '15px', // Outer container padding
//                 height: '180px', // Adjust height for layout consistency
//                 boxSizing: 'border-box',
//             }}>
//                 {/* Inner Scrollable Container */}
//                 <div style={{
//                     overflowY: 'auto',
//                     height: '100%',
//                     paddingRight: '10px' // Adds space between content and scrollbar
//                 }}>
//                     <FlashcardTextEditor content={flashcard.question} readOnly={true} />

//                     {/* Horizontal line between question and answer */}
//                     <hr style={{
//                         width: '100%',
//                         border: 'none',
//                         borderTop: '1px solid #d1d1d1'
//                     }} />

//                     <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
//                 </div>
//             </div>

//             {/* Bottom Bar */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '5px 10px', // Add padding to bottom bar if needed
//                 borderTop: '1px solid #d1d1d1', // Top border to separate from content area
//                 height: '60px' // Set a fixed height if needed for consistency
//             }}>
//                 <Text size="xs">Last scored rating: {flashcard.rating || 'N/A'}/5</Text>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon onClick={(e) => e.stopPropagation()}
//                             style={{
//                                 backgroundColor: 'transparent', // Set the default background color of the button
//                                 color: 'black', // Default color of the icon
//                                 transition: 'background-color 0.3s ease', // Smooth transition for hover
//                             }}
//                             radius="xl"
//                             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} // Hover color
//                             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
//                         >
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={(e) => { e.stopPropagation(); openEditModal(); }}>Edit</Menu.Item>
//                         <Menu.Item color="red" onClick={(e) => { e.stopPropagation(); /* handle delete logic here */ }}>Delete</Menu.Item>
//                     </Menu.Dropdown>

//                 </Menu>
//             </div>


//             {/* Edit Flashcard Modal */}
//             <Modal
//                 opened={isEditModalOpen}
//                 onClose={closeEditModal}
//                 title="Edit Flashcard"
//                 size="xl"
//             >
//                 <div style={{ marginBottom: '10px' }}>
//                     <p><strong>Question</strong></p>
//                     <FlashcardTextEditor
//                         ref={questionEditorRef}
//                         content={flashcard.question}
//                         autosave={false}  // Disable autosave for editing
//                     />
//                 </div>
//                 <div style={{ marginBottom: '20px' }}>
//                     <p><strong>Answer</strong></p>
//                     <FlashcardTextEditor
//                         ref={answerEditorRef}
//                         content={flashcard.answer}
//                         autosave={false}  // Disable autosave for editing
//                     />
//                 </div>
//                 <Group position="right">
//                     <Button onClick={saveEditedFlashcard} loading={loading}>Save Changes</Button>
//                 </Group>
//             </Modal>
//         </Card>
//     );
// };

// export default FlashcardCard;





// import React, { useState, useRef } from 'react';
// import { Card, Text, Menu, ActionIcon, Modal, Button, Group } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardTextEditor from './FlashcardTextEditor';
// import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import { useNavigate } from 'react-router-dom';

// const FlashcardCard = ({ flashcard, onDelete }) => {
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [loading, setLoading] = useState(false); // Loading state for save button
//     const questionEditorRef = useRef(null);
//     const answerEditorRef = useRef(null);
//     const navigate = useNavigate();

//     // Open the edit modal
//     const openEditModal = () => {
//         setIsEditModalOpen(true);
//     };

//     // Close the edit modal
//     const closeEditModal = () => {
//         setIsEditModalOpen(false);
//     };

//     // Open delete confirmation modal
//     const openDeleteModal = () => {
//         setIsDeleteModalOpen(true);
//     };

//     // Close delete confirmation modal
//     const closeDeleteModal = () => {
//         setIsDeleteModalOpen(false);
//     };

//     // Navigate to practice page
//     const handlePracticeView = () => {
//         navigate(`/practice-flashcard/${flashcard.tagId}`, { state: { flashcardId: flashcard.id } });
//     };

//     // Save the edited flashcard to Firestore
//     const saveEditedFlashcard = async () => {
//         const updatedQuestionContent = questionEditorRef.current.getContent();
//         const updatedAnswerContent = answerEditorRef.current.getContent();

//         console.log("updated question", updatedQuestionContent);
//         console.log("updated answer", updatedAnswerContent);

        

//         setLoading(true); // Start loading
//         try {
//             const flashcardRef = doc(firestore, 'flashcards', flashcard.id);
//             await updateDoc(flashcardRef, {
//                 question: updatedQuestionContent,
//                 answer: updatedAnswerContent,
//             });
//             closeEditModal(); // Close modal after saving
//             console.log("Flashcard updated successfully");
//         } catch (error) {
//             console.error("Error updating flashcard:", error);
//         } finally {
//             setLoading(false); // Stop loading
//         }
//     };

//     // Delete flashcard from Firestore
//     const handleDeleteFlashcard = async () => {
//         try {
//             const flashcardRef = doc(firestore, 'flashcards', flashcard.id);
//             await deleteDoc(flashcardRef);
//             closeDeleteModal(); // Close modal after deleting
//             console.log("Flashcard deleted successfully");
//             if (onDelete) onDelete(flashcard.id); // Call the onDelete prop to update UI
//         } catch (error) {
//             console.error("Error deleting flashcard:", error);
//         }
//     };

//     return (
//         <Card
//             shadow="sm"
//             padding={0}
//             style={{
//                 width: '100%',
//                 height: '240px',
//                 marginBottom: '10px',
//             }}
//         >
//             {/* Outer Content Container with Padding */}
//             <div style={{
//                 padding: '15px', // Outer container padding
//                 height: '180px', // Adjust height for layout consistency
//                 boxSizing: 'border-box',
//             }}>
//                 {/* Inner Scrollable Container */}
//                 <div style={{
//                     overflowY: 'auto',
//                     height: '100%',
//                     paddingRight: '10px' // Adds space between content and scrollbar
//                 }}>
//                     <FlashcardTextEditor content={flashcard.question} readOnly={true} />

//                     {/* Horizontal line between question and answer */}
//                     <hr style={{
//                         width: '100%',
//                         border: 'none',
//                         borderTop: '1px solid #d1d1d1'
//                     }} />

//                     <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
//                 </div>
//             </div>

//             {/* Bottom Bar */}
//             <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '5px 10px', // Add padding to bottom bar if needed
//                 borderTop: '1px solid #d1d1d1', // Top border to separate from content area
//                 height: '60px' // Set a fixed height if needed for consistency
//             }}>
//                 <Text size="xs">Last scored rating: {flashcard.rating || 'N/A'}/5</Text>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon
//                             style={{
//                                 backgroundColor: 'transparent', // Set the default background color of the button
//                                 color: 'black', // Default color of the icon
//                                 transition: 'background-color 0.3s ease', // Smooth transition for hover
//                             }}
//                             radius="xl"
//                             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} // Hover color
//                             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
//                         >
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={handlePracticeView}>View and Practice</Menu.Item>
//                         <Menu.Item onClick={openEditModal}>Edit</Menu.Item>
//                         <Menu.Item color="red" onClick={openDeleteModal}>Delete</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>

//             {/* Edit Flashcard Modal */}
//             <Modal
//                 opened={isEditModalOpen}
//                 onClose={closeEditModal}
//                 title="Edit Flashcard"
//                 size="xl"
//             >
//                 <div style={{ marginBottom: '10px' }}>
//                     <p><strong>Question</strong></p>
//                     <FlashcardTextEditor
//                         ref={questionEditorRef}
//                         content={flashcard.question}
//                         autosave={false}  // Disable autosave for editing
//                     />
//                 </div>
//                 <div style={{ marginBottom: '20px' }}>
//                     <p><strong>Answer</strong></p>
//                     <FlashcardTextEditor
//                         ref={answerEditorRef}
//                         content={flashcard.answer}
//                         autosave={false}  // Disable autosave for editing
//                     />
//                 </div>
//                 <Group position="right">
//                     <Button onClick={saveEditedFlashcard} loading={loading}>Save Changes</Button>
//                 </Group>
//             </Modal>


//             {/* Delete Confirmation Modal */}
//             <Modal
//                 opened={isDeleteModalOpen}
//                 onClose={closeDeleteModal}
//                 title="Confirm Delete"
//                 size="sm"
//             >
//                 <Text>Are you sure you want to delete this flashcard? This action cannot be undone.</Text>
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
//                     <Button color="red" onClick={handleDeleteFlashcard}>Delete</Button>
//                 </Group>
//             </Modal>
//         </Card>
//     );
// };

// export default FlashcardCard;



//fix the edit logic
import React, { useState, useRef } from 'react';
import { Card, Text, Menu, ActionIcon, Modal, Button, Group } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';
import FlashcardTextEditor from './FlashcardTextEditor';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { useNavigate } from 'react-router-dom';

const FlashcardCard = ({ flashcard, onDelete }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state for save button
    const [error, setError] = useState({ question: '', answer: '' }); // Error state
    const questionEditorRef = useRef(null);
    const answerEditorRef = useRef(null);
    const navigate = useNavigate();

    // Open the edit modal
    const openEditModal = () => {
        setIsEditModalOpen(true);
        setError({ question: '', answer: '' }); // Reset error on modal open
    };

    // Close the edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    // Open delete confirmation modal
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    // Navigate to practice page
    const handlePracticeView = () => {
        navigate(`/practice-flashcard/${flashcard.tagId}`, { state: { flashcardId: flashcard.id } });
    };

    // Save the edited flashcard to Firestore
    // const saveEditedFlashcard = async () => {
    //     const updatedQuestionContent = questionEditorRef.current.getContent();
    //     const updatedAnswerContent = answerEditorRef.current.getContent();

    //     console.log("updated question", updatedQuestionContent);
    //     console.log("updated answer", updatedAnswerContent);

    //     // Validate fields
    //     const errors = {
    //         question: !updatedQuestionContent.trim() ? 'Question cannot be empty.' : '',
    //         answer: !updatedAnswerContent.trim() ? 'Answer cannot be empty.' : ''
    //     };
    //     setError(errors);

    //     // Check if there are any validation errors
    //     if (errors.question || errors.answer) return;

    //     setLoading(true); // Start loading
    //     try {
    //         const flashcardRef = doc(firestore, 'flashcards', flashcard.id);
    //         await updateDoc(flashcardRef, {
    //             question: updatedQuestionContent,
    //             answer: updatedAnswerContent,
    //         });
    //         closeEditModal(); // Close modal after saving
    //         console.log("Flashcard updated successfully");
    //     } catch (error) {
    //         console.error("Error updating flashcard:", error);
    //     } finally {
    //         setLoading(false); // Stop loading
    //     }
    // };

    // Save the edited flashcard to Firestore
    const saveEditedFlashcard = async () => {
        // Get the content from both editors
        const updatedQuestionContent = questionEditorRef.current.getContent();
        const updatedAnswerContent = answerEditorRef.current.getContent();

        // Debugging - Print content values
        console.log("Updated question:", updatedQuestionContent);
        console.log("Updated answer:", updatedAnswerContent);

        // Validate fields - check if content is truly empty
        const errors = {
            question: (!updatedQuestionContent || updatedQuestionContent.trim() === "<p></p>") ? 'Question cannot be empty.' : '',
            answer: (!updatedAnswerContent || updatedAnswerContent.trim() === "<p></p>") ? 'Answer cannot be empty.' : ''
        };

        setError(errors);

        // Check if there are any validation errors
        if (errors.question || errors.answer) return;

        setLoading(true); // Start loading
        try {
            const flashcardRef = doc(firestore, 'flashcards', flashcard.id);
            await updateDoc(flashcardRef, {
                question: updatedQuestionContent,
                answer: updatedAnswerContent,
            });
            closeEditModal(); // Close modal after saving
            console.log("Flashcard updated successfully");
        } catch (error) {
            console.error("Error updating flashcard:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };


    // Delete flashcard from Firestore
    const handleDeleteFlashcard = async () => {
        try {
            const flashcardRef = doc(firestore, 'flashcards', flashcard.id);
            await deleteDoc(flashcardRef);
            closeDeleteModal(); // Close modal after deleting
            console.log("Flashcard deleted successfully");
            if (onDelete) onDelete(flashcard.id); // Call the onDelete prop to update UI
        } catch (error) {
            console.error("Error deleting flashcard:", error);
        }
    };

    return (
        <Card
            shadow="sm"
            padding={0}
            style={{
                width: '100%',
                height: '240px',
                marginBottom: '10px',
            }}
        >
            {/* Outer Content Container with Padding */}
            <div style={{
                padding: '15px', // Outer container padding
                height: '180px', // Adjust height for layout consistency
                boxSizing: 'border-box',
            }}>
                {/* Inner Scrollable Container */}
                <div style={{
                    overflowY: 'auto',
                    height: '100%',
                    paddingRight: '10px' // Adds space between content and scrollbar
                }}>
                    <FlashcardTextEditor content={flashcard.question} readOnly={true} />

                    {/* Horizontal line between question and answer */}
                    <hr style={{
                        width: '100%',
                        border: 'none',
                        borderTop: '1px solid #d1d1d1'
                    }} />

                    <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 10px', // Add padding to bottom bar if needed
                borderTop: '1px solid #d1d1d1', // Top border to separate from content area
                height: '60px' // Set a fixed height if needed for consistency
            }}>
                <Text size="xs">Last scored rating: {flashcard.rating || 'N/A'}/5</Text>
                <Menu position="bottom-end">
                    <Menu.Target>
                        <ActionIcon
                            style={{
                                backgroundColor: 'transparent', // Set the default background color of the button
                                color: 'black', // Default color of the icon
                                transition: 'background-color 0.3s ease', // Smooth transition for hover
                            }}
                            radius="xl"
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} // Hover color
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
                        >
                            <IconDots />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={handlePracticeView}>View and Practice</Menu.Item>
                        <Menu.Item onClick={openEditModal}>Edit</Menu.Item>
                        <Menu.Item color="red" onClick={openDeleteModal}>Delete</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>

            {/* Edit Flashcard Modal */}
            <Modal
                opened={isEditModalOpen}
                onClose={closeEditModal}
                title="Edit Flashcard"
                size="xl"
            >
                <div style={{ marginBottom: '10px' }}>
                    <p><strong>Question</strong></p>
                    <FlashcardTextEditor
                        ref={questionEditorRef}
                        content={flashcard.question}
                        autosave={false}  // Disable autosave for editing
                    />
                    {error.question && <p style={{ color: 'red', marginTop: '5px' }}>{error.question}</p>}
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <p><strong>Answer</strong></p>
                    <FlashcardTextEditor
                        ref={answerEditorRef}
                        content={flashcard.answer}
                        autosave={false}  // Disable autosave for editing
                    />
                    {error.answer && <p style={{ color: 'red', marginTop: '5px' }}>{error.answer}</p>}
                </div>
                <Group position="right">
                    <Button onClick={saveEditedFlashcard} loading={loading}>Save Changes</Button>
                </Group>
            </Modal>


            {/* Delete Confirmation Modal */}
            <Modal
                opened={isDeleteModalOpen}
                onClose={closeDeleteModal}
                title="Confirm Delete"
                size="sm"
            >
                <Text>Are you sure you want to delete this flashcard? This action cannot be undone.</Text>
                <Group position="right" style={{ marginTop: '20px' }}>
                    <Button variant="outline" onClick={closeDeleteModal}>Cancel</Button>
                    <Button color="red" onClick={handleDeleteFlashcard}>Delete</Button>
                </Group>
            </Modal>
        </Card>
    );
};

export default FlashcardCard;




