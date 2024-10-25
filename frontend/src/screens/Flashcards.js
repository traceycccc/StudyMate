import React from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Flashcard = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px' }}>
            {/* Back button to navigate back to the ModuleOverview page */}
            <Button variant="subtle" onClick={() => navigate(-1)}>
                ← Back
            </Button>

            <h1>Flashcards</h1> {/* Title of the Flashcard page */}

            {/* You can add more content or logic here for displaying flashcards */}
        </div>
    );
};

export default Flashcard;
