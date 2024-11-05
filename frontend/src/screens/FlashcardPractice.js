// import React, { useState } from 'react';
// import { Card, Text, Button, ActionIcon, Menu, Group } from '@mantine/core';
// import { IconDots } from '@tabler/icons-react';
// import FlashcardTextEditor from '../components/FlashcardTextEditor';
// import { useNavigate } from 'react-router-dom';
// import { doc, deleteDoc } from 'firebase/firestore';
// import { firestore } from '../firebase';

// const FlashcardPractice = ({ flashcards }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [showAnswer, setShowAnswer] = useState(false);
//     const navigate = useNavigate();

//     const currentFlashcard = flashcards[currentIndex];

//     // Toggle answer visibility
//     const toggleAnswerVisibility = () => {
//         setShowAnswer(!showAnswer);
//     };

//     // Navigate to next flashcard
//     const handleNext = () => {
//         setShowAnswer(false);
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
//     };

//     // Navigate to previous flashcard
//     const handlePrevious = () => {
//         setShowAnswer(false);
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
//     };

//     // Handle flashcard deletion
//     const handleDelete = async () => {
//         try {
//             const flashcardRef = doc(firestore, 'flashcards', currentFlashcard.id);
//             await deleteDoc(flashcardRef);
//             // Navigate back after deletion or handle deletion in parent
//             navigate(-1);
//         } catch (error) {
//             console.error("Error deleting flashcard:", error);
//         }
//     };

//     return (
//         <Card shadow="sm" padding="lg" style={{ width: '100%', marginBottom: '10px', textAlign: 'center' }}>
//             {/* Flashcard Content */}
//             <div style={{ marginBottom: '20px' }}>
//                 <Text weight={500}>Question</Text>
//                 <FlashcardTextEditor content={currentFlashcard.question} readOnly={true} />

//                 <Button
//                     variant="outline"
//                     color="blue"
//                     onClick={toggleAnswerVisibility}
//                     style={{ marginTop: '15px' }}
//                 >
//                     {showAnswer ? 'Hide Answer' : 'Show Answer'}
//                 </Button>

//                 {showAnswer && (
//                     <div style={{ marginTop: '20px' }}>
//                         <Text weight={500}>Answer</Text>
//                         <FlashcardTextEditor content={currentFlashcard.answer} readOnly={true} />
//                     </div>
//                 )}
//             </div>

//             {/* Navigation and Menu */}
//             <Group position="apart" style={{ marginTop: '20px' }}>
//                 <Button onClick={handlePrevious} disabled={flashcards.length <= 1}>Previous</Button>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon
//                             style={{
//                                 backgroundColor: 'transparent',
//                                 color: 'black',
//                                 transition: 'background-color 0.3s ease',
//                             }}
//                             radius="xl"
//                             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
//                             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
//                         >
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => navigate(`/edit-flashcard/${currentFlashcard.id}`)}>Edit</Menu.Item>
//                         <Menu.Item color="red" onClick={handleDelete}>Delete</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//                 <Button onClick={handleNext} disabled={flashcards.length <= 1}>Next</Button>
//             </Group>
//         </Card>
//     );
// };

// export default FlashcardPractice;





// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Card, Button, Text, Group } from '@mantine/core';

// const FlashcardPractice = () => {
//     const location = useLocation();
//     const flashcards = location.state?.flashcards || [];  // Default to an empty array if undefined
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [showAnswer, setShowAnswer] = useState(false);
//     const navigate = useNavigate();

//     // Handle empty flashcards array
//     if (flashcards.length === 0) {
//         return (
//             <Card>
//                 <Text>No flashcards available for practice.</Text>
//                 <Button onClick={() => navigate(-1)}>Go Back</Button>
//             </Card>
//         );
//     }

//     const currentFlashcard = flashcards[currentIndex];

//     const handleNext = () => {
//         setShowAnswer(false);
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
//     };

//     const handlePrevious = () => {
//         setShowAnswer(false);
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
//     };

//     const toggleAnswerVisibility = () => setShowAnswer((prev) => !prev);

//     return (
//         <Card shadow="sm" padding="lg" style={{ width: '100%', marginBottom: '10px', textAlign: 'center' }}>
//             <Text weight={500}>Question</Text>
//             <Text>{currentFlashcard.question}</Text>

//             <Button variant="outline" color="blue" onClick={toggleAnswerVisibility} style={{ marginTop: '15px' }}>
//                 {showAnswer ? 'Hide Answer' : 'Show Answer'}
//             </Button>

//             {showAnswer && (
//                 <div style={{ marginTop: '20px' }}>
//                     <Text weight={500}>Answer</Text>
//                     <Text>{currentFlashcard.answer}</Text>
//                 </div>
//             )}

