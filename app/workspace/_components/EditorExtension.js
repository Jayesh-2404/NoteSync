import React, { useCallback } from 'react';
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
  Sparkles
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useAction, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import chatSession from '../../../configs/AIModel';
import { useUser } from '@clerk/nextjs';

function EditorExtension({ editor }) {
  const { fileId } = useParams();
  const SearchAI = useAction(api.myAction.search);
  const SaveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();

  const onAiClick = async () => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );
    
    if (!selectedText) {
      alert("Please select some text first");
      return;
    }
  
    // Call your search action
    const result = await SearchAI({ query: selectedText, fileId });
    const UnformattedAns = JSON.parse(result);
    let AllUnformattedAns = '';
    UnformattedAns && UnformattedAns.forEach(item => {
      AllUnformattedAns += item.pageContent;
    });
  
    const PROMPT = `For the question: "${selectedText}", please provide a detailed and well-formatted answer in HTML. The answer should be based on the following content: ${AllUnformattedAns}. Ensure the response is clear, concise, and properly structured.`;
  
    const AiModelResult = await chatSession.sendMessage(PROMPT);
    const responseText = await AiModelResult.response.text();
    console.log("Raw AI Response:", responseText);
    const FinalAns = responseText.replace(/```/g, '').replace(/html/g, '').trim();
    
    // Create a styled answer card with line-by-line paragraphs
    const answerCard = `
      <div class="ai-answer-card my-4 p-4 border rounded-lg bg-gray-50">
        <h3 class="text-lg font-bold mb-2">Answer:</h3>
        <div class="prose prose-sm">
          ${FinalAns.split('\n').map(line => `<p>${line.trim()}</p>`).join('')}
        </div>
      </div>
    `;
  
    // Insert the answer card to the editor
    editor.commands.insertContent(answerCard);
  
    // Save the updated content
    SaveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createdBy: user?.primaryEmailAddress?.emailAddress
    });
  };

  return editor && (
    <div className='p-5 border-b'>
      <div className="flex flex-wrap gap-2 items-center">
        {/* Text formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
        >
          <Bold size={20} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
        >
          <Italic size={20} />
        </button>

        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
        >
          <Underline size={20} />
        </button>

        <div className="border-l mx-2"></div>

        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
        >
          <Heading1 size={20} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
        >
          <Heading2 size={20} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}
        >
          <Heading3 size={20} />
        </button>

        <div className="border-l mx-2"></div>

        {/* Code and List */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}
        >
          <Code size={20} />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
        >
          <List size={20} />
        </button>

        <div className="border-l mx-2"></div>

        {/* Highlight controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('highlight') ? 'bg-gray-200' : ''}`}
          >
            <Highlighter size={20} />
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
              className="w-6 h-6 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all"
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
              <X size={16} />
            </button>
          )}
        </div>

        {/* Link controls
        <div className="flex items-center gap-1">
          <button
            onClick={setLink}
            className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
            title="Add link"
          >
            <LinkIcon size={20} />
          </button>

          {editor.isActive('link') && (
            <button
              onClick={() => editor.chain().focus().extendMarkRange('link').unsetLink().run()}
              className="p-2 rounded hover:bg-gray-100"
              title="Remove link"
            >
              <LinkOff size={20} />
            </button>
          )}
        </div> */}

        {/* AI Button */}
        <button
          onClick={onAiClick}
          className="p-2 rounded hover:bg-gray-100"
          title="AI Search"
        >
          <Sparkles size={20} />
        </button>
      </div>
    </div>
  );
}

export default EditorExtension;