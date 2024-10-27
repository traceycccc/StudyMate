// import React, { useState } from 'react';
// import { Button } from '@mantine/core';
// import Section from './Section';

// const NoteOrganizer = () => {
//     const [sections, setSections] = useState([
//         { id: 1, name: 'Introduction to algebra', notes: [{ id: 1, name: 'Note page 1', type: 'note', date: '10 Oct 2024' }, { id: 2, name: 'PDF + Note page 1', type: 'pdf', date: '10 Oct 2024' }] },
//         { id: 2, name: 'Linear Equations', notes: [{ id: 1, name: 'Note page 1', type: 'note', date: '10 Oct 2024' }] },
//     ]);

//     const handleAddSection = () => {
//         // Logic to add a new section
//         const newSection = { id: Date.now(), name: 'New Section', notes: [] };
//         setSections([...sections, newSection]);
//     };

//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h2>Notes</h2>
//                 <Button onClick={handleAddSection}>+ New Section</Button>
//             </div>
//             <div>
//                 {sections.map((section) => (
//                     <Section key={section.id} section={section} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default NoteOrganizer;



// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput } from '@mantine/core';
// import { auth, firestore } from '../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import NoteSection from './NoteSection';

// const NoteOrganizer = ({ moduleId }) => {
//     const [sections, setSections] = useState([]);
//     const [newSectionName, setNewSectionName] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingSection, setEditingSection] = useState(null);
//     const [error, setError] = useState(''); // Validation error message

//     const userId = auth.currentUser?.uid;

//     // Fetch sections for the module
//     useEffect(() => {
//         if (userId && moduleId) {
//             const q = query(
//                 collection(firestore, 'sections'),
//                 where('userId', '==', userId),
//                 where('moduleId', '==', moduleId),
//                 orderBy('createdAt', 'desc')
//             );

//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const sectionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setSections(sectionsData);
//             });

//             return () => unsubscribe(); // Cleanup
//         }
//     }, [userId, moduleId]);

//     // Add new section
//     const handleAddSection = async () => {
//         if (!newSectionName.trim()) return;

//         // Ensure unique name within the module
//         const sectionNames = sections.map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(newSectionName.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         await addDoc(collection(firestore, 'sections'), {
//             name: newSectionName,
//             userId,
//             moduleId,
//             createdAt: new Date(),
//         });

//         // Clear the modal state after successful addition
//         setNewSectionName('');
//         setIsModalOpen(false);
//         setError('');
//     };

//     // Edit section
//     const handleEditSection = async (section) => {
//         if (!editingSection.name.trim()) return;

//         // Ensure unique name within the module
//         const sectionNames = sections.filter((sec) => sec.id !== section.id).map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(editingSection.name.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         const sectionRef = doc(firestore, 'sections', section.id);
//         await updateDoc(sectionRef, { name: editingSection.name });

//         // Clear editing state after successful edit
//         setEditingSection(null);
//         setError('');
//     };

//     // Delete section
//     const handleDeleteSection = async (sectionId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this section?');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'sections', sectionId));
//         }
//     };

//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h2>Notes</h2>
//                 <Button onClick={() => {
//                     setIsModalOpen(true);
//                     setNewSectionName(''); // Reset input when opening modal
//                     setError(''); // Clear error
//                 }}>
//                     + New Section
//                 </Button>
//             </div>

//             <div>
//                 {sections.map((section) => (
//                     <NoteSection
//                         key={section.id}
//                         section={section}
//                         onEditSection={(sec) => {
//                             setEditingSection(sec);
//                             setError(''); // Clear error when opening edit modal
//                         }}
//                         onDeleteSection={handleDeleteSection}
//                     />
//                 ))}
//             </div>

//             {/* Add New Section Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Section">
//                 <TextInput
//                     label="Section Name"
//                     placeholder="Enter section name"
//                     value={newSectionName}
//                     onChange={(e) => {
//                         setNewSectionName(e.currentTarget.value);
//                         setError(''); // Clear error on input change
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={handleAddSection} style={{ marginTop: '10px' }}>
//                     Add Section
//                 </Button>
//             </Modal>

