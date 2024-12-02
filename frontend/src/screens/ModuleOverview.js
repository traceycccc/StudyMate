import React, { useEffect, useState } from 'react';
import { Button, Group } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { firestore } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import NoteOrganizer from '../components/NoteOrganizer'; // Import NoteOrganizer

const ModuleOverview = () => {
    const navigate = useNavigate();
    const location = useLocation();  //retrieves the current route's state (moduleName)
    const { id: moduleId } = useParams(); // Extracts the id (module ID) from the URL as moduleId
    const [moduleName, setModuleName] = useState(location.state?.moduleName || 'Module'); // Initial state from location

    // Fetch module name if not in location state
    useEffect(() => {
        if (!location.state?.moduleName) {
            const fetchModuleName = async () => {
                try {
                    const moduleDoc = await getDoc(doc(firestore, 'modules', moduleId));
                    if (moduleDoc.exists()) {
                        setModuleName(moduleDoc.data().name);
                    } else {
                        console.error("Module not found.");
                    }
                } catch (error) {
                    console.error("Error fetching module name:", error);
                }
            };
            fetchModuleName();
        }
    }, [location.state?.moduleName, moduleId]);

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
                onClick={() => navigate(`/modules/${moduleId}/overview/flashcards`, { state: { from: 'module-overview' } })} //Passes a state object (from: 'module-overview') to indicate the navigation origin
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

