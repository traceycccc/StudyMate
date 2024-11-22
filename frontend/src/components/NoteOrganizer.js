import React, { useState, useEffect } from 'react';
import { Button, Modal, TextInput } from '@mantine/core';
import { auth, firestore, storage } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy, getDocs } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { deleteImageFromFirebase } from '../utils/uploadImage';
import NoteSection from './NoteSection';

const NoteOrganizer = ({ moduleId }) => {
    const [sections, setSections] = useState([]);
    const [newSectionName, setNewSectionName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSection, setEditingSection] = useState(null);
    const [error, setError] = useState(''); // Validation error message
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState(null);

    // Loading states
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const userId = auth.currentUser?.uid;

    // Fetch sections for the module
    useEffect(() => {
        if (userId && moduleId) {
            const q = query(
                collection(firestore, 'sections'),
                where('userId', '==', userId),
                where('moduleId', '==', moduleId),
                orderBy('createdAt', 'desc')
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const sectionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setSections(sectionsData);
            });

            return () => unsubscribe(); // Cleanup
        }
    }, [userId, moduleId]);

    // Add new section
    const handleAddSection = async () => {

        if (!newSectionName.trim()) {
            setError('Section name cannot be empty.');
            return;
        }

        // Ensure unique name within the module
        const sectionNames = sections.map((sec) => sec.name.toLowerCase());

        if (sectionNames.includes(newSectionName.toLowerCase())) {
            setError('Section name already exists. Please choose a unique name.');
            return;
        }

        try {
            setIsAdding(true); // Start loading
            await addDoc(collection(firestore, 'sections'), {
                name: newSectionName,
                userId,
                moduleId,
                createdAt: new Date(),
            });
            // Clear the modal state after successful addition
            setNewSectionName('');
            setIsModalOpen(false);
            setError('');
        } catch (error) {
            console.error('Error adding section:', error);
        } finally {
            setIsAdding(false); // End loading
        }
    };

    // Edit section
    const handleEditSection = async (section) => {

        if (!editingSection.name.trim()) {
            setError('Section name cannot be empty.');
            return;
        }

        // Ensure unique name within the module
        const sectionNames = sections.filter((sec) => sec.id !== section.id).map((sec) => sec.name.toLowerCase());

        if (sectionNames.includes(editingSection.name.toLowerCase())) {
            setError('Section name already exists. Please choose a unique name.');
            return;
        }

        try {
            setIsEditing(true); // Start loading
            const sectionRef = doc(firestore, 'sections', section.id);
            await updateDoc(sectionRef, { name: editingSection.name });
            // Clear editing state after successful edit
            setEditingSection(null);
            setError('');
        } catch (error) {
            console.error('Error editing section:', error);
        } finally {
            setIsEditing(false); // End loading
        }
    };


    // Confirm and delete section along with its notes
    const confirmDeleteSection = (sectionId) => {
        setSectionToDelete(sectionId);
        setConfirmDeleteModal(true);
    };

 

    const handleDeleteSection = async () => {
        if (sectionToDelete) {
            try{
                setIsDeleting(true); // Start loading
                const notesQuery = query(
                    collection(firestore, 'notes'),
                    where('sectionId', '==', sectionToDelete)
                );
                const notesSnapshot = await getDocs(notesQuery);

                const deletePromises = notesSnapshot.docs.map(async (noteDoc) => {
                    const noteData = noteDoc.data();

                    // Delete associated files from storage
                    const fileDeletePromises = [];

                    // Check for images in content and delete based on "src" attributes
                    if (noteData.content && noteData.content.content) {
                        const contentArray = noteData.content.content;

                        contentArray.forEach((node) => {
                            if (node.type === 'image' && node.attrs && node.attrs.src) {
                                const imageUrl = node.attrs.src;
                                console.log("Found image URL:", imageUrl); // Debug: Log each image URL
                                fileDeletePromises.push(deleteImageFromFirebase(imageUrl));
                            }
                        });
                    }

                    // Delete document or code file stored in 'fileURL'
                    if (noteData.fileURL) {
                        console.log("Found file URL:", noteData.fileURL); // Debug: Log file URL
                        const fileRef = ref(storage, noteData.fileURL);
                        fileDeletePromises.push(deleteObject(fileRef));
                    }

                    await Promise.all(fileDeletePromises);

                    // Log before deleting the note document
                    console.log("Deleting note document with ID:", noteDoc.id);
                    return deleteDoc(noteDoc.ref);
                });

                await Promise.all(deletePromises);

                // Finally, delete the section
                console.log("Deleting section with ID:", sectionToDelete);
                await deleteDoc(doc(firestore, 'sections', sectionToDelete));

                setConfirmDeleteModal(false);
                setSectionToDelete(null);
            } catch (error) {
                console.error('Error deleting section and associated notes:', error);
            } finally {
                setIsDeleting(false); // End loading
            }
        }
    };





    return (
        <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Notes</h2>
                <Button onClick={() => {
                    setIsModalOpen(true);
                    setNewSectionName(''); // Reset input when opening modal
                    setError(''); // Clear error
                }}>
                    + New Section
                </Button>
            </div>

            <div>
                {sections.map((section) => (
                    <NoteSection
                        key={section.id}
                        section={section}
                        allSections={sections}
                        onEditSection={(sec) => {
                            setEditingSection(sec);
                            setError(''); // Clear error when opening edit modal
                        }}
                        // onDeleteSection={handleDeleteSection}
                        onDeleteSection={() => confirmDeleteSection(section.id)}
                    />
                ))}
            </div>

            {/* Add New Section Modal */}
            <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Section">
                <TextInput
                    label="Section Name"
                    placeholder="Enter section name"
                    value={newSectionName}
                    onChange={(e) => {
                        setNewSectionName(e.currentTarget.value);
                        setError(''); // Clear error on input change
                    }}
                    error={error}
                />
                <Button onClick={handleAddSection} loading={isAdding} style={{ marginTop: '10px' }}>
                    Add Section
                </Button>
            </Modal>

            {/* Edit Section Modal */}
            {editingSection && (
                <Modal opened={!!editingSection} onClose={() => setEditingSection(null)} title="Edit Section">
                    <TextInput
                        label="Section Name"
                        value={editingSection.name}
                        onChange={(e) => {
                            setEditingSection({ ...editingSection, name: e.currentTarget.value });
                            setError(''); // Clear error on input change
                        }}
                        error={error}
                    />
                    <Button onClick={() => handleEditSection(editingSection)} loading={isEditing} style={{ marginTop: '10px' }}>
                        Save Changes
                    </Button>
                </Modal>
            )}

            {/* Confirm Delete Section Modal */}
            <Modal
                opened={confirmDeleteModal}
                onClose={() => setConfirmDeleteModal(false)}
                title="Confirm Delete"
            >
                <p>Are you sure you want to delete this section and all associated notes?</p>
                <Button 
                    color="red" 
                    onClick={handleDeleteSection}
                    loading={isDeleting}
                >
                    Confirm Delete
                </Button>
                <Button variant="outline" onClick={() => setConfirmDeleteModal(false)} style={{ marginLeft: '10px' }}>
                    Cancel
                </Button>
            </Modal>
        </div>
    );
};

export default NoteOrganizer;




