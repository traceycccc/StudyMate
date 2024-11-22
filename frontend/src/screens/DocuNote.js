import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PDFViewer from '../components/PDFViewer';
import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import RichTextEditor from '../components/RichTextEditor';
import { Container, Button, Modal, TextInput, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import axios from 'axios';

const DocuNote = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pdfUrl = location.state?.pdfUrl;
    const { noteId, moduleId } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pdfReady, setPdfReady] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [qaModalOpen, setQaModalOpen] = useState(false);
    const [error, setError] = useState(''); // State to store validation error
    const [userPrompt, setUserPrompt] = useState('');
    const editorRef = useRef();
    const [newTagNameError, setNewTagNameError] = useState('');
    const [selectedTagError, setSelectedTagError] = useState('');



    const [flashcardModalOpen, setFlashcardModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState('');
    const [newTagName, setNewTagName] = useState('');
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (pdfUrl) {
            setPdfReady(true);
        } else {
            console.error('PDF URL is missing. Redirecting back to the selection page.');
            navigate('/modules'); // Adjust the path based on your module's route
        }
    }, [pdfUrl, navigate]);

    // Fetch the note data
    useEffect(() => {
        const fetchNote = async () => {
            if (noteId) {
                try {
                    const noteRef = doc(firestore, 'notes', noteId);
                    const noteSnap = await getDoc(noteRef);
                    if (noteSnap.exists()) {
                        setNote(noteSnap.data());
                    }
                } catch (error) {
                    console.error('Error fetching note:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchNote();
    }, [noteId]);

    const fetchTags = async () => {
        try {
            const tagsRef = collection(firestore, 'tags');
            const tagsSnapshot = await getDocs(tagsRef);
            const tagsData = tagsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return tagsData;
        } catch (error) {
            console.error("Error fetching tags:", error);
            return [];
        }
    };


    // Helper function to clean the GPT response
    const cleanJSONResponse = (response) => {
        // Remove any extraneous backticks and "```json" markers if present
        const cleanedResponse = response.replace(/```json/g, '').replace(/```/g, '');
        return cleanedResponse;


    };




    const validateTagInputs = () => {
        let isValid = true;
        setNewTagNameError('');
        setSelectedTagError('');

     
        if (newTagName && tags.some(tag => tag.name === newTagName)) {
            setNewTagNameError("This tag name already exists. Please enter a unique name.");
            isValid = false;
        }
        return isValid;
    };




    const handleGenerateFlashcards = async () => {
        // Validate inputs
        if (!validateTagInputs()) return;
        setIsProcessing(true);
        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const file = new File([blob], 'document.pdf', { type: blob.type });
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await axios.post('http://localhost:5000/generate-flashcards', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // Clean and parse the GPT response
            const cleanedData = cleanJSONResponse(data.flashcards);
            const flashcards = JSON.parse(cleanedData);
            // Determine tag ID
            let tagId = selectedTag; // Use selected tag ID if available
            // If creating a new tag, save it first and get its ID
            if (newTagName) {
                const newTag = {
                    name: newTagName,
                    color: '#' + ((1 << 24) * Math.random() | 0).toString(16), // Random color
                    moduleId,
                    userId: auth.currentUser?.uid,
                };
                const newTagRef = await addDoc(collection(firestore, 'tags'), newTag);
                tagId = newTagRef.id;  // Set tagId to the new tag's document ID
                console.log("New tag created with ID:", tagId);
            }
            // Convert flashcards to HTML and save each to Firestore with tagId
            const flashcardPromises = flashcards.map(async (flashcard) => {
                const questionHTML = `<p>${flashcard.question}</p>`;
                const answerHTML = `<p>${flashcard.answer}</p>`;
                const flashcardData = {
                    question: questionHTML,
                    answer: answerHTML,
                    tagId: tagId,  // Use the correct tag ID here
                    createdAt: new Date(),
                    userId: auth.currentUser?.uid,
                    completed: false,
                    rating: null,
                    moduleId: moduleId,
                };

                return addDoc(collection(firestore, 'flashcards'), flashcardData);
            });

            // Wait until all flashcards are saved
            await Promise.all(flashcardPromises);

            console.log("Flashcards generated and saved successfully with tag ID:", tagId);
            setFlashcardModalOpen(false); // Close modal on success
        } catch (error) {
            console.error('Error generating flashcards:', error);
        } finally {
            setIsProcessing(false);
        }
    };






    const handleOpenFlashcardModal = async () => {
        // Fetch tags from Firestore or another source
        const fetchedTags = await fetchTags(); // Assuming fetchTags is a function that fetches tags
        setTags(fetchedTags);
        setFlashcardModalOpen(true);
    };

    const handleContextualQA = async () => {
        if (!pdfUrl || !userPrompt) {
            console.error('PDF URL or user prompt is missing.');
            return;
        }

        setIsProcessing(true);

        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const file = new File([blob], 'document.pdf', { type: blob.type });

            const formData = new FormData();
            formData.append('file', file);
            formData.append('prompt', userPrompt);

            const { data } = await axios.post('http://localhost:5000/contextual-qa', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (editorRef.current) {
                editorRef.current.insertText(data.answer);
            }
        } catch (error) {
            console.error('Error processing contextual Q&A:', error);
        } finally {
            setIsProcessing(false);
            setQaModalOpen(false);
            setUserPrompt('');
        }
    };

    const handleKeyConcepts = async () => {
        if (!pdfUrl) {
            console.error('PDF URL is missing.');
            return;
        }

        setIsProcessing(true);

        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const file = new File([blob], 'document.pdf', { type: blob.type });

            const formData = new FormData();
            formData.append('file', file);

            const { data } = await axios.post('/extract-key-concepts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (editorRef.current) {
                editorRef.current.insertText(data.keyConcepts);
            }

        } catch (error) {
            console.error('Error extracting key concepts from the PDF:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    // Function to handle PDF summarization
    const handleSummarizePdf = async () => {
        if (!pdfUrl) {
            console.error('PDF URL is missing.');
            return;
        }

        setIsProcessing(true);

        try {
            // Fetch the PDF file as a Blob
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const file = new File([blob], 'document.pdf', { type: blob.type });

            // Prepare FormData
            const formData = new FormData();
            formData.append('file', file);

            // Send the PDF file to the backend for summarization
            const { data } = await axios.post('/summarize-pdf', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Set the summary content in the editor
            if (editorRef.current) {
                editorRef.current.insertText(data.summary);
            }

        } catch (error) {
            console.error('Error summarizing the PDF:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!note) return <div>Note not found</div>;

    return (
        // <Container fluid style={{ padding: '0px 20px 20px 20px' }}>
        <Container fluid style={{ padding: '0px 0px 0px 0px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#007bff', // Customize the color
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        padding: '8px 8px 8px 0px',
                        borderRadius: '25px',
                        transition: 'background-color 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#e7f1ff'} // Hover effect
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    <IconArrowLeft size={18} style={{ marginRight: '6px', backgroundColor: 'transparent' }} />
                    Back
                </button>

                <h1 style={{ margin: 0, fontWeight: 'bold', flex: 1 }}>
                    {note ? note.name : 'Loading...'}
                </h1>

                <Button
                    onClick={handleSummarizePdf}
                    loading={isProcessing}
                    disabled={isProcessing}
                >
                    Summarize
                </Button>
                <Button
                    onClick={handleKeyConcepts}
                    loading={isProcessing}
                    disabled={isProcessing}
                >
                    Extract Key Concepts
                </Button>
                <Button
                    onClick={() => setQaModalOpen(true)}
                    loading={isProcessing}
                    disabled={isProcessing}
                >
                    Contextual Q&A
                </Button>
                <Button
                    onClick={handleOpenFlashcardModal}  // Open flashcard modal on click
                    loading={isProcessing}
                    disabled={isProcessing}
                >
                    Generate Flashcards
                </Button>
            </div>

            
            <div style={{ display: 'flex', gap: '20px' }}>

                {/* Document Viewer Section */}
                <div style={{ flex: 1, height: '83vh', overflowY: 'hidden', borderRadius: '8px', backgroundColor: '#F8F8FF' }}>

                    {pdfReady ? (
                        <PDFViewer pdfUrl={pdfUrl} />
                    ) : (
                        <p>Loading PDF...</p>
                    )}
                </div>

                {/* Rich Text Editor Section */}
                <div style={{ flex: 1, overflowY: 'hidden' }}>

                    <RichTextEditor ref={editorRef} noteId={noteId} />

                </div>
            </div>

            <Modal
                opened={qaModalOpen}
                onClose={() => setQaModalOpen(false)}
                title="Enter your question about the PDF"
            >
                <TextInput
                    value={userPrompt}
                    onChange={(event) => {
                        setUserPrompt(event.currentTarget.value);
                        if (event.currentTarget.value.trim()) {
                            setError(''); // Clear error if user starts typing
                        }
                    }}
                    placeholder="Ask a question about the PDF content"
                    error={error} // Display error state in TextInput
                />
                {error && (
                    <Text color="red" size="sm" style={{ marginTop: '5px' }}>
                        {error}
                    </Text>
                )}
                <Button
                    onClick={handleContextualQA}
                    disabled={isProcessing || !userPrompt.trim()} // Disable if processing or input is empty
                    style={{ marginTop: '10px' }}
                >
                    Submit
                </Button>
            </Modal>


            {/* Modal for generating flashcards */}
            <Modal
                opened={flashcardModalOpen}
                onClose={() => setFlashcardModalOpen(false)}
                title="Generate Flashcards"
            >
                <div>
                    <TextInput
                        label="Select or Create Tag"
                        placeholder="Select an existing tag or enter a new one"
                        value={newTagName}
                        onChange={(event) => {
                            setNewTagName(event.currentTarget.value);
                            setNewTagNameError(''); // Clear any existing error
                            setSelectedTag(''); // Ensure only one field is filled
                        }}
                        error={newTagNameError} // Display error message for new tag name
                    />
                    <select
                        value={selectedTag}
                        onChange={(e) => {
                            setSelectedTag(e.target.value);
                            setSelectedTagError(''); // Clear any existing error
                            setNewTagName(''); // Ensure only one field is filled
                        }}
                        style={{
                            width: '100%',
                            marginTop: '10px',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            outline: 'none', // Removes black outline on focus
                        }}
                        onMouseDown={(e) => {
                            e.target.style.borderColor = '#1c7ed6';//primry blue color by mantine
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#ced4da'; // Original border color
                        }}
                    >
                        <option value="">Select Tag</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                    {selectedTagError && <p style={{ color: 'red', marginTop: '5px' }}>{selectedTagError}</p>}

                    <Button
                        onClick={() => handleGenerateFlashcards()}  // This function will be added later for flashcard generation logic
                        style={{ marginTop: '15px' }}
                        disabled={!selectedTag && !newTagName}
                    >
                        Generate
                    </Button>
                </div>
            </Modal>

        </Container>
    );
};

export default DocuNote;


