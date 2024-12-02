import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PDFViewer from '../components/PDFViewer';
import { doc, getDoc, collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import RichTextEditor from '../components/RichTextEditor';
import { Container, Button, Modal, TextInput, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import axios from 'axios';

const DocuNote = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const pdfUrl = location.state?.pdfUrl;
    const { noteId, sectionId, moduleId } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pdfReady, setPdfReady] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [qaModalOpen, setQaModalOpen] = useState(false);
    const [error, setError] = useState(''); // State to store validation error
    const [userPrompt, setUserPrompt] = useState('');
    const editorRef = useRef(); //controller given by RTE
    const [newTagNameError, setNewTagNameError] = useState('');
    const [selectedTagError, setSelectedTagError] = useState('');



    const [flashcardModalOpen, setFlashcardModalOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState('');
    const [newTagName, setNewTagName] = useState('');
    const [tags, setTags] = useState([]);

    // check if pdf file is there to decide to stay or go back 
    useEffect(() => {
        if (pdfUrl) {
            setPdfReady(true);
        } else {
            console.error('PDF URL is missing. Redirecting back to the selection page.');
            navigate(-1); 
        }
    }, [pdfUrl, navigate]);

    // Fetch the note data, mainly to check if note exists, and get the note name
    useEffect(() => {
        const fetchNote = async () => {
            if (moduleId, sectionId, noteId) {
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
    }, [noteId, moduleId, sectionId]);


   

    // Fetch tags specific to the current module
    const fetchTags = async () => {
        try {
            if (!moduleId) {
                console.error('Module ID is missing. Cannot fetch tags.');
                return [];
            }

            // Query to get tags only for the current module
            const tagsRef = collection(firestore, 'tags');
            const tagsQuery = query(tagsRef, where('moduleId', '==', moduleId));
            const tagsSnapshot = await getDocs(tagsQuery);

            const tagsData = tagsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return tagsData;
        } catch (error) {
            console.error('Error fetching tags:', error);
            return [];
        }
    };


    //validate tag input (for creating new tag)
    const validateTagInputs = () => {
        let isValid = true; 

        
        setNewTagNameError('');
        setSelectedTagError('');

        // Check if the new tag name already exists
        if (newTagName && tags.some(tag => tag.name === newTagName)) {
            setNewTagNameError("This tag name already exists. Please enter a unique name.");
            isValid = false;
        }
        return isValid;
    };


    // LLM 4: generate flashcard
    const handleGenerateFlashcards = async () => {
        // Validate new tag input
        if (!validateTagInputs()) return;
        setIsProcessing(true);

        //no validation for selected tag here, proceed on generating flashcard
        try {
            const response = await fetch(pdfUrl); //http get response
            const blob = await response.blob(); //convert to blob
            const file = new File([blob], 'document.pdf', { type: blob.type }); //make a file object

            //prepare form data
            const formData = new FormData();
            formData.append('file', file); //put the file inside this "envelope" to be sent
            const { data } = await axios.post('http://localhost:5000/generate-flashcards', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            // clean the GPT response (JSON in string)
            const cleanedData = cleanJSONResponse(data.flashcards);
            //convert JSON string into a usable JavaScript object (an array of objects)
            const flashcards = JSON.parse(cleanedData);
            console.log("parsed flashcards: ", flashcards);

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
                    tagId: tagId,  
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

    // Helper function to clean the GPT response for generating flashcards
    const cleanJSONResponse = (response) => {
        console.log('response before cleaning', response);
        const cleanedResponse = response.replace(/```json/g, '').replace(/```/g, ''); 
        console.log('response after cleaning', cleanedResponse);
        return cleanedResponse;
    };


    // open flashcard modal
    const handleOpenFlashcardModal = async () => {
        // Fetch tags from Firestore
        const fetchedTags = await fetchTags(); 
        setTags(fetchedTags);
        setFlashcardModalOpen(true);
    };


    //LLM 1: summarization
    const handleSummarizePdf = async () => {
        // Validate if a valid PDF URL is provided
        if (!pdfUrl) {
            console.error('PDF URL is missing.');
            return;
        }

        setIsProcessing(true);// Indicate that processing is in progress

        try {
            // Step 1: Fetch the PDF file as a Blob
            const response = await fetch(pdfUrl); 
            const blob = await response.blob() 

            // Step 2: Wrap the Blob into a File object for compatibiliy with APIs which expect File object
            const file = new File([blob], 'document.pdf', { type: blob.type });

            // Step 3: Prepare FormData to send to the backend under the 'file' key
            const formData = new FormData();
            formData.append('file', file); 

            // Step 4: Send the file to the backend for summarization, data as output
            const { data } = await axios.post('/summarize-pdf', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }, 
            });

            // Step 5: Insert the summary into the Rich Text Editor
            if (editorRef.current) {
                editorRef.current.insertText(data.summary);
            }

        } catch (error) {
            console.error('Error summarizing the PDF:', error);
        } finally {
            setIsProcessing(false); 
        }
    };

    //LLM 2: key concepts 
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


    // LLM 3: contextual Q&A
    const handleContextualQA = async () => {
        if (!pdfUrl || !userPrompt) {
            console.error('PDF URL or user prompt is missing.');
            return;
        }

        setIsProcessing(true);

        try {
            const response = await fetch(pdfUrl); // fetch PDF using url
            const blob = await response.blob(); //convert into Binary large object type
            //wrap the blob into a file object
            const file = new File([blob], 'document.pdf', { type: blob.type });

            // prepare the FormData object to send the file and user prompt to backend , using keys 'file' and 'prompt'
            const formData = new FormData(); 
            formData.append('file', file); 
            formData.append('prompt', userPrompt);

            //send the FormData to the backend endpoint using axios, output data
            const { data } = await axios.post('http://localhost:5000/contextual-qa', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            //insert into RTE using the RTE's method 'insertText'
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

    if (loading) return <div>Loading...</div>;
    if (!note) return <div>Note not found</div>;

    return (
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

                <h3 style={{ margin: 0, fontWeight: 'bold', flex: 1 }}>
                    {note ? note.name : 'Loading...'}
                </h3>

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
                        <PDFViewer pdfUrl={pdfUrl} /> //get the file url to open
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
                        value={newTagName} // create new tag
                        onChange={(event) => {
                            setNewTagName(event.currentTarget.value);
                            setNewTagNameError(''); // Clear any existing error
                            setSelectedTag(''); // Ensure only one field is filled
                        }}
                        error={newTagNameError} // Display error message for new tag name
                    />
                    <select
                        value={selectedTag} //selected a created tag
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
                            outline: 'none', 
                        }}
                        onMouseDown={(e) => {
                            e.target.style.borderColor = '#1c7ed6';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#ced4da';
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
                        onClick={() => handleGenerateFlashcards()}  
                        style={{ marginTop: '15px' }}
                        disabled={!selectedTag && !newTagName} //disable button if both are null
                    >
                        Generate
                    </Button>
                </div>
            </Modal>

        </Container>
    );
};

export default DocuNote;