//             {/* Navigation Buttons */}
//             <Group position="apart" style={{ marginTop: '20px' }}>
//                 <Button onClick={handlePrevious} disabled={flashcards.length <= 1}>Previous</Button>
//                 <Button onClick={handleNext} disabled={flashcards.length <= 1}>Next</Button>
//             </Group>
//         </Card>
//     );
// };

// export default FlashcardPractice;





//can work but the text is html

// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { Card, Button, Text, Group } from '@mantine/core';
// import { firestore } from '../firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';

// const FlashcardPractice = () => {
//     const { tagId } = useParams();
//     const location = useLocation();
//     const initialFlashcardId = location.state?.flashcardId;
//     const [flashcards, setFlashcards] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [showAnswer, setShowAnswer] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchFlashcards = async () => {
//             try {
//                 const flashcardsRef = collection(firestore, 'flashcards');
//                 const q = query(flashcardsRef, where('tagId', '==', tagId));
//                 const querySnapshot = await getDocs(q);
//                 const fetchedFlashcards = querySnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));

//                 setFlashcards(fetchedFlashcards);

//                 // Set the initial flashcard based on the clicked flashcard's ID
//                 const initialIndex = fetchedFlashcards.findIndex(fc => fc.id === initialFlashcardId);
//                 setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
//             } catch (error) {
//                 console.error("Error fetching flashcards:", error);
//             }
//         };

//         fetchFlashcards();
//     }, [tagId, initialFlashcardId]);

//     if (flashcards.length === 0) {
//         return (
//             <Card>
//                 <Text>No flashcards available for practice.</Text>
//                 <Button onClick={() => navigate(-1)}>Go Back</Button>
//             </Card>
//         );
//     }

//     const currentFlashcard = flashcards[currentIndex];

//     const handleNext = () => {
//         setShowAnswer(false);
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
//     };

//     const handlePrevious = () => {
//         setShowAnswer(false);
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
//     };

//     const toggleAnswerVisibility = () => setShowAnswer((prev) => !prev);

//     return (
//         <Card shadow="sm" padding="lg" style={{ width: '100%', marginBottom: '10px', textAlign: 'center' }}>
//             <Text weight={500}>Question</Text>
//             <Text>{currentFlashcard.question}</Text>

//             <Button variant="outline" color="blue" onClick={toggleAnswerVisibility} style={{ marginTop: '15px' }}>
//                 {showAnswer ? 'Hide Answer' : 'Show Answer'}
//             </Button>

//             {showAnswer && (
//                 <div style={{ marginTop: '20px' }}>
//                     <Text weight={500}>Answer</Text>
//                     <Text>{currentFlashcard.answer}</Text>
//                 </div>
//             )}

//             {/* Navigation Buttons */}
//             <Group position="apart" style={{ marginTop: '20px' }}>
//                 <Button onClick={handlePrevious} disabled={flashcards.length <= 1}>Previous</Button>
//                 <Button onClick={handleNext} disabled={flashcards.length <= 1}>Next</Button>
//             </Group>
//         </Card>
//     );
// };

// export default FlashcardPractice;





// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { Card, Button, Text, Group, TextInput, ActionIcon } from '@mantine/core';
// import { IconKeyboard } from '@tabler/icons-react';
// import { firestore } from '../firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import FlashcardTextEditor from '../components/FlashcardTextEditor';

// const FlashcardPractice = () => {
//     const { tagId } = useParams();
//     const location = useLocation();
//     const initialFlashcardId = location.state?.flashcardId;
//     const [flashcards, setFlashcards] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [showAnswer, setShowAnswer] = useState(false);
//     const [userAnswer, setUserAnswer] = useState('');
//     const [showTextInput, setShowTextInput] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchFlashcards = async () => {
//             if (!tagId) {
//                 console.error("Error: tagId is undefined.");
//                 return;
//             }

//             try {
//                 const flashcardsRef = collection(firestore, 'flashcards');
//                 const q = query(flashcardsRef, where('tagId', '==', tagId));
//                 const querySnapshot = await getDocs(q);
//                 const fetchedFlashcards = querySnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));

//                 setFlashcards(fetchedFlashcards);

//                 // Set the initial flashcard based on the clicked flashcard's ID
//                 const initialIndex = fetchedFlashcards.findIndex(fc => fc.id === initialFlashcardId);
//                 setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
//             } catch (error) {
//                 console.error("Error fetching flashcards:", error);
//             }
//         };

//         fetchFlashcards();
//     }, [tagId, initialFlashcardId]);

//     if (flashcards.length === 0) {
//         return (
//             <Card>
//                 <Text>No flashcards available for practice.</Text>
//                 <Button onClick={() => navigate(-1)}>Go Back</Button>
//             </Card>
//         );
//     }

//     const currentFlashcard = flashcards[currentIndex];

