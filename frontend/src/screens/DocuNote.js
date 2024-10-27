// // DocuNote.js
// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import PDFViewer from './PDFViewer';
// import RichTextEditor from './RichTextEditor';
// import { Container, Grid } from '@mantine/core';

// const DocuNote = () => {
//     const { pdfUrl } = useLocation().state;
//     const [pdfReady, setPdfReady] = useState(false);

//     useEffect(() => {
//         if (pdfUrl) {
//             setPdfReady(true);
//         }
//     }, [pdfUrl]);

//     return (
//         <Container fluid style={{ padding: '20px' }}>
//             <Grid style={{ height: '90vh' }}>
//                 <Grid.Col span={6} style={{ overflow: 'hidden' }}>
//                     {pdfReady ? (
//                         <PDFViewer pdfUrl={pdfUrl} />
//                     ) : (
//                         <p>Loading PDF...</p>
//                     )}
//                 </Grid.Col>
//                 <Grid.Col span={6} style={{ overflowY: 'auto', paddingLeft: '20px' }}>
//                     <RichTextEditor />
//                 </Grid.Col>
//             </Grid>
//         </Container>
//     );
// };

// export default DocuNote;



//DocuNote.js
// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import PDFViewer from '../components/PDFViewer';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import RichTextEditor from '../components/RichTextEditor';
// import { Container, Grid } from '@mantine/core';

// const DocuNote = () => {
    
//     const location = useLocation();
//     const navigate = useNavigate();
//     const pdfUrl = location.state?.pdfUrl;
//     const [pdfReady, setPdfReady] = useState(false);
//     const { noteId } = useParams();
//     const [note, setNote] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const editorRef = useRef();

//     useEffect(() => {
//         if (pdfUrl) {
//             setPdfReady(true);
//         } else {
//             // Navigate back if pdfUrl is not present
//             console.error('PDF URL is missing. Redirecting back to the selection page.');
//             navigate('/modules'); // Adjust the path based on your module's route
//         }
//     }, [pdfUrl, navigate]);

//     // Fetch the note data
//     useEffect(() => {
//         const fetchNote = async () => {
//             if (noteId) {
//                 try {
//                     const noteRef = doc(firestore, 'notes', noteId);
//                     const noteSnap = await getDoc(noteRef);
//                     if (noteSnap.exists()) {
//                         setNote(noteSnap.data());
//                     }
//                 } catch (error) {
//                     console.error('Error fetching note:', error);
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };

//         fetchNote();
//     }, [noteId]);

//     if (loading) return <div>Loading...</div>;
//     if (!note) return <div>Note not found</div>;

//     return (
//         <Container fluid style={{ padding: '20px' }}>
//             <Grid style={{ height: '90vh' }}>
//                 <Grid.Col span={6} style={{ overflow: 'hidden' }}>
//                     {pdfReady ? (
//                         <PDFViewer pdfUrl={pdfUrl} />
//                     ) : (
//                         <p>Loading PDF...</p>
//                     )}
//                 </Grid.Col>
//                 <Grid.Col span={6} style={{ overflowY: 'auto', paddingLeft: '20px' }}>
//                     <RichTextEditor ref={editorRef} noteId={noteId} />
//                 </Grid.Col>
//             </Grid>
//         </Container>
//     );
// };

// export default DocuNote;



// //adding the LLM -summary first
// // DocuNote.js
// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import PDFViewer from '../components/PDFViewer';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import RichTextEditor from '../components/RichTextEditor';
// import { Container, Grid, Button } from '@mantine/core';
// import axios from 'axios';

// const DocuNote = () => {
    
//     const navigate = useNavigate();
//     const { pdfUrl } = useLocation().state;
//     const [pdfReady, setPdfReady] = useState(false);
//     const { noteId } = useParams();
//     const [note, setNote] = useState(null);
//     const [summary, setSummary] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const editorRef = useRef();

//     useEffect(() => {
//         if (pdfUrl) {
//             setPdfReady(true);
//         } else {
//             // Navigate back if pdfUrl is not present
//             console.error('PDF URL is missing. Redirecting back to the selection page.');
//             navigate('/modules'); // Adjust the path based on your module's route
//         }
//     }, [pdfUrl, navigate]);

