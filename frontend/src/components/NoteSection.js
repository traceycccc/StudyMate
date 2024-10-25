// import React, { useState } from 'react';
// import { Card, ActionIcon, Menu } from '@mantine/core';
// import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
// import NoteItem from './NoteItem';

// const NoteSection = ({ section }) => {
//     const [expanded, setExpanded] = useState(false);

//     const toggleExpanded = () => {
//         setExpanded(!expanded);
//     };

//     return (
//         <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpanded}>
//                     {expanded ? <IconChevronDown /> : <IconChevronRight />}
//                     <h3 style={{ marginLeft: '10px' }}>{section.name}</h3>
//                 </div>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item>Edit Section</Menu.Item>
//                         <Menu.Item>Delete Section</Menu.Item>
//                         <Menu.Item>Add Note</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//             {expanded && (
//                 <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
//                     {section.notes.map((note) => (
//                         <NoteItem key={note.id} note={note} />
//                     ))}
//                 </div>
//             )}
//         </Card>
//     );
// };

// export default NoteSection;




// import React from 'react';
// import { Card, ActionIcon, Menu } from '@mantine/core';
// import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';

// const NoteSection = ({ section, onEditSection, onDeleteSection }) => {
//     const [expanded, setExpanded] = React.useState(false);

//     const toggleExpanded = () => {
//         setExpanded(!expanded);
//     };

//     return (
//         <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpanded}>
//                     {expanded ? <IconChevronDown /> : <IconChevronRight />}
//                     <h3 style={{ marginLeft: '10px' }}>{section.name}</h3>
//                 </div>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEditSection(section)}>Edit Section</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDeleteSection(section.id)}>Delete Section</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//             {expanded && (
//                 <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
//                     {/* Notes will be displayed here once added */}
//                 </div>
//             )}
//         </Card>
//     );
// };

// export default NoteSection;


// import React, { useState } from 'react';
// import { Card, ActionIcon, Menu, Modal, TextInput, FileInput, Button } from '@mantine/core';
// import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
// import NoteItem from './NoteItem';

// const NoteSection = ({ section, onEditSection, onDeleteSection, onAddNote }) => {
//     const [expanded, setExpanded] = useState(false);
//     const [isPlainNoteModalOpen, setIsPlainNoteModalOpen] = useState(false);
//     const [isDocumentNoteModalOpen, setIsDocumentNoteModalOpen] = useState(false);
//     const [isCodeNoteModalOpen, setIsCodeNoteModalOpen] = useState(false);
//     const [newNoteName, setNewNoteName] = useState('');
//     const [documentFile, setDocumentFile] = useState(null);
//     const [codeFile, setCodeFile] = useState(null);
//     const [error, setError] = useState('');

//     const toggleExpanded = () => {
//         setExpanded(!expanded);
//     };

//     // Handlers for opening modals
//     const openPlainNoteModal = () => {
//         setIsPlainNoteModalOpen(true);
//         setNewNoteName('');
//         setError('');
//     };

//     const openDocumentNoteModal = () => {
//         setIsDocumentNoteModalOpen(true);
//         setNewNoteName('');
//         setDocumentFile(null);
//         setError('');
//     };

//     const openCodeNoteModal = () => {
//         setIsCodeNoteModalOpen(true);
//         setNewNoteName('');
//         setCodeFile(null);
//         setError('');
//     };

//     return (
//         <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpanded}>
//                     {expanded ? <IconChevronDown /> : <IconChevronRight />}
//                     <h3 style={{ marginLeft: '10px' }}>{section.name}</h3>
//                 </div>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEditSection(section)}>Edit Section</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDeleteSection(section.id)}>Delete Section</Menu.Item>
//                         <Menu.Item onClick={openPlainNoteModal}>Add Plain Note</Menu.Item>
//                         <Menu.Item onClick={openDocumentNoteModal}>Add Document + Note</Menu.Item>
//                         <Menu.Item onClick={openCodeNoteModal}>Add Code + Note</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//             {expanded && (
//                 <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
//                     {section.notes && section.notes.map((note) => (
//                         <NoteItem key={note.id} note={note} />
//                     ))}
//                 </div>
//             )}

