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
  MessageSquare,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useAction, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { marked } from 'marked';

function EditorExtension({ editor, collaborationNode = null, onToggleComments, isCommentsOpen = false }) {
  const { fileid } = useParams();
  const AskDocument = useAction(api.myAction.answerQuestion);
  const SaveNotes = useMutation(api.notes.AddNotes);
  const { user } = useUser();
  const [saveState, setSaveState] = useState('saved');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      setSaveState('unsaved');
    };

    editor.on('update', handleUpdate);
    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor]);

  const handleSave = useCallback(async () => {
    if (!editor || !fileid || !user?.primaryEmailAddress?.emailAddress) return;
    setSaveState('saving');
    try {
      await SaveNotes({
        notes: editor.getHTML(),
        fileId: fileid,
        createdBy: user.primaryEmailAddress.emailAddress,
      });
      setSaveState('saved');
    } catch (error) {
      console.error('Failed to save notes:', error);
      setSaveState('unsaved');
    }
  }, [editor, fileid, user, SaveNotes]);

  const onAiClick = async () => {
    if (!editor || !fileid) return;

    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );
    const question = selectedText?.trim();

    if (!question) {
      alert('Please select some text first.');
      return;
    }

    try {
      setAiLoading(true);
      const result = await AskDocument({ query: question, fileId: fileid });
      const rawResponseText = result?.answer || 'No answer generated.';
      const cleanedText = rawResponseText.replace(/```(markdown)?/g, '').trim();
      const finalHtml = marked.parse(cleanedText);

      // Keep inserted content compatible with TipTap schema (avoid custom wrapper div nodes).
      editor.chain().focus().insertContent(`<h3>AI Answer</h3>${finalHtml}`).run();
      await handleSave();
    } catch (error) {
      console.error('Error generating answer:', error);
      alert('Failed to generate answer. Please try again.');
    } finally {
      setAiLoading(false);
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
    <div className="p-3 border-b bg-background">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 items-center">
        <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}><Bold size={20} /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}><Italic size={20} /></button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}><Underline size={20} /></button>
        <div className="border-l mx-2 h-6"></div>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}><Heading1 size={20} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}><Heading2 size={20} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}`}><Heading3 size={20} /></button>
        <div className="border-l mx-2 h-6"></div>
        <button onClick={() => editor.chain().focus().toggleCode().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('code') ? 'bg-gray-200' : ''}`}><Code size={20} /></button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}><List size={20} /></button>
        <div className="border-l mx-2 h-6"></div>
        <div className="flex items-center gap-1">
          <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('highlight') ? 'bg-gray-200' : ''}`}><Highlighter size={20} /></button>
          {[
            { color: '#d6d3d1', label: 'Stone' },
            { color: '#d1d5db', label: 'Gray' },
            { color: '#cbd5e1', label: 'Slate' },
            { color: '#ddd6fe', label: 'Lavender' },
            { color: '#fecaca', label: 'Rose' },
          ].map(({ color, label }) => (
            <button key={color} onClick={() => editor.chain().focus().toggleHighlight({ color }).run()} className="w-6 h-6 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 transition-all" title={label} style={{ backgroundColor: color, border: editor.isActive('highlight', { color }) ? '2px solid black' : 'none' }} />
          ))}
          {editor.isActive('highlight') && (<button onClick={() => editor.chain().focus().unsetHighlight().run()} className="p-2 rounded hover:bg-gray-100" title="Remove highlight"><X size={16} /></button>)}
        </div>
        <button onClick={onAiClick} disabled={aiLoading} className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 border border-transparent hover:border-gray-200" title="AI Search">
          {aiLoading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
        </button>
        <button
          onClick={onToggleComments}
          className={`p-2 rounded hover:bg-gray-100 border border-transparent hover:border-gray-200 ${isCommentsOpen ? 'bg-gray-200' : ''}`}
          title="Comments"
        >
          <MessageSquare size={20} />
        </button>
        </div>

        <div className="flex items-center gap-3">
          {collaborationNode}
          <div className="flex items-center">{renderSaveButton()}</div>
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