//     const handleNext = () => {
//         setShowAnswer(false);
//         setUserAnswer('');
//         setShowTextInput(false);
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
//     };

//     const handlePrevious = () => {
//         setShowAnswer(false);
//         setUserAnswer('');
//         setShowTextInput(false);
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
//     };

//     const toggleAnswerVisibility = () => setShowAnswer((prev) => !prev);
//     const toggleTextInput = () => setShowTextInput((prev) => !prev);

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
//             {/* Title */}
//             <Text align="left" weight={600} style={{ width: '100%', marginBottom: '20px' }}>
//                 Flashcards for "{currentFlashcard.tagId}"
//             </Text>

//             <Card shadow="sm" padding="lg" style={{ width: '80%', maxWidth: '600px', textAlign: 'center' }}>
//                 {/* Question Display */}
//                 <Text weight={500} size="lg" style={{ marginBottom: '15px' }}>Question</Text>
//                 <FlashcardTextEditor content={currentFlashcard.question} readOnly={true} />

//                 {/* Optional Text Input Toggle */}
//                 <ActionIcon
//                     onClick={toggleTextInput}
//                     style={{ margin: '20px auto 10px' }}
//                 >
//                     <IconKeyboard size={24} />
//                 </ActionIcon>

//                 {showTextInput && (
//                     <TextInput
//                         placeholder="Type your answer here..."
//                         value={userAnswer}
//                         onChange={(e) => setUserAnswer(e.currentTarget.value)}
//                         style={{ marginBottom: '15px', width: '100%' }}
//                     />
//                 )}

//                 <Button
//                     variant="outline"
//                     color="blue"
//                     onClick={toggleAnswerVisibility}
//                     style={{ marginBottom: '20px' }}
//                 >
//                     {showAnswer ? 'Hide Answer' : 'Show Answer'}
//                 </Button>

//                 {/* Answer Display */}
//                 {showAnswer && (
//                     <>
//                         <Text weight={500} size="lg" style={{ marginTop: '15px' }}>Answer</Text>
//                         <FlashcardTextEditor content={currentFlashcard.answer} readOnly={true} />
//                     </>
//                 )}

//                 {/* Navigation Buttons */}
//                 <Group position="apart" style={{ marginTop: '20px' }}>
//                     <Button onClick={handlePrevious} disabled={flashcards.length <= 1}>Previous</Button>
//                     <Button onClick={handleNext} disabled={flashcards.length <= 1}>Next</Button>
//                 </Group>
//             </Card>
//         </div>
//     );
// };

// export default FlashcardPractice;



// import React, { useState, useEffect } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { Card, Button, Text, Group, TextInput, ActionIcon } from '@mantine/core';
// import { IconKeyboard, IconChevronLeft } from '@tabler/icons-react';
// import { firestore } from '../firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import FlashcardTextEditor from '../components/FlashcardTextEditor';

// const FlashcardPractice = () => {
//     const { tagId } = useParams();
//     const location = useLocation();
//     const initialFlashcardId = location.state?.flashcardId;
//     const tagName = location.state?.tagName || "Flashcards"; // Ensure tag name is correctly passed
//     const [flashcards, setFlashcards] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [showAnswer, setShowAnswer] = useState(false);
//     const [userAnswer, setUserAnswer] = useState('');
//     const [showTextInput, setShowTextInput] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchFlashcards = async () => {
//             if (!tagId) {
//                 console.error("Error: tagId is undefined.");
//                 return;
//             }

//             try {
//                 const flashcardsRef = collection(firestore, 'flashcards');
//                 const q = query(flashcardsRef, where('tagId', '==', tagId));
//                 const querySnapshot = await getDocs(q);
//                 const fetchedFlashcards = querySnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));

//                 setFlashcards(fetchedFlashcards);

//                 // Set the initial flashcard based on the clicked flashcard's ID
//                 const initialIndex = fetchedFlashcards.findIndex(fc => fc.id === initialFlashcardId);
//                 setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
//             } catch (error) {
//                 console.error("Error fetching flashcards:", error);
//             }
//         };

//         fetchFlashcards();
//     }, [tagId, initialFlashcardId]);

//     if (flashcards.length === 0) {
//         return (
//             <Card>
//                 <Text>No flashcards available for practice.</Text>
//                 <Button onClick={() => navigate(-1)}>Go Back</Button>
//             </Card>
//         );
//     }

//     const currentFlashcard = flashcards[currentIndex];

//     const handleNext = () => {
//         setShowAnswer(false);
//         setUserAnswer('');
//         setShowTextInput(false);
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
//     };

//     const handlePrevious = () => {
//         setShowAnswer(false);
//         setUserAnswer('');
//         setShowTextInput(false);
//         setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
//     };

//     const toggleAnswerVisibility = () => setShowAnswer((prev) => !prev);
//     const toggleTextInput = () => setShowTextInput((prev) => !prev);

