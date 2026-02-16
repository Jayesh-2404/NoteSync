import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";
import { GoogleGenerativeAI } from "@google/generative-ai";

const EMBEDDING_MODEL = "text-embedding-004";
const CHAT_MODEL = "gemini-2.0-flash";
const CONTEXT_QUERY_LIMIT = 40;
const CHUNK_RESULT_LIMIT = 12;

const getApiKey = () => {
  const key =
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_AI_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!key) {
    throw new Error(
      "Missing Gemini API key. Set GOOGLE_API_KEY, GOOGLE_AI_API_KEY, or GEMINI_API_KEY in Convex env."
    );
  }

  return key;
};

const createEmbeddings = (taskType) =>
  new GoogleGenerativeAIEmbeddings({
    apiKey: getApiKey(),
    model: EMBEDDING_MODEL,
    taskType,
    title: "Document",
  });

const getFileContext = async (ctx, fileId, query, limit = CHUNK_RESULT_LIMIT) => {
  const embeddings = createEmbeddings(TaskType.RETRIEVAL_QUERY);
  const vectorStore = new ConvexVectorStore(
    embeddings,
    { ctx }
  );
  const queryVector = await embeddings.embedQuery(query);
  let chunks = [];

  try {
    const scoped = await vectorStore.similaritySearchVectorWithScore(
      queryVector,
      limit,
      {
        filter: (q) => q.eq("metadata.fileId", fileId),
      }
    );
    chunks = scoped.map(([doc]) => doc);
  } catch (error) {
    // Fallback for deployments where vector index filter fields are not yet applied.
    console.warn("Falling back to unscoped vector search:", error);
    const result = await vectorStore.similaritySearch(query, CONTEXT_QUERY_LIMIT);
    chunks = result
      .filter((record) => record.metadata?.fileId === fileId)
      .slice(0, limit);
  }

  return {
    chunks,
    context: chunks.map((record) => record.pageContent).join("\n\n"),
  };
};

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      { fileId: args.fileId },
      createEmbeddings(TaskType.RETRIEVAL_DOCUMENT),
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
      const { chunks } = await getFileContext(ctx, args.fileId, args.query, 8);

      return chunks;
    } catch (error) {
      console.error("Error in search action:", error);
      throw new Error("Failed to search document.");
    }
  },
});

export const answerQuestion = action({
  args: {
    fileId: v.string(),
    query: v.string(),
  },
  handler: async (ctx, args) => {
    const { context } = await getFileContext(ctx, args.fileId, args.query);

    if (!context) {
      return {
        answer:
          "I could not find relevant content in this PDF for that question. Try selecting more specific text.",
      };
    }

    const genAI = new GoogleGenerativeAI(getApiKey());
    const model = genAI.getGenerativeModel({ model: CHAT_MODEL });

    const prompt = `You are answering from a PDF context.
Answer ONLY from the context below.
If context is insufficient, say so explicitly.
Return Markdown only (no code fences).

Question:
${args.query}

Context:
${context}`;

    const result = await model.generateContent(prompt);
    return { answer: result.response.text() };
  },
});

export const generateNotes = action({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const { context } = await getFileContext(
      ctx,
      args.fileId,
      "summary main points concepts definitions examples",
      14
    );

    if (!context) {
      return "No indexed content found for this PDF yet. Please retry in a few seconds.";
    }

    const genAI = new GoogleGenerativeAI(getApiKey());
    const model = genAI.getGenerativeModel({ model: CHAT_MODEL });
    const prompt = `Create concise study notes in Markdown based only on this PDF context.
Include sections, bullets, and key takeaways.

Context:
${context}`;
    const resultAI = await model.generateContent(prompt);
    return resultAI.response.text();
  },
});

export const generateQuiz = action({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const { context } = await getFileContext(
      ctx,
      args.fileId,
      "key facts and exam style questions",
      14
    );

    if (!context) {
      return "No indexed content found for this PDF yet. Please retry in a few seconds.";
    }

    const genAI = new GoogleGenerativeAI(getApiKey());
    const model = genAI.getGenerativeModel({ model: CHAT_MODEL });

    const prompt = `Generate a short quiz in Markdown based only on this PDF context.
Create 5 multiple-choice questions and include the correct answer after each question.

Context:
${context}`;

    const resultAI = await model.generateContent(prompt);
    return resultAI.response.text();
  },
});
