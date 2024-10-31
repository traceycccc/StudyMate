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




// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import PDFViewer from '../components/PDFViewer';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import RichTextEditor from '../components/RichTextEditor';
// import { Container, Grid, Button } from '@mantine/core';
// import axios from 'axios';

// const DocuNote = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const pdfUrl = location.state?.pdfUrl;
//     const { noteId } = useParams();
//     const [note, setNote] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [pdfReady, setPdfReady] = useState(false);
//     const [isSummarizing, setIsSummarizing] = useState(false);
//     const editorRef = useRef();

//     useEffect(() => {
//         if (pdfUrl) {
//             setPdfReady(true);
//         } else {
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

//     // Function to handle PDF summarization
//     const handleSummarizePdf = async () => {
//         if (!pdfUrl) {
//             console.error('PDF URL is missing.');
//             return;
//         }

//         setIsSummarizing(true);

//         try {
//             // Fetch the PDF file as a Blob
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'document.pdf', { type: blob.type });

//             // Prepare FormData
//             const formData = new FormData();
//             formData.append('file', file);

//             // Send the PDF file to the backend for summarization
//             const { data } = await axios.post('http://localhost:3000/summarize-pdf', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             // Set the summary content in the editor
//             if (editorRef.current) {
//                 editorRef.current.setContent(data.summary);
//             }

//         } catch (error) {
//             console.error('Error summarizing the PDF:', error);
//         } finally {
//             setIsSummarizing(false);
//         }
//     };

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
//                     <Button
//                         onClick={handleSummarizePdf}
//                         loading={isSummarizing}
//                         disabled={isSummarizing}
//                         style={{ marginBottom: '10px' }}
//                     >
//                         Summarize PDF
//                     </Button>
//                     <RichTextEditor ref={editorRef} noteId={noteId} />
//                 </Grid.Col>
//             </Grid>
//         </Container>
//     );
// };

// export default DocuNote;




// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import PDFViewer from '../components/PDFViewer';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import RichTextEditor from '../components/RichTextEditor';
// import { Container, Grid, Button, Group } from '@mantine/core';
// import axios from 'axios';

// const DocuNote = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const pdfUrl = location.state?.pdfUrl;
//     const { noteId } = useParams();
//     const [note, setNote] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [pdfReady, setPdfReady] = useState(false);
//     const [isSummarizing, setIsSummarizing] = useState(false);
//     const editorRef = useRef();

//     useEffect(() => {
//         if (pdfUrl) {
//             setPdfReady(true);
//         } else {
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

//     // Function to handle PDF summarization
//     const handleSummarizePdf = async () => {
//         if (!pdfUrl) {
//             console.error('PDF URL is missing.');
//             return;
//         }

//         setIsSummarizing(true);

//         try {
//             // Fetch the PDF file as a Blob
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'document.pdf', { type: blob.type });

//             // Prepare FormData
//             const formData = new FormData();
//             formData.append('file', file);

//             // Send the PDF file to the backend for summarization
//             const { data } = await axios.post('/summarize-pdf', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             // Set the summary content in the editor
//             if (editorRef.current) {
//                 editorRef.current.insertText(data.summary);
//             }

//         } catch (error) {
//             console.error('Error summarizing the PDF:', error);
//         } finally {
//             setIsSummarizing(false);
//         }
//     };

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
//                     <Button
//                         onClick={handleSummarizePdf}
//                         loading={isSummarizing}
//                         disabled={isSummarizing}
//                         style={{ marginBottom: '10px' }}
//                     >
//                         Summarize PDF
//                     </Button>
//                     <RichTextEditor ref={editorRef} noteId={noteId} />
//                 </Grid.Col>
//             </Grid>
//         </Container>
//     );
// };

// export default DocuNote;




// //added key concept
// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import PDFViewer from '../components/PDFViewer';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import RichTextEditor from '../components/RichTextEditor';
// import { Container, Grid, Button, Group } from '@mantine/core';
// import axios from 'axios';

