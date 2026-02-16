"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MessageSquare, CheckCircle2, Trash2 } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

function CommentItem({ comment, onResolve, onDelete, canDelete }) {
  const createdAt = useMemo(
    () => new Date(comment.createdAt).toLocaleString(),
    [comment.createdAt]
  );

  return (
    <div className={`border rounded-lg p-3 bg-background ${comment.resolved ? "opacity-70" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{comment.userName}</p>
          <p className="text-xs text-muted-foreground">{createdAt}</p>
        </div>
        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onResolve(comment._id, !comment.resolved)}
            title={comment.resolved ? "Mark open" : "Mark resolved"}
          >
            <CheckCircle2 className={`h-4 w-4 ${comment.resolved ? "text-emerald-600" : "text-muted-foreground"}`} />
          </Button>
          {canDelete && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onDelete(comment._id)}
              title="Delete comment"
            >
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>

      {comment.selectedText ? (
        <p className="mt-2 text-xs text-muted-foreground bg-muted/60 rounded px-2 py-1">
          "{comment.selectedText}"
        </p>
      ) : null}

      <p className="mt-2 text-sm leading-relaxed">{comment.commentText}</p>
    </div>
  );
}

function CommentsPanel({ fileId, editor, className = "" }) {
  const { user } = useUser();
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const comments = useQuery(api.comments.listByFile, fileId ? { fileId } : "skip");
  const addComment = useMutation(api.comments.add);
  const toggleResolved = useMutation(api.comments.toggleResolved);
  const deleteComment = useMutation(api.comments.remove);

  useEffect(() => {
    if (!editor) return;

    const syncSelection = () => {
      const nextSelectedText = editor.state.doc
        .textBetween(editor.state.selection.from, editor.state.selection.to, " ")
        .trim();
      setSelectedText(nextSelectedText);
    };

    syncSelection();
    editor.on("selectionUpdate", syncSelection);
    return () => {
      editor.off("selectionUpdate", syncSelection);
    };
  }, [editor]);

  const handleAddComment = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!fileId || !email || !commentText.trim()) return;

    const anchorFrom = editor?.state.selection.from;
    const anchorTo = editor?.state.selection.to;

    try {
      setSubmitting(true);
      await addComment({
        fileId,
        commentText,
        selectedText: selectedText || undefined,
        anchorFrom,
        anchorTo,
        createdBy: email,
        userName: user?.fullName || user?.firstName || "User",
        userImage: user?.imageUrl || undefined,
      });
      setCommentText("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResolve = async (commentId, resolved) => {
    await toggleResolved({ commentId, resolved });
  };

  const handleDelete = async (commentId) => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return;
    await deleteComment({ commentId, requesterEmail: email });
  };

  return (
    <aside className={`h-full border-l bg-muted/20 flex flex-col ${className}`}>
      <div className="px-4 py-3 border-b bg-background">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Comments</h3>
          <span className="text-xs text-muted-foreground">({comments?.length || 0})</span>
        </div>
      </div>

      <div className="p-4 border-b bg-background">
        <label className="text-xs text-muted-foreground">Add comment</label>
        {selectedText ? (
          <p className="mt-2 text-xs rounded bg-muted px-2 py-1 text-muted-foreground">
            Selected: "{selectedText.slice(0, 120)}{selectedText.length > 120 ? "..." : ""}"
          </p>
        ) : (
          <p className="mt-2 text-xs text-muted-foreground">No text selected. Comment will be general.</p>
        )}
        <textarea
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          className="mt-2 w-full min-h-20 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Leave a comment for collaborators..."
        />
        <Button
          type="button"
          size="sm"
          className="mt-2 w-full"
          disabled={submitting || !commentText.trim()}
          onClick={handleAddComment}
        >
          {submitting ? "Adding..." : "Add Comment"}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {(comments || []).map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            onResolve={handleResolve}
            onDelete={handleDelete}
            canDelete={comment.createdBy === user?.primaryEmailAddress?.emailAddress}
          />
        ))}
        {comments?.length === 0 ? (
          <div className="text-sm text-muted-foreground border rounded-lg p-4 bg-background">
            No comments yet.
          </div>
        ) : null}
      </div>
    </aside>
  );
}

export default CommentsPanel;
