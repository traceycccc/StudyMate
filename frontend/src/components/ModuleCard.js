import React from 'react';
import { Card, ActionIcon, Menu } from '@mantine/core';
import { IconDots, IconHeart, IconHeartFilled, IconCards } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; 


const ModuleCard = ({ module, onToggleFavorite, onEditModule, onDeleteModule, onModuleClick }) => {
    const navigate = useNavigate(); // Initialize navigate
    // navigate to flashcard page
    const handleFlashcardsClick = (moduleId) => {
        navigate(`/modules/${moduleId}/overview/flashcards`, { state: { from: 'modules-main' } }); //state to differenciate from the other button in ModuleOverview page
    };


    return (
        <Card
            style={{ width: '260px', position: 'relative', borderRadius: '8px', border: '1.5px solid #91bfea', padding: '0px' }}
        >
            {/* Top Container (clickable) */}
            <div
                onClick={() => onModuleClick(module)}
                style={{
                    backgroundColor: module.color,
                    padding: '20px',
                    cursor: 'pointer',
                    height: '130px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <h3 style={{ margin: '0' }}>{module.name}</h3>
                <p style={{ fontSize: '12px', margin: '0' }}>
                    Created on: {new Date(module.createdAt.seconds * 1000).toLocaleDateString()}
                </p>
            </div>

            {/* Bottom Container (non-clickable) */}
            <div
                style={{
                    padding: '6px',
                    paddingRight: '8px',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    borderTop: '1.5px solid #91bfea',
                }}
            >
                {/* Flashcards Icon */}
                <ActionIcon
                    onClick={() => handleFlashcardsClick(module.id)}
                    style={{
                        color: 'black',
                        backgroundColor: 'transparent',
                        marginRight: '10px',
                        borderRadius: '30px',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cde5fa')} // Hover color
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
                >
                    <IconCards />
                </ActionIcon>


                <ActionIcon
                    onClick={() => onToggleFavorite(module.id, module.favorite)}
                    style={{
                        backgroundColor: 'transparent', 
                        marginRight: '10px', 
                        borderRadius: '30px',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cde5fa')} // Hover color
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
                >
                    {module.favorite ? <IconHeartFilled color="red" /> : <IconHeart color="black" />}
                </ActionIcon>

                <Menu position="bottom-end">
                    <Menu.Target>
                        <ActionIcon
                            style={{
                                backgroundColor: 'transparent', // Set the default background color of the button
                                color: 'black', 
                                transition: 'background-color 0.3s ease', 
                            }}
                            radius="xl"
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cde5fa')} // Hover color
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
                        >
                            <IconDots />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item onClick={() => onEditModule(module)}>Edit</Menu.Item>
                        <Menu.Item onClick={() => onDeleteModule(module.id)} color="red">
                            Delete
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
        </Card>
    );
};

export default ModuleCard;
