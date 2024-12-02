import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Progress, Textarea, Modal, Text, Group } from '@mantine/core';
import { collection, query, where, doc, updateDoc, getDocs } from 'firebase/firestore';
import { firestore, auth } from '../firebase';
import FlashcardTextEditor from '../components/FlashcardTextEditor';
import { IconArrowLeft } from '@tabler/icons-react'; 

const TestSession = () => {
    const location = useLocation();
    const navigate = useNavigate();
    //Extracts the list of flashcardIds to test and the moduleId from the location.state passed by the navigation
    const { flashcardIds, moduleId } = location.state || {};

    const [flashcards, setFlashcards] = useState([]); //Stores the flashcards to be tested, fetched from Firestore
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //Tracks current flashcard, index
    const [answer, setAnswer] = useState('');
    const [progress, setProgress] = useState(0); //percentage of completed flashcards in the session
    const [progressMap, setProgressMap] = useState({}); //Track the rating and completion status for each flashcard
    const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
    const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState(null); //Stores the rating and explanation for the submitted answer
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [error, setError] = useState('');

    //for question and answer of flashcard, to be fed to gpt model
    const htmlToPlainText = (html) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;
        let plainText = tempElement.textContent || tempElement.innerText || "";
        plainText = plainText.replace(/\$/g, "");
        return plainText.trim();
    };

    const fetchFlashcards = useCallback(async () => {
        // Reference to the flashcards document
        const flashcardsRef = collection(firestore, 'flashcards');

        const q = query(flashcardsRef, where('__name__', 'in', flashcardIds)); //get flashcards by matching flashcard ids
        const querySnapshot = await getDocs(q);
        //map into an array of usable objects
        const fetchedFlashcards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFlashcards(fetchedFlashcards); //put into state 'flashcards'
    }, [flashcardIds]);

    //if no flashcard id array from Flashcards.js is found
    useEffect(() => {
        if (!flashcardIds || flashcardIds.length === 0) {
            alert("No flashcards found for this session.");
            navigate(-1);
        } else {
            fetchFlashcards();
        }
    }, [flashcardIds, navigate, fetchFlashcards]);

    //update progress
    useEffect(() => {
        if (flashcards.length > 0) {
            const percentage = ((currentQuestionIndex + 1) / flashcards.length) * 100; //have 1 since start from 1
            setProgress(percentage);
        }
    }, [currentQuestionIndex, flashcards.length]);


    //handle submit answer
    const handleSubmitAnswer = async () => {
        //must not be empty
        if (!answer.trim()) {
            setError("Answer cannot be empty.");
            return;
        }
        setError('');

        //prepare the 3 things: question, answer, and user's answer
        const flashcard = flashcards[currentQuestionIndex];
        const questionText = htmlToPlainText(flashcard.question);
        const correctAnswerText = htmlToPlainText(flashcard.answer);

        const evaluationPrompt = `
            Here is a flashcard question and answer:
            - Question: ${questionText}
            - Answer: ${correctAnswerText}
            The user has given the following answer: "${answer}". Please rate this answer on a scale from 1 to 5, and provide a brief explanation for the rating in JSON format like {"rating": 3, "explanation": "Explanation text here."}.
        `;

        try {
            
            const response = await fetch('http://localhost:5000/evaluate-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ promptText: evaluationPrompt }),
            });

            //response is in raw HTTP response format
            const data = await response.json();// extract the json body from the response, converted into json javascript object 
            console.log('response json b4 parsing:', data)

            //destructuring by extracting 'rating' & 'explanation'
            const { rating, explanation } = JSON.parse(data.evaluation); 

            // tracks the progress of the test session for each flashcard
            setProgressMap((prevMap) => ({
                ...prevMap, //old ones
                [flashcard.id]: { rating, completed: true }, //the current one
            }));

            setEvaluationResult({ rating, explanation }); // put the result into state 'evaluationResult'
            setIsSubmitDisabled(true);

        } catch (error) {
            console.error('Error evaluating the answer:', error);
        }
    };

    //handle next question button
    const handleNextQuestion = () => {
        setEvaluationResult(null);
        setIsSubmitDisabled(false);
        setAnswer('');

        if (currentQuestionIndex < flashcards.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);//go next flashcard question
        } else {
            setIsCompletionModalOpen(true);//for when all flashcards are done
        }
    };

    //test done, save progress
    const handleSaveProgressAndExit = async () => {
        setIsSaving(true);
        try {
            const userId = auth.currentUser?.uid;

            if (!userId || !moduleId) {
                throw new Error("Missing userId or moduleId");
            }

            //destructure flashcardId and progressData
            for (const [flashcardId, progressData] of Object.entries(progressMap)) { //Converts the progressMap object into an array of key-value pairs.
                const flashcardDocRef = doc(firestore, 'flashcards', flashcardId); //get that flashcard

                await updateDoc(flashcardDocRef, {
                    rating: progressData.rating,
                    completed: progressData.completed,
                });
            }

            navigate(`/modules/${moduleId}/overview/flashcards`);
        } catch (error) {
            console.error("Error saving progress:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleQuitTest = () => {
        setIsQuitModalOpen(false);
        navigate(-1);
    };

    const calculateScore = () => {
        const totalQuestions = flashcards.length;//total number of questions (flashcards) in the session
        const completedRatings = Object.values(progressMap).map(entry => entry.rating); //extracts the values (progress data) as an array
        const perfectScores = completedRatings.filter(score => score === 5).length; //no. of flashcards with full marks
        const scorePercentage = (completedRatings.reduce((acc, score) => acc + score, 0) / (totalQuestions * 5)) * 100; //percentage depending points
        return { scorePercentage, perfectScores };
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', height: '91vh', borderRadius: '8px', boxSizing: 'border-box' , backgroundColor: '#FFFFFF', }}>
            <div style={{ display: 'flex',  gap: '20px', marginBottom: '0px' , alignSelf: 'flex-start' }}>
                <button
                    onClick={() => setIsQuitModalOpen(true)} 
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
                    Test Yourself!
                </h1>

                
            </div>
         

            <Progress value={progress} style={{ width: '100%',  marginTop: '10px', marginBottom: '40px', }} />

            {flashcards.length > 0 && (
                <div style={{ marginTop: '0px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
                    <h2>Question {currentQuestionIndex + 1}</h2>
                    <FlashcardTextEditor content={flashcards[currentQuestionIndex].question} readOnly={true} />
                    {console.log('Current Question:', htmlToPlainText(flashcards[currentQuestionIndex].question))}
                    {console.log('Actual Answer:', htmlToPlainText(flashcards[currentQuestionIndex].answer))}
                </div>
            )}

            <Textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => {
                    setAnswer(e.target.value);
                    if (error) setError('');
                }}
                style={{ marginTop: '10px', width: '100%', maxWidth: '800px' }}
                disabled={isSubmitDisabled}
                error={error}
                styles={{
                    input: {
                        borderColor: error ? 'red' : '',
                    },
                }}
            />

            <div style={{ textAlign: 'right', marginTop: '10px', width: '100%', maxWidth: '800px' }}>
                <Button onClick={handleSubmitAnswer} disabled={isSubmitDisabled}>
                    Submit Answer
                </Button>
            </div>


            {/* show evaluation result modal when itself is there */}
            {evaluationResult && ( 
                <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
                    <h3>Rating: {evaluationResult.rating}</h3>
                    <p>{evaluationResult.explanation}</p>
                    {/* condition for when at last question, is Finish button */}
                    {currentQuestionIndex < flashcards.length - 1 ? (
                        <Button onClick={handleNextQuestion} style={{ marginTop: '10px' }}>
                            Next Question
                        </Button>
                    ) : (
                        <Button onClick={() => setIsCompletionModalOpen(true)} style={{ marginTop: '10px' }}>
                            Finish
                        </Button>
                    )}
                </div>
            )}

            {/* quit modal */}
            <Modal
                opened={isQuitModalOpen}
                onClose={() => setIsQuitModalOpen(false)}
                title="Are you sure you want to quit the test?"
                centered
            >
                <Text>This action will discard all progress made in this session.</Text>
                <Group position="right" spacing="sm" style={{ marginTop: '20px' }}>
                    <Button variant="default" onClick={() => setIsQuitModalOpen(false)}>Cancel</Button>
                    <Button color="red" onClick={handleQuitTest}>Yes, Quit</Button>
                </Group>
            </Modal>

            {/* completion modal */}
            <Modal opened={isCompletionModalOpen} onClose={() => setIsCompletionModalOpen(false)} title="Test Completed">
                <h3>Congratulations! You've completed the test.</h3>
                <p>Score: {calculateScore().scorePercentage.toFixed(2)}%</p>
                <p>Perfect 5/5 Ratings: {calculateScore().perfectScores}</p>
                <Button onClick={handleSaveProgressAndExit} loading={isSaving}>Finish Test</Button>
            </Modal>
        </div>
    );
};

export default TestSession;
