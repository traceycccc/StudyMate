import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal, TextInput, MultiSelect, NumberInput, ColorInput, Group, Text } from '@mantine/core';
import TagSection from '../components/TagSection';
import { firestore, auth } from '../firebase';
import { collection, addDoc, getDocs, onSnapshot, query, where, doc, getDoc } from 'firebase/firestore';
import { IconArrowLeft } from '@tabler/icons-react';

const Flashcards = () => {
    const { moduleId } = useParams(); //get from the URL parameters
    const navigate = useNavigate();// set up navigation

    //manage module name, aag and flashcards
    const [moduleName, setModuleName] = useState(''); // New state for module name
    const [isModalOpen, setIsModalOpen] = useState(false); //add tag modal
    const [newTagName, setNewTagName] = useState(''); // new tag name
    const [newTagColor, setNewTagColor] = useState('#228be6'); // default tag color
    const [tags, setTags] = useState([]); //list of tags
    const [error, setError] = useState('');

    // Loading states
    const [isAddingTag, setIsAddingTag] = useState(false);
    const [isStartingTest, setIsStartingTest] = useState(false);



    //--------------------------------------------------------------------------------------------------------
    //states for test flashcards modal
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [flashcardsByTag, setFlashcardsByTag] = useState({}); //object  (step 1: get all flashcards)
    const [tagsWithFlashcards, setTagsWithFlashcards] = useState([]); //array (step 2: get tags for selection)
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagSelectionError, setTagSelectionError] = useState(''); // error state for tag selection
    const [maxFlashcards, setMaxFlashcards] = useState(0);
    const [numFlashcardsToTest, setNumFlashcardsToTest] = useState(1);
    const [numFlashcardsError, setNumFlashcardsError] = useState(''); // error state for flashcard number input



    // Fetch module name based on moduleId
    useEffect(() => {
        const fetchModuleName = async () => {
            try {
                const moduleDoc = await getDoc(doc(firestore, 'modules', moduleId));// Reference to the modules document
                if (moduleDoc.exists()) {
                    setModuleName(moduleDoc.data().name); //set module's name using 'name' into state ModuleName
                } else {
                    console.error("Module not found.");
                }
            } catch (error) {
                console.error("Error fetching module name:", error);
            }
        };
        fetchModuleName();
    }, [moduleId]);

    // open "Test Flashcards" modal and fetch tags and flashcards
    const handleOpenTestModal = async () => {
        setIsTestModalOpen(true);
        console.log("Fetching flashcards and tags...");

        try {
            //(step 1)
            const userId = auth.currentUser?.uid; // Get current user ID
            const flashcardsRef = collection(firestore, 'flashcards'); //reference the flashcards collection
            const tagsRef = collection(firestore, 'tags'); //tags collection too

            // Query to fetch all flashcards belonging to the current user
            const flashcardsSnapshot = await getDocs(
                query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId))
            );

            // create a map to group flashcards by their tagId
            const flashcardsMap = {}; //flashcards mapping an object
            flashcardsSnapshot.forEach(doc => {
                const flashcard = { id: doc.id, ...doc.data() }; //get flashcard data including id
                const { tagId } = flashcard; //extract tagId from data

                // initialise array for a tag if not exist yet in the map
                if (!flashcardsMap[tagId]) flashcardsMap[tagId] = [];
                flashcardsMap[tagId].push(flashcard); //add flashcard into the array of respective tag
            });

            //put the map data into 'flashcardsByTag'
            setFlashcardsByTag(flashcardsMap); //has the data but no tag name
            console.log("Flashcards grouped by tagId:", flashcardsMap);



            //(step 2)
            // get tag names and make an array list of Tags with Flashcard Counts
            const tagsWithFlashcardsMap = [];
            for (let tagId in flashcardsMap) {
                // query, fetch the tag document with the matching tagId to get tags' names
                // match '__name__' (reserved field for document ID) with tagId
                const tagSnapshot = await getDocs(query(tagsRef, where('__name__', '==', tagId), where('moduleId', '==', moduleId)));
                if (!tagSnapshot.empty) {
                    //extracts only the data inside the document, no id
                    //since its an array, to get one and only, still need use [0]
                    const tagData = tagSnapshot.docs[0].data();

                    tagsWithFlashcardsMap.push({
                        tagId,
                        tagName: tagData.name, // get the tag's name from firestore
                        flashcardCount: flashcardsMap[tagId].length, //number of flashcards
                    });
                }
            }

            //put this set of array data to 'tagsWithFlashcards' to display in test settings modal
            setTagsWithFlashcards(tagsWithFlashcardsMap);
            console.log("Mapped tags with flashcards:", tagsWithFlashcardsMap);

        } catch (error) {
            console.error("Error fetching tags and flashcards:", error);
        }
    };


    //handle the selection of tags in the MultiSelect component
    const handleTagSelectionChange = (selected) => {
        setSelectedTags(selected);// Update state with newly selected tags
        setTagSelectionError(''); // Reset error on change

        // calculate the total number of flashcards available for the selected tags
        const totalAvailable = tagsWithFlashcards
            .filter(tag => selected.includes(tag.tagId)) // filter: include only the selected ones
            .reduce((acc, tag) => acc + tag.flashcardCount, 0); // reduce: sum up the flashcard counts for the selected tags into acc

        setMaxFlashcards(totalAvailable); // put the result number in state 
        console.log("Total available flashcards for selected tags:", totalAvailable);
        setNumFlashcardsError(''); // Reset error when max flashcards updates
    };


    const handleStartTest = () => { //uses (step 1) object map to get flashcard IDs
        // if no tags are selected, no tag objects
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
            const totalToTest = numFlashcardsToTest; //Captures the number of flashcards the user wants to test

            //a Set to store unique flashcard IDs for the test (Set is array but ensures no duplicates)
            let flashcardIdsToTest = new Set();

            // Step 1: Pick one flashcard from each selected tag (at least 1 flashcard from each tag)
            selectedTags.forEach((tagId) => { //loop
                //retrieve all that selected tagId's flashcards from (step 1) object map
                const flashcardsForTag = flashcardsByTag[tagId];

                //randomly gets a number (index) from 0 to length of array
                const randomFlashcard = flashcardsForTag[Math.floor(Math.random() * flashcardsForTag.length)];
                flashcardIdsToTest.add(randomFlashcard.id); // Ensures at least one flashcard is added into the Set

            });

            // Step 2: Fill remaining slots randomly from all selected tags, without duplicates
            while (flashcardIdsToTest.size < totalToTest) {// numbers
                //randomly gets a tagId from selectedTags
                const randomTagId = selectedTags[Math.floor(Math.random() * selectedTags.length)];

                //retrieve all that randomTagId's flashcards from (step 1) object map
                const flashcardsForTag = flashcardsByTag[randomTagId];

                // randomly gets a flashcard from the chosen tag, ensuring it isn't already picked
                const randomFlashcard = flashcardsForTag[Math.floor(Math.random() * flashcardsForTag.length)];
                //add the flashcard's id into the Set
                flashcardIdsToTest.add(randomFlashcard.id); // Set prevents duplicates automatically


                //get total available flashcards
                const totalAvailableFlashcards = selectedTags.reduce((acc, tagId) => acc + (flashcardsByTag[tagId]?.length || 0), 0);
                // stop loop when equals to the no. of flashcards to test
                if (flashcardIdsToTest.size >= totalAvailableFlashcards) break; //using >= instad of ==, has 2 conditions (better safe)
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
    // display tags, flashcards
    useEffect(() => {
        const userId = auth.currentUser?.uid;
        const tagsRef = collection(firestore, 'tags');
        const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
        const unsubscribeTags = onSnapshot(q, (snapshot) => {
            const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setTags(fetchedTags); //put all fetched tags data into 'tags' state
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

        const isDuplicate = tags.some( // .some() only needs one match to return true
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
                onClick={() => navigate(`/modules/${moduleId}/overview`, { state: { moduleName } })}
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
                opened={isTestModalOpen}// Controls modal be visible or not
                onClose={() => setIsTestModalOpen(false)} //close modal
                title="Test Flashcards"
            >
                <MultiSelect
                    label="Select Tags to Test"
                    placeholder="Choose tags"
                    data={tagsWithFlashcards.map(tag => ({ //using (step 2: tags for selection)
                        value: tag.tagId,
                        label: tag.tagName
                    }))}
                    onChange={handleTagSelectionChange}// Callback to handle changes when tags are selected or deselected
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
                        setNewTagName(e.currentTarget.value); //real time update
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
                    //props
                    key={tag.id}
                    tag={tag} //that tag's data
                    //flashcards={flashcardsByTag[tag.id] || []} // Pass flashcards by tagId
                    allTags={tags} //mainly for passing all tags data to TagSection.js, for checking duplicate name when edit tag
                    onEditTag={() => setTags((prevTags) => [...prevTags])} // optional callback to refresh
                />
            ))}
        </div>
    );
};

export default Flashcards;