// const DocuNote = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const pdfUrl = location.state?.pdfUrl;
//     const { noteId } = useParams();
//     const [note, setNote] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [pdfReady, setPdfReady] = useState(false);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const editorRef = useRef();

//     useEffect(() => {
//         if (pdfUrl) {
//             setPdfReady(true);
//         } else {
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

//     const handleKeyConcepts = async () => {
//         if (!pdfUrl) {
//             console.error('PDF URL is missing.');
//             return;
//         }

//         setIsProcessing(true);

//         try {
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'document.pdf', { type: blob.type });

//             const formData = new FormData();
//             formData.append('file', file);

//             const { data } = await axios.post('http://localhost:3000/extract-key-concepts', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             if (editorRef.current) {
//                 editorRef.current.insertText(data.keyConcepts);
//             }

//         } catch (error) {
//             console.error('Error extracting key concepts from the PDF:', error);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     // Function to handle PDF summarization
//     const handleSummarizePdf = async () => {
//         if (!pdfUrl) {
//             console.error('PDF URL is missing.');
//             return;
//         }

//         setIsProcessing(true);

//         try {
//             // Fetch the PDF file as a Blob
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'document.pdf', { type: blob.type });

//             // Prepare FormData
//             const formData = new FormData();
//             formData.append('file', file);

//             // Send the PDF file to the backend for summarization
//             const { data } = await axios.post('/summarize-pdf', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             // Set the summary content in the editor
//             if (editorRef.current) {
//                 editorRef.current.insertText(data.summary);
//             }

//         } catch (error) {
//             console.error('Error summarizing the PDF:', error);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

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
//                     <Group style={{ marginBottom: '10px' }}>
//                         <Button
//                             onClick={handleSummarizePdf}
//                             loading={isProcessing}
//                             disabled={isProcessing}
//                         >
//                             Summarize PDF
//                         </Button>
//                         <Button
//                             onClick={handleKeyConcepts}
//                             loading={isProcessing}
//                             disabled={isProcessing}
//                         >
//                             Extract Key Concepts
//                         </Button>
//                     </Group>
//                     <RichTextEditor ref={editorRef} noteId={noteId} />
//                 </Grid.Col>
//             </Grid>
//         </Container>
//     );
// };

// export default DocuNote;



//add contextual q&A

// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import PDFViewer from '../components/PDFViewer';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import RichTextEditor from '../components/RichTextEditor';
// import { Container, Grid, Button, Group, Modal, TextInput } from '@mantine/core';
// import axios from 'axios';

// const DocuNote = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const pdfUrl = location.state?.pdfUrl;
//     const { noteId, moduleId } = useParams();
//     const [note, setNote] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [pdfReady, setPdfReady] = useState(false);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [qaModalOpen, setQaModalOpen] = useState(false);
//     const [userPrompt, setUserPrompt] = useState('');
//     const editorRef = useRef();

//     useEffect(() => {
//         if (pdfUrl) {
//             setPdfReady(true);
//         } else {
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

//     const handleContextualQA = async () => {
//         if (!pdfUrl || !userPrompt) {
//             console.error('PDF URL or user prompt is missing.');
//             return;
//         }

//         setIsProcessing(true);

//         try {
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'document.pdf', { type: blob.type });

//             const formData = new FormData();
//             formData.append('file', file);
//             formData.append('prompt', userPrompt);

//             const { data } = await axios.post('http://localhost:5000/contextual-qa', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             if (editorRef.current) {
//                 editorRef.current.insertText(data.answer);
//             }
//         } catch (error) {
//             console.error('Error processing contextual Q&A:', error);
//         } finally {
//             setIsProcessing(false);
//             setQaModalOpen(false);
//             setUserPrompt('');
//         }
//     };

//     const handleKeyConcepts = async () => {
//         if (!pdfUrl) {
//             console.error('PDF URL is missing.');
//             return;
//         }

//         setIsProcessing(true);

//         try {
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'document.pdf', { type: blob.type });

//             const formData = new FormData();
//             formData.append('file', file);

//             const { data } = await axios.post('/extract-key-concepts', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             if (editorRef.current) {
//                 editorRef.current.insertText(data.keyConcepts);
//             }

