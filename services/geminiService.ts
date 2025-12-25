import { GoogleGenAI, Type } from "@google/genai";
import { StockAnalysis } from "../types";

// Initialize Gemini
// Note: In a real production app, ensure API_KEY is set in environment variables.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const analyzeStock = async (symbol: string, name: string): Promise<StockAnalysis> => {
  if (!apiKey) {
    throw new Error("API Key eksik. Lütfen ortam yapılandırmasını kontrol edin.");
  }

  const prompt = `
    Analyze the current market status of ${symbol} (${name}) on Borsa Istanbul (BIST 100).
    
    IMPORTANT: The output must be in Turkish language (Türkçe).
    
    1.  **Search Grounding**: Use Google Search to find the *latest* available price, P/E ratio (F/K), Market Cap (Piyasa Değeri), and recent financial news or technical signals as of today.
    2.  **Technical Analysis**: Estimate or retrieve values for RSI (Relative Strength Index) and MACD. Determine if the signal is Buy (Al), Sell (Sat), or Neutral (Nötr).
    3.  **Predictions**: Based on the technicals and news, predict the likely trend for:
        *   Today (Intraday / Gün içi)
        *   Next Week (Short term / Gelecek Hafta)
        *   Next Month (Medium term / Gelecek Ay)
        For each, estimate a percentage range (e.g., "+1.5%") and direction (UP/DOWN/NEUTRAL).
    
    Return the result strictly as a valid JSON object matching this structure:
    {
      "fundamentals": { "price": "...", "peRatio": "...", "marketCap": "...", "volume": "..." },
      "technicals": [ { "name": "RSI", "value": "...", "signal": "Buy/Sell/Neutral" }, ... ],
      "predictions": [ 
        { "period": "Day", "direction": "UP", "percentageChange": "...", "reasoning": "..." },
        { "period": "Week", "direction": "DOWN", "percentageChange": "...", "reasoning": "..." },
        { "period": "Month", "direction": "UP", "percentageChange": "...", "reasoning": "..." }
      ],
      "summary": "A short 2-sentence summary of the outlook in Turkish."
    }

    Ensure all text fields (reasoning, summary, fundamentals keys if applicable) are in Turkish. 
    Keep enum values like "Buy", "Sell", "Neutral", "Day", "Week", "Month", "UP", "DOWN" in English for easier parsing code side, but ensure the 'reasoning' and 'summary' text is Turkish.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Using flash for speed and JSON capability
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fundamentals: {
              type: Type.OBJECT,
              properties: {
                price: { type: Type.STRING },
                peRatio: { type: Type.STRING },
                marketCap: { type: Type.STRING },
                volume: { type: Type.STRING }
              }
            },
            technicals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  value: { type: Type.STRING },
                  signal: { type: Type.STRING, enum: ["Buy", "Sell", "Neutral"] }
                }
              }
            },
            predictions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  period: { type: Type.STRING, enum: ["Day", "Week", "Month"] },
                  direction: { type: Type.STRING, enum: ["UP", "DOWN", "NEUTRAL"] },
                  percentageChange: { type: Type.STRING },
                  reasoning: { type: Type.STRING }
                }
              }
            },
            summary: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Yapay zekadan yanıt alınamadı");

    const data = JSON.parse(text) as StockAnalysis;
    return {
      ...data,
      lastUpdated: new Date().toLocaleTimeString('tr-TR')
    };

  } catch (error) {
    console.error("Hisse analizi hatası:", error);
    // Fallback mock data in case of API failure or quota limits
    return {
      fundamentals: { price: "Yok", peRatio: "Yok", marketCap: "Yok", volume: "Yok" },
      technicals: [
        { name: "RSI", value: "50", signal: "Neutral" },
        { name: "MACD", value: "0", signal: "Neutral" }
      ],
      predictions: [
        { period: "Day", direction: "NEUTRAL", percentageChange: "0%", reasoning: "Veri alınamadı." },
        { period: "Week", direction: "NEUTRAL", percentageChange: "0%", reasoning: "Veri alınamadı." },
        { period: "Month", direction: "NEUTRAL", percentageChange: "0%", reasoning: "Veri alınamadı." }
      ],
      summary: "Gerçek zamanlı veri alınamadı. Lütfen daha sonra tekrar deneyiniz.",
      lastUpdated: new Date().toLocaleTimeString('tr-TR')
    } as StockAnalysis;
  }
};
