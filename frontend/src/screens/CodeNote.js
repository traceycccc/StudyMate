// import React, { useState, useEffect, useRef } from 'react';
// import { Button } from '@mantine/core';
// import { useNavigate, useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { ref, getDownloadURL } from 'firebase/storage';
// import { firestore, storage } from '../firebase';
// import axios from 'axios';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import RichTextEditor from '../components/RichTextEditor';
// import { IconArrowLeft } from '@tabler/icons-react';


// const CodeNote = () => {

//     console.log("Rendering CodeNote component..."); // Add this line for debugging

//     const navigate = useNavigate();
//     // const { noteId, moduleId } = useParams(); 
//     const { noteId } = useParams(); 
//     const [fileContent, setFileContent] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [note, setNote] = useState(null);
//     const editorRef = useRef(); // Reference to access RichTextEditor methods

//     // Fetch the note and load the code file content from Firebase
//     useEffect(() => {
//         const fetchNoteData = async () => {
//             try {
//                 const noteRef = doc(firestore, 'notes', noteId);
//                 const noteDoc = await getDoc(noteRef);
//                 if (noteDoc.exists()) {
//                     const noteData = noteDoc.data();
//                     setNote(noteData);

//                     // Retrieve code file from Firebase Storage
//                     const fileRef = ref(storage, noteData.fileURL);
//                     const fileURL = await getDownloadURL(fileRef);
//                     const response = await fetch(fileURL);
//                     const text = await response.text();
//                     setFileContent(text);
//                 } else {
//                     console.error('Note not found.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching note data:', error);
//             }
//         };

//         fetchNoteData();
//     }, [noteId]);

//     // Handle "Explain Code" button click
//     const handleExplainCode = async () => {
//         if (!fileContent) return;
//         setIsLoading(true);

//         try {
//             const response = await axios.post('/explain-code', { code: fileContent }); // Update with actual backend URL
//             const explanation = response.data.explanation;

//             // Insert explanation into the rich text editor
//             if (editorRef.current) {
//                 editorRef.current.insertText(explanation);
//             }
//         } catch (error) {
//             console.error('Error explaining code:', error);
//             if (editorRef.current) {
//                 editorRef.current.insertText('Failed to explain the code.');
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
//             {/* <Button variant="subtle" onClick={() => navigate(`/modules/${moduleId}/overview`)}>
//                 ← Back
//             </Button> */}
//             <Button variant="subtle" onClick={() => navigate(-1)}>
//                 ← Back
//             </Button>
//             {/* Code Viewer Section */}
//             <div style={{ flex: 1, height: '95vh', overflowY: 'auto', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#F8F8FF', }}>
//                 <h3>Viewing Code: {note ? note.name : 'Loading...'}</h3>
//                 {fileContent ? (
//                     <SyntaxHighlighter 
//                         language="javascript" 
//                         style={docco}
//                         customStyle={{
//                             fontSize: '12px', // Adjust font size here
//                             lineHeight: '1.2', // Optional: decrease line height to save space
//                         }}
//                     >
//                         {fileContent}
//                     </SyntaxHighlighter>
//                 ) : (
//                     <p>Loading code content...</p>
//                 )}
//             </div>

//             {/* Rich Text Editor Section */}
//             <div style={{ flex: 1 }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <h3>Explanation</h3>
//                     <button onClick={handleExplainCode} disabled={isLoading}>
//                         {isLoading ? 'Explaining...' : 'Explain Code'}
//                     </button>
//                 </div>
//                 {/* Render RichTextEditor with ref for inserting explanation */}
//                 <RichTextEditor ref={editorRef} noteId={noteId} />
//             </div>
//         </div>
//     );
// };

// export default CodeNote;


// import React, { useState, useEffect, useRef } from 'react';
// import { Button } from '@mantine/core';
// import { useNavigate, useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { ref, getDownloadURL } from 'firebase/storage';
// import { firestore, storage } from '../firebase';
// import axios from 'axios';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import RichTextEditor from '../components/RichTextEditor';