//         } catch (error) {
//             console.error('Error extracting key concepts from the PDF:', error);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     // Function to handle PDF summarization
//     const handleSummarizePdf = async () => {
//         if (!pdfUrl) {
//             console.error('PDF URL is missing.');
//             return;
//         }

//         setIsProcessing(true);

//         try {
//             // Fetch the PDF file as a Blob
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'document.pdf', { type: blob.type });

//             // Prepare FormData
//             const formData = new FormData();
//             formData.append('file', file);

//             // Send the PDF file to the backend for summarization
//             const { data } = await axios.post('/summarize-pdf', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             // Set the summary content in the editor
//             if (editorRef.current) {
//                 editorRef.current.insertText(data.summary);
//             }

//         } catch (error) {
//             console.error('Error summarizing the PDF:', error);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (!note) return <div>Note not found</div>;

//     return (
//         <Container fluid style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={() => navigate(`/modules/${moduleId}/overview`)}>
//                 ← Back
//             </Button>
//             <Grid style={{ height: '90vh' }}>
//                 <Grid.Col span={6} style={{ overflow: 'hidden' }}>
//                     {pdfReady ? (
//                         <PDFViewer pdfUrl={pdfUrl} />
//                     ) : (
//                         <p>Loading PDF...</p>
//                     )}
//                 </Grid.Col>
//                 <Grid.Col span={6} style={{ overflowY: 'auto', paddingLeft: '20px' }}>
//                     <Group style={{ marginBottom: '10px' }}>
//                         <Button
//                             onClick={handleSummarizePdf}
//                             loading={isProcessing}
//                             disabled={isProcessing}
//                         >
//                             Summarize PDF
//                         </Button>
//                         <Button
//                             onClick={handleKeyConcepts}
//                             loading={isProcessing}
//                             disabled={isProcessing}
//                         >
//                             Extract Key Concepts
//                         </Button>
//                         <Button
//                             onClick={() => setQaModalOpen(true)}
//                             loading={isProcessing}
//                             disabled={isProcessing}
//                         >
//                             Contextual Q&A
//                         </Button>
//                     </Group>
//                     <RichTextEditor ref={editorRef} noteId={noteId} />
//                 </Grid.Col>
//             </Grid>

//             {/* Modal for user input */}
//             <Modal
//                 opened={qaModalOpen}
//                 onClose={() => setQaModalOpen(false)}
//                 title="Enter your question about the PDF"
//             >
//                 <TextInput
//                     value={userPrompt}
//                     onChange={(event) => setUserPrompt(event.currentTarget.value)}
//                     placeholder="Ask a question about the PDF content"
//                 />
//                 <Button onClick={handleContextualQA} disabled={isProcessing}>
//                     Submit
//                 </Button>
//             </Modal>
//         </Container>
//     );
// };

// export default DocuNote;




//addng the generate flashcards button
// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import PDFViewer from '../components/PDFViewer';
// import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';
// import RichTextEditor from '../components/RichTextEditor';
// import { Container, Grid, Button, Group, Modal, TextInput } from '@mantine/core';
// import axios from 'axios';

// const DocuNote = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const pdfUrl = location.state?.pdfUrl;
//     const { noteId, moduleId } = useParams();
//     const [note, setNote] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [pdfReady, setPdfReady] = useState(false);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [qaModalOpen, setQaModalOpen] = useState(false);
//     const [userPrompt, setUserPrompt] = useState('');
//     const editorRef = useRef();
//     const [newTagNameError, setNewTagNameError] = useState('');
//     const [selectedTagError, setSelectedTagError] = useState('');



//     const [flashcardModalOpen, setFlashcardModalOpen] = useState(false);
//     const [selectedTag, setSelectedTag] = useState('');
//     const [newTagName, setNewTagName] = useState('');
//     const [tags, setTags] = useState([]);

//     useEffect(() => {
//         if (pdfUrl) {
//             setPdfReady(true);
//         } else {
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

