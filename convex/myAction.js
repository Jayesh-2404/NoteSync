import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { api } from "./_generated/api.js";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";


export const ingest = action({
  args: {
    splitText : v.any(),
    fileId : v.string()
  }, 
  handler : async(ctx)=>{
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey:'AIzaSyDjwXlla2d3XHBqIz9UfaIrHJgga9TZc5g ',
        model:"text-embedding-004",
        taskType:TaskType.RETRIEVAL_DOCUMENT,
        title:"Document title",
      }),
      {ctx}
    );
    return "completed .. " 
  },
});