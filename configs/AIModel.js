"use client";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

let chatSession = null;

/**
 * Lazily initializes and returns the Gemini chat session.
 * This avoids errors at import time if the API key is not yet loaded.
 */
export function getChatSession() {
  if (chatSession) {
    return chatSession;
  }

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set. Please ensure the environment variable is configured and restart the server.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  return chatSession;
}

// For backward compatibility, also export a default that calls getChatSession
// This will still throw if key is missing when first accessed
export default {
  sendMessage: async (prompt) => {
    const session = getChatSession();
    return session.sendMessage(prompt);
  }
};