//     const fetchTags = async () => {
//         try {
//             const tagsRef = collection(firestore, 'tags');
//             const tagsSnapshot = await getDocs(tagsRef);
//             const tagsData = tagsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//             return tagsData;
//         } catch (error) {
//             console.error("Error fetching tags:", error);
//             return [];
//         }
//     };


//     // Helper function to clean the GPT response
//     const cleanJSONResponse = (response) => {
//         // Remove any extraneous backticks and "```json" markers if present
//         const cleanedResponse = response.replace(/```json/g, '').replace(/```/g, '');
//         return cleanedResponse;


//     };

//     // const validateTagInputs = () => {
//     //     if (newTagName && selectedTag) {
//     //         alert("Please fill only one field: either select an existing tag or create a new one.");
//     //         return false;
//     //     }
//     //     if (!newTagName && !selectedTag) {
//     //         alert("Please select a tag or enter a new tag name.");
//     //         return false;
//     //     }
//     //     if (newTagName && tags.some(tag => tag.name === newTagName)) {
//     //         alert("This tag name already exists. Please enter a unique name.");
//     //         return false;
//     //     }
//     //     return true;
//     // };

//     // const validateTagInputs = () => {
//     //     setTagError(''); // Reset errors before validation

//     //     if (newTagName && selectedTag) {
//     //         setTagError("Please fill only one field: either select an existing tag or create a new one.");
//     //         return false;
//     //     }
//     //     if (!newTagName && !selectedTag) {
//     //         setTagError("Please select a tag or enter a new tag name.");
//     //         return false;
//     //     }
//     //     if (newTagName && tags.some(tag => tag.name === newTagName)) {
//     //         setTagError("This tag name already exists. Please enter a unique name.");
//     //         return false;
//     //     }
//     //     return true;
//     // };


//     const validateTagInputs = () => {
//         let isValid = true;
//         setNewTagNameError('');
//         setSelectedTagError('');

//         if (newTagName && selectedTag) {
//             setNewTagNameError("Please fill only one field: either select an existing tag or create a new one.");
//             setSelectedTagError("Please fill only one field: either select an existing tag or create a new one.");
//             isValid = false;
//         }
//         if (!newTagName && !selectedTag) {
//             setNewTagNameError("Please select a tag or enter a new tag name.");
//             setSelectedTagError("Please select a tag or enter a new tag name.");
//             isValid = false;
//         }
//         if (newTagName && tags.some(tag => tag.name === newTagName)) {
//             setNewTagNameError("This tag name already exists. Please enter a unique name.");
//             isValid = false;
//         }
//         return isValid;
//     };





//     // const handleGenerateFlashcards = async () => {
//     //     // if (!selectedTag && !newTagName) {
//     //     //     console.error("No tag selected or entered.");
//     //     //     return;
//     //     // }

//     //     // Validate inputs
//     //     if (!validateTagInputs()) return;

//     //     setIsProcessing(true);

//     //     try {
//     //         // Fetch the PDF file as a Blob
//     //         const response = await fetch(pdfUrl);
//     //         const blob = await response.blob();
//     //         const file = new File([blob], 'document.pdf', { type: blob.type });

//     //         const formData = new FormData();
//     //         formData.append('file', file);

//     //         // Send the PDF to the backend to generate flashcards
//     //         const { data } = await axios.post('http://localhost:5000/generate-flashcards', formData, {
//     //             headers: { 'Content-Type': 'multipart/form-data' },
//     //         });

            

//     //         // Clean and parse the GPT response
//     //         const cleanedData = cleanJSONResponse(data.flashcards);
//     //         console.log("Cleaned flashcard data:", cleanedData);

//     //         const flashcards = JSON.parse(cleanedData);
//     //         console.log("Parsed flashcards:", flashcards);

//     //         // // Convert flashcards to HTML and save each to Firestore
//     //         // flashcards.forEach(async (flashcard) => {
//     //         //     const questionHTML = `<p>${flashcard.question}</p>`;
//     //         //     const answerHTML = `<p>${flashcard.answer}</p>`;

