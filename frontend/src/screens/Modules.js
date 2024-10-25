// import React from 'react';
// import { Text } from '@mantine/core';

// const Modules = () => {
//     return <Text size="xl">This is the Modules page</Text>;
// };

// export default Modules;



// import React from 'react';
// import { Button } from '@mantine/core';

// const Modules = ({ setActivePage, setNavVisible }) => {
//     const handleGoToPageA = () => {
//         setNavVisible(false); // Hide the navigation bar
//         setActivePage('pageA'); // Navigate to pageA
//     };

//     return (
//         <div>
//             <h1>Modules Page</h1>
//             <Button onClick={handleGoToPageA}>Go to Page A</Button>
//         </div>
//     );
// };

// export default Modules;



// import React, { useState } from 'react';
// import { Button, Modal, TextInput, Select } from '@mantine/core';

// // Mock data for existing modules and notes
// const initialModules = [
//     {
//         id: 1,
//         name: 'Introduction to Algebra',
//         notes: [
//             { id: 1, name: 'Note page 1', type: 'Plain' },
//             { id: 2, name: 'PDF + Note page 1', type: 'PDF' },
//         ],
//     },
//     {
//         id: 2,
//         name: 'Linear Equations',
//         notes: [
//             { id: 1, name: 'Note page 1', type: 'Plain' },
//             { id: 2, name: 'Code + Note page 1', type: 'Code' },
//         ],
//     },
// ];

// const Modules = () => {
//     const [modules, setModules] = useState(initialModules); // State to store modules
//     const [newModuleName, setNewModuleName] = useState(''); // State for new module name
//     const [isModalOpen, setIsModalOpen] = useState(false); // Modal control
//     const [selectedModule, setSelectedModule] = useState(null); // Currently selected module for actions
//     const [newNoteType, setNewNoteType] = useState(''); // New note type

//     // Function to add a new module
//     const handleAddModule = () => {
//         setModules([...modules, { id: modules.length + 1, name: newModuleName, notes: [] }]);
//         setNewModuleName('');
//         setIsModalOpen(false);
//     };

//     // Function to add a new note to a module
//     const handleAddNote = (moduleId) => {
//         const updatedModules = modules.map((mod) =>
//             mod.id === moduleId
//                 ? {
//                     ...mod,
//                     notes: [...mod.notes, { id: mod.notes.length + 1, name: `New Note ${mod.notes.length + 1}`, type: newNoteType }],
//                 }
//                 : mod
//         );
//         setModules(updatedModules);
//     };

//     return (
//         <div>
//             <h1>Modules</h1>
//             <Button onClick={() => setIsModalOpen(true)}>Add New Module</Button>

//             {modules.map((module) => (
//                 <div key={module.id} style={{ marginTop: '20px' }}>
//                     <h2>{module.name}</h2>
//                     {module.notes.map((note) => (
//                         <div key={note.id}>
//                             <p>
//                                 {note.name} - {note.type}
//                             </p>
//                         </div>
//                     ))}
//                     <Select
//                         placeholder="Select note type"
//                         value={newNoteType}
//                         onChange={setNewNoteType}
//                         data={[
//                             { value: 'Plain', label: 'Plain Note' },
//                             { value: 'PDF', label: 'PDF + Note' },
//                             { value: 'Code', label: 'Code + Note' },
//                         ]}
//                     />
//                     <Button onClick={() => handleAddNote(module.id)}>Add New Note</Button>
//                 </div>
//             ))}

//             {/* Modal for adding a new module */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Module">
//                 <TextInput
//                     label="Module Name"
//                     placeholder="Enter module name"
//                     value={newModuleName}
//                     onChange={(e) => setNewModuleName(e.currentTarget.value)}
//                 />
//                 <Button onClick={handleAddModule} style={{ marginTop: '10px' }}>
//                     Add Module
//                 </Button>
//             </Modal>
//         </div>
//     );
// };

// export default Modules;



// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput, ColorInput, Card, Menu, ActionIcon } from '@mantine/core';
// import { IconDotsVertical } from '@tabler/icons-react';
// import { auth, firestore } from '../firebase'; // Import Firebase
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';

// // Define a new module page component
// const Modules = () => {
//     const [modules, setModules] = useState([]); // State for storing user modules
//     const [newModuleName, setNewModuleName] = useState(''); // State for new module name
//     const [newModuleColor, setNewModuleColor] = useState('#FFFFFF'); // Default white color
//     const [isModalOpen, setIsModalOpen] = useState(false); // Modal control for adding new module
//     const [editingModule, setEditingModule] = useState(null); // State for editing an existing module

//     const userId = auth.currentUser?.uid; // Get current user ID

//     // Fetch modules from Firestore on component mount
//     useEffect(() => {
//         if (userId) {
//             const q = query(collection(firestore, 'modules'), where('userId', '==', userId));
//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setModules(modulesData);
//             });
//             return () => unsubscribe(); // Clean up listener on unmount
//         }
//     }, [userId]);

//     // Add new module to Firestore
//     const handleAddModule = async () => {
//         if (!newModuleName.trim()) return; // Prevent empty module names
//         await addDoc(collection(firestore, 'modules'), {
//             name: newModuleName,
//             color: newModuleColor,
//             userId, // Associate the module with the logged-in user
//         });
//         setNewModuleName('');
//         setNewModuleColor('#FFFFFF');
//         setIsModalOpen(false);
//     };

//     // Update an existing module
//     const handleEditModule = async (moduleId) => {
//         if (editingModule && editingModule.name.trim()) {
//             const moduleRef = doc(firestore, 'modules', moduleId);
//             await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
//             setEditingModule(null);
//         }
//     };

//     // Delete module from Firestore
//     const handleDeleteModule = async (moduleId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this module? All notes will be deleted.');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'modules', moduleId));
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Modules</h1>
//             <Button onClick={() => setIsModalOpen(true)}>+ New Module</Button>

//             {/* Render Modules */}
//             <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
//                 {modules.map((module) => (
//                     <Card key={module.id} style={{ backgroundColor: module.color, width: '200px', position: 'relative' }}>
//                         <h3>{module.name}</h3>
//                         {/* 3 Dot Menu for Module Actions */}
//                         <Menu position="bottom-end">
//                             <Menu.Target>
//                                 <ActionIcon style={{ position: 'absolute', top: '10px', right: '10px' }}>
//                                     <IconDotsVertical />
//                                 </ActionIcon>
//                             </Menu.Target>
//                             <Menu.Dropdown>
//                                 <Menu.Item onClick={() => setEditingModule(module)}>Edit</Menu.Item>
//                                 <Menu.Item onClick={() => handleDeleteModule(module.id)} color="red">
//                                     Delete
//                                 </Menu.Item>
//                             </Menu.Dropdown>
//                         </Menu>
//                     </Card>
//                 ))}
//             </div>

//             {/* Add New Module Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Module">
//                 <TextInput
//                     label="Module Name"
//                     placeholder="Enter module name"
//                     value={newModuleName}
//                     onChange={(e) => setNewModuleName(e.currentTarget.value)}
//                 />
//                 <ColorInput
//                     label="Module Color"
//                     value={newModuleColor}
//                     onChange={setNewModuleColor}
//                     placeholder="Choose color or enter hex code"
//                 />
//                 <Button onClick={handleAddModule} style={{ marginTop: '10px' }}>
//                     Add Module
//                 </Button>
//             </Modal>

