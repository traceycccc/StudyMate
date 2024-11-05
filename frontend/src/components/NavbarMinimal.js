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





// import { useState } from 'react';
// import { Center, Tooltip, UnstyledButton, Stack, rem, useMantineTheme, Modal, Button, Text } from '@mantine/core';
// import {
//     IconHome2,
//     IconBook,
//     IconChecklist,
//     IconSettings,
//     IconLogout,
//     IconClipboardCheck,
//     IconUserCircle,
// } from '@tabler/icons-react';
// import StudyMateLogo from '../assets/StudyMateLogo.svg';
// import { useNavigate } from 'react-router-dom';
// //import ThemeToggle from './ThemeToggle';

// // const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
// //     return (
// //         <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
// //             <UnstyledButton onClick={onClick} style={{ display: 'block', padding: '10px', marginBottom: '10px' }}>
// //                 <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} color={active ? 'blue' : 'black'} />
// //             </UnstyledButton>
// //         </Tooltip>
// //     );
// // };


// const NavbarLink = ({ icon: Icon, image, label, active, onClick }) => {
//     return (
//         <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
//             <UnstyledButton
//                 onClick={onClick}
//                 style={{
//                     display: 'block',
//                     padding: '10px',
//                     marginBottom: '10px',
//                     marginTop: image ? '23px' : '0' // Adds top margin only for the logo
//                 }}
//             >
//                 {image ? (
//                     <img
//                         src={image}
//                         alt={label}
//                         style={{
//                             width: '38px',
//                             height: '38px',
//                         }}
//                     />
//                 ) : (
//                     <Icon style={{ width: rem(24), height: rem(24) }} stroke={1.5} color={active ? 'blue' : 'black'} />
//                 )}
//             </UnstyledButton>
//         </Tooltip>
//     );
// };



// export const NavbarMinimal = ({ onLogout, theme, setTheme }) => {
//     const [active, setActive] = useState('home');
//     const [logoutModalOpen, setLogoutModalOpen] = useState(false); // State for modal visibility
//     const navigate = useNavigate();
//     const mantineTheme = useMantineTheme();

//     const handleLogout = () => {
//         setLogoutModalOpen(true); // Open modal on logout button click
//     };

//     const confirmLogout = () => {
//         setLogoutModalOpen(false); // Close modal
//         onLogout(); // Trigger the actual logout function
//     };

//     return (
//         <>
//             <nav
//                 style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     width: '80px',
//                     height: '100vh',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     background: mantineTheme.colorScheme === 'dark' ? '#43618B' : '#A9D3FC',
//                     borderRight: '2px solid #91bfea'

//                 }}
//             >
//                 {/* <Center>
//                     <img
//                         src={StudyMateLogo}
//                         alt="StudyMate Logo"
//                         style={{ 
//                             width: '30px', 
//                             height: '30px', 
//                             marginTop: '36px',
//                             filter: mantineTheme.colorScheme === 'dark' ? 'invert(1)' : 'invert(0)',
//                         }}
//                         onClick={() => {
//                             setActive('modules');
//                             navigate('/modules');
//                         }}
//                     />
//                 </Center> */}
//                 <Center>
//                     <NavbarLink
//                         image={StudyMateLogo}
//                         label="Home"
//                         active={active === 'modules'}
//                         onClick={() => {
//                             setActive('modules');
//                             navigate('/modules');
//                         }}
//                     />
//                 </Center>

//                 <div>
//                     <Stack justify="center" gap={0}>
//                         {/* <NavbarLink
//                             icon={IconHome2}
//                             label="Home"
//                             active={active === 'home'}
//                             onClick={() => {
//                                 setActive('home');
//                                 navigate('/home');
//                             }}
//                         /> */}

//                         {/* <NavbarLink
//                             icon={IconBook}
//                             label="Modules"
//                             active={active === 'modules'}
//                             onClick={() => {
//                                 setActive('modules');
//                                 navigate('/modules');
//                             }}
//                         /> */}

