import {
  AUTHORS,
  AuthorProfile,
  GREEK_CONCEPTS,
  GreekConcept,
  PHILOSOPHY_THEMES,
  PhilosophyTheme,
  SeminarQuestion,
} from "../data/philosophyData";

export const CROWLEY_NAME = "Crowley";
export const CROWLEY_AVATAR_URL = "/assets/aistudio/Designer__2__688029cd.png";

export interface DetectedAcademicContext {
  primaryTheme: PhilosophyTheme;
  matchedThemes: PhilosophyTheme[];
  matchedConcepts: GreekConcept[];
  matchedAuthors: AuthorProfile[];
}

export interface TutorResponsePayload {
  tutorName: string;
  answer: string;
  themeBadge: string;
  authorsCited: string[];
  conceptsUsed: string[];
  polisLogosSynthesis: string;
  followUpSuggestions: string[];
}

export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function detectContextFromQuery(
  query: string,
  fallbackThemeId: number = 1
): DetectedAcademicContext {
  const norm = normalizeText(query);

  // 1. Match concepts
  const matchedConcepts = GREEK_CONCEPTS.filter((c) => {
    const termNorm = normalizeText(c.term);
    const idNorm = normalizeText(c.id);
    const words = termNorm.split(" ").filter((w) => w.length >= 3);
    return (
      norm.includes(termNorm) ||
      norm.includes(idNorm) ||
      words.some((w) => norm.includes(w))
    );
  });

  // 2. Match authors
  const matchedAuthors = AUTHORS.filter((a) => {
    const nameParts = normalizeText(a.name)
      .split(" ")
      .filter((p) => p.length > 3);
    return (
      norm.includes(normalizeText(a.id)) ||
      nameParts.some((part) => norm.includes(part))
    );
  });

  // 3. Score themes
  const themeScores = new Map<number, number>();
  for (const t of PHILOSOPHY_THEMES) {
    let score = 0;
    if (
      norm.includes(`tema ${t.id}`) ||
      norm.includes(`tema 0${t.id}`) ||
      norm.includes(normalizeText(t.shortTitle))
    ) {
      score += 10;
    }
    for (const kw of t.keyConcepts) {
      const kwNorm = normalizeText(kw);
      if (kwNorm.length >= 3 && norm.includes(kwNorm)) {
        score += 4;
      }
    }
    for (const sec of t.sections) {
      if (norm.includes(normalizeText(sec.author))) {
        score += 5;
      }
      for (const sub of sec.subNodes) {
        for (const kt of sub.keyTerms) {
          if (norm.includes(normalizeText(kt))) {
            score += 3;
          }
        }
      }
    }
    themeScores.set(t.id, score);
  }

  for (const c of matchedConcepts) {
    themeScores.set(c.themeId, (themeScores.get(c.themeId) || 0) + 5);
  }
  for (const a of matchedAuthors) {
    for (const tid of a.themes) {
      themeScores.set(tid, (themeScores.get(tid) || 0) + 6);
    }
  }

  const sortedThemes = [...PHILOSOPHY_THEMES].sort((a, b) => {
    const scoreDiff = (themeScores.get(b.id) || 0) - (themeScores.get(a.id) || 0);
    if (scoreDiff !== 0) return scoreDiff;
    if (a.id === fallbackThemeId) return -1;
    if (b.id === fallbackThemeId) return 1;
    return a.id - b.id;
  });

  const activeScore = themeScores.get(sortedThemes[0].id) || 0;
  const primaryTheme =
    activeScore > 0
      ? sortedThemes[0]
      : PHILOSOPHY_THEMES.find((t) => t.id === fallbackThemeId) ||
        PHILOSOPHY_THEMES[0];

  const matchedThemes = sortedThemes.filter(
    (t) => (themeScores.get(t.id) || 0) > 0
  );
  if (matchedThemes.length === 0) {
    matchedThemes.push(primaryTheme);
  }

  return {
    primaryTheme,
    matchedThemes,
    matchedConcepts:
      matchedConcepts.length > 0
        ? matchedConcepts
        : GREEK_CONCEPTS.filter((c) => c.themeId === primaryTheme.id).slice(0, 3),
    matchedAuthors:
      matchedAuthors.length > 0
        ? matchedAuthors
        : AUTHORS.filter((a) => a.themes.includes(primaryTheme.id)),
  };
}