//             {/* Edit Module Modal */}
//             {editingModule && (
//                 <Modal opened={!!editingModule} onClose={() => setEditingModule(null)} title="Edit Module">
//                     <TextInput
//                         label="Module Name"
//                         value={editingModule.name}
//                         onChange={(e) => setEditingModule({ ...editingModule, name: e.currentTarget.value })}
//                     />
//                     <ColorInput
//                         label="Module Color"
//                         value={editingModule.color}
//                         onChange={(color) => setEditingModule({ ...editingModule, color })}
//                     />
//                     <Button onClick={() => handleEditModule(editingModule.id)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default Modules;





// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput, ColorInput, Card, Menu, ActionIcon } from '@mantine/core';
// import { IconDotsVertical } from '@tabler/icons-react';
// import { auth, firestore } from '../firebase'; // Import Firebase
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// // Define a new module page component
// const Modules = () => {
//     const [modules, setModules] = useState([]); // State for storing user modules
//     const [newModuleName, setNewModuleName] = useState(''); // State for new module name
//     const [newModuleColor, setNewModuleColor] = useState('#FFFFFF'); // Default white color
//     const [isModalOpen, setIsModalOpen] = useState(false); // Modal control for adding new module
//     const [editingModule, setEditingModule] = useState(null); // State for editing an existing module

//     const userId = auth.currentUser?.uid; // Get current user ID
//     const navigate = useNavigate(); // Initialize navigate

//     // Fetch modules from Firestore on component mount
//     useEffect(() => {
//         if (userId) {
//             const q = query(collection(firestore, 'modules'), where('userId', '==', userId));
//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setModules(modulesData);
//             });
//             return () => unsubscribe(); // Clean up listener on unmount
//         }
//     }, [userId]);

//     // Add new module to Firestore
//     const handleAddModule = async () => {
//         if (!newModuleName.trim()) return; // Prevent empty module names
//         await addDoc(collection(firestore, 'modules'), {
//             name: newModuleName,
//             color: newModuleColor,
//             userId, // Associate the module with the logged-in user
//         });
//         setNewModuleName('');
//         setNewModuleColor('#FFFFFF');
//         setIsModalOpen(false);
//     };

//     // Update an existing module
//     const handleEditModule = async (moduleId) => {
//         if (editingModule && editingModule.name.trim()) {
//             const moduleRef = doc(firestore, 'modules', moduleId);
//             await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
//             setEditingModule(null);
//         }
//     };

//     // Delete module from Firestore
//     const handleDeleteModule = async (moduleId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this module? All notes will be deleted.');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'modules', moduleId));
//         }
//     };

//     // When user clicks a module card, navigate to its overview
//     const handleModuleClick = (module) => {
//         navigate(`/module-overview`, { state: { moduleName: module.name } });
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Modules</h1>
//             <Button onClick={() => setIsModalOpen(true)}>+ New Module</Button>

//             {/* Render Modules */}
//             <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
//                 {modules.map((module) => (
//                     <Card
//                         key={module.id}
//                         style={{ backgroundColor: module.color, width: '200px', position: 'relative' }}
//                         onClick={() => handleModuleClick(module)} // Navigate to overview on click
//                     >
//                         <h3>{module.name}</h3>
//                         {/* 3 Dot Menu for Module Actions */}
//                         <Menu position="bottom-end">
//                             <Menu.Target>
//                                 <ActionIcon style={{ position: 'absolute', top: '10px', right: '10px' }}>
//                                     <IconDotsVertical />
//                                 </ActionIcon>
//                             </Menu.Target>
//                             <Menu.Dropdown>
//                                 <Menu.Item onClick={() => setEditingModule(module)}>Edit</Menu.Item>
//                                 <Menu.Item onClick={() => handleDeleteModule(module.id)} color="red">
//                                     Delete
//                                 </Menu.Item>
//                             </Menu.Dropdown>
//                         </Menu>
//                     </Card>
//                 ))}
//             </div>

//             {/* Add New Module Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Module">
//                 <TextInput
//                     label="Module Name"
//                     placeholder="Enter module name"
//                     value={newModuleName}
//                     onChange={(e) => setNewModuleName(e.currentTarget.value)}
//                 />
//                 <ColorInput
//                     label="Module Color"
//                     value={newModuleColor}
//                     onChange={setNewModuleColor}
//                     placeholder="Choose color or enter hex code"
//                 />
//                 <Button onClick={handleAddModule} style={{ marginTop: '10px' }}>
//                     Add Module
//                 </Button>
//             </Modal>

//             {/* Edit Module Modal */}
//             {editingModule && (
//                 <Modal opened={!!editingModule} onClose={() => setEditingModule(null)} title="Edit Module">
//                     <TextInput
//                         label="Module Name"
//                         value={editingModule.name}
//                         onChange={(e) => setEditingModule({ ...editingModule, name: e.currentTarget.value })}
//                     />
//                     <ColorInput
//                         label="Module Color"
//                         value={editingModule.color}
//                         onChange={(color) => setEditingModule({ ...editingModule, color })}
//                     />
//                     <Button onClick={() => handleEditModule(editingModule.id)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default Modules;





// //new, to fix  navigation pronb, taking away dashboard
// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput, ColorInput, Card, Menu, ActionIcon } from '@mantine/core';
// import { IconDotsVertical } from '@tabler/icons-react';
// import { auth, firestore } from '../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom';

// const Modules = () => {
//     const [modules, setModules] = useState([]);
//     const [newModuleName, setNewModuleName] = useState('');
//     const [newModuleColor, setNewModuleColor] = useState('#FFFFFF');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingModule, setEditingModule] = useState(null);

