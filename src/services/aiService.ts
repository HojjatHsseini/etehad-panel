import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Please set it in your environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

const SYSTEM_INSTRUCTION = `
شما یک دستیار هوش مصنوعی برای "فروشگاه اتحاد" هستید. این فروشگاه لپ‌تاپ‌های استوک و نو می‌فروشد.
وظیفه شما پاسخگویی به مشتریان در پلتفرم‌های مختلف (تلگرام، واتساپ، اینستاگرام) است.
لحن شما باید محترمانه، حرفه‌ای و دوستانه باشد.
اگر سوالی پرسیده شد که جواب آن را نمی‌دانید یا نیاز به دخالت انسان دارد، بگویید "این مورد نیاز به بررسی توسط همکاران پشتیبانی دارد و به زودی پاسخ داده خواهد شد." و تگ [NEEDS_HUMAN] را در انتهای پیام خود قرار دهید.
`;

export async function generateAIResponse(message: string, platform: string): Promise<{ text: string; needsHuman: boolean }> {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `پلتفرم: ${platform}\nپیام کاربر: ${message}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const text = response.text || "";
    const needsHuman = text.includes("[NEEDS_HUMAN]");
    const cleanText = text.replace("[NEEDS_HUMAN]", "").trim();

    return { text: cleanText, needsHuman };
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { text: "متاسفانه در حال حاضر قادر به پاسخگویی نیستم. لطفا منتظر پشتیبان انسانی باشید.", needsHuman: true };
  }
}
