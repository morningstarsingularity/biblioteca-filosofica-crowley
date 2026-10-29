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
      answer: "Error: No se detectó la GEMINI_API_KEY en las variables de entorno de Vercel.",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Mantener solo los últimos 3 mensajes para acelerar el procesamiento de contexto
    const recentHistory = Array.isArray(history) ? history.slice(-3) : [];
    const contextPrompt = recentHistory
      .map(
        (m: { role?: string; content?: string }) =>
          `${m.role === "user" ? "Estudiante" : "Crowley"}: ${m.content || ""}`
      )
      .join("\n");

    const systemInstruction = `Eres Crowley, una tutora y guía filosófica ágil, perspicaz y elocuente.
Responde de inmediato, con soltura y precisión.
Si te hacen un saludo o pregunta cotidiana (ej. "¿hola?", "¿qué día es hoy?"), responde de forma breve, natural y directa con tu estilo característico (máximo 1 o 2 oraciones).
Si te hacen preguntas conceptuales o académicas, explica con claridad y rigor usando cursivas para conceptos clave.
Sé concisa: nunca des respuestas innecesariamente largas ni hagas esperar al usuario.`;

    const fullPrompt = contextPrompt
      ? `${contextPrompt}\nEstudiante: ${message.trim()}\nCrowley:`
      : message.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 350,
      },
    });

    const text = response.text;

    return res.status(200).json({
      tutorName: "Crowley",
      answer: text ? text.trim() : "Dime, ¿en qué puedo ayudarte?",
      themeBadge: "Crowley AI",
      authorsCited: [],
      conceptsUsed: [],
      followUpSuggestions: [],
    });
  } catch (err: any) {
    console.error("Error en Gemini API:", err);
    return res.status(500).json({
      answer: `Error al conectar con Crowley: ${err?.message || "Tiempo de espera agotado."}`,
    });
  }
}
