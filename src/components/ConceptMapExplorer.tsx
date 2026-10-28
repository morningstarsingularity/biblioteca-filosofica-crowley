import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Network,
  Layers,
  Maximize2,
  ArrowLeft,
  X,
} from "lucide-react";
import {
  COURSE_METADATA,
  PHILOSOPHY_THEMES,
  PhilosophyTheme,
} from "../data/philosophyData";
import {
  INDEX_MARKMAP_TREE,
  MARKMAP_PASTEL_GOTH_PALETTE,
  MarkmapNode,
  THEME_MARKMAP_TREES,
} from "../data/markmapTrees";
import { CROWLEY_NAME } from "../utils/tutorEngine";
import { CrowleyAvatar } from "./CrowleyAvatar";

interface MarkmapInstance {
  setData: (data: MarkmapNode, opts?: unknown) => Promise<void> | void;
  fit: () => Promise<void> | void;
  destroy?: () => void;
}

declare global {
  interface Window {
    markmap?: {
      Markmap: {
        create: (
          svg: SVGSVGElement,
          opts?: unknown,
          data?: MarkmapNode
        ) => MarkmapInstance;
      };
      deriveOptions?: (opts: {
        color?: string[];
        maxWidth?: number;
      }) => unknown;
    };
  }
}

interface ConceptMapExplorerProps {
  activeThemeId: number;
  onSelectTheme: (themeId: number) => void;
  onAskTutor: (query: string, themeId: number) => void;
}

function cloneTree(node: MarkmapNode): MarkmapNode {
  return JSON.parse(JSON.stringify(node));
}

