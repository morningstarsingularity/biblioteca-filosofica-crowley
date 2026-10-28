import React, { useState, useRef, useEffect } from "react";
import { Send, BookOpen, Compass, RotateCcw, ArrowUpRight } from "lucide-react";
import {
  PHILOSOPHY_THEMES,
  PhilosophyTheme,
  GREEK_CONCEPTS,
} from "../data/philosophyData";
import { CROWLEY_NAME } from "../utils/tutorEngine";
import { CrowleyAvatar } from "./CrowleyAvatar";

export interface ChatMessage {
  id: string;
  role: "user" | "tutor";
  content: string;
  meta?: {
    themeBadge?: string;
    authorsCited?: string[];
    conceptsUsed?: string[];
    polisLogosSynthesis?: string;
    followUpSuggestions?: string[];
  };
}

interface TutorPanelProps {
  activeThemeId: number;
  onSelectTheme: (themeId: number) => void;
  externalQuery: string | null;
  onClearExternalQuery: () => void;
  onOpenThemeMap: (themeId: number) => void;
}

function renderFormattedLine(line: string, idx: number) {
  const parts: React.ReactNode[] = [];
  const tokenRegex = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(line.slice(lastIndex, match.index));
    }
    const raw = match[0];
    if (raw.startsWith("***") && raw.endsWith("***")) {
      parts.push(
        <strong
          key={`${idx}-${match.index}`}
          className="font-semibold italic text-[#f472b6]"
        >
          {raw.slice(3, -3)}
        </strong>
      );
    } else if (raw.startsWith("**") && raw.endsWith("**")) {
      parts.push(
        <strong
          key={`${idx}-${match.index}`}
          className="font-semibold text-[#f5f3ff]"
        >
          {raw.slice(2, -2)}
        </strong>
      );
    } else if (raw.startsWith("*") && raw.endsWith("*")) {
      parts.push(
        <em
          key={`${idx}-${match.index}`}
          className="font-serif italic text-[#d8b4fe] text-[1.06em]"
        >
          {raw.slice(1, -1)}
        </em>
      );
    }
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < line.length) {
    parts.push(line.slice(lastIndex));
  }

  return parts;
}

