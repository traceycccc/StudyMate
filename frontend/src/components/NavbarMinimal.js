// import { useState } from 'react';
// import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
// import {
//     IconHome2,
//     IconBook,
//     IconChecklist,
//     IconSettings,
//     IconLogout,
// } from '@tabler/icons-react'; // Adjust the icons as per your needs
// import StudyMateLogo from '../assets/StudyMateLogo.svg';

// const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
//     return (
//         <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
//             <UnstyledButton onClick={onClick} style={{ display: 'block', padding: '10px', marginBottom: '10px' }}>
//                 <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} color={active ? 'blue' : 'black'} />
//             </UnstyledButton>
//         </Tooltip>
//     );
// };

// const mockdata = [
//     { icon: IconHome2, label: 'Home', route: '/' },
//     { icon: IconBook, label: 'Modules', route: '/modules' },
//     { icon: IconChecklist, label: 'Tasks', route: '/tasks' },
// ];

// export const NavbarMinimal = ({ onLogout }) => {
//     const [active, setActive] = useState(0); // Default to the first link (Home)

//     const links = mockdata.map((link, index) => (
//         <NavbarLink
//             {...link}
//             key={link.label}
//             active={index === active}
//             onClick={() => setActive(index)}
//         />
//     ));

//     return (
//         <nav style={{ display: 'flex', flexDirection: 'column', width: '60px', height: '100vh', justifyContent: 'space-between', alignItems: 'center', background: '#f5f5f5' }}>
//             <Center>
//                 <img src={StudyMateLogo} alt="StudyMate Logo" style={{ width: '30px', height: '30px' }} />
//             </Center>

//             <div>
//                 <Stack justify="center" gap={0}>
//                     {links}
//                 </Stack>
//             </div>

//             <Stack justify="center" gap={0}>
//                 <NavbarLink icon={IconSettings} label="Settings" />
//                 <NavbarLink icon={IconLogout} label="Logout" onClick={onLogout} />
//             </Stack>
//         </nav>
//     );
// };




// import { useState } from 'react';
// import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
// import {
//     IconHome2,
//     IconBook,
//     IconChecklist,
//     IconSettings,
//     IconLogout,
//     IconClipboardCheck,
// } from '@tabler/icons-react';
// import StudyMateLogo from '../assets/StudyMateLogo.svg';

// const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
//     return (
//         <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
//             <UnstyledButton onClick={onClick} style={{ display: 'block', padding: '10px', marginBottom: '10px' }}>
//                 <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} color={active ? 'blue' : 'black'} />
//             </UnstyledButton>
//         </Tooltip>
//     );
// };

// export const NavbarMinimal = ({ onLogout, setActivePage, onToggleNav }) => {
//     const [active, setActive] = useState('home'); // Default to the 'home' page

//     return (
//         <nav style={{ display: 'flex', flexDirection: 'column', width: '80px', height: '100vh', justifyContent: 'space-between', alignItems: 'center', background: '#f5f5f5' }}>
//             <Center>
//                 <img src={StudyMateLogo} alt="StudyMate Logo" style={{ width: '30px', height: '30px' }} />
//             </Center>

//             <div>
//                 <Stack justify="center" gap={0}>
//                     {/* Home Link */}
//                     <NavbarLink
//                         icon={IconHome2}
//                         label="Home"
//                         active={active === 'home'}
//                         onClick={() => {
//                             setActive('home');
//                             setActivePage('home'); // Navigate to Home page
//                         }}
//                     />

//                     {/* Modules Link */}
//                     <NavbarLink
//                         icon={IconBook}
//                         label="Modules"
//                         active={active === 'modules'}
//                         onClick={() => {
//                             setActive('modules');
//                             setActivePage('modules'); // Navigate to Modules page
//                         }}
//                     />

