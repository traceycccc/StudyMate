//reset to before adding test button
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, ColorInput, Group } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [flashcardsByTag, setFlashcardsByTag] = useState({});
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeTags = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         // Fetch all flashcards grouped by tagId
//         const flashcardsRef = collection(firestore, 'flashcards');
//         const qFlashcards = query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeFlashcards = onSnapshot(qFlashcards, (snapshot) => {
//             const flashcards = {};
//             snapshot.docs.forEach((doc) => {
//                 const flashcard = { id: doc.id, ...doc.data() };
//                 const tagId = flashcard.tagId;
//                 if (!flashcards[tagId]) {
//                     flashcards[tagId] = [];
//                 }
//                 flashcards[tagId].push(flashcard);
//             });
//             setFlashcardsByTag(flashcards);
//         });

//         return () => {
//             unsubscribeTags();
//             unsubscribeFlashcards();
//         };
//     }, [moduleId]);

//     // Add New Tag Section with Validation
//     const handleAddTag = async () => {
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError('');
//     };

//     // Open Modal with Error Reset
//     const openModal = () => {
//         setIsModalOpen(true);
//         setError('');
//     };

//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={openModal}
//             >
//                 + Add Tag Section
//             </Button>

//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setNewTagName('');
//                     setNewTagColor('#FFFFFF');
//                     setError('');
//                 }}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={flashcardsByTag[tag.id] || []} // Pass flashcards by tagId
//                     allTags={tags}
//                     onEditTag={() => setTags((prevTags) => [...prevTags])} // optional callback to refresh
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;



//adding the test modal now, successful  to get the map and filetr things out
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, MultiSelect, NumberInput, ColorInput, Group } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [flashcardsByTag, setFlashcardsByTag] = useState({});
//     const [error, setError] = useState('');


//     const [isTestModalOpen, setIsTestModalOpen] = useState(false);
//     const [tagsWithFlashcards, setTagsWithFlashcards] = useState([]);
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [maxFlashcards, setMaxFlashcards] = useState(0);
//     const [numFlashcardsToTest, setNumFlashcardsToTest] = useState(1);

//     //----------------------------
//     // Handler for "Test Flashcards" button click
//     const handleOpenTestModal = async () => {
//         setIsTestModalOpen(true);
//         console.log("Fetching flashcards and tags...");

//         try {
//             const userId = auth.currentUser?.uid;
//             const flashcardsRef = collection(firestore, 'flashcards');
//             const tagsRef = collection(firestore, 'tags');

//             // Query to get all flashcards belonging to the current user
//             const flashcardsSnapshot = await getDocs(
//                 query(flashcardsRef, where('userId', '==', userId))
//             );

//             // Collect flashcard data and group by tagId
//             const flashcardsByTag = {};
//             flashcardsSnapshot.forEach(doc => {
//                 const flashcard = { id: doc.id, ...doc.data() };
//                 const { tagId } = flashcard;

//                 if (!flashcardsByTag[tagId]) flashcardsByTag[tagId] = [];
//                 flashcardsByTag[tagId].push(flashcard);
//             });
//             console.log("Flashcards grouped by tagId:", flashcardsByTag);

//             // Map of tags that have associated flashcards
//             const tagsWithFlashcardsMap = [];
//             for (let tagId in flashcardsByTag) {
//                 const tagSnapshot = await getDocs(query(tagsRef, where('__name__', '==', tagId)));
//                 if (!tagSnapshot.empty) {
//                     const tagData = tagSnapshot.docs[0].data();
//                     tagsWithFlashcardsMap.push({
//                         tagId,
//                         tagName: tagData.name,
//                         flashcardCount: flashcardsByTag[tagId].length,
//                     });
//                 }
//             }
//             setTagsWithFlashcards(tagsWithFlashcardsMap);
//             console.log("Mapped tags with flashcards:", tagsWithFlashcardsMap);

//         } catch (error) {
//             console.error("Error fetching tags and flashcards:", error);
//         }
//     };

//     // Update max flashcards based on selected tags
//     const handleTagSelectionChange = (selected) => {
//         setSelectedTags(selected);

//         const totalAvailable = tagsWithFlashcards
//             .filter(tag => selected.includes(tag.tagId))
//             .reduce((acc, tag) => acc + tag.flashcardCount, 0);

