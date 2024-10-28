import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../firebase';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import RichTextEditor from '../components/RichTextEditor';

const CodeNote = () => {

    console.log("Rendering CodeNote component..."); // Add this line for debugging

    const navigate = useNavigate();
    const { noteId, moduleId } = useParams(); 
    const [fileContent, setFileContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [note, setNote] = useState(null);
    const editorRef = useRef(); // Reference to access RichTextEditor methods

    // Fetch the note and load the code file content from Firebase
    useEffect(() => {
        const fetchNoteData = async () => {
            try {
                const noteRef = doc(firestore, 'notes', noteId);
                const noteDoc = await getDoc(noteRef);
                if (noteDoc.exists()) {
                    const noteData = noteDoc.data();
                    setNote(noteData);

                    // Retrieve code file from Firebase Storage
                    const fileRef = ref(storage, noteData.fileURL);
                    const fileURL = await getDownloadURL(fileRef);
                    const response = await fetch(fileURL);
                    const text = await response.text();
                    setFileContent(text);
                } else {
                    console.error('Note not found.');
                }
            } catch (error) {
                console.error('Error fetching note data:', error);
            }
        };

        fetchNoteData();
    }, [noteId]);

    // Handle "Explain Code" button click
    const handleExplainCode = async () => {
        if (!fileContent) return;
        setIsLoading(true);

        try {
            const response = await axios.post('/explain-code', { code: fileContent }); // Update with actual backend URL
            const explanation = response.data.explanation;

            // Insert explanation into the rich text editor
            if (editorRef.current) {
                editorRef.current.insertText(explanation);
            }
        } catch (error) {
            console.error('Error explaining code:', error);
            if (editorRef.current) {
                editorRef.current.insertText('Failed to explain the code.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
            <Button variant="subtle" onClick={() => navigate(`/modules/${moduleId}/overview`)}>
                ← Back
            </Button>
            {/* Code Viewer Section */}
            <div style={{ flex: 1, height: '95vh', overflowY: 'auto', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Viewing Code: {note ? note.name : 'Loading...'}</h3>
                {fileContent ? (
                    <SyntaxHighlighter 
                        language="javascript" 
                        style={docco}
                        customStyle={{
                            fontSize: '12px', // Adjust font size here
                            lineHeight: '1.2', // Optional: decrease line height to save space
                        }}
                    >
                        {fileContent}
                    </SyntaxHighlighter>
                ) : (
                    <p>Loading code content...</p>
                )}
            </div>

            {/* Rich Text Editor Section */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Explanation</h3>
                    <button onClick={handleExplainCode} disabled={isLoading}>
                        {isLoading ? 'Explaining...' : 'Explain Code'}
                    </button>
                </div>
                {/* Render RichTextEditor with ref for inserting explanation */}
                <RichTextEditor ref={editorRef} noteId={noteId} />
            </div>
        </div>
    );
};

export default CodeNote;
