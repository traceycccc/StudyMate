// import React from 'react';
// import { Button, Card, List, Checkbox, Group } from '@mantine/core';
// import { useNavigate } from 'react-router-dom';

// const ModuleOverview = ({ moduleName }) => {
//     const navigate = useNavigate();

//     const sampleNotes = [
//         {
//             category: 'Introduction to algebra',
//             notes: [
//                 { id: 1, title: 'Note page 1', date: '10 Oct 2024', type: 'note' },
//                 { id: 2, title: 'Note page 2', date: '10 Oct 2024', type: 'note' },
//                 { id: 3, title: 'PDF + Note page 1', date: '10 Oct 2024', type: 'pdf' },
//             ],
//         },
//         {
//             category: 'Linear Equations',
//             notes: [
//                 { id: 4, title: 'Note page 1', date: '10 Oct 2024', type: 'note' },
//                 { id: 5, title: 'Note page 2', date: '10 Oct 2024', type: 'note' },
//             ],
//         },
//     ];

//     const sampleTodos = ['task 1', 'task 2', 'task 3'];

//     return (
//         <div style={{ padding: '20px' }}>
//             {/* Back Button */}
//             <Button variant="subtle" onClick={() => navigate('/modules')}>
//                 ← Back
//             </Button>

//             {/* FlashCards Button */}
//             <h1>{moduleName}</h1>
//             <Button color="blue" size="md" style={{ marginBottom: '20px' }}>
//                 Go to FlashCards
//             </Button>

//             <Group align="flex-start">
//                 {/* Notes Section */}
//                 <div style={{ flex: 1 }}>
//                     <h2>Notes</h2>
//                     {sampleNotes.map((section) => (
//                         <Card key={section.category} shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
//                             <h3>{section.category}</h3>
//                             {section.notes.map((note) => (
//                                 <div key={note.id} style={{ marginBottom: '10px' }}>
//                                     {note.type === 'note' ? '📝' : '📄'} {note.title} <small>{note.date}</small>
//                                 </div>
//                             ))}
//                         </Card>
//                     ))}
//                 </div>

//                 {/* To-Dos Section */}
//                 <div style={{ width: '200px' }}>
//                     <h2>To-Dos</h2>
//                     <Card shadow="sm" padding="lg">
//                         <List>
//                             {sampleTodos.map((todo, index) => (
//                                 <List.Item key={index}>
//                                     <Checkbox label={todo} />
//                                 </List.Item>
//                             ))}
//                         </List>
//                     </Card>
//                 </div>
//             </Group>
//         </div>
//     );
// };

// export default ModuleOverview;


// import React from 'react';
// import { Button, Card, List, Checkbox, Group } from '@mantine/core';
// import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

// const ModuleOverview = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { moduleName } = location.state || { moduleName: 'Module' }; // Default to "Module" if no state is passed

//     // Dummy data
//     const sampleNotes = [
//         // Add your notes here...
//     ];

//     const sampleTodos = ['task 1', 'task 2', 'task 3'];

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={() => navigate('/modules')}>
//                 ← Back
//             </Button>

//             <h1>{moduleName}</h1> {/* Display the module name dynamically */}
//             <Button color="blue" size="md" style={{ marginBottom: '20px' }}>
//                 Go to FlashCards
//             </Button>

//             <Group align="flex-start">
//                 {/* Notes Section */}
//                 <div style={{ flex: 1 }}>
//                     <h2>Notes</h2>
//                     {sampleNotes.map((section) => (
//                         <Card key={section.category} shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
//                             <h3>{section.category}</h3>
//                             {section.notes.map((note) => (
//                                 <div key={note.id} style={{ marginBottom: '10px' }}>
//                                     {note.type === 'note' ? '📝' : '📄'} {note.title} <small>{note.date}</small>
//                                 </div>
//                             ))}
//                         </Card>
//                     ))}
//                 </div>

//                 {/* To-Dos Section */}
//                 <div style={{ width: '200px' }}>
//                     <h2>To-Dos</h2>
//                     <Card shadow="sm" padding="lg">
//                         <List>
//                             {sampleTodos.map((todo, index) => (
//                                 <List.Item key={index}>
//                                     <Checkbox label={todo} />
//                                 </List.Item>
//                             ))}
//                         </List>
//                     </Card>
//                 </div>
//             </Group>
//         </div>
//     );
// };

// export default ModuleOverview;




// //new
// import React from 'react';
// import { Button, Card, List, Checkbox, Group } from '@mantine/core';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';

// const ModuleOverview = () => {
//     const navigate = useNavigate();
//     const { id } = useParams(); // Get module ID from URL params
//     const location = useLocation();
//     const { moduleName } = location.state || { moduleName: 'Module' };

//     // Sample notes and todos
//     const sampleNotes = [
//         // Add your notes here...
//     ];

//     const sampleTodos = ['task 1', 'task 2', 'task 3'];

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={() => navigate('/modules')}>
//                 ← Back
//             </Button>

//             <h1>{moduleName}</h1>
//             <Button color="blue" size="md" style={{ marginBottom: '20px' }}>
//                 Go to FlashCards
//             </Button>

