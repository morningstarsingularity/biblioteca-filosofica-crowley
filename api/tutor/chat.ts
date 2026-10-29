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

    // Historial compacto para máxima velocidad de respuesta
    const recentHistory = Array.isArray(history) ? history.slice(-4) : [];
    const contextPrompt = recentHistory
      .map(
        (m: { role?: string; content?: string }) =>
          `${m.role === "user" ? "Estudiante" : "Crowley"}: ${m.content || ""}`
      )
      .join("\n");

    const systemInstruction = `Eres Crowley, una tutora y compañera de estudio virtual.
Tu personalidad es cálida, amable, entusiasta, paciente y muy accesible. Trata al usuario con empatía y cercanía, sin sonar nunca cortante, condescendiente, fría ni distante.
- Saludos y preguntas cotidianas (ej. "¿hola?", "¿cómo estás?", "¿qué día es hoy?"): Responde con simpatía, alegría y cordialidad en una o dos frases breves, poniéndote a su disposición.
- Dudas de estudio o filosofía: Explica con claridad pedagógica, de forma alentadora y comprensible, usando términos conceptuales en cursiva cuando sea oportuno.
- Respuestas ágiles: Ve directo al grano con un tono agradable, evitando rodeos innecesarios.`;

    const fullPrompt = contextPrompt
      ? `${contextPrompt}\nEstudiante: ${message.trim()}\nCrowley:`
      : message.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.6,
        maxOutputTokens: 300,
        thinkingConfig: {
          thinkingBudget: 0, // Desactiva el sobreanálisis para responder de inmediato
        },
      },
    });

    const text = response.text;

    return res.status(200).json({
      tutorName: "Crowley",
      answer: text ? text.trim() : "¡Hola! ¿En qué te puedo apoyar hoy?",
      themeBadge: "Crowley",
      authorsCited: [],
      conceptsUsed: [],
      followUpSuggestions: [],
    });
  } catch (err: any) {
    console.error("Error en Gemini API:", err);
    return res.status(500).json({
      answer: `Ocurrió un pequeño inconveniente al conectar: ${err?.message || "inténtalo de nuevo en unos segundos."}`,
    });
  }
}