//             {/* Edit Section Modal */}
//             {editingSection && (
//                 <Modal opened={!!editingSection} onClose={() => setEditingSection(null)} title="Edit Section">
//                     <TextInput
//                         label="Section Name"
//                         value={editingSection.name}
//                         onChange={(e) => {
//                             setEditingSection({ ...editingSection, name: e.currentTarget.value });
//                             setError(''); // Clear error on input change
//                         }}
//                         error={error}
//                     />
//                     <Button onClick={() => handleEditSection(editingSection)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default NoteOrganizer;




// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput } from '@mantine/core';
// import { auth, firestore } from '../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import NoteSection from './NoteSection';

// const NoteOrganizer = ({ moduleId }) => {
//     const [sections, setSections] = useState([]);
//     const [newSectionName, setNewSectionName] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingSection, setEditingSection] = useState(null);
//     const [error, setError] = useState(''); // Validation error message

//     const userId = auth.currentUser?.uid;

//     // Fetch sections for the module
//     useEffect(() => {
//         if (userId && moduleId) {
//             const q = query(
//                 collection(firestore, 'sections'),
//                 where('userId', '==', userId),
//                 where('moduleId', '==', moduleId),
//                 orderBy('createdAt', 'desc')
//             );

//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const sectionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setSections(sectionsData);
//             });

//             return () => unsubscribe(); // Cleanup
//         }
//     }, [userId, moduleId]);

//     // Add new section
//     const handleAddSection = async () => {
//         if (!newSectionName.trim()) return;

//         // Ensure unique name within the module
//         const sectionNames = sections.map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(newSectionName.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         await addDoc(collection(firestore, 'sections'), {
//             name: newSectionName,
//             userId,
//             moduleId,
//             createdAt: new Date(),
//         });

//         // Clear the modal state after successful addition
//         setNewSectionName('');
//         setIsModalOpen(false);
//         setError('');
//     };

//     // Edit section
//     const handleEditSection = async (section) => {
//         if (!editingSection.name.trim()) return;

//         // Ensure unique name within the module
//         const sectionNames = sections.filter((sec) => sec.id !== section.id).map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(editingSection.name.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         const sectionRef = doc(firestore, 'sections', section.id);
//         await updateDoc(sectionRef, { name: editingSection.name });

//         // Clear editing state after successful edit
//         setEditingSection(null);
//         setError('');
//     };

//     // Delete section
//     const handleDeleteSection = async (sectionId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this section?');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'sections', sectionId));
//         }
//     };

//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h2>Notes</h2>
//                 <Button onClick={() => {
//                     setIsModalOpen(true);
//                     setNewSectionName(''); // Reset input when opening modal
//                     setError(''); // Clear error
//                 }}>
//                     + New Section
//                 </Button>
//             </div>

//             <div>
//                 {sections.map((section) => (
//                     <NoteSection
//                         key={section.id}
//                         section={section}
//                         onEditSection={(sec) => {
//                             setEditingSection(sec);
//                             setError(''); // Clear error when opening edit modal
//                         }}
//                         onDeleteSection={handleDeleteSection}
//                     />
//                 ))}
//             </div>

//             {/* Add New Section Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Section">
//                 <TextInput
//                     label="Section Name"
//                     placeholder="Enter section name"
//                     value={newSectionName}
//                     onChange={(e) => {
//                         setNewSectionName(e.currentTarget.value);
//                         setError(''); // Clear error on input change
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={handleAddSection} style={{ marginTop: '10px' }}>
//                     Add Section
//                 </Button>
//             </Modal>

//             {/* Edit Section Modal */}
//             {editingSection && (
//                 <Modal opened={!!editingSection} onClose={() => setEditingSection(null)} title="Edit Section">
//                     <TextInput
//                         label="Section Name"
//                         value={editingSection.name}
//                         onChange={(e) => {
//                             setEditingSection({ ...editingSection, name: e.currentTarget.value });
//                             setError(''); // Clear error on input change
//                         }}
//                         error={error}
//                     />
//                     <Button onClick={() => handleEditSection(editingSection)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default NoteOrganizer;


