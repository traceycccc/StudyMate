import React, { useState, useEffect, useRef } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../firebase';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // Import a colorful theme

import RichTextEditor from '../components/RichTextEditor';
import { Button } from '@mantine/core';

const CodeNote = () => {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const [fileContent, setFileContent] = useState('');
    const [note, setNote] = useState(null);
    const editorRef = useRef();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchNoteData = async () => {
            try {
                const noteRef = doc(firestore, 'notes', noteId);
                const noteDoc = await getDoc(noteRef);
                if (noteDoc.exists()) {
                    const noteData = noteDoc.data();
                    setNote(noteData);

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

    const handleExplainCode = async () => {
        if (!fileContent) return;
        setIsProcessing(true);

        try {
            const response = await axios.post('/explain-code', { code: fileContent });
            const explanation = response.data.explanation;

            if (editorRef.current) {
                editorRef.current.insertText(explanation);
            }
        } catch (error) {
            console.error('Error explaining code:', error);
            if (editorRef.current) {
                editorRef.current.insertText('Failed to explain the code.');
            }
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div style={{ padding: '0px' }}>
            {/* Back Button */}
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
                    onClick={handleExplainCode}
                    loading={isProcessing}
                    disabled={isProcessing}
                >
                    Explain Code
                </Button>
            </div>



            {/* Container for Code Viewer and Rich Text Editor */}
            <div style={{ display: 'flex', gap: '20px' }}>

                {/* Code Viewer Section */}
                <div style={{ flex: 1, height: '83vh', overflowY: 'auto', padding: '10px', border: '2px solid #91bfea', borderRadius: '8px', backgroundColor: '#F8F8FF' }}>

                    {fileContent ? (
                        <SyntaxHighlighter
                            language="javascript"
                            style={docco}
                            customStyle={{
                                fontSize: '18px',
                                lineHeight: '1',
                            }}
                        >
                            {fileContent}
                        </SyntaxHighlighter>
                    ) : (
                        <p>Loading code content...</p>
                    )}
                </div>

                {/* Rich Text Editor Section */}
                {/* <div style={{ flex: 1, height: '94%', overflowY: 'hidden' }}> */}
                <div style={{ flex: 1, overflowY: 'hidden'  }}>

                    <RichTextEditor ref={editorRef} noteId={noteId}  />
                </div>
            </div>
        </div>
    );
};

export default CodeNote;


