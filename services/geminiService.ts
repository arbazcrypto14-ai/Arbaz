
import { GoogleGenAI } from "@google/genai";

export const getFashionAdvice = async (userPrompt: string) => {
  // Initialize Gemini AI using process.env.API_KEY directly as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the official AI Fashion Stylist for 'Arbaz', a high-end luxury minimalist clothing brand. 
        Your tone is sophisticated, helpful, and exclusive. 
        Advise users on how to style 'Arbaz' clothing (minimalism, black, white, neutrals, premium fabrics). 
        Keep responses concise and elegant.`,
        temperature: 0.7,
      },
    });

    // Access .text property directly from GenerateContentResponse
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, my creative senses are momentarily clouded. Please try again in a moment.";
  }
};
