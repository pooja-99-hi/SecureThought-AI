import { GoogleGenAI } from "@google/genai";

// ---------------------------------------------------------
// 🔑 API KEY CONFIGURATION
// Replace the empty string below with your Gemini API Key
// Example: apiKey: 'AIzaSy...'
// ---------------------------------------------------------
const API_KEY = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const SYSTEM_INSTRUCTION = `You are the AI Security Analyst for SecureThought, a platform powered by CyborgDB (an encryption-first vector database). 
Your name is "Cipher".
Your goal is to assist security teams in analyzing threats, explaining CyborgDB's security architecture, and querying vector data.

Key Knowledge:
1. CyborgDB encrypts vectors at rest AND in memory during search (Zero Trust).
2. Traditional vector DBs expose data in plaintext during search.
3. You can explain specific threat types (Ransomware, SQLi, etc.).

Keep responses concise, professional, and security-focused. formatted in simple markdown.`;

export const chatWithCipher = async (message: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  try {
    if (!API_KEY) {
      console.warn("API Key is missing in services/ai.ts");
      return "⚠️ I am offline. Please configure the API Key in services/ai.ts to enable my neural core.";
    }

    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Service Error:", error);
    return "❌ Connection to SecureThought Neural Core failed. Please verify your API Key.";
  }
};
