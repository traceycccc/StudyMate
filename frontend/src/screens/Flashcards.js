// import React from 'react';
// import { Button } from '@mantine/core';
// import { useNavigate } from 'react-router-dom';

// const Flashcard = () => {
//     const navigate = useNavigate();

//     return (
//         <div style={{ padding: '20px' }}>
//             {/* Back button to navigate back to the ModuleOverview page */}
//             <Button variant="subtle" onClick={() => navigate(-1)}>
//                 ← Back
//             </Button>

//             <h1>Flashcards</h1> {/* Title of the Flashcard page */}

//             {/* You can add more content or logic here for displaying flashcards */}
//         </div>
//     );
// };

// export default Flashcard;



// import React from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button } from '@mantine/core';

// const Flashcards = () => {
//     const { moduleId } = useParams(); // Get the module ID from the route
//     const navigate = useNavigate(); // Initialize navigate
//     const location = useLocation(); // Access the current location's state

//     // Determine where the user came from
//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>
//             <h1>Flashcards for Module {moduleId}</h1>
//             <p>This is the flashcards page. You can start adding flashcard content here.</p>
//         </div>
//     );
// };

// export default Flashcards;




// Flashcards.js
import React, { useState } from 'react';
import { Accordion, Button } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import TagContainer from '../components/TagContainer';

const Flashcards = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [tags, setTags] = useState([
        { id: '1', name: 'Tag 1', flashcards: [{ question: 'Q1', answer: 'A1', completed: false }, { question: 'Q2', answer: 'A2', completed: true }] },
        { id: '2', name: 'Tag 2', flashcards: [{ question: 'Q3', answer: 'A3', completed: false }] },
    ]);

    const handleBack = () => navigate(`/modules/${moduleId}/overview`);

    const handleAddFlashcard = (tagId) => {
        // Logic for adding flashcard
    };

    const handleEditFlashcard = (flashcard) => {
        // Logic for editing flashcard
    };

    const handleDeleteFlashcard = (flashcard) => {
        // Logic for deleting flashcard
    };

    const handleStartTest = (tagId) => {
        // Logic for starting test
    };

    return (
        <div style={{ padding: '20px' }}>
            <Button variant="subtle" onClick={handleBack}>
                ← Back
            </Button>
            <h1>Flashcards for Module {moduleId}</h1>

            <Accordion multiple>
                {tags.map((tag) => (
                    <TagContainer
                        key={tag.id}
                        tag={tag}
                        onStartTest={() => handleStartTest(tag.id)}
                        onAddFlashcard={() => handleAddFlashcard(tag.id)}
                        onEditFlashcard={handleEditFlashcard}
                        onDeleteFlashcard={handleDeleteFlashcard}
                    />
                ))}
            </Accordion>
        </div>
    );
};

export default Flashcards;