const CROWLEY_INTRO_REMARKS: Record<number, string> = {
  1: "Ajustando mis audífonos... Curioso cómo los modernos presumen de «interioridad», cuando para el griego arcaico existir era reflejarse en la mirada del otro o desvanecerse en las sombras del Hades.",
  2: "Qué deliciosa ironía histórica: Platón redactando diálogos sublimes para denunciar que la escritura destruye la memoria viva. Veamos cómo el alfabeto mutó nuestra conciencia.",
  3: "Antes de que la palabra se discutiera en el ágora, el canto del poeta era casi un conjuro que rescataba a los mortales del Olvido nocturno (*Léthē*). Desentrañemos esa metamorfosis.",
  4: "Mirar de frente al abismo del *chãos* sin dioses salvadores y aun así atreverse a inventar la ley común: por eso la democracia ateniense fue un arte tan lúcido como trágico.",
  5: "Aquí el *lógos* deja de ser inocente: entre el *phármakon* persuasivo de Gorgias, las Ideas de Platón y el maquillaje fúnebre de Atenas, el lenguaje se vuelve un campo de batalla.",
};

export function generateAcademicSynthesis(
  query: string,
  fallbackThemeId: number = 1
): TutorResponsePayload {
  const ctx = detectContextFromQuery(query, fallbackThemeId);
  const { primaryTheme, matchedConcepts, matchedAuthors } = ctx;

  const topConcepts = matchedConcepts.slice(0, 3);
  const topAuthors = matchedAuthors.slice(0, 2);

  const crowleyOpening =
    CROWLEY_INTRO_REMARKS[primaryTheme.id] || CROWLEY_INTRO_REMARKS[1];

  const themeHeader = `**Bitácora de Crowley · Ubicación:** ${primaryTheme.fullTitle} (${primaryTheme.authors.join(", ")}).`;

  const conceptAnalysis = topConcepts
    .map(
      (c) =>
        `• ***${c.term}*** **(${c.greek} — ${c.translation}):** ${c.definition} *(${c.citation})*.`
    )
    .join("\n");

  const authorPerspective = topAuthors
    .map(
      (a) =>
        `• **Lectura crítica con ${a.name}:** ${a.coreThesis} En la tensión política del discurso, ${a.polisLogosProblem.charAt(0).toLowerCase() + a.polisLogosProblem.slice(1)}`
    )
    .join("\n");

  const polisLogosBlock = `**3. Nexo con la** *pólis* **y el** *lógos*: ${primaryTheme.polisLogosConnection}`;

  const answer = [
    themeHeader,
    "",
    crowleyOpening,
    "",
    "**1. Conceptos griegos en juego**",
    conceptAnalysis,
    "",
    "**2. Despliegue filosófico y contextual**",
    authorPerspective,
    "",
    polisLogosBlock,
  ].join("\n");

  return {
    tutorName: CROWLEY_NAME,
    answer,
    themeBadge: `${primaryTheme.code} · ${primaryTheme.shortTitle}`,
    authorsCited: topAuthors.map((a) => a.name),
    conceptsUsed: topConcepts.map((c) => c.term),
    polisLogosSynthesis: primaryTheme.polisLogosConnection,
    followUpSuggestions: primaryTheme.suggestedQuestions,
  };
}

export function getCrowleyQuizCommentary(
  isCorrect: boolean,
  themeId: number,
  concept: string
): string {
  if (isCorrect) {
    const praises: Record<number, string> = {
      1: `¡Impecable! Tu mirada dialéctica captó el núcleo de ${concept} en el Tema 1 sin caer en la *hýbris* del anacronismo moderno.`,
      2: `¡Exacto!Ni la hipnosis mimética de los aedas logró distraerte: dominas la transición hacia la *psychē* letrada (${concept}).`,
      3: `¡Brillante! Has rescatado este concepto (${concept}) de las sombras de *Léthē* con la precisión de un maestro de verdad.`,
      4: `¡Lúcido golpe en la asamblea! Comprendes cómo ${concept} sostiene la autoinstitución trágica de la *pólis* frente al *chãos*.`,
      5: `¡Acertaste de lleno! Ni el *phármakon* de Gorgias ni la ideología fúnebre ateniense pudieron confundir tu análisis de ${concept}.`,
    };
    return praises[themeId] || praises[1];
  }

  const nudges: Record<number, string> = {
    1: `Casi... pero cuidado con proyectar ideas modernas sobre el mundo arcaico. Revisa cómo opera ${concept} dentro del *kósmos* y la mirada pública.`,
    2: `Hmm, parece que el canto de las Sirenas homéricas te tendió una trampa. Fíjate bien en cómo la tecnología alfabética transforma ${concept}.`,
    3: `No dejes que este concepto caiga en *Léthē*. Recuerda la diferencia entre la palabra mágico-religiosa y el debate en el centro (*es tò méson*) respecto a ${concept}.`,
    4: `Un pequeño tropiezo en el ágora. Recuerda que para Castoriadis y Romilly no hay garantía divina externa: todo gira en torno a ${concept}.`,
    5: `¡Cuidado con el efecto sofístico! Analiza cómo se tensa el discurso entre ontología, *logología* e ideología cívica en torno a ${concept}.`,
  };
  return nudges[themeId] || nudges[1];
}