//     const userId = auth.currentUser?.uid;
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (userId) {
//             const q = query(collection(firestore, 'modules'), where('userId', '==', userId));
//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setModules(modulesData);
//             });
//             return () => unsubscribe();
//         }
//     }, [userId]);

//     const handleAddModule = async () => {
//         if (!newModuleName.trim()) return;
//         await addDoc(collection(firestore, 'modules'), {
//             name: newModuleName,
//             color: newModuleColor,
//             userId,
//         });
//         setNewModuleName('');
//         setNewModuleColor('#FFFFFF');
//         setIsModalOpen(false);
//     };

//     const handleEditModule = async (moduleId) => {
//         if (editingModule && editingModule.name.trim()) {
//             const moduleRef = doc(firestore, 'modules', moduleId);
//             await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
//             setEditingModule(null);
//         }
//     };

//     const handleDeleteModule = async (moduleId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this module? All notes will be deleted.');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'modules', moduleId));
//         }
//     };

//     const handleModuleClick = (module) => {
//         navigate(`/modules/${module.id}/overview`, { state: { moduleName: module.name } });
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Modules</h1>
//             <Button onClick={() => setIsModalOpen(true)}>+ New Module</Button>

//             <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
//                 {modules.map((module) => (
//                     <Card
//                         key={module.id}
//                         style={{ backgroundColor: module.color, width: '200px', position: 'relative' }}
//                         onClick={() => handleModuleClick(module)}
//                     >
//                         <h3>{module.name}</h3>
//                         <Menu position="bottom-end">
//                             <Menu.Target>
//                                 <ActionIcon style={{ position: 'absolute', top: '10px', right: '10px' }}>
//                                     <IconDotsVertical />
//                                 </ActionIcon>
//                             </Menu.Target>
//                             <Menu.Dropdown>
//                                 <Menu.Item onClick={() => setEditingModule(module)}>Edit</Menu.Item>
//                                 <Menu.Item onClick={() => handleDeleteModule(module.id)} color="red">
//                                     Delete
//                                 </Menu.Item>
//                             </Menu.Dropdown>
//                         </Menu>
//                     </Card>
//                 ))}
//             </div>

//             {/* Add New Module Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Module">
//                 <TextInput
//                     label="Module Name"
//                     placeholder="Enter module name"
//                     value={newModuleName}
//                     onChange={(e) => setNewModuleName(e.currentTarget.value)}
//                 />
//                 <ColorInput
//                     label="Module Color"
//                     value={newModuleColor}
//                     onChange={setNewModuleColor}
//                     placeholder="Choose color or enter hex code"
//                 />
//                 <Button onClick={handleAddModule} style={{ marginTop: '10px' }}>
//                     Add Module
//                 </Button>
//             </Modal>

//             {/* Edit Module Modal */}
//             {editingModule && (
//                 <Modal opened={!!editingModule} onClose={() => setEditingModule(null)} title="Edit Module">
//                     <TextInput
//                         label="Module Name"
//                         value={editingModule.name}
//                         onChange={(e) => setEditingModule({ ...editingModule, name: e.currentTarget.value })}
//                     />
//                     <ColorInput
//                         label="Module Color"
//                         value={editingModule.color}
//                         onChange={(color) => setEditingModule({ ...editingModule, color })}
//                     />
//                     <Button onClick={() => handleEditModule(editingModule.id)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default Modules;





// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput, ColorInput, Card, Menu, ActionIcon } from '@mantine/core';
// import { IconDotsVertical } from '@tabler/icons-react';
// import { auth, firestore } from '../firebase'; // Import Firebase
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const Modules = () => {
//     const [modules, setModules] = useState([]); // State for storing user modules
//     const [newModuleName, setNewModuleName] = useState(''); // State for new module name
//     const [newModuleColor, setNewModuleColor] = useState('#FFFFFF'); // Default white color
//     const [isModalOpen, setIsModalOpen] = useState(false); // Modal control for adding new module
//     const [editingModule, setEditingModule] = useState(null); // State for editing an existing module

//     const userId = auth.currentUser?.uid; // Get current user ID
//     const navigate = useNavigate(); // Initialize navigate

//     // Fetch modules from Firestore on component mount
//     useEffect(() => {
//         if (userId) {
//             const q = query(collection(firestore, 'modules'), where('userId', '==', userId));
//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//                 setModules(modulesData);
//             });
//             return () => unsubscribe(); // Clean up listener on unmount
//         }
//     }, [userId]);

//     // Add new module to Firestore
//     const handleAddModule = async () => {
//         if (!newModuleName.trim()) return; // Prevent empty module names
//         await addDoc(collection(firestore, 'modules'), {
//             name: newModuleName,
//             color: newModuleColor,
//             userId, // Associate the module with the logged-in user
//             createdAt: new Date(), // Store the creation date
//         });
//         setNewModuleName('');
//         setNewModuleColor('#FFFFFF');
//         setIsModalOpen(false);
//     };

//     // Update an existing module
//     const handleEditModule = async (moduleId) => {
//         if (editingModule && editingModule.name.trim()) {
//             const moduleRef = doc(firestore, 'modules', moduleId);
//             await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
//             setEditingModule(null);
//         }
//     };

//     // Delete module from Firestore
//     const handleDeleteModule = async (moduleId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this module? All notes will be deleted.');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'modules', moduleId));
//         }
//     };

//     // When user clicks the top part of the module card, navigate to its overview
//     const handleModuleClick = (module) => {
//         navigate(`/modules/${module.id}/overview`, { state: { moduleName: module.name } });
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h1>Modules</h1>
//             <Button onClick={() => setIsModalOpen(true)}>+ New Module</Button>

//             {/* Render Modules */}
//             <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
//                 {modules.map((module) => (
//                     <Card key={module.id} style={{ width: '200px', position: 'relative', border: '1px solid #ccc' }}>
//                         {/* Top Container (clickable) */}
//                         <div
//                             onClick={() => handleModuleClick(module)}
//                             style={{
//                                 backgroundColor: module.color,
//                                 padding: '20px',
//                                 cursor: 'pointer',
//                                 borderTopLeftRadius: '5px',
//                                 borderTopRightRadius: '5px',
//                             }}
//                         >
//                             <h3>{module.name}</h3>
//                             <small>Created on: {new Date(module.createdAt.seconds * 1000).toLocaleDateString()}</small>
//                         </div>

//                         {/* Bottom Container (non-clickable) */}
//                         <div
//                             style={{
//                                 backgroundColor: '#fff',
//                                 padding: '10px',
//                                 borderBottomLeftRadius: '5px',
//                                 borderBottomRightRadius: '5px',
//                                 borderTop: '1px solid #000',
//                                 display: 'flex',
//                                 justifyContent: 'flex-end',
//                             }}
//                         >
//                             <Menu position="bottom-end">
//                                 <Menu.Target>
//                                     <ActionIcon>
//                                         <IconDotsVertical />
//                                     </ActionIcon>
//                                 </Menu.Target>
//                                 <Menu.Dropdown>
//                                     <Menu.Item onClick={() => setEditingModule(module)}>Edit</Menu.Item>
//                                     <Menu.Item onClick={() => handleDeleteModule(module.id)} color="red">
//                                         Delete
//                                     </Menu.Item>
//                                 </Menu.Dropdown>
//                             </Menu>
//                         </div>
//                     </Card>
//                 ))}
//             </div>

//             {/* Add New Module Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Module">
//                 <TextInput
//                     label="Module Name"
//                     placeholder="Enter module name"
//                     value={newModuleName}
//                     onChange={(e) => setNewModuleName(e.currentTarget.value)}
//                 />
//                 <ColorInput
//                     label="Module Color"
//                     value={newModuleColor}
//                     onChange={setNewModuleColor}
//                     placeholder="Choose color or enter hex code"
//                 />
//                 <Button onClick={handleAddModule} style={{ marginTop: '10px' }}>
//                     Add Module
//                 </Button>
//             </Modal>

//             {/* Edit Module Modal */}
//             {editingModule && (
//                 <Modal opened={!!editingModule} onClose={() => setEditingModule(null)} title="Edit Module">
//                     <TextInput
//                         label="Module Name"
//                         value={editingModule.name}
//                         onChange={(e) => setEditingModule({ ...editingModule, name: e.currentTarget.value })}
//                     />
//                     <ColorInput
//                         label="Module Color"
//                         value={editingModule.color}
//                         onChange={(color) => setEditingModule({ ...editingModule, color })}
//                     />
//                     <Button onClick={() => handleEditModule(editingModule.id)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default Modules;


// <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap', padding: '0px' }}>
//     {modules.map((module) => (
//         <Card key={module.id} style={{ width: '220px', position: 'relative', borderRadius: '8px', border: '1px solid #ccc', padding: '0px' }}>
//             {/* Top Container (clickable) */}
//             <div
//                 onClick={() => handleModuleClick(module)}
//                 style={{
//                     backgroundColor: module.color,
//                     padding: '20px',
//                     cursor: 'pointer',
//                     height: '130px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between',
//                 }}
//             >
//                 <h3 style={{ margin: '0' }}>{module.name}</h3>
//                 <p style={{ fontSize: '12px', margin: '0' }}>Created on: {new Date(module.createdAt.seconds * 1000).toLocaleDateString()}</p>
//             </div>

//             {/* Bottom Container (non-clickable) */}
//             <div
//                 style={{
//                     padding: '6px',
//                     paddingRight: '8px',
//                     borderBottomLeftRadius: '8px',
//                     borderBottomRightRadius: '8px',
//                     display: 'flex',
//                     justifyContent: 'flex-end',
//                     alignItems: 'center',
//                     borderTop: '1px solid #ccc',
//                 }}
//             >
//                 <ActionIcon
//                     onClick={() => handleToggleFavorite(module.id, module.favorite)}
//                 >
//                     {module.favorite ? <IconHeartFilled color="red" /> : <IconHeart />}
//                 </ActionIcon>

//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon
//                             style={{
//                                 backgroundColor: '#e0e0e0', // Set the default background color of the button
//                                 color: 'black',              // Default color of the icon
//                                 transition: 'background-color 0.3s ease', // Smooth transition for hover
//                             }}
//                             radius="xl"
//                             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1d1d1'}  // Hover color
//                             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}  // Original color when not hovered
//                         >
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => setEditingModule(module)}>Edit</Menu.Item>
//                         <Menu.Item onClick={() => handleDeleteModule(module.id)} color="red">
//                             Delete
//                         </Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//         </Card>
//     ))}
// </div>


// // Fetch modules from Firestore on component mount
// useEffect(() => {
//     if (userId) {
//         // Query modules, order by 'createdAt' in descending order
//         const q = query(
//             collection(firestore, 'modules'),
//             where('userId', '==', userId),
//             orderBy('createdAt', 'desc') // Sort by creation date, newest first
//         );

//         const unsubscribe = onSnapshot(q, (snapshot) => {
//             const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             setModules(modulesData);
//         });

//         return () => unsubscribe(); // Clean up listener on unmount
//     }
//}, [userId]);






// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput, ColorInput} from '@mantine/core';
// import { auth, firestore } from '../firebase'; // Import Firebase
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import ModuleCard from '../components/ModuleCard'; // Import the new component


// const Modules = () => {
//     //const [modules, setModules] = useState([]); // State for storing user modules
//     const [newModuleName, setNewModuleName] = useState(''); // State for new module name
//     const [newModuleColor, setNewModuleColor] = useState('#FFFFFF'); // Default white color
//     const [isModalOpen, setIsModalOpen] = useState(false); // Modal control for adding new module
//     const [editingModule, setEditingModule] = useState(null); // State for editing an existing module
//     const [modules, setModules] = useState({
//         favoriteModules: [],
//         nonFavoriteModules: [],
//     });
//     const [error, setError] = useState(''); // State for showing error messages


//     const userId = auth.currentUser?.uid; // Get current user ID
//     const navigate = useNavigate(); // Initialize navigate

//     // In useEffect, after fetching modules, split them by favorite status
//     useEffect(() => {
//         if (userId) {
//             const q = query(
//                 collection(firestore, 'modules'), 
//                 where('userId', '==', userId),
//                 orderBy('createdAt', 'desc')// Sort by creation date, newest first
//             );
//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//                 const favoriteModules = modulesData.filter(module => module.favorite);
//                 const nonFavoriteModules = modulesData.filter(module => !module.favorite);

//                 setModules({ favoriteModules, nonFavoriteModules });
//             });
//             return () => unsubscribe(); // Clean up listener on unmount
//         }
//     }, [userId]);



   

   

//     // Toggle Favorite Status
//     const handleToggleFavorite = async (moduleId, isFavorite) => {
//         const moduleRef = doc(firestore, 'modules', moduleId);
//         await updateDoc(moduleRef, {
//             favorite: !isFavorite, // Toggle the favorite status
//         });
//     };

//     // // Add new module to Firestore
//     // const handleAddModule = async () => {
//     //     if (!newModuleName.trim()) return; // Prevent empty module names
//     //     await addDoc(collection(firestore, 'modules'), {
//     //         name: newModuleName,
//     //         color: newModuleColor,
//     //         userId, // Associate the module with the logged-in user
//     //         createdAt: new Date(), // Store the creation date
//     //         favorite: false, // Default to not favorited
//     //     });
//     //     setNewModuleName('');
//     //     setNewModuleColor('#FFFFFF');
//     //     setIsModalOpen(false);
//     // };

//     // Validate module name uniqueness for creation
//     const handleAddModule = async () => {
//         if (!newModuleName.trim()) return; // Prevent empty module names

//         const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules].map((mod) => mod.name.toLowerCase());

//         if (moduleNames.includes(newModuleName.toLowerCase())) {
//             setError('Module name already exists. Please choose a unique name.');
//             return;
//         }

//         await addDoc(collection(firestore, 'modules'), {
//             name: newModuleName,
//             color: newModuleColor,
//             userId,
//             createdAt: new Date(),
//             favorite: false,
//         });

//         setNewModuleName('');
//         setNewModuleColor('#FFFFFF');
//         setIsModalOpen(false);
//         setError(''); // Clear error after successful addition
//     };

//     // // Update an existing module
//     // const handleEditModule = async (moduleId) => {
//     //     if (editingModule && editingModule.name.trim()) {
//     //         const moduleRef = doc(firestore, 'modules', moduleId);
//     //         await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
//     //         setEditingModule(null);
//     //     }
//     // };

//     // Validate module name uniqueness for editing
//     const handleEditModule = async (module) => {
//         if (!editingModule.name.trim()) return;

//         const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules]
//             .filter((mod) => mod.id !== module.id) // Exclude the module being edited
//             .map((mod) => mod.name.toLowerCase());

//         if (moduleNames.includes(editingModule.name.toLowerCase())) {
//             setError('Module name already exists. Please choose a unique name.');
//             return;
//         }

//         const moduleRef = doc(firestore, 'modules', module.id);
//         await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
//         setEditingModule(null);
//         setError(''); // Clear error after successful edit
//     };

//     // Delete module from Firestore
//     const handleDeleteModule = async (moduleId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this module? All notes will be deleted.');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'modules', moduleId));
//         }
//     };

//     // When user clicks the top part of the module card, navigate to its overview
//     const handleModuleClick = (module) => {
//         navigate(`/modules/${module.id}/overview`, { state: { moduleName: module.name } });
//     };



//     return (
//         <div style={{ paddingHorizontal: '10px' }}>
//             <h1>Modules</h1>
//             <Button onClick={() => setIsModalOpen(true)}>+ New Module</Button>

//             {/* Favorite Modules Section */}
//             {modules.favoriteModules.length > 0 && (
//                 <>
//                     <h2>Favorites</h2>
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
//                         {modules.favoriteModules.map((module) => (
                            
//                             <ModuleCard
//                                 key={module.id}
//                                 module={module}
//                                 onToggleFavorite={handleToggleFavorite}
//                                 onEditModule={setEditingModule}
//                                 onDeleteModule={handleDeleteModule}
//                                 onModuleClick={handleModuleClick}
//                             />
//                         ))}
//                     </div>
//                 </>
//             )}

//             {/* Non-Favorite Modules Section */}
//             <h2>All Modules</h2>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
//                 {modules.nonFavoriteModules.map((module) => (
//                     <ModuleCard
//                         key={module.id}
//                         module={module}
//                         onToggleFavorite={handleToggleFavorite}
//                         onEditModule={setEditingModule}
//                         onDeleteModule={handleDeleteModule}
//                         onModuleClick={handleModuleClick}
//                     />
//                 ))}
//             </div>

            
            

//             {/* Add New Module Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Module">
//                 <TextInput
//                     label="Module Name"
//                     placeholder="Enter module name"
//                     value={newModuleName}
//                     onChange={(e) => setNewModuleName(e.currentTarget.value)}
//                 />
//                 <ColorInput
//                     label="Module Color"
//                     value={newModuleColor}
//                     onChange={setNewModuleColor}
//                     placeholder="Choose color or enter hex code"
//                 />
//                 <Button onClick={handleAddModule} style={{ marginTop: '10px' }}>
//                     Add Module
//                 </Button>
//             </Modal>

//             {/* Edit Module Modal */}
//             {editingModule && (
//                 <Modal opened={!!editingModule} onClose={() => setEditingModule(null)} title="Edit Module">
//                     <TextInput
//                         label="Module Name"
//                         value={editingModule.name}
//                         onChange={(e) => setEditingModule({ ...editingModule, name: e.currentTarget.value })}
//                     />
//                     <ColorInput
//                         label="Module Color"
//                         value={editingModule.color}
//                         onChange={(color) => setEditingModule({ ...editingModule, color })}
//                     />
//                     <Button onClick={() => handleEditModule(editingModule.id)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default Modules;





// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput, ColorInput, Notification } from '@mantine/core';
// import { auth, firestore } from '../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import ModuleCard from '../components/ModuleCard';

// const Modules = () => {
//     const [modules, setModules] = useState({ favoriteModules: [], nonFavoriteModules: [] });
//     const [newModuleName, setNewModuleName] = useState('');
//     const [newModuleColor, setNewModuleColor] = useState('#FFFFFF');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingModule, setEditingModule] = useState(null);
//     const [error, setError] = useState(''); // To store error messages

//     const userId = auth.currentUser?.uid;

//     // Fetch modules from Firestore and split by favorite status
//     useEffect(() => {
//         if (userId) {
//             const q = query(collection(firestore, 'modules'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//                 const favoriteModules = modulesData.filter((module) => module.favorite);
//                 const nonFavoriteModules = modulesData.filter((module) => !module.favorite);

//                 setModules({ favoriteModules, nonFavoriteModules });
//             });
//             return () => unsubscribe();
//         }
//     }, [userId]);

//     // Validate module name uniqueness for creation
//     const handleAddModule = async () => {
//         if (!newModuleName.trim()) return;

//         const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules].map((mod) => mod.name.toLowerCase());

//         if (moduleNames.includes(newModuleName.toLowerCase())) {
//             setError('Module name already exists. Please choose a unique name.');
//             return;
//         }

//         await addDoc(collection(firestore, 'modules'), {
//             name: newModuleName,
//             color: newModuleColor,
//             userId,
//             createdAt: new Date(),
//             favorite: false,
//         });

//         setNewModuleName('');
//         setNewModuleColor('#FFFFFF');
//         setIsModalOpen(false);
//         setError(''); // Clear error after successful addition
//     };

//     // Validate module name uniqueness for editing
//     const handleEditModule = async (module) => {
//         if (!editingModule.name.trim()) return;

//         const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules]
//             .filter((mod) => mod.id !== module.id)
//             .map((mod) => mod.name.toLowerCase());

//         if (moduleNames.includes(editingModule.name.toLowerCase())) {
//             setError('Module name already exists. Please choose a unique name.');
//             return;
//         }

//         const moduleRef = doc(firestore, 'modules', module.id);
//         await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
//         setEditingModule(null);
//         setError(''); // Clear error after successful edit
//     };

//     const handleToggleFavorite = async (moduleId, isFavorite) => {
//         const moduleRef = doc(firestore, 'modules', moduleId);
//         await updateDoc(moduleRef, { favorite: !isFavorite });
//     };

//     const handleDeleteModule = async (moduleId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this module?');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'modules', moduleId));
//         }
//     };

//     const handleModuleClick = (module) => {
//         // Navigate to module overview page
//     };

//     return (
//         <div style={{ padding: '10px' }}>
//             <h1>Modules</h1>
//             <Button onClick={() => setIsModalOpen(true)}>+ New Module</Button>

//             {/* Display error message if exists */}
//             {error && (
//                 <Notification color="red" onClose={() => setError('')} style={{ marginTop: '20px' }}>
//                     {error}
//                 </Notification>
//             )}

//             {/* Favorite Modules Section */}
//             {modules.favoriteModules.length > 0 && (
//                 <>
//                     <h2>Favorites</h2>
//                     <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
//                         {modules.favoriteModules.map((module) => (
//                             <ModuleCard
//                                 key={module.id}
//                                 module={module}
//                                 onToggleFavorite={handleToggleFavorite}
//                                 onEditModule={setEditingModule}
//                                 onDeleteModule={handleDeleteModule}
//                                 onModuleClick={handleModuleClick}
//                             />
//                         ))}
//                     </div>
//                 </>
//             )}

//             {/* Non-Favorite Modules Section */}
//             <h2>All Modules</h2>
//             <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
//                 {modules.nonFavoriteModules.map((module) => (
//                     <ModuleCard
//                         key={module.id}
//                         module={module}
//                         onToggleFavorite={handleToggleFavorite}
//                         onEditModule={setEditingModule}
//                         onDeleteModule={handleDeleteModule}
//                         onModuleClick={handleModuleClick}
//                     />
//                 ))}
//             </div>

//             {/* Add New Module Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Module">
//                 <TextInput
//                     label="Module Name"
//                     placeholder="Enter module name"
//                     value={newModuleName}
//                     onChange={(e) => setNewModuleName(e.currentTarget.value)}
//                 />
//                 <ColorInput
//                     label="Module Color"
//                     value={newModuleColor}
//                     onChange={setNewModuleColor}
//                     placeholder="Choose color or enter hex code"
//                 />
//                 <Button onClick={handleAddModule} style={{ marginTop: '10px' }}>
//                     Add Module
//                 </Button>
//             </Modal>

//             {/* Edit Module Modal */}
//             {editingModule && (
//                 <Modal opened={!!editingModule} onClose={() => setEditingModule(null)} title="Edit Module">
//                     <TextInput
//                         label="Module Name"
//                         value={editingModule.name}
//                         onChange={(e) => setEditingModule({ ...editingModule, name: e.currentTarget.value })}
//                     />
//                     <ColorInput
//                         label="Module Color"
//                         value={editingModule.color}
//                         onChange={(color) => setEditingModule({ ...editingModule, color })}
//                     />
//                     <Button onClick={() => handleEditModule(editingModule)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default Modules;



// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput, ColorInput } from '@mantine/core';
// import { auth, firestore } from '../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import ModuleCard from '../components/ModuleCard';

// const Modules = () => {
//     const [modules, setModules] = useState({ favoriteModules: [], nonFavoriteModules: [] });
//     const [newModuleName, setNewModuleName] = useState('');
//     const [newModuleColor, setNewModuleColor] = useState('#FFFFFF');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingModule, setEditingModule] = useState(null);
//     const [error, setError] = useState(''); // For validation errors

//     const userId = auth.currentUser?.uid;

//     useEffect(() => {
//         if (userId) {
//             const q = query(collection(firestore, 'modules'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//                 const favoriteModules = modulesData.filter((module) => module.favorite);
//                 const nonFavoriteModules = modulesData.filter((module) => !module.favorite);

//                 setModules({ favoriteModules, nonFavoriteModules });
//             });
//             return () => unsubscribe();
//         }
//     }, [userId]);

//     // Validate module name uniqueness for creation
//     const handleAddModule = async () => {
//         if (!newModuleName.trim()) return;

//         const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules].map((mod) => mod.name.toLowerCase());

//         if (moduleNames.includes(newModuleName.toLowerCase())) {
//             setError('Module name already exists. Please choose a unique name.');
//             return;
//         }

//         await addDoc(collection(firestore, 'modules'), {
//             name: newModuleName,
//             color: newModuleColor,
//             userId,
//             createdAt: new Date(),
//             favorite: false,
//         });

//         setNewModuleName('');
//         setNewModuleColor('#FFFFFF');
//         setIsModalOpen(false);
//         setError(''); // Clear error after successful addition
//     };

//     // Validate module name uniqueness for editing
//     const handleEditModule = async (module) => {
//         if (!editingModule.name.trim()) return;

//         const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules]
//             .filter((mod) => mod.id !== module.id)
//             .map((mod) => mod.name.toLowerCase());

//         if (moduleNames.includes(editingModule.name.toLowerCase())) {
//             setError('Module name already exists. Please choose a unique name.');
//             return;
//         }

//         const moduleRef = doc(firestore, 'modules', module.id);
//         await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
//         setEditingModule(null);
//         setError(''); // Clear error after successful edit
//     };

//     const handleToggleFavorite = async (moduleId, isFavorite) => {
//         const moduleRef = doc(firestore, 'modules', moduleId);
//         await updateDoc(moduleRef, { favorite: !isFavorite });
//     };

//     const handleDeleteModule = async (moduleId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this module?');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'modules', moduleId));
//         }
//     };

//     const handleModuleClick = (module) => {
//         // Navigate to module overview page
//     };

//     return (
//         <div style={{ padding: '10px' }}>
//             <h1>Modules</h1>
//             <Button onClick={() => setIsModalOpen(true)}>+ New Module</Button>

//             {/* Favorite Modules Section */}
//             {modules.favoriteModules.length > 0 && (
//                 <>
//                     <h2>Favorites</h2>
//                     <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
//                         {modules.favoriteModules.map((module) => (
//                             <ModuleCard
//                                 key={module.id}
//                                 module={module}
//                                 onToggleFavorite={handleToggleFavorite}
//                                 onEditModule={setEditingModule}
//                                 onDeleteModule={handleDeleteModule}
//                                 onModuleClick={handleModuleClick}
//                             />
//                         ))}
//                     </div>
//                 </>
//             )}

//             {/* Non-Favorite Modules Section */}
//             <h2>All Modules</h2>
//             <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
//                 {modules.nonFavoriteModules.map((module) => (
//                     <ModuleCard
//                         key={module.id}
//                         module={module}
//                         onToggleFavorite={handleToggleFavorite}
//                         onEditModule={setEditingModule}
//                         onDeleteModule={handleDeleteModule}
//                         onModuleClick={handleModuleClick}
//                     />
//                 ))}
//             </div>

//             {/* Add New Module Modal */}
//             <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Module">
//                 <TextInput
//                     label="Module Name"
//                     placeholder="Enter module name"
//                     value={newModuleName}
//                     onChange={(e) => {
//                         setNewModuleName(e.currentTarget.value);
//                         setError(''); // Clear error when typing
//                     }}
//                     error={error} // Display error under the input field
//                 />
//                 <ColorInput
//                     label="Module Color"
//                     value={newModuleColor}
//                     onChange={setNewModuleColor}
//                     placeholder="Choose color or enter hex code"
//                 />
//                 <Button onClick={handleAddModule} style={{ marginTop: '10px' }}>
//                     Add Module
//                 </Button>
//             </Modal>

//             {/* Edit Module Modal */}
//             {editingModule && (
//                 <Modal opened={!!editingModule} onClose={() => setEditingModule(null)} title="Edit Module">
//                     <TextInput
//                         label="Module Name"
//                         value={editingModule.name}
//                         onChange={(e) => {
//                             setEditingModule({ ...editingModule, name: e.currentTarget.value });
//                             setError(''); // Clear error when typing
//                         }}
//                         error={error} // Display error under the input field
//                     />
//                     <ColorInput
//                         label="Module Color"
//                         value={editingModule.color}
//                         onChange={(color) => setEditingModule({ ...editingModule, color })}
//                     />
//                     <Button onClick={() => handleEditModule(editingModule)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default Modules;



// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput, ColorInput } from '@mantine/core';
// import { auth, firestore } from '../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import ModuleCard from '../components/ModuleCard';

// const Modules = () => {
//     const [modules, setModules] = useState({ favoriteModules: [], nonFavoriteModules: [] });
//     const [newModuleName, setNewModuleName] = useState('');
//     const [newModuleColor, setNewModuleColor] = useState('#FFFFFF');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingModule, setEditingModule] = useState(null);
//     const [error, setError] = useState(''); // For validation errors

//     const userId = auth.currentUser?.uid;

//     useEffect(() => {
//         if (userId) {
//             const q = query(collection(firestore, 'modules'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//                 const favoriteModules = modulesData.filter((module) => module.favorite);
//                 const nonFavoriteModules = modulesData.filter((module) => !module.favorite);

//                 setModules({ favoriteModules, nonFavoriteModules });
//             });
//             return () => unsubscribe();
//         }
//     }, [userId]);

//     // Validate module name uniqueness for creation
//     const handleAddModule = async () => {
//         if (!newModuleName.trim()) return;

//         const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules].map((mod) => mod.name.toLowerCase());

//         if (moduleNames.includes(newModuleName.toLowerCase())) {
//             setError('Module name already exists. Please choose a unique name.');
//             return;
//         }

//         await addDoc(collection(firestore, 'modules'), {
//             name: newModuleName,
//             color: newModuleColor,
//             userId,
//             createdAt: new Date(),
//             favorite: false,
//         });

//         setNewModuleName('');
//         setNewModuleColor('#FFFFFF');
//         setIsModalOpen(false);
//         setError(''); // Clear error after successful addition
//     };

//     // Validate module name uniqueness for editing
//     const handleEditModule = async (module) => {
//         if (!editingModule.name.trim()) return;

//         const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules]
//             .filter((mod) => mod.id !== module.id)
//             .map((mod) => mod.name.toLowerCase());

//         if (moduleNames.includes(editingModule.name.toLowerCase())) {
//             setError('Module name already exists. Please choose a unique name.');
//             return;
//         }

//         const moduleRef = doc(firestore, 'modules', module.id);
//         await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
//         setEditingModule(null);
//         setError(''); // Clear error after successful edit
//     };

//     const handleToggleFavorite = async (moduleId, isFavorite) => {
//         const moduleRef = doc(firestore, 'modules', moduleId);
//         await updateDoc(moduleRef, { favorite: !isFavorite });
//     };

//     const handleDeleteModule = async (moduleId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this module?');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'modules', moduleId));
//         }
//     };

//     const handleModuleClick = (module) => {
//         // Navigate to module overview page
//     };

//     return (
//         <div style={{ padding: '10px' }}>
//             <h1>Modules</h1>
//             <Button onClick={() => {
//                 setIsModalOpen(true);
//                 setError(''); // Clear error when opening the "Add New Module" modal
//             }}>
//                 + New Module
//             </Button>

//             {/* Favorite Modules Section */}
//             {modules.favoriteModules.length > 0 && (
//                 <>
//                     <h2>Favorites</h2>
//                     <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
//                         {modules.favoriteModules.map((module) => (
//                             <ModuleCard
//                                 key={module.id}
//                                 module={module}
//                                 onToggleFavorite={handleToggleFavorite}
//                                 onEditModule={(module) => {
//                                     setEditingModule(module);
//                                     setError(''); // Clear error when opening the "Edit Module" modal
//                                 }}
//                                 onDeleteModule={handleDeleteModule}
//                                 onModuleClick={handleModuleClick}
//                             />
//                         ))}
//                     </div>
//                 </>
//             )}

//             {/* Non-Favorite Modules Section */}
//             <h2>All Modules</h2>
//             <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
//                 {modules.nonFavoriteModules.map((module) => (
//                     <ModuleCard
//                         key={module.id}
//                         module={module}
//                         onToggleFavorite={handleToggleFavorite}
//                         onEditModule={(module) => {
//                             setEditingModule(module);
//                             setError(''); // Clear error when opening the "Edit Module" modal
//                         }}
//                         onDeleteModule={handleDeleteModule}
//                         onModuleClick={handleModuleClick}
//                     />
//                 ))}
//             </div>

//             {/* Add New Module Modal */}
//             <Modal opened={isModalOpen} onClose={() => {
//                 setIsModalOpen(false);
//                 setError(''); // Clear error when closing the "Add New Module" modal
//             }} title="Add New Module">
//                 <TextInput
//                     label="Module Name"
//                     placeholder="Enter module name"
//                     value={newModuleName}
//                     onChange={(e) => {
//                         setNewModuleName(e.currentTarget.value);
//                         setError(''); // Clear error when typing
//                     }}
//                     error={error} // Display error under the input field
//                 />
//                 <ColorInput
//                     label="Module Color"
//                     value={newModuleColor}
//                     onChange={setNewModuleColor}
//                     placeholder="Choose color or enter hex code"
//                 />
//                 <Button onClick={handleAddModule} style={{ marginTop: '10px' }}>
//                     Add Module
//                 </Button>
//             </Modal>

//             {/* Edit Module Modal */}
//             {editingModule && (
//                 <Modal opened={!!editingModule} onClose={() => {
//                     setEditingModule(null);
//                     setError(''); // Clear error when closing the "Edit Module" modal
//                 }} title="Edit Module">
//                     <TextInput
//                         label="Module Name"
//                         value={editingModule.name}
//                         onChange={(e) => {
//                             setEditingModule({ ...editingModule, name: e.currentTarget.value });
//                             setError(''); // Clear error when typing
//                         }}
//                         error={error} // Display error under the input field
//                     />
//                     <ColorInput
//                         label="Module Color"
//                         value={editingModule.color}
//                         onChange={(color) => setEditingModule({ ...editingModule, color })}
//                     />
//                     <Button onClick={() => handleEditModule(editingModule)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default Modules;




// // fixed edit and add error message, but cannot go to module overview page
// import React, { useState, useEffect } from 'react';
// import { Button, Modal, TextInput, ColorInput } from '@mantine/core';
// import { auth, firestore } from '../firebase';
// import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
// import ModuleCard from '../components/ModuleCard';

// const Modules = () => {
//     const [modules, setModules] = useState({ favoriteModules: [], nonFavoriteModules: [] });
//     const [newModuleName, setNewModuleName] = useState('');
//     const [newModuleColor, setNewModuleColor] = useState('#FFFFFF');
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editingModule, setEditingModule] = useState(null);
//     const [error, setError] = useState(''); // For validation errors

