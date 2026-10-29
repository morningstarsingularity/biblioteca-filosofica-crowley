import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history = [] } = req.body || {};

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Mensaje vacío" });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return res.status(500).json({
      answer: "Error: No se detectó la API Key de Gemini en Vercel.",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Tomamos solo los últimos 4 mensajes para procesar menos tokens y acelerar la respuesta
    const conversationContext = Array.isArray(history)
      ? history
          .slice(-4)
          .map(
            (m: { role?: string; content?: string }) =>
              `${m.role === "user" ? "Estudiante" : "Crowley"}: ${m.content || ""}`
          )
          .join("\n")
      : "";

    const systemInstruction = `Eres Crowley, una tutora filosófica ágil, perspicaz y elocuente. 
Responde con fluidez, rapidez y concisión a cualquier duda del estudiante (máximo 2 a 3 párrafos precisos).
Usa conceptos griegos en cursiva si enriquecen la respuesta, pero sé directa y dinámica sin rodeos innecesarios.`;

    const prompt = conversationContext
      ? `Historial:\n${conversationContext}\n\nPregunta: ${message.trim()}`
      : message.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 600, // Limita la longitud máxima para una entrega de respuesta inmediata
      },
    });

    const text = response.text;

    return res.status(200).json({
      tutorName: "Crowley",
      answer: text ? text.trim() : "No pude formular una respuesta.",
      themeBadge: "Crowley AI",
      authorsCited: [],
      conceptsUsed: [],
      followUpSuggestions: [],
    });
  } catch (err: any) {
    return res.status(500).json({
      answer: `Error al conectar con Gemini: ${err?.message || "Error desconocido"}`,
    });
  }
}