//         setMaxFlashcards(totalAvailable);
//         setNumFlashcardsToTest(Math.min(numFlashcardsToTest, totalAvailable));
//         console.log("Total available flashcards for selected tags:", totalAvailable);
//     };

    

//     //-------------------------

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeTags = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         // Fetch all flashcards grouped by tagId
//         const flashcardsRef = collection(firestore, 'flashcards');
//         const qFlashcards = query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeFlashcards = onSnapshot(qFlashcards, (snapshot) => {
//             const flashcards = {};
//             snapshot.docs.forEach((doc) => {
//                 const flashcard = { id: doc.id, ...doc.data() };
//                 const tagId = flashcard.tagId;
//                 if (!flashcards[tagId]) {
//                     flashcards[tagId] = [];
//                 }
//                 flashcards[tagId].push(flashcard);
//             });
//             setFlashcardsByTag(flashcards);
//         });

//         return () => {
//             unsubscribeTags();
//             unsubscribeFlashcards();
//         };
//     }, [moduleId]);

//     // Add New Tag Section with Validation
//     const handleAddTag = async () => {
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError('');
//     };

//     // Open Modal with Error Reset
//     const openModal = () => {
//         setIsModalOpen(true);
//         setError('');
//     };

//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={openModal}
//             >
//                 Test Flashcards
//             </Button>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px', marginLeft: '10px', }}
//                 onClick={handleOpenTestModal}
//             >
//                 + Add Tag Section
//             </Button>

//             {/* Modal to set Test Setting */}
//             <Modal
//                 opened={isTestModalOpen}
//                 onClose={() => setIsTestModalOpen(false)}
//                 title="Test Flashcards"
//             >
//                 <MultiSelect
//                     label="Select Tags to Test"
//                     placeholder="Choose tags"
//                     data={tagsWithFlashcards.map(tag => ({
//                         value: tag.tagId,
//                         label: tag.tagName
//                     }))}
//                     onChange={handleTagSelectionChange}
//                 />

//                 <NumberInput
//                     label="Number of Flashcards to Test"
//                     value={numFlashcardsToTest}
//                     onChange={(value) => setNumFlashcardsToTest(value)}
//                     min={1}
//                     max={maxFlashcards}
//                 />
//                 <p>Maximum available: {maxFlashcards}</p>

//                 <Group position="right">
//                     <Button onClick={() => console.log("Selected tags:", selectedTags, "Number to test:", numFlashcardsToTest)}>
//                         Start Test
//                     </Button>
//                 </Group>
//             </Modal>

            

//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setNewTagName('');
//                     setNewTagColor('#FFFFFF');
//                     setError('');
//                 }}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={flashcardsByTag[tag.id] || []} // Pass flashcards by tagId
//                     allTags={tags}
//                     onEditTag={() => setTags((prevTags) => [...prevTags])} // optional callback to refresh
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;








//attempt to prepare the flashcard ids for the test session, we put the control here 
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import { Button, Modal, TextInput, MultiSelect, NumberInput, ColorInput, Group } from '@mantine/core';
// import TagSection from '../components/TagSection';
// import { firestore, auth } from '../firebase';
// import { collection, addDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';

// const Flashcards = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newTagName, setNewTagName] = useState('');
//     const [newTagColor, setNewTagColor] = useState('#FFFFFF');
//     const [tags, setTags] = useState([]);
//     const [flashcardsByTag, setFlashcardsByTag] = useState({});
//     const [error, setError] = useState('');



//     //--------------------------------------------------------------------------------------------------------
//     const [isTestModalOpen, setIsTestModalOpen] = useState(false);
//     const [tagsWithFlashcards, setTagsWithFlashcards] = useState([]);
//     const [selectedTags, setSelectedTags] = useState([]);
//     const [maxFlashcards, setMaxFlashcards] = useState(0);
//     const [numFlashcardsToTest, setNumFlashcardsToTest] = useState(1);

    
//     // Handler for "Test Flashcards" button click
//     const handleOpenTestModal = async () => {
//         setIsTestModalOpen(true);
//         console.log("Fetching flashcards and tags...");

//         try {
//             const userId = auth.currentUser?.uid;
//             const flashcardsRef = collection(firestore, 'flashcards');
//             const tagsRef = collection(firestore, 'tags');

//             // Query to get all flashcards belonging to the current user
//             const flashcardsSnapshot = await getDocs(
//                 query(flashcardsRef, where('userId', '==', userId))
//             );