//             <Group align="flex-start">
//                 {/* Notes Section */}
//                 <div style={{ flex: 1 }}>
//                     <h2>Notes</h2>
//                     {sampleNotes.map((section) => (
//                         <Card key={section.category} shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
//                             <h3>{section.category}</h3>
//                             {section.notes.map((note) => (
//                                 <div key={note.id} style={{ marginBottom: '10px' }}>
//                                     {note.type === 'note' ? '📝' : '📄'} {note.title} <small>{note.date}</small>
//                                 </div>
//                             ))}
//                         </Card>
//                     ))}
//                 </div>

//                 {/* To-Dos Section */}
//                 <div style={{ width: '200px' }}>
//                     <h2>To-Dos</h2>
//                     <Card shadow="sm" padding="lg">
//                         <List>
//                             {sampleTodos.map((todo, index) => (
//                                 <List.Item key={index}>
//                                     <Checkbox label={todo} />
//                                 </List.Item>
//                             ))}
//                         </List>
//                     </Card>
//                 </div>
//             </Group>
//         </div>
//     );
// };

// export default ModuleOverview;




//attempt to add note section
//new
// import React, { useState } from 'react';
// import { Button, Card, List, Checkbox, Group } from '@mantine/core';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';


// const ModuleOverview = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { moduleName } = location.state || { moduleName: 'Module' };
   

   


//     const sampleTodos = ['task 1', 'task 2', 'task 3'];

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={() => navigate('/modules')}>
//                 ← Back
//             </Button>

//             <h1>{moduleName}</h1>
//             <Button color="blue" size="md" style={{ marginBottom: '20px' }}>
//                 Go to FlashCards
//             </Button>

//             <Group align="flex-start">
//                 {/* Notes Section */}
//                 <div style={{ flex: 1 }}>
//                     <h2>Notes</h2>
                    




                    
//                 </div>

                

//                 {/* To-Dos Section */}
//                 <div style={{ width: '200px' }}>
//                     <h2>To-Dos</h2>
//                     <Card shadow="sm" padding="lg">
//                         <List>
//                             {sampleTodos.map((todo, index) => (
//                                 <List.Item key={index}>
//                                     <Checkbox label={todo} />
//                                 </List.Item>
//                             ))}
//                         </List>
//                     </Card>
//                 </div>
//             </Group>
//         </div>
//     );
// };

// export default ModuleOverview;




// import React, { useState } from 'react';
// import { Button, Card, List, Checkbox, Group } from '@mantine/core';
// import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import NoteOrganizer from '../components/NoteOrganizer'; // Import NoteOrganizer

// const ModuleOverview = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { id: moduleId } = useParams(); // Assuming `moduleId` is obtained from the route params
//     const { moduleName } = location.state || { moduleName: 'Module' };

//     const sampleTodos = ['task 1', 'task 2', 'task 3'];

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button variant="subtle" onClick={() => navigate('/modules')}>
//                 ← Back
//             </Button>

//             <h1>{moduleName}</h1>
//             <Button color="blue" size="md" style={{ marginBottom: '20px' }}>
//                 Go to FlashCards
//             </Button>

//             <Group align="flex-start">
//                 {/* Notes Section */}
//                 <div style={{ flex: 1 }}>
//                     <NoteOrganizer moduleId={moduleId} /> {/* Add NoteOrganizer here */}
//                 </div>

//                 {/* To-Dos Section */}
//                 <div style={{ width: '200px' }}>
//                     <h2>To-Dos</h2>
//                     <Card shadow="sm" padding="lg">
//                         <List>
//                             {sampleTodos.map((todo, index) => (
//                                 <List.Item key={index}>
//                                     <Checkbox label={todo} />
//                                 </List.Item>
//                             ))}
//                         </List>
//                     </Card>
//                 </div>
//             </Group>
//         </div>
//     );
// };

// export default ModuleOverview;


import React from 'react';
import { Button, Group } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import NoteOrganizer from '../components/NoteOrganizer'; // Import NoteOrganizer

const ModuleOverview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id: moduleId } = useParams(); // Assuming `moduleId` is obtained from the route params
    const { moduleName } = location.state || { moduleName: 'Module' };

    

    return (
        <div style={{ paddingTop: '4px' }}>
            <button
                onClick={() => navigate('/modules')}
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
                <IconArrowLeft size={18} style={{ 
                    marginRight: '6px', 
                    backgroundColor: 'transparent' 
                }} />
                Back
            </button>

            <h1>{moduleName}</h1>
            <Button 
                color="blue" 
                size="md" 
                style={{ marginBottom: '20px' }}
                onClick={() => navigate(`/modules/${moduleId}/overview/flashcards`, { state: { from: 'module-overview' } })}
            >
                Go to FlashCards
            </Button>

            <Group align="flex-start">
                {/* Notes Section */}
                <div style={{ flex: 1 }}>
                    <NoteOrganizer moduleId={moduleId} /> {/* Add NoteOrganizer here */}
                </div>

                
            </Group>
        </div>
    );
};

export default ModuleOverview;

