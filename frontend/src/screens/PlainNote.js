import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import RichTextEditor from '../components/RichTextEditor';
import { IconArrowLeft } from '@tabler/icons-react';

const PlainNote = () => {
    const navigate = useNavigate();
    const { moduleId, sectionId, noteId } = useParams(); // Extract noteId from the URL
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const editorRef = useRef(); // Create a ref to hold the editor instance

    // Fetch the note data
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


    if (loading) return <div>Loading...</div>;
    if (!note) return <div>Note not found</div>;

    return (
        <div>
            
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


            </div>

            <div style={{ flex: 1, }}>

                <RichTextEditor ref={editorRef} noteId={noteId} customHeight="65vh" />
            </div>
        </div>
    );
};

export default PlainNote;



