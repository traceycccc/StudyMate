
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


// no logic for the answer yet
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
//         // navigate('/modules/:moduleId/overview/flashcards'); // Adjust path as needed
//         navigate(-1); // Navigate back to the previous page in history
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




///able to get the rating and explannation in the console log
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


//     const htmlToPlainText = (html) => {
//         const tempElement = document.createElement("div");
//         tempElement.innerHTML = html;
//         let plainText = tempElement.textContent || tempElement.innerText || "";
//         plainText = plainText.replace(/\$/g, "");
//         return plainText.trim();
//     };


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
//             navigate(-1); // Adjust path as needed
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
//     // const handleSubmitAnswer = () => {
//     //     // Example of generating a random rating (replace with actual rating from GPT model)
//     //     const rating = Math.floor(Math.random() * 5) + 1;

//     //     setProgressMap((prevMap) => ({
//     //         ...prevMap,
//     //         [flashcards[currentQuestionIndex].id]: { rating, completed: true },
//     //     }));

//     //     if (currentQuestionIndex < flashcards.length - 1) {
//     //         setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//     //         setAnswer('');
//     //     } else {
//     //         setIsCompletionModalOpen(true);
//     //         console.log("Test session completed!");
//     //     }
//     // };

//     const handleSubmitAnswer = async () => {
//         const flashcard = flashcards[currentQuestionIndex];
//         const questionText = htmlToPlainText(flashcard.question);
//         console.log(`question of flashcard:`, questionText); //successfully converted to plain text
//         const correctAnswerText = htmlToPlainText(flashcard.answer);
//         console.log(`actual ans of flashcard:`, correctAnswerText); //successfully converted to plain text

//         const evaluationPrompt = `
//             Here is a flashcard question and answer:
//             - Question: ${questionText}
//             - Answer: ${correctAnswerText}
            
//             The user has given the following answer: "${answer}". Please rate this answer on a scale from 1 to 5, and provide a brief explanation for the rating in JSON format like {"rating": 3, "explanation": "Explanation text here."}.
//         `;

//         try {
//             const response = await fetch('http://localhost:5000/evaluate-answer', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ promptText: evaluationPrompt }),
//             });

//             const data = await response.json();
//             const { rating, explanation } = JSON.parse(data.evaluation);

//             setProgressMap((prevMap) => ({
//                 ...prevMap,
//                 [flashcard.id]: { rating, completed: true },
//             }));

//             console.log(`Rating: ${rating}, Explanation: ${explanation}`);

//             if (currentQuestionIndex < flashcards.length - 1) {
//                 setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//                 setAnswer('');
//             } else {
//                 setIsCompletionModalOpen(true);
//                 console.log("Test session completed!");
//             }
//         } catch (error) {
//             console.error('Error evaluating the answer:', error);
//         }
//     };

//     // Handle quitting the test session
//     const handleQuitTest = () => {
//         setIsQuitModalOpen(false);
//         console.log("Test session quit. Progress discarded.");
//         // navigate('/modules/:moduleId/overview/flashcards'); // Adjust path as needed
//         navigate(-1); // Navigate back to the previous page in history
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
//                 <Button onClick={() => navigate(-1)}>Go back to Flashcards Page</Button>
//             </Modal>
//         </div>
//     );
// };

// export default TestSession;




//make the show rating and explanation, and the logic to have the temporoal shet
// import React, { useState, useEffect, useCallback } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Button, Progress, Textarea, Modal } from '@mantine/core';
// import { collection, query, where, doc, updateDoc, getDocs } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// const TestSession = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { flashcardIds, moduleId } = location.state || {};

//     const [flashcards, setFlashcards] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answer, setAnswer] = useState('');
//     const [progress, setProgress] = useState(0);
//     const [progressMap, setProgressMap] = useState({});
//     const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
//     const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

//     const [evaluationResult, setEvaluationResult] = useState(null);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

//     const htmlToPlainText = (html) => {
//         const tempElement = document.createElement("div");
//         tempElement.innerHTML = html;
//         let plainText = tempElement.textContent || tempElement.innerText || "";
//         plainText = plainText.replace(/\$/g, "");
//         return plainText.trim();
//     };


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
//             navigate(-1); // Adjust path as needed
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


