import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import {
  buildSystemInstruction,
  detectContextFromQuery,
  generateAcademicSynthesis,
} from "./src/utils/tutorEngine";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "2mb" }));

  // Support relative Markmap links inside Indice_e6abcde5.html
  const markmapRedirectMap: Record<string, string> = {
    "tema1.html": "/assets/aistudio/tema1_0e7aba36.html",
    "tema2.html": "/assets/aistudio/tema2_d694fb51.html",
    "tema3.html": "/assets/aistudio/tema3_f8de3611.html",
    "tema4.html": "/assets/aistudio/tema4_fe3b3701.html",
    "tema5.html": "/assets/aistudio/tema5_cb2b06df.html",
  };

  for (const [shortName, targetUrl] of Object.entries(markmapRedirectMap)) {
    app.get(`/assets/aistudio/${shortName}`, (_req, res) => {
      res.redirect(targetUrl);
    });
  }

  // Academic Tutor API endpoint (Server-side Gemini API with scholarly synthesis fallback)
  app.post("/api/tutor/chat", async (req, res) => {
    const { message, activeThemeId = 1, history = [] } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      res.status(400).json({ error: "Por favor ingresa una consulta filosófica válida." });
      return;
    }

    const trimmedMessage = message.trim();
    const detected = detectContextFromQuery(trimmedMessage, Number(activeThemeId) || 1);
    const fallbackPayload = generateAcademicSynthesis(
      trimmedMessage,
      Number(activeThemeId) || 1
    );

    const apiKey = process.env.GEMINI_API_KEY;
    const hasRealApiKey =
      Boolean(apiKey) &&
      apiKey !== "MY_GEMINI_API_KEY" &&
      apiKey!.trim().length > 10;

    if (!hasRealApiKey) {
      res.json(fallbackPayload);
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
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
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: buildSystemInstruction(),
          temperature: 0.35,
        },
      });

      const text = response.text;
      if (text && text.trim()) {
        res.json({
          tutorName: "Crowley",
          answer: text.trim(),
          themeBadge: `${detected.primaryTheme.code} · ${detected.primaryTheme.shortTitle}`,
          authorsCited: detected.matchedAuthors.map((a) => a.name),
          conceptsUsed: detected.matchedConcepts.map((c) => c.term),
          polisLogosSynthesis: detected.primaryTheme.polisLogosConnection,
          followUpSuggestions: detected.primaryTheme.suggestedQuestions,
        });
        return;
      }

      res.json(fallbackPayload);
    } catch (_err) {
      // Graceful fallback to scholarly synthesis if API key is invalid or network restricted in sandbox
      res.json(fallbackPayload);
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
