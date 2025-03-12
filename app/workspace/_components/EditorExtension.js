import React, { useState, useCallback } from 'react'
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Heading3, 
  Code, 
  Underline, 
  Highlighter, 
  List,
  X,
  Link as LinkIcon,
  LinkOff,
  Sparkle,
  Sparkles
} from 'lucide-react'
import { useParams } from 'next/navigation';
import { useAction } from 'convex/react';
import { api } from '@/convex/_generated/api';

function EditorExtension({editor}) {
  const { fileId } = useParams();
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const SearchAi = useAction(api.myAction.search);

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (!editor) return;

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    } catch (e) {
      alert(e.message);
    }
  }, [editor]);

  const onAiClick = async () => {
    try {
      if (!editor) {
        console.error("Editor not initialized");
        return;
      }
  
      const selectedtext = editor.state.doc.textBetween(
        editor.state.selection.from,
        editor.state.selection.to,
        ''
      );
  
      if (!selectedtext || selectedtext.trim() === '') {
        alert("Please select some text first");
        return;
      }
  
      console.log("Searching with:", { selectedtext, fileId });
  
      const result = await SearchAi({
        query: selectedtext,
        fileId: fileId
      });
  
      // Add error checking for result
      if (!result) {
        console.log("No results returned from search");
        alert("No results found");
        return;
      }
  
      try {
        const parsedResult = JSON.parse(result);
        console.log("Parsed result:", parsedResult);
  
        if (parsedResult && parsedResult.length > 0) {
          editor.chain().focus().insertContent(parsedResult[0].pageContent).run();
        } else {
          alert("No relevant results found");
        }
      } catch (parseError) {
        console.error("Error parsing result:", parseError);
        alert("Error processing search results");
      }
  
    } catch (error) {
      console.error("AI Search error:", error);
      alert("Error performing AI search");
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className='p-5 border-b'>
      <div className="flex flex-wrap gap-2 items-center">
        {/* Text formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          <Bold size={20}/>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        >
          <Italic size={20}/>
        </button>

        {/* Underline options */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
          >
            <Underline size={20}/>
          </button>
        </div>

        <div className="border-l mx-2"></div>

        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
        >
          <Heading1 size={20}/>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
        >
          <Heading2 size={20}/>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
        >
          <Heading3 size={20}/>
        </button>

        <div className="border-l mx-2"></div>

        {/* Code and List */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
        >
          <Code size={20}/>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        >
          <List size={20}/>
        </button>

        <div className="border-l mx-2"></div>

        {/* Highlight controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('highlight') ? 'bg-gray-200' : ''}`}
          >
            <Highlighter size={20}/>
          </button>
          
          {/* Color options */}
          {[
            { color: '#ffc078', label: 'Orange' },
            { color: '#8ce99a', label: 'Green' },
            { color: '#74c0fc', label: 'Blue' },
            { color: '#b197fc', label: 'Purple' },
            { color: '#ffa8a8', label: 'Red' }
          ].map(({ color, label }) => (
            <button
              key={color}
              onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
              className={`w-6 h-6 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all`}
              title={label}
              style={{ 
                backgroundColor: color,
                border: editor.isActive('highlight', { color }) ? '2px solid black' : 'none'
              }}
            />
          ))}
          
          {/* Unset highlight */}
          {editor.isActive('highlight') && (
            <button
              onClick={() => editor.chain().focus().unsetHighlight().run()}
              className="p-2 rounded hover:bg-gray-100"
              title="Remove highlight"
            >
              <X size={16}/>
            </button>
          )}
        </div>

        {/* Link controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={setLink}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
            title="Add link"
          >
            <LinkIcon size={20}/>
          </button>
          
          {editor.isActive('link') && (
            <button
              onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}
              className="p-2 rounded hover:bg-gray-100"
              title="Remove link"
            >
              <LinkOff size={20}/>
            </button>
            
          )}
          <div className="flex gap-1">
          <button
            onClick={() => onAiClick()}
            className={` hover:bg-gray-100`}
          >
            <Sparkles size={20}/>
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default EditorExtension