//     const handleSubmitAnswer = async () => {
//         const flashcard = flashcards[currentQuestionIndex];
//         const questionText = htmlToPlainText(flashcard.question);
//         console.log(`question of flashcard:`, questionText); //successfully converted to plain text
//         const correctAnswerText = htmlToPlainText(flashcard.answer);
//         console.log(`actual ans of flashcard:`, correctAnswerText); //successfully converted to plain text

//         const evaluationPrompt = `
//             Here is a flashcard question and answer:
//             - Question: ${questionText}
//             - Answer: ${correctAnswerText}
            
//             The user has given the following answer: "${answer}". Please rate this answer on a scale from 1 to 5, and provide a brief explanation for the rating in JSON format like {"rating": 3, "explanation": "Explanation text here."}.
//         `;

//         try {
//             const response = await fetch('http://localhost:5000/evaluate-answer', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ promptText: evaluationPrompt }),
//             });

//             const data = await response.json();
//             const { rating, explanation } = JSON.parse(data.evaluation);

//             setProgressMap((prevMap) => ({
//                 ...prevMap,
//                 [flashcard.id]: { rating, completed: true },
//             }));

//             console.log(`Rating: ${rating}, Explanation: ${explanation}`);

//             // Set the evaluation result to be displayed
//             setEvaluationResult({ rating, explanation });

//             // Disable the submit button
//             setIsSubmitDisabled(true);

//             // Log the updated progress map for tracking
//             console.log("Current progress map:", {
//                 ...progressMap,
//                 [flashcard.id]: { rating, completed: true },
//             });

//             setProgressMap((prevMap) => ({
//                 ...prevMap,
//                 [flashcard.id]: { rating, completed: true },
//             }));

            
//         } catch (error) {
//             console.error('Error evaluating the answer:', error);
//         }
//     };

//     const handleNextQuestion = () => {
//         // Clear the evaluation result and enable the submit button for the next question
//         setEvaluationResult(null);
//         setIsSubmitDisabled(false);
//         setAnswer('');

//         if (currentQuestionIndex < flashcards.length - 1) {
//             setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//             // setAnswer('');
//         } else {
//             setIsCompletionModalOpen(true);
//             console.log("Test session completed!");
//         }
//     };

//     //Handle finish test
//     const handleFinishTest = async () => {
//         try {
//             // Retrieve user ID from auth, replace with the actual method if different
//             const userId = auth.currentUser?.uid;


//             if (!userId || !moduleId) {
//                 throw new Error("Missing userId or moduleId");
//             }


//             // Ensure each entry in the progress map is saved to its respective flashcard document in Firestore
//             for (const [flashcardId, progressData] of Object.entries(progressMap)) {
//                 const flashcardDocRef = doc(firestore, 'flashcards', flashcardId);

//                 // Update the rating and completed fields for each flashcard
//                 await updateDoc(flashcardDocRef, {
//                     rating: progressData.rating,
//                     completed: progressData.completed,
//                 });
//             }

//             console.log("Progress saved to Firestore:", progressMap);

//             navigate(`/modules/${moduleId}/overview/flashcards`);
//         } catch (error) {
//             console.error("Error saving progress:", error);
//         }
//     };

//     // Handle quitting the test session
//     const handleQuitTest = () => {
//         setIsQuitModalOpen(false);
//         console.log("Test session quit. Progress discarded.");
//         // navigate('/modules/:moduleId/overview/flashcards'); // Adjust path as needed
//         navigate(-1); // Navigate back to the previous page in history
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
//             {/* <Button variant="subtle" onClick={() => setIsQuitModalOpen(true)}>
//                 ← Back
//             </Button> */}

//             <Button variant="subtle" onClick={() => setIsQuitModalOpen(true)} style={{ alignSelf: 'flex-start' }}>
//                 ← Back
//             </Button>

//             {/* <Progress value={progress} style={{ marginTop: '10px' }} /> */}
//             <Progress value={progress} style={{ marginTop: '10px', width: '100%' }} />

//             {/* {flashcards.length > 0 && (
//                 <div style={{ marginTop: '20px', textAlign: 'center' }}>
//                     <h2>Question {currentQuestionIndex + 1}</h2>
//                     <p>{flashcards[currentQuestionIndex]?.question}</p>
//                 </div>
//             )} */}
//             {flashcards.length > 0 && (
//                 <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
//                     <h2>Question {currentQuestionIndex + 1}</h2>
//                     <p>{htmlToPlainText(flashcards[currentQuestionIndex].question)}</p>
//                 </div>
//             )}