//adding the notes menu logic
// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput } from '@mantine/core';
// import { auth, firestore } from '../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import NoteSection from './NoteSection';

// const NoteOrganizer = ({ moduleId }) => {
//     const [sections, setSections] = useState([]);
//     const [newSectionName, setNewSectionName] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingSection, setEditingSection] = useState(null);
//     const [error, setError] = useState(''); // Validation error message

//     const userId = auth.currentUser?.uid;

//     // Fetch sections for the module
//     useEffect(() => {
//         if (userId && moduleId) {
//             const q = query(
//                 collection(firestore, 'sections'),
//                 where('userId', '==', userId),
//                 where('moduleId', '==', moduleId),
//                 orderBy('createdAt', 'desc')
//             );

//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const sectionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setSections(sectionsData);
//             });

//             return () => unsubscribe(); // Cleanup
//         }
//     }, [userId, moduleId]);

//     // Add new section
//     const handleAddSection = async () => {
//         if (!newSectionName.trim()) return;

//         // Ensure unique name within the module
//         const sectionNames = sections.map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(newSectionName.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         await addDoc(collection(firestore, 'sections'), {
//             name: newSectionName,
//             userId,
//             moduleId,
//             createdAt: new Date(),
//         });

//         // Clear the modal state after successful addition
//         setNewSectionName('');
//         setIsModalOpen(false);
//         setError('');
//     };

//     // Edit section
//     const handleEditSection = async (section) => {
//         if (!editingSection.name.trim()) return;

//         // Ensure unique name within the module
//         const sectionNames = sections.filter((sec) => sec.id !== section.id).map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(editingSection.name.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         const sectionRef = doc(firestore, 'sections', section.id);
//         await updateDoc(sectionRef, { name: editingSection.name });

//         // Clear editing state after successful edit
//         setEditingSection(null);
//         setError('');
//     };

//     // Delete section
//     const handleDeleteSection = async (sectionId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this section?');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'sections', sectionId));
//         }
//     };

//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h2>Notes</h2>
//                 <Button onClick={() => {
//                     setIsModalOpen(true);
//                     setNewSectionName(''); // Reset input when opening modal
//                     setError(''); // Clear error
//                 }}>
//                     + New Section
//                 </Button>
//             </div>

//             <div>
//                 {sections.map((section) => (
//                     <NoteSection
//                         key={section.id}
//                         section={section}
//                         onEditSection={(sec) => {
//                             setEditingSection(sec);
//                             setError(''); // Clear error when opening edit modal
//                         }}
//                         onDeleteSection={handleDeleteSection}
//                     />
//                 ))}
//             </div>

//             {/* Add New Section Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Section">
//                 <TextInput
//                     label="Section Name"
//                     placeholder="Enter section name"
//                     value={newSectionName}
//                     onChange={(e) => {
//                         setNewSectionName(e.currentTarget.value);
//                         setError(''); // Clear error on input change
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={handleAddSection} style={{ marginTop: '10px' }}>
//                     Add Section
//                 </Button>
//             </Modal>

//             {/* Edit Section Modal */}
//             {editingSection && (
//                 <Modal opened={!!editingSection} onClose={() => setEditingSection(null)} title="Edit Section">
//                     <TextInput
//                         label="Section Name"
//                         value={editingSection.name}
//                         onChange={(e) => {
//                             setEditingSection({ ...editingSection, name: e.currentTarget.value });
//                             setError(''); // Clear error on input change
//                         }}
//                         error={error}
//                     />
//                     <Button onClick={() => handleEditSection(editingSection)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default NoteOrganizer;




// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput } from '@mantine/core';
// import { auth, firestore } from '../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import NoteSection from './NoteSection';

// const NoteOrganizer = ({ moduleId }) => {
//     const [sections, setSections] = useState([]);
//     const [newSectionName, setNewSectionName] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingSection, setEditingSection] = useState(null);
//     const [error, setError] = useState(''); // Validation error message

//     const userId = auth.currentUser?.uid;