//                         {/* <NavbarLink
//                             icon={IconChecklist}
//                             label="Tasks"
//                             active={active === 'tasks'}
//                             onClick={() => {
//                                 setActive('tasks');
//                                 navigate('/tasks');
//                             }}
//                         />

//                         <NavbarLink
//                             icon={IconClipboardCheck}
//                             label="Test"
//                             active={active === 'test'}
//                             onClick={() => {
//                                 setActive('test');
//                                 navigate('/test');
//                             }}
//                         /> */}
//                     </Stack>
//                 </div>

//                 <Stack justify="center" gap={0}>
//                     <NavbarLink
//                         icon={IconUserCircle}
//                         label="Profile"
//                         active={active === 'settings'}
//                         onClick={() => {
//                             setActive('settings');
//                             navigate('/settings');
//                         }}
//                     />

//                     {/* <ThemeToggle theme={theme} setTheme={setTheme} /> */}

//                     <NavbarLink
//                         icon={IconLogout}
//                         label="Logout"
//                         onClick={handleLogout} // Open confirmation modal
//                     />
//                 </Stack>
//             </nav>

//             {/* Logout Confirmation Modal */}
//             <Modal
//                 opened={logoutModalOpen}
//                 onClose={() => setLogoutModalOpen(false)}
//                 title="Confirm Logout"
//             >
//                 <Text>Are you sure you want to log out?</Text>
//                 <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
//                     <Button variant="outline" onClick={() => setLogoutModalOpen(false)} style={{ marginRight: '10px' }}>
//                         Cancel
//                     </Button>
//                     <Button color="red" onClick={confirmLogout}>
//                         Logout
//                     </Button>
//                 </div>
//             </Modal>
//         </>
//     );
// };




//last
// import { useState } from 'react';
// import {
//     Center,
//     Tooltip,
//     UnstyledButton,
//     Stack,
//     rem,
//     useMantineTheme,
//     Modal,
//     Button,
//     Text,
//     TextInput,
//     Divider
// } from '@mantine/core';
// import {
//     IconHome2,
//     IconBook,
//     IconChecklist,
//     IconSettings,
//     IconLogout,
//     IconClipboardCheck,
//     IconUserCircle,
//     IconPlus,
//     IconX,
//     IconCheck
// } from '@tabler/icons-react';
// import StudyMateLogo from '../assets/StudyMateLogo.svg';
// import { useNavigate } from 'react-router-dom';

// const NavbarLink = ({ icon: Icon, image, label, active, onClick }) => {
//     return (
//         <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
//             <UnstyledButton
//                 onClick={onClick}
//                 style={{
//                     display: 'block',
//                     padding: '10px',
//                     marginBottom: '10px',
//                     marginTop: image ? '23px' : '0'
//                 }}
//             >
//                 {image ? (
//                     <img
//                         src={image}
//                         alt={label}
//                         style={{
//                             width: '38px',
//                             height: '38px',
//                         }}
//                     />
//                 ) : (
//                     <Icon style={{ width: rem(24), height: rem(24) }} stroke={1.5} color={active ? 'blue' : 'black'} />
//                 )}
//             </UnstyledButton>
//         </Tooltip>
//     );
// };

// export const NavbarMinimal = ({ onLogout, theme, setTheme }) => {
//     const [active, setActive] = useState('home');
//     const [logoutModalOpen, setLogoutModalOpen] = useState(false);
//     const [sessionGoalsOpen, setSessionGoalsOpen] = useState(false);
//     const [goals, setGoals] = useState([]);
//     const [newGoalText, setNewGoalText] = useState(''); // State for input text
//     const navigate = useNavigate();
//     const mantineTheme = useMantineTheme();

//     const handleLogout = () => {
//         setLogoutModalOpen(true);
//     };

//     const confirmLogout = () => {
//         setLogoutModalOpen(false);
//         onLogout();
//     };