//             {/* <Textarea
//                 placeholder="Type your answer here..."
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 style={{ marginTop: '20px', width: '100%' }}
//             /> */}

//             <Textarea
//                 placeholder="Type your answer here..."
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }}
//                 disabled={isSubmitDisabled}
//             />


//             {/* <div style={{ textAlign: 'right', marginTop: '10px' }}>
//                 {currentQuestionIndex < flashcards.length - 1 ? (
//                     <Button onClick={handleSubmitAnswer}>Submit Answer</Button>
//                 ) : (
//                     <Button onClick={handleSubmitAnswer}>Finish</Button>
//                 )}
//             </div> */}

//             <div style={{ textAlign: 'right', marginTop: '10px', width: '100%', maxWidth: '800px' }}>
//                 <Button onClick={handleSubmitAnswer} disabled={isSubmitDisabled}>
//                     Submit Answer
//                 </Button>
//             </div>

//             {/* {evaluationResult && (
//                 <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
//                     <h3>Rating: {evaluationResult.rating}</h3>
//                     <p>{evaluationResult.explanation}</p>
//                     <Button onClick={handleNextQuestion} style={{ marginTop: '10px' }}>
//                         Next Question
//                     </Button>
//                 </div>
//             )} */}

//             {evaluationResult && (
//                 <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
//                     <h3>Rating: {evaluationResult.rating}</h3>
//                     <p>{evaluationResult.explanation}</p>
//                     {currentQuestionIndex < flashcards.length - 1 ? (
//                         <Button onClick={handleNextQuestion} style={{ marginTop: '10px' }}>
//                             Next Question
//                         </Button>
//                     ) : (
//                         <Button onClick={handleFinishTest} style={{ marginTop: '10px' }}>
//                             Finish
//                         </Button>
//                     )}
//                 </div>
//             )}



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




//tidied ver
// import React, { useState, useEffect, useCallback } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Button, Progress, Textarea, Modal } from '@mantine/core';
// import { collection, query, where, doc, updateDoc, getDocs } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// const TestSession = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { flashcardIds, moduleId } = location.state || {};

//     const [flashcards, setFlashcards] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answer, setAnswer] = useState('');
//     const [progress, setProgress] = useState(0);
//     const [progressMap, setProgressMap] = useState({});
//     const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
//     const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

//     const [evaluationResult, setEvaluationResult] = useState(null);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

//     const htmlToPlainText = (html) => {
//         const tempElement = document.createElement("div");
//         tempElement.innerHTML = html;
//         let plainText = tempElement.textContent || tempElement.innerText || "";
//         plainText = plainText.replace(/\$/g, "");
//         return plainText.trim();
//     };


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
//             navigate(-1); // Adjust path as needed
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


//     const handleSubmitAnswer = async () => {
//         const flashcard = flashcards[currentQuestionIndex];
//         const questionText = htmlToPlainText(flashcard.question);
//         console.log(`question of flashcard:`, questionText); //successfully converted to plain text
//         const correctAnswerText = htmlToPlainText(flashcard.answer);
//         console.log(`actual ans of flashcard:`, correctAnswerText); //successfully converted to plain text

//         const evaluationPrompt = `
//             Here is a flashcard question and answer:
//             - Question: ${questionText}
//             - Answer: ${correctAnswerText}
            
//             The user has given the following answer: "${answer}". Please rate this answer on a scale from 1 to 5, and provide a brief explanation for the rating in JSON format like {"rating": 3, "explanation": "Explanation text here."}.
//         `;

//         try {
//             const response = await fetch('http://localhost:5000/evaluate-answer', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ promptText: evaluationPrompt }),
//             });

//             const data = await response.json();
//             const { rating, explanation } = JSON.parse(data.evaluation);

//             setProgressMap((prevMap) => ({
//                 ...prevMap,
//                 [flashcard.id]: { rating, completed: true },
//             }));

//             console.log(`Rating: ${rating}, Explanation: ${explanation}`);

//             // Set the evaluation result to be displayed
//             setEvaluationResult({ rating, explanation });

//             // Disable the submit button
//             setIsSubmitDisabled(true);

//             // Log the updated progress map for tracking
//             console.log("Current progress map:", {
//                 ...progressMap,
//                 [flashcard.id]: { rating, completed: true },
//             });

//             setProgressMap((prevMap) => ({
//                 ...prevMap,
//                 [flashcard.id]: { rating, completed: true },
//             }));


