// import React, { useState } from 'react';
// import { Routes, Route, Outlet } from 'react-router-dom';
// import { NavbarMinimal } from './NavbarMinimal';

// import Home from '../screens/Home';
// import Modules from '../screens/Modules';
// import ModuleOverview from '../screens/ModuleOverview';

// import Tasks from '../screens/Tasks';
// import Settings from '../screens/Settings';
// import TestScreen from '../screens/TestScreen';

// const AppLayout = () => {
//     const [activePage, setActivePage] = useState('home');

//     return (
//         <div style={{ display: 'flex' }}>
//             {/* Navbar remains consistent */}
//             <NavbarMinimal setActivePage={setActivePage} />

//             <div style={{ flexGrow: 1, padding: '20px' }}>
//                 {/* Content area that dynamically changes based on the route */}
//                 <Routes>
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/modules" element={<Modules />} />
//                     <Route path="/modules/:id/overview" element={<ModuleOverview />} /> {/* Pass module ID */}
//                     <Route path="/tasks" element={<Tasks />} />
//                     <Route path="/settings" element={<Settings />} />
//                     <Route path="/test" element={<TestScreen />} />
//                 </Routes>

//                 <Outlet /> 
//             </div>
//         </div>
//     );
// };

// export default AppLayout;





// import React from 'react';
// import { Routes, Route, Outlet } from 'react-router-dom';
// import { NavbarMinimal } from './NavbarMinimal';

// import Home from '../screens/Home';
// import Modules from '../screens/Modules';
// import ModuleOverview from '../screens/ModuleOverview';

// import Flashcards from '../screens/Flashcards';
// import NotePage from '../screens/NotePage'; // The note page with secondary nav


// import Tasks from '../screens/Tasks';
// import Settings from '../screens/Settings';
// import TestScreen from '../screens/TestScreen';

// const AppLayout = ({ onLogout }) => {
   

//     return (
//         <div style={{ display: 'flex' }}>
//             {/* Navbar remains consistent */}
//             <NavbarMinimal onLogout={onLogout} />

//             <div style={{ flexGrow: 1, padding: '20px' }}>
//                 {/* Content area that dynamically changes based on the route */}
//                 <Routes>
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/modules" element={<Modules />} />
//                     <Route path="/modules/:id/overview" element={<ModuleOverview />} />

//                     <Route path="/modules/:id/flashcards" element={<Flashcards />} />

//                     {/* Note Page with Secondary Nav */}
//                     <Route path="/modules/:id/note/:noteId" element={<NotePage />} />


//                     <Route path="/tasks" element={<Tasks />} />
//                     <Route path="/settings" element={<Settings />} />


//                     <Route path="/test" element={<TestScreen />} />
//                 </Routes>

//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;



//fix log out
// import React from 'react';
// import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
// import { NavbarMinimal } from './NavbarMinimal';

// import Home from '../screens/Home';
// import Modules from '../screens/Modules';
// import ModuleOverview from '../screens/ModuleOverview';

// import Flashcards from '../screens/Flashcards';
// import NotePage from '../screens/NotePage'; // The note page with secondary nav


// import Tasks from '../screens/Tasks';
// import Settings from '../screens/Settings';
// import TestScreen from '../screens/TestScreen';

// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';

// const AppLayout = () => {

//     const navigate = useNavigate(); // Initialize navigate

//     // Logout function to handle sign out and redirection
//     const handleLogout = () => {
//         signOut(auth)
//             .then(() => {
//                 console.log('User signed out');
//                 navigate('/login'); // Redirect to login page after logout
//             })
//             .catch((error) => {
//                 console.error('Error logging out:', error);
//             });
//     };


//     return (
//         <div style={{ display: 'flex' }}>
//             {/* Navbar remains consistent */}
//             <NavbarMinimal onLogout={handleLogout} />

