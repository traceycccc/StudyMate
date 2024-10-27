



//code note done, we do document note now
import React, { useState, useEffect } from 'react';
import { Card, ActionIcon, Menu, Modal, TextInput, Button, FileInput } from '@mantine/core';
import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import NoteItem from './NoteItem';
import { addDoc, doc, deleteDoc, updateDoc, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, auth } from '../firebase';
import axios from 'axios';

const storage = getStorage(); // Firebase Storage initialization

const NoteSection = ({ section, onEditSection, onDeleteSection }) => {
    const [expanded, setExpanded] = useState(false);
    const [isPlainNoteModalOpen, setIsPlainNoteModalOpen] = useState(false);
    const [isCodeNoteModalOpen, setIsCodeNoteModalOpen] = useState(false);
    const [isDocuNoteModalOpen, setIsDocuNoteModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
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
                    const notesData = snapshot.docs.map((doc) => ({ 
                        id: doc.id, 
                        moduleId: section.moduleId, // Add the moduleId here explicitly
                        ...doc.data() 
                    }));
                    setNotes(notesData);
                },
                (error) => {
                    console.error('Error fetching notes:', error); // Add this to catch Firestore errors
                }
            );

            return () => unsubscribe(); // Cleanup the listener when component unmounts or section is collapsed
        }
    }, [expanded, section.id, section.moduleId]);

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

    // Handler to add a Code Note with file upload to Firebase Storage
    const handleAddCodeNote = async () => {
        if (!newNoteName.trim() || !selectedFile) {
            setError('Both note name and a valid code file are required.');
            return;
        }

        const validExtensions = ['js', 'py', 'java', 'cpp'];
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
        if (!validExtensions.includes(fileExtension)) {
            setError(`Invalid file type. Please upload a file with one of the following extensions: ${validExtensions.join(', ')}`);
            return;
        }

        try {
            // Upload file to Firebase Storage
            const storageRef = ref(storage, `code_files/${auth.currentUser.uid}/${selectedFile.name}`);
            await uploadBytes(storageRef, selectedFile);

            // Get file URL from Firebase Storage
            const fileURL = await getDownloadURL(storageRef);

            // Add note data to Firestore with the file URL and empty content for the rich text editor
            await addDoc(collection(firestore, 'notes'), {
                name: newNoteName,
                sectionId: section.id,
                type: 'code',
                fileURL, // Store file URL in Firestore
                content: '', // Empty content initially for rich text editor
                createdAt: new Date(),
                userId: auth.currentUser.uid,
            });

            setIsCodeNoteModalOpen(false);
            setNewNoteName('');
            setSelectedFile(null);
            setError('');
        } catch (error) {
            console.error('Error adding code note:', error);
            setError('Failed to add code note.');
        }
    };


    // Add Document + Note with file upload and conversion
    const handleAddDocuNote = async () => {
        if (!newNoteName.trim() || !selectedFile) {
            setError('Both note name and a valid file are required.');
            return;
        }

        const allowedExtensions = ['pdf', 'docx', 'pptx'];
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            setError('Invalid file type. Only PDF, DOCX, and PPTX are allowed.');
            return;
        }

        try {
            let finalFile = selectedFile;

            // Convert DOCX/PPTX to PDF if necessary using backend API
            if (fileExtension === 'docx' || fileExtension === 'pptx') {
                try{
                    const formData = new FormData();
                    formData.append('file', selectedFile);

                    const response = await axios.post('http://localhost:5000/convert-to-pdf', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        responseType: 'blob', // Expect blob response for the PDF
                    });

                    finalFile = new File([response.data], `${selectedFile.name.split('.')[0]}.pdf`, { type: 'application/pdf' });
                } catch (error) {
                    console.error('Error converting file:', error);
                    setError('Failed to convert file to PDF.');
                    
                    return;
                }
                
            }

            // Upload the PDF file to Firebase Storage
            try {
                const storageRef = ref(storage, `documents/${auth.currentUser.uid}/${finalFile.name}`);
                await uploadBytes(storageRef, finalFile);

                // Get the download URL for the uploaded PDF
                const fileURL = await getDownloadURL(storageRef);

                // Add note metadata to Firestore
                await addDoc(collection(firestore, 'notes'), {
                    name: newNoteName,
                    sectionId: section.id,
                    type: 'document',
                    fileURL,
                    content: '', // For the rich text editor
                    createdAt: new Date(),
                    userId: auth.currentUser.uid,
                });

                // Clear form and close modal
                setIsDocuNoteModalOpen(false);
                setNewNoteName('');
                setSelectedFile(null);
                setError('');
            } catch (error) {
                console.error('Unexpected error during upload:', error);
                setError('Failed to store PDF file.');
            }
            
        } catch (error) {
            console.error('Error adding document note:', error);
            setError('Failed to add document note.');
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
                        <Menu.Item onClick={() => setIsDocuNoteModalOpen(true)}>Add Document Note</Menu.Item>
                        <Menu.Item onClick={() => setIsCodeNoteModalOpen(true)}>Add Code Note</Menu.Item>
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



            {/* Modal for Adding Code Note */}
            <Modal opened={isCodeNoteModalOpen} onClose={() => setIsCodeNoteModalOpen(false)} title="Add Code Note">
                <TextInput
                    label="Note Name"
                    placeholder="Enter note name"
                    value={newNoteName}
                    onChange={(e) => {
                        setNewNoteName(e.currentTarget.value);
                        setError('');
                    }}
                    error={error}
                />
                <FileInput
                    label="Select Code File"
                    placeholder="Choose a code file"
                    value={selectedFile}
                    onChange={setSelectedFile}
                    accept=".js,.py,.java,.cpp"
                    error={error}
                />
                <Button onClick={handleAddCodeNote} style={{ marginTop: '10px' }}>
                    Add Code Note
                </Button>
            </Modal>

            {/* Modal for Adding Document Note */}
            <Modal opened={isDocuNoteModalOpen} onClose={() => setIsDocuNoteModalOpen(false)} title="Add Document Note">
                <TextInput
                    label="Note Name"
                    placeholder="Enter note name"
                    value={newNoteName}
                    onChange={(e) => {
                        setNewNoteName(e.currentTarget.value);
                        setError('');
                    }}
                    error={error}
                />
                <FileInput
                    label="Select Document"
                    placeholder="Choose a file"
                    value={selectedFile}
                    onChange={setSelectedFile}
                    accept=".pdf,.docx,.pptx"
                    error={error}
                />
                <Button onClick={handleAddDocuNote} style={{ marginTop: '10px' }}>
                    Add Document Note
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


//fix the seuirty better like in what section, what module
// import React, { useState, useEffect } from 'react';
// import { Card, ActionIcon, Menu, Modal, TextInput, Button, FileInput } from '@mantine/core';
// import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
// import NoteItem from './NoteItem';
// import { addDoc, doc, deleteDoc, updateDoc, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { firestore, auth } from '../firebase';
// import axios from 'axios';

// const storage = getStorage(); // Firebase Storage initialization

// const NoteSection = ({ section, onEditSection, onDeleteSection }) => {
//     const [expanded, setExpanded] = useState(false);
//     const [isPlainNoteModalOpen, setIsPlainNoteModalOpen] = useState(false);
//     const [isCodeNoteModalOpen, setIsCodeNoteModalOpen] = useState(false);
//     const [isDocuNoteModalOpen, setIsDocuNoteModalOpen] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);
//     const [newNoteName, setNewNoteName] = useState('');
//     const [editNote, setEditNote] = useState(null);
//     const [error, setError] = useState('');
//     const [notes, setNotes] = useState([]);

//     const toggleExpanded = () => {
//         setExpanded(!expanded);
//     };

//     // Fetch notes for the section in real-time
//     useEffect(() => {
//         if (expanded && section.moduleId) {
//             const q = query(
//                 // collection(firestore, 'notes'),
//                 // where('sectionId', '==', section.id),
//                 // orderBy('createdAt', 'desc')

//                 collection(firestore, `modules/${section.moduleId}/sections/${section.id}/notes`),
//                 where('userId', '==', auth.currentUser?.uid),
//                 orderBy('createdAt', 'desc')
//             );

//             const unsubscribe = onSnapshot(
//                 q,
//                 (snapshot) => {
//                     const notesData = snapshot.docs.map((doc) => ({
//                         id: doc.id,
//                         moduleId: section.moduleId,
//                         ...doc.data()
//                     }));
//                     setNotes(notesData);
//                 },
//                 (error) => {
//                     console.error('Error fetching notes:', error); // Add this to catch Firestore errors
//                 }
//             );

//             return () => unsubscribe(); // Cleanup the listener when component unmounts or section is collapsed
//         }
//     }, [expanded, section.id, section.moduleId]);

//     // Handler to add a Plain Note to the Firestore
//     const handleAddPlainNote = async () => {
//         if (!newNoteName.trim()) {
//             setError('Note name cannot be empty.');
//             return;
//         }

//         try {
//             // await addDoc(collection(firestore, 'notes'), {
//             //     name: newNoteName,
//             //     sectionId: section.id, // Linking the note to the section
//             //     type: 'plain', // Specify the type of note
//             //     content: '', // Empty content initially
//             //     createdAt: new Date(), // Store the creation date
//             //     userId: auth.currentUser.uid, // Add userId for Firestore rules
//             // });

//             await addDoc(collection(firestore, `modules/${section.moduleId}/sections/${section.id}/notes`), {
//                 name: newNoteName,
//                 sectionId: section.id,
//                 moduleId: section.moduleId,
//                 type: 'plain',
//                 content: '',
//                 createdAt: new Date(),
//                 userId: auth.currentUser.uid,
//             });

//             // Clear state after successful addition
//             setIsPlainNoteModalOpen(false);
//             setNewNoteName('');
//             setError('');
//         } catch (error) {
//             console.error('Error adding note:', error);
//             setError('Failed to add note.');
//         }
//     };

//     // Handler to add a Code Note with file upload to Firebase Storage
//     const handleAddCodeNote = async () => {
//         if (!newNoteName.trim() || !selectedFile) {
//             setError('Both note name and a valid code file are required.');
//             return;
//         }

//         const validExtensions = ['js', 'py', 'java', 'cpp'];
//         const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
//         if (!validExtensions.includes(fileExtension)) {
//             setError(`Invalid file type. Please upload a file with one of the following extensions: ${validExtensions.join(', ')}`);
//             return;
//         }

//         try {
//             // Upload file to Firebase Storage
//             const storageRef = ref(storage, `code_files/${auth.currentUser.uid}/${selectedFile.name}`);
//             await uploadBytes(storageRef, selectedFile);

//             // Get file URL from Firebase Storage
//             const fileURL = await getDownloadURL(storageRef);

//             // Add note data to Firestore with the file URL and empty content for the rich text editor
//             // await addDoc(collection(firestore, 'notes'), {
//             //     name: newNoteName,
//             //     sectionId: section.id,
//             //     type: 'code',
//             //     fileURL, // Store file URL in Firestore
//             //     content: '', // Empty content initially for rich text editor
//             //     createdAt: new Date(),
//             //     userId: auth.currentUser.uid,
//             // });

//             await addDoc(collection(firestore, `modules/${section.moduleId}/sections/${section.id}/notes`), {
//                 name: newNoteName,
//                 sectionId: section.id,
//                 moduleId: section.moduleId,
//                 type: 'code',
//                 fileURL, // Store file URL in Firestore
//                 content: '',
//                 createdAt: new Date(),
//                 userId: auth.currentUser.uid,
//             });

//             setIsCodeNoteModalOpen(false);
//             setNewNoteName('');
//             setSelectedFile(null);
//             setError('');
//         } catch (error) {
//             console.error('Error adding code note:', error);
//             setError('Failed to add code note.');
//         }
//     };


//     // Add Document + Note with file upload and conversion
//     const handleAddDocuNote = async () => {
//         if (!newNoteName.trim() || !selectedFile) {
//             setError('Both note name and a valid file are required.');
//             return;
//         }

//         const allowedExtensions = ['pdf', 'docx', 'pptx'];
//         const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
//         if (!allowedExtensions.includes(fileExtension)) {
//             setError('Invalid file type. Only PDF, DOCX, and PPTX are allowed.');
//             return;
//         }

//         try {
//             let finalFile = selectedFile;

//             // Convert DOCX/PPTX to PDF if necessary using backend API
//             if (fileExtension === 'docx' || fileExtension === 'pptx') {
//                 try {
//                     const formData = new FormData();
//                     formData.append('file', selectedFile);

//                     const response = await axios.post('http://localhost:5000/convert-to-pdf', formData, {
//                         headers: { 'Content-Type': 'multipart/form-data' },
//                         responseType: 'blob', // Expect blob response for the PDF
//                     });

//                     finalFile = new File([response.data], `${selectedFile.name.split('.')[0]}.pdf`, { type: 'application/pdf' });
//                 } catch (error) {
//                     console.error('Error converting file:', error);
//                     setError('Failed to convert file to PDF.');

//                     return;
//                 }

//             }

//             // Upload the PDF file to Firebase Storage
//             try {
//                 const storageRef = ref(storage, `documents/${auth.currentUser.uid}/${finalFile.name}`);
//                 await uploadBytes(storageRef, finalFile);

//                 // Get the download URL for the uploaded PDF
//                 const fileURL = await getDownloadURL(storageRef);

//                 // Add note metadata to Firestore
//                 // await addDoc(collection(firestore, 'notes'), {
//                 //     name: newNoteName,
//                 //     sectionId: section.id,
//                 //     type: 'document',
//                 //     fileURL,
//                 //     content: '', // For the rich text editor
//                 //     createdAt: new Date(),
//                 //     userId: auth.currentUser.uid,
//                 // });

//                 await addDoc(collection(firestore, `modules/${section.moduleId}/sections/${section.id}/notes`), {
//                     name: newNoteName,
//                     sectionId: section.id,
//                     moduleId: section.moduleId,
//                     type: 'document',
//                     fileURL, // Store file URL in Firestore
//                     content: '',
//                     createdAt: new Date(),
//                     userId: auth.currentUser.uid,
//                 });

//                 // Clear form and close modal
//                 setIsDocuNoteModalOpen(false);
//                 setNewNoteName('');
//                 setSelectedFile(null);
//                 setError('');
//             } catch (error) {
//                 console.error('Unexpected error during upload:', error);
//                 setError('Failed to store PDF file.');
//             }

//         } catch (error) {
//             console.error('Error adding document note:', error);
//             setError('Failed to add document note.');
//         }
//     };

//     // Handler to edit an existing note
//     const handleEditNote = (note) => {
//         setEditNote(note);
//         setNewNoteName(note.name); // Set the note name to the current note's name
//         setIsEditNoteModalOpen(true); // Open the modal for editing
//     };

//     // Save edited note name to Firestore
//     const handleSaveEditedNote = async () => {
//         if (!newNoteName.trim()) {
//             setError('Note name cannot be empty.');
//             return;
//         }

//         try {
//             const noteRef = doc(firestore, 'notes', editNote.id);
//             await updateDoc(noteRef, {
//                 name: newNoteName,
//             });

//             // Clear state after successful editing
//             setIsEditNoteModalOpen(false);
//             setNewNoteName('');
//             setEditNote(null);
//             setError('');
//         } catch (error) {
//             console.error('Error updating note:', error);
//             setError('Failed to update note.');
//         }
//     };

//     // Handler to delete a note from Firestore
//     const handleDeleteNote = async (noteId) => {
//         try {
//             // Delete the note from Firestore
//             await deleteDoc(doc(firestore, 'notes', noteId));
//             console.log('Note deleted:', noteId);
//         } catch (error) {
//             console.error('Error deleting note:', error);
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
//                         <Menu.Item onClick={() => setIsDocuNoteModalOpen(true)}>Add Document Note</Menu.Item>
//                         <Menu.Item onClick={() => setIsCodeNoteModalOpen(true)}>Add Code Note</Menu.Item>
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



//             {/* Modal for Adding Code Note */}
//             <Modal opened={isCodeNoteModalOpen} onClose={() => setIsCodeNoteModalOpen(false)} title="Add Code Note">
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
//                     label="Select Code File"
//                     placeholder="Choose a code file"
//                     value={selectedFile}
//                     onChange={setSelectedFile}
//                     accept=".js,.py,.java,.cpp"
//                     error={error}
//                 />
//                 <Button onClick={handleAddCodeNote} style={{ marginTop: '10px' }}>
//                     Add Code Note
//                 </Button>
//             </Modal>

//             {/* Modal for Adding Document Note */}
//             <Modal opened={isDocuNoteModalOpen} onClose={() => setIsDocuNoteModalOpen(false)} title="Add Document Note">
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
//                     label="Select Document"
//                     placeholder="Choose a file"
//                     value={selectedFile}
//                     onChange={setSelectedFile}
//                     accept=".pdf,.docx,.pptx"
//                     error={error}
//                 />
//                 <Button onClick={handleAddDocuNote} style={{ marginTop: '10px' }}>
//                     Add Document Note
//                 </Button>
//             </Modal>


//             {/* Modal for Editing Note */}
//             <Modal opened={isEditNoteModalOpen} onClose={() => setIsEditNoteModalOpen(false)} title="Edit Note">
//                 <TextInput
//                     label="Note Name"
//                     placeholder="Edit note name"
//                     value={newNoteName}
//                     onChange={(e) => {
//                         setNewNoteName(e.currentTarget.value);
//                         setError(''); // Clear any existing error
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={handleSaveEditedNote} style={{ marginTop: '10px' }}>
//                     Save Changes
//                 </Button>
//             </Modal>
//         </Card>
//     );
// };

// export default NoteSection;