//         } catch (error) {
//             console.error('Error evaluating the answer:', error);
//         }
//     };

//     const handleNextQuestion = () => {
//         // Clear the evaluation result and enable the submit button for the next question
//         setEvaluationResult(null);
//         setIsSubmitDisabled(false);
//         setAnswer('');

//         if (currentQuestionIndex < flashcards.length - 1) {
//             setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//             // setAnswer('');
//         } else {
//             setIsCompletionModalOpen(true);
//             console.log("Test session completed!");
//         }
//     };

//     //Handle finish test
//     const handleFinishTest = async () => {
//         try {
//             // Retrieve user ID from auth, replace with the actual method if different
//             const userId = auth.currentUser?.uid;


//             if (!userId || !moduleId) {
//                 throw new Error("Missing userId or moduleId");
//             }


//             // Ensure each entry in the progress map is saved to its respective flashcard document in Firestore
//             for (const [flashcardId, progressData] of Object.entries(progressMap)) {
//                 const flashcardDocRef = doc(firestore, 'flashcards', flashcardId);

//                 // Update the rating and completed fields for each flashcard
//                 await updateDoc(flashcardDocRef, {
//                     rating: progressData.rating,
//                     completed: progressData.completed,
//                 });
//             }

//             console.log("Progress saved to Firestore:", progressMap);

//             navigate(`/modules/${moduleId}/overview/flashcards`);
//         } catch (error) {
//             console.error("Error saving progress:", error);
//         }
//     };

//     // Handle quitting the test session
//     const handleQuitTest = () => {
//         setIsQuitModalOpen(false);
//         console.log("Test session quit. Progress discarded.");
//         navigate(-1); // Navigate back to the previous page in history
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


//             <Button variant="subtle" onClick={() => setIsQuitModalOpen(true)} style={{ alignSelf: 'flex-start' }}>
//                 ← Back
//             </Button>

//             {/* <Progress value={progress} style={{ marginTop: '10px' }} /> */}
//             <Progress value={progress} style={{ marginTop: '10px', width: '100%' }} />

//             {flashcards.length > 0 && (
//                 <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
//                     <h2>Question {currentQuestionIndex + 1}</h2>
//                     <p>{htmlToPlainText(flashcards[currentQuestionIndex].question)}</p>
//                 </div>
//             )}

       

//             <Textarea
//                 placeholder="Type your answer here..."
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }}
//                 disabled={isSubmitDisabled}
//             />


//             <div style={{ textAlign: 'right', marginTop: '10px', width: '100%', maxWidth: '800px' }}>
//                 <Button onClick={handleSubmitAnswer} disabled={isSubmitDisabled}>
//                     Submit Answer
//                 </Button>
//             </div>

           

//             {evaluationResult && (
//                 <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
//                     <h3>Rating: {evaluationResult.rating}</h3>
//                     <p>{evaluationResult.explanation}</p>
//                     {currentQuestionIndex < flashcards.length - 1 ? (
//                         <Button onClick={handleNextQuestion} style={{ marginTop: '10px' }}>
//                             Next Question
//                         </Button>
//                     ) : (
//                         <Button onClick={handleFinishTest} style={{ marginTop: '10px' }}>
//                             Finish
//                         </Button>
//                     )}
//                 </div>
//             )}



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




//fix the completion modal
// import React, { useState, useEffect, useCallback } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Button, Progress, Textarea, Modal } from '@mantine/core';
// import { collection, query, where, doc, updateDoc, getDocs } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';

// const TestSession = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { flashcardIds, moduleId } = location.state || {};

//     const [flashcards, setFlashcards] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answer, setAnswer] = useState('');
//     const [progress, setProgress] = useState(0);
//     const [progressMap, setProgressMap] = useState({});
//     const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
//     const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
//     const [isSaving, setIsSaving] = useState(false); // Loading state for the button

//     const [evaluationResult, setEvaluationResult] = useState(null);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

//     const htmlToPlainText = (html) => {
//         const tempElement = document.createElement("div");
//         tempElement.innerHTML = html;
//         let plainText = tempElement.textContent || tempElement.innerText || "";
//         plainText = plainText.replace(/\$/g, "");
//         return plainText.trim();
//     };


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
//             navigate(-1); // Adjust path as needed
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


