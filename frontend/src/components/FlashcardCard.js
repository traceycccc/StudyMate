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
    const [error, setError] = useState({ question: '', answer: '' }); // Error state


    const [loading, setLoading] = useState(false); // Loading state for save button
    const [isDeleting, setIsDeleting] = useState(false); // Loading state for delete button

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
            setIsDeleting(true); // Start loading
            const flashcardRef = doc(firestore, 'flashcards', flashcard.id);
            await deleteDoc(flashcardRef);
            closeDeleteModal(); // Close modal after deleting
            console.log("Flashcard deleted successfully");
            if (onDelete) onDelete(flashcard.id); // Call the onDelete prop to update UI
        } catch (error) {
            console.error("Error deleting flashcard:", error);
        } finally {
            setIsDeleting(false); // Stop loading
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
                <Text size="s">Last scored rating: {flashcard.rating || 'N/A'}/5</Text>
                <Menu position="bottom-end">
                    <Menu.Target>
                        <ActionIcon
                            style={{
                                backgroundColor: 'transparent', // Set the default background color of the button
                                color: 'black', // Default color of the icon
                                transition: 'background-color 0.3s ease', // Smooth transition for hover
                            }}
                            radius="xl"
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#DDEFFF')} // Hover color
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
                    <Button color="red" onClick={handleDeleteFlashcard} loading={isDeleting}>Delete</Button>
                </Group>
            </Modal>
        </Card>
    );
};

export default FlashcardCard;




