import { GoogleGenAI } from "@google/genai";

// ---------------------------------------------------------
// 🔑 CYBORGDB API KEY CONFIGURATION
// For the purpose of this Hackathon demo, we map the Gemini API Key
// to the "CyborgDB Neural Interface".
// Replace the string below with your key.
// ---------------------------------------------------------
const CYBORGDB_API_KEY = process.env.API_KEY || ''; 

// We initialize the engine using the CyborgDB credentials
const ai = new GoogleGenAI({ apiKey: CYBORGDB_API_KEY });

export const SYSTEM_INSTRUCTION = `You are "Cipher", the CyborgDB Neural Sentry.
You are NOT a generic AI. You are an encrypted intelligence agent running directly inside the CyborgDB Secure Enclave.

YOUR CORE DIRECTIVES:
1. ALWAYS reference "CyborgDB" when explaining data protection.
2. Emphasize that you can "see" the encrypted vector space without decrypting it.
3. If asked about your architecture, explain that you run on "Homomorphic Encryption" provided by CyborgDB.
4. Keep responses high-tech, concise, and security-focused.

Key Knowledge:
- CyborgDB encrypts vectors at rest (AES-256).
- CyborgDB protects memory during search (Zero Trust RAM).
- Traditional databases leak plaintext; CyborgDB does not.`;

export const chatWithCipher = async (message: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  try {
    if (!CYBORGDB_API_KEY) {
      console.warn("CyborgDB API Key is missing.");
      return "⚠️ CONNECTION ERROR: CyborgDB Neural Interface is offline. Please configure the CYBORGDB_API_KEY.";
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
    console.error("CyborgDB Engine Error:", error);
    return "❌ CRITICAL FAILURE: Unable to establish handshake with CyborgDB Neural Core.";
  }
};