//             {/* Modals for Adding Notes */}
//             <Modal opened={isPlainNoteModalOpen} onClose={() => setIsPlainNoteModalOpen(false)} title="Add Plain Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={() => onAddNote('plain', newNoteName, null)}>Add Note</Button>
//             </Modal>

//             <Modal opened={isDocumentNoteModalOpen} onClose={() => setIsDocumentNoteModalOpen(false)} title="Add Document + Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                 />
//                 <FileInput
//                     label="Upload Document"
//                     placeholder="Upload a PDF, DOCX, or PPTX file"
//                     accept=".pdf,.docx,.pptx"
//                     value={documentFile}
//                     onChange={setDocumentFile}
//                 />
//                 <Button onClick={() => onAddNote('document', newNoteName, documentFile)}>Add Note</Button>
//             </Modal>

//             <Modal opened={isCodeNoteModalOpen} onClose={() => setIsCodeNoteModalOpen(false)} title="Add Code + Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                 />
//                 <FileInput
//                     label="Upload Code File"
//                     placeholder="Upload a code file"
//                     accept=".js,.py,.java,.cpp" // Accept code files
//                     value={codeFile}
//                     onChange={setCodeFile}
//                 />
//                 <Button onClick={() => onAddNote('code', newNoteName, codeFile)}>Add Note</Button>
//             </Modal>
//         </Card>
//     );
// };

// export default NoteSection;




// import React, { useState } from 'react';
// import { Card, ActionIcon, Menu, Modal, TextInput, FileInput, Button } from '@mantine/core';
// import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
// import NoteItem from './NoteItem';

// const NoteSection = ({ section, onEditSection, onDeleteSection, onAddNote }) => {
//     const [expanded, setExpanded] = useState(false);
//     const [isPlainNoteModalOpen, setIsPlainNoteModalOpen] = useState(false);
//     const [isDocumentNoteModalOpen, setIsDocumentNoteModalOpen] = useState(false);
//     const [isCodeNoteModalOpen, setIsCodeNoteModalOpen] = useState(false);
//     const [newNoteName, setNewNoteName] = useState('');
//     const [documentFile, setDocumentFile] = useState(null);
//     const [codeFile, setCodeFile] = useState(null);
//     const [error, setError] = useState('');

//     const toggleExpanded = () => {
//         setExpanded(!expanded);
//     };

//     // Handlers for opening modals
//     const openPlainNoteModal = () => {
//         setIsPlainNoteModalOpen(true);
//         setNewNoteName('');
//         setError('');
//     };

//     const openDocumentNoteModal = () => {
//         setIsDocumentNoteModalOpen(true);
//         setNewNoteName('');
//         setDocumentFile(null);
//         setError('');
//     };

//     const openCodeNoteModal = () => {
//         setIsCodeNoteModalOpen(true);
//         setNewNoteName('');
//         setCodeFile(null);
//         setError('');
//     };

//     return (
//         <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpanded}>
//                     {expanded ? <IconChevronDown /> : <IconChevronRight />}
//                     <h3 style={{ marginLeft: '10px' }}>{section.name}</h3>
//                 </div>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEditSection(section)}>Edit Section</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDeleteSection(section.id)}>Delete Section</Menu.Item>
//                         <Menu.Item onClick={openPlainNoteModal}>Add Plain Note</Menu.Item>
//                         <Menu.Item onClick={openDocumentNoteModal}>Add Document + Note</Menu.Item>
//                         <Menu.Item onClick={openCodeNoteModal}>Add Code + Note</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//             {expanded && (
//                 <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
//                     {section.notes && section.notes.map((note) => (
//                         <NoteItem key={note.id} note={note} />
//                     ))}
//                 </div>
//             )}

