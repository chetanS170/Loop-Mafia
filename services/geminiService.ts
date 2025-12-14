import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client safely
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not set. Gemini features will run in mock mode or fail.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCreativeContent = async (prompt: string): Promise<string> => {
  const ai = getAiClient();
  
  if (!ai) {
    // Fallback for demo purposes if no key is provided
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Connect your API Key to unleash the full power of Loop Mafia's AI engine. We can automate your content, analyze your data, and revolutionize your workflow.");
      }, 1500);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are Loop Mafia, a premium AI automation assistant. Keep the tone professional, cozy, and sophisticated. 
      
      User Request: ${prompt}
      
      Provide a concise, elegant response (max 50 words).`,
    });
    
    return response.text || "Our systems are currently calibrating. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "We encountered a momentary ripple in the digital fabric. Please try again.";
  }
};