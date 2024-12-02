import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Text, TextInput, ActionIcon } from '@mantine/core';
import { IconKeyboard, IconArrowLeft } from '@tabler/icons-react';
import { firestore } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import FlashcardTextEditor from '../components/FlashcardTextEditor';


const FlashcardPractice = () => {
    const { tagId } = useParams();
    const location = useLocation();
    const initialFlashcardId = location.state?.flashcardId;
    const [flashcards, setFlashcards] = useState([]); // list of flashcards for the selected tag
    const [currentIndex, setCurrentIndex] = useState(0); // the flashcard currently displayed
    const [showAnswer, setShowAnswer] = useState(false); //bool to toggle show or hide answer
    const [userAnswer, setUserAnswer] = useState('');
    const [showTextInput, setShowTextInput] = useState(false);
    const [tagName, setTagName] = useState("Flashcards");
    const navigate = useNavigate();

    useEffect(() => {

        // fetch tag name for page title
        const fetchTagName = async () => {
            if (!tagId) return;

            try {
                const tagDoc = await getDoc(doc(firestore, 'tags', tagId));
                if (tagDoc.exists()) {
                    setTagName(tagDoc.data().name || "Flashcards");
                } else {
                    console.error("Tag not found");
                }
            } catch (error) {
                console.error("Error fetching tag name:", error);
            }
        };

        //fetch flashcards of selected tagId passed from FlashcardCard.js
        const fetchFlashcards = async () => {
            if (!tagId) {
                console.error("Error: tagId is undefined.");
                return;
            }

            try {
                const flashcardsRef = collection(firestore, 'flashcards'); // Reference to the flashcards document
                const q = query(flashcardsRef, where('tagId', '==', tagId)); // get all flashcards of that tagId
                const querySnapshot = await getDocs(q);
                const fetchedFlashcards = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setFlashcards(fetchedFlashcards); //put in state 'flashcards' 

                // Set the initial flashcard based on the clicked flashcard's ID
                const initialIndex = fetchedFlashcards.findIndex(fc => fc.id === initialFlashcardId);
                setCurrentIndex(initialIndex >= 0 ? initialIndex : 0); //put in state 'currentIndex'
            } catch (error) {
                console.error("Error fetching flashcards:", error);
            }
        };

        fetchTagName();
        fetchFlashcards();
    }, [tagId, initialFlashcardId]);

    //get the current flashcard to display
    const currentFlashcard = flashcards[currentIndex];

    //if no flashcards to display (an error occured)
    if (flashcards.length === 0) {
        return (
            <Card>
                <Text>No flashcards available for practice.</Text>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </Card>
        );
    }

    

    const handleNext = () => {
        setShowAnswer(false);
        setUserAnswer('');
        setShowTextInput(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length); //next flashcard
    };

    const handlePrevious = () => {
        setShowAnswer(false);
        setUserAnswer('');
        setShowTextInput(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length); //previous flashcard
    };

    //bool toggles to view or hide
    const toggleAnswerVisibility = () => setShowAnswer((prev) => !prev);
    const toggleTextInput = () => setShowTextInput((prev) => !prev);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0px', height: '91vh' }}>
            {/* Back Button and Title */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap:'20px', }}>
                
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
                <h2>
                    Flashcards for {tagName}
                </h2>
            </div>

            {/* Main Card */}
            <Card shadow="sm" padding="lg" style={{ flexGrow: 1, width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                {/* Question Display (current, using 'currentFlashcard') */}
                <Text weight={500} size="lg" style={{ marginBottom: '15px' }}>Question</Text>
                <FlashcardTextEditor content={currentFlashcard.question} readOnly={true} />

                {/* Optional Text Input with Left-Aligned Icon */}
                <div style={{ display: 'flex', alignItems: 'center', margin: '20px auto 10px', width: '100%' }}>
                    <ActionIcon
                        onClick={toggleTextInput}
                        style={{
                            backgroundColor: 'transparent', // Default background color
                            color: 'black',                  // Default icon color
                            transition: 'background-color 0.3s ease', // Smooth hover transition
                            marginRight: '10px'
                        }}
                        radius="xl"
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} // Hover background color
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original background color
                    >
                        <IconKeyboard size={24} />
                    </ActionIcon>
                    {showTextInput && (
                        <TextInput
                            placeholder="Type your answer here..."
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.currentTarget.value)}
                            style={{ width: '100%' }}
                        />
                    )}
                </div>

                <Button
                    variant="outline"
                    color="blue"
                    onClick={toggleAnswerVisibility}
                    style={{ marginBottom: '20px' }}
                >
                    {showAnswer ? 'Hide Answer' : 'Show Answer'}
                </Button>

                {/* Answer Display, (current, using 'currentFlashcard') */}
                {showAnswer && (
                    <>
                        <Text weight={500} size="lg" style={{ marginTop: '15px' }}>Answer</Text>
                        <FlashcardTextEditor content={currentFlashcard.answer} readOnly={true} />
                    </>
                )}
            </Card>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '800px', margin: '20px auto' }}>
                <Button onClick={handlePrevious} disabled={flashcards.length <= 1}>Previous</Button>
                <Button onClick={handleNext} disabled={flashcards.length <= 1}>Next</Button>
            </div>
        </div>
    );
};

export default FlashcardPractice;