//             {/* Modals for Adding Notes */}
//             <Modal opened={isPlainNoteModalOpen} onClose={() => setIsPlainNoteModalOpen(false)} title="Add Plain Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={() => onAddNote(section.id, 'plain', newNoteName, null)}>Add Note</Button>
//             </Modal>

//             <Modal opened={isDocumentNoteModalOpen} onClose={() => setIsDocumentNoteModalOpen(false)} title="Add Document + Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                 />
//                 <FileInput
//                     label="Upload Document"
//                     placeholder="Upload a PDF, DOCX, or PPTX file"
//                     accept=".pdf,.docx,.pptx"
//                     value={documentFile}
//                     onChange={setDocumentFile}
//                 />
//                 <Button onClick={() => onAddNote(section.id, 'document', newNoteName, documentFile)}>Add Note</Button>
//             </Modal>

//             <Modal opened={isCodeNoteModalOpen} onClose={() => setIsCodeNoteModalOpen(false)} title="Add Code + Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                 />
//                 <FileInput
//                     label="Upload Code File"
//                     placeholder="Upload a code file"
//                     accept=".js,.py,.java,.cpp" // Accept code files
//                     value={codeFile}
//                     onChange={setCodeFile}
//                 />
//                 <Button onClick={() => onAddNote(section.id, 'code', newNoteName, codeFile)}>Add Note</Button>
//             </Modal>
//         </Card>
//     );
// };

// export default NoteSection;


// import React, { useState } from 'react';
// import { Card, ActionIcon, Menu, Modal, TextInput, FileInput, Button } from '@mantine/core';
// import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
// import NoteItem from './NoteItem';

// const NoteSection = ({ section, onEditSection, onDeleteSection, onAddNote }) => {
//     const [expanded, setExpanded] = useState(false);
//     const [isPlainNoteModalOpen, setIsPlainNoteModalOpen] = useState(false);
//     const [isDocumentNoteModalOpen, setIsDocumentNoteModalOpen] = useState(false);
//     const [isCodeNoteModalOpen, setIsCodeNoteModalOpen] = useState(false);
//     const [newNoteName, setNewNoteName] = useState('');
//     const [documentFile, setDocumentFile] = useState(null);
//     const [codeFile, setCodeFile] = useState(null);
//     const [error, setError] = useState('');

//     const toggleExpanded = () => {
//         setExpanded(!expanded);
//     };

//     // Handlers for opening modals
//     const openPlainNoteModal = () => {
//         setIsPlainNoteModalOpen(true);
//         setNewNoteName('');
//         setError('');
//     };

//     const openDocumentNoteModal = () => {
//         setIsDocumentNoteModalOpen(true);
//         setNewNoteName('');
//         setDocumentFile(null);
//         setError('');
//     };

//     const openCodeNoteModal = () => {
//         setIsCodeNoteModalOpen(true);
//         setNewNoteName('');
//         setCodeFile(null);
//         setError('');
//     };

//     return (
//         <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpanded}>
//                     {expanded ? <IconChevronDown /> : <IconChevronRight />}
//                     <h3 style={{ marginLeft: '10px' }}>{section.name}</h3>
//                 </div>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEditSection(section)}>Edit Section</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDeleteSection(section.id)}>Delete Section</Menu.Item>
//                         <Menu.Item onClick={openPlainNoteModal}>Add Plain Note</Menu.Item>
//                         <Menu.Item onClick={openDocumentNoteModal}>Add Document + Note</Menu.Item>
//                         <Menu.Item onClick={openCodeNoteModal}>Add Code + Note</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//             {expanded && (
//                 <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
//                     {section.notes && section.notes.map((note) => (
//                         <NoteItem key={note.id} note={note} />
//                     ))}
//                 </div>
//             )}

