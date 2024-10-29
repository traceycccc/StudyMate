// // RichTextEditor.js
// import React from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { FloatingMenu, BubbleMenu } from '@tiptap/react';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';

// const RichTextEditor = () => {
//     const editor = useEditor({
//         extensions: [StarterKit],
//         content: '<p>Hello World!</p>',
//     });

//     if (!editor) {
//         return null;
//     }

//     return (
//         <>
//             {/* Toolbar */}
//             <Group spacing="xs" position="left" mb="md">
//                 <Button
//                     variant={editor.isActive('bold') ? 'filled' : 'outline'}
//                     leftIcon={<IconBold size={14} />}
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                 >
//                     Bold
//                 </Button>
//                 <Button
//                     variant={editor.isActive('italic') ? 'filled' : 'outline'}
//                     leftIcon={<IconItalic size={14} />}
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                 >
//                     Italic
//                 </Button>
//                 <Button
//                     variant={editor.isActive('heading', { level: 1 }) ? 'filled' : 'outline'}
//                     leftIcon={<IconH1 size={14} />}
//                     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                 >
//                     H1
//                 </Button>
//             </Group>

//             {/* The main content of the editor */}
//             <EditorContent editor={editor} style={{ border: '1px solid #e0e0e0', padding: '10px' }} />

//             {/* Floating menu (can add more features or custom style) */}
//             <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
//                 <Button
//                     variant="outline"
//                     onClick={() => editor.chain().focus().setParagraph().run()}
//                 >
//                     Paragraph
//                 </Button>
//             </FloatingMenu>

//             {/* Bubble menu (shows up when selecting text) */}
//             <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
//                 <Button
//                     variant="outline"
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                 >
//                     Bold
//                 </Button>
//                 <Button
//                     variant="outline"
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                 >
//                     Italic
//                 </Button>
//             </BubbleMenu>
//         </>
//     );
// };

// export default RichTextEditor;




// import '../App.css';
// import './editorStyle.css';
// import {
//     IconBold,
//     IconItalic,
//     IconStrikethrough,
//     IconUnderline,
//     IconHighlight,
//     IconList,
//     IconListNumbers,
//     IconPhoto,
//     IconArrowBackUp,
//     IconArrowForwardUp,
//     IconCode,
//     IconMath,
// } from '@tabler/icons-react';

// import React, { forwardRef } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { Group } from '@mantine/core';
// import ImageResize from 'tiptap-extension-resize-image';
// import { uploadImageToFirebase } from '../utils/uploadImage';
// import Underline from '@tiptap/extension-underline';
// import Strike from '@tiptap/extension-strike';
// import BulletList from '@tiptap/extension-bullet-list';
// import OrderedList from '@tiptap/extension-ordered-list';
// import ListItem from '@tiptap/extension-list-item';
// import Highlight from '@tiptap/extension-highlight';
// import TextAlign from '@tiptap/extension-text-align';
// import Color from '@tiptap/extension-color';
// import TextStyle from '@tiptap/extension-text-style';
// import Code from '@tiptap/extension-code';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
// import { MathExtension } from '@aarkue/tiptap-math-extension';
// import { all, createLowlight } from 'lowlight';

// const lowlight = createLowlight(all);

// const FlashcardTextEditor = forwardRef((props, ref) => {
    

//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             Underline,
//             Strike,
//             BulletList,
//             OrderedList,
//             ListItem,
//             Highlight,
//             TextAlign.configure({ types: ['heading', 'paragraph'] }),
//             TextStyle,
//             Color.configure({ types: [TextStyle.name, ListItem.name] }),
//             ImageResize,
//             Code,
//             CodeBlockLowlight.configure({ lowlight }),
//             MathExtension.configure({ delimiters: 'dollar' }),
//         ],
//         // content: '<p>Start typing...</p>',
//         editorProps: {
//             handlePaste(view, event) {
//                 const items = (event.clipboardData || event.originalEvent.clipboardData).items;
//                 for (const item of items) {
//                     if (item.type.indexOf('image') !== -1) {
//                         const file = item.getAsFile();
//                         uploadImageToFirebase(file).then((url) => {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         });
//                         return true;
//                     }
//                 }
//                 return false;
//             },
//         },
//         onUpdate: ({ editor }) => {
//             if (props.onChange) {
//                 props.onChange(editor.getHTML()); // Call the parent function with updated content
//             }
//         },
//     });

    

//     if (!editor) {
//         return null;
//     }

//     const addMathEquation = () => {
//         const equation = prompt('Enter a LaTeX equation');
//         if (equation) {
//             editor.chain().focus().insertContent(`$${equation}$`).run();
//         }
//     };

