import React, { useState, useEffect } from 'react';
import { Card, ActionIcon, Menu, Modal, TextInput, Button, FileInput } from '@mantine/core';
import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import NoteItem from './NoteItem';
import { addDoc, doc, deleteDoc, updateDoc, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { deleteImageFromFirebase } from '../utils/uploadImage'; // Import the delete function
import { firestore, auth } from '../firebase';
import axios from 'axios';

const storage = getStorage(); // Firebase Storage initialization

const NoteSection = ({ section, onEditSection, onDeleteSection, allSections }) => {
    const [expanded, setExpanded] = useState(false); //state to expand or not to display note items

    const [isPlainNoteModalOpen, setIsPlainNoteModalOpen] = useState(false);
    const [isCodeNoteModalOpen, setIsCodeNoteModalOpen] = useState(false);
    const [isDocuNoteModalOpen, setIsDocuNoteModalOpen] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null); // Holds the selected file (code/document)
    const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);
    const [newNoteName, setNewNoteName] = useState(''); //note item name
    const [editNote, setEditNote] = useState(null);
    const [isDeleteNoteModalOpen, setIsDeleteNoteModalOpen] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);
    const [error, setError] = useState('');
    const [notes, setNotes] = useState([]);

    // Loading states
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    // Fetch notes for the section in real-time
    useEffect(() => {
        if (expanded && section.id) {
            const q = query(
                collection(firestore, 'notes'),
                where('sectionId', '==', section.id),
                orderBy('createdAt', 'asc')  //in descending order using date
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
            setIsAdding(true); // Start loading
            await addDoc(collection(firestore, 'notes'), {
                name: newNoteName,
                sectionId: section.id,
                type: 'plain',
                content: '',
                createdAt: new Date(),
                userId: auth.currentUser.uid,
                moduleId: section.moduleId,
            });

            // Clear state after successful addition
            setIsPlainNoteModalOpen(false);
            setNewNoteName('');
            setError('');
        } catch (error) {
            console.error('Error adding note:', error);
            setError('Failed to add note.');
        } finally {
            setIsAdding(false); // End loading
        }

    };

    // Handler to add a Code Note with file upload to Firebase Storage
    const handleAddCodeNote = async () => {
        // if the inputs are null
        if (!newNoteName.trim() || !selectedFile) {
            setError('Both note name and a code file are required.');
            return;
        }

        const validExtensions = ['php', 'html', 'css', 'json', 'js', 'ts', 'py', 'java', 'cpp', 'cs', 'ino', 'm', 'ipynb', 'hex', 'slx', 'c',];
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
        if (!validExtensions.includes(fileExtension)) {
            setError(`Invalid file type. Please upload a file with one of the following extensions: ${validExtensions.join(', ')}`);
            return;
        }

        try {
            setIsAdding(true); // Start loading
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
                fileURL,
                content: '',
                createdAt: new Date(),
                userId: auth.currentUser.uid,
                moduleId: section.moduleId,
            });

            setIsCodeNoteModalOpen(false);
            setNewNoteName('');
            setSelectedFile(null);
            setError('');
        } catch (error) {
            console.error('Error adding code note:', error);
            setError('Failed to add code note.');
        } finally {
            setIsAdding(false); // End loading
        }
    };


    // Add Document + Note with file upload and conversion
    const handleAddDocuNote = async () => {

        console.log("selected file:", selectedFile);
        // validation for empty input
        if (!newNoteName.trim() || !selectedFile) {
            setError('Both note name and a file are required.');
            return;
        }

        // validation for file type
        const allowedExtensions = ['pdf', 'docx', 'pptx'];
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase(); //get file type of selected file (e.g. png)
        if (!allowedExtensions.includes(fileExtension)) {
            setError('Invalid file type. Only PDF, DOCX, and PPTX are allowed.');
            return;
        }

        //still as a file object

        try {
            setIsAdding(true); // Start loading
            let finalFile = selectedFile; // for files that are already PDF

            // Convert DOCX/PPTX to PDF if necessary using backend API
            if (fileExtension === 'docx' || fileExtension === 'pptx') {
                try {
                    //create empty js formData object
                    const formData = new FormData();
                    //wrap the file in FormData object for HTTP transfer to the backend API for conversion
                    //file state put as: Multipart/form-data (value of Content-Type)
                    formData.append('file', selectedFile);

                    // send back the converted PDF as a blob
                    const response = await axios.post('http://localhost:5000/convert-to-pdf', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        responseType: 'blob', // Expect binary large obj response (binary data) for the PDF instead of JSON cuz its file
                        // Blob: Represents raw binary data for files; 
                        //cannot be directly parsed as text or JSON because the data isn't human-readable.
                    });

                    //wrap the blob data (response.data) into a new File object, representing the converted PDF
                    //using File constructor
                    finalFile = new File([response.data], `${selectedFile.name.split('.')[0]}.pdf`, { type: 'application/pdf' });
                } catch (error) {
                    console.error('Error converting file:', error);
                    setError('Failed to convert file to PDF.');

                    return;
                }

            }

            // Upload the PDF file to Firebase Storage
            try {
                //upload the finalFile into firebase storage under 'documents/userID/file's name
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
                    moduleId: section.moduleId,
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
        } finally {
            setIsAdding(false); // End loading
        }
    };

    // Handler to edit an existing note
    const handleEditNote = (note) => {
        setEditNote(note);
        setNewNoteName(note.name); // update name
        setIsEditNoteModalOpen(true);
    };

    // Save edited note name to Firestore
    const handleSaveEditedNote = async () => {
        //only validation is empty or not
        if (!newNoteName.trim()) {
            setError('Note name cannot be empty.');
            return;
        }

        try {
            setIsEditing(true); // Start loading
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
        } finally {
            setIsEditing(false); // End loading
        }
    };

    // Confirm and delete a note with associated files
    const confirmDeleteNote = (note) => {
        setNoteToDelete(note);
        setIsDeleteNoteModalOpen(true);
    };

    const handleDeleteNote = async () => {
        if (noteToDelete) {
            try {
                setIsDeleting(true); // Start loading
                const noteData = noteToDelete;

                // Prepare to delete associated files from storage for the note
                const fileDeletePromises = [];

                // Check for images in content and delete based on "src" attributes
                if (noteData.content && noteData.content.content) {
                    const contentArray = noteData.content.content;

                    contentArray.forEach((node) => {
                        if (node.type === 'image' && node.attrs && node.attrs.src) {
                            const imageUrl = node.attrs.src;// Extract the image URL
                            console.log("Found image URL:", imageUrl);
                            fileDeletePromises.push(deleteImageFromFirebase(imageUrl));// Add file deletion to the promises
                        }
                    });
                }

                // Delete document or code file stored in 'fileURL'
                if (noteData.fileURL) {
                    console.log("Found file URL:", noteData.fileURL);
                    const fileRef = ref(storage, noteData.fileURL);
                    fileDeletePromises.push(deleteObject(fileRef));// Add file deletion to the promises
                }

                try {
                    // Wait for all associated files to be deleted before deleting the note
                    await Promise.all(fileDeletePromises);

                    // Delete the note from Firestore
                    await deleteDoc(doc(firestore, 'notes', noteToDelete.id));
                    console.log('Note deleted:', noteToDelete.id);
                } catch (error) {
                    console.error('Error deleting note:', error);
                }

                setIsDeleteNoteModalOpen(false);
                setNoteToDelete(null);
            } catch (error) {
                console.error('Error deleting note:', error);
            } finally {
                setIsDeleting(false); // End loading
            }
        }
    };

    return (
        <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#F7FBFE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleExpanded}>
                    {expanded ? <IconChevronDown /> : <IconChevronRight />}
                    <h3 style={{ marginLeft: '10px' }}>{section.name}</h3>
                </div>
                <Menu position="bottom-end">
                    <Menu.Target>
                        <ActionIcon
                            style={{
                                backgroundColor: 'transparent', // Set the default background color of the button
                                color: 'black', // Default color of the icon
                                transition: 'background-color 0.3s ease', // Smooth transition for hover
                                marginRight: '10px'
                            }}
                            radius="xl"
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#DDEFFF')} // Hover color
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
                        >
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
                            <NoteItem
                                key={note.id}
                                note={note}
                                onEdit={handleEditNote}
                                // onDelete={handleDeleteNote}
                                onDelete={() => confirmDeleteNote(note)}
                                sections={allSections} />
                        ))
                    ) : (
                        <p>No notes available. Add a new note to get started.</p>
                    )}
                </div>
            )}

            {/* Modal for Adding Plain Note */}
            <Modal
                opened={isPlainNoteModalOpen}
                onClose={() => {
                    setIsPlainNoteModalOpen(false);
                    setError('');
                    setNewNoteName(''); //clear the note name
                }}
                title="Add Plain Note"
            >
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
                <Button onClick={handleAddPlainNote} loading={isAdding} style={{ marginTop: '10px' }}>
                    Add Note
                </Button>
            </Modal>



            {/* Modal for Adding Code Note */}
            <Modal
                opened={isCodeNoteModalOpen}
                onClose={() => {
                    setIsCodeNoteModalOpen(false);
                    setError('');
                    setNewNoteName(''); //clear the note name
                    setSelectedFile(null);  //clear the selected file
                }}
                title="Add Code Note"
            >
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
                    accept=".php, .html, .css, .json, .js, .ts, .py, .java, .cpp, .cs, .ino, .m, .ipynb, .hex, .slx, .c"
                    error={error}
                />
                <Button onClick={handleAddCodeNote} loading={isAdding} style={{ marginTop: '10px' }}>
                    Add Code Note
                </Button>
            </Modal>

            {/* Modal for Adding Document Note */}
            <Modal
                opened={isDocuNoteModalOpen}
                onClose={() => {
                    setIsDocuNoteModalOpen(false);
                    setError('');
                    setNewNoteName(''); //clear note name
                    setSelectedFile(null); //clear selected file
                }}
                title="Add Document Note"
            >
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
                    accept=".pdf,.docx,.pptx" //add extra
                    error={error}
                />
                <Button onClick={handleAddDocuNote} loading={isAdding} style={{ marginTop: '10px' }}>
                    Add Document Note
                </Button>
            </Modal>


            {/* Modal for Editing Note */}
            <Modal
                opened={isEditNoteModalOpen}
                onClose={() => {
                    setIsEditNoteModalOpen(false);
                    setError(''); //clear note name
                }}
                title="Edit Note"
            >
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
                <Button onClick={handleSaveEditedNote} loading={isEditing} style={{ marginTop: '10px' }}>
                    Save Changes
                </Button>
            </Modal>


            {/* Delete Note Confirmation Modal */}
            <Modal
                opened={isDeleteNoteModalOpen}
                onClose={() => setIsDeleteNoteModalOpen(false)}
                title="Confirm Delete"
            >
                <p>Are you sure you want to delete this note and all associated files?</p>
                <Button color="red" onClick={handleDeleteNote} loading={isDeleting}>
                    Confirm Delete
                </Button>
                <Button variant="outline" onClick={() => setIsDeleteNoteModalOpen(false)} style={{ marginLeft: '10px' }}>
                    Cancel
                </Button>
            </Modal>
        </Card>
    );
};

export default NoteSection;