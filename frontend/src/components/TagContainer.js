// TagContainer.js
import React from 'react';
import { Accordion, Button, Progress, Group } from '@mantine/core';
import FlashcardCard from './FlashcardCard';

const TagContainer = ({ tag, onStartTest, onAddFlashcard, onEditFlashcard, onDeleteFlashcard }) => {
    const completedCount = tag.flashcards.filter(f => f.completed).length;
    const totalCount = tag.flashcards.length;
    const progressValue = (completedCount / totalCount) * 100;

    return (
        <Accordion.Item label={`${tag.name} (${totalCount} flashcards)`}>
            <Progress value={progressValue} style={{ marginBottom: '10px' }} />
            <Group position="apart" style={{ marginBottom: '10px' }}>
                <Button onClick={onStartTest}>Start Test</Button>
                <Button onClick={onAddFlashcard}>Add Flashcard</Button>
            </Group>
            {tag.flashcards.map((flashcard, index) => (
                <FlashcardCard
                    key={index}
                    flashcard={flashcard}
                    onEdit={() => onEditFlashcard(flashcard)}
                    onDelete={() => onDeleteFlashcard(flashcard)}
                />
            ))}
        </Accordion.Item>
    );
};

export default TagContainer;