//     // Fetch the note data
//     useEffect(() => {
//         const fetchNote = async () => {
//             if (noteId) {
//                 try {
//                     const noteRef = doc(firestore, 'notes', noteId);
//                     const noteSnap = await getDoc(noteRef);
//                     if (noteSnap.exists()) {
//                         setNote(noteSnap.data());
//                     }
//                 } catch (error) {
//                     console.error('Error fetching note:', error);
//                 } finally {
//                     setIsLoading(false);
//                 }
//             }
//         };

//         fetchNote();
//     }, [noteId]);

//     if (isLoading) return <div>Loading...</div>;
//     if (!note) return <div>Note not found</div>;


//     const handleSummarize = async () => {
//         setIsLoading(true);
//         try {
//             const pdfResponse = await axios.get(pdfUrl, { responseType: 'arraybuffer' });
//             const pdfBlob = new Blob([pdfResponse.data], { type: 'application/pdf' });
//             const fileName = new URL(pdfUrl).pathname.split('/').pop();
//             const formData = new FormData();
//             formData.append('file', pdfBlob, fileName);

//             const response = await axios.post('http://localhost:5000/summarize-pdf', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });

//             setSummary(response.data.summary);
//         } catch (error) {
//             console.error('Error summarizing PDF:', error);
//             setSummary('Failed to generate summary.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Placeholder functions for the other buttons
//     const handleExtractKeyConcepts = async () => {
//         // Implement similar logic to handleSummarize with different endpoint and GPT prompt
//     };

//     const handleGenerateFlashcards = async () => {
//         // Implement similar logic to handleSummarize with different endpoint and GPT prompt
//     };

//     return (
//         <Container fluid style={{ padding: '20px' }}>
//             <Grid style={{ height: '90vh' }}>
//                 <Grid.Col span={6} style={{ overflow: 'hidden' }}>
//                     {pdfReady ? (
//                         <PDFViewer pdfUrl={pdfUrl} />
//                     ) : (
//                         <p>Loading PDF...</p>
//                     )}
//                 </Grid.Col>
//                 <Grid.Col span={6} style={{ overflowY: 'auto', paddingLeft: '20px' }}>
                    
//                     <Button
//                         style={{ margin: '10px 0' }}
//                         onClick={handleSummarize}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? 'Summarizing...' : 'Summarize PDF'}
//                     </Button>
//                     <Button
//                         style={{ margin: '10px 0' }}
//                         onClick={handleExtractKeyConcepts}
//                         disabled={isLoading}
//                     >
//                         Extract Key Concepts
//                     </Button>
//                     <Button
//                         style={{ margin: '10px 0' }}
//                         onClick={handleGenerateFlashcards}
//                         disabled={isLoading}
//                     >
//                         Generate Flashcards
//                     </Button>
//                     {summary && (
//                         <div style={{ marginTop: '20px' }}>
//                             <h3>Summary:</h3>
//                             <p>{summary}</p>
//                         </div>
//                     )}
//                     <RichTextEditor ref={editorRef} noteId={noteId} />
//                 </Grid.Col>
//             </Grid>
//         </Container>
//     );
// };

// export default DocuNote;





//redo again
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PDFViewer from '../components/PDFViewer';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import RichTextEditor from '../components/RichTextEditor';
import { Container, Grid } from '@mantine/core';

const DocuNote = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const pdfUrl = location.state?.pdfUrl;
    const [pdfReady, setPdfReady] = useState(false);
    const { noteId } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const editorRef = useRef();

    useEffect(() => {
        if (pdfUrl) {
            setPdfReady(true);
        } else {
            // Navigate back if pdfUrl is not present
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

    if (loading) return <div>Loading...</div>;
    if (!note) return <div>Note not found</div>;

    return (
        <Container fluid style={{ padding: '20px' }}>
            <Grid style={{ height: '90vh' }}>
                <Grid.Col span={6} style={{ overflow: 'hidden' }}>
                    {pdfReady ? (
                        <PDFViewer pdfUrl={pdfUrl} />
                    ) : (
                        <p>Loading PDF...</p>
                    )}
                </Grid.Col>
                <Grid.Col span={6} style={{ overflowY: 'auto', paddingLeft: '20px' }}>
                    <RichTextEditor ref={editorRef} noteId={noteId} />
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default DocuNote;
