// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mantine/core';
// import { IconArrowLeft } from '@tabler/icons-react';

// const PageA = () => {
//     const navigate = useNavigate();

//     const goBack = () => {
//         navigate('/modules'); // Go back to Modules and show the navbar again
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Button
//                 onClick={goBack}
//                 variant="outline"
//                 leftIcon={<IconArrowLeft size={20} />}
//             >
//                 Back to Modules
//             </Button>
//             <h1>This is Page A</h1>
//             <p>The navbar is hidden on this page.</p>
//         </div>
//     );
// };

// export default PageA;


import React from 'react';
import { Button } from '@mantine/core'; // Import Button from Mantine only
import { IconArrowLeft } from '@tabler/icons-react'; // Import IconArrowLeft from Tabler Icons

const PageA = ({ setActivePage, setNavVisible }) => {
    const handleGoBack = () => {
        setNavVisible(true); // Show the navigation bar again
        setActivePage('modules'); // Navigate back to Modules page
    };

    return (
        <div>
            <Button
                leftIcon={<IconArrowLeft />}
                variant="subtle"
                onClick={handleGoBack}
                style={{ position: 'absolute', top: '20px', left: '20px' }}
            >
                Back
            </Button>
            <h1>This is Page A</h1>
            <p>This page does not show the navigation bar.</p>
        </div>
    );
};

export default PageA;


