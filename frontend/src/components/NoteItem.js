// import React from 'react';
// import { ActionIcon, Menu } from '@mantine/core';
// import { IconDots, IconEdit, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';

// const NoteItem = ({ note, onEdit, onDelete, onMove }) => {
//     return (
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 {/* Note Icon */}
//                 {note.type === 'plain' && <span>📝</span>}
//                 {note.type === 'pdf' && <span>📄</span>}
//                 {note.type === 'code' && <span>💻</span>}

//                 {/* Note Title */}
//                 <div style={{ marginLeft: '10px' }}>
//                     <h4 style={{ margin: 0 }}>{note.title}</h4>
//                     <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{note.date}</p>
//                 </div>
//             </div>

//             <Menu>
//                 <Menu.Target>
//                     <ActionIcon>
//                         <IconDots />
//                     </ActionIcon>
//                 </Menu.Target>
//                 <Menu.Dropdown>
//                     <Menu.Item icon={<IconEdit />} onClick={onEdit}>Edit</Menu.Item>
//                     <Menu.Item icon={<IconArrowsLeftRight />} onClick={onMove}>Move</Menu.Item>
//                     <Menu.Item icon={<IconTrash />} color="red" onClick={onDelete}>Delete</Menu.Item>
//                 </Menu.Dropdown>
//             </Menu>
//         </div>
//     );
// };

// export default NoteItem;



// import React from 'react';
// import { ActionIcon, Menu } from '@mantine/core';
// import { IconDots, IconFile, IconCode, IconFileTypePdf } from '@tabler/icons-react';

// const NoteItem = ({ note }) => {
//     // Determine which icon to show based on the note type
//     const getNoteIcon = (type) => {
//         switch (type) {
//             case 'note':
//                 return <IconFile />;
//             case 'code':
//                 return <IconCode />;
//             case 'pdf':
//                 return <IconFileTypePdf />;
//             default:
//                 return <IconFile />;
//         }
//     };

//     return (
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 {getNoteIcon(note.type)}
//                 <div style={{ marginLeft: '10px' }}>
//                     <h4 style={{ margin: '0' }}>{note.name}</h4>
//                     <small>{note.date}</small>
//                 </div>
//             </div>
//             <Menu position="bottom-end">
//                 <Menu.Target>
//                     <ActionIcon>
//                         <IconDots />
//                     </ActionIcon>
//                 </Menu.Target>
//                 <Menu.Dropdown>
//                     <Menu.Item>Edit Note</Menu.Item>
//                     <Menu.Item>Move to Another Section</Menu.Item>
//                     <Menu.Item color="red">Delete Note</Menu.Item>
//                 </Menu.Dropdown>
//             </Menu>
//         </div>
//     );
// };

// export default NoteItem;



// //plain note
// import React from 'react';
// import { ActionIcon, Menu } from '@mantine/core';
// import { IconDots, IconFile, IconCode, IconFileTypePdf } from '@tabler/icons-react';
// import { useNavigate } from 'react-router-dom';

// const NoteItem = ({ note, onEdit, onDelete }) => {
//     const navigate = useNavigate();

//     // Determine which icon to show based on the note type
//     const getNoteIcon = (type) => {
//         switch (type) {
//             case 'note':
//                 return <IconFile />;
//             case 'code':
//                 return <IconCode />;
//             case 'pdf':
//                 return <IconFileTypePdf />;
//             default:
//                 return <IconFile />;
//         }
//     };

//     const handleNoteClick = () => {
//         if (note.type === 'plain') {
//             navigate(`/plain-note/${note.id}`);
//         } else if (note.type === 'code') {
//             navigate(`/code-note/${note.id}`);
//         } else if (note.type === 'document') {
//             navigate(`/document-note/${note.id}`);
//         }
//     };

