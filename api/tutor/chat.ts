import type { VercelRequest, VercelResponse } from "@vercel/node";

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
    // Historial compacto (últimos 3 mensajes)
    const recentHistory = Array.isArray(history) ? history.slice(-3) : [];
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    for (const m of recentHistory) {
      contents.push({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: String(m.content || "") }],
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: message.trim() }],
    });

    const systemInstruction = 
      "Eres Crowley, una tutora y compañera de estudio virtual. Tu trato es cálido, entusiasta, paciente y muy accesible. " +
      "Responde siempre con amabilidad y cercanía. " +
      "Para saludos o preguntas cotidianas, responde con calidez en 1 o 2 oraciones breves. " +
      "Para temas de filosofía o estudio, explica de forma didáctica y clara. Sé directa y ágil.";

    // Petición REST directa a la API de Google Gemini (sin latencia de wrappers)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 350,
        },
      }),
    });

    if (!apiResponse.ok) {
      const errBody = await apiResponse.text();
      console.error("Gemini API Error:", errBody);
      return res.status(500).json({
        answer: `Error de la API (${apiResponse.status}): ${errBody}`,
      });
    }

    const data = await apiResponse.json();
    const candidateText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({
      tutorName: "Crowley",
      answer: candidateText ? candidateText.trim() : "¡Hola! ¿En qué te puedo apoyar?",
      themeBadge: "Crowley",
      authorsCited: [],
      conceptsUsed: [],
      followUpSuggestions: [],
    });
  } catch (err: any) {
    console.error("Error en función de chat:", err);
    return res.status(500).json({
      answer: `Error de conexión: ${err?.message || "Inténtalo de nuevo."}`,
    });
  }
}
