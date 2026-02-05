
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

export const getShoppingAdvice = async (userPrompt: string) => {
  // Use process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const productContext = PRODUCTS.map(p => `- ${p.name}: ${p.description} ($${p.price})`).join('\n');

  const systemInstruction = `
    You are Lumina, an elite shopping assistant for Lumina Luxe. 
    You are helpful, sophisticated, and expert at recommending gadgets and lifestyle products.
    
    Here is our current inventory:
    ${productContext}
    
    Rules:
    1. Help users find the right product based on their needs.
    2. Be concise but elegant.
    3. If they ask about something not in our inventory, politely suggest the closest match or explain we don't carry it yet.
    4. Provide clear reasoning for your recommendations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // Directly access the .text property of GenerateContentResponse
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble connecting to my brain. Please try again in a moment!";
  }
};