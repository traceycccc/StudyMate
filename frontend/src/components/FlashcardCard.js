// // FlashcardCard.js
// import React from 'react';
// import { Card, Group, Menu, ActionIcon } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';

// const FlashcardCard = ({ flashcard, onEdit, onDelete }) => {
//     return (
//         <Card shadow="sm" padding="sm" style={{ marginBottom: '10px' }}>
//             <Group position="apart">
//                 <h4 style={{ margin: 0 }}>{flashcard.question}</h4>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon variant="light">
//                             <IconDots size={16} />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={onEdit}>Edit</Menu.Item>
//                         <Menu.Item onClick={onDelete} color="red">
//                             Delete
//                         </Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </Group>
//         </Card>
//     );
// };

// export default FlashcardCard;




// import React from 'react';
// import { Card, Text } from '@mantine/core';

// const FlashcardCard = ({ flashcard }) => {
//     return (
//         <Card shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
//             <Text weight={500} size="lg" style={{ marginBottom: '5px' }}>Q: {flashcard.question}</Text>
//             <Text color="dimmed">A: {flashcard.answer}</Text>
//         </Card>
//     );
// };

// export default FlashcardCard;



// import React from 'react';
// import { Card, Text } from '@mantine/core';

// const FlashcardCard = ({ flashcard }) => {
//     return (
//         <Card shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
//             <Text weight={500} size="lg" style={{ marginBottom: '5px' }}>Q: {flashcard.question}</Text>
//             <Text color="dimmed">A: {flashcard.answer}</Text>
//         </Card>
//     );
// };

// export default FlashcardCard;



//trying to render using the FlashcardTextEditor.js
import React, { useEffect } from 'react';
import FlashcardTextEditor from './FlashcardTextEditor';
import { Card, Text } from '@mantine/core';

const FlashcardCard = ({ flashcard }) => {
    // Log the question and answer content for debugging
    useEffect(() => {
        console.log("Flashcard Question:", flashcard.question);
        console.log("Flashcard Answer:", flashcard.answer);
    }, [flashcard]);

    return (
        <Card shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
            <div style={{ marginBottom: '5px' }}>Q:</div>
            <FlashcardTextEditor content={flashcard.question} readOnly={true} />
            
            <div style={{ marginTop: '10px' }}>A:</div>
            <FlashcardTextEditor content={flashcard.answer} readOnly={true} />
        </Card>
    );
};
export default FlashcardCard;
