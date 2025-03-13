import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { api } from "./_generated/api.js";
import { TaskType } from "@google/generative-ai";
import { v } from 'convex/values';

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Split Text:", args.splitText); // Log the input text
    console.log("Metadata:", { fileId: args.fileId }); // Log the metadata

    const metadata = {
      fileId: args.fileId,
    };

    await ConvexVectorStore.fromTexts(
      args.splitText,
      metadata,
      new GoogleGenerativeAIEmbeddings({
        apiKey: "",
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const document = {
      embedding: args.splitText,
      metadata: metadata,
      text: args.splitText,
    };
    await ctx.db.insert("documents", document);

    return "completed";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: '',
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const results = await vectorStore.similaritySearch(args.query, 1);

    const resultOne = results.filter((q) => q.metadata.fileId === args.fileId);

    if (resultOne.length === 0) {
      return "No matching documents found.";
    }

    return JSON.stringify(resultOne);
  },
});