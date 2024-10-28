// import React from 'react';
// import { Card, ActionIcon, Menu } from '@mantine/core';
// import { IconDots, IconHeart, IconHeartFilled } from '@tabler/icons-react';


// const ModuleCard = ({ module, onToggleFavorite, onEditModule, onDeleteModule, onModuleClick }) => {
//     return (
//         <Card
//             style={{ width: '260px', position: 'relative', borderRadius: '8px', border: '1px solid #ccc', padding: '0px' }}
//         >
//             {/* Top Container (clickable) */}
//             <div
//                 onClick={() => onModuleClick(module)}
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
//                 <p style={{ fontSize: '12px', margin: '0' }}>
//                     Created on: {new Date(module.createdAt.seconds * 1000).toLocaleDateString()}
//                 </p>
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
//                     onClick={() => onToggleFavorite(module.id, module.favorite)}
//                     style={{
//                         backgroundColor: 'transparent', // Transparent background
//                         marginRight: '10px', // Add margin to the right for spacing
//                         borderRadius: '30px',
//                         transition: 'background-color 0.3s ease',
//                     }}
//                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} // Hover color
//                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
//                 >
//                     {module.favorite ? <IconHeartFilled color="red" /> : <IconHeart color="black" />}
//                 </ActionIcon>

//                 <Menu position="bottom-end">
//                     <Menu.Target>
//                         <ActionIcon
//                             style={{
//                                 backgroundColor: 'transparent', // Set the default background color of the button
//                                 color: 'black', // Default color of the icon
//                                 transition: 'background-color 0.3s ease', // Smooth transition for hover
//                             }}
//                             radius="xl"
//                             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} // Hover color
//                             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
//                         >
//                             <IconDots />
//                         </ActionIcon>
//                     </Menu.Target>
//                     <Menu.Dropdown>
//                         <Menu.Item onClick={() => onEditModule(module)}>Edit</Menu.Item>
//                         <Menu.Item onClick={() => onDeleteModule(module.id)} color="red">
//                             Delete
//                         </Menu.Item>
//                     </Menu.Dropdown>
//                 </Menu>
//             </div>
//         </Card>
//     );
// };

// export default ModuleCard;



import React from 'react';
import { Card, ActionIcon, Menu } from '@mantine/core';
import { IconDots, IconHeart, IconHeartFilled, IconCards } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'; 


const ModuleCard = ({ module, onToggleFavorite, onEditModule, onDeleteModule, onModuleClick }) => {
    const navigate = useNavigate(); // Initialize navigate
    const handleFlashcardsClick = (moduleId) => {
        navigate(`/modules/${moduleId}/overview/flashcards`, { state: { from: 'modules-main' } });
    };


    return (
        <Card
            style={{ width: '260px', position: 'relative', borderRadius: '8px', border: '1px solid #ccc', padding: '0px' }}
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
                    borderTop: '1px solid #ccc',
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
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} // Hover color
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
                >
                    <IconCards />
                </ActionIcon>


                <ActionIcon
                    onClick={() => onToggleFavorite(module.id, module.favorite)}
                    style={{
                        backgroundColor: 'transparent', // Transparent background
                        marginRight: '10px', // Add margin to the right for spacing
                        borderRadius: '30px',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} // Hover color
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')} // Original color when not hovered
                >
                    {module.favorite ? <IconHeartFilled color="red" /> : <IconHeart color="black" />}
                </ActionIcon>

                <Menu position="bottom-end">
                    <Menu.Target>
                        <ActionIcon
                            style={{
                                backgroundColor: 'transparent', // Set the default background color of the button
                                color: 'black', // Default color of the icon
                                transition: 'background-color 0.3s ease', // Smooth transition for hover
                            }}
                            radius="xl"
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')} // Hover color
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
