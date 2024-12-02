import React, { useState, useRef, useEffect } from 'react';
import { Card, ActionIcon, Menu, Progress, Modal, TextInput, ColorInput, Button, Group, Text } from '@mantine/core';
import { IconDots, IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import FlashcardCard from './FlashcardCard';
import FlashcardTextEditor from './FlashcardTextEditor';
import { doc, updateDoc, deleteDoc, addDoc, collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import { firestore, auth } from '../firebase';

const TagSection = ({ tag, flashcards, onEditTag, allTags }) => { //props
    //tag
    const [opened, setOpened] = useState(false); // Toggle for collapse
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Toggle for edit modal
    const [editedTagName, setEditedTagName] = useState(tag.name); // Store edited name
    const [editedTagColor, setEditedTagColor] = useState(tag.color); // Store edited color
    const [editError, setEditError] = useState(''); // Error state for edit validation

    //flashcard
    const [isFlashcardModalOpen, setIsFlashcardModalOpen] = useState(false);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false); // Confirmation modal for deletion
    const [questionContent, setQuestionContent] = useState('');
    const [answerContent, setAnswerContent] = useState('');
    const [tagFlashcards, setTagFlashcards] = useState([]); // State to store flashcards for the tag
    const [error, setError] = useState('');

    //loading states
    const [isSavingChanges, setIsSavingChanges] = useState(false);
    const [isDeletingTag, setIsDeletingTag] = useState(false);
    const [isSavingFlashcard, setIsSavingFlashcard] = useState(false);

    //reference objects pointing to the FlashcardTextEditor instance, has direct access to its methods (e.g. getContent())
    const questionEditorRef = useRef(null); //they hold .current property to refer/point
    const answerEditorRef = useRef(null);

    //using fc (flashcard) as accumulator to get no. of flashcards completed
    const completedCount = tagFlashcards.filter((fc) => fc.completed).length; 
    const totalFlashcards = tagFlashcards.length;
    const progressPercentage = totalFlashcards > 0 ? (completedCount / totalFlashcards) * 100 : 0; // e.g. 50%

    const toggleCollapse = () => setOpened((prev) => !prev);//bool toggle

    //fetch flashcards
    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            const flashcardsRef = collection(firestore, 'flashcards');
            const q = query(flashcardsRef, where('tagId', '==', tag.id), where('userId', '==', userId));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedFlashcards = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setTagFlashcards(fetchedFlashcards); //save into state 'tagFlashcards'
            });
            return () => unsubscribe();
        }
    }, [tag.id]);

    const openFlashcardModal = () => {
        setIsFlashcardModalOpen(true);
        setQuestionContent(''); // Reset content when opening modal
        setAnswerContent('');
        setError(''); //reset error message
    };

    const closeFlashcardModal = () => {
        setIsFlashcardModalOpen(false);
        setQuestionContent('');
        setAnswerContent('');
    };

    const handleOpenEditModal = () => {
        setEditedTagName(tag.name);
        setEditedTagColor(tag.color);
        setIsEditModalOpen(true);
        setEditError('');
    };

    //edit tag function
    const handleSaveChanges = async () => {

        //validate empty
        if (!editedTagName.trim()) {
            setEditError('Tag name cannot be empty.');
            return;
        }

        //using allTags passed from Flashcards. the object map
        const isDuplicate = allTags.some( //some: only have to find one matching
            (existingTag) =>
                existingTag.name.toLowerCase() === editedTagName.trim().toLowerCase() &&
                existingTag.id !== tag.id
        );
        //validation for duplicate name when edit
        if (isDuplicate) {
            setEditError('Tag name must be unique within this module.');
            return;
        }

        try {
            setIsSavingChanges(true); // Start loading
            const tagRef = doc(firestore, 'tags', tag.id);
            await updateDoc(tagRef, {
                name: editedTagName.trim(),
                color: editedTagColor,
            });
            setIsEditModalOpen(false);
            setEditError('');
            onEditTag();
        } catch (error) {
            console.error("Error updating tag:", error);
            setEditError('Failed to update tag.');
        } finally {
            setIsSavingChanges(false); // End loading
        }
    };

    const handleDeleteTag = async () => {
        try {
            setIsDeletingTag(true); // Start loading
            //query
            const flashcardsQuery = query(collection(firestore, 'flashcards'), where('tagId', '==', tag.id));
            const flashcardDocs = await getDocs(flashcardsQuery); // get all flashcards of that tag

            // Delete all flashcards associated with the tag, using tagId
            const deletePromises = flashcardDocs.docs.map((flashcard) => deleteDoc(doc(firestore, 'flashcards', flashcard.id)));
            await Promise.all(deletePromises); //wait all flashcards are deleted using Promise

            // Delete the tag itself
            const tagRef = doc(firestore, 'tags', tag.id);
            await deleteDoc(tagRef);

            setIsDeleteConfirmModalOpen(false); // Close confirmation modal
            onEditTag();
        } catch (error) {
            console.error("Error deleting tag and its flashcards:", error);
        } finally {
            setIsDeletingTag(false); // End loading
        }
    };

    const confirmDeleteTag = () => {
        setIsDeleteConfirmModalOpen(true);
    };

    //create new flashcard
    const saveFlashcard = async (clearAfterSave = false) => {
        //get contents from the editors
        const questionContent = questionEditorRef.current?.getContent();
        const answerContent = answerEditorRef.current?.getContent();
        if (!questionContent.trim() || !answerContent.trim()) {
            setError("Both question and answer fields must be filled.");
            return;
        }

        setError('');
        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.error("User not authenticated");
            return;
        }

        
        try {
            setIsSavingFlashcard(true); // Start loading
            const newFlashcard = {
                question: questionContent,
                answer: answerContent,
                tagId: tag.id,
                completed: false,
                createdAt: new Date(),
                userId,
                rating: null,
                moduleId: tag.moduleId,
            };

            await addDoc(collection(firestore, 'flashcards'), newFlashcard);

            if (clearAfterSave) {
                setQuestionContent('');
                setAnswerContent('');
                questionEditorRef.current?.clearContent('');
                answerEditorRef.current?.clearContent('');
            } else {
                setIsFlashcardModalOpen(false);
            }
        } catch (error) {
            console.error("Error adding flashcard:", error);
        } finally {
            setIsSavingFlashcard(false); // End loading
        }
    };

    return (
        <Card style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#F7FBFE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={toggleCollapse}>
                    {opened ? <IconChevronDown /> : <IconChevronRight />}
                    <h3 style={{ marginLeft: '10px', color: tag.color }}>{tag.name}</h3>
                </div>
                <Menu position="bottom-end">
                    <Menu.Target>
                        <ActionIcon
                            style={{
                                backgroundColor: 'transparent',
                                color: 'black',
                                transition: 'background-color 0.3s ease',
                                marginRight: '10px',
                            }}
                            radius="xl"
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#DDEFFF')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                            <IconDots />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={handleOpenEditModal}>Edit Tag</Menu.Item>
                        <Menu.Item onClick={openFlashcardModal}>Add Flashcard</Menu.Item>
                        <Menu.Item color="red" onClick={confirmDeleteTag}>Delete Tag</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>

            {/* Progress Tracking using mantine progress component, progressPercentage is in percent*/}
            <div style={{ padding: '5px 15px 0', marginTop: '5px' }}>
                <p style={{ color: tag.color }}>Progress: {completedCount}/{totalFlashcards} flashcards completed</p>
                <Progress value={progressPercentage} color={tag.color} /> 
            </div>

            {/* Collapsible Flashcard List */}
            {opened && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '10px',
                    padding: '10px 15px'
                }}>
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
                    setEditError('');
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
                    <Button 
                        onClick={handleSaveChanges}
                        loading={isSavingChanges}
                    >
                    Save Changes
                    </Button>
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
                        //onChange={setQuestionContent}
                        key={`question-${isFlashcardModalOpen}`}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <p><strong>Answer</strong></p>
                    <FlashcardTextEditor
                        ref={answerEditorRef}
                        content={answerContent}
                        //onChange={setAnswerContent}
                        key={`answer-${isFlashcardModalOpen}`}
                    />
                </div>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                <Group position="apart">
                    <Button onClick={() => saveFlashcard(false)} loading={isSavingFlashcard}>Save</Button>
                    <Button color="blue" onClick={() => saveFlashcard(true)} loading={isSavingFlashcard}>Save and Add Another</Button>
                </Group>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                opened={isDeleteConfirmModalOpen}
                onClose={() => setIsDeleteConfirmModalOpen(false)}
                title="Delete Tag and Flashcards"
            >
                <Text>Are you sure you want to delete this tag and all associated flashcards? This action cannot be undone.</Text>
                <Group position="right" style={{ marginTop: '20px' }}>
                    <Button color="red" onClick={handleDeleteTag} loading={isDeletingTag}>Confirm Delete</Button>
                    <Button onClick={() => setIsDeleteConfirmModalOpen(false)}>Cancel</Button>
                </Group>
            </Modal>
        </Card>
    );
};

export default TagSection;