//             {/* Modals for Adding Notes */}
//             <Modal opened={isPlainNoteModalOpen} onClose={() => setIsPlainNoteModalOpen(false)} title="Add Plain Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={() => onAddNote(section.id, 'plain', newNoteName, null)}>Add Note</Button>
//             </Modal>

//             <Modal opened={isDocumentNoteModalOpen} onClose={() => setIsDocumentNoteModalOpen(false)} title="Add Document + Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                 />
//                 <FileInput
//                     label="Upload Document"
//                     placeholder="Upload a PDF, DOCX, or PPTX file"
//                     accept=".pdf,.docx,.pptx"
//                     value={documentFile}
//                     onChange={setDocumentFile}
//                 />
//                 <Button onClick={() => onAddNote(section.id, 'document', newNoteName, documentFile)}>Add Note</Button>
//             </Modal>

//             <Modal opened={isCodeNoteModalOpen} onClose={() => setIsCodeNoteModalOpen(false)} title="Add Code + Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                 />
//                 <FileInput
//                     label="Upload Code File"
//                     placeholder="Upload a code file"
//                     accept=".js,.py,.java,.cpp" // Accept code files
//                     value={codeFile}
//                     onChange={setCodeFile}
//                 />
//                 <Button onClick={() => onAddNote(section.id, 'code', newNoteName, codeFile)}>Add Note</Button>
//             </Modal>
//         </Card>
//     );
// };

// export default NoteSection;




// fix to get the pplain note work
// import React, { useState } from 'react';
// import { Card, ActionIcon, Menu, Modal, TextInput, Button } from '@mantine/core';
// import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
// import NoteItem from './NoteItem';
// import { addDoc, collection } from 'firebase/firestore';
// import { firestore } from '../firebase';

// const NoteSection = ({ section, onEditSection, onDeleteSection }) => {
//     const [expanded, setExpanded] = useState(false);
//     const [isPlainNoteModalOpen, setIsPlainNoteModalOpen] = useState(false);
//     const [newNoteName, setNewNoteName] = useState('');
//     const [error, setError] = useState('');

//     const toggleExpanded = () => {
//         setExpanded(!expanded);
//     };

//     // Handler to add a Plain Note to the Firestore
//     const handleAddPlainNote = async () => {
//         if (!newNoteName.trim()) {
//             setError("Note name cannot be empty.");
//             return;
//         }

//         try {
//             await addDoc(collection(firestore, 'notes'), {
//                 name: newNoteName,
//                 sectionId: section.id, // Linking the note to the section
//                 type: 'plain', // Specify the type of note
//                 content: '', // Empty content initially
//                 createdAt: new Date(),
//             });

//             // Clear state after successful addition
//             setIsPlainNoteModalOpen(false);
//             setNewNoteName('');
//             setError('');
//         } catch (error) {
//             console.error("Error adding note:", error);
//             setError("Failed to add note.");
//         }
//     };

//     return (
//         <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpanded}>
//                     {expanded ? <IconChevronDown /> : <IconChevronRight />}
//                     <h3 style={{ marginLeft: '10px' }}>{section.name}</h3>
//                 </div>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEditSection(section)}>Edit Section</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDeleteSection(section.id)}>Delete Section</Menu.Item>
//                         <Menu.Item onClick={() => setIsPlainNoteModalOpen(true)}>Add Plain Note</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//             {expanded && (
//                 <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
//                     {section.notes && section.notes.map((note) => (
//                         <NoteItem key={note.id} note={note} />
//                     ))}
//                 </div>
//             )}

//             {/* Modal for Adding Plain Note */}
//             <Modal opened={isPlainNoteModalOpen} onClose={() => setIsPlainNoteModalOpen(false)} title="Add Plain Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError(''); // Clear any existing error
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={handleAddPlainNote} style={{ marginTop: '10px' }}>
//                     Add Note
//                 </Button>
//             </Modal>
//         </Card>
//     );
// };

