import { action } from "./_generated/server.js";
import { v } from "convex/values";

export const saveNote = action({
  args: {
    fileId: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("notes", {
      fileId: args.fileId,
      content: args.content,
    });
    return "Note saved";
  },
});

export const loadNote = action({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const note = await ctx.db.query("notes").filter(q => q.eq(q.field("fileId"), args.fileId)).first();
    return note ? note.content : "";
  },
});