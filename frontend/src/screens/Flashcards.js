import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, TextInput, MultiSelect, NumberInput, ColorInput, Group, Text } from '@mantine/core';
import TagSection from '../components/TagSection';
import { firestore, auth } from '../firebase';
import { collection, addDoc, getDocs, onSnapshot, query, where, doc, getDoc } from 'firebase/firestore';
import { IconArrowLeft } from '@tabler/icons-react';

const Flashcards = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    // const location = useLocation();

    const [moduleName, setModuleName] = useState(''); // New state for module name
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('#228be6');
    const [tags, setTags] = useState([]);
    const [flashcardsByTag, setFlashcardsByTag] = useState({});
    const [error, setError] = useState('');

    // Loading states
    const [isAddingTag, setIsAddingTag] = useState(false);
    const [isStartingTest, setIsStartingTest] = useState(false);



    //--------------------------------------------------------------------------------------------------------
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [tagsWithFlashcards, setTagsWithFlashcards] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagSelectionError, setTagSelectionError] = useState(''); // error state for tag selection
    const [maxFlashcards, setMaxFlashcards] = useState(0);
    const [numFlashcardsToTest, setNumFlashcardsToTest] = useState(1);
    const[numFlashcardsError, setNumFlashcardsError] = useState(''); // error state for flashcard number input



    // Fetch module name based on moduleId
    useEffect(() => {
        const fetchModuleName = async () => {
            try {
                const moduleDoc = await getDoc(doc(firestore, 'modules', moduleId));
                if (moduleDoc.exists()) {
                    setModuleName(moduleDoc.data().name); // Assuming the module name is stored as 'name'
                } else {
                    console.error("Module not found.");
                }
            } catch (error) {
                console.error("Error fetching module name:", error);
            }
        };
        fetchModuleName();
    }, [moduleId]);

    // Handler for "Test Flashcards" button click
    const handleOpenTestModal = async () => {
        setIsTestModalOpen(true);
        console.log("Fetching flashcards and tags...");

        try {
            const userId = auth.currentUser?.uid;
            const flashcardsRef = collection(firestore, 'flashcards');
            const tagsRef = collection(firestore, 'tags');

            // Query to get all flashcards belonging to the current user
            const flashcardsSnapshot = await getDocs(
                query(flashcardsRef, where('userId', '==', userId))
            );

            // Collect flashcard data and group by tagId
            const flashcardsMap = {};
            flashcardsSnapshot.forEach(doc => {
                const flashcard = { id: doc.id, ...doc.data() };
                const { tagId } = flashcard;

                if (!flashcardsMap[tagId]) flashcardsMap[tagId] = [];
                flashcardsMap[tagId].push(flashcard);
            });
            setFlashcardsByTag(flashcardsMap);
            console.log("Flashcards grouped by tagId:", flashcardsMap);

            // Map of tags that have associated flashcards
            const tagsWithFlashcardsMap = [];
            for (let tagId in flashcardsMap) {
                const tagSnapshot = await getDocs(query(tagsRef, where('__name__', '==', tagId)));
                if (!tagSnapshot.empty) {
                    const tagData = tagSnapshot.docs[0].data();
                    tagsWithFlashcardsMap.push({
                        tagId,
                        tagName: tagData.name,
                        flashcardCount: flashcardsMap[tagId].length,
                    });
                }
            }
            setTagsWithFlashcards(tagsWithFlashcardsMap);
            console.log("Mapped tags with flashcards:", tagsWithFlashcardsMap);

        } catch (error) {
            console.error("Error fetching tags and flashcards:", error);
        }
    };

    // Update max flashcards based on selected tags
    const handleTagSelectionChange = (selected) => {
        setSelectedTags(selected);
        setTagSelectionError(''); // Reset error on change

        // Automatically adjusts the number if number exceeds the max number
        const totalAvailable = tagsWithFlashcards
            .filter(tag => selected.includes(tag.tagId))
            .reduce((acc, tag) => acc + tag.flashcardCount, 0);

        setMaxFlashcards(totalAvailable);
        setNumFlashcardsToTest(Math.min(numFlashcardsToTest, totalAvailable));
        console.log("Total available flashcards for selected tags:", totalAvailable); 
        setNumFlashcardsError(''); // Reset error when max flashcards updates
    };


    const handleStartTest = () => {

        if (selectedTags.length === 0) {
            setTagSelectionError('Please select at least one tag to start the test.');
            return;
        }

        console.log('numFlashcardsToTest:', numFlashcardsToTest, 'Type:', typeof numFlashcardsToTest);
        console.log('maxFlashcards:', maxFlashcards, 'Type:', typeof maxFlashcards);


        // user input validation for choosing number of flashcards to test
        if (numFlashcardsToTest < 1 || numFlashcardsToTest > maxFlashcards) {
            setNumFlashcardsError(`Please enter a number between 1 and ${maxFlashcards}.`);
            return;
        }

        try {
            setIsStartingTest(true); // Start loading
            const totalToTest = numFlashcardsToTest;
            let flashcardIdsToTest = new Set();

            // Step 1: Pick one flashcard from each selected tag
            selectedTags.forEach((tagId) => {
                const flashcardsForTag = flashcardsByTag[tagId] || [];
                if (flashcardsForTag.length > 0) {
                    const randomFlashcard = flashcardsForTag[Math.floor(Math.random() * flashcardsForTag.length)];
                    flashcardIdsToTest.add(randomFlashcard.id); // Ensures at least one flashcard is added
                }
            });

            // Step 2: Fill remaining slots randomly from all selected tags, without duplicates
            while (flashcardIdsToTest.size < totalToTest) {
                const randomTagId = selectedTags[Math.floor(Math.random() * selectedTags.length)];
                const flashcardsForTag = flashcardsByTag[randomTagId] || [];

                // Pick a random flashcard from the chosen tag, ensuring it isn't already picked
                if (flashcardsForTag.length > 0) {
                    const randomFlashcard = flashcardsForTag[Math.floor(Math.random() * flashcardsForTag.length)];
                    flashcardIdsToTest.add(randomFlashcard.id); // Set prevents duplicates automatically
                }

                // Break if we run out of flashcards to prevent infinite loop
                const totalAvailableFlashcards = selectedTags.reduce((acc, tagId) => acc + (flashcardsByTag[tagId]?.length || 0), 0);
                if (flashcardIdsToTest.size >= totalAvailableFlashcards) break;
            }

            // Convert the set to an array for logging or further usage
            flashcardIdsToTest = Array.from(flashcardIdsToTest);

            console.log("Prepared Flashcard IDs for testing:", flashcardIdsToTest);
            // Now flashcardIdsToTest holds the required selection of flashcard IDs

            // Only navigate if there are flashcard IDs to test
            if (flashcardIdsToTest.length > 0) {
                navigate('/test-session', { state: { flashcardIds: flashcardIdsToTest, moduleId } });
            } else {
                console.warn("No flashcards selected for the test.");
                alert("Please select flashcards to start the test.");
            }
        } catch (error) {
            console.error("Error starting test:", error);
        } finally {
            setIsStartingTest(false); // End loading
        }
    };





    //------------------------------------------------------------------------------------------------------------

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        const tagsRef = collection(firestore, 'tags');
        const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
        const unsubscribeTags = onSnapshot(q, (snapshot) => {
            const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTags(fetchedTags);
        });

        // Fetch all flashcards grouped by tagId
        const flashcardsRef = collection(firestore, 'flashcards');
        const qFlashcards = query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
        const unsubscribeFlashcards = onSnapshot(qFlashcards, (snapshot) => {
            const flashcards = {};
            snapshot.docs.forEach((doc) => {
                const flashcard = { id: doc.id, ...doc.data() };
                const tagId = flashcard.tagId;
                if (!flashcards[tagId]) {
                    flashcards[tagId] = [];
                }
                flashcards[tagId].push(flashcard);
            });
            setFlashcardsByTag(flashcards);
        });

        return () => {
            unsubscribeTags();
            unsubscribeFlashcards();
        };
    }, [moduleId]);

    // Add New Tag Section with Validation
    const handleAddTag = async () => {
        if (!newTagName.trim()) {
            setError('Tag name cannot be empty.');
            return;
        }

        const isDuplicate = tags.some(
            (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
        );
        if (isDuplicate) {
            setError('Tag name must be unique within this module.');
            return;
        }

        try {
            setIsAddingTag(true); // Start loading
            const userId = auth.currentUser?.uid;
            if (!userId) {
                console.error("User not logged in.");
                return;
            }

            const newTag = {
                name: newTagName.trim(),
                color: newTagColor,
                moduleId,
                userId,
            };

            await addDoc(collection(firestore, 'tags'), newTag);

            setIsModalOpen(false);
            setNewTagName('');
            setNewTagColor('#228be6');
            setError('');
        } catch (error) {
            console.error("Error adding tag:", error);
        } finally {
            setIsAddingTag(false); // End loading
        }
    };

    // Open Modal with Error Reset
    const openModal = () => {
        setIsModalOpen(true);
        setError('');
    };



    return (
        <div style={{ padding: '0px 0px 0px 0px' }}>
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

            <h1>Flashcards for Module {moduleName}</h1>

            <Button
                color="blue"
                size="md"
                style={{ marginBottom: '20px' }}
                onClick={openModal}
            >
                + Add Tag Section
            </Button>

            <Button
                color="blue"
                size="md"
                style={{ marginBottom: '20px', marginLeft: '10px', }}
                onClick={handleOpenTestModal}
            >
                Test Flashcards
            </Button>

            {/* Modal to set Test Setting */}
            <Modal
                opened={isTestModalOpen}
                onClose={() => setIsTestModalOpen(false)}
                title="Test Flashcards"
            >
                <MultiSelect
                    label="Select Tags to Test"
                    placeholder="Choose tags"
                    data={tagsWithFlashcards.map(tag => ({
                        value: tag.tagId,
                        label: tag.tagName
                    }))}
                    onChange={handleTagSelectionChange}
                />
                {/* error message for no tags selected */}
                {tagSelectionError && <Text color="red" size="sm">{tagSelectionError}</Text>}

                <NumberInput
                    label="Number of Flashcards to Test"
                    value={numFlashcardsToTest}
                    onChange={(value) => {
                        setNumFlashcardsToTest(value)
                        setNumFlashcardsError(value < 1 || value > maxFlashcards ? `Please enter a number between 1 and ${maxFlashcards}.` : '');
                    }}
                    // min={1}  // Automatically enforces the minimum value
                    // max={maxFlashcards}// Automatically enforces the maximum value
                />
                {numFlashcardsError && <Text color="red" size="sm">{numFlashcardsError}</Text>}
                <p>Maximum available: {maxFlashcards}</p>

                <Group position="right">
                    <Button 
                        onClick={handleStartTest}
                        loading={isStartingTest}
                    >
                        Start Test
                    </Button>
                </Group>
            </Modal>



            {/* Modal to Create New Tag Section */}
            <Modal
                opened={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setNewTagName('');
                    setNewTagColor('#228be6');
                    setError('');
                }}
                title="Create New Tag Section"
            >
                <TextInput
                    label="Tag Name"
                    placeholder="Enter tag name"
                    value={newTagName}
                    onChange={(e) => {
                        setNewTagName(e.currentTarget.value);
                        setError('');
                    }}
                    error={error}
                    required
                />
                <ColorInput
                    label="Tag Color"
                    value={newTagColor}
                    onChange={setNewTagColor}
                    placeholder="Choose color or enter hex code"
                    required
                    style={{ marginTop: '10px' }}
                />
                <Group position="right" style={{ marginTop: '20px' }}>
                    <Button 
                        onClick={handleAddTag}
                        loading={isAddingTag}
                    >
                    Add Tag
                    </Button>
                </Group>
            </Modal>

            {/* Render each TagSection */}
            {tags.map((tag) => (
                <TagSection
                    key={tag.id}
                    tag={tag}
                    flashcards={flashcardsByTag[tag.id] || []} // Pass flashcards by tagId
                    allTags={tags}
                    onEditTag={() => setTags((prevTags) => [...prevTags])} // optional callback to refresh
                />
            ))}
        </div>
    );
};

export default Flashcards;