//     return (
//         <div
//             onClick={handleNoteClick}
//             style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '10px',
//                 cursor: 'pointer'
//             }}
//         >
//             <div style={{ display: 'flex', alignItems: 'center' }}>
//                 {getNoteIcon(note.type)}
//                 <div style={{ marginLeft: '10px' }}>
//                     <h4 style={{ margin: '0' }}>{note.name}</h4>
//                     <small>{note.createdAt.toDate().toLocaleString()}</small>
//                 </div>
//             </div>
//             <Menu position="bottom-end">
//                 <Menu.Target>
//                     <ActionIcon>
//                         <IconDots />
//                     </ActionIcon>
//                 </Menu.Target>
//                 <Menu.Dropdown>
//                     <Menu.Item onClick={() => onEdit(note)}>Edit Note</Menu.Item>
//                     <Menu.Item>Move to Another Section</Menu.Item>
//                     <Menu.Item color="red" onClick={() => onDelete(note.id)}>Delete Note</Menu.Item>
//                 </Menu.Dropdown>
//             </Menu>
//         </div>
//     );
// };

// export default NoteItem;




//plain note
// fix clickable area and 2 dot area, and add edit note name and delete note
// import React from 'react';
// import { ActionIcon, Menu } from '@mantine/core';
// import { IconDots, IconFile, IconCode, IconFileTypePdf } from '@tabler/icons-react';
// import { useNavigate } from 'react-router-dom';


// const NoteItem = ({ note, onEdit, onDelete }) => {
//     const navigate = useNavigate();

//     // Determine which icon to show based on the note type
//     const getNoteIcon = (type) => {
//         switch (type) {
//             case 'plain':
//                 return <IconFile />;
//             case 'code':
//                 return <IconCode />;
//             case 'document':
//                 return <IconFileTypePdf />;
//             default:
//                 return <IconFile />;
//         }
//     };

//     // Navigate to the appropriate note page when clicking the note item
//     // const handleNoteClick = () => {
//     //     if (note.type === 'plain') {
//     //         navigate(`/plain-note/${note.id}`);
//     //     } else if (note.type === 'code') {
//     //         navigate(`/code-note/${note.id}`);
//     //     } else if (note.type === 'document') {
//     //         navigate(`/document-note/${note.id}`);
//     //     }
//     // };

//     const handleNoteClick = () => {
//         if (note.type === 'plain') {
//             navigate(`/modules/${note.moduleId}/notes/${note.id}`);
//         } else if (note.type === 'code') {
//             navigate(`/modules/${note.moduleId}/notes/${note.id}`);
//         } else if (note.type === 'document') {
//             navigate(`/modules/${note.moduleId}/notes/${note.id}`);
//         }
//     };


//     return (
//         <div
//             style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '10px',
//                 borderRadius: '10px',
//                 padding: '5px',
//                 cursor: 'pointer',
//                 backgroundColor: '#e0f0f0'
//             }}
//         >
//             {/* Left Section: Clickable note area */}
//             <div
//                 onClick={handleNoteClick}
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     flexGrow: 1, // Takes up the available space on the left
//                     padding: '5px',
//                 }}
//             >
//                 {getNoteIcon(note.type)}
//                 <div style={{ marginLeft: '10px' }}>
//                     <h4 style={{ margin: '0' }}>{note.name}</h4>
//                     <small>{note.createdAt.toDate().toLocaleString()}</small>
//                 </div>
//             </div>

//             {/* Right Section: 3-Dot Icon Menu */}
//             <div style={{ marginLeft: '10px' }}>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon onClick={(e) => e.stopPropagation() /* Prevent note click on menu click */}>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEdit(note)}>Edit Note</Menu.Item>
//                         <Menu.Item>Move to Another Section</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDelete(note.id)}>Delete Note</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//         </div>
//     );
// };

// export default NoteItem;




// import React from 'react';
// import { ActionIcon, Menu } from '@mantine/core';
// import { IconDots, IconFile, IconCode, IconFileTypePdf } from '@tabler/icons-react';
// import { useNavigate } from 'react-router-dom';


// const NoteItem = ({ note, onEdit, onDelete }) => {
//     const navigate = useNavigate();

//     // Determine which icon to show based on the note type
//     const getNoteIcon = (type) => {
//         switch (type) {
//             case 'plain':
//                 return <IconFile />;
//             case 'code':
//                 return <IconCode />;
//             case 'document':
//                 return <IconFileTypePdf />;
//             default:
//                 return <IconFile />;
//         }
//     };

