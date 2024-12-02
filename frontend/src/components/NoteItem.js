import React, { useState } from 'react';
import { ActionIcon, Menu, Modal, Select, Button } from '@mantine/core';
import { IconDots, IconFile, IconCode, IconFileTypePdf } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Import your Firestore instance


const NoteItem = ({ note, onEdit, onDelete, sections = [] }) => {
    const navigate = useNavigate();
    const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('');

    // Displays different icons depending on the type of the note
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

    //Use react-router-dom's navigate to route users to different pages based on the note type
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


    //Update the sectionId of the note in Firestore when moving to another section
    const handleMoveNote = async () => {
        if (!selectedSection) return;

        try {
            // Update the sectionId of the note in Firestore
            const noteRef = doc(firestore, 'notes', note.id);
            await updateDoc(noteRef, {
                sectionId: selectedSection,
            });

            // Close the modal and reset state
            setIsMoveModalOpen(false);
            setSelectedSection('');
        } catch (error) {
            console.error('Error moving note:', error);
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
                backgroundColor: '#E3EEFA'
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
                    paddingLeft: '15px',
                }}
            >
                {getNoteIcon(note.type)}
                <div style={{ marginLeft: '20px' }}>
                    <h4 style={{ margin: '0' }}>{note.name}</h4>
                    <small>{note.createdAt.toDate().toLocaleString()}</small>
                </div>
            </div>

            {/* Right Section: 3-Dot Icon Menu */}
            <div style={{ marginLeft: '10px' }}>
                <Menu position="bottom-end">
                    <Menu.Target>
                        {/* <ActionIcon> */}
                        <ActionIcon onClick={(e) => e.stopPropagation()}//make sure clicking it doesnt trigger the parent onClick
                            style={{
                                backgroundColor: 'transparent', 
                                color: 'black', 
                                transition: 'background-color 0.3s ease', 
                                marginRight: '10px'
                            }}
                            radius="xl" //xs, sm, md, lg, xl
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#B3D8FD')} // Hover color
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} 
                        >
                            <IconDots />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={() => onEdit(note)}>Edit Note</Menu.Item>
                        <Menu.Item onClick={() => setIsMoveModalOpen(true)}>Move to Another Section</Menu.Item>
                        <Menu.Item color="red" onClick={() => onDelete(note.id)}>Delete Note</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>

            {/* Modal for Moving Note */}
            <Modal
                opened={isMoveModalOpen}
                onClose={() => setIsMoveModalOpen(false)}
                title="Move Note to Another Section"
            >
                <Select
                    label="Select Section"
                    placeholder="Choose a section"
                    value={selectedSection}
                    onChange={(value) => setSelectedSection(value)}
                    data={sections.map((section) => ({
                        value: section.id,
                        label: section.name,
                    }))}
                
                />
                <Button 
                    onClick={handleMoveNote} 
                    style={{ marginTop: '10px' }} 
                    disabled={!selectedSection} // Disable button if no section is selected
                >
                    Move Note
                </Button>
            </Modal>
        </div>
    );
};

export default NoteItem;




