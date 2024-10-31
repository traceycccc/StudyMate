
//tested successfully to display the flashcard IDs from the Flashcards.js:

// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const TestSession = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { flashcardIds } = location.state || {}; // Retrieve flashcardIds passed from Flashcards.js

//     useEffect(() => {
//         if (!flashcardIds || flashcardIds.length === 0) {
//             alert("No flashcards found for this session.");
//             navigate('/modules/:moduleId/overview/flashcards'); // Adjust path as needed
//         } else {
//             console.log("Received flashcard IDs for testing:", flashcardIds);
//         }
//     }, [flashcardIds, navigate]);

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Test Session</h1>
//             {flashcardIds && flashcardIds.length > 0 ? (
//                 <div>
//                     <p>Flashcard IDs to test:</p>
//                     <ul>
//                         {flashcardIds.map((id, index) => (
//                             <li key={index}>{id}</li>
//                         ))}
//                     </ul>
//                 </div>
//             ) : (
//                 <p>No flashcards available for testing.</p>
//             )}
//         </div>
//     );
// };

// export default TestSession;


//managed to display it out, just that the page is weird it overflowed
// import React, { useState, useEffect, useCallback } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Button, Progress, Textarea, Modal } from '@mantine/core';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { firestore } from '../firebase';

// const TestSession = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { flashcardIds } = location.state || {};

//     const [flashcards, setFlashcards] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answer, setAnswer] = useState('');
//     const [progress, setProgress] = useState(0);
//     const [progressMap, setProgressMap] = useState({});
//     const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
//     const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

    

//     // Fetch flashcards data from Firestore
//     // const fetchFlashcards = async () => {
//     //     const flashcardsRef = collection(firestore, 'flashcards');
//     //     const q = query(flashcardsRef, where('__name__', 'in', flashcardIds));
//     //     const querySnapshot = await getDocs(q);
//     //     const fetchedFlashcards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     //     setFlashcards(fetchedFlashcards);
//     //     console.log("Fetched flashcards:", fetchedFlashcards);
//     // };

//     // Memoized fetchFlashcards function to avoid dependency warning
//     const fetchFlashcards = useCallback(async () => {
//         const flashcardsRef = collection(firestore, 'flashcards');
//         const q = query(flashcardsRef, where('__name__', 'in', flashcardIds));
//         const querySnapshot = await getDocs(q);
//         const fetchedFlashcards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setFlashcards(fetchedFlashcards);
//         console.log("Fetched flashcards:", fetchedFlashcards);
//     }, [flashcardIds]);

//     useEffect(() => {
//         if (!flashcardIds || flashcardIds.length === 0) {
//             alert("No flashcards found for this session.");
//             navigate('/modules/:moduleId/overview/flashcards'); // Adjust path as needed
//         } else {
//             fetchFlashcards();
//         }
//     }, [flashcardIds, navigate, fetchFlashcards]);

//     // Update progress bar based on the current question index
//     useEffect(() => {
//         if (flashcards.length > 0) {
//             const percentage = ((currentQuestionIndex + 1) / flashcards.length) * 100;
//             setProgress(percentage);
//         }
//     }, [currentQuestionIndex, flashcards.length]);

//     // Handle answer submission
//     const handleSubmitAnswer = () => {
//         // Example of generating a random rating (replace with actual rating from GPT model)
//         const rating = Math.floor(Math.random() * 5) + 1;

//         setProgressMap((prevMap) => ({
//             ...prevMap,
//             [flashcards[currentQuestionIndex].id]: { rating, completed: true },
//         }));

//         if (currentQuestionIndex < flashcards.length - 1) {
//             setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//             setAnswer('');
//         } else {
//             setIsCompletionModalOpen(true);
//             console.log("Test session completed!");
//         }
//     };

//     // Handle quitting the test session
//     const handleQuitTest = () => {
//         setIsQuitModalOpen(false);
//         console.log("Test session quit. Progress discarded.");
//         navigate('/modules/:moduleId/overview/flashcards'); // Adjust path as needed
//     };

//     // Calculate score summary
//     const calculateScore = () => {
//         const totalQuestions = flashcards.length;
//         const completedRatings = Object.values(progressMap).map(entry => entry.rating);
//         const perfectScores = completedRatings.filter(score => score === 5).length;
//         const scorePercentage = (completedRatings.reduce((acc, score) => acc + score, 0) / (totalQuestions * 5)) * 100;
//         return { scorePercentage, perfectScores };
//     };

//     return (
//         <div style={{ width: '100vw', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
//             <Button variant="subtle" onClick={() => setIsQuitModalOpen(true)}>
//                 ← Back
//             </Button>

//             <Progress value={progress} style={{ marginTop: '10px' }} />

//             {flashcards.length > 0 && (
//                 <div style={{ marginTop: '20px', textAlign: 'center' }}>
//                     <h2>Question {currentQuestionIndex + 1}</h2>
//                     <p>{flashcards[currentQuestionIndex]?.question}</p>
//                 </div>
//             )}

//             <Textarea
//                 placeholder="Type your answer here..."
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 style={{ marginTop: '20px', width: '100%' }}
//             />

//             <div style={{ textAlign: 'right', marginTop: '10px' }}>
//                 {currentQuestionIndex < flashcards.length - 1 ? (
//                     <Button onClick={handleSubmitAnswer}>Submit Answer</Button>
//                 ) : (
//                     <Button onClick={handleSubmitAnswer}>Finish</Button>
//                 )}
//             </div>