//             <div
//                 style={{
//                     flexGrow: 1,             // Expand the content area
//                     marginLeft: '30px',
//                     overflowY: 'auto',        // Vertical scrolling
//                     overflowX: 'hidden',      // Disable horizontal scrolling
//                     height: '100vh',          // Fixed height for the content area
//                     width: '100%',            // Full width for the content area
//                     boxSizing: 'border-box',  // Ensure padding doesn't affect width calculation
//                 }}
//             >
//                 {/* Content area that dynamically changes based on the route */}
//                 <Routes>
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/modules" element={<Modules />} />
//                     <Route path="/modules/:id/overview" element={<ModuleOverview />} />

//                     <Route path="/modules/:id/flashcards" element={<Flashcards />} />

//                     {/* Note Page with Secondary Nav */}
//                     <Route path="/modules/:id/note/:noteId" element={<NotePage />} />


//                     <Route path="/tasks" element={<Tasks />} />
//                     <Route path="/settings" element={<Settings />} />


//                     <Route path="/test" element={<TestScreen />} />
//                 </Routes>

//                 <Outlet />
//             </div>
//         </div>
//     );
// };

// export default AppLayout;



////add theme
// import React from 'react';
// import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
// import { NavbarMinimal } from './NavbarMinimal';

// import Home from '../screens/Home';
// import Modules from '../screens/Modules';
// import ModuleOverview from '../screens/ModuleOverview';

// import Flashcards from '../screens/Flashcards';

// import PlainNote from '../screens/PlainNote'; // Import the PlainNote component


// import Tasks from '../screens/Tasks';
// import Settings from '../screens/Settings';
// import TestScreen from '../screens/TestScreen';

// //import NoteLayout from './NoteLayout'; 
// import ModuleNotesLayout from './ModuleNotesLayout';

// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';

// const AppLayout = ({ theme, setTheme }) => {

//     const navigate = useNavigate(); // Initialize navigate

//     // Logout function to handle sign out and redirection
//     const handleLogout = () => {
//         signOut(auth)
//             .then(() => {
//                 console.log('User signed out');
//                 navigate('/login'); // Redirect to login page after logout
//             })
//             .catch((error) => {
//                 console.error('Error logging out:', error);
//             });
//     };



//     return (
//         <div style={{ display: 'flex' }}>
//             {/* Navbar remains consistent */}
//             <NavbarMinimal onLogout={handleLogout} theme={theme} setTheme={setTheme} />

//             <div
//                 style={{
//                     flexGrow: 1,             // Expand the content area
//                     marginLeft: '30px',
//                     overflowY: 'auto',        // Vertical scrolling
//                     overflowX: 'hidden',      // Disable horizontal scrolling
//                     height: '100vh',          // Fixed height for the content area
//                     width: '100%',            // Full width for the content area
//                     boxSizing: 'border-box',  // Ensure padding doesn't affect width calculation
//                 }}
//             >
//                 {/* Content area that dynamically changes based on the route */}
//                 <Routes>
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/modules" element={<Modules />} />
//                     <Route path="/modules/:id/overview" element={<ModuleOverview />} />

//                     <Route path="/modules/:id/flashcards" element={<Flashcards />} />

//                     {/* Note Page with Secondary Nav
//                     <Route path="/modules/:id/note/:noteId" element={<NotePage />} /> */}
//                     {/* Plain Note Route */}
//                     <Route path="/modules/:moduleId/sections/:sectionId/notes/:noteId" element={<PlainNote />} />
                    
                    


//                     <Route path="/tasks" element={<Tasks />} />
//                     <Route path="/settings" element={<Settings />} />


//                     <Route path="/test" element={<TestScreen />} />
//                     {/* Note Page Routes - Wrapped with NoteLayout */}
//                     {/* <Route element={<NoteLayout />}>
//                         <Route path="/plain-note/:noteId" element={<PlainNote />} />
//                     </Route> */}

//                     {/* Notes Layout with Sidebar */}
//                     <Route element={<ModuleNotesLayout />}>
//                         <Route path="/modules/:moduleId/notes/:noteId" element={<PlainNote />} />
//                         {/* Add other note types here, e.g., CodeNote, DocumentNote */}
//                     </Route>
//                 </Routes>

