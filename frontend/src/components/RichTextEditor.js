// // RichTextEditor.js
// import React from 'react';
// import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';

// // Define your extensions array
// const extensions = [StarterKit];

// const RichTextEditor = () => {
//     // Create an editor instance
//     const editor = useEditor({
//         extensions,
//         content: '<p>Hello World!</p>',
//     });

//     return (
//         <>
//             {/* The main content of the editor */}
//             <EditorContent editor={editor} />

//             {/* The floating menu (optional, can customize later) */}
//             <FloatingMenu editor={editor}>
//                 This is the floating menu
//             </FloatingMenu>

//             {/* The bubble menu (optional, can customize later) */}
//             <BubbleMenu editor={editor}>
//                 This is the bubble menu
//             </BubbleMenu>
//         </>
//     );
// };

// export default RichTextEditor;



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




// import React, { useEffect } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { FloatingMenu, BubbleMenu } from '@tiptap/react';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// const RichTextEditor = ({ noteId }) => {
//     const editor = useEditor({
//         extensions: [StarterKit],
//         content: '<p>Loading...</p>', // Initial placeholder content
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();
//             autosaveContent(noteId, json); // Save updated content in Firestore
//         },
//     });

//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;

//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists()) {
//                     const noteData = docSnapshot.data();
//                     if (editor) {
//                         editor.commands.setContent(noteData.content, false); // Set the content in the editor
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };

//         fetchContent();
//     }, [noteId, editor]);

//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;

//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };

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



// import React, { useEffect } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { FloatingMenu, BubbleMenu } from '@tiptap/react';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// const RichTextEditor = ({ noteId }) => {
//     // Initialize the TipTap editor
//     const editor = useEditor({
//         extensions: [StarterKit],
//         content: '<p>Loading...</p>', // Placeholder content while loading
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();
//             autosaveContent(noteId, json); // Save updated content in Firestore
//         },
//     });

//     // Fetch the content from Firestore when the component mounts
//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;

//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists() && editor) {
//                     const noteData = docSnapshot.data();
//                     editor.commands.setContent(noteData.content, false); // Set the content in the editor
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };

//         fetchContent();
//     }, [noteId, editor]);

//     // Function to autosave the content to Firestore
//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;

//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };

//     // If editor hasn't been initialized, don't render anything
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


// import React, { useEffect } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import Strike from '@tiptap/extension-strike';
// import BulletList from '@tiptap/extension-bullet-list';
// import OrderedList from '@tiptap/extension-ordered-list';
// import TextAlign from '@tiptap/extension-text-align';
// import Image from '@tiptap/extension-image';
// import YouTube from '@tiptap/extension-youtube';
// import CodeBlock from '@tiptap/extension-code-block';
// import Table from '@tiptap/extension-table';
// import TableRow from '@tiptap/extension-table-row';
// import TableCell from '@tiptap/extension-table-cell';
// import TableHeader from '@tiptap/extension-table-header';
// import { FloatingMenu, BubbleMenu } from '@tiptap/react';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// const RichTextEditor = ({ noteId }) => {
//     // Initialize the TipTap editor with additional extensions
//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             Underline,
//             Strike,
//             BulletList,
//             OrderedList,
//             TextAlign.configure({ types: ['heading', 'paragraph'] }),
//             Image,
//             YouTube,
//             CodeBlock,
//             Table,
//             TableRow,
//             TableCell,
//             TableHeader,
//         ],
//         content: '<p>Loading...</p>',
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();
//             autosaveContent(noteId, json); // Save updated content in Firestore
//         },
//     });

//     // Fetch the content from Firestore
//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;
//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);
//                 if (docSnapshot.exists() && editor) {
//                     const noteData = docSnapshot.data();
//                     editor.commands.setContent(noteData.content, false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };
//         fetchContent();
//     }, [noteId, editor]);

//     // Function to autosave content
//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;
//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };

//     // If editor isn't initialized, return null
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
//                 <Button
//                     variant={editor.isActive('underline') ? 'filled' : 'outline'}
//                     onClick={() => editor.chain().focus().toggleUnderline().run()}
//                 >
//                     Underline
//                 </Button>
//                 <Button
//                     variant={editor.isActive('strike') ? 'filled' : 'outline'}
//                     onClick={() => editor.chain().focus().toggleStrike().run()}
//                 >
//                     Strikethrough
//                 </Button>
//                 <Button
//                     variant={editor.isActive('bulletList') ? 'filled' : 'outline'}
//                     onClick={() => editor.chain().focus().toggleBulletList().run()}
//                 >
//                     Bullet List
//                 </Button>
//                 <Button
//                     variant={editor.isActive('orderedList') ? 'filled' : 'outline'}
//                     onClick={() => editor.chain().focus().toggleOrderedList().run()}
//                 >
//                     Numbered List
//                 </Button>
//                 <Button
//                     onClick={() => editor.chain().focus().setTextAlign('left').run()}
//                 >
//                     Align Left
//                 </Button>
//                 <Button
//                     onClick={() => editor.chain().focus().setTextAlign('center').run()}
//                 >
//                     Align Center
//                 </Button>
//                 <Button
//                     onClick={() => editor.chain().focus().setTextAlign('right').run()}
//                 >
//                     Align Right
//                 </Button>
//                 <Button
//                     onClick={() => {
//                         const url = prompt('Enter image URL');
//                         if (url) editor.chain().focus().setImage({ src: url }).run();
//                     }}
//                 >
//                     Add Image
//                 </Button>

//                 <Button
//                     onClick={() => {
//                         const url = prompt('Enter YouTube URL');
//                         if (url) editor.chain().focus().setYouTubeVideo({ src: url }).run();
//                     }}
//                 >
//                     Add YouTube Video
//                 </Button>
//             </Group>

//             {/* Main Editor Content */}
//             <EditorContent editor={editor} style={{ border: '1px solid #e0e0e0', padding: '10px' }} />

//             {/* Floating Menu */}
//             <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
//                 <Button
//                     variant="outline"
//                     onClick={() => editor.chain().focus().setParagraph().run()}
//                 >
//                     Paragraph
//                 </Button>
//             </FloatingMenu>

//             {/* Bubble Menu for selected text */}
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


//level 0
// import React, { useEffect } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { FloatingMenu, BubbleMenu } from '@tiptap/react';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// const RichTextEditor = ({ noteId }) => {
//     // Initialize the TipTap editor
//     const editor = useEditor({
//         extensions: [StarterKit],
//         content: '<p>Loading...</p>', // Placeholder content while loading
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();
//             autosaveContent(noteId, json); // Save updated content in Firestore
//         },
//     });

//     // Fetch the content from Firestore when the component mounts
//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;

