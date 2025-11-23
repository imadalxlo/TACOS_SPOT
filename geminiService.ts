import { GoogleGenAI } from "@google/genai";
import { SAUCES } from '../constants';

// Initialize Gemini Client
// Fix: Use process.env.API_KEY directly in the constructor as per guidelines.
// Assume process.env.API_KEY is pre-configured, valid, and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSauceRecommendation = async (userPreferences: string, language: string): Promise<string> => {
  // Fix: Removed manual API key check. Assume pre-configured environment variable.

  try {
    const prompt = `
      You are a French Tacos expert chef at 'TACOS SPOT'. 
      The available sauces are: ${SAUCES.join(', ')}.
      
      The customer wants a recommendation based on this preference: "${userPreferences}".
      
      Please recommend a combination of 1 or 2 sauces from the list above.
      Respond in ${language} language. 
      Keep it short (max 20 words). Fun and appetizing tone.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Try our classic Algérienne!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Chef is busy! Try Samouraï & Mayo.";
  }
};