//                 <Outlet />
//             </div>
//         </div>
        
//     );
// };

// export default AppLayout;


////fixing the note vessel
// import React from 'react';
// import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
// import { NavbarMinimal } from './NavbarMinimal';

// import Home from '../screens/Home';
// import Modules from '../screens/Modules';
// import ModuleOverview from '../screens/ModuleOverview';

// import Flashcards from '../screens/Flashcards';

// import PlainNote from '../screens/PlainNote'; // Import the PlainNote component


// import Tasks from '../screens/Tasks';
// import Settings from '../screens/Settings';
// import TestScreen from '../screens/TestScreen';

// //import NoteLayout from './NoteLayout'; 
// import ModuleNotesLayout from './ModuleNotesLayout';

// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';

// const AppLayout = ({ theme, setTheme }) => {

//     const navigate = useNavigate(); // Initialize navigate

//     // Logout function to handle sign out and redirection
//     const handleLogout = () => {
//         signOut(auth)
//             .then(() => {
//                 console.log('User signed out');
//                 navigate('/login'); // Redirect to login page after logout
//             })
//             .catch((error) => {
//                 console.error('Error logging out:', error);
//             });
//     };



//     return (
//         <div style={{ display: 'flex' }}>
//             {/* Navbar remains consistent */}
//             <NavbarMinimal onLogout={handleLogout} theme={theme} setTheme={setTheme} />

//             <div
//                 style={{
//                     flexGrow: 1,             // Expand the content area
//                     marginLeft: '30px',
//                     overflowY: 'auto',        // Vertical scrolling
//                     overflowX: 'hidden',      // Disable horizontal scrolling
//                     height: '100vh',          // Fixed height for the content area
//                     width: '100%',            // Full width for the content area
//                     boxSizing: 'border-box',  // Ensure padding doesn't affect width calculation
//                 }}
//             >
//                 {/* Content area that dynamically changes based on the route */}
//                 <Routes>
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/modules" element={<Modules />} />
//                     <Route path="/modules/:id/overview" element={<ModuleOverview />} />

//                     <Route path="/modules/:id/flashcards" element={<Flashcards />} />

//                     {/* Note Page with Secondary Nav
//                     <Route path="/modules/:id/note/:noteId" element={<NotePage />} /> */}
//                     {/* Plain Note Route */}
//                     <Route path="/modules/:moduleId/sections/:sectionId/notes/:noteId" element={<PlainNote />} />




//                     <Route path="/tasks" element={<Tasks />} />
//                     <Route path="/settings" element={<Settings />} />


//                     <Route path="/test" element={<TestScreen />} />
//                     {/* Note Page Routes - Wrapped with NoteLayout */}
//                     {/* <Route element={<NoteLayout />}>
//                         <Route path="/plain-note/:noteId" element={<PlainNote />} />
//                     </Route> */}

//                     {/* Notes Layout with Sidebar */}
//                     <Route element={<ModuleNotesLayout />}>
//                         <Route path="/modules/:moduleId/notes/:noteId" element={<PlainNote />} />
//                         {/* Add other note types here, e.g., CodeNote, DocumentNote */}
//                     </Route>
//                 </Routes>

//                 <Outlet />
//             </div>
//         </div>

//     );
// };

// export default AppLayout;



// //making the note vessel to appear only and nav bar bye bye, now fixing
// import React from 'react';
// import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
// import { NavbarMinimal } from './NavbarMinimal';

// import Home from '../screens/Home';
// import Modules from '../screens/Modules';
// import ModuleOverview from '../screens/ModuleOverview';

// import Flashcards from '../screens/Flashcards';

// import PlainNote from '../screens/PlainNote'; // Import the PlainNote component
// import CodeNote from '../screens/CodeNote';

// import Tasks from '../screens/Tasks';
// import Settings from '../screens/Settings';
// import TestScreen from '../screens/TestScreen';

