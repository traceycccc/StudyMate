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




import React from 'react';
import { Card, Text } from '@mantine/core';

const FlashcardCard = ({ flashcard }) => {
    return (
        <Card shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
            <Text weight={500} size="lg" style={{ marginBottom: '5px' }}>Q: {flashcard.question}</Text>
            <Text color="dimmed">A: {flashcard.answer}</Text>
        </Card>
    );
};

export default FlashcardCard;