// export default NoteSection;




////part 2
// import React, { useState, useEffect } from 'react';
// import { Card, ActionIcon, Menu, Modal, TextInput, Button } from '@mantine/core';
// import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
// import NoteItem from './NoteItem';
// import { addDoc, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import { firestore } from '../firebase';

// const NoteSection = ({ section, onEditSection, onDeleteSection }) => {
//     const [expanded, setExpanded] = useState(false);
//     const [isPlainNoteModalOpen, setIsPlainNoteModalOpen] = useState(false);
//     const [newNoteName, setNewNoteName] = useState('');
//     const [error, setError] = useState('');
//     const [notes, setNotes] = useState([]);

//     const toggleExpanded = () => {
//         setExpanded(!expanded);
//     };

//     // Fetch notes for the section in real-time
//     useEffect(() => {
//     if (expanded && section.id) {
//         const q = query(
//             collection(firestore, 'notes'),
//             where('sectionId', '==', section.id),
//             orderBy('createdAt', 'desc')
//         );

//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setNotes(notesData);
//         }, (error) => {
//             console.error("Error fetching notes:", error); // Add this to catch Firestore errors
//         });

//         return () => unsubscribe(); // Cleanup the listener when component unmounts or section is collapsed
//     }
// }, [expanded, section.id]);


//     // Handler to add a Plain Note to the Firestore
//     const handleAddPlainNote = async () => {
//         if (!newNoteName.trim()) {
//             setError("Note name cannot be empty.");
//             return;
//         }

//         try {
//             await addDoc(collection(firestore, 'notes'), {
//                 name: newNoteName,
//                 sectionId: section.id, // Linking the note to the section
//                 type: 'plain', // Specify the type of note
//                 content: '', // Empty content initially
//                 createdAt: new Date(), // Store the creation date
//             });

//             // Clear state after successful addition
//             setIsPlainNoteModalOpen(false);
//             setNewNoteName('');
//             setError('');
//         } catch (error) {
//             console.error("Error adding note:", error);
//             setError("Failed to add note.");
//         }
//     };

//     return (
//         <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpanded}>
//                     {expanded ? <IconChevronDown /> : <IconChevronRight />}
//                     <h3 style={{ marginLeft: '10px' }}>{section.name}</h3>
//                 </div>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEditSection(section)}>Edit Section</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDeleteSection(section.id)}>Delete Section</Menu.Item>
//                         <Menu.Item onClick={() => setIsPlainNoteModalOpen(true)}>Add Plain Note</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//             {expanded && (
//                 <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
//                     {notes.length > 0 ? (
//                         notes.map((note) => (
//                             <NoteItem key={note.id} note={note} />
//                         ))
//                     ) : (
//                         <p>No notes available. Add a new note to get started.</p>
//                     )}
//                 </div>
//             )}

//             {/* Modal for Adding Plain Note */}
//             <Modal opened={isPlainNoteModalOpen} onClose={() => setIsPlainNoteModalOpen(false)} title="Add Plain Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError(''); // Clear any existing error
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={handleAddPlainNote} style={{ marginTop: '10px' }}>
//                     Add Note
//                 </Button>
//             </Modal>
//         </Card>
//     );
// };

// export default NoteSection;



//part 3
// import React, { useState, useEffect } from 'react';
// import { Card, ActionIcon, Menu, Modal, TextInput, Button } from '@mantine/core';
// import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
// import NoteItem from './NoteItem';
// import { addDoc, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// const NoteSection = ({ section, onEditSection, onDeleteSection }) => {
//     const [expanded, setExpanded] = useState(false);
//     const [isPlainNoteModalOpen, setIsPlainNoteModalOpen] = useState(false);
//     const [newNoteName, setNewNoteName] = useState('');
//     const [error, setError] = useState('');
//     const [notes, setNotes] = useState([]);

//     const toggleExpanded = () => {
//         setExpanded(!expanded);
//     };