// //import ModuleNotesLayout from './ModuleNotesLayout';

// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';

// const AppLayout = ({ theme, setTheme }) => {

//     const navigate = useNavigate(); // Initialize navigate

//     // Logout function to handle sign out and redirection
//     const handleLogout = () => {
//         signOut(auth)
//             .then(() => {
//                 console.log('User signed out');
//                 navigate('/login'); // Redirect to login page after logout
//             })
//             .catch((error) => {
//                 console.error('Error logging out:', error);
//             });
//     };



//     return (
//         <div style={{ display: 'flex' }}>
//             {/* Navbar remains consistent */}
//             <NavbarMinimal onLogout={handleLogout} theme={theme} setTheme={setTheme} />

//             <div
//                 style={{
//                     flexGrow: 1,             // Expand the content area
//                     marginLeft: '30px',
//                     overflowY: 'auto',        // Vertical scrolling
//                     overflowX: 'hidden',      // Disable horizontal scrolling
//                     height: '100vh',          // Fixed height for the content area
//                     width: '100%',            // Full width for the content area
//                     boxSizing: 'border-box',  // Ensure padding doesn't affect width calculation
//                 }}
//             >
//                 {/* Content area that dynamically changes based on the route */}
//                 <Routes>
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/modules" element={<Modules />} />
//                     <Route path="/modules/:id/overview" element={<ModuleOverview />} />

//                     <Route path="/modules/:id/flashcards" element={<Flashcards />} />

//                     {/* Note Page with Secondary Nav
//                     <Route path="/modules/:id/note/:noteId" element={<NotePage />} /> */}
//                     {/* Plain Note Route */}
//                     <Route path="/modules/:moduleId/sections/:sectionId/notes/:noteId" element={<PlainNote />} />

//                     {/* Route for Code Notes */}
//                     <Route path="/modules/:moduleId/sections/:sectionId/code-notes/:noteId" element={<CodeNote />} />





//                     <Route path="/tasks" element={<Tasks />} />
//                     <Route path="/settings" element={<Settings />} />


//                     <Route path="/test" element={<TestScreen />} />
                    

                    

//                     {/* Notes Layout with Sidebar */}
//                     <Route path="/modules/:moduleId/notes/:noteId" element={<PlainNote />} />
//                 </Routes>

//                 <Outlet />
//             </div>
//         </div>

//     );
// };

// export default AppLayout;




////add docunote
//making the note vessel to appear only and nav bar bye bye, now fixing
// import React from 'react';
// import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
// import { NavbarMinimal } from './NavbarMinimal';

// import Home from '../screens/Home';
// import Modules from '../screens/Modules';
// import ModuleOverview from '../screens/ModuleOverview';

// import Flashcards from '../screens/Flashcards';

// import PlainNote from '../screens/PlainNote'; // Import the PlainNote component
// import CodeNote from '../screens/CodeNote';
// import DocuNote from '../screens/DocuNote';

// import Tasks from '../screens/Tasks';
// import Settings from '../screens/Settings';
// import TestScreen from '../screens/TestScreen';

// //import ModuleNotesLayout from './ModuleNotesLayout';

// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase';

// const AppLayout = ({ theme, setTheme }) => {

//     const navigate = useNavigate(); // Initialize navigate

//     // Logout function to handle sign out and redirection
//     const handleLogout = () => {
//         signOut(auth)
//             .then(() => {
//                 console.log('User signed out');
//                 navigate('/login'); // Redirect to login page after logout
//             })
//             .catch((error) => {
//                 console.error('Error logging out:', error);
//             });
//     };



//     return (
//         <div style={{ display: 'flex' }}>
//             {/* Navbar remains consistent */}
//             <NavbarMinimal onLogout={handleLogout} theme={theme} setTheme={setTheme} />