//     const handleSubmitAnswer = async () => {
//         const flashcard = flashcards[currentQuestionIndex];
//         const questionText = htmlToPlainText(flashcard.question);
//         console.log(`question of flashcard:`, questionText); //successfully converted to plain text
//         const correctAnswerText = htmlToPlainText(flashcard.answer);
//         console.log(`actual ans of flashcard:`, correctAnswerText); //successfully converted to plain text

//         const evaluationPrompt = `
//             Here is a flashcard question and answer:
//             - Question: ${questionText}
//             - Answer: ${correctAnswerText}
            
//             The user has given the following answer: "${answer}". Please rate this answer on a scale from 1 to 5, and provide a brief explanation for the rating in JSON format like {"rating": 3, "explanation": "Explanation text here."}.
//         `;

//         try {
//             const response = await fetch('http://localhost:5000/evaluate-answer', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ promptText: evaluationPrompt }),
//             });

//             const data = await response.json();
//             const { rating, explanation } = JSON.parse(data.evaluation);

//             setProgressMap((prevMap) => ({
//                 ...prevMap,
//                 [flashcard.id]: { rating, completed: true },
//             }));

//             console.log(`Rating: ${rating}, Explanation: ${explanation}`);

//             // Set the evaluation result to be displayed
//             setEvaluationResult({ rating, explanation });

//             // Disable the submit button
//             setIsSubmitDisabled(true);

//             // Log the updated progress map for tracking
//             console.log("Current progress map:", {
//                 ...progressMap,
//                 [flashcard.id]: { rating, completed: true },
//             });

//             setProgressMap((prevMap) => ({
//                 ...prevMap,
//                 [flashcard.id]: { rating, completed: true },
//             }));


//         } catch (error) {
//             console.error('Error evaluating the answer:', error);
//         }
//     };

//     const handleNextQuestion = () => {
//         // Clear the evaluation result and enable the submit button for the next question
//         setEvaluationResult(null);
//         setIsSubmitDisabled(false);
//         setAnswer('');

//         if (currentQuestionIndex < flashcards.length - 1) {
//             setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//             // setAnswer('');
//         } else {
//             setIsCompletionModalOpen(true);// Show completion modal on last question
//             console.log("Test session completed!");
//         }
//     };

//     //Handle finish test
//     const handleSaveProgressAndExit = async () => {
//         setIsSaving(true); // Start loading state
//         try {
//             // Retrieve user ID from auth, replace with the actual method if different
//             const userId = auth.currentUser?.uid;


//             if (!userId || !moduleId) {
//                 throw new Error("Missing userId or moduleId");
//             }


//             // Ensure each entry in the progress map is saved to its respective flashcard document in Firestore
//             for (const [flashcardId, progressData] of Object.entries(progressMap)) {
//                 const flashcardDocRef = doc(firestore, 'flashcards', flashcardId);

//                 // Update the rating and completed fields for each flashcard
//                 await updateDoc(flashcardDocRef, {
//                     rating: progressData.rating,
//                     completed: progressData.completed,
//                 });
//             }

//             console.log("Progress saved to Firestore:", progressMap);

//             navigate(`/modules/${moduleId}/overview/flashcards`);
//         } catch (error) {
//             console.error("Error saving progress:", error);
//         } finally {
//             setIsSaving(false); // Stop loading state after saving
//         }
//     };

//     // Handle quitting the test session
//     const handleQuitTest = () => {
//         setIsQuitModalOpen(false);
//         console.log("Test session quit. Progress discarded.");
//         navigate(-1); // Navigate back to the previous page in history
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


//             <Button variant="subtle" onClick={() => setIsQuitModalOpen(true)} style={{ alignSelf: 'flex-start' }}>
//                 ← Back
//             </Button>

//             {/* <Progress value={progress} style={{ marginTop: '10px' }} /> */}
//             <Progress value={progress} style={{ marginTop: '10px', width: '100%' }} />

//             {flashcards.length > 0 && (
//                 <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
//                     <h2>Question {currentQuestionIndex + 1}</h2>
//                     <p>{htmlToPlainText(flashcards[currentQuestionIndex].question)}</p>
//                 </div>
//             )}



//             <Textarea
//                 placeholder="Type your answer here..."
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//                 style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }}
//                 disabled={isSubmitDisabled}
//             />


//             <div style={{ textAlign: 'right', marginTop: '10px', width: '100%', maxWidth: '800px' }}>
//                 <Button onClick={handleSubmitAnswer} disabled={isSubmitDisabled}>
//                     Submit Answer
//                 </Button>
//             </div>



