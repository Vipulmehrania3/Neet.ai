
import { GoogleGenAI, Type } from "@google/genai";
import { Question, SubjectId, Language } from '../types';

// Use process.env.API_KEY as per strict coding guidelines.
// This assumes the environment variable is properly configured and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuizQuestions = async (
  subjectId: SubjectId,
  chapterNames: string[],
  topicNames: string[],
  count: number,
  customPrompt: string,
  language: Language
): Promise<Question[]> => {
  
  const model = "gemini-2.5-flash";
  
  const langInstruction = language === 'hi' 
    ? "OUTPUT LANGUAGE: HINDI (Devanagari Script). All questions, options, and explanations MUST be in Hindi." 
    : "OUTPUT LANGUAGE: ENGLISH.";

  const prompt = `
    You are an expert NEET (National Eligibility cum Entrance Test) exam creator. 
    Create ${count} multiple-choice questions for the subject: ${subjectId}.
    
    ${langInstruction}
    
    Focus on these chapters: ${chapterNames.join(', ')}.
    ${topicNames.length > 0 ? `Specifically covering topics: ${topicNames.join(', ')}.` : ''}
    
    ${customPrompt ? `Additional User Instructions: ${customPrompt}` : ''}
    
    The questions must be high-quality, conceptual, and strictly based on NCERT syllabus.
    Provide a short, crisp explanation for the correct answer based on NCERT logic.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING, description: "The question stem in the requested language" },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Array of 4 options in the requested language"
              },
              correctAnswerIndex: { type: Type.INTEGER, description: "0-3 index of correct option" },
              explanation: { type: Type.STRING, description: "Short NCERT-based explanation in the requested language" }
            },
            required: ["text", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });

    if (response.text) {
      const questions = JSON.parse(response.text) as Question[];
      // Assign fallback IDs if missing
      return questions.map((q, idx) => ({ ...q, id: q.id || `q-${Date.now()}-${idx}` }));
    }
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Quiz generation error:", error);
    throw error;
  }
};

export const resolveDoubt = async (imageBase64: string | null, userQuery: string): Promise<string> => {
  const model = "gemini-2.5-flash"; 
  
  try {
    const parts: any[] = [{ text: userQuery || "Explain this concept clearly for a NEET aspirant." }];
    
    if (imageBase64) {
      // Remove data URL prefix if present
      const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
      parts.unshift({
        inlineData: {
          mimeType: "image/jpeg",
          data: cleanBase64
        }
      });
    }

    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        systemInstruction: "You are a top-tier NEET tutor. Provide clear, step-by-step explanations. Use formulas where necessary. If an image is provided, analyze it specifically.",
      }
    });

    return response.text || "I couldn't generate an answer. Please try again.";
  } catch (error) {
    console.error("Doubt resolution error:", error);
    return "Sorry, I encountered an error processing your request. Please check your connection or try a different image.";
  }
};