//     //         //     const flashcardData = {
//     //         //         question: questionHTML,
//     //         //         answer: answerHTML,
//     //         //         tagId: selectedTag || newTagName,
//     //         //         createdAt: new Date(),
//     //         //         userId: auth.currentUser?.uid,
//     //         //         completed: false,
//     //         //     };

//     //         //     await addDoc(collection(firestore, 'flashcards'), flashcardData);
//     //         // });

//     //         // Convert flashcards to HTML and save each to Firestore
//     //         const flashcardPromises = flashcards.map(async (flashcard) => {
//     //             const questionHTML = `<p>${flashcard.question}</p>`;
//     //             const answerHTML = `<p>${flashcard.answer}</p>`;

//     //             const flashcardData = {
//     //                 question: questionHTML,
//     //                 answer: answerHTML,
//     //                 tagId: selectedTag || newTagName,
//     //                 createdAt: new Date(),
//     //                 userId: auth.currentUser?.uid,
//     //                 completed: false,
//     //             };

//     //             return addDoc(collection(firestore, 'flashcards'), flashcardData);
//     //         });

//     //         // Wait until all flashcards are saved
//     //         await Promise.all(flashcardPromises);

//     //         // If new tag is provided, add it to Firestore
//     //         if (newTagName) {
//     //             const newTag = {
//     //                 name: newTagName,
//     //                 color: '#' + ((1 << 24) * Math.random() | 0).toString(16), // Random color
//     //                 moduleId,
//     //                 userId: auth.currentUser?.uid,
//     //             };
//     //             await addDoc(collection(firestore, 'tags'), newTag);
//     //             console.log("New tag created:", newTag);
//     //         }

//     //         console.log("Flashcards generated and saved successfully.");
//     //         setFlashcardModalOpen(false); // Close modal on success
//     //     } catch (error) {
//     //         console.error('Error generating flashcards:', error);
//     //     } finally {
//     //         setIsProcessing(false);
//     //     }
//     // };


//     const handleGenerateFlashcards = async () => {
//         // Validate inputs
//         if (!validateTagInputs()) return;

//         setIsProcessing(true);

//         try {
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'document.pdf', { type: blob.type });

//             const formData = new FormData();
//             formData.append('file', file);

//             const { data } = await axios.post('http://localhost:5000/generate-flashcards', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             // Clean and parse the GPT response
//             const cleanedData = cleanJSONResponse(data.flashcards);
//             const flashcards = JSON.parse(cleanedData);

//             // Determine tag ID
//             let tagId = selectedTag; // Use selected tag ID if available

//             // If creating a new tag, save it first and get its ID
//             if (newTagName) {
//                 const newTag = {
//                     name: newTagName,
//                     color: '#' + ((1 << 24) * Math.random() | 0).toString(16), // Random color
//                     moduleId,
//                     userId: auth.currentUser?.uid,
//                 };
//                 const newTagRef = await addDoc(collection(firestore, 'tags'), newTag);
//                 tagId = newTagRef.id;  // Set tagId to the new tag's document ID
//                 console.log("New tag created with ID:", tagId);
//             }

//             // Convert flashcards to HTML and save each to Firestore with tagId
//             const flashcardPromises = flashcards.map(async (flashcard) => {
//                 const questionHTML = `<p>${flashcard.question}</p>`;
//                 const answerHTML = `<p>${flashcard.answer}</p>`;

//                 const flashcardData = {
//                     question: questionHTML,
//                     answer: answerHTML,
//                     tagId: tagId,  // Use the correct tag ID here
//                     createdAt: new Date(),
//                     userId: auth.currentUser?.uid,
//                     completed: false,
//                 };

//                 return addDoc(collection(firestore, 'flashcards'), flashcardData);
//             });

//             // Wait until all flashcards are saved
//             await Promise.all(flashcardPromises);

//             console.log("Flashcards generated and saved successfully with tag ID:", tagId);
//             setFlashcardModalOpen(false); // Close modal on success
//         } catch (error) {
//             console.error('Error generating flashcards:', error);
//         } finally {
//             setIsProcessing(false);
//         }
//     };






