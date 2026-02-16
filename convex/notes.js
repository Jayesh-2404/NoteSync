import { action, mutation, internalQuery, query } from "./_generated/server.js";
import { v } from "convex/values";
import { api } from "./_generated/api.js";

export const AddNotes = mutation({
  args: {
    fileId: v.string(),
    notes: v.any(),
    createdBy: v.string()
  },
  handler: async (ctx, args) => {
    const existingNote = await ctx.db.query("notes")
      .withIndex("by_fileId", (q) => q.eq("fileId", args.fileId))
      .first();

    if (existingNote) {

      await ctx.db.patch(existingNote._id, { notes: args.notes });
    } else {
      await ctx.db.insert('notes', {
        fileId: args.fileId,
        notes: args.notes,
        createdBy: args.createdBy
      });
    }
  },
});

// This action safely loads notes for a given fileId.
export const loadNote = action({
  args: { fileId: v.string() },
  handler: async (ctx, args) => {
    const note = await ctx.runQuery(api.notes.getNoteByFileId, { fileId: args.fileId });
    return note?.notes || '';
  },
});

export const getNoteLive = query({
  args: { fileId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notes")
      .withIndex("by_fileId", (q) => q.eq("fileId", args.fileId))
      .first();
  },
});

// This internal query fetches the note from the database.
export const getNoteByFileId = internalQuery({
  args: { fileId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notes")
      .withIndex("by_fileId", (q) => q.eq("fileId", args.fileId))
      .first();
  },
});