//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists() && editor) {
//                     const noteData = docSnapshot.data();
//                     editor.commands.setContent(noteData.content, false); // Set the content in the editor
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };

//         fetchContent();
//     }, [noteId, editor]);

//     // Function to autosave the content to Firestore
//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;

//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };

//     // If editor hasn't been initialized, don't render anything
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
// import React, { useEffect } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { FloatingMenu, BubbleMenu } from '@tiptap/react';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import Image from '@tiptap/extension-image'
// import { uploadImageToFirebase } from '../utils/uploadImage';  

// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// const RichTextEditor = ({ noteId }) => {
//     // Initialize the TipTap editor
//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             Image,  // Add the Image extension here
//         ],
//         content: '<p>Loading...</p>', // Placeholder content while loading
//         editorProps: {
//             handlePaste(view, event) {
//                 const items = (event.clipboardData || event.originalEvent.clipboardData).items;

//                 for (const item of items) {
//                     if (item.type.indexOf('image') !== -1) {
//                         const file = item.getAsFile();
//                         // Handle the image upload here
//                         uploadImageToFirebase(file).then((url) => {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         });
//                         return true; // Indicate that we handled the paste event
//                     }
//                 }
//                 return false; // Let TipTap handle other paste events
//             },
//             handleDrop(view, event, slice, moved) {
//                 const files = event.dataTransfer.files;
//                 if (files && files[0]) {
//                     const file = files[0];
//                     // Upload the image to Firebase
//                     uploadImageToFirebase(file).then((url) => {
//                         editor.chain().focus().setImage({ src: url }).run();
//                     });
//                     return true;
//                 }
//                 return false;
//             },
//         },
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();
//             autosaveContent(noteId, json); // Save updated content in Firestore
//         },
//     });

//     // Fetch the content from Firestore when the component mounts
//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;

//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists() && editor) {
//                     const noteData = docSnapshot.data();
//                     editor.commands.setContent(noteData.content, false); // Set the content in the editor
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };

//         fetchContent();
//     }, [noteId, editor]);

//     // Function to autosave the content to Firestore
//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;

//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };

//     // If editor hasn't been initialized, don't render anything
//     if (!editor) {
//         return null;
//     }
//     // Function to handle file input from file explorer
//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             uploadImageToFirebase(file).then((url) => {
//                 editor.chain().focus().setImage({ src: url }).run();
//             });
//         }
//     };

