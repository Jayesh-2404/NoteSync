import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { api } from "./_generated/api.js";
import { TaskType } from "@google/generative-ai";
import { v } from 'convex/values';

const GOOGLE_API_KEY = ""; // Remove extra spaces

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const metadata = {
      fileId: args.fileId
    };

    await ConvexVectorStore.fromTexts(
      args.splitText,
      metadata,
      new GoogleGenerativeAIEmbeddings({
        apiKey: GOOGLE_API_KEY, // Use the constant
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    // Update document structure to match schema
    const document = {
      embedding: args.splitText,
      metadata: metadata, // Store metadata object
      text: args.splitText,
    };
    await ctx.db.insert("documents", document);

    return "completed";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: GOOGLE_API_KEY, // Use the constant
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    try {
      const results = await vectorStore.similaritySearch(args.query, 1);
      console.log("Raw results:", results); // Add logging for debugging

      const filteredResults = results.filter(q => q.metadata.fileId === args.fileId);
      console.log("Filtered results:", filteredResults);
      
      return JSON.stringify(filteredResults);
    } catch (error) {
      console.error("Search error:", error);
      throw error;
    }
  },
});