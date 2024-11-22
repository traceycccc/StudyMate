import '../App.css';
import './editorStyle.css';

import {
    IconListDetails,
    IconMinus,
    IconBold,
    IconItalic,
    IconStrikethrough,
    IconUnderline,
    IconHighlight,
    IconAlignLeft,
    IconAlignCenter,
    IconAlignRight,
    IconAlignJustified,
    IconList,
    IconListNumbers,
    IconH1,
    IconH2,
    IconH3,
    IconH4,
    IconH5,
    IconH6,
    IconQuote,
    IconTablePlus,
    IconTableMinus,
    IconColumnInsertLeft,
    IconColumnInsertRight,
    IconRowInsertTop,
    IconRowInsertBottom,
    IconColumnRemove,
    IconRowRemove,
    IconPhoto,
    IconBrandYoutube,
    IconArrowBackUp,
    IconArrowForwardUp,
    IconCode,
    IconSourceCode,
    IconMath,
} from '@tabler/icons-react';


import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Group } from '@mantine/core';

import ImageResize from 'tiptap-extension-resize-image';// Import the custom image extension
import { uploadImageToFirebase, deleteImageFromFirebase } from '../utils/uploadImage';
import Youtube from '@tiptap/extension-youtube';
import GlobalDragHandle from 'tiptap-extension-global-drag-handle';

import 'highlight.js/styles/atom-one-dark.css';  // Dark theme example
import { MathExtension } from '@aarkue/tiptap-math-extension';

//other basics
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

//formatting
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';

//markdown
import Typography from '@tiptap/extension-typography'

//codes
import Code from '@tiptap/extension-code';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';  // Code block extension

// Import necessary extensions for tables
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';

//task list/checkbox list
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';


import { firestore } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';


import { all, createLowlight } from 'lowlight';  // Lowlight core for syntax highlighting

// Create a lowlight instance
const lowlight = createLowlight(all);


// Extend TableCell to add background color
const CustomTableCell = TableCell.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            backgroundColor: {
                default: null,
                parseHTML: element => element.getAttribute('data-background-color'),
                renderHTML: attributes => {
                    return {
                        'data-background-color': attributes.backgroundColor,
                        style: `background-color: ${attributes.backgroundColor}`,
                    };
                },
            },
        };
    },
});



