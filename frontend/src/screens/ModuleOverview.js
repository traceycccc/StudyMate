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
        <div style={{ paddingTop: '0px' }}>
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

