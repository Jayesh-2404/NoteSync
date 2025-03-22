import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import EditorExtension from './EditorExtension';
import { useAction } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';

function TextEditor() {
  const { fileid } = useParams(); // Ensure this matches the URL parameter name
  const loadNote = useAction(api.notes.loadNote);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start taking your notes here .... '
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline hover:text-blue-700'
        }
      })
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'focus:outline-none h-full p-5 overflow-y-auto'
      }
    }
  });

  useEffect(() => {
    const loadSavedNote = async () => {
      const content = await loadNote({ fileId: fileid });
      editor?.commands.setContent(content);
    };

    if (editor) {
      loadSavedNote();
    }
  }, [editor, fileid, loadNote]);

  return (
    <div className="h-full flex flex-col">
      <EditorExtension editor={editor} />
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;