//                     {/* Tasks Link */}
//                     <NavbarLink
//                         icon={IconChecklist}
//                         label="Tasks"
//                         active={active === 'tasks'}
//                         onClick={() => {
//                             setActive('tasks');
//                             setActivePage('tasks'); // Navigate to Tasks page
//                         }}
//                     />


//                     {/* Test Link */}
//                     <NavbarLink
//                         icon={IconClipboardCheck}
//                         label="Test"
//                         active={active === 'test'}
//                         onClick={() => {
//                             setActive('test');
//                             setActivePage('test'); // Navigate to Modules page
//                         }}
//                     />
//                 </Stack>
//             </div>

//             <Stack justify="center" gap={0}>
//                 {/* Settings Link */}
//                 <NavbarLink
//                     icon={IconSettings}
//                     label="Settings"
//                     active={active === 'settings'}
//                     onClick={() => {
//                         setActive('settings');
//                         setActivePage('settings'); // Navigate to Settings page
//                     }}
//                 />

//                 {/* Logout Button */}
//                 <NavbarLink
//                     icon={IconLogout}
//                     label="Logout"
//                     onClick={onLogout}
//                 />

                
//             </Stack>
//         </nav>
//     );
// };



// import { useState } from 'react';
// import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
// import {
//     IconHome2,
//     IconBook,
//     IconChecklist,
//     IconSettings,
//     IconLogout,
//     IconClipboardCheck,
// } from '@tabler/icons-react';
// import StudyMateLogo from '../assets/StudyMateLogo.svg';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
//     return (
//         <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
//             <UnstyledButton onClick={onClick} style={{ display: 'block', padding: '10px', marginBottom: '10px' }}>
//                 <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} color={active ? 'blue' : 'black'} />
//             </UnstyledButton>
//         </Tooltip>
//     );
// };

// export const NavbarMinimal = ({ onLogout }) => {
//     const [active, setActive] = useState('home'); // Default to the 'home' page
//     const navigate = useNavigate();  // Add useNavigate for navigation

//     return (
//         <nav style={{ display: 'flex', flexDirection: 'column', width: '80px', height: '100vh', justifyContent: 'space-between', alignItems: 'center', background: '#f5f5f5' }}>
//             <Center>
//                 <img src={StudyMateLogo} alt="StudyMate Logo" style={{ width: '30px', height: '30px', marginTop: '32px' }} />
//             </Center>

//             <div>
//                 <Stack justify="center" gap={0}>
//                     {/* Home Link */}
//                     <NavbarLink
//                         icon={IconHome2}
//                         label="Home"
//                         active={active === 'home'}
//                         onClick={() => {
//                             setActive('home');
//                             navigate('/home'); // Navigate to Home page
//                         }}
//                     />

//                     {/* Modules Link */}
//                     <NavbarLink
//                         icon={IconBook}
//                         label="Modules"
//                         active={active === 'modules'}
//                         onClick={() => {
//                             setActive('modules');
//                             navigate('/modules'); // Navigate to Modules page
//                         }}
//                     />

//                     {/* Tasks Link */}
//                     <NavbarLink
//                         icon={IconChecklist}
//                         label="Tasks"
//                         active={active === 'tasks'}
//                         onClick={() => {
//                             setActive('tasks');
//                             navigate('/tasks'); // Navigate to Tasks page
//                         }}
//                     />


//                     {/* Test Link */}
//                     <NavbarLink
//                         icon={IconClipboardCheck}
//                         label="Test"
//                         active={active === 'test'}
//                         onClick={() => {
//                             setActive('test');
//                             navigate('/test'); // Navigate to Modules page
//                         }}
//                     />
//                 </Stack>
//             </div>

//             <Stack justify="center" gap={0}>
//                 {/* Settings Link */}
//                 <NavbarLink
//                     icon={IconSettings}
//                     label="Settings"
//                     active={active === 'settings'}
//                     onClick={() => {
//                         setActive('settings');
//                         navigate('/settings'); // Navigate to Settings page
//                     }}
//                 />