//     const toggleGoalModal = () => {
//         setSessionGoalsOpen((prev) => !prev);
//     };

//     const addGoal = () => {
//         if (newGoalText.trim() !== '') { // Ensure goal text is not empty
//             setGoals([...goals, { text: newGoalText, completed: false }]);
//             setNewGoalText(''); // Clear input after adding
//         }
//     };

//     const completeGoal = (index) => {
//         const newGoals = goals.map((goal, i) =>
//             i === index ? { ...goal, completed: !goal.completed } : goal
//         );
//         setGoals(newGoals);
//     };

//     const removeGoal = (index) => {
//         const newGoals = goals.filter((_, i) => i !== index);
//         setGoals(newGoals);
//     };

//     return (
//         <>
//             <nav
//                 style={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     width: '80px',
//                     height: '100vh',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     background: mantineTheme.colorScheme === 'dark' ? '#43618B' : '#A9D3FC',
//                     borderRight: '2px solid #91bfea'
//                 }}
//             >
//                 <Center>
//                     <NavbarLink
//                         image={StudyMateLogo}
//                         label="Home"
//                         active={active === 'modules'}
//                         onClick={() => {
//                             setActive('modules');
//                             navigate('/modules');
//                         }}
//                     />
//                 </Center>

//                 <div>
//                     <Stack justify="center" gap={0}>
//                         <NavbarLink
//                             icon={IconChecklist}
//                             label="Session Goals"
//                             onClick={toggleGoalModal}
//                         />
//                     </Stack>
//                 </div>

//                 <Stack justify="center" gap={0}>
//                     <NavbarLink
//                         icon={IconUserCircle}
//                         label="Profile"
//                         active={active === 'settings'}
//                         onClick={() => {
//                             setActive('settings');
//                             navigate('/settings');
//                         }}
//                     />
//                     <NavbarLink
//                         icon={IconLogout}
//                         label="Logout"
//                         onClick={handleLogout}
//                     />
//                 </Stack>
//             </nav>

//             {/* Session Goals Modal */}
//             <Modal
//                 opened={sessionGoalsOpen}
//                 onClose={toggleGoalModal}
//                 title="Session Goals"
//             >
//                 <TextInput
//                     placeholder="Type a goal..."
//                     value={newGoalText} // Bind input text state
//                     onChange={(e) => setNewGoalText(e.target.value)}
//                 />
//                 <Button onClick={addGoal} leftIcon={<IconPlus size={16} />}>
//                     Add Goal
//                 </Button>
//                 <Divider my="sm" />
//                 <Text align="center">
//                     {goals.filter(goal => !goal.completed).length} Open | {goals.filter(goal => goal.completed).length} Completed
//                 </Text>
//                 {goals.map((goal, index) => (
//                     <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
//                         <Button
//                             variant="outline"
//                             color={goal.completed ? 'green' : 'gray'}
//                             onClick={() => completeGoal(index)}
//                             leftIcon={goal.completed ? <IconCheck /> : null}
//                         >
//                             {goal.completed ? <s>{goal.text}</s> : goal.text}
//                         </Button>
//                         <Button variant="subtle" color="red" onClick={() => removeGoal(index)}>
//                             <IconX size={16} />
//                         </Button>
//                     </div>
//                 ))}
//             </Modal>

//             {/* Logout Confirmation Modal */}
//             <Modal
//                 opened={logoutModalOpen}
//                 onClose={() => setLogoutModalOpen(false)}
//                 title="Confirm Logout"
//             >
//                 <Text>Are you sure you want to log out?</Text>
//                 <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
//                     <Button variant="outline" onClick={() => setLogoutModalOpen(false)} style={{ marginRight: '10px' }}>
//                         Cancel
//                     </Button>
//                     <Button color="red" onClick={confirmLogout}>
//                         Logout
//                     </Button>
//                 </div>
//             </Modal>
//         </>
//     );
// };