//     // Fetch sections for the module
//     useEffect(() => {
//         if (userId && moduleId) {
//             const q = query(
//                 collection(firestore, 'sections'),
//                 where('userId', '==', userId),
//                 where('moduleId', '==', moduleId),
//                 orderBy('createdAt', 'desc')
//             );

//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const sectionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setSections(sectionsData);
//             });

//             return () => unsubscribe(); // Cleanup
//         }
//     }, [userId, moduleId]);

//     // Add new section
//     const handleAddSection = async () => {
//         if (!newSectionName.trim()) return;

//         // Ensure unique name within the module
//         const sectionNames = sections.map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(newSectionName.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         await addDoc(collection(firestore, 'sections'), {
//             name: newSectionName,
//             userId,
//             moduleId,
//             createdAt: new Date(),
//         });

//         // Clear the modal state after successful addition
//         setNewSectionName('');
//         setIsModalOpen(false);
//         setError('');
//     };

//     // Edit section
//     const handleEditSection = async (section) => {
//         if (!editingSection.name.trim()) return;

//         // Ensure unique name within the module
//         const sectionNames = sections.filter((sec) => sec.id !== section.id).map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(editingSection.name.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         const sectionRef = doc(firestore, 'sections', section.id);
//         await updateDoc(sectionRef, { name: editingSection.name });

//         // Clear editing state after successful edit
//         setEditingSection(null);
//         setError('');
//     };

//     // Delete section
//     const handleDeleteSection = async (sectionId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this section?');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'sections', sectionId));
//         }
//     };


//     // Add new note to a section
//     const handleAddNote = async (type, name, file) => {
//         if (!name.trim()) {
//             setError('Note name cannot be empty.');
//             return;
//         }

//         try {
//             // Determine the new note data based on its type
//             let noteData = {
//                 name,
//                 type,
//                 createdAt: new Date(),
//             };

//             if (type === 'document' || type === 'code') {
//                 noteData.file = file; // Adding file for document or code notes
//             }

//             // Find the section in which the note should be added
//             const selectedSection = sections.find((section) => section.id === editingSection.id);
//             if (selectedSection) {
//                 // Update Firestore with the new note
//                 const updatedNotes = [...(selectedSection.notes || []), noteData];
//                 const sectionRef = doc(firestore, 'sections', editingSection.id);
//                 await updateDoc(sectionRef, { notes: updatedNotes });

//                 setEditingSection(null); // Resetting editing state after success
//             }
//         } catch (error) {
//             console.error('Error adding note:', error);
//         }
//     };

//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h2>Notes</h2>
//                 <Button onClick={() => {
//                     setIsModalOpen(true);
//                     setNewSectionName(''); // Reset input when opening modal
//                     setError(''); // Clear error
//                 }}>
//                     + New Section
//                 </Button>
//             </div>

//             <div>
//                 {sections.map((section) => (
//                     <NoteSection
//                         key={section.id}
//                         section={section}
//                         onEditSection={(sec) => {
//                             setEditingSection(sec);
//                             setError(''); // Clear error when opening edit modal
//                         }}
//                         onDeleteSection={handleDeleteSection}
//                         onAddNote={handleAddNote} // Pass the add note function to the NoteSection component
//                     />
//                 ))}
//             </div>

//             {/* Add New Section Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Section">
//                 <TextInput
//                     label="Section Name"
//                     placeholder="Enter section name"
//                     value={newSectionName}
//                     onChange={(e) => {
//                         setNewSectionName(e.currentTarget.value);
//                         setError(''); // Clear error on input change
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={handleAddSection} style={{ marginTop: '10px' }}>
//                     Add Section
//                 </Button>
//             </Modal>

//             {/* Edit Section Modal */}
//             {editingSection && (
//                 <Modal opened={!!editingSection} onClose={() => setEditingSection(null)} title="Edit Section">
//                     <TextInput
//                         label="Section Name"
//                         value={editingSection.name}
//                         onChange={(e) => {
//                             setEditingSection({ ...editingSection, name: e.currentTarget.value });
//                             setError(''); // Clear error on input change
//                         }}
//                         error={error}
//                     />
//                     <Button onClick={() => handleEditSection(editingSection)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default NoteOrganizer;




// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput } from '@mantine/core';
// import { auth, firestore } from '../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import NoteSection from './NoteSection';

// const NoteOrganizer = ({ moduleId }) => {
//     const [sections, setSections] = useState([]);
//     const [newSectionName, setNewSectionName] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingSection, setEditingSection] = useState(null);
//     const [error, setError] = useState(''); // Validation error message

//     const userId = auth.currentUser?.uid;

//     // Fetch sections for the module
//     useEffect(() => {
//         if (userId && moduleId) {
//             const q = query(
//                 collection(firestore, 'sections'),
//                 where('userId', '==', userId),
//                 where('moduleId', '==', moduleId),
//                 orderBy('createdAt', 'desc')
//             );

//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const sectionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setSections(sectionsData);
//             });

//             return () => unsubscribe(); // Cleanup
//         }
//     }, [userId, moduleId]);

//     // Add new section
//     const handleAddSection = async () => {
        
//         if (!newSectionName.trim()) {
//             setError('Section name cannot be empty.');
//             return;
//         }

//         // Ensure unique name within the module
//         const sectionNames = sections.map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(newSectionName.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         await addDoc(collection(firestore, 'sections'), {
//             name: newSectionName,
//             userId,
//             moduleId,
//             createdAt: new Date(),
//         });

//         // Clear the modal state after successful addition
//         setNewSectionName('');
//         setIsModalOpen(false);
//         setError('');
//     };

//     // Edit section
//     const handleEditSection = async (section) => {
        
//         if (!editingSection.name.trim()) {
//             setError('Section name cannot be empty.');
//             return;
//         }

//         // Ensure unique name within the module
//         const sectionNames = sections.filter((sec) => sec.id !== section.id).map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(editingSection.name.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         const sectionRef = doc(firestore, 'sections', section.id);
//         await updateDoc(sectionRef, { name: editingSection.name });

//         // Clear editing state after successful edit
//         setEditingSection(null);
//         setError('');
//     };

//     // Delete section
//     const handleDeleteSection = async (sectionId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this section?');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'sections', sectionId));
//         }
//     };



//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h2>Notes</h2>
//                 <Button onClick={() => {
//                     setIsModalOpen(true);
//                     setNewSectionName(''); // Reset input when opening modal
//                     setError(''); // Clear error
//                 }}>
//                     + New Section
//                 </Button>
//             </div>

//             <div>
//                 {sections.map((section) => (
//                     <NoteSection
//                         key={section.id}
//                         section={section}
//                         onEditSection={(sec) => {
//                             setEditingSection(sec);
//                             setError(''); // Clear error when opening edit modal
//                         }}
//                         onDeleteSection={handleDeleteSection}
//                     />
//                 ))}
//             </div>

//             {/* Add New Section Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Section">
//                 <TextInput
//                     label="Section Name"
//                     placeholder="Enter section name"
//                     value={newSectionName}
//                     onChange={(e) => {
//                         setNewSectionName(e.currentTarget.value);
//                         setError(''); // Clear error on input change
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={handleAddSection} style={{ marginTop: '10px' }}>
//                     Add Section
//                 </Button>
//             </Modal>

//             {/* Edit Section Modal */}
//             {editingSection && (
//                 <Modal opened={!!editingSection} onClose={() => setEditingSection(null)} title="Edit Section">
//                     <TextInput
//                         label="Section Name"
//                         value={editingSection.name}
//                         onChange={(e) => {
//                             setEditingSection({ ...editingSection, name: e.currentTarget.value });
//                             setError(''); // Clear error on input change
//                         }}
//                         error={error}
//                     />
//                     <Button onClick={() => handleEditSection(editingSection)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default NoteOrganizer;



//changing firestore rules to make more specific (like under which section, which module)
import React, { useState, useEffect } from 'react';
import { Button, Modal, TextInput } from '@mantine/core';
import { auth, firestore } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import NoteSection from './NoteSection';

