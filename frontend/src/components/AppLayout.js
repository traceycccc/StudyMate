import React from 'react';
import { Routes, Route, Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { NavbarMinimal } from './NavbarMinimal';

import Modules from '../screens/Modules';
import ModuleOverview from '../screens/ModuleOverview';

import PlainNote from '../screens/PlainNote'; // Import the PlainNote component
import CodeNote from '../screens/CodeNote';
import DocuNote from '../screens/DocuNote';

import Flashcards from '../screens/Flashcards';
import FlashcardPractice from '../screens/FlashcardPractice';
import TestSession from '../screens/TestSession'; // Import TestSession component

import Settings from '../screens/Settings';


import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AppLayout = ({ user }) => {

    const navigate = useNavigate(); // Initialize navigate
    const location = useLocation(); // Get the current path



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

    //pages which need to hide navbar (test session, practice flashcard)
    const shouldHideNavbar = location.pathname.includes('/test-session') || location.pathname.includes('/practice-flashcard');


    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div style={{ display: 'flex' }}>
            {/* Navbar with hide condition for certain pages */}
            <div
                style={{
                    visibility: shouldHideNavbar ? 'hidden' : 'visible', //using shouldHideNavbar variable as has multiple pages
                    width: shouldHideNavbar ? '0' : 'auto',
                }}
            >
                <NavbarMinimal onLogout={handleLogout} />
            </div>

            <div
                style={{
                    flexGrow: 1,             // Expand the content area
                    padding: '30px',
                    overflowY: 'auto',        // Vertical scrolling
                    overflowX: 'hidden',      // disable horizontal scrolling
                    height: '100vh',          // fixed height for the content area
                    width: '100%',            // Full width for the content area
                    boxSizing: 'border-box',  // ensure padding doesn't affect width calculation
                    background: '#C3E1FE',     //background color of content area
                }}
            >
                {/* Content area that dynamically changes based on the route */}
                <Routes>
                    <Route path="/modules" element={<Modules />} />
                    <Route path="/modules/:id/overview" element={<ModuleOverview />} />

                    <Route path="/modules/:moduleId/overview/flashcards" element={<Flashcards />} />
                    <Route path="/test-session" element={<TestSession />} />
                    <Route path="/practice-flashcard/:tagId" element={<FlashcardPractice />} />


                    {/* Plain Note Route */}
                    <Route path="/modules/:moduleId/overview/sections/:sectionId/notes/:noteId" element={<PlainNote />} />

                    {/* Route for Code Notes */}
                    <Route path="/modules/:moduleId/overview/sections/:sectionId/code-notes/:noteId" element={<CodeNote />} />

                    <Route path="/modules/:moduleId/overview/sections/:sectionId/docu-notes/:noteId" element={<DocuNote />} />


                    <Route path="/settings" element={<Settings />} />
                </Routes>
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;