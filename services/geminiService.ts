import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from '../constants';

const apiKey = import.meta.env.VITE_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    return response.text() || "I'm sorry, I didn't get that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing high traffic. Please try again later.";
  }
};