//     const handleOpenFlashcardModal = async () => {
//         // Fetch tags from Firestore or another source
//         const fetchedTags = await fetchTags(); // Assuming fetchTags is a function that fetches tags
//         setTags(fetchedTags);
//         setFlashcardModalOpen(true);
//     };

//     const handleContextualQA = async () => {
//         if (!pdfUrl || !userPrompt) {
//             console.error('PDF URL or user prompt is missing.');
//             return;
//         }

//         setIsProcessing(true);

//         try {
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'document.pdf', { type: blob.type });

//             const formData = new FormData();
//             formData.append('file', file);
//             formData.append('prompt', userPrompt);

//             const { data } = await axios.post('http://localhost:5000/contextual-qa', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             if (editorRef.current) {
//                 editorRef.current.insertText(data.answer);
//             }
//         } catch (error) {
//             console.error('Error processing contextual Q&A:', error);
//         } finally {
//             setIsProcessing(false);
//             setQaModalOpen(false);
//             setUserPrompt('');
//         }
//     };

//     const handleKeyConcepts = async () => {
//         if (!pdfUrl) {
//             console.error('PDF URL is missing.');
//             return;
//         }

//         setIsProcessing(true);

//         try {
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'document.pdf', { type: blob.type });

//             const formData = new FormData();
//             formData.append('file', file);

//             const { data } = await axios.post('/extract-key-concepts', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             if (editorRef.current) {
//                 editorRef.current.insertText(data.keyConcepts);
//             }

//         } catch (error) {
//             console.error('Error extracting key concepts from the PDF:', error);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     // Function to handle PDF summarization
//     const handleSummarizePdf = async () => {
//         if (!pdfUrl) {
//             console.error('PDF URL is missing.');
//             return;
//         }

//         setIsProcessing(true);

//         try {
//             // Fetch the PDF file as a Blob
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const file = new File([blob], 'document.pdf', { type: blob.type });

//             // Prepare FormData
//             const formData = new FormData();
//             formData.append('file', file);

//             // Send the PDF file to the backend for summarization
//             const { data } = await axios.post('/summarize-pdf', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             // Set the summary content in the editor
//             if (editorRef.current) {
//                 editorRef.current.insertText(data.summary);
//             }

//         } catch (error) {
//             console.error('Error summarizing the PDF:', error);
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (!note) return <div>Note not found</div>;

//     return (
//         <Container fluid style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={() => navigate(`/modules/${moduleId}/overview`)}>
//                 ← Back
//             </Button>
//             <Grid style={{ height: '90vh' }}>
//                 <Grid.Col span={6} style={{ overflow: 'hidden' }}>
//                     {pdfReady ? (
//                         <PDFViewer pdfUrl={pdfUrl} />
//                     ) : (
//                         <p>Loading PDF...</p>
//                     )}
//                 </Grid.Col>
//                 <Grid.Col span={6} style={{ overflowY: 'auto', paddingLeft: '20px' }}>
//                     <Group style={{ marginBottom: '10px' }}>
//                         <Button
//                             onClick={handleSummarizePdf}
//                             loading={isProcessing}
//                             disabled={isProcessing}
//                         >
//                             Summarize PDF
//                         </Button>
//                         <Button
//                             onClick={handleKeyConcepts}
//                             loading={isProcessing}
//                             disabled={isProcessing}
//                         >
//                             Extract Key Concepts
//                         </Button>
//                         <Button
//                             onClick={() => setQaModalOpen(true)}
//                             loading={isProcessing}
//                             disabled={isProcessing}
//                         >
//                             Contextual Q&A
//                         </Button>
//                         <Button
//                             onClick={handleOpenFlashcardModal}  // Open flashcard modal on click
//                             loading={isProcessing}
//                             disabled={isProcessing}
//                         >
//                             Generate Flashcards
//                         </Button>
//                     </Group>
//                     <RichTextEditor ref={editorRef} noteId={noteId} />
//                 </Grid.Col>
//             </Grid>

