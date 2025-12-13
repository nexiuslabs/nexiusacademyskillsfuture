import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from '../constants';

const apiKey = import.meta.env.VITE_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export interface AIResponse {
  text: string;
  confidenceScore: number;
  needsHumanHelp: boolean;
}

const LOW_CONFIDENCE_PHRASES = [
  "i don't know",
  "i'm not sure",
  "i cannot",
  "i can't help",
  "i don't have",
  "i'm unable",
  "beyond my knowledge",
  "not able to",
  "cannot provide",
  "don't have information"
];

const detectLowConfidence = (responseText: string): boolean => {
  const lowerResponse = responseText.toLowerCase();
  return LOW_CONFIDENCE_PHRASES.some(phrase => lowerResponse.includes(phrase));
};

const calculateConfidence = (responseText: string, userMessage: string): number => {
  let confidence = 0.8;

  if (detectLowConfidence(responseText)) {
    confidence = 0.3;
  }

  if (responseText.length < 30) {
    confidence -= 0.2;
  }

  const questionWords = ['price', 'cost', 'subsidy', 'schedule', 'duration', 'certificate', 'location'];
  const hasRelevantKeyword = questionWords.some(word =>
    userMessage.toLowerCase().includes(word)
  );

  if (hasRelevantKeyword && responseText.length > 50) {
    confidence = Math.min(confidence + 0.1, 1.0);
  }

  return Math.max(0, Math.min(confidence, 1.0));
};

export const generateAIResponse = async (userMessage: string): Promise<AIResponse> => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text() || "I'm sorry, I didn't get that.";

    const confidenceScore = calculateConfidence(text, userMessage);
    const needsHumanHelp = confidenceScore < 0.5;

    return {
      text,
      confidenceScore,
      needsHumanHelp
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "I am currently experiencing high traffic. Please try again later.",
      confidenceScore: 0.2,
      needsHumanHelp: true
    };
  }
};