//     const userId = auth.currentUser?.uid;

//     useEffect(() => {
//         if (userId) {
//             const q = query(collection(firestore, 'modules'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
//             const unsubscribe = onSnapshot(q, (snapshot) => {
//                 const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//                 const favoriteModules = modulesData.filter((module) => module.favorite);
//                 const nonFavoriteModules = modulesData.filter((module) => !module.favorite);

//                 setModules({ favoriteModules, nonFavoriteModules });
//             });
//             return () => unsubscribe();
//         }
//     }, [userId]);

//     // Validate module name uniqueness for creation
//     const handleAddModule = async () => {
//         if (!newModuleName.trim()) return;

//         const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules].map((mod) => mod.name.toLowerCase());

//         if (moduleNames.includes(newModuleName.toLowerCase())) {
//             setError('Module name already exists. Please choose a unique name.');
//             return;
//         }

//         await addDoc(collection(firestore, 'modules'), {
//             name: newModuleName,
//             color: newModuleColor,
//             userId,
//             createdAt: new Date(),
//             favorite: false,
//         });

//         // Clear input fields after successful addition
//         setNewModuleName('');
//         setNewModuleColor('#FFFFFF');
//         setIsModalOpen(false);
//         setError(''); // Clear error after successful addition
//     };

//     // Validate module name uniqueness for editing
//     const handleEditModule = async (module) => {
//         if (!editingModule.name.trim()) return;