//             {/* Modal for user input for Contextual Q&A */}
//             <Modal
//                 opened={qaModalOpen}
//                 onClose={() => setQaModalOpen(false)}
//                 title="Enter your question about the PDF"
//             >
//                 <TextInput
//                     value={userPrompt}
//                     onChange={(event) => setUserPrompt(event.currentTarget.value)}
//                     placeholder="Ask a question about the PDF content"
//                 />
//                 <Button onClick={handleContextualQA} disabled={isProcessing}>
//                     Submit
//                 </Button>
//             </Modal>

//             {/* Modal for generating flashcards */}
//             <Modal
//                 opened={flashcardModalOpen}
//                 onClose={() => setFlashcardModalOpen(false)}
//                 title="Generate Flashcards"
//             >
//                 <div>
//                     <TextInput
//                         label="Select or Create Tag"
//                         placeholder="Select an existing tag or enter a new one"
//                         value={newTagName}
//                         onChange={(event) => {
//                             setNewTagName(event.currentTarget.value);
//                             setNewTagNameError(''); // Clear any existing error
//                             setSelectedTag(''); // Ensure only one field is filled
//                         }}
//                         error={newTagNameError} // Display error message for new tag name
//                     />
//                     <select
//                         value={selectedTag}
//                         onChange={(e) => setSelectedTag(e.target.value)}
//                         style={{ width: '100%', marginTop: '10px', padding: '8px' }}
//                     >
//                         <option value="">Select Tag</option>
//                         {tags.map((tag) => (
//                             <option key={tag.id} value={tag.id}>
//                                 {tag.name}
//                             </option>
//                         ))}
//                     </select>
//                     <Button
//                         onClick={() => handleGenerateFlashcards()}  // This function will be added later for flashcard generation logic
//                         style={{ marginTop: '15px' }}
//                         disabled={!selectedTag && !newTagName}
//                     >
//                         Generate
//                     </Button>
//                 </div>
//             </Modal>

//         </Container>
//     );
// };

// export default DocuNote;




//change style of the select tag

import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PDFViewer from '../components/PDFViewer';
import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import RichTextEditor from '../components/RichTextEditor';
import { Container, Grid, Button, Group, Modal, TextInput } from '@mantine/core';
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

        //since one will reset on its own, no need this validation
        // if (newTagName && selectedTag) {
        //     setNewTagNameError("Please fill only one field: either select an existing tag or create a new one.");
        //     setSelectedTagError("Please fill only one field: either select an existing tag or create a new one.");
        //     isValid = false;
        // }
        
        //since the genertae button is disabled when no one is filled, no need as well
        // if (!newTagName && !selectedTag) {
        //     setNewTagNameError("Please select a tag or enter a new tag name.");
        //     setSelectedTagError("Please select a tag or enter a new tag name.");
        //     isValid = false;
        // }
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
        <Container fluid style={{ padding: '20px' }}>
            <Button variant="subtle" onClick={() => navigate(`/modules/${moduleId}/overview`)}>
                ← Back
            </Button>
            <Grid style={{ height: '90vh' }}>
                <Grid.Col span={6} style={{ overflow: 'hidden' }}>
                    {pdfReady ? (
                        <PDFViewer pdfUrl={pdfUrl} />
                    ) : (
                        <p>Loading PDF...</p>
                    )}
                </Grid.Col>
                <Grid.Col span={6} style={{ overflowY: 'auto', paddingLeft: '20px' }}>
                    <Group style={{ marginBottom: '10px' }}>
                        <Button
                            onClick={handleSummarizePdf}
                            loading={isProcessing}
                            disabled={isProcessing}
                        >
                            Summarize PDF
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
                    </Group>
                    <RichTextEditor ref={editorRef} noteId={noteId} />
                </Grid.Col>
            </Grid>

            {/* Modal for user input for Contextual Q&A */}
            <Modal
                opened={qaModalOpen}
                onClose={() => setQaModalOpen(false)}
                title="Enter your question about the PDF"
            >
                <TextInput
                    value={userPrompt}
                    onChange={(event) => setUserPrompt(event.currentTarget.value)}
                    placeholder="Ask a question about the PDF content"
                />
                <Button onClick={handleContextualQA} disabled={isProcessing}>
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


