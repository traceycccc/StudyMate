import React from 'react';
import RichTextEditor from '../components/RichTextEditor';
import { useLocation, useParams } from 'react-router-dom';

const NotePage = () => {
    const { noteId } = useParams(); // Get the note ID from the URL
    const location = useLocation();
    const noteName = location.state?.noteName || 'Note';

    return (
        <div style={{ padding: '20px' }}>
            <h1>{noteName}</h1>
            <RichTextEditor noteId={noteId} />
        </div>
    );
};

export default NotePage;
