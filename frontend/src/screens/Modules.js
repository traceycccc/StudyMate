import React, { useState, useEffect } from 'react';
import { Button, Modal, TextInput, ColorInput, Title } from '@mantine/core';
import { auth, firestore, storage } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy, getDocs } from 'firebase/firestore';
import { deleteImageFromFirebase } from '../utils/uploadImage';
import { ref, deleteObject } from 'firebase/storage';
import ModuleCard from '../components/ModuleCard';
import { useNavigate } from 'react-router-dom';

const Modules = () => {
    const [modules, setModules] = useState({ favoriteModules: [], nonFavoriteModules: [] });
    const [newModuleName, setNewModuleName] = useState('');
    const [newModuleColor, setNewModuleColor] = useState('#FFFFFF');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [error, setError] = useState(''); // For validation errors
    const [confirmDeleteModal, setConfirmDeleteModal] = useState({ open: false, moduleId: null }); // New state for delete confirmation modal

    // Loading states
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const userId = auth.currentUser?.uid;
    const navigate = useNavigate(); // Initialize navigate

    // fetching modules from firestore 
    useEffect(() => {
        if (userId) {
            const q = query(
                collection(firestore, 'modules'), 
                where('userId', '==', userId), 
                orderBy('createdAt', 'desc')
            ); //arranged using descending order on date
            const unsubscribe = onSnapshot(q, (snapshot) => { //firebase's onSnapshot listener to real-time updates in Firestore
                const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                const favoriteModules = modulesData.filter((module) => module.favorite);
                const nonFavoriteModules = modulesData.filter((module) => !module.favorite);

                setModules({ favoriteModules, nonFavoriteModules });
            });
            return () => unsubscribe(); // react clean up function, stops the real-time listener
        }
    }, [userId]);

    // Validate module name uniqueness for creation
    const handleAddModule = async () => {

        if (!newModuleName.trim()) {
            setError('Module name cannot be empty.');
            return;
        }

        // get existing names  (and convert to lowercase)
        const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules].map((mod) => mod.name.toLowerCase());
        //validate that the new module name is unique regardless of upper/lowercase
        if (moduleNames.includes(newModuleName.toLowerCase())) {
            setError('Module name already exists. Please choose a unique name.');
            return;
        }

        

        setIsAdding(true); // Start loading
        try {
            
            await addDoc(collection(firestore, 'modules'), {
                name: newModuleName,
                color: newModuleColor,
                userId,
                createdAt: new Date(),
                favorite: false,
            });
            // Clear input fields after successful addition
            setNewModuleName('');
            setNewModuleColor('#FFFFFF');
            setIsModalOpen(false);
            setError(''); // Clear error after successful addition
        } catch (error) {
            console.error('Error adding module:', error);
        } finally {
            setIsAdding(false); // End loading
        }
    };

    // Validate module name uniqueness for editing
    const handleEditModule = async (module) => {
        if (!editingModule.name.trim()) {
            setError('Module name cannot be empty.');
            return;
        }

        // get existing names  (and convert to lowercase)
        const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules]
            .filter((mod) => mod.id !== module.id)
            .map((mod) => mod.name.toLowerCase());
        //validate that the new module name is unique regardless of upper/lowercase
        if (moduleNames.includes(editingModule.name.toLowerCase())) {
            setError('Module name already exists. Please choose a unique name.');
            return;
        }

        try {
            setIsEditing(true); // Start loading
            const moduleRef = doc(firestore, 'modules', module.id);
            await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
            setEditingModule(null);
            setError('');
        } catch (error) {
            console.error('Error editing module:', error);
        } finally {
            setIsEditing(false); // End loading
        }
    };

    const handleToggleFavorite = async (moduleId, isFavorite) => {
        const moduleRef = doc(firestore, 'modules', moduleId);
        await updateDoc(moduleRef, { favorite: !isFavorite });
    };

    const handleDeleteModuleRequest = (moduleId) => {
        // Open the delete confirmation modal and set the moduleId to delete
        setConfirmDeleteModal({ open: true, moduleId });
    };

    const confirmDeleteModule = async () => {
        //get module ID
        const moduleId = confirmDeleteModal.moduleId;

        try {
            setIsDeleting(true); // Start loading
            // 1. Delete sections related to the module
            const sectionsQuery = query(collection(firestore, 'sections'), where('moduleId', '==', moduleId));
            const sectionsSnapshot = await getDocs(sectionsQuery);

            const sectionDeletePromises = sectionsSnapshot.docs.map((sectionDoc) => deleteDoc(sectionDoc.ref));
            await Promise.all(sectionDeletePromises);

            // 2. Delete tags related to the module
            const tagsQuery = query(collection(firestore, 'tags'), where('moduleId', '==', moduleId));
            const tagsSnapshot = await getDocs(tagsQuery);

            const tagDeletePromises = tagsSnapshot.docs.map((tagDoc) => deleteDoc(tagDoc.ref));
            await Promise.all(tagDeletePromises);

            // 3. Delete flashcards related to each tag of the module
            const flashcardsQuery = query(collection(firestore, 'flashcards'), where('moduleId', '==', moduleId));
            const flashcardsSnapshot = await getDocs(flashcardsQuery);

            const flashcardDeletePromises = flashcardsSnapshot.docs.map((flashcardDoc) => deleteDoc(flashcardDoc.ref));
            await Promise.all(flashcardDeletePromises);

            // 4. Delete notes and their associated files in storage
            const notesQuery = query(collection(firestore, 'notes'), where('moduleId', '==', moduleId));
            const notesSnapshot = await getDocs(notesQuery);

            // Prepare to delete all associated notes and their files and images
            const noteDeletePromises = notesSnapshot.docs.map(async (noteDoc) => {
                const noteData = noteDoc.data();

                // create an array to put files to be deleted
                const fileDeletePromises = [];

                // get images from content's 'src' attributes
                if (noteData.content && noteData.content.content) {
                    noteData.content.content.forEach((node) => {
                        if (node.type === 'image' && node.attrs && node.attrs.src) {// Extract the image URL
                            fileDeletePromises.push(deleteImageFromFirebase(node.attrs.src));
                        }
                    });
                }

                // get any document or code file in 'fileURL'
                if (noteData.fileURL) {
                    const fileRef = ref(storage, noteData.fileURL);
                    fileDeletePromises.push(deleteObject(fileRef));
                }

                // Wait for all associated files to be deleted before deleting the note
                await Promise.all(fileDeletePromises);
                return deleteDoc(noteDoc.ref);
            });

            // out of the loop, wait for all notes and their files to be deleted
            await Promise.all(noteDeletePromises);

            // 5. Finally, delete the module itself
            await deleteDoc(doc(firestore, 'modules', moduleId));
            console.log(`Module ${moduleId} and all associated data deleted successfully.`);
        } catch (error) {
            console.error('Error deleting module and associated data:', error);
        } finally {
            // Close the modal after deletion
            setConfirmDeleteModal({ open: false, moduleId: null });
            setIsDeleting(false); // End loading
        }
    };

    const handleModuleClick = (module) => {
        // Navigate to the module overview page using the correct path
        navigate(`/modules/${module.id}/overview`, { state: { moduleName: module.name } });
    };


    return (
        // <div style={{ padding: '10px' }}>
        <div>
            <Title
                order={1}
                style={{ marginTop: '0px', marginBottom: '20px' }}
            >
                Modules
            </Title>
            <Button onClick={() => {
                setIsModalOpen(true);
                setNewModuleName(''); 
                setNewModuleColor('#FFFFFF'); 
                setError(''); 
            }}>
                + New Module
            </Button>

            {/* Favorite Modules Section */}
            {modules.favoriteModules.length > 0 && (
                <>
                    <h2>Favorites</h2>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                        {modules.favoriteModules.map((module) => (
                            <ModuleCard
                                key={module.id}
                                module={module}
                                onToggleFavorite={handleToggleFavorite}
                                onEditModule={(module) => {
                                    setEditingModule(module);
                                    setError(''); // Clear error when opening the "Edit Module" modal
                                }}
                                onDeleteModule={() => handleDeleteModuleRequest(module.id)} // Trigger delete confirmation modal
                                onModuleClick={handleModuleClick}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Non-Favorite Modules Section */}
            <h2>All Modules</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                {modules.nonFavoriteModules.map((module) => (
                    <ModuleCard
                        key={module.id}
                        module={module}
                        onToggleFavorite={handleToggleFavorite}
                        onEditModule={(module) => {
                            setEditingModule(module);
                            setError(''); // Clear error when opening the "Edit Module" modal
                        }}
                        onDeleteModule={() => handleDeleteModuleRequest(module.id)} // Trigger delete confirmation modal
                        onModuleClick={handleModuleClick}
                    />
                ))}
            </div>

            {/* Add New Module Modal */}
            <Modal opened={isModalOpen} onClose={() => {
                setIsModalOpen(false);
                setNewModuleName(''); 
                setNewModuleColor('#FFFFFF');
                setError('');
            }} title="Add New Module">
                <TextInput
                    label="Module Name"
                    placeholder="Enter module name"
                    value={newModuleName}
                    onChange={(e) => {
                        setNewModuleName(e.currentTarget.value);
                        setError(''); // Clear error when typing
                    }}
                    error={error} // Display error under the input field
                />
                <ColorInput
                    label="Module Color"
                    value={newModuleColor}
                    onChange={setNewModuleColor}
                    placeholder="Choose color or enter hex code"
                />
                <Button onClick={handleAddModule} loading={isAdding} style={{ marginTop: '10px' }}>
                    Add Module
                </Button>
            </Modal>

            {/* Edit Module Modal */}
            {editingModule && (
                <Modal opened={!!editingModule} onClose={() => {
                    setEditingModule(null);
                    setError(''); // Clear error when closing the "Edit Module" modal
                }} title="Edit Module">
                    <TextInput
                        label="Module Name"
                        value={editingModule.name}
                        onChange={(e) => {
                            setEditingModule({ ...editingModule, name: e.currentTarget.value });
                            setError(''); // Clear error when typing
                        }}
                        error={error} // Display error under the input field
                    />
                    <ColorInput
                        label="Module Color"
                        value={editingModule.color}
                        onChange={(color) => setEditingModule({ ...editingModule, color })}
                    />
                    <Button onClick={() => handleEditModule(editingModule)} loading={isEditing} style={{ marginTop: '10px' }}>
                        Save Changes
                    </Button>
                </Modal>
            )}

            {/* Delete Module Confirmation Modal */}
            <Modal
                opened={confirmDeleteModal.open}
                onClose={() => setConfirmDeleteModal({ open: false, moduleId: null })}
                title="Delete Module"
            >
                <p>Are you sure you want to delete this module and all associated data?</p>
                <Button 
                    onClick={confirmDeleteModule} 
                    color="red" 
                    loading={isDeleting} 
                    style={{ marginTop: '10px', marginRight: '10px' }}
                >
                    Yes, Delete
                </Button>
                <Button onClick={() => setConfirmDeleteModal({ open: false, moduleId: null })} style={{ marginTop: '10px' }}>
                    Cancel
                </Button>
            </Modal>
        </div>
    );
};

export default Modules;