// const CodeNote = () => {
//     const navigate = useNavigate();
//     const { noteId } = useParams();
//     const [fileContent, setFileContent] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [note, setNote] = useState(null);
//     const editorRef = useRef();

//     useEffect(() => {
//         const fetchNoteData = async () => {
//             try {
//                 const noteRef = doc(firestore, 'notes', noteId);
//                 const noteDoc = await getDoc(noteRef);
//                 if (noteDoc.exists()) {
//                     const noteData = noteDoc.data();
//                     setNote(noteData);

//                     const fileRef = ref(storage, noteData.fileURL);
//                     const fileURL = await getDownloadURL(fileRef);
//                     const response = await fetch(fileURL);
//                     const text = await response.text();
//                     setFileContent(text);
//                 } else {
//                     console.error('Note not found.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching note data:', error);
//             }
//         };

//         fetchNoteData();
//     }, [noteId]);

//     const handleExplainCode = async () => {
//         if (!fileContent) return;
//         setIsLoading(true);

//         try {
//             const response = await axios.post('/explain-code', { code: fileContent });
//             const explanation = response.data.explanation;

//             if (editorRef.current) {
//                 editorRef.current.insertText(explanation);
//             }
//         } catch (error) {
//             console.error('Error explaining code:', error);
//             if (editorRef.current) {
//                 editorRef.current.insertText('Failed to explain the code.');
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             {/* Top Row with Back Button */}
//             <div style={{ marginBottom: '10px' }}>
//                 <Button variant="subtle" onClick={() => navigate(-1)} style={{ position: 'absolute', top: 20, left: 20 }}>
//                     ← Back
//                 </Button>
//             </div>

//             {/* Container for Code Viewer and Rich Text Editor */}
//             <div style={{ display: 'flex', gap: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#F8F8FF' }}>

//                 {/* Code Viewer Section */}
//                 <div style={{ flex: 1, height: '95vh', overflowY: 'auto', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
//                     <h3>Viewing Code: {note ? note.name : 'Loading...'}</h3>
//                     {fileContent ? (
//                         <SyntaxHighlighter
//                             language="javascript"
//                             style={docco}
//                             customStyle={{
//                                 fontSize: '12px',
//                                 lineHeight: '1.2',
//                             }}
//                         >
//                             {fileContent}
//                         </SyntaxHighlighter>
//                     ) : (
//                         <p>Loading code content...</p>
//                     )}
//                 </div>

//                 {/* Rich Text Editor Section */}
//                 <div style={{ flex: 1 }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <h3>Explanation</h3>
//                         <button onClick={handleExplainCode} disabled={isLoading}>
//                             {isLoading ? 'Explaining...' : 'Explain Code'}
//                         </button>
//                     </div>
//                     <RichTextEditor ref={editorRef} noteId={noteId} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CodeNote;



import React, { useState, useEffect, useRef } from 'react';
//import { Button } from '@mantine/core';
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
            <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 100px)' }}>

                {/* Code Viewer Section */}
                <div style={{ flex: 1, height: '80vh', overflowY: 'auto', padding: '10px', border: '2px solid #91bfea', borderRadius: '8px', backgroundColor: '#F8F8FF' }}>
                    
                    {fileContent ? (
                        <SyntaxHighlighter
                            language="javascript"
                            style={docco}
                            customStyle={{
                                fontSize: '12px',
                                lineHeight: '1.2',
                            }}
                        >
                            {fileContent}
                        </SyntaxHighlighter>
                    ) : (
                        <p>Loading code content...</p>
                    )}
                </div>

                {/* Rich Text Editor Section */}
                <div style={{ flex: 1, height: '100%', overflowY: 'hidden' }}>
                    
                    <RichTextEditor ref={editorRef} noteId={noteId} />
                </div>
            </div>
        </div>
    );
};

export default CodeNote;