//             <div
//                 style={{
//                     flexGrow: 1,             // Expand the content area
//                     marginLeft: '30px',
//                     overflowY: 'auto',        // Vertical scrolling
//                     overflowX: 'hidden',      // Disable horizontal scrolling
//                     height: '100vh',          // Fixed height for the content area
//                     width: '100%',            // Full width for the content area
//                     boxSizing: 'border-box',  // Ensure padding doesn't affect width calculation
//                 }}
//             >
//                 {/* Content area that dynamically changes based on the route */}
//                 <Routes>
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/modules" element={<Modules />} />
//                     <Route path="/modules/:id/overview" element={<ModuleOverview />} />

//                     <Route path="/modules/:id/flashcards" element={<Flashcards />} />

//                     {/* Note Page with Secondary Nav
//                     <Route path="/modules/:id/note/:noteId" element={<NotePage />} /> */}
//                     {/* Plain Note Route */}
//                     <Route path="/modules/:moduleId/overview/sections/:sectionId/notes/:noteId" element={<PlainNote />} />

//                     {/* Route for Code Notes */}
//                     <Route path="/modules/:moduleId/overview/sections/:sectionId/code-notes/:noteId" element={<CodeNote />} />

//                     <Route path="/modules/:moduleId/overview/sections/:sectionId/docu-notes/:noteId" element={<DocuNote />} />





//                     <Route path="/tasks" element={<Tasks />} />
//                     <Route path="/settings" element={<Settings />} />


//                     <Route path="/test" element={<TestScreen />} />




//                 </Routes>

//                 <Outlet />
//             </div>
//         </div>

//     );
// };

// export default AppLayout;



//stupid url undefined, and chanegd rules and the add stiuff

import React from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { NavbarMinimal } from './NavbarMinimal';

import Home from '../screens/Home';
import Modules from '../screens/Modules';
import ModuleOverview from '../screens/ModuleOverview';

import Flashcards from '../screens/Flashcards';

import PlainNote from '../screens/PlainNote'; // Import the PlainNote component
import CodeNote from '../screens/CodeNote';
import DocuNote from '../screens/DocuNote';

import Tasks from '../screens/Tasks';
import Settings from '../screens/Settings';
import TestScreen from '../screens/TestScreen';


import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AppLayout = ({ theme, setTheme }) => {

    const navigate = useNavigate(); // Initialize navigate

    // Logout function to handle sign out and redirection
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out');
                navigate('/login', { replace: true }); // Redirect to login page after logout
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };



    return (
        <div style={{ display: 'flex' }}>
            {/* Navbar remains consistent */}
            <NavbarMinimal onLogout={handleLogout} theme={theme} setTheme={setTheme} />

            <div
                style={{
                    flexGrow: 1,             // Expand the content area
                    marginLeft: '30px',
                    overflowY: 'auto',        // Vertical scrolling
                    overflowX: 'hidden',      // Disable horizontal scrolling
                    height: '100vh',          // Fixed height for the content area
                    width: '100%',            // Full width for the content area
                    boxSizing: 'border-box',  // Ensure padding doesn't affect width calculation
                }}
            >
                {/* Content area that dynamically changes based on the route */}
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/modules" element={<Modules />} />
                    <Route path="/modules/:id/overview" element={<ModuleOverview />} />

                    <Route path="/modules/:moduleId/overview/flashcards" element={<Flashcards />} />


                    {/* Note Page with Secondary Nav
                    <Route path="/modules/:id/note/:noteId" element={<NotePage />} /> */}
                    {/* Plain Note Route */}
                    <Route path="/modules/:moduleId/overview/sections/:sectionId/notes/:noteId" element={<PlainNote />} />

                    {/* Route for Code Notes */}
                    <Route path="/modules/:moduleId/overview/sections/:sectionId/code-notes/:noteId" element={<CodeNote />} />

                    <Route path="/modules/:moduleId/overview/sections/:sectionId/docu-notes/:noteId" element={<DocuNote />} />





                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/settings" element={<Settings />} />


                    <Route path="/test" element={<TestScreen />} />




                </Routes>

                <Outlet />
            </div>
        </div>

    );
};

export default AppLayout;
