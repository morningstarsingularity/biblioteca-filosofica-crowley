import { useState } from "react";
import {
  COURSE_METADATA,
} from "./data/philosophyData";
import { CROWLEY_NAME } from "./utils/tutorEngine";
import { TutorPanel } from "./components/TutorPanel";
import { ConceptMapExplorer } from "./components/ConceptMapExplorer";
import { LexiconAndAuthors } from "./components/LexiconAndAuthors";
import { SeminarQuiz } from "./components/SeminarQuiz";
import {
  CrowleyAvatar,
  OfflineIndicator,
  PWAInstallButton,
} from "./components/CrowleyAvatar";

type ActiveView = "tutor" | "maps" | "lexicon" | "seminar";

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>("tutor");
  const [activeThemeId, setActiveThemeId] = useState<number>(1);
  const [pendingTutorQuery, setPendingTutorQuery] = useState<string | null>(
    null
  );

  const handleAskTutorFromAnywhere = (query: string, themeId: number) => {
    setActiveThemeId(themeId);
    setPendingTutorQuery(query);
    setActiveView("tutor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenThemeMap = (themeId: number) => {
    setActiveThemeId(themeId);
    setActiveView("maps");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#12111a] text-[#f5f3ff]">
      {/* Top Bar Contract: 3 Zones separated by gap-8 */}
      <header className="flex items-center justify-between gap-3 sm:gap-8 px-4 sm:px-8 py-4 border-b border-white/10 bg-[#12111a]/90 backdrop-blur-md">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveView("tutor");
          }}
          className="text-base sm:text-xl font-serif font-bold tracking-tight text-[#f5f3ff] hover:text-[#d8b4fe] transition-colors whitespace-nowrap truncate"
        >
          Biblioteca Filosófica · {CROWLEY_NAME}
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#c4bddb]"
        >
          <button
            type="button"
            onClick={() => setActiveView("tutor")}
            className={`hover:text-[#f5f3ff] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeView === "tutor"
                ? "text-[#f5f3ff] underline decoration-[#f472b6] decoration-2 underline-offset-4"
                : ""
            }`}
          >
            Tutora {CROWLEY_NAME}
          </button>
          <button
            type="button"
            onClick={() => setActiveView("maps")}
            className={`hover:text-[#f5f3ff] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeView === "maps"
                ? "text-[#f5f3ff] underline decoration-[#f472b6] decoration-2 underline-offset-4"
                : ""
            }`}
          >
            Mapas Conceptuales
          </button>
          <button
            type="button"
            onClick={() => setActiveView("lexicon")}
            className={`hover:text-[#f5f3ff] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeView === "lexicon"
                ? "text-[#f5f3ff] underline decoration-[#f472b6] decoration-2 underline-offset-4"
                : ""
            }`}
          >
            Léxico y Autores
          </button>
          <button
            type="button"
            onClick={() => setActiveView("seminar")}
            className={`hover:text-[#f5f3ff] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeView === "seminar"
                ? "text-[#f5f3ff] underline decoration-[#f472b6] decoration-2 underline-offset-4"
                : ""
            }`}
          >
            Seminario Crítico
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() =>
              setActiveView(activeView === "maps" ? "tutor" : "maps")
            }
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 min-h-[44px] text-xs font-semibold text-[#12111a] bg-[#c084fc] rounded-xl hover:bg-[#d8b4fe] transition-colors whitespace-nowrap shrink-0"
          >
            {activeView === "maps" ? `Chat ${CROWLEY_NAME}` : "Abrir Mapas"}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Strip */}
      <nav
        aria-label="Navegación móvil"
        className="md:hidden grid grid-cols-4 gap-1.5 px-3 py-2 bg-[#1a1726]/95 border-b border-white/10"
      >
        <button
          type="button"
          onClick={() => setActiveView("tutor")}
          className={`px-2 py-2.5 min-h-[44px] text-xs font-medium rounded-lg text-center whitespace-nowrap truncate ${
            activeView === "tutor"
              ? "bg-[#c084fc] text-[#12111a] font-semibold"
              : "text-[#d8b4fe] hover:bg-white/5"
          }`}
        >
          {CROWLEY_NAME}
        </button>
        <button
          type="button"
          onClick={() => setActiveView("maps")}
          className={`px-2 py-2.5 min-h-[44px] text-xs font-medium rounded-lg text-center whitespace-nowrap truncate ${
            activeView === "maps"
              ? "bg-[#c084fc] text-[#12111a] font-semibold"
              : "text-[#d8b4fe] hover:bg-white/5"
          }`}
        >
          Mapas
        </button>
        <button
          type="button"
          onClick={() => setActiveView("lexicon")}
          className={`px-2 py-2.5 min-h-[44px] text-xs font-medium rounded-lg text-center whitespace-nowrap truncate ${
            activeView === "lexicon"
              ? "bg-[#c084fc] text-[#12111a] font-semibold"
              : "text-[#d8b4fe] hover:bg-white/5"
          }`}
        >
          Léxico
        </button>
        <button
          type="button"
          onClick={() => setActiveView("seminar")}
          className={`px-2 py-2.5 min-h-[44px] text-xs font-medium rounded-lg text-center whitespace-nowrap truncate ${
            activeView === "seminar"
              ? "bg-[#c084fc] text-[#12111a] font-semibold"
              : "text-[#d8b4fe] hover:bg-white/5"
          }`}
        >
          Seminario
        </button>
      </nav>

      {/* Editorial Hero with Crowley Mascot & PWA Install Controls */}
      <section className="border-b border-white/10 bg-[#181524]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-7 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 sm:gap-5 max-w-4xl">
              <CrowleyAvatar size="xl" className="hidden sm:flex" />
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-[#d8b4fe]">
                  {COURSE_METADATA.subjectLabel} · Estudiante:{" "}
                  {COURSE_METADATA.studentName} · No. Cuenta:{" "}
                  {COURSE_METADATA.accountNumber}
                </div>
                <h1
                  className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-semibold text-[#f5f3ff] leading-tight"
                  style={{ textWrap: "balance" }}
                >
                  {CROWLEY_NAME} — Guía de Filosofía Griega Arcaica y Clásica
                </h1>
                <p className="text-sm sm:text-base text-[#c4bddb] leading-relaxed max-w-3xl">
                  Del <em className="font-serif italic text-[#d8b4fe]">kósmos</em>{" "}
                  y la memoria poética oral a la{" "}
                  <em className="font-serif italic text-[#d8b4fe]">pólis</em>{" "}
                  democrática y la{" "}
                  <em className="font-serif italic text-[#d8b4fe]">logología</em>{" "}
                  sofística (Vernant, Pomeroy, Hadot, Havelock, Ong, Detienne,
                  Castoriadis, Romilly, Cassin, Châtelet y Loraux).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-center shrink-0">
              <PWAInstallButton />
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {activeView === "tutor" && (
          <TutorPanel
            activeThemeId={activeThemeId}
            onSelectTheme={setActiveThemeId}
            externalQuery={pendingTutorQuery}
            onClearExternalQuery={() => setPendingTutorQuery(null)}
            onOpenThemeMap={handleOpenThemeMap}
          />
        )}

        {activeView === "maps" && (
          <ConceptMapExplorer
            activeThemeId={activeThemeId}
            onSelectTheme={setActiveThemeId}
            onAskTutor={handleAskTutorFromAnywhere}
          />
        )}

        {activeView === "lexicon" && (
          <LexiconAndAuthors onAskTutor={handleAskTutorFromAnywhere} />
        )}

        {activeView === "seminar" && (
          <SeminarQuiz onAskTutor={handleAskTutorFromAnywhere} />
        )}
      </main>

      <OfflineIndicator />

      {/* Quiet Curatorial Footer */}
      <footer className="border-t border-white/10 bg-[#161422] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#a59fc2]">
          <div>
            <span className="font-semibold text-[#f5f3ff]">
              {COURSE_METADATA.courseTitle}
            </span>
            <span aria-hidden="true"> · </span>
            <span>
              Autoría: {COURSE_METADATA.studentName} (
              {COURSE_METADATA.accountNumber}) · Tutora: {CROWLEY_NAME}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveView("tutor")}
              className="hover:text-[#f472b6] underline underline-offset-4 py-1"
            >
              Tutora {CROWLEY_NAME}
            </button>
            <button
              type="button"
              onClick={() => setActiveView("maps")}
              className="hover:text-[#f472b6] underline underline-offset-4 py-1"
            >
              5 Mapas Conceptuales
            </button>
            <button
              type="button"
              onClick={() => setActiveView("lexicon")}
              className="hover:text-[#f472b6] underline underline-offset-4 py-1"
            >
              Léxico Griego
            </button>
            <button
              type="button"
              onClick={() => setActiveView("seminar")}
              className="hover:text-[#f472b6] underline underline-offset-4 py-1"
            >
              Seminario con {CROWLEY_NAME}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
