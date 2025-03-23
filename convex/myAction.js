import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { api } from "./_generated/api.js";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey: 'AIzaSyAqQ7_uUxakDiicd9W87wH1aW-R_3aoj14',
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "completed .. ";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    try {
      const texts = await ConvexVectorStore.fromTexts(
        args.query,
        args.fileId,
        new GoogleGenerativeAIEmbeddings({
          apiKey: 'AIzaSyAqQ7_uUxakDiicd9W87wH1aW-R_3aoj14 ',
          model: "text-embedding-004",
          taskType: TaskType.RETRIEVAL_DOCUMENT,
          title: "Document title",
        }),
        { ctx }
      );
      if (!Array.isArray(texts)) {
        throw new Error("Expected an array of texts");
      }
      return texts;
    } catch (error) {
      console.error("Error in search action:", error);
      return []; // Return an empty array in case of error
    }
  },
});