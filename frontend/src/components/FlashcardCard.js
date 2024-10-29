// FlashcardCard.js
import React from 'react';
import { Card, Group, Menu, ActionIcon } from '@mantine/core';
import { IconDots } from '@tabler/icons-react';

const FlashcardCard = ({ flashcard, onEdit, onDelete }) => {
    return (
        <Card shadow="sm" padding="sm" style={{ marginBottom: '10px' }}>
            <Group position="apart">
                <h4 style={{ margin: 0 }}>{flashcard.question}</h4>
                <Menu position="bottom-end">
                    <Menu.Target>
                        <ActionIcon variant="light">
                            <IconDots size={16} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={onEdit}>Edit</Menu.Item>
                        <Menu.Item onClick={onDelete} color="red">
                            Delete
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Card>
    );
};

export default FlashcardCard;
