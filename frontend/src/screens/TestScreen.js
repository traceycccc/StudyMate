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


import React, { useRef } from 'react';
import { Text, Button } from '@mantine/core';
import RichTextEditor from '../components/RichTextEditor';

const TestScreen = () => {
    const editorRef = useRef(); // Create a ref to hold the editor instance

    const handleInsertText = () => {
        if (editorRef.current) {
            editorRef.current.insertText("Testing, this is from somewhere, this is not typed by human.");
        }
    };

    return (
        <div>
            <Text>Test Screen</Text>
            <Button onClick={handleInsertText} mb="md">Insert Text</Button>
            <RichTextEditor ref={editorRef} />
        </div>
    );
};

export default TestScreen;
