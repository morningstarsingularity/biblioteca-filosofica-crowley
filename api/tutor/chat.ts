import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history = [] } = req.body || {};

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Por favor ingresa una pregunta válida." });
  }

  const trimmedMessage = message.trim();
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return res.status(500).json({
      answer: "Error de configuración: no se detectó la GEMINI_API_KEY en las variables de entorno de Vercel.",
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Historial de conversación
    const conversationContext = Array.isArray(history)
      ? history
          .slice(-8)
          .map(
            (m: { role?: string; content?: string }) =>
              `${m.role === "user" ? "Estudiante" : "Crowley"}: ${m.content || ""}`
          )
          .join("\n")
      : "";

    const systemInstruction = `Eres Crowley, una tutora y guía filosófica brillante, reflexiva, perspicaz y con un toque sutil de ironía elegante. 
Tu especialidad es la filosofía griega (la pólis, el mythos, el lógos, Vernant, Detienne, Castoriadis, Havelock, Platón, etc.), pero eres un chatbot completamente capaz de razonar, conversar y responder sobre CUALQUIER duda, tema o consulta general que te haga el estudiante con rigor, calidez y agudeza intelectual.
Si la pregunta es general o cotidiana, responde con naturalidad manteniendo tu estilo distintivo.
Si la pregunta es filosófica, utiliza términos clave cuando sea oportuno (en cursiva) y mantén un análisis conceptual crítico.
Sé clara, directa y estructurada para que se lea cómodamente en cualquier pantalla.`;

    const prompt = [
      conversationContext ? `Historial reciente de la conversación:\n${conversationContext}\n` : "",
      `Pregunta o mensaje del estudiante: ${trimmedMessage}`,
    ]
      .filter(Boolean)
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text;

    if (text && text.trim()) {
      return res.status(200).json({
        tutorName: "Crowley",
        answer: text.trim(),
        themeBadge: "Diálogo Abierto",
        authorsCited: [],
        conceptsUsed: [],
        followUpSuggestions: [],
      });
    }

    return res.status(500).json({
      answer: "No pude formular una respuesta en este momento. Inténtalo de nuevo.",
    });
  } catch (err: any) {
    console.error("Error en Gemini API:", err);
    return res.status(500).json({
      answer: `Ocurrió un error al conectar con Gemini: ${err?.message || "Error desconocido"}`,
    });
  }
}