//     const handleNoteClick = () => {
//         if (note.type === 'plain') {
//             navigate(`/modules/${note.moduleId}/notes/${note.id}`);
//         } else if (note.type === 'code') {
//             navigate(`/modules/${note.moduleId}/code-notes/${note.id}`);
//         } else if (note.type === 'document') {
//             navigate(`/modules/${note.moduleId}/notes/${note.id}`);
//         }
//     };


//     return (
//         <div
//             style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: '10px',
//                 borderRadius: '10px',
//                 padding: '5px',
//                 cursor: 'pointer',
//                 backgroundColor: '#e0f0f0'
//             }}
//         >
//             {/* Left Section: Clickable note area */}
//             <div
//                 onClick={handleNoteClick}
//                 style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     flexGrow: 1, // Takes up the available space on the left
//                     padding: '5px',
//                 }}
//             >
//                 {getNoteIcon(note.type)}
//                 <div style={{ marginLeft: '10px' }}>
//                     <h4 style={{ margin: '0' }}>{note.name}</h4>
//                     <small>{note.createdAt.toDate().toLocaleString()}</small>
//                 </div>
//             </div>

//             {/* Right Section: 3-Dot Icon Menu */}
//             <div style={{ marginLeft: '10px' }}>
//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon onClick={(e) => e.stopPropagation() /* Prevent note click on menu click */}>
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEdit(note)}>Edit Note</Menu.Item>
//                         <Menu.Item>Move to Another Section</Menu.Item>
//                         <Menu.Item color="red" onClick={() => onDelete(note.id)}>Delete Note</Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//         </div>
//     );
// };

// export default NoteItem;




////add docunote
import React from 'react';
import { ActionIcon, Menu } from '@mantine/core';
import { IconDots, IconFile, IconCode, IconFileTypePdf } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';


const NoteItem = ({ note, onEdit, onDelete }) => {
    const navigate = useNavigate();

    // Determine which icon to show based on the note type
    const getNoteIcon = (type) => {
        switch (type) {
            case 'plain':
                return <IconFile />;
            case 'code':
                return <IconCode />;
            case 'document':
                return <IconFileTypePdf />;
            default:
                return <IconFile />;
        }
    };

    const handleNoteClick = () => {
        if (note.type === 'plain') {
            navigate(`/modules/${note.moduleId}/overview/sections/${note.sectionId}/notes/${note.id}`);
        } else if (note.type === 'code') {
            navigate(`/modules/${note.moduleId}/overview/sections/${note.sectionId}/code-notes/${note.id}`);
        } else if (note.type === 'document') {
            navigate(`/modules/${note.moduleId}/overview/sections/${note.sectionId}/docu-notes/${note.id}`, {
                state: { pdfUrl: note.fileURL },
            });
            console.log("note.fileURL:", note.fileURL);
        }
    };


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                borderRadius: '10px',
                padding: '5px',
                cursor: 'pointer',
                backgroundColor: '#e0f0f0'
            }}
        >
            {/* Left Section: Clickable note area */}
            <div
                onClick={handleNoteClick}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: 1, // Takes up the available space on the left
                    padding: '5px',
                }}
            >
                {getNoteIcon(note.type)}
                <div style={{ marginLeft: '10px' }}>
                    <h4 style={{ margin: '0' }}>{note.name}</h4>
                    <small>{note.createdAt.toDate().toLocaleString()}</small>
                </div>
            </div>

            {/* Right Section: 3-Dot Icon Menu */}
            <div style={{ marginLeft: '10px' }}>
                <Menu position="bottom-end">
                    <Menu.Target>
                        <ActionIcon onClick={(e) => e.stopPropagation() /* Prevent note click on menu click */}>
                            <IconDots />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={() => onEdit(note)}>Edit Note</Menu.Item>
                        <Menu.Item>Move to Another Section</Menu.Item>
                        <Menu.Item color="red" onClick={() => onDelete(note.id)}>Delete Note</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </div>
    );
};

export default NoteItem;