//     return (
//         <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', padding: '10px' }}>
//             <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
//                 <div className="toolbar">
//                     <div className="button-group">
//                         <button
//                             onClick={() => editor.chain().focus().toggleBold().run()}
//                             disabled={!editor.can().toggleBold()}
//                             className={editor.isActive('bold') ? 'active' : ''}
//                         >
//                             <IconBold size={16} />
//                         </button>
//                         <button
//                             onClick={() => editor.chain().focus().toggleItalic().run()}
//                             disabled={!editor.can().toggleItalic()}
//                             className={editor.isActive('italic') ? 'active' : ''}
//                         >
//                             <IconItalic size={16} />
//                         </button>
//                         <button
//                             onClick={() => editor.chain().focus().toggleUnderline().run()}
//                             disabled={!editor.can().toggleUnderline()}
//                             className={editor.isActive('underline') ? 'active' : ''}
//                         >
//                             <IconUnderline size={16} />
//                         </button>
//                         {/* <button
//                             onClick={() => editor.chain().focus().toggleStrike().run()}
//                             disabled={!editor.can().toggleStrike()}
//                             className={editor.isActive('strike') ? 'active' : ''}
//                         >
//                             <IconStrikethrough size={16} />
//                         </button> */}
//                         <button
//                             onClick={() => editor.chain().focus().toggleHighlight().run()}
//                             disabled={!editor.can().toggleHighlight()}
//                             className={editor.isActive('highlight') ? 'active' : ''}
//                         >
//                             <IconHighlight size={16} />
//                         </button>
                    
//                     {/* <div className="button-group">
//                         <button
//                             onClick={() => editor.chain().focus().toggleBulletList().run()}
//                             disabled={!editor.can().toggleBulletList()}
//                             className={editor.isActive('bulletList') ? 'active' : ''}
//                         >
//                             <IconList size={16} />
//                         </button>
//                         <button
//                             onClick={() => editor.chain().focus().toggleOrderedList().run()}
//                             disabled={!editor.can().toggleOrderedList()}
//                             className={editor.isActive('orderedList') ? 'active' : ''}
//                         >
//                             <IconListNumbers size={16} />
//                         </button>
//                     </div> */}
//                     {/* <div className="button-group">
//                         <button
//                             onClick={() => {
//                                 const url = prompt('Enter Image URL');
//                                 if (url) {
//                                     editor.chain().focus().setImage({ src: url }).run();
//                                 }
//                             }}
//                             className={editor.isActive('image') ? 'active' : ''}
//                         >
//                             <IconPhoto size={16} />
//                         </button>
//                     </div> */}
                    
//                         <button
//                             onClick={() => editor.chain().focus().toggleCode().run()}
//                             className={editor.isActive('code') ? 'active' : ''}
//                             disabled={!editor.can().toggleCode()}
//                         >
//                             <IconCode size={16} />
//                         </button>
//                         <button
//                             onClick={addMathEquation}
//                             className={editor.isActive('math') ? 'active' : ''}
//                             disabled={!editor.can().insertContent}
//                         >
//                             <IconMath size={16} />
//                         </button>
//                     </div>
//                     {/* <div className="button-group">
//                         <button
//                             onClick={() => editor.chain().focus().undo().run()}
//                             disabled={!editor.can().undo()}
//                         >
//                             <IconArrowBackUp size={16} />
//                         </button>
//                         <button
//                             onClick={() => editor.chain().focus().redo().run()}
//                             disabled={!editor.can().redo()}
//                         >
//                             <IconArrowForwardUp size={16} />
//                         </button>
//                     </div> */}
//                 </div>
//             </Group>
//             <EditorContent
//                 editor={editor}
//                 style={{
//                     padding: '10px',
//                     minHeight: '200px',
//                     borderRadius: '4px',
//                     backgroundColor: '#fff',
//                     fontFamily: 'Arial, sans-serif',
//                     fontSize: '16px',
//                     lineHeight: '1.5',
//                 }}
//             />
//         </div>
//     );
// });

// export default FlashcardTextEditor;






//fix to clear the field
import '../App.css';
import './editorStyle.css';
import {
    IconBold,
    IconItalic,
    IconStrikethrough,
    IconUnderline,
    IconHighlight,
    IconList,
    IconListNumbers,
    IconPhoto,
    IconArrowBackUp,
    IconArrowForwardUp,
    IconCode,
    IconMath,
} from '@tabler/icons-react';