export const ConceptMapExplorer: React.FC<ConceptMapExplorerProps> = ({
  activeThemeId,
  onSelectTheme,
  onAskTutor,
}) => {
  // Default to the dynamic Markmap interactive canvas so touch-action: none, mm.setData(), and mm.fit() are immediately active
  const [viewMode, setViewMode] = useState<"markmap" | "structured">("markmap");
  // Track whether Markmap is showing the root Index ("index") or a specific Theme (1..5)
  const [isShowingIndex, setIsShowingIndex] = useState<boolean>(false);
  const [showCrowleyHelper, setShowCrowleyHelper] = useState<boolean>(false);
  const [fitStatusText, setFitStatusText] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const mmInstanceRef = useRef<MarkmapInstance | null>(null);

  const [expandedSubNodes, setExpandedSubNodes] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    for (const t of PHILOSOPHY_THEMES) {
      for (const s of t.sections) {
        for (const sub of s.subNodes) {
          initial[sub.id] = true;
        }
      }
    }
    return initial;
  });

  const currentTheme: PhilosophyTheme =
    PHILOSOPHY_THEMES.find((t) => t.id === activeThemeId) ||
    PHILOSOPHY_THEMES[0];

  const getActiveTreeData = useCallback((): MarkmapNode => {
    if (isShowingIndex) {
      return cloneTree(INDEX_MARKMAP_TREE);
    }
    return cloneTree(THEME_MARKMAP_TREES[activeThemeId] || THEME_MARKMAP_TREES[1]);
  }, [isShowingIndex, activeThemeId]);

  // Initialize or update the single Markmap instance dynamically via mm.setData()
  useEffect(() => {
    if (viewMode !== "markmap" || !svgRef.current) return;

    const treeData = getActiveTreeData();
    const mmLib = window.markmap;

    if (mmLib && mmLib.Markmap) {
      if (!mmInstanceRef.current) {
        const options = mmLib.deriveOptions
          ? mmLib.deriveOptions({
              color: MARKMAP_PASTEL_GOTH_PALETTE,
              maxWidth: 300,
            })
          : undefined;
        mmInstanceRef.current = mmLib.Markmap.create(
          svgRef.current,
          options,
          treeData
        );
      } else {
        // Dynamic update on the SAME Markmap instance without page reload or white flash
        Promise.resolve(mmInstanceRef.current.setData(treeData)).then(() => {
          mmInstanceRef.current?.fit();
        });
      }
    }
  }, [viewMode, getActiveTreeData]);

  // Destroy instance only when switching away from Markmap view or unmounting
  useEffect(() => {
    if (viewMode !== "markmap" && mmInstanceRef.current) {
      mmInstanceRef.current = null;
    }
  }, [viewMode]);

  // Intercept clicks on Index Markmap links (data-theme-id) to switch dynamically via mm.setData()
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a[data-theme-id]") as HTMLAnchorElement | null;
    if (anchor) {
      e.preventDefault();
      const tid = Number(anchor.getAttribute("data-theme-id"));
      if (tid >= 1 && tid <= 5) {
        setIsShowingIndex(false);
        onSelectTheme(tid);
      }
    }
  };

  // Ergonomic thumb button 1: Center map via mm.fit()
  const handleCenterMap = () => {
    if (mmInstanceRef.current) {
      mmInstanceRef.current.fit();
    }
    setFitStatusText("Mapa centrado");
    window.setTimeout(() => setFitStatusText(null), 1500);
  };

  // Ergonomic thumb button 2: Return to Index dynamically via mm.setData()
  const handleReturnToIndex = () => {
    setIsShowingIndex(true);
    setViewMode("markmap");
  };

  const handleSelectThemeDynamic = (themeId: number) => {
    setIsShowingIndex(false);
    onSelectTheme(themeId);
  };

  const toggleSubNode = (id: string) => {
    setExpandedSubNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAllInTheme = (expand: boolean) => {
    const updates: Record<string, boolean> = {};
    for (const s of currentTheme.sections) {
      for (const sub of s.subNodes) {
        updates[sub.id] = expand;
      }
    }
    setExpandedSubNodes((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-8 relative pb-20">
      {/* Top Control & Theme Switcher */}
      <div className="bg-[#1c1a29]/75 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#d8b4fe]">
              {COURSE_METADATA.subjectLabel} · Estudiante:{" "}
              {COURSE_METADATA.studentName} · Cuenta{" "}
              {COURSE_METADATA.accountNumber}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-[#f5f3ff] mt-1">
              Mapas Conceptuales Interactivos (Gama Pastel Goth)
            </h2>
          </div>

          {/* Mode Selector (min-h-[44px] touch hitboxes) */}
          <div
            role="group"
            aria-label="Modo de visualización del mapa"
            className="flex items-center gap-1.5 p-1.5 bg-[#12111a]/90 border border-white/10 rounded-xl self-start overflow-x-auto max-w-full"
          >
            <button
              type="button"
              onClick={() => {
                setViewMode("markmap");
                setIsShowingIndex(false);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                viewMode === "markmap" && !isShowingIndex
                  ? "bg-[#c084fc] text-[#12111a] font-semibold"
                  : "text-[#d8b4fe] hover:text-white"
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Markmap Dinámico
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("markmap");
                setIsShowingIndex(true);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                viewMode === "markmap" && isShowingIndex
                  ? "bg-[#f472b6] text-[#12111a] font-semibold"
                  : "text-[#d8b4fe] hover:text-white"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Índice Raíz
            </button>
            <button
              type="button"
              onClick={() => setViewMode("structured")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                viewMode === "structured"
                  ? "bg-[#c084fc] text-[#12111a] font-semibold"
                  : "text-[#d8b4fe] hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Árbol Analítico
            </button>
          </div>
        </div>

        {/* 5 Themes Dynamic Selector Strip (uses mm.setData() without page reload) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PHILOSOPHY_THEMES.map((theme) => {
            const isSelected =
              theme.id === activeThemeId &&
              !(viewMode === "markmap" && isShowingIndex);
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelectThemeDynamic(theme.id)}
                className={`text-left p-4 min-h-[64px] rounded-xl border transition-colors ${
                  isSelected
                    ? "bg-[#2b2345] text-[#f5f3ff] border-[#c084fc] shadow-md"
                    : "bg-[#14121f]/80 text-[#d8b4fe] border-white/10 hover:bg-[#211d33] hover:border-[#c084fc]/40"
                }`}
              >
                <div
                  className={`text-[11px] uppercase tracking-widest font-mono tabular-nums ${
                    isSelected ? "text-[#f472b6]" : "text-[#c084fc]"
                  }`}
                >
                  {theme.code}
                </div>
                <div className="font-serif font-semibold text-lg leading-snug mt-0.5 text-[#f5f3ff]">
                  {theme.shortTitle}
                </div>
                <div className="text-xs mt-1.5 truncate text-[#a59fc2]">
                  {theme.authors.join(", ")}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* View Mode 1: Dynamic Single-Instance Markmap SVG with touch-action: none */}
      {viewMode === "markmap" && (
        <div className="bg-[#1c1a29]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-5 py-4 bg-[#242038]/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#f472b6] font-semibold">
                {isShowingIndex
                  ? "ÍNDICE GENERAL · Toca un tema para transición sin recarga (mm.setData)"
                  : `MAPA INTERACTIVO DINÁMICO · ${currentTheme.code} · Pinch-to-Zoom Activo`}
              </div>
              <h3 className="text-xl font-serif font-semibold text-[#f5f3ff] mt-0.5">
                {isShowingIndex
                  ? COURSE_METADATA.courseTitle
                  : currentTheme.fullTitle}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {fitStatusText && (
                <span className="text-xs text-[#d8b4fe] font-mono">
                  {fitStatusText}
                </span>
              )}
              <button
                type="button"
                onClick={handleCenterMap}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] text-xs font-medium text-[#f5f3ff] bg-[#12111a] border border-[#c084fc]/40 rounded-lg hover:border-[#c084fc] whitespace-nowrap shrink-0"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#c084fc]" />
                Centrar mapa (mm.fit)
              </button>
              {!isShowingIndex && (
                <button
                  type="button"
                  onClick={handleReturnToIndex}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] text-xs font-medium text-[#12111a] bg-[#d8b4fe] hover:bg-[#c084fc] rounded-lg whitespace-nowrap shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Volver al Índice
                </button>
              )}
            </div>
          </div>

          {/* SVG Container with touch-action: none */}
          <div className="relative w-full h-[540px] sm:h-[600px] bg-[#12111a]">
            <svg
              ref={svgRef}
              id="mindmap"
              data-testid="crowley-markmap-svg"
              onClick={handleSvgClick}
              style={{ touchAction: "none" }}
              className="crowley-mindmap w-full h-full block"
              aria-label={
                isShowingIndex
                  ? "Mapa conceptual del Índice General"
                  : `Mapa conceptual interactivo de ${currentTheme.fullTitle}`
              }
            />
          </div>
        </div>
      )}

      {/* View Mode 2: Structured Analytical Tree */}
      {viewMode === "structured" && (
        <div className="space-y-6">
          <div className="bg-[#1c1a29]/75 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div className="space-y-1.5">
                <div className="text-xs uppercase tracking-widest text-[#f472b6] font-semibold">
                  {currentTheme.code} · Autores:{" "}
                  {currentTheme.authors.join(" · ")}
                </div>
                <h3 className="text-3xl font-serif font-semibold text-[#f5f3ff]">
                  {currentTheme.fullTitle}
                </h3>
                <p className="text-sm text-[#c4bddb] max-w-3xl leading-relaxed">
                  {currentTheme.subtitle}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => expandAllInTheme(true)}
                  className="px-3.5 py-2 min-h-[44px] text-xs font-medium text-[#e2dff0] bg-[#12111a] border border-white/15 rounded-lg hover:border-[#c084fc] whitespace-nowrap shrink-0"
                >
                  Expandir nodos
                </button>
                <button
                  type="button"
                  onClick={() => expandAllInTheme(false)}
                  className="px-3.5 py-2 min-h-[44px] text-xs font-medium text-[#e2dff0] bg-[#12111a] border border-white/15 rounded-lg hover:border-[#c084fc] whitespace-nowrap shrink-0"
                >
                  Contraer nodos
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onAskTutor(
                      `Crowley, explícame de manera integral el ${currentTheme.fullTitle} y cómo articula sus conceptos clave con la pólis y el lógos.`,
                      currentTheme.id
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] text-xs font-semibold text-[#12111a] bg-[#f472b6] hover:bg-[#f9a8d4] rounded-lg whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Analizar con {CROWLEY_NAME}
                </button>
              </div>
            </div>

            {/* Two-Column Synthesis: Nexus & Polis/Logos Axis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#12111a]/80 border border-white/10 rounded-xl p-4 space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#d8b4fe]">
                  {currentTheme.nexusWithPrevious.title}
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#e2dff0] leading-relaxed">
                  {currentTheme.nexusWithPrevious.points.map((pt, i) => (
                    <li key={i}>• {pt}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#231f36]/80 border border-[#c084fc]/30 rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#f472b6]">
                    Articulación Crítica con la Pólis y el Lógos
                  </div>
                  <p className="text-xs sm:text-sm text-[#f5f3ff] leading-relaxed">
                    {currentTheme.polisLogosConnection}
                  </p>
                </div>
                <div className="text-xs text-[#c4bddb] pt-2 border-t border-white/10">
                  <span className="font-semibold text-[#d8b4fe]">
                    Vocabulario rector:{" "}
                  </span>
                  <span className="font-serif italic">
                    {currentTheme.keyConcepts.join(" · ")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sections & Sub-Nodes Tree (min-h-[44px] touch hitboxes) */}
          <div className="space-y-6">
            {currentTheme.sections.map((section) => (
              <section
                key={section.id}
                className="bg-[#1c1a29]/75 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
              >
                <div className="px-6 py-4 bg-[#242038]/85 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-[#d8b4fe] font-mono tabular-nums">
                      SECCIÓN {section.number} · {section.author} (
                      {section.workYear})
                    </div>
                    <h4 className="text-xl font-serif font-semibold text-[#f5f3ff] mt-0.5">
                      {section.title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onAskTutor(
                        `Crowley, explica la sección «${section.title}» de ${section.author} (${section.workYear}) en el Tema ${currentTheme.id}.`,
                        currentTheme.id
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[44px] text-xs font-medium text-[#f5f3ff] bg-[#12111a] border border-[#c084fc]/40 rounded-lg hover:border-[#c084fc] self-start sm:self-auto whitespace-nowrap shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#f472b6]" />
                    Consultar a {CROWLEY_NAME}
                  </button>
                </div>

                <div className="divide-y divide-white/10">
                  {section.subNodes.map((sub) => {
                    const isOpen = Boolean(expandedSubNodes[sub.id]);
                    return (
                      <div key={sub.id} className="p-5 sm:px-6">
                        <div className="flex items-start justify-between gap-4">
                          <button
                            type="button"
                            onClick={() => toggleSubNode(sub.id)}
                            aria-expanded={isOpen}
                            className="flex items-start gap-3 text-left group flex-1 min-h-[44px] py-1"
                          >
                            <span className="mt-0.5 w-7 h-7 rounded-md bg-[#12111a] border border-white/10 flex items-center justify-center text-[#c084fc] group-hover:text-[#f472b6] shrink-0">
                              {isOpen ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </span>
                            <div>
                              <h5 className="text-base font-semibold text-[#f5f3ff] group-hover:text-[#d8b4fe] transition-colors">
                                {sub.title}
                              </h5>
                              <div className="text-xs text-[#a59fc2] mt-0.5">
                                Referencia: {sub.citation} · Términos:{" "}
                                <span className="font-serif italic text-[#f472b6]">
                                  {sub.keyTerms.join(", ")}
                                </span>
                              </div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              onAskTutor(
                                `Crowley, analiza el subtema «${sub.title}» (${sub.citation}) usando los conceptos ${sub.keyTerms.join(", ")}.`,
                                currentTheme.id
                              )
                            }
                            className="px-3 py-2 min-h-[44px] text-xs font-medium text-[#d8b4fe] hover:text-[#f472b6] underline underline-offset-4 whitespace-nowrap shrink-0"
                          >
                            Profundizar
                          </button>
                        </div>

                        {isOpen && (
                          <ul className="mt-3.5 pl-10 space-y-2 text-sm text-[#e2dff0] leading-relaxed max-w-3xl">
                            {sub.points.map((pt, idx) => (
                              <li key={idx}>— {pt}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}

      {/* Ergonomic Thumb-Accessible Bottom Floating Bar + Crowley Floating Helper */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center gap-1.5 sm:gap-2.5 px-2 sm:px-3.5 py-2 max-w-[calc(100vw-1rem)] rounded-2xl bg-[#1c192b]/90 backdrop-blur-lg border border-[#c084fc]/40 shadow-2xl">
        <button
          type="button"
          onClick={handleCenterMap}
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2.5 min-h-[44px] text-xs font-semibold text-[#f5f3ff] bg-[#2a2440] hover:bg-[#372f54] border border-white/10 rounded-xl whitespace-nowrap shrink-0"
        >
          <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c084fc]" />
          <span>Centrar Mapa</span>
        </button>

        {!isShowingIndex && (
          <button
            type="button"
            onClick={handleReturnToIndex}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2.5 min-h-[44px] text-xs font-semibold text-[#12111a] bg-[#d8b4fe] hover:bg-[#c084fc] rounded-xl whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Volver al Índice</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowCrowleyHelper((prev) => !prev)}
          aria-expanded={showCrowleyHelper}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 min-h-[44px] text-xs font-semibold text-[#12111a] bg-[#f472b6] hover:bg-[#f9a8d4] rounded-xl whitespace-nowrap shrink-0"
        >
          <CrowleyAvatar size="sm" className="w-6 h-6 sm:w-7 sm:h-7 border-[#12111a]" />
          <span>{CROWLEY_NAME}</span>
        </button>
      </div>

      {/* Crowley Floating Helper Popover in Map View */}
      {showCrowleyHelper && (
        <div
          role="dialog"
          aria-label="Asistente flotante Crowley"
          className="fixed bottom-20 right-4 sm:right-8 z-50 w-[calc(100vw-2rem)] max-w-sm bg-[#1c192b]/95 backdrop-blur-xl border border-[#c084fc]/50 rounded-2xl p-5 shadow-2xl space-y-3.5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <CrowleyAvatar size="md" />
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#f472b6]">
                  Guía de Mapa · {CROWLEY_NAME}
                </div>
                <h4 className="text-base font-serif font-semibold text-[#f5f3ff]">
                  {currentTheme.code}: {currentTheme.shortTitle}
                </h4>
              </div>
            </div>
            <button
              type="button"
              aria-label="Cerrar ayuda de Crowley"
              onClick={() => setShowCrowleyHelper(false)}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#a59fc2] hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[#e2dff0] leading-relaxed">
            «Puedes pellizcar o arrastrar el mapa con libertad; si te pierdes en
            el <em className="font-serif italic text-[#d8b4fe]">cháos</em>, toca{" "}
            <strong>Centrar Mapa</strong>. ¿Quieres que te explique la clave de
            este tema en el chat?»
          </p>

          <div className="space-y-2 pt-1">
            {currentTheme.suggestedQuestions.slice(0, 2).map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setShowCrowleyHelper(false);
                  onAskTutor(q, currentTheme.id);
                }}
                className="w-full text-left text-xs text-[#f5f3ff] bg-[#2a2440] hover:bg-[#372f54] border border-white/10 px-3.5 py-2.5 min-h-[44px] rounded-xl transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