const RichTextEditor = forwardRef(({ noteId, customHeight = '54vh' }, ref) => {

    const [imageUrls, setImageUrls] = useState([]);  // Track image URLs
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Strike,  // Strike-through text
            BulletList,
            OrderedList,
            ListItem,
            Blockquote,
            HorizontalRule,
            Highlight,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Typography,
            TextStyle,  // Required for the color extension
            Color.configure({ types: [TextStyle.name, ListItem.name] }),// end of basics
            // Table extensions
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            CustomTableCell, // Use the customized table cell
            GlobalDragHandle.configure({
                dragHandleWidth: 20, // default
                scrollTreshold: 100, // default
                dragHandleSelector: ".custom-drag-handle", // default is undefined
                excludedTags: [], // default
            }),
            ImageResize,  // Use the custom image extension
            Youtube.configure({
                inline: true,
                width: 640,
                height: 480,
                allowFullscreen: true,
            }),
            Code,  // Inline code
            CodeBlockLowlight.configure({
                lowlight,  // Configure with lowlight
            }),
            MathExtension.configure({  // Add the MathExtension
                evaluation: true, // Set this to true if you want to enable expression evaluation
                delimiters: 'dollar', // Configures to use $ and $$ for inline and block math
            }),
            TaskList,  // Add TaskList
            TaskItem.configure({
                nested: false,
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


    return (
        <div style={{ border: '2px solid #91bfea', borderRadius: '8px', padding: '10px', backgroundColor: '#fff', }}>
            <Group spacing="xs" position="left" mb="md" style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '10px' }}>
                <div className="toolbar">

                    <div className="button-group">
                        <button
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            disabled={!editor.can().setHorizontalRule()}
                            className={editor.isActive('horizontalRule') ? 'active' : ''}
                        >
                            <IconMinus size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            disabled={!editor.can().toggleBold()}
                            className={editor.isActive('bold') ? 'active' : ''}
                        >
                            <IconBold size={14} />
                        </button>

                        <button

                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            disabled={!editor.can().toggleItalic()}
                            className={editor.isActive('italic') ? 'active' : ''}
                        >
                            <IconItalic size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            disabled={!editor.can().toggleUnderline()}
                            className={editor.isActive('underline') ? 'active' : ''}
                        >
                            <IconUnderline size={14} />
                        </button>
                        {/* Strike */}
                        <button

                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            disabled={!editor.can().toggleStrike()}
                            className={editor.isActive('strike') ? 'active' : ''}
                        >
                            <IconStrikethrough size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHighlight().run()}
                            disabled={!editor.can().toggleHighlight()}
                            className={editor.isActive('highlight') ? 'active' : ''}
                        >
                            <IconHighlight size={14} />
                        </button>
                    </div>
                    <div className="button-group">
                        <button

                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            disabled={!editor.can().toggleHeading({ level: 1 })}
                            className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}
                        >
                            <IconH1 size={14} />
                        </button>
                        <button

                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            disabled={!editor.can().toggleHeading({ level: 2 })}
                            className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
                        >
                            <IconH2 size={14} />
                        </button>
                        <button

                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            disabled={!editor.can().toggleHeading({ level: 3 })}
                            className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}
                        >
                            <IconH3 size={14} />
                        </button>
                        <button

                            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                            disabled={!editor.can().toggleHeading({ level: 4 })}
                            className={editor.isActive('heading', { level: 4 }) ? 'active' : ''}
                        >
                            <IconH4 size={14} />
                        </button>
                        <button

                            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                            disabled={!editor.can().toggleHeading({ level: 5 })}
                            className={editor.isActive('heading', { level: 5 }) ? 'active' : ''}
                        >
                            <IconH5 size={14} />
                        </button>
                        <button

                            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                            disabled={!editor.can().toggleHeading({ level: 6 })}
                            className={editor.isActive('heading', { level: 6 }) ? 'active' : ''}
                        >
                            <IconH6 size={14} />
                        </button>
                    </div>
                    <div className="button-group">

                        <button
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            disabled={!editor.can().setTextAlign('left')}
                            className={editor.isActive({ textAlign: 'left' }) ? 'active' : ''}
                        >
                            <IconAlignLeft size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            disabled={!editor.can().setTextAlign('center')}
                            className={editor.isActive({ textAlign: 'center' }) ? 'active' : ''}
                        >
                            <IconAlignCenter size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            disabled={!editor.can().setTextAlign('right')}
                            className={editor.isActive({ textAlign: 'right' }) ? 'active' : ''}
                        >
                            <IconAlignRight size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                            disabled={!editor.can().setTextAlign('justify')}
                            className={editor.isActive({ textAlign: 'justify' }) ? 'active' : ''}
                        >
                            <IconAlignJustified size={14} />
                        </button>
                    </div>
                    <div className="button-group">
                        <button
                            onClick={() => editor.chain().focus().toggleTaskList().run()}
                            disabled={!editor.can().toggleTaskList()}
                            className={editor.isActive('taskList') ? 'active' : ''}
                        >
                            <IconListDetails size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            disabled={!editor.can().toggleBulletList()}
                            className={editor.isActive('bulletList') ? 'active' : ''}
                        >
                            <IconList size={14} /> {/* Use an appropriate icon for bullet list */}
                        </button>

                        {/* Ordered List */}
                        <button
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            disabled={!editor.can().toggleOrderedList()}
                            className={editor.isActive('orderedList') ? 'active' : ''}
                        >
                            <IconListNumbers size={14} /> {/* Use an appropriate icon for ordered list */}
                        </button>

                        {/* Blockquote */}
                        <button
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            disabled={!editor.can().toggleBlockquote()}
                            className={editor.isActive('blockquote') ? 'active' : ''}
                        >
                            <IconQuote size={14} /> {/* Use an appropriate icon for blockquote */}
                        </button>
                    </div>

                    <div className="button-group">
                        <button
                            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                            className={editor.isActive('table') ? 'active' : ''}
                        >
                            <IconTablePlus size={14} />
                        </button>
                        {/* Delete Table */}
                        <button
                            onClick={() => editor.chain().focus().deleteTable().run()}
                            disabled={!editor.can().deleteTable()}
                            className={editor.can().deleteTable() ? '' : 'disabled'}
                        >
                            <IconTableMinus size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().addColumnBefore().run()}
                            disabled={!editor.can().addColumnBefore()}
                            className={editor.can().addColumnBefore() ? '' : 'disabled'}
                        >
                            <IconColumnInsertLeft size={14} />
                        </button>
                        {/* Add Column After */}
                        <button
                            onClick={() => editor.chain().focus().addColumnAfter().run()}
                            disabled={!editor.can().addColumnAfter()}
                            className={editor.can().addColumnAfter() ? '' : 'disabled'}
                        >
                            <IconColumnInsertRight size={14} />
                        </button>

                        {/* Delete Column */}
                        <button
                            onClick={() => editor.chain().focus().deleteColumn().run()}
                            disabled={!editor.can().deleteColumn()}
                            className={editor.can().deleteColumn() ? '' : 'disabled'}
                        >
                            <IconColumnRemove size={14} />
                        </button>

                        {/* Add Row Before */}
                        <button
                            onClick={() => editor.chain().focus().addRowBefore().run()}
                            disabled={!editor.can().addRowBefore()}
                            className={editor.can().addRowBefore() ? '' : 'disabled'}
                        >
                            <IconRowInsertTop size={14} />
                        </button>

                        {/* Add Row After */}
                        <button
                            onClick={() => editor.chain().focus().addRowAfter().run()}
                            disabled={!editor.can().addRowAfter()}
                            className={editor.can().addRowAfter() ? '' : 'disabled'}
                        >
                            <IconRowInsertBottom size={14} />
                        </button>

                        {/* Delete Row */}
                        <button
                            onClick={() => editor.chain().focus().deleteRow().run()}
                            disabled={!editor.can().deleteRow()}
                            className={editor.can().deleteRow() ? '' : 'disabled'}
                        >
                            <IconRowRemove size={14} />
                        </button>


                    </div>

                    <div className="button-group">
                        <button
                            onClick={() => {
                                const url = prompt('Enter Image URL');
                                if (url) {
                                    editor.chain().focus().setImage({ src: url }).run();
                                }
                            }}
                            className={editor.isActive('image') ? 'active' : ''}
                        >
                            <IconPhoto size={14} />
                        </button>

                        {/* Embed YouTube Video Button */}
                        <button
                            onClick={() => {
                                //embed youtube function
                                const url = prompt('Enter YouTube URL');
                                if (url) {
                                    editor.chain().focus().setYoutubeVideo({ src: url }).run();
                                }
                            }}
                            className={editor.isActive('youtube') ? 'active' : ''}
                        >
                            <IconBrandYoutube size={14} />
                        </button>
                    </div>

                    <div className="button-group">
                        {/* Inline Code Button */}
                        <button
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            className={editor.isActive('code') ? 'active' : ''}
                            disabled={!editor.can().toggleCode()}
                        >
                            <IconCode size={14} />
                        </button>

                        {/* Code Block Button */}
                        <button
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={editor.isActive('codeBlock') ? 'active' : ''}
                            disabled={!editor.can().toggleCodeBlock()}
                        >
                            <IconSourceCode size={14} />
                        </button>

                        {/* Math Equation Button */}
                        <button
                            // onClick={addMathEquation}
                            onClick={() => {
                                const equation = prompt('Enter a LaTeX equation');
                                if (equation) {
                                    editor.chain().focus().insertContent(`$${equation}$`).run();
                                }
                            }}
                            className={editor.isActive('math') ? 'active' : ''}
                            disabled={!editor.can().insertContent}
                        >
                            <IconMath size={14} />
                        </button>
                    </div>

                    <div className="button-group">
                        <button
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            className={editor.can().undo() ? '' : 'disabled'}
                        >
                            <IconArrowBackUp size={14} />
                        </button>

                        {/* Redo Button */}
                        <button
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            className={editor.can().redo() ? '' : 'disabled'}
                        >
                            <IconArrowForwardUp size={14} />
                        </button>
                    </div>
                </div>
            </Group>

            <EditorContent
                editor={editor}
                style={{
                    padding: '10px',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    outline: 'none',
                    boxShadow: 'none',
                    height: customHeight, // Use the customHeight prop to set height for separate things (plain note diff from docu note and code note)
                    overflowY: 'auto',  // Enable vertical scrolling
                }}
            />
        </div>
    );
});

export default RichTextEditor;