//         const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules]
//             .filter((mod) => mod.id !== module.id)
//             .map((mod) => mod.name.toLowerCase());

//         if (moduleNames.includes(editingModule.name.toLowerCase())) {
//             setError('Module name already exists. Please choose a unique name.');
//             return;
//         }

//         const moduleRef = doc(firestore, 'modules', module.id);
//         await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
//         setEditingModule(null);
//         setError(''); // Clear error after successful edit
//     };

//     const handleToggleFavorite = async (moduleId, isFavorite) => {
//         const moduleRef = doc(firestore, 'modules', moduleId);
//         await updateDoc(moduleRef, { favorite: !isFavorite });
//     };

//     const handleDeleteModule = async (moduleId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this module?');
//         if (confirmDelete) {
//             await deleteDoc(doc(firestore, 'modules', moduleId));
//         }
//     };

//     const handleModuleClick = (module) => {
//         // Navigate to module overview page
       
//     };

//     return (
//         <div style={{ padding: '10px' }}>
//             <h1>Modules</h1>
//             <Button onClick={() => {
//                 setIsModalOpen(true);
//                 setNewModuleName(''); // Clear module name when opening modal
//                 setNewModuleColor('#FFFFFF'); // Reset color to default when opening modal
//                 setError(''); // Clear error when opening the "Add New Module" modal
//             }}>
//                 + New Module
//             </Button>

