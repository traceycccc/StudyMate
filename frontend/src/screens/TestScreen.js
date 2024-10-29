// import React from 'react';
// import { Text } from '@mantine/core';
// import RichTextEditor from '../components/RichTextEditor'; 

// const TestScreen = () => {
//     return (
//         <div>
//             <Text>Test Screen</Text>
//             <RichTextEditor />
//         </div>
//     );
// };

// export default TestScreen;



//test editor
// import React, { useRef } from 'react';
// import { Text, Button } from '@mantine/core';
// import RichTextEditor from '../components/RichTextEditor';


// const TestScreen = () => {
//     const editorRef = useRef(); // Create a ref to hold the editor instance

//     const handleInsertText = () => {
//         if (editorRef.current) {
//             editorRef.current.insertText("Testing, this is from somewhere, this is not typed by human.");
//         }
//     };

//     return (
//         <div>
//             <Text>Test Screen</Text>
//             <Button onClick={handleInsertText} mb="md">Insert Text</Button>
//             <RichTextEditor ref={editorRef} />

//         </div>
//     );
// };

// export default TestScreen;


// import React, { useState } from 'react';

// // Function to extract plain text from HTML content
// const extractPlainText = (htmlContent) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlContent, 'text/html');

//     const walk = (node) => {
//         let text = '';
//         node.childNodes.forEach((child) => {
//             if (child.nodeType === Node.TEXT_NODE) {
//                 text += child.nodeValue;
//             } else if (child.nodeType === Node.ELEMENT_NODE) {
//                 if (child.tagName === 'SPAN' && child.dataset.latex) {
//                     text += ` ${child.dataset.latex} `;
//                 } else if (child.tagName === 'LI') {
//                     // Add list item text with a new line after each item
//                     text += walk(child) + '\n';
//                 } else if (child.tagName === 'UL' || child.tagName === 'OL') {
//                     // Add line breaks between lists for better readability
//                     text += walk(child) + '\n';
//                 } else {
//                     // Recursively walk for other elements
//                     text += walk(child);
//                 }
//             }
//         });
//         return text;
//     };

//     // Clean up extra spaces and line breaks
//     return walk(doc.body).replace(/\s+\n/g, '\n').replace(/\n\s+/g, '\n').trim();
// };

// // Example HTML to test
// const html = `
//     <ul><li><p>apple</p></li><li><p>orange</p></li><li><p>pie</p></li></ul>
//     <ol><li><p>blue</p></li><li><p>yellow</p></li><li><p>red</p></li></ol>
//     <p><u>underlined</u></p>
//     <p><code>italic</code></p>
// `;
// console.log(extractPlainText(html));
// // Output should be properly formatted list items with line breaks, and plain text for code and underlined sections.



// const TestScreen = () => {
//     const [htmlContent, setHtmlContent] = useState(`
//         <p><strong>Bold text</strong> and <em>italic text</em>. Here's a <mark>highlighted section</mark>.</p>
//         <p>Here’s a math equation: <span data-latex="E=mc^2">$E=mc^2$</span></p><ul><li><p>apple</p></li><li><p>orange</p></li><li><p>pie</p></li></ul>
//     <ol><li><p>blue</p></li><li><p>yellow</p></li><li><p>red</p></li></ol>
//     <p><u>underlined</u></p>
//     <p><code>italic</code></p>
//     `);
//     const [plainText, setPlainText] = useState('');

//     const handleTest = () => {
//         const extractedText = extractPlainText(htmlContent);
//         setPlainText(extractedText);
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>HTML to Plain Text Test</h2>
//             <p>Original HTML Content:</p>
//             <div
//                 style={{
//                     padding: '10px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     backgroundColor: '#f9f9f9',
//                     marginBottom: '10px',
//                 }}
//                 dangerouslySetInnerHTML={{ __html: htmlContent }}
//             />
//             <button onClick={handleTest}>Extract Plain Text</button>
//             <h3>Extracted Plain Text:</h3>
//             <p>{plainText}</p>
//         </div>
//     );
// };

// export default TestScreen;




import React from 'react';
import { Card, Text } from '@mantine/core';

const FlashcardCard = ({ flashcard }) => {
    return (
        <Card shadow="sm" padding="lg" style={{ marginBottom: '10px' }}>
            <Text weight={500} size="lg" style={{ marginBottom: '5px' }}>Q:  bhgi</Text>
            <Text color="dimmed">A: vuvuyv</Text>
        </Card>
    );
};

export default FlashcardCard;
