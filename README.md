StudyMate is a web application designed for self-directed learners (scope: Electrical Engineering, IT, and Computer Science). It provides a centralized space for organizing various study materials, intelligent study assistance using LLM (Large Language Model), and tools to enhance the learning experience.
-----------------------------------------------------------------------------
Features
1. Centralized Study Management
Upload and manage study materials (PDFs, DOCX, PPTX, images, code files).
Organize materials by modules and sections.
Rich text editor with support for math equations, code blocks, images, and YouTube video embedding.
2. Intelligent Study Assistance
Summarization: Extract summaries from uploaded documents.
Key Concepts: Identify and highlight key concepts in study materials.
Flashcard Generation: Automatically create flashcards from study materials for quick revision.
Code Explanation: Understand code snippets by breaking them into meaningful explanations.
Contextual Q&A: Ask questions about documents for precise answers.
3. Flashcard System
Create, edit, and organize flashcards by tags.
Flashcard testing with rating-based progression.
Practice mode with revealable answers.
4. Usability Features
Autosave functionality for notes and rich text editor.

-----------------------------------------------------------------------------
Directory Structure
frontend/
This directory contains the client-side code written in React.

Components
1. NavbarMinimal.js 
Purpose:
Provides a minimalistic sidebar navigation bar for navigating between key pages like Modules, Settings, and Logout.
Features:
- Displays the app logo and navigation links.
- Includes a session goals management modal for adding, completing, or deleting session goals.
- Logout confirmation modal for user account safety.
- Highlights the currently active section in the navbar.

2. AppLayout.js
Purpose:
Defines the overall layout of the application, including the navbar and the dynamic content area for rendering different screens based on the current route.
Features:
- Displays or hides the navbar for specific pages (e.g., Flashcard Practice and Test Session).
- Automatically redirects unauthenticated users to the login page.
- Includes routing logic for rendering various screens like Modules, Notes, Flashcards, and Settings.

3. ModuleCard.js
Purpose: Represents individual modules within the system.
Features:
- Displays module name, creation date, and action menu.
- Provides options for viewing module content, editing details or navigate to flashcards page.

4. NoteOrganizer.js
Purpose: Manages sections and notes within modules.
Features:
- CRUD sections.
- Supports section-wise note organization.
- Ensures real-time updates for sections via Firestore listeners​

5. NoteSection.js
Purpose: Handles operations for specific note sections.
Features:
- Expands to display notes within the section.
- Allows adding of plain, code, and document notes.
- Ensures validation for note and file uploads​.

6. NoteItem.js
Purpose: Represents individual notes under sections.
Features:
- Allows editing, moving, and deleting notes.
- Directs users to the corresponding note type (plain, code, or document).
- Displays creation date and provides action options​.

7. RichTextEditor.js
Purpose: A rich text editor for note content management.
Features:
- Supports text formatting (bold, italic, underline, headings).
- Allows image uploads, code blocks, LaTeX equations, and tables.
- Autosaves content to Firestore and deletes unused images​​.

8. PDFViewer.js
Purpose: Provides a feature-rich viewer for PDFs.
Features:
- Includes toolbar functionalities like zoom, search, and page navigation.
- Supports efficient PDF rendering using @react-pdf-viewer​.

9. TagSection.js
Purpose: Manages flashcards under specific tags.
Features:
- Displays flashcards and tracks progress via a progress bar.
- Allows editing, deleting tags, and creating flashcards within a tag.
- Ensures flashcard data consistency with Firestore​.

10. FlashcardCard.js
Purpose: Represents individual flashcards.
Features:
- Displays questions and answers with an option to practice.
- Supports editing and deletion of flashcard.
- Tracks the last rating for each flashcard​.

11. FlashcardTextEditor.js
Purpose: A lightweight text editor for flashcard content.
Features:
- Provides basic formatting options like bold, italics, code, and LaTeX math.
- Allows manual content insertion and retrieval​.

Key Screens
1. Modules.js
Purpose:
Displays a list of all modules, categorized into favorites and non-favorites.
Features:
- CRUD operations for modules.
- Favorite/unfavorite modules.
- Deletes associated data when a module is removed.