//             {/* Favorite Modules Section */}
//             {modules.favoriteModules.length > 0 && (
//                 <>
//                     <h2>Favorites</h2>
//                     <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
//                         {modules.favoriteModules.map((module) => (
//                             <ModuleCard
//                                 key={module.id}
//                                 module={module}
//                                 onToggleFavorite={handleToggleFavorite}
//                                 onEditModule={(module) => {
//                                     setEditingModule(module);
//                                     setError(''); // Clear error when opening the "Edit Module" modal
//                                 }}
//                                 onDeleteModule={handleDeleteModule}
//                                 onModuleClick={handleModuleClick}
//                             />
//                         ))}
//                     </div>
//                 </>
//             )}

//             {/* Non-Favorite Modules Section */}
//             <h2>All Modules</h2>
//             <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
//                 {modules.nonFavoriteModules.map((module) => (
//                     <ModuleCard
//                         key={module.id}
//                         module={module}
//                         onToggleFavorite={handleToggleFavorite}
//                         onEditModule={(module) => {
//                             setEditingModule(module);
//                             setError(''); // Clear error when opening the "Edit Module" modal
//                         }}
//                         onDeleteModule={handleDeleteModule}
//                         onModuleClick={handleModuleClick}
//                     />
//                 ))}
//             </div>

