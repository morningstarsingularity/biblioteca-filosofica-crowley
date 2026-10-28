import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";
import {
  buildSystemInstruction,
  detectContextFromQuery,
  generateAcademicSynthesis,
} from "../../src/utils/tutorEngine";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Solo permitir peticiones POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, activeThemeId = 1, history = [] } = req.body || {};

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Por favor ingresa una consulta filosófica válida." });
  }

  const trimmedMessage = message.trim();
  const detected = detectContextFromQuery(trimmedMessage, Number(activeThemeId) || 1);
  const fallbackPayload = generateAcademicSynthesis(
    trimmedMessage,
    Number(activeThemeId) || 1
  );

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  const hasRealApiKey =
    Boolean(apiKey) &&
    apiKey !== "MY_GEMINI_API_KEY" &&
    apiKey!.trim().length > 10;

  if (!hasRealApiKey) {
    return res.status(200).json(fallbackPayload);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey!,
    });

    const conversationContext = Array.isArray(history)
      ? history
          .slice(-6)
          .map(
            (m: { role?: string; content?: string }) =>
              `${m.role === "user" ? "Estudiante" : "Crowley (Tutora)"}: ${m.content || ""}`
          )
          .join("\n")
      : "";

    const prompt = [
      conversationContext ? `Historial reciente:\n${conversationContext}\n` : "",
      `Tema activo sugerido: ${detected.primaryTheme.fullTitle}`,
      `Consulta del estudiante: ${trimmedMessage}`,
      `Responde como Crowley (con tu tono reflexivo, perspicaz, sutilmente irónico y riguroso). Recuerda cumplir las 4 reglas: 1) Claro, conciso y legible en móvil; 2) Citar conceptos clave griegos en cursiva (${detected.matchedConcepts.map((c) => c.term).join(", ")}); 3) Indicar el Tema exacto, autor/año y su relación con la pólis y el lógos; 4) Mantener una postura filosófica crítica y contextual.`,
    ]
      .filter(Boolean)
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: buildSystemInstruction(),
        temperature: 0.35,
      },
    });

    const text = response.text;
    if (text && text.trim()) {
      return res.status(200).json({
        tutorName: "Crowley",
        answer: text.trim(),
        themeBadge: `${detected.primaryTheme.code} · ${detected.primaryTheme.shortTitle}`,
        authorsCited: detected.matchedAuthors.map((a) => a.name),
        conceptsUsed: detected.matchedConcepts.map((c) => c.term),
        polisLogosSynthesis: detected.primaryTheme.polisLogosConnection,
        followUpSuggestions: detected.primaryTheme.suggestedQuestions,
      });
    }

    return res.status(200).json(fallbackPayload);
  } catch (err) {
    console.error("Error en Gemini API:", err);
    return res.status(200).json(fallbackPayload);
  }
}
