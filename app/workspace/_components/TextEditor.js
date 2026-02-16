"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import { useAction, useMutation, useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import EditorExtension from "./EditorExtension";
import CollaboratorPresence from "./CollaboratorPresence";
import CommentsPanel from "./CommentsPanel";
import { useCollaboration } from "./useCollaboration";

function TextEditor() {
  const { fileid } = useParams();
  const { user } = useUser();
  const loadNote = useAction(api.notes.loadNote);
  const saveNote = useMutation(api.notes.AddNotes);
  const liveNote = useQuery(api.notes.getNoteLive, fileid ? { fileId: fileid } : "skip");
  const [commentsOpen, setCommentsOpen] = useState(false);
  const hasSeededContent = useRef(false);
  const lastSavedContent = useRef("");

  const { provider, ydoc, connectionStatus, collaborators, peerCount, localUser } = useCollaboration(
    fileid,
    user
  );

  useEffect(() => {
    hasSeededContent.current = false;
  }, [fileid]);

  const extensions = useMemo(() => {
    const baseExtensions = [
      StarterKit.configure({ history: !ydoc }),
      Placeholder.configure({
        placeholder: "Start taking your notes here .... ",
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline hover:text-blue-700",
        },
      }),
    ];

    if (ydoc) {
      baseExtensions.push(Collaboration.configure({ document: ydoc }));
    }

    if (provider && localUser) {
      baseExtensions.push(
        CollaborationCursor.configure({
          provider,
          user: localUser,
        })
      );
    }

    return baseExtensions;
  }, [ydoc, provider, localUser]);

  const editor = useEditor(
    {
      extensions,
      content: "",
      editorProps: {
        attributes: {
          class: "tiptap focus:outline-none h-full p-5",
        },
      },
      immediatelyRender: false,
    },
    [extensions]
  );

  useEffect(() => {
    if (!editor || !fileid || hasSeededContent.current) return;

    const seedFromStoredNote = async () => {
      try {
        const storedContent = await loadNote({ fileId: fileid });
        if (
          typeof storedContent === "string" &&
          storedContent.trim() &&
          editor.isEmpty
        ) {
          editor.commands.setContent(storedContent, false);
        }
        if (typeof storedContent === "string") {
          lastSavedContent.current = storedContent;
        }
        hasSeededContent.current = true;
      } catch (error) {
        console.error("Failed to load note:", error);
      }
    };

    seedFromStoredNote();
  }, [editor, fileid, loadNote]);

  useEffect(() => {
    if (!editor) return;
    const incoming = typeof liveNote?.notes === "string" ? liveNote.notes : "";
    if (!incoming) return;

    // CRDT handles real-time sync when peers are connected.
    if (peerCount > 0) {
      lastSavedContent.current = incoming;
      return;
    }

    const current = editor.getHTML();
    if (incoming === current || incoming === lastSavedContent.current) return;

    lastSavedContent.current = incoming;
    editor.commands.setContent(incoming, false);
  }, [editor, liveNote?.notes, peerCount]);

  useEffect(() => {
    if (!editor || !fileid || !user?.primaryEmailAddress?.emailAddress) return;

    const persistLatest = async () => {
      const nextContent = editor.getHTML();
      if (!nextContent || nextContent === lastSavedContent.current) return;
      try {
        await saveNote({
          fileId: fileid,
          notes: nextContent,
          createdBy: user.primaryEmailAddress.emailAddress,
        });
        lastSavedContent.current = nextContent;
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    };

    const interval = setInterval(persistLatest, 2000);

    return () => {
      clearInterval(interval);
      void persistLatest();
    };
  }, [editor, fileid, saveNote, user]);

  if (!editor) {
    return <div className="h-full flex items-center justify-center text-sm text-muted-foreground">Connecting collaboration...</div>;
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <EditorExtension
        editor={editor}
        onToggleComments={() => setCommentsOpen((prev) => !prev)}
        isCommentsOpen={commentsOpen}
        collaborationNode={
          <CollaboratorPresence
            collaborators={collaborators}
            connectionStatus={connectionStatus}
          />
        }
      />

      <div className="flex-1 min-h-0 flex">
        <div className="flex-1 overflow-y-auto">
          <EditorContent editor={editor} />
        </div>
        {commentsOpen ? (
          <div className="w-[340px] min-w-[300px]">
            <CommentsPanel fileId={fileid} editor={editor} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TextEditor;