//             {/* Quit Confirmation Modal */}
//             <Modal opened={isQuitModalOpen} onClose={() => setIsQuitModalOpen(false)} title="Quit Test">
//                 <p>Are you sure you want to quit? Your progress will not be saved.</p>
//                 <Button color="red" onClick={handleQuitTest}>Yes, Quit</Button>
//                 <Button onClick={() => setIsQuitModalOpen(false)}>Cancel</Button>
//             </Modal>

//             {/* Completion Modal */}
//             <Modal opened={isCompletionModalOpen} onClose={() => setIsCompletionModalOpen(false)} title="Test Completed">
//                 <h3>Congratulations! You've completed the test.</h3>
//                 <p>Score: {calculateScore().scorePercentage.toFixed(2)}%</p>
//                 <p>Perfect 5/5 Ratings: {calculateScore().perfectScores}</p>
//                 <Button onClick={() => navigate('/modules/:moduleId/overview/flashcards')}>Go back to Flashcards Page</Button>
//             </Modal>
//         </div>
//     );
// };

// export default TestSession;



import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Progress, Textarea, Modal } from '@mantine/core';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';

const TestSession = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { flashcardIds } = location.state || {};

    const [flashcards, setFlashcards] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [progress, setProgress] = useState(0);
    const [progressMap, setProgressMap] = useState({});
    const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
    const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);




    // Memoized fetchFlashcards function to avoid dependency warning
    const fetchFlashcards = useCallback(async () => {
        const flashcardsRef = collection(firestore, 'flashcards');
        const q = query(flashcardsRef, where('__name__', 'in', flashcardIds));
        const querySnapshot = await getDocs(q);
        const fetchedFlashcards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFlashcards(fetchedFlashcards);
        console.log("Fetched flashcards:", fetchedFlashcards);
    }, [flashcardIds]);

    useEffect(() => {
        if (!flashcardIds || flashcardIds.length === 0) {
            alert("No flashcards found for this session.");
            navigate('/modules/:moduleId/overview/flashcards'); // Adjust path as needed
        } else {
            fetchFlashcards();
        }
    }, [flashcardIds, navigate, fetchFlashcards]);

    // Update progress bar based on the current question index
    useEffect(() => {
        if (flashcards.length > 0) {
            const percentage = ((currentQuestionIndex + 1) / flashcards.length) * 100;
            setProgress(percentage);
        }
    }, [currentQuestionIndex, flashcards.length]);

    // Handle answer submission
    const handleSubmitAnswer = () => {
        // Example of generating a random rating (replace with actual rating from GPT model)
        const rating = Math.floor(Math.random() * 5) + 1;

        setProgressMap((prevMap) => ({
            ...prevMap,
            [flashcards[currentQuestionIndex].id]: { rating, completed: true },
        }));

        if (currentQuestionIndex < flashcards.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setAnswer('');
        } else {
            setIsCompletionModalOpen(true);
            console.log("Test session completed!");
        }
    };

    // Handle quitting the test session
    const handleQuitTest = () => {
        setIsQuitModalOpen(false);
        console.log("Test session quit. Progress discarded.");
        navigate('/modules/:moduleId/overview/flashcards'); // Adjust path as needed
    };

    // Calculate score summary
    const calculateScore = () => {
        const totalQuestions = flashcards.length;
        const completedRatings = Object.values(progressMap).map(entry => entry.rating);
        const perfectScores = completedRatings.filter(score => score === 5).length;
        const scorePercentage = (completedRatings.reduce((acc, score) => acc + score, 0) / (totalQuestions * 5)) * 100;
        return { scorePercentage, perfectScores };
    };

    return (
        <div style={{ width: '100vw', height: '100vh', padding: '20px', boxSizing: 'border-box' }}>
            <Button variant="subtle" onClick={() => setIsQuitModalOpen(true)}>
                ← Back
            </Button>

            <Progress value={progress} style={{ marginTop: '10px' }} />

            {flashcards.length > 0 && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h2>Question {currentQuestionIndex + 1}</h2>
                    <p>{flashcards[currentQuestionIndex]?.question}</p>
                </div>
            )}

            <Textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{ marginTop: '20px', width: '100%' }}
            />

            <div style={{ textAlign: 'right', marginTop: '10px' }}>
                {currentQuestionIndex < flashcards.length - 1 ? (
                    <Button onClick={handleSubmitAnswer}>Submit Answer</Button>
                ) : (
                    <Button onClick={handleSubmitAnswer}>Finish</Button>
                )}
            </div>

            {/* Quit Confirmation Modal */}
            <Modal opened={isQuitModalOpen} onClose={() => setIsQuitModalOpen(false)} title="Quit Test">
                <p>Are you sure you want to quit? Your progress will not be saved.</p>
                <Button color="red" onClick={handleQuitTest}>Yes, Quit</Button>
                <Button onClick={() => setIsQuitModalOpen(false)}>Cancel</Button>
            </Modal>

            {/* Completion Modal */}
            <Modal opened={isCompletionModalOpen} onClose={() => setIsCompletionModalOpen(false)} title="Test Completed">
                <h3>Congratulations! You've completed the test.</h3>
                <p>Score: {calculateScore().scorePercentage.toFixed(2)}%</p>
                <p>Perfect 5/5 Ratings: {calculateScore().perfectScores}</p>
                <Button onClick={() => navigate('/modules/:moduleId/overview/flashcards')}>Go back to Flashcards Page</Button>
            </Modal>
        </div>
    );
};

export default TestSession;
