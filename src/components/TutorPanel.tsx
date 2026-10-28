import React, { useState, useRef, useEffect } from "react";
import { Send, RotateCcw, Sparkles } from "lucide-react";
import {
  CROWLEY_NAME,
  generateAcademicSynthesis,
  TutorResponsePayload,
} from "../utils/tutorEngine";
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
  activeThemeId?: number;
  onSelectTheme?: (themeId: number) => void;
  externalQuery: string | null;
  onClearExternalQuery: () => void;
  onOpenThemeMap?: (themeId: number) => void;
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
  activeThemeId = 1,
  externalQuery,
  onClearExternalQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome-msg",
      role: "tutor",
      content: [
        "**Hola, soy Crowley, tu tutora filosófica.**",
        "Estoy lista para analizar y debatir cualquier cuestión de nuestro programa: desde la transición del *mŷthos* al *lógos*, el estatuto de la verdad en Detienne, la oralidad y la paideía platónica en Havelock, hasta la autoinstitución de la pólis con Castoriadis o la logología sofística en Cassin.",
        "Puedes preguntarme sobre cualquier autor, pasaje o concepto griego sin necesidad de restringirte a un tema fijo. ¿Por dónde empezamos hoy?",
      ].join("\n\n"),
      meta: {
        themeBadge: "Diálogo Abierto · Filosofía Griega",
        authorsCited: ["Vernant", "Detienne", "Havelock", "Castoriadis", "Cassin"],
        conceptsUsed: ["mŷthos", "lógos", "alétheia", "isonomía"],
        followUpSuggestions: [
          "¿Cómo se relaciona la verdad mágica de Detienne con la verdad política del ágora?",
          "Explícame la crítica de Havelock a la mímesis y la poesía homérica.",
          "¿Qué significa la autoinstitución de la sociedad según Castoriadis?",
        ],
      },
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const submitQuery = async (rawQuery: string) => {
    const trimmed = rawQuery.trim();
    if (!trimmed) {
      setValidationError("Escribe una consulta o concepto antes de enviar.");
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
          activeThemeId,
          history: messages.slice(-8).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.status}`);
      }

      const data: TutorResponsePayload = await response.json();
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        role: "tutor",
        content: data.answer,
        meta: {
          themeBadge: data.themeBadge,
          authorsCited: data.authorsCited || [],
          conceptsUsed: data.conceptsUsed || [],
          polisLogosSynthesis: data.polisLogosSynthesis || "",
          followUpSuggestions: data.followUpSuggestions || [],
        },
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } catch (_err) {
      const fallback = generateAcademicSynthesis(trimmed, activeThemeId);
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        role: "tutor",
        content: fallback.answer,
        meta: {
          themeBadge: fallback.themeBadge,
          authorsCited: fallback.authorsCited,
          conceptsUsed: fallback.conceptsUsed,
          polisLogosSynthesis: fallback.polisLogosSynthesis,
          followUpSuggestions: fallback.followUpSuggestions,
        },
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

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col bg-[#1c1a29]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Barra superior de Crowley */}
      <div className="px-5 py-4 bg-[#242038]/90 border-b border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <CrowleyAvatar size="md" />
          <div>
            <div className="text-xs uppercase tracking-widest text-[#d8b4fe] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#f472b6]" />
              {CROWLEY_NAME} · Tutora con IA
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-semibold text-[#f5f3ff] mt-0.5">
              Diálogo Abierto: Pólis, Mythos y Lógos
            </h2>
          </div>
        </div>
        <button
          type="button"
          onClick={handleResetConversation}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#e2dff0] bg-[#12111a]/70 border border-white/15 rounded-lg hover:border-[#c084fc] hover:text-[#d8b4fe] transition-colors whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Nueva charla
        </button>
      </div>

      {/* Flujo de mensajes del chat */}
      <div
        className="p-4 sm:p-6 space-y-6 max-h-[620px] overflow-y-auto"
        aria-live="polite"
      >
        {messages.map((msg) => {
          if (msg.role === "user") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] sm:max-w-[75%] bg-[#2d2546] border border-[#c084fc]/40 text-[#f5f3ff] px-4 py-3 rounded-2xl shadow">
                  <div className="text-[11px] uppercase tracking-wider text-[#d8b4fe] mb-1 font-medium">
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
              className="bg-[#161422]/90 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-sm"
            >
              {/* Encabezado del mensaje */}
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
                  {msg.meta?.authorsCited && msg.meta.authorsCited.length > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Autores: {msg.meta.authorsCited.join(", ")}</span>
                    </>
                  )}
                  {msg.meta?.conceptsUsed && msg.meta.conceptsUsed.length > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-serif italic text-[#d8b4fe]">
                        Conceptos: {msg.meta.conceptsUsed.join(", ")}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Texto de la respuesta */}
              <div className="space-y-2.5 text-[15px] leading-relaxed text-[#ece9f8]">
                {paragraphs.map((line, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {renderFormattedLine(line, idx)}
                  </p>
                ))}
              </div>

              {/* Sugerencias de seguimiento */}
              {msg.meta?.followUpSuggestions &&
                msg.meta.followUpSuggestions.length > 0 && (
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-xs font-medium text-[#a59fc2] mb-2">
                      Preguntas sugeridas:
                    </div>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                      {msg.meta.followUpSuggestions.map((q, qIdx) => (
                        <button
                          key={qIdx}
                          type="button"
                          onClick={() => submitQuery(q)}
                          className="text-left text-xs text-[#e2dff0] bg-[#231f36] hover:bg-[#2e2947] border border-white/10 hover:border-[#c084fc]/50 px-3.5 py-2 rounded-lg transition-colors leading-snug"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </article>
          );
        })}

        {isLoading && (
          <div className="bg-[#161422]/90 border border-[#c084fc]/30 rounded-2xl p-4 flex items-center gap-3 text-sm text-[#d8b4fe]">
            <CrowleyAvatar size="sm" />
            <span>{CROWLEY_NAME} está formulando su respuesta crítica...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Formulario de entrada */}
      <form
        onSubmit={handleFormSubmit}
        className="p-4 bg-[#242038]/90 border-t border-white/10"
        noValidate
      >
        {validationError && (
          <p role="alert" className="text-xs font-medium text-[#f472b6] mb-2">
            {validationError}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            id="tutor-question-input"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder="Hazle cualquier consulta filosófica a Crowley..."
            className="flex-1 bg-[#12111a] border border-white/15 rounded-xl px-4 py-3 min-h-[44px] text-sm text-[#f5f3ff] placeholder:text-[#7c7599] focus:outline-none focus:border-[#c084fc]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-[#12111a] bg-[#f472b6] hover:bg-[#f9a8d4] disabled:opacity-50 rounded-xl transition-colors whitespace-nowrap"
          >
            <Send className="w-4 h-4" />
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