//             {evaluationResult && (
//                 <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
//                     <h3>Rating: {evaluationResult.rating}</h3>
//                     <p>{evaluationResult.explanation}</p>
//                     {currentQuestionIndex < flashcards.length - 1 ? (
//                         <Button onClick={handleNextQuestion} style={{ marginTop: '10px' }}>
//                             Next Question
//                         </Button>
//                     ) : (
//                             <Button onClick={() => setIsCompletionModalOpen(true)} style={{ marginTop: '10px' }}>
//                             Finish
//                         </Button>
//                     )}
//                 </div>
//             )}



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
//                 <p>Click the "Click "Finish Test" to save your progress and go back to the Flashcard page!</p>
//                 <Button onClick={handleSaveProgressAndExit} loading={isSaving}>Finish Test</Button>
//             </Modal>
//         </div>
//     );
// };

// export default TestSession;




//switch to use the text editor to display
// import React, { useState, useEffect, useCallback } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Button, Progress, Textarea, Modal, Text, Group } from '@mantine/core';
// import { collection, query, where, doc, updateDoc, getDocs } from 'firebase/firestore';
// import { firestore, auth } from '../firebase';
// import FlashcardTextEditor from '../components/FlashcardTextEditor';

// const TestSession = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { flashcardIds, moduleId } = location.state || {};

//     const [flashcards, setFlashcards] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answer, setAnswer] = useState('');
//     const [progress, setProgress] = useState(0);
//     const [progressMap, setProgressMap] = useState({});
//     const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
//     const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
//     const [isSaving, setIsSaving] = useState(false); // Loading state for the button

//     const [evaluationResult, setEvaluationResult] = useState(null);
//     const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
//     const [error, setError] = useState('');

//     const htmlToPlainText = (html) => {
//         const tempElement = document.createElement("div");
//         tempElement.innerHTML = html;
//         let plainText = tempElement.textContent || tempElement.innerText || "";
//         plainText = plainText.replace(/\$/g, "");
//         return plainText.trim();
//     };


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
//             navigate(-1); // Adjust path as needed
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


//     const handleSubmitAnswer = async () => {
//         if (!answer.trim()) {
//             setError("Answer cannot be empty."); // Set error if answer is empty
//             return;
//         }
//         setError(''); // Clear error if answer is valid
//         const flashcard = flashcards[currentQuestionIndex];
//         const questionText = htmlToPlainText(flashcard.question);
//         console.log(`question of flashcard:`, questionText); //successfully converted to plain text
//         const correctAnswerText = htmlToPlainText(flashcard.answer);
//         console.log(`actual ans of flashcard:`, correctAnswerText); //successfully converted to plain text

//         const evaluationPrompt = `
//             Here is a flashcard question and answer:
//             - Question: ${questionText}
//             - Answer: ${correctAnswerText}
            
//             The user has given the following answer: "${answer}". Please rate this answer on a scale from 1 to 5, and provide a brief explanation for the rating in JSON format like {"rating": 3, "explanation": "Explanation text here."}.
            
//         `;

//         try {
//             const response = await fetch('http://localhost:5000/evaluate-answer', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ promptText: evaluationPrompt }),
//             });

//             const data = await response.json();
//             const { rating, explanation } = JSON.parse(data.evaluation);

//             setProgressMap((prevMap) => ({
//                 ...prevMap,
//                 [flashcard.id]: { rating, completed: true },
//             }));

//             console.log(`Rating: ${rating}, Explanation: ${explanation}`);

//             // Set the evaluation result to be displayed
//             setEvaluationResult({ rating, explanation });

//             // Disable the submit button
//             setIsSubmitDisabled(true);

//             // Log the updated progress map for tracking
//             console.log("Current progress map:", {
//                 ...progressMap,
//                 [flashcard.id]: { rating, completed: true },
//             });

//             setProgressMap((prevMap) => ({
//                 ...prevMap,
//                 [flashcard.id]: { rating, completed: true },
//             }));


//         } catch (error) {
//             console.error('Error evaluating the answer:', error);
//         }
//     };

//     const handleNextQuestion = () => {
//         // Clear the evaluation result and enable the submit button for the next question
//         setEvaluationResult(null);
//         setIsSubmitDisabled(false);
//         setAnswer('');

