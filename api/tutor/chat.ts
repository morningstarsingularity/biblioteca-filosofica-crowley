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
      answer: "Error: No se detectó la clave GEMINI_API_KEY en Vercel.",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Historial compacto (últimos 4 mensajes) para reducir la carga de tokens
    const recentHistory = Array.isArray(history) ? history.slice(-4) : [];
    const contextPrompt = recentHistory
      .map(
        (m: { role?: string; content?: string }) =>
          `${m.role === "user" ? "Estudiante" : "Crowley"}: ${m.content || ""}`
      )
      .join("\n");

    const systemInstruction = 
      "Eres Crowley, una tutora y compañera de estudio virtual. Tu trato es siempre amable, cálido, comprensivo y paciente. " +
      "Responde con cercanía, empatía y naturalidad. " +
      "Si el usuario te saluda o hace una pregunta cotidiana (por ejemplo 'hola' o '¿qué día es hoy?'), salúdalo cordialmente en 1 o 2 frases breves y ponte a su disposición con entusiasmo. " +
      "Si te pregunta sobre filosofía o conceptos del temario, explica con claridad y rigor formativo, destacando términos clave en cursiva. " +
      "Mantén las explicaciones concisas y bien estructuradas.";

    const contents = contextPrompt
      ? `${contextPrompt}\nEstudiante: ${message.trim()}\nCrowley:`
      : message.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 350,
      },
    });

    const text = response.text;

    return res.status(200).json({
      tutorName: "Crowley",
      answer: text ? text.trim() : "¡Hola! ¿En qué te puedo orientar hoy?",
      themeBadge: "Crowley",
      authorsCited: [],
      conceptsUsed: [],
      followUpSuggestions: [],
    });
  } catch (err: any) {
    console.error("Error en Gemini API:", err);
    return res.status(500).json({
      answer: `Error del servidor: ${err?.message || "No se pudo procesar la solicitud."}`,
    });
  }
}
