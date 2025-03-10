import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import EditorExtension from './EditorExtension'

function TextEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder:'Start taking your notes here .... '
            }),
            Underline,
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: false, // Prevents links from opening when clicked in the editor
                HTMLAttributes: {
                    class: 'text-blue-500 underline hover:text-blue-700'
                }
            })
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-screen p-5'
            }
        }
    })

    return (
        <div>
            <EditorExtension editor={editor}/>
            <div>
                <EditorContent editor={editor} />  
            </div>
        </div>
    )
}

export default TextEditor