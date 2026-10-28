import React, { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, MessageSquare } from "lucide-react";
import {
  PHILOSOPHY_THEMES,
  SEMINAR_QUESTIONS,
} from "../data/philosophyData";
import {
  CROWLEY_NAME,
  evaluateQuizSubmission,
  getCrowleyQuizCommentary,
} from "../utils/tutorEngine";
import { CrowleyAvatar } from "./CrowleyAvatar";

interface SeminarQuizProps {
  onAskTutor: (query: string, themeId: number) => void;
}

export const SeminarQuiz: React.FC<SeminarQuizProps> = ({ onAskTutor }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [themeFilter, setThemeFilter] = useState<number | "all">("all");

  const stats = evaluateQuizSubmission(SEMINAR_QUESTIONS, selectedAnswers);

  const visibleQuestions = SEMINAR_QUESTIONS.filter(
    (q) => themeFilter === "all" || q.themeId === themeFilter
  );

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
  };

  return (
    <div className="space-y-8">
      {/* Top Summary & Crowley Guide Banner */}
      <div className="bg-[#1c1a29]/75 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3.5">
            <CrowleyAvatar size="md" />
            <div>
              <div className="text-xs uppercase tracking-widest text-[#f472b6]">
                Seminario Socrático Guiado por {CROWLEY_NAME} · 10 Reactivos
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#f5f3ff] mt-0.5">
                Comprobación Dialéctica con {CROWLEY_NAME}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetQuiz}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] text-xs font-medium text-[#e2dff0] bg-[#12111a] border border-white/15 rounded-xl hover:border-[#c084fc] self-start whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar evaluación
          </button>
        </div>

        {/* Tabular Score Breakdown across 5 Themes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#12111a]/80 border border-white/10 rounded-xl p-4">
          <div>
            <div className="text-xs text-[#a59fc2]">Reactivos respondidos</div>
            <div className="text-2xl font-mono font-semibold text-[#f5f3ff] tabular-nums mt-0.5">
              {stats.answeredCount} / {stats.totalQuestions}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#a59fc2]">Aciertos verificados</div>
            <div className="text-2xl font-mono font-semibold text-[#c084fc] tabular-nums mt-0.5">
              {stats.correctCount}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#a59fc2]">Dominio global</div>
            <div className="text-2xl font-mono font-semibold text-[#f472b6] tabular-nums mt-0.5">
              {stats.percentage}%
            </div>
          </div>
          <div>
            <div className="text-xs text-[#a59fc2]">
              Veredicto de {CROWLEY_NAME}
            </div>
            <div className="text-xs sm:text-sm font-medium text-[#d8b4fe] mt-1">
              {stats.answeredCount === 0
                ? "«Elige una respuesta y veamos si evitas la doxa...»"
                : stats.percentage >= 80
                ? "«¡Digno de un maestro de Alétheia!»"
                : "«En proceso de salir de la caverna...»"}
            </div>
          </div>
        </div>

        {/* Filter by Theme (min-h-[44px]) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setThemeFilter("all")}
            className={`px-3.5 py-2 min-h-[44px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              themeFilter === "all"
                ? "bg-[#c084fc] text-[#12111a] font-semibold"
                : "bg-[#231f36] text-[#d8b4fe] hover:bg-[#2d2846] border border-white/10"
            }`}
          >
            Todos los temas (10)
          </button>
          {PHILOSOPHY_THEMES.map((t) => {
            const themeScore = stats.byTheme[t.id] || { total: 2, correct: 0 };
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeFilter(t.id)}
                className={`px-3.5 py-2 min-h-[44px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                  themeFilter === t.id
                    ? "bg-[#c084fc] text-[#12111a] font-semibold"
                    : "bg-[#231f36] text-[#d8b4fe] hover:bg-[#2d2846] border border-white/10"
                }`}
              >
                Tema {t.id} ({themeScore.correct}/{themeScore.total})
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {visibleQuestions.map((q, index) => {
          const chosenIndex = selectedAnswers[q.id];
          const isAnswered = typeof chosenIndex === "number";
          const isCorrect = isAnswered && chosenIndex === q.correctIndex;
          const crowleyComment = isAnswered
            ? getCrowleyQuizCommentary(isCorrect, q.themeId, q.contextConcept)
            : "";

          return (
            <article
              key={q.id}
              className="bg-[#1c1a29]/75 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg"
            >
              {/* Unboxed Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#a59fc2] border-b border-white/10 pb-2.5">
                <div className="flex flex-wrap items-center gap-x-2">
                  <span className="font-mono font-semibold text-[#c084fc] tabular-nums">
                    REACTIVO 0{index + 1} · TEMA 0{q.themeId}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-serif italic text-[#f472b6]">
                    Conceptos: {q.contextConcept}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{q.citation}</span>
                </div>

                {isAnswered && (
                  <span
                    className={`inline-flex items-center gap-1 font-semibold ${
                      isCorrect ? "text-[#c084fc]" : "text-[#f472b6]"
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Acierto Verificado por {CROWLEY_NAME}
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        Revisión Sugerida por {CROWLEY_NAME}
                      </>
                    )}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-serif font-semibold text-[#f5f3ff] leading-snug">
                {q.question}
              </h3>

              {/* Options (min-h-[44px]) */}
              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = chosenIndex === optIdx;
                  const isThisCorrectOption = optIdx === q.correctIndex;

                  let buttonStyle =
                    "bg-[#14121f]/90 border-white/10 text-[#e2dff0] hover:bg-[#231f36] hover:border-[#c084fc]/40";
                  if (isAnswered) {
                    if (isThisCorrectOption) {
                      buttonStyle =
                        "bg-[#281e42] border-[#c084fc] text-[#f5f3ff] font-medium";
                    } else if (isThisSelected && !isThisCorrectOption) {
                      buttonStyle =
                        "bg-[#36192e] border-[#f472b6] text-[#fce7f3]";
                    } else {
                      buttonStyle =
                        "bg-[#12111a]/60 border-white/5 text-[#7c7599] opacity-75";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-4 min-h-[48px] rounded-xl border text-sm leading-relaxed transition-colors flex items-start gap-3 ${buttonStyle}`}
                    >
                      <span className="font-mono text-xs font-semibold text-[#c084fc] mt-0.5 shrink-0">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Crowley Commentary & Bibliographic Justification Box */}
              {isAnswered && (
                <div className="bg-[#12111a]/90 border border-[#c084fc]/35 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <CrowleyAvatar size="sm" />
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#f472b6]">
                          Comentario de {CROWLEY_NAME} ({q.citation})
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onAskTutor(
                              `Crowley, profundiza en la pregunta del seminario: «${q.question}» y su relación con ${q.contextConcept} (${q.citation}).`,
                              q.themeId
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] text-xs font-medium text-[#d8b4fe] hover:text-[#f472b6] underline underline-offset-4 whitespace-nowrap shrink-0"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Debatir con {CROWLEY_NAME}
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-[#d8b4fe] italic">
                        «{crowleyComment}»
                      </p>
                      <p className="text-xs sm:text-sm text-[#e2dff0] leading-relaxed pt-1">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