import React, { forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Group } from '@mantine/core';
import ImageResize from 'tiptap-extension-resize-image';
import { uploadImageToFirebase } from '../utils/uploadImage';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Code from '@tiptap/extension-code';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { MathExtension } from '@aarkue/tiptap-math-extension';
import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);

const FlashcardTextEditor = forwardRef((props, ref) => {


    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Strike,
            BulletList,
            OrderedList,
            ListItem,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            TextStyle,
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            ImageResize,
            Code,
            CodeBlockLowlight.configure({ lowlight }),
            MathExtension.configure({ delimiters: 'dollar' }),
        ],
        content: '',  // Start with empty content
        // content: '<p>Start typing...</p>',
        editorProps: {
            handlePaste(view, event) {
                const items = (event.clipboardData || event.originalEvent.clipboardData).items;
                for (const item of items) {
                    if (item.type.indexOf('image') !== -1) {
                        const file = item.getAsFile();
                        uploadImageToFirebase(file).then((url) => {
                            editor.chain().focus().setImage({ src: url }).run();
                        });
                        return true;
                    }
                }
                return false;
            },
        },
        onUpdate: ({ editor }) => {
            if (props.onChange) {
                props.onChange(editor.getHTML()); // Call the parent function with updated content
            }
        },
    });

    // // Using useImperativeHandle without conditions
    // useImperativeHandle(ref, () => ({
    //     resetContent: () => {
    //         editor?.commands.clearContent(); // Clear editor content if available
    //     },
    // }), [editor]); // Only re-run this effect if the editor instance changes

    // Define clearContent method to empty the editor
    useImperativeHandle(ref, () => ({
        clearContent() {
            editor?.commands.clearContent();
        },
    }));



    if (!editor) {
        return null;
    }

    const addMathEquation = () => {
        const equation = prompt('Enter a LaTeX equation');
        if (equation) {
            editor.chain().focus().insertContent(`$${equation}$`).run();
        }
    };

    

    return (
        <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', padding: '10px' }}>
            <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                <div className="toolbar">
                    <div className="button-group">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            disabled={!editor.can().toggleBold()}
                            className={editor.isActive('bold') ? 'active' : ''}
                        >
                            <IconBold size={16} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            disabled={!editor.can().toggleItalic()}
                            className={editor.isActive('italic') ? 'active' : ''}
                        >
                            <IconItalic size={16} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            disabled={!editor.can().toggleUnderline()}
                            className={editor.isActive('underline') ? 'active' : ''}
                        >
                            <IconUnderline size={16} />
                        </button>
                        {/* <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            disabled={!editor.can().toggleStrike()}
                            className={editor.isActive('strike') ? 'active' : ''}
                        >
                            <IconStrikethrough size={16} />
                        </button> */}
                        <button
                            onClick={() => editor.chain().focus().toggleHighlight().run()}
                            disabled={!editor.can().toggleHighlight()}
                            className={editor.isActive('highlight') ? 'active' : ''}
                        >
                            <IconHighlight size={16} />
                        </button>

                        {/* <div className="button-group">
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            disabled={!editor.can().toggleBulletList()}
                            className={editor.isActive('bulletList') ? 'active' : ''}
                        >
                            <IconList size={16} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            disabled={!editor.can().toggleOrderedList()}
                            className={editor.isActive('orderedList') ? 'active' : ''}
                        >
                            <IconListNumbers size={16} />
                        </button>
                    </div> */}
                        {/* <div className="button-group">
                        <button
                            onClick={() => {
                                const url = prompt('Enter Image URL');
                                if (url) {
                                    editor.chain().focus().setImage({ src: url }).run();
                                }
                            }}
                            className={editor.isActive('image') ? 'active' : ''}
                        >
                            <IconPhoto size={16} />
                        </button>
                    </div> */}

                        <button
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            className={editor.isActive('code') ? 'active' : ''}
                            disabled={!editor.can().toggleCode()}
                        >
                            <IconCode size={16} />
                        </button>
                        <button
                            onClick={addMathEquation}
                            className={editor.isActive('math') ? 'active' : ''}
                            disabled={!editor.can().insertContent}
                        >
                            <IconMath size={16} />
                        </button>
                    </div>
                    {/* <div className="button-group">
                        <button
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                        >
                            <IconArrowBackUp size={16} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                        >
                            <IconArrowForwardUp size={16} />
                        </button>
                    </div> */}
                </div>
            </Group>
            <EditorContent
                editor={editor}
                style={{
                    padding: '10px',
                    minHeight: '200px',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.5',
                }}
            />
        </div>
    );
});

export default FlashcardTextEditor;
