import React, { useState, useCallback, useEffect } from 'react';
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
  Sparkles,
  Save,
  Loader2,
  Check,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useAction, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import chatSession from '../../../configs/AIModel';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

function EditorExtension({ editor }) {
  const { fileid } = useParams();
  const SearchAI = useAction(api.myAction.search);
  const SaveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();
  const [saveState, setSaveState] = useState('saved');

  useEffect(() => {
    if (editor) {
      const handleUpdate = () => {
        setSaveState('unsaved');
      };
      editor.on('update', handleUpdate);
      return () => {
        editor.off('update', handleUpdate);
      };
    }
  }, [editor]);

  const handleSave = useCallback(async () => {
    if (!editor || !fileid || !user) return;
    setSaveState('saving');
    try {
      await SaveNotes({
        notes: editor.getHTML(),
        fileId: fileid,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setSaveState('saved');
    } catch (error) {
      console.error("Failed to save notes:", error);
      setSaveState('unsaved');
    }
  }, [editor, fileid, user, SaveNotes]);

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
    if (!fileid) {
      console.error("fileId is missing");
      return;
    }

    try {
      const result = await SearchAI({ query: selectedText, fileId: fileid });
      if (!Array.isArray(result)) throw new Error("Expected an array of texts");

      const contextText = result.map((item) => item.pageContent).join('\n\n');

      const PROMPT = `Based on the following context, please provide a detailed and well-formatted answer in HTML for the question: "${selectedText}".
      Context: ###
      ${contextText}
      ###

      Use only the following HTML tags: <p>, <ul>, <ol>, <li>, <strong>, <em>.
      Do not include any other tags like <html>, <body>, or \`\`\`.
      The response should be clear, concise, and directly answer the question based on the provided context.`;

      const AiModelResult = await chatSession.sendMessage(PROMPT);
      const responseText = await AiModelResult.response.text();
      const finalHtml = responseText.replace(/```/g, '').replace(/html/g, '').trim();

      const answerCard = `
        <div class="ai-answer-card my-4 p-4 border rounded-lg bg-gray-50 prose prose-sm max-w-none">
          <h3 class="text-lg font-bold mb-2 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-primary"><path d="m12 3-1.9 1.9-1.1-1.1-2 2 1.1 1.1L6.2 7 3 12l7.1 2.9 1.9-1.9 1.1 1.1 2-2-1.1-1.1L17.8 9Z"/><path d="m12 21 1.9-1.9 1.1 1.1 2-2-1.1-1.1L17.8 17 21 12l-7.1-2.9-1.9 1.9-1.1-1.1-2 2 1.1 1.1L6.2 15Z"/></svg>AI Answer</h3>
          ${finalHtml}
        </div>
      `;

      editor.chain().focus().insertContent(answerCard).run();
      // Auto-save after AI response
      await handleSave();
    } catch (error) {
      console.error("Error calling AI action:", error);
    }
  };

  const renderSaveButton = () => {
    switch (saveState) {
      case 'saving':
        return (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="animate-spin h-4 w-4" />
            <span>Saving...</span>
          </div>
        );
      case 'saved':
        return (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Check className="h-4 w-4" />
            <span>Saved</span>
          </div>
        );
      case 'unsaved':
      default:
        return (
          <Button onClick={handleSave} size="sm" variant="secondary">
            <Save className="h-4 w-4 mr-2" />
            Save Notes
          </Button>
        );
    }
  };

  return editor && (
    <div className='p-3 border-b'>
      <div className="flex flex-wrap gap-2 items-center">
        {/* Text formatting */}
        <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}><Bold size={20} /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}><Italic size={20} /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}><Underline size={20} /></button>
        <div className="border-l mx-2 h-6"></div>
        {/* Headings */}
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}><Heading1 size={20} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}><Heading2 size={20} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}><Heading3 size={20} /></button>
        <div className="border-l mx-2 h-6"></div>
        {/* Code and List */}
        <button onClick={() => editor.chain().focus().toggleCode().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}><Code size={20} /></button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}><List size={20} /></button>
        <div className="border-l mx-2 h-6"></div>
        {/* Highlight controls */}
        <div className="flex items-center gap-1">
          <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('highlight') ? 'bg-gray-200' : ''}`}><Highlighter size={20} /></button>
          {[
            { color: '#ffc078', label: 'Orange' }, { color: '#8ce99a', label: 'Green' }, { color: '#74c0fc', label: 'Blue' }, { color: '#b197fc', label: 'Purple' }, { color: '#ffa8a8', label: 'Red' }
          ].map(({ color, label }) => (
            <button key={color} onClick={() => editor.chain().focus().toggleHighlight({ color }).run()} className="w-6 h-6 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all" title={label} style={{ backgroundColor: color, border: editor.isActive('highlight', { color }) ? '2px solid black' : 'none' }} />
          ))}
          {editor.isActive('highlight') && (<button onClick={() => editor.chain().focus().unsetHighlight().run()} className="p-2 rounded hover:bg-gray-100" title="Remove highlight"><X size={16} /></button>)}
        </div>
        {/* AI Button */}
        <button onClick={onAiClick} className="p-2 rounded hover:bg-gray-100" title="AI Search"><Sparkles size={20} /></button>


      {/* save note feature */}
        <div className="flex-grow"></div>


        <div className="flex items-center">
          {renderSaveButton()}
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