const NoteOrganizer = ({ moduleId }) => {
    const [sections, setSections] = useState([]);
    const [newSectionName, setNewSectionName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSection, setEditingSection] = useState(null);
    const [error, setError] = useState(''); // Validation error message

    const userId = auth.currentUser?.uid;

    // Fetch sections for the module
    useEffect(() => {
        if (userId && moduleId) {
            const q = query(
                collection(firestore, 'sections'),
                where('userId', '==', userId),
                where('moduleId', '==', moduleId),
                orderBy('createdAt', 'desc')
            );

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const sectionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setSections(sectionsData);
            });

            return () => unsubscribe(); // Cleanup
        }
    }, [userId, moduleId]);

    // Add new section
    const handleAddSection = async () => {

        if (!newSectionName.trim()) {
            setError('Section name cannot be empty.');
            return;
        }

        // Ensure unique name within the module
        const sectionNames = sections.map((sec) => sec.name.toLowerCase());

        if (sectionNames.includes(newSectionName.toLowerCase())) {
            setError('Section name already exists. Please choose a unique name.');
            return;
        }

        await addDoc(collection(firestore, 'sections'), {
            name: newSectionName,
            userId,
            moduleId,
            createdAt: new Date(),
        });
        

        // Clear the modal state after successful addition
        setNewSectionName('');
        setIsModalOpen(false);
        setError('');
    };

    // Edit section
    const handleEditSection = async (section) => {

        if (!editingSection.name.trim()) {
            setError('Section name cannot be empty.');
            return;
        }

        // Ensure unique name within the module
        const sectionNames = sections.filter((sec) => sec.id !== section.id).map((sec) => sec.name.toLowerCase());

        if (sectionNames.includes(editingSection.name.toLowerCase())) {
            setError('Section name already exists. Please choose a unique name.');
            return;
        }

        const sectionRef = doc(firestore, 'sections', section.id);
        await updateDoc(sectionRef, { name: editingSection.name });

        // Clear editing state after successful edit
        setEditingSection(null);
        setError('');
    };

    // Delete section
    const handleDeleteSection = async (sectionId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this section?');
        if (confirmDelete) {
            await deleteDoc(doc(firestore, 'sections', sectionId));
        }
    };



    return (
        <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Notes</h2>
                <Button onClick={() => {
                    setIsModalOpen(true);
                    setNewSectionName(''); // Reset input when opening modal
                    setError(''); // Clear error
                }}>
                    + New Section
                </Button>
            </div>

            <div>
                {sections.map((section) => (
                    <NoteSection
                        key={section.id}
                        section={section}
                        onEditSection={(sec) => {
                            setEditingSection(sec);
                            setError(''); // Clear error when opening edit modal
                        }}
                        onDeleteSection={handleDeleteSection}
                    />
                ))}
            </div>

            {/* Add New Section Modal */}
            <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Section">
                <TextInput
                    label="Section Name"
                    placeholder="Enter section name"
                    value={newSectionName}
                    onChange={(e) => {
                        setNewSectionName(e.currentTarget.value);
                        setError(''); // Clear error on input change
                    }}
                    error={error}
                />
                <Button onClick={handleAddSection} style={{ marginTop: '10px' }}>
                    Add Section
                </Button>
            </Modal>

            {/* Edit Section Modal */}
            {editingSection && (
                <Modal opened={!!editingSection} onClose={() => setEditingSection(null)} title="Edit Section">
                    <TextInput
                        label="Section Name"
                        value={editingSection.name}
                        onChange={(e) => {
                            setEditingSection({ ...editingSection, name: e.currentTarget.value });
                            setError(''); // Clear error on input change
                        }}
                        error={error}
                    />
                    <Button onClick={() => handleEditSection(editingSection)} style={{ marginTop: '10px' }}>
                        Save Changes
                    </Button>
                </Modal>
            )}
        </div>
    );
};

export default NoteOrganizer;



//trying again for the firestore security
// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput } from '@mantine/core';
// import { auth, firestore } from '../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import NoteSection from './NoteSection';

// const NoteOrganizer = ({ moduleId }) => {
//     const [sections, setSections] = useState([]);
//     const [newSectionName, setNewSectionName] = useState('');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingSection, setEditingSection] = useState(null);
//     const [error, setError] = useState(''); // Validation error message