//     // Fetch notes for the section in real-time
//     useEffect(() => {
//         if (expanded && section.id) {
//             const q = query(
//                 collection(firestore, 'notes'),
//                 where('sectionId', '==', section.id),
//                 orderBy('createdAt', 'desc')
//             );

//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setNotes(notesData);
//             }, (error) => {
//                 console.error("Error fetching notes:", error); // Add this to catch Firestore errors
//             });

//             return () => unsubscribe(); // Cleanup the listener when component unmounts or section is collapsed
//         }
//     }, [expanded, section.id]);


//     // Handler to add a Plain Note to the Firestore
//     const handleAddPlainNote = async () => {
//         if (!newNoteName.trim()) {
//             setError("Note name cannot be empty.");
//             return;
//         }

//         try {
//             await addDoc(collection(firestore, 'notes'), {
//                 name: newNoteName,
//                 sectionId: section.id, // Linking the note to the section
//                 type: 'plain', // Specify the type of note
//                 content: '', // Empty content initially
//                 createdAt: new Date(), // Store the creation date
//                 userId: auth.currentUser.uid, // Add userId for Firestore rules
//             });

//             // Clear state after successful addition
//             setIsPlainNoteModalOpen(false);
//             setNewNoteName('');
//             setError('');
//         } catch (error) {
//             console.error("Error adding note:", error);
//             setError("Failed to add note.");
//         }
//     };

//     return (
//         <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpanded}>
//                     {expanded ? <IconChevronDown /> : <IconChevronRight />}
//                     <h3 style={{ marginLeft: '10px' }}>{section.name}</h3>
//                 </div>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEditSection(section)}>Edit Section</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDeleteSection(section.id)}>Delete Section</Menu.Item>
//                         <Menu.Item onClick={() => setIsPlainNoteModalOpen(true)}>Add Plain Note</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//             {expanded && (
//                 <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
//                     {notes.length > 0 ? (
//                         notes.map((note) => (
//                             <NoteItem key={note.id} note={note} />
//                         ))
//                     ) : (
//                         <p>No notes available. Add a new note to get started.</p>
//                     )}
//                 </div>
//             )}

//             {/* Modal for Adding Plain Note */}
//             <Modal opened={isPlainNoteModalOpen} onClose={() => setIsPlainNoteModalOpen(false)} title="Add Plain Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError(''); // Clear any existing error
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={handleAddPlainNote} style={{ marginTop: '10px' }}>
//                     Add Note
//                 </Button>
//             </Modal>
//         </Card>
//     );
// };

// export default NoteSection;



////plain note
// import React, { useState, useEffect } from 'react';
// import { Card, ActionIcon, Menu, Modal, TextInput, Button } from '@mantine/core';
// import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
// import NoteItem from './NoteItem';
// import { addDoc, doc, deleteDoc, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// const NoteSection = ({ section, onEditSection, onDeleteSection }) => {
//     const [expanded, setExpanded] = useState(false);
//     const [isPlainNoteModalOpen, setIsPlainNoteModalOpen] = useState(false);
//     const [newNoteName, setNewNoteName] = useState('');
//     const [error, setError] = useState('');
//     const [notes, setNotes] = useState([]);

//     const toggleExpanded = () => {
//         setExpanded(!expanded);
//     };

//     // Fetch notes for the section in real-time
//     useEffect(() => {
//         if (expanded && section.id) {
//             const q = query(
//                 collection(firestore, 'notes'),
//                 where('sectionId', '==', section.id),
//                 orderBy('createdAt', 'desc')
//             );

//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setNotes(notesData);
//             }, (error) => {
//                 console.error("Error fetching notes:", error); // Add this to catch Firestore errors
//             });

//             return () => unsubscribe(); // Cleanup the listener when component unmounts or section is collapsed
//         }
//     }, [expanded, section.id]);