//             {/* Add New Module Modal */}
//             <Modal opened={isModalOpen} onClose={() => {
//                 setIsModalOpen(false);
//                 setNewModuleName(''); // Clear module name when closing modal
//                 setNewModuleColor('#FFFFFF'); // Reset color to default when closing modal
//                 setError(''); // Clear error when closing the "Add New Module" modal
//             }} title="Add New Module">
//                 <TextInput
//                     label="Module Name"
//                     placeholder="Enter module name"
//                     value={newModuleName}
//                     onChange={(e) => {
//                         setNewModuleName(e.currentTarget.value);
//                         setError(''); // Clear error when typing
//                     }}
//                     error={error} // Display error under the input field
//                 />
//                 <ColorInput
//                     label="Module Color"
//                     value={newModuleColor}
//                     onChange={setNewModuleColor}
//                     placeholder="Choose color or enter hex code"
//                 />
//                 <Button onClick={handleAddModule} style={{ marginTop: '10px' }}>
//                     Add Module
//                 </Button>
//             </Modal>

//             {/* Edit Module Modal */}
//             {editingModule && (
//                 <Modal opened={!!editingModule} onClose={() => {
//                     setEditingModule(null);
//                     setError(''); // Clear error when closing the "Edit Module" modal
//                 }} title="Edit Module">
//                     <TextInput
//                         label="Module Name"
//                         value={editingModule.name}
//                         onChange={(e) => {
//                             setEditingModule({ ...editingModule, name: e.currentTarget.value });
//                             setError(''); // Clear error when typing
//                         }}
//                         error={error} // Display error under the input field
//                     />
//                     <ColorInput
//                         label="Module Color"
//                         value={editingModule.color}
//                         onChange={(color) => setEditingModule({ ...editingModule, color })}
//                     />
//                     <Button onClick={() => handleEditModule(editingModule)} style={{ marginTop: '10px' }}>
//                         Save Changes
//                     </Button>
//                 </Modal>
//             )}
//         </div>
//     );
// };

