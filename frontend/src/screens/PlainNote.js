// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import RichTextEditor from '../components/RichTextEditor';

// const PlainNote = () => {
//     const { noteId } = useParams(); // Extract noteId from the URL
//     const [note, setNote] = useState(null);
//     const [loading, setLoading] = useState(true);

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
//         <div>
//             <h1>{note.name}</h1>
//             {/* Render the RichTextEditor component with the noteId prop */}
//             <RichTextEditor noteId={noteId} />
//         </div>
//     );
// };

// export default PlainNote;





//temporrary test button to insert text
// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import RichTextEditor from '../components/RichTextEditor';
// import { Button } from '@mantine/core';

// const PlainNote = () => {
//     const { noteId } = useParams(); // Extract noteId from the URL
//     const [note, setNote] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const editorRef = useRef(); // Create a ref to hold the editor instance

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

//     const handleInsertText = () => {
//         if (editorRef.current) {
//             editorRef.current.insertText("Testing PlainNote: This is a temporary note for testing PDF + note and Code + note.");
//         }
//     };

//     const handleInsertSummary = () => {
//         if (editorRef.current) {
//             const summaryText = "This PDF is talking about mammals, and how they live in the tropical forest.";
//             const tableOfContents = `
//             Table of Contents:
//             - Introduction to Mammals
//             - Habitat and Lifestyle
//             - Importance in Ecosystems
//             `;
//             editorRef.current.insertText(`${summaryText}\n\n${tableOfContents}`);
//         }
//     };

//     const handleInsertKeyConcepts = () => {
//         if (editorRef.current) {
//             const keyConcepts = `
//             1. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.
//             2. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.
//             3. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.
//             `;
//             editorRef.current.insertText(keyConcepts);
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (!note) return <div>Note not found</div>;

//     return (
//         <div>
//             <h1>{note.name}</h1>
//             <Button onClick={handleInsertText} mb="md">Insert Test Text</Button>
//             <Button onClick={handleInsertSummary} mb="md">Insert Summary</Button>
//             <Button onClick={handleInsertKeyConcepts} mb="md">Insert Key Concepts</Button>
//             {/* Render the RichTextEditor component with the noteId prop and the ref */}
//             <RichTextEditor ref={editorRef} noteId={noteId} />
//         </div>
//     );
// };

// export default PlainNote;





// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';
// import RichTextEditor from '../components/RichTextEditor';
// import { Button } from '@mantine/core';

// const PlainNote = () => {
//     const { noteId } = useParams(); // Extract noteId from the URL
//     const [note, setNote] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const editorRef = useRef(); // Create a ref to hold the editor instance

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

//     const handleInsertText = () => {
//         if (editorRef.current) {
//             // Insert test text as bullet points
//             const points = [
//                 "1. Introduction",
//                 "2. Overview of the PDF",
//                 "3. Key Concepts",
//                 "4. Applications",
//                 "5. Conclusion",
//             ];
//             const formattedText = points.map(point => `<p>${point}</p>`).join('');
//             // Use the insertText method from the ref
//             //editorRef.current.insertText(formattedText);
//             editorRef.current.editor.commands.insertContent(formattedText); // Use insertContent instead
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (!note) return <div>Note not found</div>;

//     return (
//         <div>
//             <h1>{note.name}</h1>
//             <Button onClick={handleInsertText} mb="md">Insert Test Points</Button>
//             {/* Render the RichTextEditor component with the noteId prop and the ref */}
//             <RichTextEditor ref={editorRef} noteId={noteId} />
//         </div>
//     );
// };

// export default PlainNote;




import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import RichTextEditor from '../components/RichTextEditor';
import { Button } from '@mantine/core';

const PlainNote = () => {
    const { noteId } = useParams(); // Extract noteId from the URL
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const editorRef = useRef(); // Create a ref to hold the editor instance

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

    const handleInsertText = () => {
        if (editorRef.current) {
            // Insert test text as bullet points
            const points = [
                "1. Introduction",
                "2. Overview of the PDF",
                "3. Key Concepts",
                "4. Applications",
                "5. Conclusion",
            ];
            // const formattedText = points.map(point => `<p>${point}</p>`).join('');
            // // Use the insertText method from the ref
            // //editorRef.current.insertText(formattedText);
            // editorRef.current.editor.commands.insertContent(formattedText); // Use insertContent instead

            const formattedText = points.join('</p><p>'); // Use line breaks between points
            editorRef.current.insertText(formattedText); // Call the insertText method from the ref
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!note) return <div>Note not found</div>;

    return (
        <div>
            <h1>{note.name}</h1>
            <Button onClick={handleInsertText} mb="md">Insert Test Points</Button>
            {/* Render the RichTextEditor component with the noteId prop and the ref */}
            <RichTextEditor ref={editorRef} noteId={noteId} />
        </div>
    );
};

export default PlainNote;



