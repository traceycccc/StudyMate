// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, Outlet } from 'react-router-dom';
// import { Card, ActionIcon, Menu, Button } from '@mantine/core';
// import { IconChevronRight, IconChevronDown, IconDots } from '@tabler/icons-react';
// import { collection, query, where, onSnapshot } from 'firebase/firestore';
// import { firestore } from '../firebase';

// const ModuleNotesLayout = () => {
//     const { moduleId } = useParams();
//     const navigate = useNavigate();
//     const [sections, setSections] = useState([]);
//     const [selectedNote, setSelectedNote] = useState(null);
//     const [expandedSections, setExpandedSections] = useState({});

//     // Fetch sections of the module
//     useEffect(() => {
//         if (moduleId) {
//             const q = query(collection(firestore, 'sections'), where('moduleId', '==', moduleId));

//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const sectionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setSections(sectionsData);
//             });

//             return () => unsubscribe();
//         }
//     }, [moduleId]);

//     // Toggle section expansion to show notes
//     const toggleSectionExpansion = (sectionId) => {
//         setExpandedSections((prev) => ({
//             ...prev,
//             [sectionId]: !prev[sectionId],
//         }));
//     };

//     // Handle note selection
//     const handleNoteClick = (noteId, type) => {
//         setSelectedNote(noteId);
//         if (type === 'plain') {
//             navigate(`/modules/${moduleId}/notes/${noteId}`);
//         }
//         // Add handling for other types (document, code) as needed
//     };

//     return (
//         <div style={{ display: 'flex', height: '100vh' }}>
//             {/* Notes Navigation Panel */}
//             <div style={{ width: '300px', padding: '20px', backgroundColor: '#f5f5f5', overflowY: 'auto' }}>
//                 <h3>Sections</h3>
//                 {sections.map((section) => (
//                     <Card key={section.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#fff' }}>
//                         <div
//                             style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
//                             onClick={() => toggleSectionExpansion(section.id)}
//                         >
//                             {expandedSections[section.id] ? <IconChevronDown /> : <IconChevronRight />}
//                             <h4 style={{ marginLeft: '10px' }}>{section.name}</h4>
//                         </div>

//                         {/* Show Notes if Section is Expanded */}
//                         {expandedSections[section.id] && (
//                             <div style={{ marginTop: '10px', paddingLeft: '20px' }}>
//                                 {section.notes?.length > 0 ? (
//                                     section.notes.map((note) => (
//                                         <div
//                                             key={note.id}
//                                             style={{ marginBottom: '5px', cursor: 'pointer' }}
//                                             onClick={() => handleNoteClick(note.id, note.type)}
//                                         >
//                                             {note.name}
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p>No notes available.</p>
//                                 )}
//                             </div>
//                         )}
//                     </Card>
//                 ))}
//             </div>

//             {/* Note Content Area */}
//             <div style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default ModuleNotesLayout;




import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { Card, Button } from '@mantine/core';
import { IconChevronRight, IconChevronDown, IconArrowLeft } from '@tabler/icons-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { firestore } from '../firebase';

const ModuleNotesLayout = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    const [sections, setSections] = useState([]);
    const [expandedSections, setExpandedSections] = useState({});

    // Fetch sections of the module
    useEffect(() => {
        if (moduleId) {
            const q = query(collection(firestore, 'sections'), where('moduleId', '==', moduleId));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const sectionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setSections(sectionsData);
            });

            return () => unsubscribe();
        }
    }, [moduleId]);

    // Toggle section expansion to show notes
    const toggleSectionExpansion = (sectionId) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionId]: !prev[sectionId],
        }));
    };

    // Handle note selection
    const handleNoteClick = (noteId, type) => {
        if (type === 'plain') {
            navigate(`/modules/${moduleId}/notes/${noteId}`);
        }
        // Add handling for other types (document, code) as needed
    };

    // Handle back button click to navigate to module overview
    const handleBackClick = () => {
        navigate(`/modules/${moduleId}/overview`);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Notes Navigation Panel */}
            <div style={{ width: '300px', padding: '20px', backgroundColor: '#f5f5f5', overflowY: 'auto' }}>
                {/* Back Button */}
                <Button variant="subtle" onClick={handleBackClick} leftIcon={<IconArrowLeft />} style={{ marginBottom: '20px' }}>
                    Back to Module Overview
                </Button>

                <h3>Sections</h3>
                {sections.map((section) => (
                    <Card key={section.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#fff' }}>
                        <div
                            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                            onClick={() => toggleSectionExpansion(section.id)}
                        >
                            {expandedSections[section.id] ? <IconChevronDown /> : <IconChevronRight />}
                            <h4 style={{ marginLeft: '10px' }}>{section.name}</h4>
                        </div>

                        {/* Show Notes if Section is Expanded */}
                        {expandedSections[section.id] && (
                            <div style={{ marginTop: '10px', paddingLeft: '20px' }}>
                                {section.notes?.length > 0 ? (
                                    section.notes.map((note) => (
                                        <div
                                            key={note.id}
                                            style={{ marginBottom: '5px', cursor: 'pointer' }}
                                            onClick={() => handleNoteClick(note.id, note.type)}
                                        >
                                            {note.name}
                                        </div>
                                    ))
                                ) : (
                                    <p>No notes available.</p>
                                )}
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            {/* Note Content Area */}
            <div style={{ flexGrow: 1, padding: '20px', overflowY: 'auto' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default ModuleNotesLayout;