import { useState } from 'react';
import {
    Center,
    Tooltip,
    UnstyledButton,
    Stack,
    rem,
    useMantineTheme,
    Modal,
    Button,
    Text,
    TextInput,
    Divider
} from '@mantine/core';
import {
    IconHome2,
    IconBook,
    IconChecklist,
    IconSettings,
    IconLogout,
    IconClipboardCheck,
    IconUserCircle,
    IconPlus,
    IconX,
    IconCheck
} from '@tabler/icons-react';
import StudyMateLogo from '../assets/StudyMateLogo.svg';
import { useNavigate } from 'react-router-dom';

const NavbarLink = ({ icon: Icon, image, label, active, onClick }) => {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
                onClick={onClick}
                style={{
                    display: 'block',
                    padding: '10px',
                    marginBottom: '10px',
                    marginTop: image ? '23px' : '0'
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
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [sessionGoalsOpen, setSessionGoalsOpen] = useState(false);
    const [goals, setGoals] = useState([]);
    const [newGoalText, setNewGoalText] = useState(''); // State for input text
    const navigate = useNavigate();
    const mantineTheme = useMantineTheme();

    const handleLogout = () => {
        setLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        setLogoutModalOpen(false);
        onLogout();
    };

    const toggleGoalModal = () => {
        setSessionGoalsOpen((prev) => !prev);
    };

    const addGoal = () => {
        if (newGoalText.trim() !== '') { // Ensure goal text is not empty
            setGoals([...goals, { text: newGoalText, completed: false }]);
            setNewGoalText(''); // Clear input after adding
        }
    };

    const completeGoal = (index) => {
        const newGoals = goals.map((goal, i) =>
            i === index ? { ...goal, completed: !goal.completed } : goal
        );
        setGoals(newGoals);
    };

    const removeGoal = (index) => {
        const newGoals = goals.filter((_, i) => i !== index);
        setGoals(newGoals);
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

                

                <Stack justify="center" gap={0}>
                    <NavbarLink
                        icon={IconChecklist}
                        label="Session Goals"
                        onClick={toggleGoalModal}
                    />
                    <NavbarLink
                        icon={IconUserCircle}
                        label="Profile"
                        active={active === 'settings'}
                        onClick={() => {
                            setActive('settings');
                            navigate('/settings');
                        }}
                    />
                    <NavbarLink
                        icon={IconLogout}
                        label="Logout"
                        onClick={handleLogout}
                    />
                </Stack>
            </nav>

            {/* Session Goals Modal */}
            <Modal
                opened={sessionGoalsOpen}
                onClose={toggleGoalModal}
                title="Session Goals"
            >
                <div style={{ display: 'flex', gap: '10px' }}> {/* Add spacing between input and button */}
                    <TextInput
                        placeholder="Type a goal..."
                        value={newGoalText} // Bind input text state
                        onChange={(e) => setNewGoalText(e.target.value)}
                        style={{ flexGrow: 1 }}
                    />
                    <Button onClick={addGoal} leftIcon={<IconPlus size={16} />}>
                        Add Goal
                    </Button>
                </div>
                <Divider my="sm" />
                <Text align="center">
                    {goals.filter(goal => !goal.completed).length} Open | {goals.filter(goal => goal.completed).length} Completed
                </Text>
                {goals.map((goal, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <Button
                            variant="outline"
                            color={goal.completed ? 'green' : 'gray'}
                            onClick={() => completeGoal(index)}
                            leftIcon={goal.completed ? <IconCheck /> : null}
                            style={{
                                flexGrow: 1, // Take up full width
                                justifyContent: 'flex-start', // Align text to the left
                                textAlign: 'left', // Align button content to the left
                                padding: '10px', // Add padding for better look
                            }}
                        >
                            {goal.completed ? <s>{goal.text}</s> : goal.text}
                        </Button>
                        <Button variant="subtle" color="red" onClick={() => removeGoal(index)}>
                            <IconX size={16} />
                        </Button>
                    </div>
                ))}
            </Modal>

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