//                 {/* Logout Button */}
//                 <NavbarLink
//                     icon={IconLogout}
//                     label="Logout"
//                     onClick={onLogout}
//                 />


//             </Stack>
//         </nav>
//     );
// };





// import { useState } from 'react';
// import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
// import {
//     IconHome2,
//     IconBook,
//     IconChecklist,
//     IconSettings,
//     IconLogout,
//     IconClipboardCheck,
// } from '@tabler/icons-react';
// import StudyMateLogo from '../assets/StudyMateLogo.svg';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import ThemeToggle from './ThemeToggle'; 

// const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
//     return (
//         <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
//             <UnstyledButton onClick={onClick} style={{ display: 'block', padding: '10px', marginBottom: '10px' }}>
//                 <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} color={active ? 'blue' : 'black'} />
//             </UnstyledButton>
//         </Tooltip>
//     );
// };

// export const NavbarMinimal = ({ onLogout, theme, setTheme }) => {
//     const [active, setActive] = useState('home'); // Default to the 'home' page
//     const navigate = useNavigate();  // Add useNavigate for navigation

//     return (
//         <nav style={{ display: 'flex', flexDirection: 'column', width: '80px', height: '100vh', justifyContent: 'space-between', alignItems: 'center', background: '#f5f5f5' }}>
//             <Center>
//                 <img src={StudyMateLogo} alt="StudyMate Logo" style={{ width: '30px', height: '30px', marginTop: '32px' }} />
//             </Center>

//             <div>
//                 <Stack justify="center" gap={0}>
//                     {/* Home Link */}
//                     <NavbarLink
//                         icon={IconHome2}
//                         label="Home"
//                         active={active === 'home'}
//                         onClick={() => {
//                             setActive('home');
//                             navigate('/home'); // Navigate to Home page
//                         }}
//                     />

//                     {/* Modules Link */}
//                     <NavbarLink
//                         icon={IconBook}
//                         label="Modules"
//                         active={active === 'modules'}
//                         onClick={() => {
//                             setActive('modules');
//                             navigate('/modules'); // Navigate to Modules page
//                         }}
//                     />

//                     {/* Tasks Link */}
//                     <NavbarLink
//                         icon={IconChecklist}
//                         label="Tasks"
//                         active={active === 'tasks'}
//                         onClick={() => {
//                             setActive('tasks');
//                             navigate('/tasks'); // Navigate to Tasks page
//                         }}
//                     />


//                     {/* Test Link */}
//                     <NavbarLink
//                         icon={IconClipboardCheck}
//                         label="Test"
//                         active={active === 'test'}
//                         onClick={() => {
//                             setActive('test');
//                             navigate('/test'); // Navigate to Modules page
//                         }}
//                     />
//                 </Stack>
//             </div>

//             <Stack justify="center" gap={0}>
//                 {/* Settings Link */}
//                 <NavbarLink
//                     icon={IconSettings}
//                     label="Settings"
//                     active={active === 'settings'}
//                     onClick={() => {
//                         setActive('settings');
//                         navigate('/settings'); // Navigate to Settings page
//                     }}
//                 />
//                 {/* Theme Toggle buttons */}
//                 <ThemeToggle theme={theme} setTheme={setTheme} />

//                 {/* Logout Button */}
//                 <NavbarLink
//                     icon={IconLogout}
//                     label="Logout"
//                     onClick={onLogout}
//                 />


//             </Stack>
//         </nav>
//     );
// };



// import { useState } from 'react';
// import { Center, Tooltip, UnstyledButton, Stack, rem, useMantineTheme } from '@mantine/core';

// import {
//     IconHome2,
//     IconBook,
//     IconChecklist,
//     IconSettings,
//     IconLogout,
//     IconClipboardCheck,
// } from '@tabler/icons-react';
// import StudyMateLogo from '../assets/StudyMateLogo.svg';
// import { useNavigate } from 'react-router-dom';
// import ThemeToggle from './ThemeToggle'; // Import ThemeToggle