//     // Handler to add a Plain Note to the Firestore
//     const handleAddPlainNote = async () => {
//         if (!newNoteName.trim()) {
//             setError("Note name cannot be empty.");
//             return;
//         }

//         try {
//             await addDoc(collection(firestore, 'notes'), {
//                 name: newNoteName,
//                 sectionId: section.id, // Linking the note to the section
//                 type: 'plain', // Specify the type of note
//                 content: '', // Empty content initially
//                 createdAt: new Date(), // Store the creation date
//                 userId: auth.currentUser.uid, // Add userId for Firestore rules
//             });

//             // Clear state after successful addition
//             setIsPlainNoteModalOpen(false);
//             setNewNoteName('');
//             setError('');
//         } catch (error) {
//             console.error("Error adding note:", error);
//             setError("Failed to add note.");
//         }
//     };

//     const handleEditNote = async (note) => {
//         // Logic to edit note details, like opening a modal to update the note name
//         // You can add a modal for renaming the note similar to the "Add Note" modal.
//         console.log("Edit Note:", note);
//     };

//     const handleDeleteNote = async (noteId) => {
//         try {
//             // Delete the note from Firestore
//             await deleteDoc(doc(firestore, 'notes', noteId));
//             console.log("Note deleted:", noteId);
//         } catch (error) {
//             console.error("Error deleting note:", error);
//         }
//     };

//     return (
//         <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpanded}>
//                     {expanded ? <IconChevronDown /> : <IconChevronRight />}
//                     <h3 style={{ marginLeft: '10px' }}>{section.name}</h3>
//                 </div>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEditSection(section)}>Edit Section</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDeleteSection(section.id)}>Delete Section</Menu.Item>
//                         <Menu.Item onClick={() => setIsPlainNoteModalOpen(true)}>Add Plain Note</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//             {expanded && (
//                 <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
//                     {notes.length > 0 ? (
//                         notes.map((note) => (
//                             <NoteItem key={note.id} note={note} onEdit={handleEditNote} onDelete={handleDeleteNote} />
//                         ))
//                     ) : (
//                         <p>No notes available. Add a new note to get started.</p>
//                     )}
//                 </div>
//             )}

//             {/* Modal for Adding Plain Note */}
//             <Modal opened={isPlainNoteModalOpen} onClose={() => setIsPlainNoteModalOpen(false)} title="Add Plain Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Enter note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError(''); // Clear any existing error
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={handleAddPlainNote} style={{ marginTop: '10px' }}>
//                     Add Note
//                 </Button>
//             </Modal>
//         </Card>
//     );
// };

// export default NoteSection;


