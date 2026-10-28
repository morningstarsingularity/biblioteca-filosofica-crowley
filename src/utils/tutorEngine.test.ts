import test from "node:test";
import assert from "node:assert/strict";
import {
  CROWLEY_AVATAR_URL,
  CROWLEY_NAME,
  detectContextFromQuery,
  evaluateQuizSubmission,
  filterLexicon,
  generateAcademicSynthesis,
  getCrowleyQuizCommentary,
  normalizeText,
} from "./tutorEngine";
import {
  GREEK_CONCEPTS,
  PHILOSOPHY_THEMES,
  SEMINAR_QUESTIONS,
} from "../data/philosophyData";
import {
  INDEX_MARKMAP_TREE,
  MARKMAP_PASTEL_GOTH_PALETTE,
  THEME_MARKMAP_TREES,
} from "../data/markmapTrees";

test("normalizeText strips accents and punctuation accurately", () => {
  assert.equal(normalizeText("¿Qué es Alétheia y Léthē?"), "que es aletheia y lethe");
  assert.equal(normalizeText("Kósmos, Phýsis & Timé"), "kosmos physis time");
});

test("detectContextFromQuery maps concepts and authors to their exact theme", () => {
  const ctx1 = detectContextFromQuery("Explica la situación de la epiklēros en Pomeroy");
  assert.equal(ctx1.primaryTheme.id, 1);
  assert.ok(ctx1.matchedAuthors.some((a) => a.id === "pomeroy"));
  assert.ok(ctx1.matchedConcepts.some((c) => c.id === "epikleros"));

  const ctx2 = detectContextFromQuery("¿Cómo surge la psychē frente a la mímesis en Havelock?");
  assert.equal(ctx2.primaryTheme.id, 2);
  assert.ok(ctx2.matchedAuthors.some((a) => a.id === "havelock"));

  const ctx3 = detectContextFromQuery("Explica Alétheia frente a Léthē y es tò méson");
  assert.equal(ctx3.primaryTheme.id, 3);
  assert.ok(ctx3.matchedConcepts.some((c) => c.id === "aletheia-lethe"));

  const ctx4 = detectContextFromQuery("La democracia como autoinstitución sobre el chãos en Castoriadis");
  assert.equal(ctx4.primaryTheme.id, 4);
  assert.ok(ctx4.matchedAuthors.some((a) => a.id === "castoriadis"));

  const ctx5 = detectContextFromQuery("¿Qué es la logología en Barbara Cassin y el epitáphios lógos en Loraux?");
  assert.equal(ctx5.primaryTheme.id, 5);
  assert.ok(ctx5.matchedAuthors.some((a) => a.id === "cassin"));
  assert.ok(ctx5.matchedConcepts.some((c) => c.id === "logologia"));
});

test("generateAcademicSynthesis fulfills all 4 pedagogical rules and uses Crowley identity", () => {
  const res = generateAcademicSynthesis("¿Qué significa isonomía y es tò méson en Vernant?", 3);
  assert.equal(res.tutorName, CROWLEY_NAME);
  assert.equal(CROWLEY_AVATAR_URL, "/assets/aistudio/Designer__2__688029cd.png");
  assert.ok(res.answer.includes("Crowley"));
  assert.ok(res.answer.includes("Tema 3"));
  assert.ok(res.answer.includes("pólis"));
  assert.ok(res.answer.includes("lógos"));
  assert.ok(res.conceptsUsed.length > 0);
  assert.ok(res.authorsCited.includes("Jean-Pierre Vernant"));
});

test("getCrowleyQuizCommentary provides tailored feedback for hits and misses", () => {
  const hit = getCrowleyQuizCommentary(true, 3, "Alétheia / Léthē");
  const miss = getCrowleyQuizCommentary(false, 5, "logología");
  assert.ok(hit.includes("Alétheia / Léthē"));
  assert.ok(miss.includes("logología"));
});

test("filterLexicon filters by theme and search query", () => {
  const allTheme5 = filterLexicon(GREEK_CONCEPTS, "", 5);
  assert.ok(allTheme5.length >= 4);
  assert.ok(allTheme5.every((c) => c.themeId === 5));

  const searchLogologia = filterLexicon(GREEK_CONCEPTS, "logología", "all");
  assert.equal(searchLogologia.length, 1);
  assert.equal(searchLogologia[0].id, "logologia");
});

test("evaluateQuizSubmission calculates scores and per-theme breakdown", () => {
  const answers: Record<string, number> = {
    q1: SEMINAR_QUESTIONS[0].correctIndex,
    q2: (SEMINAR_QUESTIONS[1].correctIndex + 1) % 4,
    q3: SEMINAR_QUESTIONS[2].correctIndex,
  };
  const evalResult = evaluateQuizSubmission(SEMINAR_QUESTIONS, answers);
  assert.equal(evalResult.totalQuestions, SEMINAR_QUESTIONS.length);
  assert.equal(evalResult.answeredCount, 3);
  assert.equal(evalResult.correctCount, 2);
  assert.equal(evalResult.byTheme[1].correct, 1);
  assert.equal(evalResult.byTheme[2].correct, 1);
});

test("Markmap Pastel Goth palette and dynamic trees for Index and Themes 1-5 are complete", () => {
  assert.deepEqual(MARKMAP_PASTEL_GOTH_PALETTE, [
    "#c084fc",
    "#f472b6",
    "#a78bfa",
    "#d8b4fe",
  ]);
  assert.ok(INDEX_MARKMAP_TREE.children.length >= 2);
  for (let i = 1; i <= 5; i++) {
    assert.ok(THEME_MARKMAP_TREES[i]);
    assert.ok(THEME_MARKMAP_TREES[i].children.length >= 2);
  }
  assert.equal(PHILOSOPHY_THEMES.length, 5);
});