//             // Collect flashcard data and group by tagId
//             const flashcardsByTag = {};
//             flashcardsSnapshot.forEach(doc => {
//                 const flashcard = { id: doc.id, ...doc.data() };
//                 const { tagId } = flashcard;

//                 if (!flashcardsByTag[tagId]) flashcardsByTag[tagId] = [];
//                 flashcardsByTag[tagId].push(flashcard);
//             });
//             console.log("Flashcards grouped by tagId:", flashcardsByTag);

//             // Map of tags that have associated flashcards
//             const tagsWithFlashcardsMap = [];
//             for (let tagId in flashcardsByTag) {
//                 const tagSnapshot = await getDocs(query(tagsRef, where('__name__', '==', tagId)));
//                 if (!tagSnapshot.empty) {
//                     const tagData = tagSnapshot.docs[0].data();
//                     tagsWithFlashcardsMap.push({
//                         tagId,
//                         tagName: tagData.name,
//                         flashcardCount: flashcardsByTag[tagId].length,
//                     });
//                 }
//             }
//             setTagsWithFlashcards(tagsWithFlashcardsMap);
//             console.log("Mapped tags with flashcards:", tagsWithFlashcardsMap);

//         } catch (error) {
//             console.error("Error fetching tags and flashcards:", error);
//         }
//     };

//     // Update max flashcards based on selected tags
//     const handleTagSelectionChange = (selected) => {
//         setSelectedTags(selected);

//         const totalAvailable = tagsWithFlashcards
//             .filter(tag => selected.includes(tag.tagId))
//             .reduce((acc, tag) => acc + tag.flashcardCount, 0);

//         setMaxFlashcards(totalAvailable);
//         setNumFlashcardsToTest(Math.min(numFlashcardsToTest, totalAvailable));
//         console.log("Total available flashcards for selected tags:", totalAvailable);
//     };



//     //------------------------------------------------------------------------------------------------------------

//     useEffect(() => {
//         const userId = auth.currentUser?.uid;
//         const tagsRef = collection(firestore, 'tags');
//         const q = query(tagsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeTags = onSnapshot(q, (snapshot) => {
//             const fetchedTags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setTags(fetchedTags);
//         });

//         // Fetch all flashcards grouped by tagId
//         const flashcardsRef = collection(firestore, 'flashcards');
//         const qFlashcards = query(flashcardsRef, where('userId', '==', userId), where('moduleId', '==', moduleId));
//         const unsubscribeFlashcards = onSnapshot(qFlashcards, (snapshot) => {
//             const flashcards = {};
//             snapshot.docs.forEach((doc) => {
//                 const flashcard = { id: doc.id, ...doc.data() };
//                 const tagId = flashcard.tagId;
//                 if (!flashcards[tagId]) {
//                     flashcards[tagId] = [];
//                 }
//                 flashcards[tagId].push(flashcard);
//             });
//             setFlashcardsByTag(flashcards);
//         });

//         return () => {
//             unsubscribeTags();
//             unsubscribeFlashcards();
//         };
//     }, [moduleId]);

//     // Add New Tag Section with Validation
//     const handleAddTag = async () => {
//         if (!newTagName.trim()) {
//             setError('Tag name cannot be empty.');
//             return;
//         }

//         const isDuplicate = tags.some(
//             (tag) => tag.name.toLowerCase() === newTagName.trim().toLowerCase()
//         );
//         if (isDuplicate) {
//             setError('Tag name must be unique within this module.');
//             return;
//         }