// const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
//     return (
//         <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
//             <UnstyledButton onClick={onClick} style={{ display: 'block', padding: '10px', marginBottom: '10px' }}>
//                 <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} color={active ? 'blue' : 'black'} />
//             </UnstyledButton>
//         </Tooltip>
//     );
// };

// export const NavbarMinimal = ({ onLogout, theme, setTheme }) => {
//     const [active, setActive] = useState('home'); // Default to 'home' page
//     const navigate = useNavigate(); // Add useNavigate for navigation
//     const mantineTheme = useMantineTheme();  // Access current theme

//     return (
//         <nav
//             style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 width: '80px',
//                 height: '100vh',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 background: mantineTheme.colorScheme === 'dark' ? '#333' : '#f5f5f5', // Dynamic background based on theme
//             }}
//         >
//             <Center>
//                 <img
//                     src={StudyMateLogo}
//                     alt="StudyMate Logo"
//                     style={{ 
//                         width: '30px', 
//                         height: '30px', 
//                         marginTop: '32px',
//                         filter: mantineTheme.colorScheme === 'dark' ? 'invert(1)' : 'invert(0)', // Invert logo color
//                     }}
//                 />
//             </Center>

//             <div>
//                 <Stack justify="center" gap={0}>
//                     <NavbarLink
//                         icon={IconHome2}
//                         label="Home"
//                         active={active === 'home'}
//                         onClick={() => {
//                             setActive('home');
//                             navigate('/home');
//                         }}
//                         color={mantineTheme.colorScheme === 'dark' ? '#fff' : '#000'} // Dynamic icon color
                    
//                     />

//                     <NavbarLink
//                         icon={IconBook}
//                         label="Modules"
//                         active={active === 'modules'}
//                         onClick={() => {
//                             setActive('modules');
//                             navigate('/modules');
//                         }}
//                     />

//                     <NavbarLink
//                         icon={IconChecklist}
//                         label="Tasks"
//                         active={active === 'tasks'}
//                         onClick={() => {
//                             setActive('tasks');
//                             navigate('/tasks');
//                         }}
//                     />

//                     <NavbarLink
//                         icon={IconClipboardCheck}
//                         label="Test"
//                         active={active === 'test'}
//                         onClick={() => {
//                             setActive('test');
//                             navigate('/test');
//                         }}
//                     />
//                 </Stack>
//             </div>

//             <Stack justify="center" gap={0}>
//                 {/* Settings Link */}
//                 <NavbarLink
//                     icon={IconSettings}
//                     label="Settings"
//                     active={active === 'settings'}
//                     onClick={() => {
//                         setActive('settings');
//                         navigate('/settings');
//                     }}
//                 />

//                 {/* Theme Toggle Button */}
//                 <ThemeToggle theme={theme} setTheme={setTheme} />

//                 {/* Logout Button */}
//                 <NavbarLink
//                     icon={IconLogout}
//                     label="Logout"
//                     onClick={onLogout}
//                 />
//             </Stack>
//         </nav>
//     );
// };





import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem, useMantineTheme, Modal, Button, Text } from '@mantine/core';
import {
    IconHome2,
    IconBook,
    IconChecklist,
    IconSettings,
    IconLogout,
    IconClipboardCheck,
    IconUserCircle,
} from '@tabler/icons-react';
import StudyMateLogo from '../assets/StudyMateLogo.svg';
import { useNavigate } from 'react-router-dom';
//import ThemeToggle from './ThemeToggle';

// const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
//     return (
//         <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
//             <UnstyledButton onClick={onClick} style={{ display: 'block', padding: '10px', marginBottom: '10px' }}>
//                 <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} color={active ? 'blue' : 'black'} />
//             </UnstyledButton>
//         </Tooltip>
//     );
// };


