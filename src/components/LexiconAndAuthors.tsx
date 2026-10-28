import React, { useState } from "react";
import { Search, MessageSquare, Users, BookOpen, X } from "lucide-react";
import {
  AUTHORS,
  GREEK_CONCEPTS,
  PHILOSOPHY_THEMES,
} from "../data/philosophyData";
import {
  CROWLEY_NAME,
  filterLexicon,
  normalizeText,
} from "../utils/tutorEngine";

interface LexiconAndAuthorsProps {
  onAskTutor: (query: string, themeId: number) => void;
}

export const LexiconAndAuthors: React.FC<LexiconAndAuthorsProps> = ({
  onAskTutor,
}) => {
  const [activeTab, setActiveTab] = useState<"lexicon" | "authors">("lexicon");
  const [searchQuery, setSearchQuery] = useState("");
  const [themeFilter, setThemeFilter] = useState<number | "all">("all");

  const filteredConcepts = filterLexicon(
    GREEK_CONCEPTS,
    searchQuery,
    themeFilter
  );

  const filteredAuthors = AUTHORS.filter((a) => {
    const matchesTheme =
      themeFilter === "all" || a.themes.includes(themeFilter);
    if (!matchesTheme) return false;
    const norm = normalizeText(searchQuery);
    if (!norm) return true;
    const searchable = normalizeText(
      `${a.name} ${a.work} ${a.coreThesis} ${a.polisLogosProblem} ${a.keyConcepts.join(" ")}`
    );
    return searchable.includes(norm);
  });

  return (
    <div className="space-y-8">
      {/* Header & Search Controls */}
      <div className="bg-[#1c1a29]/75 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#d8b4fe]">
              Glosario de {CROWLEY_NAME} · 24 Conceptos Griegos y 11 Autores de
              Referencia
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#f5f3ff] mt-1">
              Léxico Filosófico Griego y Red de Autores
            </h2>
          </div>

          {/* Segmented Switcher (min-h-[44px]) */}
          <div
            role="tablist"
            aria-label="Seleccionar entre Léxico Griego y Autores"
            className="flex items-center gap-1.5 p-1.5 bg-[#12111a]/90 border border-white/10 rounded-xl self-start"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "lexicon"}
              onClick={() => setActiveTab("lexicon")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === "lexicon"
                  ? "bg-[#c084fc] text-[#12111a] font-semibold"
                  : "text-[#d8b4fe] hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Léxico Griego ({filteredConcepts.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "authors"}
              onClick={() => setActiveTab("authors")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeTab === "authors"
                  ? "bg-[#f472b6] text-[#12111a] font-semibold"
                  : "text-[#d8b4fe] hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Autores ({filteredAuthors.length})
            </button>
          </div>
        </div>

        {/* Search Input + Theme Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div className="relative flex-1">
            <label htmlFor="lexicon-search-input" className="sr-only">
              Buscar concepto griego, autor o problema filosófico
            </label>
            <Search className="w-4 h-4 text-[#a59fc2] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="lexicon-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por término (ej. kósmos, Alétheia, isonomía, logología) o autor..."
              className="w-full pl-10 pr-11 py-3 min-h-[44px] text-sm bg-[#12111a] border border-white/15 rounded-xl text-[#f5f3ff] placeholder:text-[#7c7599] focus:outline-none focus:border-[#c084fc]"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Limpiar búsqueda"
                onClick={() => setSearchQuery("")}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#a59fc2] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label="Filtrar por tema"
            className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0"
          >
            <button
              type="button"
              onClick={() => setThemeFilter("all")}
              className={`px-3.5 py-2 min-h-[44px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                themeFilter === "all"
                  ? "bg-[#c084fc] text-[#12111a] font-semibold"
                  : "bg-[#231f36] text-[#d8b4fe] hover:bg-[#2d2846] border border-white/10"
              }`}
            >
              Todos los temas
            </button>
            {PHILOSOPHY_THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeFilter(t.id)}
                className={`px-3.5 py-2 min-h-[44px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  themeFilter === t.id
                    ? "bg-[#c084fc] text-[#12111a] font-semibold"
                    : "bg-[#231f36] text-[#d8b4fe] hover:bg-[#2d2846] border border-white/10"
                }`}
              >
                Tema {t.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab 1: Greek Lexicon Grid */}
      {activeTab === "lexicon" && (
        <div>
          {filteredConcepts.length === 0 ? (
            <div className="bg-[#1c1a29]/75 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center space-y-3">
              <p className="text-base text-[#e2dff0]">
                No se encontraron conceptos que coincidan con «{searchQuery}».
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setThemeFilter("all");
                }}
                className="px-4 py-2.5 min-h-[44px] text-xs font-semibold text-[#12111a] bg-[#c084fc] rounded-lg"
              >
                Mostrar los 24 conceptos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredConcepts.map((concept) => (
                <article
                  key={concept.id}
                  className="bg-[#1c1a29]/75 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-lg"
                >
                  <div className="space-y-3">
                    {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
                    <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#a59fc2]">
                      <span className="font-semibold text-[#f472b6] font-mono tabular-nums">
                        TEMA 0{concept.themeId}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{concept.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{concept.citation}</span>
                    </div>

                    {/* Term & Greek Script */}
                    <div>
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-2xl font-serif italic font-semibold text-[#f5f3ff]">
                          {concept.term}
                        </h3>
                        <span className="text-lg font-serif text-[#c084fc]">
                          {concept.greek}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-[#d8b4fe] mt-0.5">
                        Traducción conceptual: {concept.translation}
                      </div>
                    </div>

                    {/* Definition */}
                    <p className="text-sm text-[#e2dff0] leading-relaxed">
                      {concept.definition}
                    </p>

                    {/* Polis & Logos Relation */}
                    <div className="pt-3 border-t border-white/10">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#f472b6] mb-1">
                        Vínculo con la Pólis y el Lógos
                      </div>
                      <p className="text-xs sm:text-sm text-[#c4bddb] leading-relaxed">
                        {concept.polisLogosRelation}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        onAskTutor(
                          `Crowley, explícame en detalle el concepto de ${concept.term} (${concept.greek}) en el Tema ${concept.themeId} (${concept.author}) y cómo se vincula con los problemas de la pólis y el lógos.`,
                          concept.themeId
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] text-xs font-medium text-[#f5f3ff] bg-[#12111a] hover:bg-[#28223d] border border-[#c084fc]/40 rounded-xl transition-colors whitespace-nowrap shrink-0"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#f472b6]" />
                      Consultar «{concept.term}» con {CROWLEY_NAME}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Authors Grid */}
      {activeTab === "authors" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredAuthors.map((author) => (
            <article
              key={author.id}
              className="bg-[#1c1a29]/75 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-2 text-xs text-[#a59fc2]">
                  <span className="font-semibold text-[#f472b6] font-mono tabular-nums">
                    {author.themes.map((t) => `TEMA 0${t}`).join(" / ")}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="italic font-serif text-[#d8b4fe]">
                    {author.work}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-semibold text-[#f5f3ff]">
                  {author.name}
                </h3>

                <div className="space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#c084fc]">
                    Tesis Central
                  </div>
                  <p className="text-sm text-[#e2dff0] leading-relaxed">
                    {author.coreThesis}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#f472b6]">
                    Aporte al Problema de la Pólis y el Lógos
                  </div>
                  <p className="text-xs sm:text-sm text-[#c4bddb] leading-relaxed">
                    {author.polisLogosProblem}
                  </p>
                </div>

                <div className="text-xs text-[#a59fc2] pt-1">
                  <span className="font-semibold text-[#d8b4fe]">
                    Conceptos asociados:{" "}
                  </span>
                  <span className="font-serif italic text-[#f5f3ff]">
                    {author.keyConcepts.join(" · ")}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    onAskTutor(
                      `Crowley, ¿cuál es la tesis central de ${author.name} en el Tema ${author.themes.join(" y ")} y cómo problematiza la relación entre mito, pólis y lógos?`,
                      author.themes[0]
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] text-xs font-semibold text-[#12111a] bg-[#c084fc] hover:bg-[#d8b4fe] rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Dialogar con {CROWLEY_NAME} sobre {author.name}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
