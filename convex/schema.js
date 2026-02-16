import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    embedding: v.array(v.float64()),
    metadata: v.object({
      fileId: v.string(),
    }),
    text: v.string(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 768,
    filterFields: ["metadata.fileId"],
  }),
  pdfFiles: defineTable({
    createdBy: v.string(),
    fileId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    storageId: v.string(),
  })
    .index("by_fileId", ["fileId"])
    .index("by_createdBy", ["createdBy"]),
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    userName: v.string(),
  }),
  notes: defineTable({
    fileId: v.string(),
    notes:v.any(),
    createdBy: v.string()
    
  }).index("by_fileId", ["fileId"]),
  comments: defineTable({
    fileId: v.string(),
    commentText: v.string(),
    selectedText: v.optional(v.string()),
    anchorFrom: v.optional(v.number()),
    anchorTo: v.optional(v.number()),
    createdBy: v.string(),
    userName: v.string(),
    userImage: v.optional(v.string()),
    resolved: v.boolean(),
    createdAt: v.number(),
  }).index("by_fileId", ["fileId"]),
});
