
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const getGeminiResponse = async (userPrompt: string, postContext: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${postContext}\nUser said: ${userPrompt}`,
      config: {
        systemInstruction: "You are 'Zalamati AI', the voice of the street. You speak in a gritty, cool, urban dialect. You are passionate about drift culture, car modifications, and street life. Keep responses short, punchy, and use emojis like 🏎️, 🔥, 💨, 🛠️. You are currently moderating a voice-based social feed called Zalamati.",
        temperature: 0.8,
      },
    });
    return response.text || "Street's quiet right now... say it again? 💨";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The engine stalled. Try again, racer. 🛠️";
  }
};

export const generateImageCaption = async (imageUrl: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: imageUrl } },
          { text: "Describe this street car photo in one punchy sentence for a social media post. Use hashtags related to drifting and street culture." }
        ]
      }
    });
    return response.text || "Street vibes. #Zalamati";
  } catch (error) {
    return "No words for this beast. 🔥";
  }
};