// export default Modules;





// fixed edit and add error message, but cannot go to module overview page
import React, { useState, useEffect } from 'react';
import { Button, Modal, TextInput, ColorInput } from '@mantine/core';
import { auth, firestore } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import ModuleCard from '../components/ModuleCard';
import { useNavigate } from 'react-router-dom';

const Modules = () => {
    const [modules, setModules] = useState({ favoriteModules: [], nonFavoriteModules: [] });
    const [newModuleName, setNewModuleName] = useState('');
    const [newModuleColor, setNewModuleColor] = useState('#FFFFFF');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [error, setError] = useState(''); // For validation errors

    const userId = auth.currentUser?.uid;
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        if (userId) {
            const q = query(collection(firestore, 'modules'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const modulesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                const favoriteModules = modulesData.filter((module) => module.favorite);
                const nonFavoriteModules = modulesData.filter((module) => !module.favorite);

                setModules({ favoriteModules, nonFavoriteModules });
            });
            return () => unsubscribe();
        }
    }, [userId]);

    // Validate module name uniqueness for creation
    const handleAddModule = async () => {
        
        if (!newModuleName.trim()) {
            setError('Module name cannot be empty.');
            return;
        }

        const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules].map((mod) => mod.name.toLowerCase());

        if (moduleNames.includes(newModuleName.toLowerCase())) {
            setError('Module name already exists. Please choose a unique name.');
            return;
        }

        await addDoc(collection(firestore, 'modules'), {
            name: newModuleName,
            color: newModuleColor,
            userId,
            createdAt: new Date(),
            favorite: false,
        });

        // Clear input fields after successful addition
        setNewModuleName('');
        setNewModuleColor('#FFFFFF');
        setIsModalOpen(false);
        setError(''); // Clear error after successful addition
    };

    // Validate module name uniqueness for editing
    const handleEditModule = async (module) => {
        
        if (!editingModule.name.trim()) {
            setError('Module name cannot be empty.');
            return;
        }
        

        const moduleNames = [...modules.favoriteModules, ...modules.nonFavoriteModules]
            .filter((mod) => mod.id !== module.id)
            .map((mod) => mod.name.toLowerCase());

        if (moduleNames.includes(editingModule.name.toLowerCase())) {
            setError('Module name already exists. Please choose a unique name.');
            return;
        }

        const moduleRef = doc(firestore, 'modules', module.id);
        await updateDoc(moduleRef, { name: editingModule.name, color: editingModule.color });
        setEditingModule(null);
        setError(''); // Clear error after successful edit
    };

    const handleToggleFavorite = async (moduleId, isFavorite) => {
        const moduleRef = doc(firestore, 'modules', moduleId);
        await updateDoc(moduleRef, { favorite: !isFavorite });
    };

    const handleDeleteModule = async (moduleId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this module?');
        if (confirmDelete) {
            await deleteDoc(doc(firestore, 'modules', moduleId));
        }
    };

    const handleModuleClick = (module) => {
        // Navigate to the module overview page using the correct path
        navigate(`/modules/${module.id}/overview`, { state: { moduleName: module.name } });
    };


    return (
        <div style={{ padding: '10px' }}>
            <h1>Modules</h1>
            <Button onClick={() => {
                setIsModalOpen(true);
                setNewModuleName(''); // Clear module name when opening modal
                setNewModuleColor('#FFFFFF'); // Reset color to default when opening modal
                setError(''); // Clear error when opening the "Add New Module" modal
            }}>
                + New Module
            </Button>

            {/* Favorite Modules Section */}
            {modules.favoriteModules.length > 0 && (
                <>
                    <h2>Favorites</h2>
                    <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                        {modules.favoriteModules.map((module) => (
                            <ModuleCard
                                key={module.id}
                                module={module}
                                onToggleFavorite={handleToggleFavorite}
                                onEditModule={(module) => {
                                    setEditingModule(module);
                                    setError(''); // Clear error when opening the "Edit Module" modal
                                }}
                                onDeleteModule={handleDeleteModule}
                                onModuleClick={handleModuleClick}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Non-Favorite Modules Section */}
            <h2>All Modules</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                {modules.nonFavoriteModules.map((module) => (
                    <ModuleCard
                        key={module.id}
                        module={module}
                        onToggleFavorite={handleToggleFavorite}
                        onEditModule={(module) => {
                            setEditingModule(module);
                            setError(''); // Clear error when opening the "Edit Module" modal
                        }}
                        onDeleteModule={handleDeleteModule}
                        onModuleClick={handleModuleClick}
                    />
                ))}
            </div>

            {/* Add New Module Modal */}
            <Modal opened={isModalOpen} onClose={() => {
                setIsModalOpen(false);
                setNewModuleName(''); // Clear module name when closing modal
                setNewModuleColor('#FFFFFF'); // Reset color to default when closing modal
                setError(''); // Clear error when closing the "Add New Module" modal
            }} title="Add New Module">
                <TextInput
                    label="Module Name"
                    placeholder="Enter module name"
                    value={newModuleName}
                    onChange={(e) => {
                        setNewModuleName(e.currentTarget.value);
                        setError(''); // Clear error when typing
                    }}
                    error={error} // Display error under the input field
                />
                <ColorInput
                    label="Module Color"
                    value={newModuleColor}
                    onChange={setNewModuleColor}
                    placeholder="Choose color or enter hex code"
                />
                <Button onClick={handleAddModule} style={{ marginTop: '10px' }}>
                    Add Module
                </Button>
            </Modal>

            {/* Edit Module Modal */}
            {editingModule && (
                <Modal opened={!!editingModule} onClose={() => {
                    setEditingModule(null);
                    setError(''); // Clear error when closing the "Edit Module" modal
                }} title="Edit Module">
                    <TextInput
                        label="Module Name"
                        value={editingModule.name}
                        onChange={(e) => {
                            setEditingModule({ ...editingModule, name: e.currentTarget.value });
                            setError(''); // Clear error when typing
                        }}
                        error={error} // Display error under the input field
                    />
                    <ColorInput
                        label="Module Color"
                        value={editingModule.color}
                        onChange={(color) => setEditingModule({ ...editingModule, color })}
                    />
                    <Button onClick={() => handleEditModule(editingModule)} style={{ marginTop: '10px' }}>
                        Save Changes
                    </Button>
                </Modal>
            )}
        </div>
    );
};

export default Modules;







