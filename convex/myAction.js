import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { api } from "./_generated/api.js";
import { TaskType } from "@google/generative-ai";


export const ingest = action({
  args: {
    splitText : v.any(), 
    fileId: v.string()
  },
  handler: async (ctx) => {
    await ConvexVectorStore.fromTexts(
        args.splitText, 
        args.fileId,
    //   ["Hello world", "Bye bye", "What's this?"],

    //   [{ prop: 2 }, { prop: 1 }, { prop: 3 }],
    new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY, // Use environment variable
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return completed
  },
});