export const TutorPanel: React.FC<TutorPanelProps> = ({
  activeThemeId,
  onSelectTheme,
  externalQuery,
  onClearExternalQuery,
  onOpenThemeMap,
}) => {
  const activeTheme: PhilosophyTheme =
    PHILOSOPHY_THEMES.find((t) => t.id === activeThemeId) ||
    PHILOSOPHY_THEMES[0];

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome-msg",
      role: "tutor",
      content: [
        "**Hola, soy Crowley, tu tutora y guía filosófica en esta Biblioteca Conceptual.**",
        "Con mis audífonos puestos he estado escuchando el murmullo de los antiguos y los dilemas contemporáneos. Puedes elegir un tema de referencia o preguntarme directamente sobre cualquier duda, autor, concepto griego o cuestión que quieras analizar.",
      ].join("\n\n"),
      meta: {
        themeBadge: "Crowley AI",
        authorsCited: [],
        conceptsUsed: [],
        followUpSuggestions: activeTheme.suggestedQuestions,
      },
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const submitQuery = async (rawQuery: string) => {
    const trimmed = rawQuery.trim();
    if (!trimmed) {
      setValidationError("Escribe una consulta antes de enviar.");
      return;
    }

    setValidationError(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/tutor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-8).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        role: "tutor",
        content: data.answer || "No recibí respuesta.",
        meta: {
          themeBadge: data.themeBadge || `Tema ${activeThemeId}`,
          authorsCited: data.authorsCited || [],
          conceptsUsed: data.conceptsUsed || [],
          followUpSuggestions: data.followUpSuggestions || [],
        },
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err: any) {
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        role: "tutor",
        content: `No pude conectar con el servidor: ${err.message}. Comprueba tu conexión.`,
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (externalQuery) {
      submitQuery(externalQuery);
      onClearExternalQuery();
    }
  }, [externalQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuery(inputValue);
  };

  const handleResetConversation = () => {
    setValidationError(null);
    setMessages((prev) => [prev[0]]);
  };

  const themeConcepts = GREEK_CONCEPTS.filter(
    (c) => c.themeId === activeThemeId
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Columna Principal: Chat */}
      <div className="lg:col-span-7 flex flex-col bg-[#1c1a29]/75 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        {/* Encabezado */}
        <div className="px-5 py-4 bg-[#242038]/85 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <CrowleyAvatar size="md" />
            <div>
              <div className="text-xs uppercase tracking-widest text-[#d8b4fe]">
                Tutora Oficial · {CROWLEY_NAME}
              </div>
              <h2 className="text-xl font-serif font-semibold text-[#f5f3ff] mt-0.5">
                {CROWLEY_NAME} — Diálogo Crítico: Pólis, Mythos y Lógos
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={handleResetConversation}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] text-xs font-medium text-[#e2dff0] bg-[#12111a]/70 border border-white/15 rounded-lg hover:border-[#c084fc] hover:text-[#d8b4fe] transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar charla
          </button>
        </div>

        {/* Selector de canal temático */}
        <div className="px-5 py-3.5 bg-[#161422]/90 border-b border-white/10">
          <div className="text-xs text-[#a59fc2] mb-2">
            Sintonizar canal de referencia:
          </div>
          <div
            role="tablist"
            className="flex items-center gap-2 overflow-x-auto pb-1"
          >
            {PHILOSOPHY_THEMES.map((theme) => {
              const isSelected = theme.id === activeThemeId;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => onSelectTheme(theme.id)}
                  className={`px-3.5 py-2.5 min-h-[44px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isSelected
                      ? "bg-[#c084fc] text-[#12111a] font-semibold"
                      : "bg-[#231f36] text-[#d8b4fe] hover:bg-[#2d2846] border border-white/10"
                  }`}
                >
                  Tema {theme.id}: {theme.shortTitle}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista de mensajes */}
        <div
          className="p-5 space-y-6 max-h-[580px] overflow-y-auto"
          aria-live="polite"
        >
          {messages.map((msg) => {
            if (msg.role === "user") {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[88%] sm:max-w-[80%] bg-[#2d2546] border border-[#c084fc]/40 text-[#f5f3ff] px-4 py-3.5 rounded-2xl">
                    <div className="text-[11px] uppercase tracking-wider text-[#d8b4fe] mb-1">
                      Tú
                    </div>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              );
            }

            const paragraphs = msg.content
              .split("\n")
              .filter((l) => l.trim().length > 0);

            return (
              <article
                key={msg.id}
                className="bg-[#161422]/90 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3.5"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                  <CrowleyAvatar size="sm" />
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#a59fc2]">
                    <span className="font-semibold text-[#f472b6]">
                      {CROWLEY_NAME}
                    </span>
                    {msg.meta?.themeBadge && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#c084fc]">
                          {msg.meta.themeBadge}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2.5 text-[15px] leading-relaxed text-[#ece9f8] max-w-prose">
                  {paragraphs.map((line, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {renderFormattedLine(line, idx)}
                    </p>
                  ))}
                </div>
              </article>
            );
          })}

          {isLoading && (
            <div className="bg-[#161422]/90 border border-[#c084fc]/30 rounded-2xl p-4 flex items-center gap-3 text-sm text-[#d8b4fe]">
              <CrowleyAvatar size="sm" />
              <span>{CROWLEY_NAME} está pensando...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleFormSubmit}
          className="p-4 bg-[#242038]/85 border-t border-white/10"
        >
          {validationError && (
            <p className="text-xs font-medium text-[#f472b6] mb-2">
              {validationError}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (validationError) setValidationError(null);
              }}
              placeholder="Hazle cualquier consulta o pregunta a Crowley..."
              className="flex-1 bg-[#12111a] border border-white/15 rounded-xl px-4 py-3 min-h-[44px] text-sm text-[#f5f3ff] placeholder:text-[#7c7599] focus:outline-none focus:border-[#c084fc]"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-[#12111a] bg-[#f472b6] hover:bg-[#f9a8d4] disabled:opacity-50 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <Send className="w-4 h-4" />
              Enviar
            </button>
          </div>
        </form>
      </div>

      {/* Columna Derecha: Contexto y conceptos sugeridos */}
      <aside className="lg:col-span-5 space-y-6">
        <div className="bg-[#1c1a29]/75 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="text-xs uppercase tracking-widest text-[#c084fc] font-semibold">
              {activeTheme.code} · Guía Activa
            </div>
            <button
              type="button"
              onClick={() => onOpenThemeMap(activeTheme.id)}
              className="inline-flex items-center gap-1 px-2 py-1.5 min-h-[44px] text-xs font-medium text-[#f472b6] hover:text-[#d8b4fe] underline underline-offset-4 whitespace-nowrap shrink-0"
            >
              Abrir mapa interactivo
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-semibold text-[#f5f3ff]">
              {activeTheme.fullTitle}
            </h3>
            <p className="text-sm text-[#c4bddb] mt-1 leading-relaxed">
              {activeTheme.subtitle}
            </p>
            <div className="text-xs text-[#a59fc2] mt-2">
              Autores base: {activeTheme.authors.join(" · ")}
            </div>
          </div>

          <div className="bg-[#12111a]/80 border border-[#c084fc]/25 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#f472b6]">
              <Compass className="w-3.5 h-3.5 text-[#f472b6]" />
              Eje Temático
            </div>
            <p className="text-xs sm:text-sm text-[#e2dff0] leading-relaxed">
              {activeTheme.polisLogosConnection}
            </p>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#a59fc2]">
              Conceptos de apoyo (haz clic para consultar)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {themeConcepts.map((concept) => (
                <button
                  key={concept.id}
                  type="button"
                  onClick={() =>
                    submitQuery(
                      `Crowley, háblame sobre ${concept.term} (${concept.greek}) en el contexto de ${concept.author}.`
                    )
                  }
                  className="text-left p-3.5 min-h-[48px] rounded-xl bg-[#161422]/90 hover:bg-[#252038] border border-white/10 hover:border-[#c084fc]/50 transition-colors group"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-serif italic font-semibold text-base text-[#d8b4fe] group-hover:text-[#f472b6]">
                      {concept.term}
                    </span>
                    <span className="text-xs text-[#a59fc2] font-serif">
                      {concept.greek}
                    </span>
                  </div>
                  <p className="text-xs text-[#c4bddb] mt-1 line-clamp-2">
                    {concept.translation}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