//     const userId = auth.currentUser?.uid;

//     // Fetch sections for the module
//     useEffect(() => {
//         if (userId && moduleId) {
//             // const q = query(
//             //     collection(firestore, 'sections'),
//             //     where('userId', '==', userId),
//             //     where('moduleId', '==', moduleId),
//             //     orderBy('createdAt', 'desc')
//             // );

//             const q = query(
//                 collection(firestore, `modules/${moduleId}/sections`),
//                 where('userId', '==', userId),
//                 orderBy('createdAt', 'desc')
//             );

//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const sectionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setSections(sectionsData);
//             });

//             return () => unsubscribe(); // Cleanup
//         }
//     }, [userId, moduleId]);

//     // Add new section
//     const handleAddSection = async () => {

//         if (!newSectionName.trim()) {
//             setError('Section name cannot be empty.');
//             return;
//         }

//         // Ensure unique name within the module
//         const sectionNames = sections.map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(newSectionName.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         // await addDoc(collection(firestore, 'sections'), {
//         //     name: newSectionName,
//         //     userId,
//         //     moduleId,
//         //     createdAt: new Date(),
//         // });

//         await addDoc(collection(firestore, `modules/${moduleId}/sections`), {
//             name: newSectionName,
//             userId,
//             moduleId, // Include moduleId for verification in security rules
//             createdAt: new Date(),
//         });


//         // Clear the modal state after successful addition
//         setNewSectionName('');
//         setIsModalOpen(false);
//         setError('');
//     };

//     // Edit section
//     const handleEditSection = async (section) => {

//         if (!editingSection.name.trim()) {
//             setError('Section name cannot be empty.');
//             return;
//         }

//         // Ensure unique name within the module
//         const sectionNames = sections.filter((sec) => sec.id !== section.id).map((sec) => sec.name.toLowerCase());

//         if (sectionNames.includes(editingSection.name.toLowerCase())) {
//             setError('Section name already exists. Please choose a unique name.');
//             return;
//         }

//         const sectionRef = doc(firestore, 'sections', section.id);
//         await updateDoc(sectionRef, { name: editingSection.name });

//         // Clear editing state after successful edit
//         setEditingSection(null);
//         setError('');
//     };

//     // Delete section
//     const handleDeleteSection = async (sectionId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this section?');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'sections', sectionId));
//         }
//     };



//     return (
//         <div style={{ padding: '10px' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h2>Notes</h2>
//                 <Button onClick={() => {
//                     setIsModalOpen(true);
//                     setNewSectionName(''); // Reset input when opening modal
//                     setError(''); // Clear error
//                 }}>
//                     + New Section
//                 </Button>
//             </div>

//             <div>
//                 {sections.map((section) => (
//                     <NoteSection
//                         key={section.id}
//                         section={section}
//                         onEditSection={(sec) => {
//                             setEditingSection(sec);
//                             setError(''); // Clear error when opening edit modal
//                         }}
//                         onDeleteSection={handleDeleteSection}
//                     />
//                 ))}
//             </div>

//             {/* Add New Section Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Section">
//                 <TextInput
//                     label="Section Name"
//                     placeholder="Enter section name"
//                     value={newSectionName}
//                     onChange={(e) => {
//                         setNewSectionName(e.currentTarget.value);
//                         setError(''); // Clear error on input change
//                     }}
//                     error={error}
//                 />
//                 <Button onClick={handleAddSection} style={{ marginTop: '10px' }}>
//                     Add Section
//                 </Button>
//             </Modal>

//             {/* Edit Section Modal */}
//             {editingSection && (
//                 <Modal opened={!!editingSection} onClose={() => setEditingSection(null)} title="Edit Section">
//                     <TextInput
//                         label="Section Name"
//                         value={editingSection.name}
//                         onChange={(e) => {
//                             setEditingSection({ ...editingSection, name: e.currentTarget.value });
//                             setError(''); // Clear error on input change
//                         }}
//                         error={error}
//                     />
//                     <Button onClick={() => handleEditSection(editingSection)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default NoteOrganizer;
