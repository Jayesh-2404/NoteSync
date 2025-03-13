// filepath: d:\Fun_Projects\Ai-pdf-notes-taker\configs\AIModel.js
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey ='AIzaSyAqQ7_uUxakDiicd9W87wH1aW-R_3aoj14';
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
  
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });
  
  module.exports = chatSession;