export function buildSystemInstruction(): string {
  const themesSummary = PHILOSOPHY_THEMES.map((t) => {
    const sectionsText = t.sections
      .map((s) => {
        const subText = s.subNodes
          .map(
            (n) =>
              `    - ${n.title} [${n.citation}]: ${n.points.join(" ")} (Conceptos: ${n.keyTerms.join(", ")})`
          )
          .join("\n");
        return `  * Sección ${s.number}: ${s.title} (${s.author}, ${s.workYear})\n${subText}`;
      })
      .join("\n");
    return `${t.fullTitle}\nAutores: ${t.authors.join(", ")}\nConceptos clave: ${t.keyConcepts.join(", ")}\nRelación Pólis/Lógos: ${t.polisLogosConnection}\n${sectionsText}`;
  }).join("\n\n");

  return `Te llamas Crowley. Eres la tutora académica oficial, rigurosa y pedagógica especializada en Filosofía Griega Clásica y Arcaica (Asignatura: Introducción a la Filosofía y Principios y Técnicas de la Investigación Filosófica I).
Tu personalidad y tono ("Crowley"):
- Tienes una identidad reflexiva, filosófica, perspicaz y con un toque amigable e irónico sutil (disfrutas señalar las paradojas del poder, las sombras del Hades, el abismo del chãos o las ironías de Platón y los sofistas), pero mantienes SIEMPRE el máximo rigor académico y fidelidad a los textos.
- Tu función es guiar al estudiante a través de los 5 temas de la biblioteca conceptual:
  * Tema 1: El hombre griego (Vernant, Pomeroy, Hadot).
  * Tema 2: Mito y mitología, oralidad y escritura (Havelock, Ong, Detienne).
  * Tema 3: Musas y poetas, verdad y crisis de soberanía (Detienne, Vernant).
  * Tema 4: Mito y tragedia, la democracia ateniense (Castoriadis, Romilly).
  * Tema 5: Mito y logos, sofística y razón (Cassin, Châtelet, Loraux).

REGLAS OBLIGATORIAS DE RESPUESTA:
1. Claridad y lectura móvil: Responde de forma clara, concisa y accesible para lectura en pantallas móviles (bloques bien estructurados y ágiles).
2. Rigor terminológico griego: Sustenta SIEMPRE tus explicaciones en los conceptos clave griegos en cursiva (kósmos, phýsis, daimonía, hýbris, timé, kléos áphthiton, epiklēros, metaxy, mímesis, psychē, estin, mnēmē/hypómnēsis, hyponoia, Mnēmosýnē, krainein, Alétheia/Léthē, es tò méson, isonomía, sōphrosýnē, chãos, isēgoría, parrhēsía, logología, phármakon, sēmaínein ti, tί esti, Eídē, epitáphios lógos, stásis).
3. Ubicación temática y eje Pólis/Lógos: Cuando el estudiante pregunte por un concepto o autor, indica explícitamente a qué Tema pertenece (Tema 1 a 5), cita al autor/año y relaciónalo con los problemas centrales de la pólis y el lógos.
4. Perspectiva crítica y contextual: Prioriza siempre una perspectiva filosófica crítica y contextual.

BASE DOCUMENTAL DE LA BIBLIOTECA CONCEPTUAL:
${themesSummary}`;
}

export function filterLexicon(
  concepts: GreekConcept[],
  searchQuery: string,
  themeFilter: number | "all"
): GreekConcept[] {
  const norm = normalizeText(searchQuery);
  return concepts.filter((c) => {
    const matchesTheme = themeFilter === "all" || c.themeId === themeFilter;
    if (!matchesTheme) return false;
    if (!norm) return true;
    const searchable = normalizeText(
      `${c.term} ${c.greek} ${c.translation} ${c.author} ${c.definition} ${c.polisLogosRelation}`
    );
    return searchable.includes(norm);
  });
}

export function evaluateQuizSubmission(
  questions: SeminarQuestion[],
  selectedAnswers: Record<string, number>
): {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  percentage: number;
  byTheme: Record<number, { total: number; correct: number }>;
} {
  let answeredCount = 0;
  let correctCount = 0;
  const byTheme: Record<number, { total: number; correct: number }> = {};

  for (const q of questions) {
    if (!byTheme[q.themeId]) {
      byTheme[q.themeId] = { total: 0, correct: 0 };
    }
    byTheme[q.themeId].total += 1;

    const chosen = selectedAnswers[q.id];
    if (typeof chosen === "number") {
      answeredCount += 1;
      if (chosen === q.correctIndex) {
        correctCount += 1;
        byTheme[q.themeId].correct += 1;
      }
    }
  }

  const totalQuestions = questions.length;
  const percentage =
    totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  return {
    totalQuestions,
    answeredCount,
    correctCount,
    percentage,
    byTheme,
  };
}
