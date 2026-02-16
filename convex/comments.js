import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listByFile = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_fileId", (q) => q.eq("fileId", args.fileId))
      .collect();

    return comments.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const add = mutation({
  args: {
    fileId: v.string(),
    commentText: v.string(),
    selectedText: v.optional(v.string()),
    anchorFrom: v.optional(v.number()),
    anchorTo: v.optional(v.number()),
    createdBy: v.string(),
    userName: v.string(),
    userImage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const cleanText = args.commentText.trim();
    if (!cleanText) {
      throw new Error("Comment text is required.");
    }

    await ctx.db.insert("comments", {
      ...args,
      commentText: cleanText,
      resolved: false,
      createdAt: Date.now(),
    });
  },
});

export const toggleResolved = mutation({
  args: {
    commentId: v.id("comments"),
    resolved: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.commentId, { resolved: args.resolved });
  },
});

export const remove = mutation({
  args: {
    commentId: v.id("comments"),
    requesterEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.commentId);
    if (!comment) return;

    if (comment.createdBy !== args.requesterEmail) {
      throw new Error("Only the comment author can delete this comment.");
    }

    await ctx.db.delete(args.commentId);
  },
});