const NavbarLink = ({ icon: Icon, image, label, active, onClick }) => {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
                onClick={onClick}
                style={{
                    display: 'block',
                    padding: '10px',
                    marginBottom: '10px',
                    marginTop: image ? '23px' : '0' // Adds top margin only for the logo
                }}
            >
                {image ? (
                    <img
                        src={image}
                        alt={label}
                        style={{
                            width: '38px',
                            height: '38px',
                        }}
                    />
                ) : (
                    <Icon style={{ width: rem(24), height: rem(24) }} stroke={1.5} color={active ? 'blue' : 'black'} />
                )}
            </UnstyledButton>
        </Tooltip>
    );
};



export const NavbarMinimal = ({ onLogout, theme, setTheme }) => {
    const [active, setActive] = useState('home');
    const [logoutModalOpen, setLogoutModalOpen] = useState(false); // State for modal visibility
    const navigate = useNavigate();
    const mantineTheme = useMantineTheme();

    const handleLogout = () => {
        setLogoutModalOpen(true); // Open modal on logout button click
    };

    const confirmLogout = () => {
        setLogoutModalOpen(false); // Close modal
        onLogout(); // Trigger the actual logout function
    };

    return (
        <>
            <nav
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '80px',
                    height: '100vh',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: mantineTheme.colorScheme === 'dark' ? '#43618B' : '#A9D3FC',
                    borderRight: '2px solid #91bfea'

                }}
            >
                {/* <Center>
                    <img
                        src={StudyMateLogo}
                        alt="StudyMate Logo"
                        style={{ 
                            width: '30px', 
                            height: '30px', 
                            marginTop: '36px',
                            filter: mantineTheme.colorScheme === 'dark' ? 'invert(1)' : 'invert(0)',
                        }}
                        onClick={() => {
                            setActive('modules');
                            navigate('/modules');
                        }}
                    />
                </Center> */}
                <Center>
                    <NavbarLink
                        image={StudyMateLogo}
                        label="Home"
                        active={active === 'modules'}
                        onClick={() => {
                            setActive('modules');
                            navigate('/modules');
                        }}
                    />
                </Center>

                <div>
                    <Stack justify="center" gap={0}>
                        {/* <NavbarLink
                            icon={IconHome2}
                            label="Home"
                            active={active === 'home'}
                            onClick={() => {
                                setActive('home');
                                navigate('/home');
                            }}
                        /> */}

                        {/* <NavbarLink
                            icon={IconBook}
                            label="Modules"
                            active={active === 'modules'}
                            onClick={() => {
                                setActive('modules');
                                navigate('/modules');
                            }}
                        /> */}

                        {/* <NavbarLink
                            icon={IconChecklist}
                            label="Tasks"
                            active={active === 'tasks'}
                            onClick={() => {
                                setActive('tasks');
                                navigate('/tasks');
                            }}
                        />

                        <NavbarLink
                            icon={IconClipboardCheck}
                            label="Test"
                            active={active === 'test'}
                            onClick={() => {
                                setActive('test');
                                navigate('/test');
                            }}
                        /> */}
                    </Stack>
                </div>

                <Stack justify="center" gap={0}>
                    <NavbarLink
                        icon={IconUserCircle}
                        label="Profile"
                        active={active === 'settings'}
                        onClick={() => {
                            setActive('settings');
                            navigate('/settings');
                        }}
                    />

                    {/* <ThemeToggle theme={theme} setTheme={setTheme} /> */}

                    <NavbarLink
                        icon={IconLogout}
                        label="Logout"
                        onClick={handleLogout} // Open confirmation modal
                    />
                </Stack>
            </nav>

            {/* Logout Confirmation Modal */}
            <Modal
                opened={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                title="Confirm Logout"
            >
                <Text>Are you sure you want to log out?</Text>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button variant="outline" onClick={() => setLogoutModalOpen(false)} style={{ marginRight: '10px' }}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={confirmLogout}>
                        Logout
                    </Button>
                </div>
            </Modal>
        </>
    );
};