//         if (currentQuestionIndex < flashcards.length - 1) {
//             setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//             // setAnswer('');
//         } else {
//             setIsCompletionModalOpen(true);// Show completion modal on last question
//             console.log("Test session completed!");
//         }
//     };

//     //Handle finish test
//     const handleSaveProgressAndExit = async () => {
//         setIsSaving(true); // Start loading state
//         try {
//             // Retrieve user ID from auth, replace with the actual method if different
//             const userId = auth.currentUser?.uid;


//             if (!userId || !moduleId) {
//                 throw new Error("Missing userId or moduleId");
//             }


//             // Ensure each entry in the progress map is saved to its respective flashcard document in Firestore
//             for (const [flashcardId, progressData] of Object.entries(progressMap)) {
//                 const flashcardDocRef = doc(firestore, 'flashcards', flashcardId);

//                 // Update the rating and completed fields for each flashcard
//                 await updateDoc(flashcardDocRef, {
//                     rating: progressData.rating,
//                     completed: progressData.completed,
//                 });
//             }

//             console.log("Progress saved to Firestore:", progressMap);

//             navigate(`/modules/${moduleId}/overview/flashcards`);
//         } catch (error) {
//             console.error("Error saving progress:", error);
//         } finally {
//             setIsSaving(false); // Stop loading state after saving
//         }
//     };

//     // Handle quitting the test session
//     const handleQuitTest = () => {
//         setIsQuitModalOpen(false);
//         console.log("Test session quit. Progress discarded.");
//         navigate(-1); // Navigate back to the previous page in history
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
//         <div style={{ width: '100vw', height: '100vh', padding: '20px', alignItems: 'center', boxSizing: 'border-box' }}>


//             <Button variant="subtle" onClick={() => setIsQuitModalOpen(true)} style={{ alignSelf: 'flex-start' }}>
//                 ← Back
//             </Button>

//             {/* <Progress value={progress} style={{ marginTop: '10px' }} /> */}
//             <Progress value={progress} style={{ marginTop: '10px', width: '100%' }} />

//             {flashcards.length > 0 && (
//                 <div style={{ marginTop: '20px', textAlign: 'center', alignItems: 'center', maxWidth: '800px', width: '100%' }}>
//                     <h2>Question {currentQuestionIndex + 1}</h2>
//                     {/* Display the question using FlashcardTextEditor in read-only mode */}
//                     <FlashcardTextEditor content={flashcards[currentQuestionIndex].question} readOnly={true} />
//                 </div>
//             )}



//             <Textarea
//                 placeholder="Type your answer here..."
//                 value={answer}
//                 onChange={(e) => {
//                     setAnswer(e.target.value);
//                     if (error) setError(''); // Clear error when user starts typing
//                 }}
//                 style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }}
//                 disabled={isSubmitDisabled}
//                 error={error} // Display the error message below the input
//                 styles={{
//                     input: {
//                         borderColor: error ? 'red' : '', // Apply red outline if there's an error
//                     },
//                 }}
//             />


//             <div style={{ textAlign: 'right', marginTop: '10px', width: '100%', maxWidth: '800px' }}>
//                 <Button onClick={handleSubmitAnswer} disabled={isSubmitDisabled}>
//                     Submit Answer
//                 </Button>
//             </div>



//             {evaluationResult && (
//                 <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
//                     <h3>Rating: {evaluationResult.rating}</h3>
//                     <p>{evaluationResult.explanation}</p>
//                     {currentQuestionIndex < flashcards.length - 1 ? (
//                         <Button onClick={handleNextQuestion} style={{ marginTop: '10px' }}>
//                             Next Question
//                         </Button>
//                     ) : (
//                         <Button onClick={() => setIsCompletionModalOpen(true)} style={{ marginTop: '10px' }}>
//                             Finish
//                         </Button>
//                     )}
//                 </div>
//             )}



//             {/* Quit Confirmation Modal */}
            
//             <Modal
//                 opened={isQuitModalOpen}
//                 onClose={() => setIsQuitModalOpen(false)}
//                 title="Are you sure you want to quit the test?"
//                 centered
//             >
//                 <Text>This action will discard all progress made in this session.</Text>
//                 <Group position="right" spacing="sm" style={{ marginTop: '20px' }}>
//                     <Button variant="default" onClick={() => setIsQuitModalOpen(false)}>Cancel</Button>
//                     <Button color="red" onClick={handleQuitTest}>Yes, Quit</Button>
//                 </Group>
//             </Modal>