// plain note later, fix the edit note item name
import React, { useState, useEffect } from 'react';
import { Card, ActionIcon, Menu, Modal, TextInput, Button } from '@mantine/core';
import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import NoteItem from './NoteItem';
import { addDoc, doc, deleteDoc, updateDoc, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { firestore, auth } from '../firebase';

const NoteSection = ({ section, onEditSection, onDeleteSection }) => {
    const [expanded, setExpanded] = useState(false);
    const [isPlainNoteModalOpen, setIsPlainNoteModalOpen] = useState(false);
    const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);
    const [newNoteName, setNewNoteName] = useState('');
    const [editNote, setEditNote] = useState(null);
    const [error, setError] = useState('');
    const [notes, setNotes] = useState([]);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    // Fetch notes for the section in real-time
    useEffect(() => {
        if (expanded && section.id) {
            const q = query(
                collection(firestore, 'notes'),
                where('sectionId', '==', section.id),
                orderBy('createdAt', 'desc')
            );

            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    const notesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setNotes(notesData);
                },
                (error) => {
                    console.error('Error fetching notes:', error); // Add this to catch Firestore errors
                }
            );

            return () => unsubscribe(); // Cleanup the listener when component unmounts or section is collapsed
        }
    }, [expanded, section.id]);

    // Handler to add a Plain Note to the Firestore
    const handleAddPlainNote = async () => {
        if (!newNoteName.trim()) {
            setError('Note name cannot be empty.');
            return;
        }

        try {
            await addDoc(collection(firestore, 'notes'), {
                name: newNoteName,
                sectionId: section.id, // Linking the note to the section
                type: 'plain', // Specify the type of note
                content: '', // Empty content initially
                createdAt: new Date(), // Store the creation date
                userId: auth.currentUser.uid, // Add userId for Firestore rules
            });

            // Clear state after successful addition
            setIsPlainNoteModalOpen(false);
            setNewNoteName('');
            setError('');
        } catch (error) {
            console.error('Error adding note:', error);
            setError('Failed to add note.');
        }
    };

    // Handler to edit an existing note
    const handleEditNote = (note) => {
        setEditNote(note);
        setNewNoteName(note.name); // Set the note name to the current note's name
        setIsEditNoteModalOpen(true); // Open the modal for editing
    };

    // Save edited note name to Firestore
    const handleSaveEditedNote = async () => {
        if (!newNoteName.trim()) {
            setError('Note name cannot be empty.');
            return;
        }

        try {
            const noteRef = doc(firestore, 'notes', editNote.id);
            await updateDoc(noteRef, {
                name: newNoteName,
            });

            // Clear state after successful editing
            setIsEditNoteModalOpen(false);
            setNewNoteName('');
            setEditNote(null);
            setError('');
        } catch (error) {
            console.error('Error updating note:', error);
            setError('Failed to update note.');
        }
    };

    // Handler to delete a note from Firestore
    const handleDeleteNote = async (noteId) => {
        try {
            // Delete the note from Firestore
            await deleteDoc(doc(firestore, 'notes', noteId));
            console.log('Note deleted:', noteId);
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f8f9fa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpanded}>
                    {expanded ? <IconChevronDown /> : <IconChevronRight />}
                    <h3 style={{ marginLeft: '10px' }}>{section.name}</h3>
                </div>
                <Menu position="bottom-end">
                    <Menu.Target>
                        <ActionIcon>
                            <IconDots />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={() => onEditSection(section)}>Edit Section</Menu.Item>
                        <Menu.Item color="red" onClick={() => onDeleteSection(section.id)}>Delete Section</Menu.Item>
                        <Menu.Item onClick={() => setIsPlainNoteModalOpen(true)}>Add Plain Note</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
            {expanded && (
                <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <NoteItem key={note.id} note={note} onEdit={handleEditNote} onDelete={handleDeleteNote} />
                        ))
                    ) : (
                        <p>No notes available. Add a new note to get started.</p>
                    )}
                </div>
            )}

            {/* Modal for Adding Plain Note */}
            <Modal opened={isPlainNoteModalOpen} onClose={() => setIsPlainNoteModalOpen(false)} title="Add Plain Note">
                <TextInput
                    label="Note Name"
                    placeholder="Enter note name"
                    value={newNoteName}
                    onChange={(e) => {
                        setNewNoteName(e.currentTarget.value);
                        setError(''); // Clear any existing error
                    }}
                    error={error}
                />
                <Button onClick={handleAddPlainNote} style={{ marginTop: '10px' }}>
                    Add Note
                </Button>
            </Modal>

            {/* Modal for Editing Note */}
            <Modal opened={isEditNoteModalOpen} onClose={() => setIsEditNoteModalOpen(false)} title="Edit Note">
                <TextInput
                    label="Note Name"
                    placeholder="Edit note name"
                    value={newNoteName}
                    onChange={(e) => {
                        setNewNoteName(e.currentTarget.value);
                        setError(''); // Clear any existing error
                    }}
                    error={error}
                />
                <Button onClick={handleSaveEditedNote} style={{ marginTop: '10px' }}>
                    Save Changes
                </Button>
            </Modal>
        </Card>
    );
};

export default NoteSection;