2. ModuleOverview.js
Purpose: Displays an overview of a selected module, showing notes and flashcards.
Features:
- Navigation to the flashcards page or note organizer for the module.
- Dynamically fetches module name and associated notes from Firestore.

3. PlainNote.js (Plain Note)
Purpose:
Used for managing plain text notes with rich formatting.
Features:
- Display a note using the RichTextEditor component.
- Autosave and load notes from Firestore.

4. DocuNote.js (Document Note)
Purpose: Displays a PDF file alongside a rich text editor for creating or editing notes related to the PDF.
Features:
- Buttons for summarizing the PDF, extracting key concepts, and contextual Q&A using an LLM.
- Flashcard generation with the option to assign tags.
- Autosave and load notes from Firestore.

5. CodeNote.js (Code Note)
Purpose: Displays code files alongside a rich text editor for creating notes or explanations.
Features:
- Syntax highlighting for code content.
- Integration with LLM to explain the code.
- Autosave and load notes from Firestore.

6. Flashcards.js
Purpose: Manages flashcards within a module, categorized by tags.
Features:
- CRUD operations for tags.
- Modal to initiate flashcard test sessions.
- Displays flashcards grouped by tags.

7. FlashcardPractice.js
Purpose: Allows users to practice flashcards one by one, with options to reveal answers.
Features:
- Navigation between flashcards.
- Optional input for typing answers.
- Fetches flashcards based on tags.

8. TestSession.js
Purpose: Implements a flashcard test session, allowing users to answer questions and receive GPT-evaluated ratings and explanations.
Features:
- Progress tracking for the test session.
- Displays questions and accepts user responses.
- Tracks completion and scores, with an option to save progress to Firestore.

9. Settings.js
Purpose: Manages user settings such as profile picture, name, and password.
Features:
- Profile picture upload and update in Firestore.
- Password validation and update.
- Reauthentication for sensitive operations.

10. Login.js
Purpose: Allows users to log in to their accounts using email and password.
Features:
- Validates user credentials via Firebase Authentication.
- Displays error messages for incorrect credentials.
- Includes links to the Register and Forgot Password pages for seamless navigation.

11. Register.js
Purpose: Enables users to create new accounts.
Features:
- Validates email, password strength, and name format.
- Checks for duplicate email registration using Firebase.
- Creates user accounts in Firebase Authentication and Firestore.
- Sends email verification upon successful registration and redirects to verification page.
- Redirects the user to Modules page (homepage) after email verification.

12. ForgotPassword.js
Purpose: Allows users to reset their passwords if forgotten.
Features:
- Validates if the email exists in Firebase Authentication.
- Sends a password reset email with a custom redirect URL (by firebase to change password).
- Displays success or error messages based on the process outcome.

---------------------------------------------------------------------------
backend/
This directory contains the server-side logic written in Node.js with Express.

1. index.js
Purpose: The primary Node.js file for backend API routing and functionality.
Endpoints:
/checkUserExists: Checks whether a user exists in the Firebase authentication database.
/convert-to-pdf: Converts DOCX or PPTX files to PDF using LibreOffice and returns the converted file.

/summarize-pdf: Extracts text from uploaded PDFs and generates summaries.
/key-concepts: Extracts and returns key concepts from uploaded PDFs.
/contextual-qa: Accepts user prompts and answers based on the context of the uploaded document.
/generate-flashcards: Creates flashcards from extracted text.
/explain-code: Provides detailed explanations of uploaded code files.

/evaluate-answer: Evaluates the user's answer to a question and provides a rating or feedback using the GPT model.

2. extract_text.py
Purpose: A Python server to extract text from PDFs using the PyMuPDF library.
Features:
- Provides the API endpoint (/extract-text) to handle PDF file uploads.
- Processes uploaded PDFs and extracts textual content from all pages.
- Cleans up temporary files after processing to ensure efficient resource management.
Usage:
- This script runs on port 5001 and is called from the Node.js backend (index.js) for text extraction tasks.
