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
  }),
  pdfFiles: defineTable({
    createdBy: v.string(),
    fileId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    storageId: v.string(),
  }),
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    userName: v.string(),
  }),
  notes: defineTable({
    fileId: v.string(),
    content: v.string(),
  }),
});