//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', height: '100vh' }}>
//             {/* Back Button and Title */}
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
//                 <Button
//                     variant="subtle"
//                     onClick={() => navigate(-1)}
//                     style={{ marginRight: '10px' }}
//                     leftIcon={<IconChevronLeft />}
//                 >
//                     Back
//                 </Button>
//                 <Text weight={600} size="xl">
//                     Flashcards for "{tagName}"
//                 </Text>
//             </div>

//             {/* Main Card */}
//             <Card shadow="sm" padding="lg" style={{ flexGrow: 1, width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
//                 {/* Question Display */}
//                 <Text weight={500} size="lg" style={{ marginBottom: '15px' }}>Question</Text>
//                 <FlashcardTextEditor content={currentFlashcard.question} readOnly={true} />

//                 {/* Optional Text Input with Left-Aligned Icon */}
//                 <div style={{ display: 'flex', alignItems: 'center', margin: '20px auto 10px', width: '100%' }}>
//                     <ActionIcon onClick={toggleTextInput} style={{ marginRight: '10px' }}>
//                         <IconKeyboard size={24} />
//                     </ActionIcon>
//                     {showTextInput && (
//                         <TextInput
//                             placeholder="Type your answer here..."
//                             value={userAnswer}
//                             onChange={(e) => setUserAnswer(e.currentTarget.value)}
//                             style={{ width: '100%' }}
//                         />
//                     )}
//                 </div>

//                 <Button
//                     variant="outline"
//                     color="blue"
//                     onClick={toggleAnswerVisibility}
//                     style={{ marginBottom: '20px' }}
//                 >
//                     {showAnswer ? 'Hide Answer' : 'Show Answer'}
//                 </Button>

//                 {/* Answer Display */}
//                 {showAnswer && (
//                     <>
//                         <Text weight={500} size="lg" style={{ marginTop: '15px' }}>Answer</Text>
//                         <FlashcardTextEditor content={currentFlashcard.answer} readOnly={true} />
//                     </>
//                 )}
//             </Card>

//             {/* Navigation Buttons */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '800px', margin: '20px auto' }}>
//                 <Button onClick={handlePrevious} disabled={flashcards.length <= 1}>Previous</Button>
//                 <Button onClick={handleNext} disabled={flashcards.length <= 1}>Next</Button>
//             </div>
//         </div>
//     );
// };

// export default FlashcardPractice;




import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Text, TextInput, ActionIcon } from '@mantine/core';
import { IconKeyboard, IconChevronLeft } from '@tabler/icons-react';
import { firestore } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import FlashcardTextEditor from '../components/FlashcardTextEditor';
import { IconArrowLeft } from '@tabler/icons-react'; 

const FlashcardPractice = () => {
    const { tagId } = useParams();
    const location = useLocation();
    const initialFlashcardId = location.state?.flashcardId;
    // const tagName = location.state?.tagName || "Flashcards"; // Ensure tag name is correctly passed
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [showTextInput, setShowTextInput] = useState(false);
    const [tagName, setTagName] = useState("Flashcards");
    const navigate = useNavigate();

    useEffect(() => {


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


        const fetchFlashcards = async () => {
            if (!tagId) {
                console.error("Error: tagId is undefined.");
                return;
            }

            try {
                const flashcardsRef = collection(firestore, 'flashcards');
                const q = query(flashcardsRef, where('tagId', '==', tagId));
                const querySnapshot = await getDocs(q);
                const fetchedFlashcards = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setFlashcards(fetchedFlashcards);

                // Set the initial flashcard based on the clicked flashcard's ID
                const initialIndex = fetchedFlashcards.findIndex(fc => fc.id === initialFlashcardId);
                setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
            } catch (error) {
                console.error("Error fetching flashcards:", error);
            }
        };

        fetchTagName();
        fetchFlashcards();
    }, [tagId, initialFlashcardId]);

    if (flashcards.length === 0) {
        return (
            <Card>
                <Text>No flashcards available for practice.</Text>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </Card>
        );
    }

    const currentFlashcard = flashcards[currentIndex];

    const handleNext = () => {
        setShowAnswer(false);
        setUserAnswer('');
        setShowTextInput(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        setShowAnswer(false);
        setUserAnswer('');
        setShowTextInput(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const toggleAnswerVisibility = () => setShowAnswer((prev) => !prev);
    const toggleTextInput = () => setShowTextInput((prev) => !prev);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0px', height: '91vh' }}>
            {/* Back Button and Title */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap:'20px', }}>
                {/* <Button
                    variant="subtle"
                    onClick={() => navigate(-1)}
                    style={{ marginRight: '10px' }}
                    leftIcon={<IconChevronLeft />}
                >
                    ← Back
                </Button> */}
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
                {/* Question Display */}
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

                {/* Answer Display */}
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
