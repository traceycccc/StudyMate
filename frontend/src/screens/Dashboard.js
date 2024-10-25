// import React from 'react';
// import { auth } from '../firebase';
// import { signOut } from 'firebase/auth';

// const Dashboard = () => {
//     const handleLogout = () => {
//         signOut(auth).then(() => {
//             console.log('User logged out');
//         }).catch((error) => {
//             console.error('Error logging out:', error);
//         });
//     };

//     return (
//         <div>
//             <h1>Welcome to your Dashboard</h1>
//             <p>This is a protected route.</p>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// };

// export default Dashboard;


// import React, { useState } from 'react';
// import { auth } from '../firebase';
// import { signOut } from 'firebase/auth';
// import { NavbarMinimal } from '../components/NavbarMinimal';
// import { Container, Button } from '@mantine/core';
// import { IconMenu2 } from '@tabler/icons-react'; // Menu icon for toggle button
// import Home from './Home';
// import Modules from './Modules';
// import Tasks from './Tasks';
// import Settings from './Settings';

// const Dashboard = () => {
//     const [activePage, setActivePage] = useState('home'); // Tracks active page
//     const [navVisible, setNavVisible] = useState(true); // Tracks whether nav bar is visible

//     const handleLogout = () => {
//         signOut(auth)
//             .then(() => {
//                 console.log('User logged out');
//             })
//             .catch((error) => {
//                 console.error('Error logging out:', error);
//             });
//     };

//     // Render the current page
//     const renderPage = () => {
//         switch (activePage) {
//             case 'home':
//                 return <Home />;
//             case 'modules':
//                 return <Modules />;
//             case 'tasks':
//                 return <Tasks />;
//             case 'settings':
//                 return <Settings />;
//             default:
//                 return <Home />;
//         }
//     };

//     return (
//         <div style={{ display: 'flex' }}>
//             {/* Render Navbar if navVisible is true */}
//             {navVisible && (
//                 <NavbarMinimal onLogout={handleLogout} setActivePage={setActivePage} />
//             )}

//             <Container style={{ flexGrow: 1, padding: '20px' }}>
//                 {/* Display toggle button only when nav bar is hidden */}
//                 {!navVisible && (
//                     <Button
//                         variant="outline"
//                         onClick={() => setNavVisible(true)}
//                         style={{ position: 'absolute', top: '20px', left: '20px' }}
//                     >
//                         <IconMenu2 size={24} />
//                     </Button>
//                 )}

//                 {renderPage()} {/* Render the active page */}
//             </Container>
//         </div>
//     );
// };

// export default Dashboard;



import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { NavbarMinimal } from '../components/NavbarMinimal';
import { Container } from '@mantine/core';
import Home from './Home';
import Modules from './Modules'; 
import Tasks from './Tasks';
import Settings from './Settings';
import PageA from './PageA';  // Import the new PageA component
import TestScreen from './TestScreen'; // Import the TestScreen component


const Dashboard = () => {
    const [activePage, setActivePage] = useState('home'); // Tracks active page
    const [navVisible, setNavVisible] = useState(true);   // Tracks whether nav bar is visible

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('User logged out');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };

    // Render the current page, including nav bar visibility
    const renderPage = () => {
        switch (activePage) {
            case 'home':
                return <Home />;
            case 'modules':
                return <Modules setActivePage={setActivePage} setNavVisible={setNavVisible} />;
            case 'tasks':
                return <Tasks />;
            case 'settings':
                return <Settings />;
            case 'test':
                return <TestScreen />;
            case 'pageA':  // Render PageA without the navbar
                return <PageA setActivePage={setActivePage} setNavVisible={setNavVisible} />;
            default:
                return <Home />;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Render Navbar if navVisible is true */}
            {navVisible && (
                <NavbarMinimal onLogout={handleLogout} setActivePage={setActivePage} />
            )}

            <Container style={{ flexGrow: 1, padding: '20px' }}>
                {renderPage()} {/* Render the active page */}
            </Container>
        </div>
    );
};

export default Dashboard;