//         const userId = auth.currentUser?.uid;
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         const newTag = {
//             name: newTagName.trim(),
//             color: newTagColor,
//             moduleId,
//             userId,
//         };

//         await addDoc(collection(firestore, 'tags'), newTag);

//         setIsModalOpen(false);
//         setNewTagName('');
//         setNewTagColor('#FFFFFF');
//         setError('');
//     };

//     // Open Modal with Error Reset
//     const openModal = () => {
//         setIsModalOpen(true);
//         setError('');
//     };

//     const goBack = () => {
//         if (location.state?.from === 'module-overview') {
//             navigate(`/modules/${moduleId}/overview`);
//         } else {
//             navigate('/modules');
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={goBack}>
//                 ← Back
//             </Button>

//             <h1>Flashcards for Module {moduleId}</h1>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px' }}
//                 onClick={openModal}
//             >
//                 Test Flashcards
//             </Button>

//             <Button
//                 color="blue"
//                 size="md"
//                 style={{ marginBottom: '20px', marginLeft: '10px', }}
//                 onClick={handleOpenTestModal}
//             >
//                 + Add Tag Section
//             </Button>

//             {/* Modal to set Test Setting */}
//             <Modal
//                 opened={isTestModalOpen}
//                 onClose={() => setIsTestModalOpen(false)}
//                 title="Test Flashcards"
//             >
//                 <MultiSelect
//                     label="Select Tags to Test"
//                     placeholder="Choose tags"
//                     data={tagsWithFlashcards.map(tag => ({
//                         value: tag.tagId,
//                         label: tag.tagName
//                     }))}
//                     onChange={handleTagSelectionChange}
//                 />

//                 <NumberInput
//                     label="Number of Flashcards to Test"
//                     value={numFlashcardsToTest}
//                     onChange={(value) => setNumFlashcardsToTest(value)}
//                     min={1}
//                     max={maxFlashcards}
//                 />
//                 <p>Maximum available: {maxFlashcards}</p>

//                 <Group position="right">
//                     <Button onClick={() => console.log("Selected tags:", selectedTags, "Number to test:", numFlashcardsToTest)}>
//                         Start Test
//                     </Button>
//                 </Group>
//             </Modal>



//             {/* Modal to Create New Tag Section */}
//             <Modal
//                 opened={isModalOpen}
//                 onClose={() => {
//                     setIsModalOpen(false);
//                     setNewTagName('');
//                     setNewTagColor('#FFFFFF');
//                     setError('');
//                 }}
//                 title="Create New Tag Section"
//             >
//                 <TextInput
//                     label="Tag Name"
//                     placeholder="Enter tag name"
//                     value={newTagName}
//                     onChange={(e) => {
//                         setNewTagName(e.currentTarget.value);
//                         setError('');
//                     }}
//                     error={error}
//                     required
//                 />
//                 <ColorInput
//                     label="Tag Color"
//                     value={newTagColor}
//                     onChange={setNewTagColor}
//                     placeholder="Choose color or enter hex code"
//                     required
//                     style={{ marginTop: '10px' }}
//                 />
//                 <Group position="right" style={{ marginTop: '20px' }}>
//                     <Button onClick={handleAddTag}>Add Tag</Button>
//                 </Group>
//             </Modal>

//             {/* Render each TagSection */}
//             {tags.map((tag) => (
//                 <TagSection
//                     key={tag.id}
//                     tag={tag}
//                     flashcards={flashcardsByTag[tag.id] || []} // Pass flashcards by tagId
//                     allTags={tags}
//                     onEditTag={() => setTags((prevTags) => [...prevTags])} // optional callback to refresh
//                 />
//             ))}
//         </div>
//     );
// };

// export default Flashcards;











// attempt to have the preparation of the test session
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Button, Modal, TextInput, MultiSelect, NumberInput, ColorInput, Group } from '@mantine/core';
import TagSection from '../components/TagSection';
import { firestore, auth } from '../firebase';
import { collection, addDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';

const Flashcards = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('#FFFFFF');
    const [tags, setTags] = useState([]);
    const [flashcardsByTag, setFlashcardsByTag] = useState({});
    const [error, setError] = useState('');



    //--------------------------------------------------------------------------------------------------------
    const [isTestModalOpen, setIsTestModalOpen] = useState(false);
    const [tagsWithFlashcards, setTagsWithFlashcards] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [maxFlashcards, setMaxFlashcards] = useState(0);
    const [numFlashcardsToTest, setNumFlashcardsToTest] = useState(1);
    


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

        const totalAvailable = tagsWithFlashcards
            .filter(tag => selected.includes(tag.tagId))
            .reduce((acc, tag) => acc + tag.flashcardCount, 0);

        setMaxFlashcards(totalAvailable);
        setNumFlashcardsToTest(Math.min(numFlashcardsToTest, totalAvailable));
        console.log("Total available flashcards for selected tags:", totalAvailable);
    };

    // // Handle Start Test button click with random selection
    // const handleStartTest = () => {
    //     const totalToTest = numFlashcardsToTest;
    //     let flashcardIdsToTest = [];

    //     // Calculate fair share for each selected tag
    //     const selectedTagFlashcards = tagsWithFlashcards.filter(tag => selectedTags.includes(tag.tagId));
    //     const totalTags = selectedTagFlashcards.length;

    //     let remainingToAllocate = totalToTest;

    //     selectedTagFlashcards.forEach((tag, index) => {
    //         const availableFlashcards = tag.flashcardCount;

    //         // Calculate fair share based on remaining cards and tags
    //         let share = Math.floor(remainingToAllocate / (totalTags - index));
    //         share = Math.min(share, availableFlashcards); // Limit to available flashcards for this tag

    //         // Randomly select 'share' number of flashcards for this tag
    //         const flashcardsForTag = flashcardsByTag[tag.tagId] || [];
    //         const randomSelected = flashcardsForTag
    //             .sort(() => 0.5 - Math.random()) // Shuffle for randomness
    //             .slice(0, share) // Pick required number
    //             .map(flashcard => flashcard.id); // Get only IDs

    //         flashcardIdsToTest = flashcardIdsToTest.concat(randomSelected);

    //         remainingToAllocate -= randomSelected.length; // Reduce remaining count
    //     });

    //     console.log("Prepared Flashcard IDs for testing:", flashcardIdsToTest);
    //     // Now flashcardIdsToTest holds the balanced, random selection of flashcard IDs
    // };

    // const handleStartTest = () => {
    //     const totalToTest = numFlashcardsToTest;
    //     let flashcardIdsToTest = [];

    //     // Calculate fair share for each selected tag
    //     const selectedTagFlashcards = tagsWithFlashcards.filter(tag => selectedTags.includes(tag.tagId));
    //     const totalTags = selectedTagFlashcards.length;

    //     let remainingToAllocate = totalToTest;

    //     selectedTagFlashcards.forEach((tag, index) => {
    //         const availableFlashcards = tag.flashcardCount;

    //         // Calculate fair share based on remaining cards and tags
    //         let share = Math.floor(remainingToAllocate / (totalTags - index));
    //         share = Math.min(share, availableFlashcards); // Limit to available flashcards for this tag

    //         // Randomly select 'share' number of flashcards for this tag
    //         const flashcardsForTag = flashcardsByTag[tag.tagId] || [];
    //         const randomSelected = flashcardsForTag
    //             .sort(() => 0.5 - Math.random()) // Shuffle for randomness
    //             .slice(0, share) // Pick required number
    //             .map(flashcard => flashcard.id); // Get only IDs

    //         flashcardIdsToTest = flashcardIdsToTest.concat(randomSelected);

    //         remainingToAllocate -= randomSelected.length; // Reduce remaining count
    //     });

    //     console.log("Prepared Flashcard IDs for testing:", flashcardIdsToTest);
    //     // Now flashcardIdsToTest holds the balanced, random selection of flashcard IDs
    // };

    const handleStartTest = () => {
        const totalToTest = numFlashcardsToTest;
        let flashcardIdsToTest = new Set();

        // Step 1: Pick one flashcard from each selected tag
        selectedTags.forEach((tagId) => {
            const flashcardsForTag = flashcardsByTag[tagId] || [];
            if (flashcardsForTag.length > 0) {
                const randomFlashcard = flashcardsForTag[Math.floor(Math.random() * flashcardsForTag.length)];
                flashcardIdsToTest.add(randomFlashcard.id);
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
        setNewTagColor('#FFFFFF');
        setError('');
    };

    // Open Modal with Error Reset
    const openModal = () => {
        setIsModalOpen(true);
        setError('');
    };

    const goBack = () => {
        if (location.state?.from === 'module-overview') {
            navigate(`/modules/${moduleId}/overview`);
        } else {
            navigate('/modules');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Button variant="subtle" onClick={goBack}>
                ← Back
            </Button>

            <h1>Flashcards for Module {moduleId}</h1>

            <Button
                color="blue"
                size="md"
                style={{ marginBottom: '20px' }}
                onClick={openModal}
            >
                Test Flashcards
            </Button>

            <Button
                color="blue"
                size="md"
                style={{ marginBottom: '20px', marginLeft: '10px', }}
                onClick={handleOpenTestModal}
            >
                + Add Tag Section
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

                <NumberInput
                    label="Number of Flashcards to Test"
                    value={numFlashcardsToTest}
                    onChange={(value) => setNumFlashcardsToTest(value)}
                    min={1}
                    max={maxFlashcards}
                />
                <p>Maximum available: {maxFlashcards}</p>

                <Group position="right">
                    <Button onClick={handleStartTest}>
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
                    setNewTagColor('#FFFFFF');
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
                    <Button onClick={handleAddTag}>Add Tag</Button>
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