//     return (
//         <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', padding: '10px' }}>
//             {/* Toolbar */}
//             <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
//                 <Button
//                     variant={editor.isActive('bold') ? 'filled' : 'outline'}
//                     leftIcon={<IconBold size={14} />}
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     style={{
//                         borderRadius: '4px',
//                         padding: '5px 10px',
//                         fontSize: '14px',
//                     }}
//                 >
//                     Bold
//                 </Button>
//                 <Button
//                     variant={editor.isActive('italic') ? 'filled' : 'outline'}
//                     leftIcon={<IconItalic size={14} />}
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     style={{
//                         borderRadius: '4px',
//                         padding: '5px 10px',
//                         fontSize: '14px',
//                     }}
//                 >
//                     Italic
//                 </Button>
//                 <Button
//                     variant={editor.isActive('heading', { level: 1 }) ? 'filled' : 'outline'}
//                     leftIcon={<IconH1 size={14} />}
//                     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                     style={{
//                         borderRadius: '4px',
//                         padding: '5px 10px',
//                         fontSize: '14px',
//                     }}
//                 >
//                     H1
//                 </Button>

//                 <Button
//                     onClick={() => {
//                         const url = prompt('Enter image URL');
//                         if (url) {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         }
//                     }}
//                 >
//                     Insert Image
//                 </Button>
//             </Group>

//             {/* The main content of the editor */}
//             <EditorContent
//                 editor={editor}
//                 style={{
//                     border: '1px solid #e0e0e0',
//                     padding: '10px',
//                     minHeight: '200px',
//                     borderRadius: '4px',
//                     backgroundColor: '#fff',
//                     fontFamily: 'Arial, sans-serif',
//                     fontSize: '16px',
//                     lineHeight: '1.5',
//                     outline: 'none !important',  // Ensure outline is removed
//                     boxShadow: 'none !important', // Ensure no shadow appears
//                 }}
//             />

//             {editor && (
//                 <>
//                     {/* Floating menu */}
//                     <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
//                         <Button
//                             variant="outline"
//                             onClick={() => editor.chain().focus().setParagraph().run()}
//                         >
//                             Paragraph
//                         </Button>
//                     </FloatingMenu>

//                     {/* Bubble menu */}
//                     <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
//                         <Button
//                             variant="outline"
//                             onClick={() => editor.chain().focus().toggleBold().run()}
//                         >
//                             Bold
//                         </Button>
//                         <Button
//                             variant="outline"
//                             onClick={() => editor.chain().focus().toggleItalic().run()}
//                         >
//                             Italic
//                         </Button>
//                     </BubbleMenu>
//                 </>
//             )}
//         </div>
//     );
// };

// // // Dummy function to simulate image upload, replace with actual upload logic
// // const uploadImage = async (file) => {
// //     // Simulate a file upload to a server or Firebase storage and return the URL
// //     return new Promise((resolve) => {
// //         setTimeout(() => {
// //             resolve(URL.createObjectURL(file)); // Use local URL for demonstration, replace with real URL after uploading
// //         }, 1000);
// //     });
// // };

// export default RichTextEditor;



//can work
// import '../App.css';
// import React, { useEffect } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { FloatingMenu, BubbleMenu } from '@tiptap/react';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import Image from '@tiptap/extension-image'
// import { uploadImageToFirebase } from '../utils/uploadImage';

// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// const RichTextEditor = ({ noteId }) => {
//     // Initialize the TipTap editor
//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             Image,  // Add the Image extension here
//         ],
//         content: '<p>Loading...</p>', // Placeholder content while loading
//         editorProps: {
//             handlePaste(view, event) {
//                 const items = (event.clipboardData || event.originalEvent.clipboardData).items;

//                 for (const item of items) {
//                     if (item.type.indexOf('image') !== -1) {
//                         const file = item.getAsFile();
//                         // Handle the image upload here
//                         uploadImageToFirebase(file).then((url) => {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         });
//                         return true; // Indicate that we handled the paste event
//                     }
//                 }
//                 return false; // Let TipTap handle other paste events
//             },
//             handleDrop(view, event, slice, moved) {
//                 const files = event.dataTransfer.files;
//                 if (files && files[0]) {
//                     const file = files[0];
//                     // Upload the image to Firebase
//                     uploadImageToFirebase(file).then((url) => {
//                         editor.chain().focus().setImage({ src: url }).run();
//                     });
//                     return true;
//                 }
//                 return false;
//             },
//         },
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();
//             autosaveContent(noteId, json); // Save updated content in Firestore
//         },
//     });

//     // Fetch the content from Firestore when the component mounts
//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;

//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists() && editor) {
//                     const noteData = docSnapshot.data();
//                     editor.commands.setContent(noteData.content, false); // Set the content in the editor
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };

//         fetchContent();
//     }, [noteId, editor]);

//     // Function to autosave the content to Firestore
//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;

//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };

//     // If editor hasn't been initialized, don't render anything
//     if (!editor) {
//         return null;
//     }
   

//     return (
//         <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', padding: '10px' }}>
//             {/* Toolbar */}
//             <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
//                 <Button
//                     variant={editor.isActive('bold') ? 'filled' : 'outline'}
//                     leftIcon={<IconBold size={14} />}
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     style={{
//                         borderRadius: '4px',
//                         padding: '5px 10px',
//                         fontSize: '14px',
//                     }}
//                 >
//                     Bold
//                 </Button>
//                 <Button
//                     variant={editor.isActive('italic') ? 'filled' : 'outline'}
//                     leftIcon={<IconItalic size={14} />}
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     style={{
//                         borderRadius: '4px',
//                         padding: '5px 10px',
//                         fontSize: '14px',
//                     }}
//                 >
//                     Italic
//                 </Button>
//                 <Button
//                     variant={editor.isActive('heading', { level: 1 }) ? 'filled' : 'outline'}
//                     leftIcon={<IconH1 size={14} />}
//                     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                     style={{
//                         borderRadius: '4px',
//                         padding: '5px 10px',
//                         fontSize: '14px',
//                     }}
//                 >
//                     H1
//                 </Button>

//                 <Button
//                     onClick={() => {
//                         const url = prompt('Enter image URL');
//                         if (url) {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         }
//                     }}
//                 >
//                     Insert Image
//                 </Button>
//             </Group>

//             {/* The main content of the editor */}
//             <EditorContent
//                 editor={editor}
//                 style={{
//                     border: '1px solid #e0e0e0',
//                     padding: '10px',
//                     minHeight: '200px',
//                     borderRadius: '4px',
//                     backgroundColor: '#fff',
//                     fontFamily: 'Arial, sans-serif',
//                     fontSize: '16px',
//                     lineHeight: '1.5',
//                     outline: 'none !important',  // Ensure outline is removed
//                     boxShadow: 'none !important', // Ensure no shadow appears
//                 }}
//             />

//             {editor && (
//                 <>
//                     {/* Floating menu */}
//                     <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
//                         <Button
//                             variant="outline"
//                             onClick={() => editor.chain().focus().setParagraph().run()}
//                         >
//                             Paragraph
//                         </Button>
//                     </FloatingMenu>

//                     {/* Bubble menu */}
//                     <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
//                         <Button
//                             variant="outline"
//                             onClick={() => editor.chain().focus().toggleBold().run()}
//                         >
//                             Bold
//                         </Button>
//                         <Button
//                             variant="outline"
//                             onClick={() => editor.chain().focus().toggleItalic().run()}
//                         >
//                             Italic
//                         </Button>
//                     </BubbleMenu>
//                 </>
//             )}
//         </div>
//     );
// };



// export default RichTextEditor;




//adding ajustable image

// import '../App.css';
// import React, { useEffect } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import ImageResize from 'tiptap-extension-resize-image';// Import the custom image extension
// import { uploadImageToFirebase } from '../utils/uploadImage';

// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// const RichTextEditor = ({ noteId }) => {
//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             ImageResize,  // Use the custom image extension
//         ],
//         content: '<p>Loading...</p>',
//         editorProps: {
//             handlePaste(view, event) {
//                 const items = (event.clipboardData || event.originalEvent.clipboardData).items;

//                 for (const item of items) {
//                     if (item.type.indexOf('image') !== -1) {
//                         const file = item.getAsFile();
//                         // Upload the image to Firebase
//                         uploadImageToFirebase(file).then((url) => {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         });
//                         return true;
//                     }
//                 }
//                 return false;
//             },
//             handleDrop(view, event, slice, moved) {
//                 const files = event.dataTransfer.files;
//                 if (files && files[0]) {
//                     const file = files[0];
//                     // Upload the image to Firebase
//                     uploadImageToFirebase(file).then((url) => {
//                         editor.chain().focus().setImage({ src: url }).run();
//                     });
//                     return true;
//                 }
//                 return false;
//             },
//         },
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();
//             autosaveContent(noteId, json);
//         },
//     });

//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;

//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists() && editor) {
//                     const noteData = docSnapshot.data();
//                     editor.commands.setContent(noteData.content, false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };

//         fetchContent();
//     }, [noteId, editor]);

//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;

//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };

//     if (!editor) {
//         return null;
//     }

//     return (
//         <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', padding: '10px' }}>
//             <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
//                 <Button
//                     variant={editor.isActive('bold') ? 'filled' : 'outline'}
//                     leftIcon={<IconBold size={14} />}
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Bold
//                 </Button>
//                 <Button
//                     variant={editor.isActive('italic') ? 'filled' : 'outline'}
//                     leftIcon={<IconItalic size={14} />}
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Italic
//                 </Button>
//                 <Button
//                     variant={editor.isActive('heading', { level: 1 }) ? 'filled' : 'outline'}
//                     leftIcon={<IconH1 size={14} />}
//                     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     H1
//                 </Button>

//                 <Button
//                     onClick={() => {
//                         const url = prompt('Enter image URL');
//                         if (url) {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         }
//                     }}
//                 >
//                     Insert Image
//                 </Button>
//             </Group>

//             <EditorContent
//                 editor={editor}
//                 style={{
//                     border: '1px solid #e0e0e0',
//                     padding: '10px',
//                     minHeight: '200px',
//                     borderRadius: '4px',
//                     backgroundColor: '#fff',
//                     fontFamily: 'Arial, sans-serif',
//                     fontSize: '16px',
//                     lineHeight: '1.5',
//                     outline: 'none',
//                     boxShadow: 'none',
//                 }}
//             />
//         </div>
//     );
// };

// export default RichTextEditor;



//delete image issue to be fixed
// import '../App.css';
// import React, { useEffect, useState } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import ImageResize from 'tiptap-extension-resize-image';// Import the custom image extension
// import { uploadImageToFirebase, deleteImageFromFirebase } from '../utils/uploadImage';

// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// const RichTextEditor = ({ noteId }) => {

//     const [imageUrls, setImageUrls] = useState([]);  // Track image URLs
//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             ImageResize,  // Use the custom image extension
//         ],
//         content: '<p>Loading...</p>',
//         editorProps: {
//             handlePaste(view, event) {
//                 const items = (event.clipboardData || event.originalEvent.clipboardData).items;

//                 for (const item of items) {
//                     if (item.type.indexOf('image') !== -1) {
//                         const file = item.getAsFile();
//                         // Upload the image to Firebase
//                         uploadImageToFirebase(file).then((url) => {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         });
//                         return true;
//                     }
//                 }
//                 return false;
//             },
//             handleDrop(view, event, slice, moved) {
//                 const files = event.dataTransfer.files;
//                 if (files && files[0]) {
//                     const file = files[0];
//                     // Upload the image to Firebase
//                     uploadImageToFirebase(file).then((url) => {
//                         editor.chain().focus().setImage({ src: url }).run();
//                     });
//                     return true;
//                 }
//                 return false;
//             },
//         },
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();

//             // Check if any image has been removed by comparing current images with stored URLs
//             const currentImages = [];
//             json.content.forEach((node) => {
//                 if (node.type === 'image') {
//                     currentImages.push(node.attrs.src);  // Keep track of current image URLs
//                 }
//             });

//             // Find and delete images that were removed
//             const deletedImages = imageUrls.filter((url) => !currentImages.includes(url));
//             deletedImages.forEach((url) => {
//                 deleteImageFromFirebase(url);  // Remove from Firebase
//             });

//             // Update the tracked image URLs
//             setImageUrls(currentImages);

//             // Autosave the content (left untouched)
//             autosaveContent(noteId, json);
//         },
//     });

//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;

//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists() && editor) {
//                     const noteData = docSnapshot.data();
//                     editor.commands.setContent(noteData.content, false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };

//         fetchContent();
//     }, [noteId, editor]);

//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;

//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };

//     if (!editor) {
//         return null;
//     }

//     return (
//         <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', padding: '10px' }}>
//             <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
//                 <Button
//                     variant={editor.isActive('bold') ? 'filled' : 'outline'}
//                     leftIcon={<IconBold size={14} />}
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Bold
//                 </Button>
//                 <Button
//                     variant={editor.isActive('italic') ? 'filled' : 'outline'}
//                     leftIcon={<IconItalic size={14} />}
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Italic
//                 </Button>
//                 <Button
//                     variant={editor.isActive('heading', { level: 1 }) ? 'filled' : 'outline'}
//                     leftIcon={<IconH1 size={14} />}
//                     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     H1
//                 </Button>

//                 <Button
//                     onClick={() => {
//                         const url = prompt('Enter image URL');
//                         if (url) {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         }
//                     }}
//                 >
//                     Insert Image
//                 </Button>
//             </Group>

//             <EditorContent
//                 editor={editor}
//                 style={{
//                     border: '1px solid #e0e0e0',
//                     padding: '10px',
//                     minHeight: '200px',
//                     borderRadius: '4px',
//                     backgroundColor: '#fff',
//                     fontFamily: 'Arial, sans-serif',
//                     fontSize: '16px',
//                     lineHeight: '1.5',
//                     outline: 'none',
//                     boxShadow: 'none',
//                 }}
//             />
//         </div>
//     );
// };

// export default RichTextEditor;




//add youtuve
// import '../App.css';
// import React, { useEffect, useState } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import ImageResize from 'tiptap-extension-resize-image';// Import the custom image extension
// import { uploadImageToFirebase, deleteImageFromFirebase } from '../utils/uploadImage';
// import Youtube from '@tiptap/extension-youtube'; 
// import GlobalDragHandle from 'tiptap-extension-global-drag-handle';

// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';

// const RichTextEditor = ({ noteId }) => {

//     const [imageUrls, setImageUrls] = useState([]);  // Track image URLs
//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             GlobalDragHandle.configure({
//                 dragHandleWidth: 20, // default

//                 // The scrollTreshold specifies how close the user must drag an element to the edge of the lower/upper screen for automatic 
//                 // scrolling to take place. For example, scrollTreshold = 100 means that scrolling starts automatically when the user drags an 
//                 // element to a position that is max. 99px away from the edge of the screen
//                 // You can set this to 0 to prevent auto scrolling caused by this extension
//                 scrollTreshold: 100, // default

//                 // The css selector to query for the drag handle. (eg: '.custom-handle').
//                 // If handle element is found, that element will be used as drag handle. 
//                 // If not, a default handle will be created
//                 dragHandleSelector: ".custom-drag-handle", // default is undefined


//                 // Tags to be excluded for drag handle
//                 // If you want to hide the global drag handle for specific HTML tags, you can use this option.
//                 // For example, setting this option to ['p', 'hr'] will hide the global drag handle for <p> and <hr> tags.
//                 excludedTags: [], // default
//             }),
//             ImageResize,  // Use the custom image extension
//             Youtube.configure({
//                 inline: true,
//                 width: 640,
//                 height: 480,
//                 allowFullscreen: true,
                

//             }),
            
//         ],
//         content: '<p>Loading...</p>',
//         editorProps: {
//             handlePaste(view, event) {
//                 const items = (event.clipboardData || event.originalEvent.clipboardData).items;

//                 for (const item of items) {
//                     if (item.type.indexOf('image') !== -1) {
//                         const file = item.getAsFile();
//                         // Upload the image to Firebase
//                         uploadImageToFirebase(file).then((url) => {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         });
//                         return true;
//                     }
//                 }
//                 return false;
//             },
//             handleDrop(view, event, slice, moved) {
//                 const files = event.dataTransfer.files;
//                 if (files && files[0]) {
//                     const file = files[0];
//                     // Upload the image to Firebase
//                     uploadImageToFirebase(file).then((url) => {
//                         editor.chain().focus().setImage({ src: url }).run();
//                     });
//                     return true;
//                 }
//                 return false;
//             },
//         },
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();

//             // Check if any image has been removed by comparing current images with stored URLs
//             const currentImages = [];
//             json.content.forEach((node) => {
//                 if (node.type === 'image') {
//                     currentImages.push(node.attrs.src);  // Keep track of current image URLs
//                 }
//             });

//             // Find and delete images that were removed
//             const deletedImages = imageUrls.filter((url) => !currentImages.includes(url));
//             deletedImages.forEach((url) => {
//                 deleteImageFromFirebase(url);  // Remove from Firebase
//             });

//             // Update the tracked image URLs
//             setImageUrls(currentImages);

//             // Autosave the content (left untouched)
//             autosaveContent(noteId, json);
//         },
//     });

//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;

//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists() && editor) {
//                     const noteData = docSnapshot.data();
//                     editor.commands.setContent(noteData.content, false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };

//         fetchContent();
//     }, [noteId, editor]);

//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;

//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };

    

//     if (!editor) {
//         return null;
//     }

   
//     const addYouTubeVideo = () => {
//         const url = prompt('Enter YouTube URL')

//         if (url) {
//             editor.commands.setYoutubeVideo({
//                 src: url,
//             })
//         }
//     }
    

//     return (
//         <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', padding: '10px' }}>
//             <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
//                 <Button
//                     variant={editor.isActive('bold') ? 'filled' : 'outline'}
//                     leftIcon={<IconBold size={14} />}
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Bold
//                 </Button>
//                 <Button
//                     variant={editor.isActive('italic') ? 'filled' : 'outline'}
//                     leftIcon={<IconItalic size={14} />}
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Italic
//                 </Button>
//                 <Button
//                     variant={editor.isActive('heading', { level: 1 }) ? 'filled' : 'outline'}
//                     leftIcon={<IconH1 size={14} />}
//                     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     H1
//                 </Button>

//                 <Button
//                     onClick={() => {
//                         const url = prompt('Enter image URL');
//                         if (url) {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         }
//                     }}
//                 >
//                     Insert Image
//                 </Button>

//                 {/* Add a button to embed YouTube videos */}
//                 <Button onClick={addYouTubeVideo}>Embed YouTube Video</Button>
//             </Group>

//             <EditorContent
//                 editor={editor}
//                 style={{
//                     border: '1px solid #e0e0e0',
//                     padding: '10px',
//                     minHeight: '200px',
//                     borderRadius: '4px',
//                     backgroundColor: '#fff',
//                     fontFamily: 'Arial, sans-serif',
//                     fontSize: '16px',
//                     lineHeight: '1.5',
//                     outline: 'none',
//                     boxShadow: 'none',
//                 }}
//             />
//         </div>
//     );
// };

// export default RichTextEditor;



// add code block low light
// import '../App.css';
// import React, { useEffect, useState } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import ImageResize from 'tiptap-extension-resize-image';// Import the custom image extension
// import { uploadImageToFirebase, deleteImageFromFirebase } from '../utils/uploadImage';
// import Youtube from '@tiptap/extension-youtube';
// import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';  // Code block extension
// import 'highlight.js/styles/atom-one-dark.css';  // Dark theme example



// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';


// import { all, createLowlight } from 'lowlight';  // Lowlight core for syntax highlighting

// // Create a lowlight instance
// const lowlight = createLowlight(all);


// const RichTextEditor = ({ noteId }) => {

//     const [imageUrls, setImageUrls] = useState([]);  // Track image URLs
//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             GlobalDragHandle.configure({
//                 dragHandleWidth: 20, // default

//                 // The scrollTreshold specifies how close the user must drag an element to the edge of the lower/upper screen for automatic 
//                 // scrolling to take place. For example, scrollTreshold = 100 means that scrolling starts automatically when the user drags an 
//                 // element to a position that is max. 99px away from the edge of the screen
//                 // You can set this to 0 to prevent auto scrolling caused by this extension
//                 scrollTreshold: 100, // default

//                 // The css selector to query for the drag handle. (eg: '.custom-handle').
//                 // If handle element is found, that element will be used as drag handle. 
//                 // If not, a default handle will be created
//                 dragHandleSelector: ".custom-drag-handle", // default is undefined


//                 // Tags to be excluded for drag handle
//                 // If you want to hide the global drag handle for specific HTML tags, you can use this option.
//                 // For example, setting this option to ['p', 'hr'] will hide the global drag handle for <p> and <hr> tags.
//                 excludedTags: [], // default
//             }),
//             ImageResize,  // Use the custom image extension
//             Youtube.configure({
//                 inline: true,
//                 width: 640,
//                 height: 480,
//                 allowFullscreen: true,
//             }),
//             CodeBlockLowlight.configure({
//                 lowlight,  // Configure with lowlight
//             }),

//         ],
//         content: '<p>Loading...</p>',
//         editorProps: {
//             handlePaste(view, event) {
//                 const items = (event.clipboardData || event.originalEvent.clipboardData).items;

//                 for (const item of items) {
//                     if (item.type.indexOf('image') !== -1) {
//                         const file = item.getAsFile();
//                         // Upload the image to Firebase
//                         uploadImageToFirebase(file).then((url) => {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         });
//                         return true;
//                     }
//                 }
//                 return false;
//             },
//             handleDrop(view, event, slice, moved) {
//                 const files = event.dataTransfer.files;
//                 if (files && files[0]) {
//                     const file = files[0];
//                     // Upload the image to Firebase
//                     uploadImageToFirebase(file).then((url) => {
//                         editor.chain().focus().setImage({ src: url }).run();
//                     });
//                     return true;
//                 }
//                 return false;
//             },
//         },
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();

//             // Check if any image has been removed by comparing current images with stored URLs
//             const currentImages = [];
//             json.content.forEach((node) => {
//                 if (node.type === 'image') {
//                     currentImages.push(node.attrs.src);  // Keep track of current image URLs
//                 }
//             });

//             // Find and delete images that were removed
//             const deletedImages = imageUrls.filter((url) => !currentImages.includes(url));
//             deletedImages.forEach((url) => {
//                 deleteImageFromFirebase(url);  // Remove from Firebase
//             });

//             // Update the tracked image URLs
//             setImageUrls(currentImages);

//             // Autosave the content (left untouched)
//             autosaveContent(noteId, json);
//         },
//     });

//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;

//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists() && editor) {
//                     const noteData = docSnapshot.data();
//                     editor.commands.setContent(noteData.content, false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };

//         fetchContent();
//     }, [noteId, editor]);

//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;

//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };



//     if (!editor) {
//         return null;
//     }


//     const addYouTubeVideo = () => {
//         const url = prompt('Enter YouTube URL')

//         if (url) {
//             editor.commands.setYoutubeVideo({
//                 src: url,
//             })
//         }
//     }


//     return (
//         <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', padding: '10px' }}>
//             <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
//                 <Button
//                     variant={editor.isActive('bold') ? 'filled' : 'outline'}
//                     leftIcon={<IconBold size={14} />}
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Bold
//                 </Button>
//                 <Button
//                     variant={editor.isActive('italic') ? 'filled' : 'outline'}
//                     leftIcon={<IconItalic size={14} />}
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Italic
//                 </Button>
//                 <Button
//                     variant={editor.isActive('heading', { level: 1 }) ? 'filled' : 'outline'}
//                     leftIcon={<IconH1 size={14} />}
//                     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     H1
//                 </Button>

//                 <Button
//                     onClick={() => {
//                         const url = prompt('Enter image URL');
//                         if (url) {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         }
//                     }}
//                 >
//                     Insert Image
//                 </Button>

//                 {/* Add a button to embed YouTube videos */}
//                 <Button onClick={addYouTubeVideo}>Embed YouTube Video</Button>


//                 <button
//                     onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//                     className={editor.isActive('codeBlock') ? 'is-active' : ''}
//                 >
//                     Toggle code block
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().setCodeBlock().run()}
//                     disabled={editor.isActive('codeBlock')}
//                 >
//                     Set code block
//                 </button>
//             </Group>

//             <EditorContent
//                 editor={editor}
//                 style={{
//                     border: '1px solid #e0e0e0',
//                     padding: '10px',
//                     minHeight: '200px',
//                     borderRadius: '4px',
//                     backgroundColor: '#fff',
//                     fontFamily: 'Arial, sans-serif',
//                     fontSize: '16px',
//                     lineHeight: '1.5',
//                     outline: 'none',
//                     boxShadow: 'none',
//                 }}
//             />
//         </div>
//     );
// };

// export default RichTextEditor;




// import '../App.css';
// import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import ImageResize from 'tiptap-extension-resize-image';// Import the custom image extension
// import { uploadImageToFirebase, deleteImageFromFirebase } from '../utils/uploadImage';
// import Youtube from '@tiptap/extension-youtube';
// import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';  // Code block extension
// import 'highlight.js/styles/atom-one-dark.css';  // Dark theme example



// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';


// import { all, createLowlight } from 'lowlight';  // Lowlight core for syntax highlighting

// // Create a lowlight instance
// const lowlight = createLowlight(all);


// const RichTextEditor = forwardRef(({ noteId }, ref) => {

//     const [imageUrls, setImageUrls] = useState([]);  // Track image URLs
//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             GlobalDragHandle.configure({
//                 dragHandleWidth: 20, // default

//                 // The scrollTreshold specifies how close the user must drag an element to the edge of the lower/upper screen for automatic 
//                 // scrolling to take place. For example, scrollTreshold = 100 means that scrolling starts automatically when the user drags an 
//                 // element to a position that is max. 99px away from the edge of the screen
//                 // You can set this to 0 to prevent auto scrolling caused by this extension
//                 scrollTreshold: 100, // default

//                 // The css selector to query for the drag handle. (eg: '.custom-handle').
//                 // If handle element is found, that element will be used as drag handle. 
//                 // If not, a default handle will be created
//                 dragHandleSelector: ".custom-drag-handle", // default is undefined


//                 // Tags to be excluded for drag handle
//                 // If you want to hide the global drag handle for specific HTML tags, you can use this option.
//                 // For example, setting this option to ['p', 'hr'] will hide the global drag handle for <p> and <hr> tags.
//                 excludedTags: [], // default
//             }),
//             ImageResize,  // Use the custom image extension
//             Youtube.configure({
//                 inline: true,
//                 width: 640,
//                 height: 480,
//                 allowFullscreen: true,
//             }),
//             CodeBlockLowlight.configure({
//                 lowlight,  // Configure with lowlight
//             }),

//         ],
//         content: '<p>Loading...</p>',
//         editorProps: {
//             handlePaste(view, event) {
//                 const items = (event.clipboardData || event.originalEvent.clipboardData).items;

//                 for (const item of items) {
//                     if (item.type.indexOf('image') !== -1) {
//                         const file = item.getAsFile();
//                         // Upload the image to Firebase
//                         uploadImageToFirebase(file).then((url) => {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         });
//                         return true;
//                     }
//                 }
//                 return false;
//             },
//             handleDrop(view, event, slice, moved) {
//                 const files = event.dataTransfer.files;
//                 if (files && files[0]) {
//                     const file = files[0];
//                     // Upload the image to Firebase
//                     uploadImageToFirebase(file).then((url) => {
//                         editor.chain().focus().setImage({ src: url }).run();
//                     });
//                     return true;
//                 }
//                 return false;
//             },
//         },
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();

//             // Check if any image has been removed by comparing current images with stored URLs
//             const currentImages = [];
//             json.content.forEach((node) => {
//                 if (node.type === 'image') {
//                     currentImages.push(node.attrs.src);  // Keep track of current image URLs
//                 }
//             });

//             // Find and delete images that were removed
//             const deletedImages = imageUrls.filter((url) => !currentImages.includes(url));
//             deletedImages.forEach((url) => {
//                 deleteImageFromFirebase(url);  // Remove from Firebase
//             });

//             // Update the tracked image URLs
//             setImageUrls(currentImages);

//             // Autosave the content (left untouched)
//             autosaveContent(noteId, json);
//         },
//     });

//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;

//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists() && editor) {
//                     const noteData = docSnapshot.data();
//                     editor.commands.setContent(noteData.content, false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };

//         fetchContent();
//     }, [noteId, editor]);

//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;

//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };
//     useImperativeHandle(ref, () => ({
//         insertText(text) {
//             if (editor) {
//                 editor.commands.setContent(editor.getHTML() + `<p>${text}</p>`); // Insert text as a new paragraph
//             }
//         }
//     }));



//     if (!editor) {
//         return null;
//     }


//     const addYouTubeVideo = () => {
//         const url = prompt('Enter YouTube URL')

//         if (url) {
//             editor.commands.setYoutubeVideo({
//                 src: url,
//             })
//         }
//     }


//     return (
//         <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', padding: '10px' }}>
//             <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
//                 <Button
//                     variant={editor.isActive('bold') ? 'filled' : 'outline'}
//                     leftIcon={<IconBold size={14} />}
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Bold
//                 </Button>
//                 <Button
//                     variant={editor.isActive('italic') ? 'filled' : 'outline'}
//                     leftIcon={<IconItalic size={14} />}
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Italic
//                 </Button>
//                 <Button
//                     variant={editor.isActive('heading', { level: 1 }) ? 'filled' : 'outline'}
//                     leftIcon={<IconH1 size={14} />}
//                     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     H1
//                 </Button>

//                 <Button
//                     onClick={() => {
//                         const url = prompt('Enter image URL');
//                         if (url) {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         }
//                     }}
//                 >
//                     Insert Image
//                 </Button>

//                 {/* Add a button to embed YouTube videos */}
//                 <Button onClick={addYouTubeVideo}>Embed YouTube Video</Button>


//                 <button
//                     onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//                     className={editor.isActive('codeBlock') ? 'is-active' : ''}
//                 >
//                     Toggle code block
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().setCodeBlock().run()}
//                     disabled={editor.isActive('codeBlock')}
//                 >
//                     Set code block
//                 </button>
//             </Group>

//             <EditorContent
//                 editor={editor}
//                 style={{
//                     border: '1px solid #e0e0e0',
//                     padding: '10px',
//                     minHeight: '200px',
//                     borderRadius: '4px',
//                     backgroundColor: '#fff',
//                     fontFamily: 'Arial, sans-serif',
//                     fontSize: '16px',
//                     lineHeight: '1.5',
//                     outline: 'none',
//                     boxShadow: 'none',
//                 }}
//             />
//         </div>
//     );
// });

// export default RichTextEditor;




// import '../App.css';
// import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { Button, Group } from '@mantine/core';
// import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
// import ImageResize from 'tiptap-extension-resize-image';// Import the custom image extension
// import { uploadImageToFirebase, deleteImageFromFirebase } from '../utils/uploadImage';
// import Youtube from '@tiptap/extension-youtube';
// import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';  // Code block extension
// import 'highlight.js/styles/atom-one-dark.css';  // Dark theme example



// import { firestore } from '../firebase';
// import { doc, setDoc, getDoc } from 'firebase/firestore';


// import { all, createLowlight } from 'lowlight';  // Lowlight core for syntax highlighting

// // Create a lowlight instance
// const lowlight = createLowlight(all);


// const RichTextEditor = forwardRef(({ noteId }, ref) => {

//     const [imageUrls, setImageUrls] = useState([]);  // Track image URLs
//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             GlobalDragHandle.configure({
//                 dragHandleWidth: 20, // default

//                 // The scrollTreshold specifies how close the user must drag an element to the edge of the lower/upper screen for automatic 
//                 // scrolling to take place. For example, scrollTreshold = 100 means that scrolling starts automatically when the user drags an 
//                 // element to a position that is max. 99px away from the edge of the screen
//                 // You can set this to 0 to prevent auto scrolling caused by this extension
//                 scrollTreshold: 100, // default

//                 // The css selector to query for the drag handle. (eg: '.custom-handle').
//                 // If handle element is found, that element will be used as drag handle. 
//                 // If not, a default handle will be created
//                 dragHandleSelector: ".custom-drag-handle", // default is undefined


//                 // Tags to be excluded for drag handle
//                 // If you want to hide the global drag handle for specific HTML tags, you can use this option.
//                 // For example, setting this option to ['p', 'hr'] will hide the global drag handle for <p> and <hr> tags.
//                 excludedTags: [], // default
//             }),
//             ImageResize,  // Use the custom image extension
//             Youtube.configure({
//                 inline: true,
//                 width: 640,
//                 height: 480,
//                 allowFullscreen: true,
//             }),
//             CodeBlockLowlight.configure({
//                 lowlight,  // Configure with lowlight
//             }),

//         ],
//         content: '<p>Loading...</p>',
//         editorProps: {
//             handlePaste(view, event) {
//                 const items = (event.clipboardData || event.originalEvent.clipboardData).items;

//                 for (const item of items) {
//                     if (item.type.indexOf('image') !== -1) {
//                         const file = item.getAsFile();
//                         // Upload the image to Firebase
//                         uploadImageToFirebase(file).then((url) => {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         });
//                         return true;
//                     }
//                 }
//                 return false;
//             },
//             handleDrop(view, event, slice, moved) {
//                 const files = event.dataTransfer.files;
//                 if (files && files[0]) {
//                     const file = files[0];
//                     // Upload the image to Firebase
//                     uploadImageToFirebase(file).then((url) => {
//                         editor.chain().focus().setImage({ src: url }).run();
//                     });
//                     return true;
//                 }
//                 return false;
//             },
//         },
//         onUpdate: ({ editor }) => {
//             const json = editor.getJSON();

//             // Check if any image has been removed by comparing current images with stored URLs
//             const currentImages = [];
//             json.content.forEach((node) => {
//                 if (node.type === 'image') {
//                     currentImages.push(node.attrs.src);  // Keep track of current image URLs
//                 }
//             });

//             // Find and delete images that were removed
//             const deletedImages = imageUrls.filter((url) => !currentImages.includes(url));
//             deletedImages.forEach((url) => {
//                 deleteImageFromFirebase(url);  // Remove from Firebase
//             });

//             // Update the tracked image URLs
//             setImageUrls(currentImages);

//             // Autosave the content (left untouched)
//             autosaveContent(noteId, json);
//         },
//     });

//     useEffect(() => {
//         const fetchContent = async () => {
//             if (!noteId) return;

//             try {
//                 const docRef = doc(firestore, 'notes', noteId);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists() && editor) {
//                     const noteData = docSnapshot.data();
//                     editor.commands.setContent(noteData.content, false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching note content:', error);
//             }
//         };

//         fetchContent();
//     }, [noteId, editor]);

//     const autosaveContent = async (noteId, content) => {
//         if (!noteId) return;

//         try {
//             await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
//             console.log('Note content autosaved.');
//         } catch (error) {
//             console.error('Error saving note content:', error);
//         }
//     };
//     useImperativeHandle(ref, () => ({
//         insertText(text) {
//             if (editor) {
//                 editor.commands.setContent(editor.getHTML() + `<p>${text}</p>`); // Insert text as a new paragraph
//             }
//         }
//     }));



//     if (!editor) {
//         return null;
//     }


//     const addYouTubeVideo = () => {
//         const url = prompt('Enter YouTube URL')

//         if (url) {
//             editor.commands.setYoutubeVideo({
//                 src: url,
//             })
//         }
//     }


//     return (
//         <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', padding: '10px' }}>
//             <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
//                 <Button
//                     variant={editor.isActive('bold') ? 'filled' : 'outline'}
//                     leftIcon={<IconBold size={14} />}
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Bold
//                 </Button>
//                 <Button
//                     variant={editor.isActive('italic') ? 'filled' : 'outline'}
//                     leftIcon={<IconItalic size={14} />}
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     Italic
//                 </Button>
//                 <Button
//                     variant={editor.isActive('heading', { level: 1 }) ? 'filled' : 'outline'}
//                     leftIcon={<IconH1 size={14} />}
//                     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
//                     style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
//                 >
//                     H1
//                 </Button>

//                 <Button
//                     onClick={() => {
//                         const url = prompt('Enter image URL');
//                         if (url) {
//                             editor.chain().focus().setImage({ src: url }).run();
//                         }
//                     }}
//                 >
//                     Insert Image
//                 </Button>

//                 {/* Add a button to embed YouTube videos */}
//                 <Button onClick={addYouTubeVideo}>Embed YouTube Video</Button>


//                 <button
//                     onClick={() => editor.chain().focus().toggleCodeBlock().run()}
//                     className={editor.isActive('codeBlock') ? 'is-active' : ''}
//                 >
//                     Toggle code block
//                 </button>
//                 <button
//                     onClick={() => editor.chain().focus().setCodeBlock().run()}
//                     disabled={editor.isActive('codeBlock')}
//                 >
//                     Set code block
//                 </button>
//             </Group>

//             <EditorContent
//                 editor={editor}
//                 style={{
//                     border: '1px solid #e0e0e0',
//                     padding: '10px',
//                     minHeight: '200px',
//                     borderRadius: '4px',
//                     backgroundColor: '#fff',
//                     fontFamily: 'Arial, sans-serif',
//                     fontSize: '16px',
//                     lineHeight: '1.5',
//                     outline: 'none',
//                     boxShadow: 'none',
//                 }}
//             />
//         </div>
//     );
// });

// export default RichTextEditor;




//fix the manual save for the result into automatically
import '../App.css';
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button, Group } from '@mantine/core';
import { IconBold, IconItalic, IconH1 } from '@tabler/icons-react';
import ImageResize from 'tiptap-extension-resize-image';// Import the custom image extension
import { uploadImageToFirebase, deleteImageFromFirebase } from '../utils/uploadImage';
import Youtube from '@tiptap/extension-youtube';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';  // Code block extension
import 'highlight.js/styles/atom-one-dark.css';  // Dark theme example



import { firestore } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';


import { all, createLowlight } from 'lowlight';  // Lowlight core for syntax highlighting

// Create a lowlight instance
const lowlight = createLowlight(all);


const RichTextEditor = forwardRef(({ noteId }, ref) => {

    const [imageUrls, setImageUrls] = useState([]);  // Track image URLs
    const editor = useEditor({
        extensions: [
            StarterKit,
            GlobalDragHandle.configure({
                dragHandleWidth: 20, // default

                // The scrollTreshold specifies how close the user must drag an element to the edge of the lower/upper screen for automatic 
                // scrolling to take place. For example, scrollTreshold = 100 means that scrolling starts automatically when the user drags an 
                // element to a position that is max. 99px away from the edge of the screen
                // You can set this to 0 to prevent auto scrolling caused by this extension
                scrollTreshold: 100, // default

                // The css selector to query for the drag handle. (eg: '.custom-handle').
                // If handle element is found, that element will be used as drag handle. 
                // If not, a default handle will be created
                dragHandleSelector: ".custom-drag-handle", // default is undefined


                // Tags to be excluded for drag handle
                // If you want to hide the global drag handle for specific HTML tags, you can use this option.
                // For example, setting this option to ['p', 'hr'] will hide the global drag handle for <p> and <hr> tags.
                excludedTags: [], // default
            }),
            ImageResize,  // Use the custom image extension
            Youtube.configure({
                inline: true,
                width: 640,
                height: 480,
                allowFullscreen: true,
            }),
            CodeBlockLowlight.configure({
                lowlight,  // Configure with lowlight
            }),

        ],
        content: '<p>Loading...</p>',
        editorProps: {
            handlePaste(view, event) {
                const items = (event.clipboardData || event.originalEvent.clipboardData).items;

                for (const item of items) {
                    if (item.type.indexOf('image') !== -1) {
                        const file = item.getAsFile();
                        // Upload the image to Firebase
                        uploadImageToFirebase(file).then((url) => {
                            editor.chain().focus().setImage({ src: url }).run();
                        });
                        return true;
                    }
                }
                return false;
            },
            handleDrop(view, event, slice, moved) {
                const files = event.dataTransfer.files;
                if (files && files[0]) {
                    const file = files[0];
                    // Upload the image to Firebase
                    uploadImageToFirebase(file).then((url) => {
                        editor.chain().focus().setImage({ src: url }).run();
                    });
                    return true;
                }
                return false;
            },
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();

            // Check if any image has been removed by comparing current images with stored URLs
            const currentImages = [];
            json.content.forEach((node) => {
                if (node.type === 'image') {
                    currentImages.push(node.attrs.src);  // Keep track of current image URLs
                }
            });

            // Find and delete images that were removed
            const deletedImages = imageUrls.filter((url) => !currentImages.includes(url));
            deletedImages.forEach((url) => {
                deleteImageFromFirebase(url);  // Remove from Firebase
            });

            // Update the tracked image URLs
            setImageUrls(currentImages);

            // Autosave the content (left untouched)
            autosaveContent(noteId, json);
        },
    });

    useEffect(() => {
        const fetchContent = async () => {
            if (!noteId) return;

            try {
                const docRef = doc(firestore, 'notes', noteId);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists() && editor) {
                    const noteData = docSnapshot.data();
                    editor.commands.setContent(noteData.content, false);
                }
            } catch (error) {
                console.error('Error fetching note content:', error);
            }
        };

        fetchContent();
    }, [noteId, editor]);

    const autosaveContent = async (noteId, content) => {
        if (!noteId) return;

        try {
            await setDoc(doc(firestore, 'notes', noteId), { content }, { merge: true });
            console.log('Note content autosaved.');
        } catch (error) {
            console.error('Error saving note content:', error);
        }
    };
    // useImperativeHandle(ref, () => ({
    //     insertText(text) {
    //         if (editor) {
    //             editor.commands.setContent(editor.getHTML() + `<p>${text}</p>`); // Insert text as a new paragraph
    //         }
    //     }
    // }));

    useImperativeHandle(ref, () => ({
        insertText(text) {
            if (editor) {
                editor.commands.insertContent(`<p>${text}</p>`); // Insert text as a new paragraph
            }
        },
    }));




    if (!editor) {
        return null;
    }


    const addYouTubeVideo = () => {
        const url = prompt('Enter YouTube URL')

        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
            })
        }
    }


    return (
        <div style={{ border: '1px solid #d1d1d1', borderRadius: '8px', padding: '10px' }}>
            <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                <Button
                    variant={editor.isActive('bold') ? 'filled' : 'outline'}
                    leftIcon={<IconBold size={14} />}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
                >
                    Bold
                </Button>
                <Button
                    variant={editor.isActive('italic') ? 'filled' : 'outline'}
                    leftIcon={<IconItalic size={14} />}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
                >
                    Italic
                </Button>
                <Button
                    variant={editor.isActive('heading', { level: 1 }) ? 'filled' : 'outline'}
                    leftIcon={<IconH1 size={14} />}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    style={{ borderRadius: '4px', padding: '5px 10px', fontSize: '14px' }}
                >
                    H1
                </Button>

                <Button
                    onClick={() => {
                        const url = prompt('Enter image URL');
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                >
                    Insert Image
                </Button>

                {/* Add a button to embed YouTube videos */}
                <Button onClick={addYouTubeVideo}>Embed YouTube Video</Button>


                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    Toggle code block
                </button>
                <button
                    onClick={() => editor.chain().focus().setCodeBlock().run()}
                    disabled={editor.isActive('codeBlock')}
                >
                    Set code block
                </button>
            </Group>

            <EditorContent
                editor={editor}
                style={{
                    border: '1px solid #e0e0e0',
                    padding: '10px',
                    minHeight: '200px',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    outline: 'none',
                    boxShadow: 'none',
                }}
            />
        </div>
    );
});

export default RichTextEditor;