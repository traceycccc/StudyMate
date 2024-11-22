import '../App.css';
import './editorStyle.css';
import {
    IconBold,
    IconItalic,
    IconUnderline,
    IconHighlight,
    IconCode,
    IconMath,
} from '@tabler/icons-react';

import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Group } from '@mantine/core';
import ImageResize from 'tiptap-extension-resize-image';
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
        content: props.content || '',  // Start with provided content or empty string
        editable: !props.readOnly,  // Set editability based on readOnly prop

        //onUpdate: props.readOnly ? undefined : undefined, // Disable autosave //no use

    });


    //manually get the editor content
    useImperativeHandle(ref, () => ({
        clearContent() {
            editor?.commands.clearContent();
        },
        getContent() {
            return editor.getHTML(); // Get content on demand (for saving updated)
        },
    }));

    useEffect(() => {
        if (editor && props.readOnly) {
            editor.commands.setContent(props.content); // Set content in read-only mode
        }
    }, [editor, props.content, props.readOnly]);

    useEffect(() => {
        if (editor && props.content) {
            editor.commands.setContent(props.content); // Set content in edit mode
        }
    }, [editor, props.content]);


    if (!editor) {
        return null;
    }

    return (
        <div style={{
            border: props.readOnly ? 'none' : '1px solid #d1d1d1',
            borderRadius: '8px',
            padding: props.readOnly ? '0px' : '10px',
        }}>

            {/* Conditionally render toolbar if not read-only */}
            {!props.readOnly && (
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

                            <button
                                onClick={() => editor.chain().focus().toggleHighlight().run()}
                                disabled={!editor.can().toggleHighlight()}
                                className={editor.isActive('highlight') ? 'active' : ''}
                            >
                                <IconHighlight size={16} />
                            </button>



                            <button
                                onClick={() => editor.chain().focus().toggleCode().run()}
                                className={editor.isActive('code') ? 'active' : ''}
                                disabled={!editor.can().toggleCode()}
                            >
                                <IconCode size={16} />
                            </button>
                            <button
                                onClick={() => {
                                    const equation = prompt('Enter a LaTeX equation');
                                    if (equation) {
                                        editor.chain().focus().insertContent(`$${equation}$`).run();
                                    }
                                }}
                                className={editor.isActive('math') ? 'active' : ''}
                                disabled={!editor.can().insertContent}
                            >
                                <IconMath size={16} />
                            </button>
                        </div>
                    </div>
                </Group>
            )}

            <EditorContent
                editor={editor}
                style={{
                    padding: props.readOnly ? 'none' : '5px',
                    minHeight: props.readOnly ? '0px' : '200px',
                    maxHeight: 'none',
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: props.readOnly ? '14px' : '16px',
                    lineHeight: '1.4',
                    outline: 'none',
                    overflow: 'hidden',// Ensure content fits without overflow
                }}
            />


        </div>
    );
});

export default FlashcardTextEditor;