//             {/* Completion Modal */}
//             <Modal opened={isCompletionModalOpen} onClose={() => setIsCompletionModalOpen(false)} title="Test Completed">
//                 <h3>Congratulations! You've completed the test.</h3>
//                 <p>Score: {calculateScore().scorePercentage.toFixed(2)}%</p>
//                 <p>Perfect 5/5 Ratings: {calculateScore().perfectScores}</p>
//                 <p>Click the "Click "Finish Test" to save your progress and go back to the Flashcard page!</p>
//                 <Button onClick={handleSaveProgressAndExit} loading={isSaving}>Finish Test</Button>
//             </Modal>
//         </div>
//     );
// };

// export default TestSession;





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
    const { flashcardIds, moduleId } = location.state || {};

    const [flashcards, setFlashcards] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [progress, setProgress] = useState(0);
    const [progressMap, setProgressMap] = useState({});
    const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
    const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState(null);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [error, setError] = useState('');

    const htmlToPlainText = (html) => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;
        let plainText = tempElement.textContent || tempElement.innerText || "";
        plainText = plainText.replace(/\$/g, "");
        return plainText.trim();
    };

    const fetchFlashcards = useCallback(async () => {
        const flashcardsRef = collection(firestore, 'flashcards');
        const q = query(flashcardsRef, where('__name__', 'in', flashcardIds));
        const querySnapshot = await getDocs(q);
        const fetchedFlashcards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFlashcards(fetchedFlashcards);
    }, [flashcardIds]);

    useEffect(() => {
        if (!flashcardIds || flashcardIds.length === 0) {
            alert("No flashcards found for this session.");
            navigate(-1);
        } else {
            fetchFlashcards();
        }
    }, [flashcardIds, navigate, fetchFlashcards]);

    useEffect(() => {
        if (flashcards.length > 0) {
            const percentage = ((currentQuestionIndex + 1) / flashcards.length) * 100;
            setProgress(percentage);
        }
    }, [currentQuestionIndex, flashcards.length]);

    const handleSubmitAnswer = async () => {
        if (!answer.trim()) {
            setError("Answer cannot be empty.");
            return;
        }
        setError('');
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

            const data = await response.json();
            const { rating, explanation } = JSON.parse(data.evaluation);

            setProgressMap((prevMap) => ({
                ...prevMap,
                [flashcard.id]: { rating, completed: true },
            }));

            setEvaluationResult({ rating, explanation });
            setIsSubmitDisabled(true);

        } catch (error) {
            console.error('Error evaluating the answer:', error);
        }
    };

    const handleNextQuestion = () => {
        setEvaluationResult(null);
        setIsSubmitDisabled(false);
        setAnswer('');

        if (currentQuestionIndex < flashcards.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setIsCompletionModalOpen(true);
        }
    };

    const handleSaveProgressAndExit = async () => {
        setIsSaving(true);
        try {
            const userId = auth.currentUser?.uid;

            if (!userId || !moduleId) {
                throw new Error("Missing userId or moduleId");
            }

            for (const [flashcardId, progressData] of Object.entries(progressMap)) {
                const flashcardDocRef = doc(firestore, 'flashcards', flashcardId);

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
        const totalQuestions = flashcards.length;
        const completedRatings = Object.values(progressMap).map(entry => entry.rating);
        const perfectScores = completedRatings.filter(score => score === 5).length;
        const scorePercentage = (completedRatings.reduce((acc, score) => acc + score, 0) / (totalQuestions * 5)) * 100;
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
            {/* <Button variant="subtle" onClick={() => setIsQuitModalOpen(true)} style={{ alignSelf: 'flex-start' }}>
                ← Back
            </Button> */}

            <Progress value={progress} style={{ width: '100%',  marginTop: '10px', marginBottom: '40px', }} />

            {flashcards.length > 0 && (
                <div style={{ marginTop: '30px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
                    <h2>Question {currentQuestionIndex + 1}</h2>
                    <FlashcardTextEditor content={flashcards[currentQuestionIndex].question} readOnly={true} />
                </div>
            )}

            <Textarea
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => {
                    setAnswer(e.target.value);
                    if (error) setError('');
                }}
                style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }}
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

            {evaluationResult && (
                <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '800px', width: '100%' }}>
                    <h3>Rating: {evaluationResult.rating}</h3>
                    <p>{evaluationResult.explanation}</p>
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
