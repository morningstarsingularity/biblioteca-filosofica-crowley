export interface ConceptSubNode {
  id: string;
  title: string;
  points: string[];
  keyTerms: string[];
  citation: string;
}

export interface ThemeSection {
  id: string;
  number: string;
  title: string;
  author: string;
  workYear: string;
  subNodes: ConceptSubNode[];
}

export interface BibliographyEntry {
  author: string;
  year: string;
  title: string;
  publisher: string;
}

export interface PhilosophyTheme {
  id: number;
  code: string;
  shortTitle: string;
  fullTitle: string;
  subtitle: string;
  authors: string[];
  keyConcepts: string[];
  markmapAssetPath: string;
  nexusWithPrevious: {
    title: string;
    points: string[];
  };
  polisLogosConnection: string;
  sections: ThemeSection[];
  bibliography: BibliographyEntry[];
  suggestedQuestions: string[];
}

export interface GreekConcept {
  id: string;
  term: string;
  greek: string;
  translation: string;
  themeId: number;
  author: string;
  definition: string;
  polisLogosRelation: string;
  citation: string;
}

export interface AuthorProfile {
  id: string;
  name: string;
  themes: number[];
  work: string;
  coreThesis: string;
  polisLogosProblem: string;
  keyConcepts: string[];
}

export interface SeminarQuestion {
  id: string;
  themeId: number;
  question: string;
  contextConcept: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  citation: string;
}

export const COURSE_METADATA = {
  courseTitle: "INTRODUCCIÓN A LA FILOSOFÍA Y PRINCIPIOS Y TÉCNICAS DE LA INVESTIGACIÓN FILOSÓFICA I",
  studentName: "Ledezma Hernández Zeltzin Odette",
  accountNumber: "422074843",
  subjectLabel: "Biblioteca de Mapas Conceptuales",
  indexMarkmapPath: "/assets/aistudio/Indice_e6abcde5.html",
};

export const PHILOSOPHY_THEMES: PhilosophyTheme[] = [
  {
    id: 1,
    code: "TEMA 01",
    shortTitle: "El hombre griego",
    fullTitle: "Tema 1: El hombre griego",
    subtitle: "Kósmos animado, alteridad divina, estatuto de la mujer y el giro socrático",
    authors: ["Jean-Pierre Vernant", "Sarah B. Pomeroy", "Pierre Hadot"],
    keyConcepts: ["kósmos", "phýsis", "daimonía", "phosphora ómmata", "athanatoi", "hýbris", "timé", "kléos áphthiton", "gynē / epiklēros", "paideia", "areté", "metaxy", "Eros"],
    markmapAssetPath: "/assets/aistudio/tema1_0e7aba36.html",
    nexusWithPrevious: {
      title: "Fundamento ontológico y antropológico arcaico",
      points: [
        "El hombre griego arcaico no se concibe como una conciencia interior aislada (cogito), sino inmerso en un kósmos vivo y proyectado hacia la mirada pública de sus semejantes.",
        "La tensión entre la condición mortal y los dioses inmortales (athanatoi) fija el límite ético contra la desmesura (hýbris) y hace de la memoria poética (kléos) la única victoria sobre el Hades.",
        "Bajo el ideal heroico y ciudadano subyace la división sexual del trabajo y la propiedad (Pomeroy), así como el tránsito desde la paideia aristocrática hasta la interrogación filosófica como modo de vida (Hadot)."
      ]
    },
    polisLogosConnection: "Configura la matriz pre-cívica y cívica: la identidad exterior (timé) y la exclusión jurídica de las mujeres estructuran el espacio de la pólis, mientras que el paso de la historia jónica de la phýsis al diálogo socrático prepara el ejercicio crítico del lógos.",
    sections: [
      {
        id: "t1-s1",
        number: "1.1",
        title: "El hombre en el kósmos y la frontera con lo divino",
        author: "Jean-Pierre Vernant",
        workYear: "1995",
        subNodes: [
          {
            id: "t1-s1-n1",
            title: "La 'phýsis' animada y el estatuto cósmico del hombre",
            points: [
              "El universo constituye un kósmos: totalidad ordenada, armónica y bella que rechaza la escisión moderna sujeto/objeto (Vernant, 1995, pp. 21-22).",
              "La phýsis no es materia inerte; es una potencia viva, dinámica y «demoníaca» (daimonía) con la que el hombre está emparentado de forma connatural (Vernant, 1995, pp. 21-22).",
              "La teoría de la visión: ver no es procesar imágenes pasivamente, sino proyectar un rayo ígneo (phosphora ómmata) que se une a la luz solar para tocar físicamente lo real (Vernant, 1995, pp. 22-25)."
            ],
            keyTerms: ["kósmos", "phýsis", "daimonía", "phosphora ómmata"],
            citation: "Vernant, 1995, pp. 21-25"
          },
          {
            id: "t1-s1-n2",
            title: "La alteridad divina y los límites de la condición mortal",
            points: [
              "Los dioses no son trascendentes ni creadores ex nihilo; nacen en el interior del cosmos a partir de potencias primordiales como Caos y Gea (Vernant, 1995, pp. 15-16).",
              "Frontera ontológica infranqueable: los dioses son los athanatoi (inmortales sin vejez ni carencia); el hombre está signado por la privación, el dolor y la muerte (Vernant, 1995, pp. 16-17).",
              "Regla cardinal de la sabiduría cívica: rechazo de la hýbris; el mortal debe conocer sus límites y no pretender igualarse a los dioses (Vernant, 1995, pp. 16-17, 26).",
              "El culto cívico como deuda y embellecimiento: sin dogmas cerrados ni clero coercitivo, el ritual (sacrificios, danzas, coros) mantiene la armonía comunitaria entre hombres libres (Vernant, 1995, pp. 17-20)."
            ],
            keyTerms: ["athanatoi", "hýbris", "culto cívico"],
            citation: "Vernant, 1995, pp. 15-20, 26"
          },
          {
            id: "t1-s1-n3",
            title: "Identidad exterior: 'timé', la mirada del otro y el 'kléos'",
            points: [
              "Ausencia del cogito o la introspección subjetiva: el autoconocimiento es especular; el ojo y el alma solo se conocen reflejándose en otro semejante (Vernant, 1995, pp. 26-27).",
              "Cultura del honor y la vergüenza: la identidad coincide con la estimación social (timé); perder el reconocimiento de los pares equivale a no ser nadie (Vernant, 1995, pp. 27-28).",
              "La inmortalidad como memoria cívica: el Hades es solo un reino de sombras vacías; la única victoria sobre la muerte es la gloria imperecedera (kléos áphthiton) fijada por el canto poético y el monumento (Vernant, 1995, pp. 29-31)."
            ],
            keyTerms: ["timé", "kléos áphthiton", "Hades"],
            citation: "Vernant, 1995, pp. 26-31"
          }
        ]
      },
      {
        id: "t1-s2",
        number: "1.2",
        title: "La trastienda del héroe: mujeres, matrimonio y propiedad",
        author: "Sarah B. Pomeroy",
        workYear: "1987",
        subNodes: [
          {
            id: "t1-s2-n1",
            title: "La mujer en la épica homérica (Edad del Bronce)",
            points: [
              "Contradicción estructural: figuras de reinas con relieve dramático e influencia palacial frente a un estatuto objetivo de subordinación patriarcal (Pomeroy, 1987, pp. 31-33).",
              "Las mujeres como propiedad, botín de guerra (géras) y premio: su posesión incrementa directamente la timé del guerrero y desata contiendas mortales (Pomeroy, 1987, pp. 40-41).",
              "Estrategias de alianza conyugal: coexistencia de enlaces patrilocales (la dote atrae y sella pactos) y matrilocales/matrilineales (el héroe hereda el trono mediante pruebas) (Pomeroy, 1987, pp. 33-35).",
              "Doble moral sexual: obligación de monogamia y castidad para la esposa a fin de asegurar herederos legítimos frente al libre acceso del varón a concubinas y esclavas (Pomeroy, 1987, pp. 41-43)."
            ],
            keyTerms: ["géras", "timé", "patrilocalidad", "matrilocalidad"],
            citation: "Pomeroy, 1987, pp. 31-43"
          },
          {
            id: "t1-s2-n2",
            title: "La bifurcación arcaica: Esparta doria frente a Atenas jónica",
            points: [
              "El modelo espartano (código de Licurgo): Estado militarizado donde la mujer es valorada como reproductora de soldados para la falange (Pomeroy, 1987, pp. 50-52).",
              "Privilegios de la espartana: nutrición equivalente al varón, gimnasia y carreras al aire libre, exención de labores domésticas y control real sobre dotes y tierras (Pomeroy, 1987, pp. 51-54).",
              "El modelo de Gortina (Creta): leyes que reconocen derechos patrimoniales a la mujer libre e incluso capacidad jurídica limitada para la sierva y la patroïokhos (Pomeroy, 1987, pp. 54-57).",
              "La reclusión en la Atenas jónica: confinamiento de la mujer libre al gineceo, invisibilidad social y tutela perpetua del kýrios bajo la ley de Solón (Pomeroy, 1987, pp. 57, 73-76).",
              "La epiklēros ateniense: la heredera sin hermanos no posee la tierra; queda integrada como vehículo para transmitir la propiedad familiar al pariente varón más próximo (Pomeroy, 1987, pp. 77-78)."
            ],
            keyTerms: ["kýrios", "epiklēros", "patroïokhos", "gineceo"],
            citation: "Pomeroy, 1987, pp. 50-78"
          }
        ]
      },
      {
        id: "t1-s3",
        number: "1.3",
        title: "Del orden aristocrático a la interrogación socrática",
        author: "Pierre Hadot",
        workYear: "1998",
        subNodes: [
          {
            id: "t1-s3-n1",
            title: "De la 'historia' jónica a la fractura de la 'paideia' tradicional",
            points: [
              "Nacimiento de la historia en Mileto: ruptura con las cosmogonías míticas para buscar una explicación racional de la phýsis física accesible a la observación (Hadot, 1998, pp. 23-25).",
              "La paideia nobiliaria tradicional: transmisión comunitaria de la excelencia (areté) por ósmosis y emulación directa en la convivencia de adultos y jóvenes (sunousia) (Hadot, 1998, pp. 26-27).",
              "La crisis cívica y la revolución sofística: la democracia y los tribunales demandan nuevas competencias; los sofistas profesionalizan la retórica y venden el arte de persuadir como técnica de poder (Hadot, 1998, pp. 28-30)."
            ],
            keyTerms: ["historia", "phýsis", "paideia", "areté", "sunousia"],
            citation: "Hadot, 1998, pp. 23-30"
          },
          {
            id: "t1-s3-n2",
            title: "La resignificación socrático-platónica del filósofo (Banquete)",
            points: [
              "Sócrates como encarnación demoníaca de Eros: hijo de Poros (Recurso/Astucia) y Penia (Pobreza/Carencia) (Hadot, 1998, pp. 45-47).",
              "La ontología del intervalo (metaxy): el filósofo no es el dios omnisciente que posee la sophia ni el insensato que ignora su propia ignorancia (Hadot, 1998, pp. 47-50).",
              "La philosophia como deseo y modo de vida: no es construcción de un sistema doctrinal abstracto cerrado, sino ejercicio cotidiano de desacomodo y transformación personal del ser (bios) (Hadot, 1998, pp. 50-53)."
            ],
            keyTerms: ["Eros", "Poros y Penia", "metaxy", "sophia", "bios"],
            citation: "Hadot, 1998, pp. 45-53"
          }
        ]
      }
    ],
    bibliography: [
      {
        author: "Hadot, P.",
        year: "1998",
        title: "¿Qué es la filosofía antigua? (E. Cazenave Tapie Isoard, Trad.)",
        publisher: "Fondo de Cultura Económica"
      },
      {
        author: "Pomeroy, S. B.",
        year: "1987",
        title: "Diosas, rameras, esposas y esclavas: Mujeres en la antigüedad clásica (R. Lezcano Escudero, Trad.)",
        publisher: "Akal"
      },
      {
        author: "Vernant, J.-P.",
        year: "1995",
        title: "Introducción: El hombre griego. En El hombre griego (pp. 9-31)",
        publisher: "Alianza Editorial"
      }
    ],
    suggestedQuestions: [
      "¿Cómo se relacionan timé y kléos con la identidad exterior en Vernant?",
      "¿Por qué la mujer epiklēros ateniense muestra los límites de la pólis según Pomeroy?",
      "¿En qué consiste el filósofo como metaxy y Eros según Pierre Hadot?"
    ]
  },
  {
    id: 2,
    code: "TEMA 02",
    shortTitle: "Mito, oralidad y escritura",
    fullTitle: "Tema 2: Mito y mitología. Oralidad y escritura",
    subtitle: "Enciclopedia homérica, tecnología alfabética, conciencia letrada e invención de la mitología",
    authors: ["Eric A. Havelock", "Walter J. Ong", "Marcel Detienne"],
    keyConcepts: ["nómos", "éthos", "mímesis", "estin", "psychē", "mnēmē", "hypómnēsis", "mythos", "hyponoia"],
    markmapAssetPath: "/assets/aistudio/tema2_d694fb51.html",
    nexusWithPrevious: {
      title: "Nexo con el Tema 1: La fractura de la presencia viva",
      points: [
        "En el Tema 1, el hombre griego existe proyectado hacia afuera: su identidad depende del reconocimiento visual (timé) y de la memoria comunitaria viva (kléos) (Vernant, 1995, pp. 28-30).",
        "El traspaso de la gloria descansaba en el canto poético oral que mantenía al héroe arrancado de las sombras del Hades (Vernant, 1995, pp. 16, 29-30).",
        "Cuando la palabra deja de ser aire compartido y se petrifica sobre una superficie física, la relación del hombre con el cosmos, la memoria y su propia conciencia se fractura de manera irreversible (Havelock, 1996, pp. 113-133; Ong, 1997, pp. 81-116)."
      ]
    },
    polisLogosConnection: "Explica la mutación material y cognitiva del lógos: el paso de la mímesis acústica colectiva a la escritura alfabética engendra la interioridad crítica (psychē), la sintaxis del Ser (estin) y la transformación del mito vivo en «mitología» sometida al escrutinio racional de la pólis.",
    sections: [
      {
        id: "t2-s1",
        number: "2.1",
        title: "La enciclopedia oral homérica y la memoria acústica",
        author: "Eric A. Havelock",
        workYear: "1996",
        subNodes: [
          {
            id: "t2-s1-n1",
            title: "La poesía como tecnología cívica y archivo social",
            points: [
              "En una cultura sin transcripción alfabética, la poesía no es un pasatiempo estético ni literatura de entretenimiento (Havelock, 1996, pp. 19-39).",
              "Constituye el único mecanismo de almacenamiento de la tradición: custodia el nómos (la ley consuetudinaria) y el éthos (las pautas morales de conducta social) (Havelock, 1996, pp. 19-39).",
              "Toda la masa de información técnica, cívica, religiosa, genealógica e institucional de la comunidad debe conservarse en el verso métrico para no perderse en el olvido (Havelock, 1996, pp. 19-39)."
            ],
            keyTerms: ["nómos", "éthos", "enciclopedia oral"],
            citation: "Havelock, 1996, pp. 19-39"
          },
          {
            id: "t2-s1-n2",
            title: "Mecanismos mnemotécnicos y mímesis corporal",
            points: [
              "Ritmo métrico, metro dactílico, fórmulas modulares, epítetos fijos y rima como prótesis mnemónicas obligatorias (Havelock, 1996, pp. 19-39).",
              "El aprendizaje se produce por mímesis: identificación psico-afectiva y visceral absoluta entre el recitador/oyente y el contenido del canto (Havelock, 1996, pp. 19-39).",
              "El cuerpo entero (aparato fonador, oído, sistema motriz, danza) se compromete activamente en la preservación del recuerdo social (Havelock, 1996, pp. 19-39)."
            ],
            keyTerms: ["mímesis", "fórmulas homéricas", "memoria acústica"],
            citation: "Havelock, 1996, pp. 19-39"
          },
          {
            id: "t2-s1-n3",
            title: "La expulsión de los poetas en Platón (República)",
            points: [
              "No responde a una mojigatería moralizante ni a insensibilidad artística por parte de Platón (Havelock, 1996, pp. 19-39).",
              "Es un imperativo epistemológico radical: para instaurar el pensamiento conceptual, abstracto y reflexivo, es imprescindible quebrar el monopolio educativo del aeda y la hipnosis colectiva de la memoria oral (Havelock, 1996, pp. 19-39)."
            ],
            keyTerms: ["mímesis", "República", "epistemología platónica"],
            citation: "Havelock, 1996, pp. 19-39"
          }
        ]
      },
      {
        id: "t2-s2",
        number: "2.2",
        title: "La revolución tecnológica del alfabeto griego",
        author: "Eric A. Havelock",
        workYear: "1996",
        subNodes: [
          {
            id: "t2-s2-n1",
            title: "La descomposición analítica del sonido",
            points: [
              "Ruptura frente a los silabarios orientales y la escritura consonántica fenicia (que dependían de un conocimiento oral previo para descifrar el contexto) (Havelock, 1996, pp. 113-133).",
              "Aislamiento exhaustivo tanto de las vocales como de las consonantes mudas (unidades abstractas inaudibles por sí solas en el aire) (Havelock, 1996, pp. 113-133).",
              "Transforma el flujo sonoro, fugaz y temporal, en un artefacto visible, espacializado, estable e independiente del hablante (Havelock, 1996, pp. 113-133)."
            ],
            keyTerms: ["alfabeto fonético", "espacialización visual"],
            citation: "Havelock, 1996, pp. 113-133"
          },
          {
            id: "t2-s2-n2",
            title: "De la acción narrativa al concepto abstracto (La sintaxis del Ser)",
            points: [
              "Desmantelamiento de la parataxis oral donde solo actuaban agentes personificados (dioses o héroes haciendo cosas) (Havelock, 1996, pp. 113-133).",
              "Creación de la sintaxis ontológica de la definición formal: entronización del verbo copulativo «ser» (estin) y de categorías lógicas estables (Havelock, 1996, pp. 113-133).",
              "El lenguaje pasa de describir acontecimientos dinámicos y singulares a formular esencias universales e intemporales."
            ],
            keyTerms: ["parataxis", "estin", "sintaxis del Ser"],
            citation: "Havelock, 1996, pp. 113-133"
          },
          {
            id: "t2-s2-n3",
            title: "La génesis de la 'psychē' y la distancia crítica",
            points: [
              "Al quedar el texto separado del cuerpo del emisor, el mensaje se independiza y puede ser sometido a inspección, duda, corrección y relectura solitaria (Havelock, 1996, pp. 113-133).",
              "Nace la distancia crítica entre el sujeto que piensa y el objeto pensado: al quebrarse la identificación mimética colectiva, se crea la interioridad reflexiva (psychē) y el individuo autónomo (Havelock, 1996, pp. 113-133)."
            ],
            keyTerms: ["psychē", "distancia crítica", "individuo autónomo"],
            citation: "Havelock, 1996, pp. 113-133"
          }
        ]
      },
      {
        id: "t2-s3",
        number: "2.3",
        title: "La reestructuración de la conciencia por la escritura",
        author: "Walter J. Ong",
        workYear: "1997",
        subNodes: [
          {
            id: "t2-s3-n1",
            title: "La escritura como tecnología artificial interiorizada",
            points: [
              "La escritura no es una emanación biológica natural de la voz; es una tecnología exterior que exige herramientas físicas (cálamo, tinta, soporte) (Ong, 1997, pp. 81-116).",
              "Como toda tecnología revolucionaria, al ser asimilada profundamente reestructura las redes neuronales y los modos del pensamiento humano (Ong, 1997, pp. 81-116)."
            ],
            keyTerms: ["tecnología de la palabra", "conciencia letrada"],
            citation: "Ong, 1997, pp. 81-116"
          },
          {
            id: "t2-s3-n2",
            title: "El discurso autónomo y la paradoja del 'Fedro' platónico",
            points: [
              "El texto escrito inaugura el «discurso autónomo»: palabras desvinculadas del contexto vital directo, irrefutables y sordas que repiten siempre lo mismo (Ong, 1997, pp. 81-116).",
              "En el Fedro (mito de Teuth), Platón condena la escritura porque destruye la memoria interna viva (mnēmē) e instaura un recordatorio mecánico exterior (hypómnēsis) (Ong, 1997, pp. 81-116).",
              "Paradoja histórica: Platón únicamente pudo desarrollar su filosofía crítica, abstracta y dialéctica gracias al distanciamiento conceptual que la propia tecnología de la escritura le suministró (Ong, 1997, pp. 81-116).",
              "Reorganización sensorial: del oído envolvente de la oralidad primaria a la vista espacial, analítica y lineal que permite taxonomías y silogismos (Ong, 1997, pp. 81-116)."
            ],
            keyTerms: ["discurso autónomo", "mnēmē", "hypómnēsis", "Fedro"],
            citation: "Ong, 1997, pp. 81-116"
          }
        ]
      },
      {
        id: "t2-s4",
        number: "2.4",
        title: "La invención de la «mitología» y la crisis del mito",
        author: "Marcel Detienne",
        workYear: "1985",
        subNodes: [
          {
            id: "t2-s4-n1",
            title: "El mito como objeto construido por la mirada letrada",
            points: [
              "En la Grecia arcaica y oral no existía el concepto de «mitología» como colección de fábulas o relatos ficticios (Detienne, 1985, cap. I).",
              "El mythos es inventado como categoría sospechosa precisamente cuando la escritura lo captura, lo aísla de su contexto de enunciación festiva y lo deposita en un texto inerte (Detienne, 1985, cap. I)."
            ],
            keyTerms: ["mythos", "mitología", "mirada letrada"],
            citation: "Detienne, 1985, cap. I"
          },
          {
            id: "t2-s4-n2",
            title: "Del escándalo de la razón al nacimiento de la alegoría ('hyponoia')",
            points: [
              "Al quedar congelados en el texto y ser leídos analíticamente, los crímenes y monstruosidades de los dioses homéricos y hesiódicos se transforman en un escándalo para la razón cívica (Detienne, 1985, cap. I).",
              "Pensadores como Jenófanes denuncian el antropomorfismo, mientras Teágenes de Regio inventa la interpretación alegórica (Detienne, 1985, cap. I).",
              "Se postula un sentido oculto o subyacente (hyponoia) bajo la superficie del relato: la mitología nace como problema en el instante en que el mito deja de ser creído ingenuamente (Detienne, 1985, cap. I)."
            ],
            keyTerms: ["hyponoia", "alegoría", "escándalo de la razón"],
            citation: "Detienne, 1985, cap. I"
          }
        ]
      }
    ],
    bibliography: [
      {
        author: "Detienne, M.",
        year: "1985",
        title: "La invención de la mitología (M. A. Galmarini, Trad., Cap. I)",
        publisher: "Península"
      },
      {
        author: "Havelock, E. A.",
        year: "1996",
        title: "La musa aprende a escribir: Reflexiones sobre la oralidad y escritura desde la Antigüedad hasta el presente (pp. 19-39, 113-133)",
        publisher: "Paidós"
      },
      {
        author: "Ong, W. J.",
        year: "1997",
        title: "La escritura reestructura la conciencia. En Oralidad y escritura: Tecnologías de la palabra (pp. 81-116)",
        publisher: "Fondo de Cultura Económica"
      }
    ],
    suggestedQuestions: [
      "¿Por qué Platón expulsa a los poetas según Havelock y qué papel juega la mímesis?",
      "¿Cuál es la paradoja del Fedro platónico entre mnēmē e hypómnēsis según Ong?",
      "¿Por qué afirma Detienne que la escritura «inventa» la mitología y la hyponoia?"
    ]
  },
  {
    id: 3,
    code: "TEMA 03",
    shortTitle: "Musas, verdad y crisis de soberanía",
    fullTitle: "Tema 3: Musas y poetas. Verdad, rito y crisis de soberanía",
    subtitle: "Maestros de verdad arcaicos, colapso micénico, centro cívico e isonomía hoplítica",
    authors: ["Marcel Detienne", "Jean-Pierre Vernant"],
    keyConcepts: ["Mnēmosýnē", "aoidós", "krainein", "Alétheia", "Léthē", "Ánax", "es tò méson", "Peithō", "nómos", "sōphrosýnē", "isonomía"],
    markmapAssetPath: "/assets/aistudio/tema3_f8de3611.html",
    nexusWithPrevious: {
      title: "Nexo con los Temas 1 y 2: De la memoria encarnada a la secularización del orden",
      points: [
        "En los temas previos, el reconocimiento cívico (timé) y la preservación de la memoria (kléos) dependían del canto poético para no caer en el Hades.",
        "La fijación alfabética objetivó la palabra, pero es en el plano sociopolítico donde se consuma su verdadera metamorfosis (Detienne, 1981, pp. 21-38; Vernant, 1992, pp. 61-79).",
        "La palabra deja de ser una revelación oracular o decreto mágico monopolizado por poetas y reyes sagrados (Ánax), y se arroja «al centro» (es tò méson) de la comunidad (Detienne, 1981; Vernant, 1992)."
      ]
    },
    polisLogosConnection: "Núcleo genético de la pólis y del lógos político: documenta el tránsito desde la palabra mágico-religiosa eficaz (krainein) y la verdad como desocultamiento (Alétheia vs. Léthē) hacia la palabra-debate secularizada en el ágora (es tò méson) y la igualdad geométrica ciudadana (isonomía).",
    sections: [
      {
        id: "t3-s1",
        number: "3.1",
        title: "La memoria del poeta y los maestros de verdad",
        author: "Marcel Detienne",
        workYear: "1981",
        subNodes: [
          {
            id: "t3-s1-n1",
            title: "Mnēmosýnē como potencia sagrada y videncia cósmica",
            points: [
              "En la Grecia arcaica, la Memoria (Mnēmosýnē) no constituye una facultad psicológica individual ni un archivo cronológico profano (Detienne, 1981, pp. 21-25).",
              "Opera como una potencia mítico-religiosa de naturaleza adivinatoria: quien es poseído por las Musas accede al «más allá» y contempla «lo que es, lo que será y lo que fue» (Detienne, 1981, pp. 21-26).",
              "El poeta (aoidós) comparte estatuto con el adivino y el rey de justicia: su palabra participa de la sacralidad y desvela realidades invisibles (Detienne, 1981, pp. 26-28)."
            ],
            keyTerms: ["Mnēmosýnē", "aoidós", "maestros de verdad"],
            citation: "Detienne, 1981, pp. 21-28"
          },
          {
            id: "t3-s1-n2",
            title: "La eficacia realizadora del canto ('krainein')",
            points: [
              "La palabra poética arcaica no se rige por la adecuación empírica o lógica (adaequatio), sino por su eficacia mágica y realizadora (krainein: realizar, hacer advenir) (Detienne, 1981, pp. 28-32).",
              "Cantar la teogonía o los linajes no es una transmisión neutra de datos, sino un acto que colabora en el sostenimiento del cosmos (Detienne, 1981, pp. 28-33).",
              "La palabra del aeda produce ontología: la alabanza otorga consistencia luminosa (kléos); el silencio o la censura condenan al ser a la inexistencia (Detienne, 1981, pp. 31-34)."
            ],
            keyTerms: ["krainein", "kléos", "palabra eficaz"],
            citation: "Detienne, 1981, pp. 28-34"
          },
          {
            id: "t3-s1-n3",
            title: "La polaridad mítica: 'Alétheia' frente a 'Léthē'",
            points: [
              "En el marco religioso tradicional, la Verdad (Alétheia) no tiene como antónimo a la mentira o al error intelectual (pseûdos) (Detienne, 1981, pp. 34-36).",
              "Su opuesto estricto es el Olvido (Léthē), potencia vinculada a la Noche, la Muerte, las sombras del Hades y el silencio sepulcral (Detienne, 1981, pp. 34-38).",
              "Alétheia es el acto de «desocultamiento» (a-privativa + léthē) que rescata al héroe de las sombras; quien no es cantado cae en Léthē (Detienne, 1981, pp. 36-38)."
            ],
            keyTerms: ["Alétheia", "Léthē", "pseûdos"],
            citation: "Detienne, 1981, pp. 34-38"
          }
        ]
      },
      {
        id: "t3-s2",
        number: "3.2",
        title: "El universo espiritual de la pólis y la crisis de soberanía",
        author: "Jean-Pierre Vernant",
        workYear: "1992",
        subNodes: [
          {
            id: "t3-s2-n1",
            title: "El derrumbe del sistema palacial micénico y la palabra-debate",
            points: [
              "El colapso del orden micénico (hacia 1200 a.C.) extingue al Ánax: rey sagrado que concentraba en el secreto del palacio el poder militar, religioso, judicial y burocrático (Vernant, 1992, pp. 61-63).",
              "La soberanía se fragmenta, se socializa y pierde su aura mística de origen divino (Vernant, 1992, pp. 63-65).",
              "En la pólis, la palabra se desliga de decretos verticales y se transforma en debate contradictorio, discusión argumentada y persuasión recíproca (Peithō) ante los ciudadanos (Vernant, 1992, pp. 61-65)."
            ],
            keyTerms: ["Ánax", "Peithō", "palabra-debate", "lógos"],
            citation: "Vernant, 1992, pp. 61-65"
          },
          {
            id: "t3-s2-n2",
            title: "Publicidad, el centro cívico ('es tò méson') y la ley escrita",
            points: [
              "Secularización del espacio: lo que antes pertenecía a las arcas palaciales o a los linajes cerrados (génē) se deposita en el espacio común del ágora (Vernant, 1992, pp. 64-67).",
              "El poder se coloca «en el centro» (es tò méson), a la vista y al alcance igualitario de la comunidad (Vernant, 1992, pp. 64-67).",
              "La ley escrita (nómos) garantiza permanencia y fijeza objetiva: arrebata la justicia al arbitrio de los magistrados nobles y asegura una medida común aplicable a todos (Vernant, 1992, pp. 66-68)."
            ],
            keyTerms: ["es tò méson", "génē", "ágora", "nómos"],
            citation: "Vernant, 1992, pp. 64-68"
          },
          {
            id: "t3-s2-n3",
            title: "La revolución hoplítica y la invención de la 'isonomía'",
            points: [
              "Transformación táctica: la proeza aislada del aristócrata en carro cede ante la formación compacta de la infantería hoplítica (Vernant, 1992, pp. 68-72).",
              "En la falange, el arrebato individual desmedido (lýssa) es reemplazado por la templanza, la disciplina y la cohesión de grupo (sōphrosýnē), donde cada combatiente protege a su vecino (Vernant, 1992, pp. 70-74).",
              "Surgimiento de la isonomía: los ciudadanos se reconocen como semejantes (hómoioi) e iguales (ísoi); el orden cívico pasa de ser una pirámide vertical a un círculo simétrico donde las magistraturas rotan (Vernant, 1992, pp. 74-79)."
            ],
            keyTerms: ["lýssa", "sōphrosýnē", "isonomía", "hómoioi", "ísoi"],
            citation: "Vernant, 1992, pp. 68-79"
          }
        ]
      }
    ],
    bibliography: [
      {
        author: "Detienne, M.",
        year: "1981",
        title: "La memoria del poeta. En Los maestros de verdad en la Grecia arcaica (J. J. Herrera, Trad., pp. 21-38)",
        publisher: "Taurus"
      },
      {
        author: "Vernant, J.-P.",
        year: "1992",
        title: "El universo espiritual de la polis. En Los orígenes del pensamiento griego (pp. 61-79)",
        publisher: "Paidós"
      }
    ],
    suggestedQuestions: [
      "¿Por qué Alétheia no se opone a la mentira sino a Léthē en Marcel Detienne?",
      "¿Qué significa llevar el poder «al centro» (es tò méson) tras la caída del Ánax?",
      "¿Cómo transformó la falange hoplítica la ética aristocrática en sōphrosýnē e isonomía?"
    ]
  },
  {
    id: 4,
    code: "TEMA 04",
    shortTitle: "Mito, tragedia y democracia",
    fullTitle: "Tema 4: Mito y tragedia. La emergencia del enigma y la democracia",
    subtitle: "Autoinstitución democrática sobre el chãos, tragedia e igualdad de palabra en el siglo V",
    authors: ["Cornelius Castoriadis", "Jacqueline de Romilly"],
    keyConcepts: ["autoinstitución", "heteronomía", "nómoi", "chãos", "hýbris", "ekklēsía", "isēgoría", "parrhēsía", "doxa", "Heliea", "xénoi"],
    markmapAssetPath: "/assets/aistudio/tema4_fe3b3701.html",
    nexusWithPrevious: {
      title: "Nexo con el Tema 3: Del centro cívico al abismo de la interrogación",
      points: [
        "En el Tema 3, la soberanía se secularizó al colocarse «en el centro» (es tò méson), fundando el espacio de la pólis y la igualdad geométrica de la isonomía (Vernant, 1992, pp. 61-79).",
        "En el Tema 4, esa palabra compartida en el ágora alcanza su punto más radical y problemático en la Atenas del siglo V a.C. (Castoriadis, 1988; Romilly, 1997).",
        "La democracia no es solo una técnica de gobierno, sino la asunción de que la ley carece de fundamento sagrado exterior: coemerge con la filosofía y la tragedia como formas de confrontar el enigma y la responsabilidad colectiva."
      ]
    },
    polisLogosConnection: "Muestra la radicalización democrática de la pólis y del lógos: la sociedad rompe la heteronomía mítica y se sabe autora de sus propias leyes (nómoi) sobre el abismo sin garantías del chãos, institucionalizando el debate (isēgoría, parrhēsía) y la autolimitación frente a la hýbris mediante la tragedia.",
    sections: [
      {
        id: "t4-s1",
        number: "4.1",
        title: "La pólis griega y la creación de la democracia",
        author: "Cornelius Castoriadis",
        workYear: "1988",
        subNodes: [
          {
            id: "t4-s1-n1",
            title: "La democracia como autoinstitución explícita y coemergencia con la filosofía",
            points: [
              "Ruptura radical con la heteronomía tradicional: las sociedades previas justificaban sus leyes como mandatos de los dioses, ancestros o el orden cósmico natural (Castoriadis, 1988, pp. 97-105).",
              "La pólis democrática nace cuando la comunidad reconoce conscientemente que las leyes (nómoi) son su propia creación y responsabilidad histórica, abriendo la pregunta ilimitada: «¿es justa esta ley?» (Castoriadis, 1988, pp. 102-112).",
              "Política y filosofía coemergen en el mismo suelo: así como la política cuestiona las instituciones heredadas, la filosofía cuestiona las representaciones heredadas del saber (Castoriadis, 1988, pp. 108-118)."
            ],
            keyTerms: ["autoinstitución", "heteronomía", "nómoi"],
            citation: "Castoriadis, 1988, pp. 97-118"
          },
          {
            id: "t4-s1-n2",
            title: "El trasfondo del 'chãos' y la dimensión trágica de la democracia",
            points: [
              "El horizonte ontológico griego parte del abismo: el fondo último del ser es chãos, vacío, ausencia de sentido providencial predeterminado (Castoriadis, 1988, pp. 115-122).",
              "Rechazo del más allá compensatorio: el ser humano está abocado a la finitud mortal sin un Dios salvador (Castoriadis, 1988, pp. 118-124).",
              "La creación democrática es trágica: los hombres deben autolimitarse y darse orden en el borde mismo de la nada y del peligro constante de la desmesura (hýbris) (Castoriadis, 1988, pp. 120-126)."
            ],
            keyTerms: ["chãos", "hýbris", "autolimitación trágica"],
            citation: "Castoriadis, 1988, pp. 115-126"
          },
          {
            id: "t4-s1-n3",
            title: "Democracia directa, 'ekklēsía' y sorteo de magistraturas",
            points: [
              "Identidad entre gobernantes y gobernados: la pólis no concibe un Estado burocrático separado de la sociedad civil (Castoriadis, 1988, pp. 123-128).",
              "La soberanía reside en la asamblea viva (ekklēsía), sustentada en la igualdad de palabra (isēgoría) y en la franqueza ética al decir la verdad (parrhēsía) (Castoriadis, 1988, pp. 125-129).",
              "El sorteo de magistraturas parte de la premisa democrática de que no existen «expertos» en política; todo ciudadano posee el juicio político básico (doxa) (Castoriadis, 1988, pp. 128-131)."
            ],
            keyTerms: ["ekklēsía", "isēgoría", "parrhēsía", "doxa"],
            citation: "Castoriadis, 1988, pp. 123-131"
          }
        ]
      },
      {
        id: "t4-s2",
        number: "4.2",
        title: "El siglo V y la democracia ateniense",
        author: "Jacqueline de Romilly",
        workYear: "1997",
        subNodes: [
          {
            id: "t4-s2-n1",
            title: "La libertad como obediencia consentida a la ley y centralidad del 'lógos'",
            points: [
              "En el choque con el despotismo persa, el griego define su libertad no como anarquía, sino como sometimiento voluntario a una regla común (nómos) nacida de la deliberación entre iguales (Romilly, 1997, pp. 87-92).",
              "En la asamblea y en los tribunales del Heliea, la fórmula ritual «¿quién quiere tomar la palabra?» abre la tribuna a todo ciudadano, ligando la política a la capacidad argumentativa (Romilly, 1997, pp. 92-97).",
              "La retórica nace como instrumento práctico del litigio y de la asamblea, convirtiéndose en una herramienta general de análisis intelectual (Romilly, 1997, pp. 96-98)."
            ],
            keyTerms: ["nómos", "lógos", "Heliea", "retórica cívica"],
            citation: "Romilly, 1997, pp. 87-98"
          },
          {
            id: "t4-s2-n2",
            title: "Igualdad cívica ('isonomía', 'isēgoría') e ideal de tolerancia",
            points: [
              "La fijeza de las leyes escritas protege al débil contra la arbitrariedad del poderoso y consagra el contrato social que Sócrates personificará en el Critón (Romilly, 1997, pp. 98-104).",
              "Frente a la rigidez cuartelaria de Esparta, el discurso fúnebre de Pericles en Tucídides celebra la indulgencia y falta de suspicacia hacia la vida privada del vecino (Romilly, 1997, pp. 104-108).",
              "Apertura y hospitalidad hacia los extranjeros (xénoi), rechazo del secreto de Estado y confianza en la concordia moral (Romilly, 1997, pp. 107-110)."
            ],
            keyTerms: ["isonomía", "isēgoría", "Critón", "xénoi"],
            citation: "Romilly, 1997, pp. 98-110"
          }
        ]
      }
    ],
    bibliography: [
      {
        author: "Castoriadis, C.",
        year: "1988",
        title: "La polis griega y la creación de la democracia. En Los dominios del hombre: Las encrucijadas del laberinto (pp. 97-131)",
        publisher: "Gedisa"
      },
      {
        author: "Romilly, J. de",
        year: "1997",
        title: "El siglo V y la democracia. En ¿Por qué Grecia? (pp. 87-110)",
        publisher: "Debate"
      }
    ],
    suggestedQuestions: [
      "¿Por qué afirma Castoriadis que la democracia es la autoinstitución explícita sobre el chãos?",
      "¿Qué relación existe entre isēgoría, parrhēsía y el sorteo de cargos en Atenas?",
      "¿Cómo articula Jacqueline de Romilly la relación entre libertad, nómos y retórica en el siglo V?"
    ]
  },
  {
    id: 5,
    code: "TEMA 05",
    shortTitle: "Mito, logos y sofística",
    fullTitle: "Tema 5: Mito y logos. La separación del mito y el logos",
    subtitle: "Efecto sofístico y logología, invención socrático-platónica de la razón y retórica fúnebre cívica",
    authors: ["Barbara Cassin", "François Châtelet", "Nicole Loraux"],
    keyConcepts: ["logología", "ontología", "phármakon", "Peithō", "sēmaínein ti", "tί esti", "Eídē", "epistémē", "doxa", "epitáphios lógos", "stásis", "autoctonía"],
    markmapAssetPath: "/assets/aistudio/tema5_cb2b06df.html",
    nexusWithPrevious: {
      title: "Nexo con el Tema 4: De la tragedia democrática a la guerra por el logos",
      points: [
        "En el Tema 4, la democracia instituyó la palabra pública deliberativa y la confrontación trágica con el vacío de fundamento (Castoriadis, 1988; Romilly, 1997).",
        "En el Tema 5, ese mismo lógos cívico deja de ser un vehículo pacífico o neutral y se convierte en el campo de batalla decisivo.",
        "Se consuma la triple disputa: la sofística proclama la soberanía creadora del lenguaje (logología), la filosofía platónico-aristotélica amarra la palabra a la verdad objetiva y al principio de no contradicción, y la retórica del epitáphios lógos fabrica el mito ideológico de una Atenas indivisa (Cassin, 2008; Châtelet, 1993; Loraux, 2012)."
      ]
    },
    polisLogosConnection: "Culmina la tensión entre pólis y lógos: muestra cómo el discurso democrático estalla entre la autonomía performativa de la sofística (logología y phármakon), la reacción conceptual metafísica de Sócrates, Platón y Aristóteles (tί esti, Eídē, sēmaínein ti), y el retorno de un mito político-ideológico en la oración fúnebre que oculta la stásis.",
    sections: [
      {
        id: "t5-s1",
        number: "5.1",
        title: "El efecto sofístico y la soberanía del lenguaje",
        author: "Barbara Cassin",
        workYear: "2008",
        subNodes: [
          {
            id: "t5-s1-n1",
            title: "Gorgias frente a Parménides: de la ontología a la 'logología'",
            points: [
              "Subversión paródica de la ontología eleática en el Tratado sobre el no ser de Gorgias: 1) nada es; 2) si algo fuese, sería incognoscible; 3) si fuese cognoscible, sería incomunicable (Cassin, 2008, pp. 24-29).",
              "Quiebra de la identidad parmenídea entre ser, pensar y decir: el «Ser» no es una realidad previa develada, sino un efecto sintáctico producido por el propio discurso (logología) (Cassin, 2008, pp. 28-36).",
              "La palabra como phármakon y déspota poderoso (Encomio de Helena): con un cuerpo diminuto e invisible, el lógos cautiva el alma, engendra persuasión (Peithō) y modela las opiniones (Cassin, 2008, pp. 36-39)."
            ],
            keyTerms: ["logología", "ontología", "phármakon", "Peithō"],
            citation: "Cassin, 2008, pp. 24-39"
          },
          {
            id: "t5-s1-n2",
            title: "La réplica aristotélica: el principio de no contradicción (Metafísica Gamma)",
            points: [
              "Aristóteles busca refutar el relativismo sofístico imponiendo un axioma irreductible para la inteligibilidad (Cassin, 2008, pp. 39-42).",
              "Exigencia del significado unívoco: hablar (légein ti) equivale necesariamente a significar algo determinado (sēmaínein ti) para sí y para los demás (Cassin, 2008, pp. 41-44).",
              "Si el sofista rechaza significar una esencia única y afirma contradictorios a la vez, se excluye del diálogo cívico y queda reducido a la condición de una «planta que habla» (Cassin, 2008, pp. 43-45)."
            ],
            keyTerms: ["légein ti", "sēmaínein ti", "principio de no contradicción"],
            citation: "Cassin, 2008, pp. 39-45"
          }
        ]
      },
      {
        id: "t5-s2",
        number: "5.2",
        title: "La invención de la razón",
        author: "François Châtelet",
        workYear: "1993",
        subNodes: [
          {
            id: "t5-s2-n1",
            title: "Origen político de la racionalidad y el alumbramiento socrático del concepto",
            points: [
              "La razón (lógos) no es una facultad intemporal, sino una invención cultural nacida de las prácticas políticas y judiciales del ágora ateniense en el siglo V a.C. (Châtelet, 1993, pp. 15-26).",
              "Sócrates toma las herramientas dialécticas de la ciudad, pero invierte la retórica mercenaria mediante la ironía y la refutación de la doxa (Châtelet, 1993, pp. 26-31).",
              "La exigencia de la definición formal: preguntar «¿qué es?» (tί esti) inaugura la razón conceptual al buscar la esencia universal de la justicia o el valor más allá de los ejemplos particulares (Châtelet, 1993, pp. 30-33)."
            ],
            keyTerms: ["lógos", "ágora", "doxa", "tί esti"],
            citation: "Châtelet, 1993, pp. 15-33"
          },
          {
            id: "t5-s2-n2",
            title: "La refundación platónica de la verdad contra la demagogia",
            points: [
              "Ante una democracia que condena a Sócrates y degenera en demagogia, Platón busca un fundamento inmutable que sustraiga la verdad al voto de la mayoría (Châtelet, 1993, pp. 32-35).",
              "La dialéctica y el mundo de las Ideas (Eídē): postulación de un orden trascendente de esencias inteligibles como único soporte de la ciencia verdadera (epistémē) frente a la doxa sofística (Châtelet, 1993, pp. 33-37)."
            ],
            keyTerms: ["Eídē", "epistémē", "doxa", "dialéctica"],
            citation: "Châtelet, 1993, pp. 32-37"
          }
        ]
      },
      {
        id: "t5-s3",
        number: "5.3",
        title: "La retórica fúnebre y la invención ideológica de Atenas",
        author: "Nicole Loraux",
        workYear: "2012",
        subNodes: [
          {
            id: "t5-s3-n1",
            title: "El 'epitáphios lógos' y el mito de la autoctonía",
            points: [
              "La oración fúnebre anual en el Cerámico (epitáphios lógos) celebra oficialmente a los ciudadanos caídos por la ciudad (Loraux, 2012, pp. 237-239).",
              "El discurso no hace historia empírica: fabrica una Atenas imaginaria, eterna e indivisa donde lo mítico y lo político se funden (Loraux, 2012, pp. 237-241).",
              "El mito de la autoctonía (todos los atenienses nacidos de la misma tierra del Ática) naturaliza la igualdad ciudadana y legitima la superioridad cívica de Atenas (Loraux, 2012, pp. 239-243)."
            ],
            keyTerms: ["epitáphios lógos", "autoctonía", "Cerámico"],
            citation: "Loraux, 2012, pp. 237-243"
          },
          {
            id: "t5-s3-n2",
            title: "Los problemas de un 'lógos politikós': el silenciamiento de la 'stásis'",
            points: [
              "Operación ideológica del elogio: conjurar y silenciar la división interna, la guerra civil (stásis) y el conflicto entre ricos y pobres (Loraux, 2012, pp. 242-245).",
              "El poder conflictivo del pueblo (krátos) se maquilla como consenso armónico y virtud aristocrática colectiva (Loraux, 2012, pp. 244-247).",
              "La «muerte bella» heroica es expropiada por la ciudad: el ciudadano pierde su individualidad para fundirse en el anonimato glorioso de la patria ateniense (Loraux, 2012, pp. 245-248)."
            ],
            keyTerms: ["lógos politikós", "stásis", "krátos", "muerte bella"],
            citation: "Loraux, 2012, pp. 242-248"
          }
        ]
      }
    ],
    bibliography: [
      {
        author: "Cassin, B.",
        year: "2008",
        title: "El efecto sofístico (A. P. Vivanco, Trad., pp. 24-45)",
        publisher: "Fondo de Cultura Económica"
      },
      {
        author: "Châtelet, F.",
        year: "1993",
        title: "La invención de la razón. En Una historia de la razón: Conversaciones con Émile Noël (pp. 15-37)",
        publisher: "Nueva Visión"
      },
      {
        author: "Loraux, N.",
        year: "2012",
        title: "Los problemas de un logos politikós. En La invención de Atenas: Historia de la oración fúnebre en la «ciudad clásica» (pp. 237-248)",
        publisher: "Katz Editores"
      }
    ],
    suggestedQuestions: [
      "¿Qué es la logología en Barbara Cassin y por qué Aristóteles reduce al sofista a una «planta que habla»?",
      "¿Cómo nace la razón conceptual (tί esti y Eídē) a partir de la crisis del ágora según Châtelet?",
      "¿Cómo opera el epitáphios lógos para silenciar la stásis en la democracia ateniense según Loraux?"
    ]
  }
];

export const GREEK_CONCEPTS: GreekConcept[] = [
  {
    id: "kosmos",
    term: "kósmos",
    greek: "κόσμος",
    translation: "Orden armónico, belleza y totalidad",
    themeId: 1,
    author: "Jean-Pierre Vernant",
    definition: "Totalidad ordenada, viva y justa donde naturaleza, dioses y hombres coexisten sin la escisión moderna entre sujeto pensante y objeto inerte.",
    polisLogosRelation: "El orden del kósmos sirve de modelo y espejo para el orden geométrico de la pólis; romper su proporción mediante la desmesura (hýbris) amenaza tanto a la ciudad como al universo.",
    citation: "Vernant, 1995, pp. 21-22"
  },
  {
    id: "physis",
    term: "phýsis",
    greek: "φύσις",
    translation: "Naturaleza viva, brotar o potencia dinámica",
    themeId: 1,
    author: "Jean-Pierre Vernant / Pierre Hadot",
    definition: "Potencia animada, fecunda y «demoníaca» (daimonía) en constante génesis. En Mileto, los primeros pensadores buscan explicarla por observación racional (historia) sin recurrir a genealogías míticas.",
    polisLogosRelation: "La investigación racional de la phýsis inaugura el lógos filosófico en Jonia, que luego entrará en tensión con el nómos (convención/ley) en el debate sofístico de la pólis.",
    citation: "Vernant, 1995, pp. 21-22; Hadot, 1998, pp. 23-25"
  },
  {
    id: "hybris",
    term: "hýbris",
    greek: "ὕβρις",
    translation: "Desmesura, insolencia o transgresión de límites",
    themeId: 1,
    author: "Jean-Pierre Vernant / Cornelius Castoriadis",
    definition: "Falta cardinal del mortal que olvida su finitud e intenta igualarse a los dioses inmortales (athanatoi) o imponer su violencia sin medida sobre la comunidad.",
    polisLogosRelation: "En la pólis democrática (Tema 4), como no existe una ley divina exterior que frene al hombre sobre el chãos, evitar la hýbris exige la autolimitación consciente del cuerpo ciudadano y la reflexión trágica.",
    citation: "Vernant, 1995, pp. 16-17; Castoriadis, 1988, pp. 120-126"
  },
  {
    id: "time",
    term: "timé",
    greek: "τιμή",
    translation: "Honor, rango y estimación pública reconocida",
    themeId: 1,
    author: "Jean-Pierre Vernant / Sarah B. Pomeroy",
    definition: "Valor social objetivo de un individuo medido en el espejo de la mirada de sus pares y materializado en privilegios o botín (géras, incluidas las mujeres cautivas en Homero).",
    polisLogosRelation: "Define la antropología agonística arcaica; la emergencia de la pólis hoplítica (Tema 3) obligará a subordinar la timé heroica individual a la sōphrosýnē y la isonomía ciudadana.",
    citation: "Vernant, 1995, pp. 27-28; Pomeroy, 1987, pp. 40-41"
  },
  {
    id: "kleos",
    term: "kléos áphthiton",
    greek: "κλέος ἄφθιτον",
    translation: "Gloria imperecedera transmitida por el canto",
    themeId: 1,
    author: "Jean-Pierre Vernant / Marcel Detienne",
    definition: "Rumor glorioso y memoria comunitaria viva que rescata al héroe del anonimato sombrío del Hades gracias al canto poético inspirado por las Musas.",
    polisLogosRelation: "En la Grecia arcaica (Temas 1 y 3) depende del aoidós; en la Atenas clásica (Tema 5, Loraux), la pólis expropia el kléos individual mediante el epitáphios lógos para glorificar colectivamente a la ciudad.",
    citation: "Vernant, 1995, pp. 29-31; Detienne, 1981, pp. 31-38"
  },
  {
    id: "epikleros",
    term: "epiklēros",
    greek: "ἐπίκληρος",
    translation: "Heredera ateniense adscrita al patrimonio paterno",
    themeId: 1,
    author: "Sarah B. Pomeroy",
    definition: "Hija única de un ciudadano ateniense fallecido sin hijos varones; bajo la ley de Solón, no posee libremente la tierra sino que debe casarse con el pariente varón más próximo para conservar el oîkos.",
    polisLogosRelation: "Revela la contradicción material de la pólis democrática ateniense: mientras los varones conquistan la isonomía en el ágora, las mujeres quedan recluidas en el gineceo bajo tutela perpetua del kýrios.",
    citation: "Pomeroy, 1987, pp. 73-78"
  },
  {
    id: "metaxy",
    term: "metaxy",
    greek: "μεταξύ",
    translation: "El intervalo o condición intermedia",
    themeId: 1,
    author: "Pierre Hadot",
    definition: "Estatuto ontológico de Eros y de Sócrates en el Banquete: situado a medio camino entre la sabiduría plena de los dioses (sophia) y la ignorancia cerrada del necio.",
    polisLogosRelation: "Redefine el lógos filosófico dentro de la pólis: frente al sofista que vende un saber acabado para triunfar en la asamblea, el filósofo habita la interrogación crítica y el modo de vida (bios).",
    citation: "Hadot, 1998, pp. 45-53"
  },
  {
    id: "mimesis",
    term: "mímesis",
    greek: "μίμησις",
    translation: "Identificación imitativa y encarnación dramática",
    themeId: 2,
    author: "Eric A. Havelock",
    definition: "Mecanismo psicofisiológico de la oralidad primaria mediante el cual el aeda y el auditorio se fusionan afectiva, rítmica y corporalmente con las acciones recitadas para preservar la enciclopedia social.",
    polisLogosRelation: "Platón expulsa a los poetas en la República porque la mímesis hipnótica impide la distancia crítica necesaria para que la psychē del ciudadano razone autónomamente mediante conceptos.",
    citation: "Havelock, 1996, pp. 19-39"
  },
  {
    id: "psyche",
    term: "psychē",
    greek: "ψυχή",
    translation: "Alma reflexiva e interioridad consciente",
    themeId: 2,
    author: "Eric A. Havelock",
    definition: "De ser un simple «doble» o soplo vital fantasmagórico en Homero, pasa a convertirse en el sujeto moral y epistémico capaz de pensar abstractamente gracias a la separación entre hablante y texto escrito.",
    polisLogosRelation: "La constitución de la psychē letrada posibilita el juicio individual autónomo y el examen crítico de las leyes y opiniones en la pólis clásica.",
    citation: "Havelock, 1996, pp. 113-133"
  },
  {
    id: "estin",
    term: "estin",
    greek: "ἔστιν",
    translation: "«Es» (verbo copulativo y sintaxis ontológica)",
    themeId: 2,
    author: "Eric A. Havelock",
    definition: "Sustitución de la narrativa oral de acciones singulares («Aquiles mata a Héctor») por enunciados intemporales de esencia («La justicia es una virtud») propiciada por la fijeza visual de la escritura alfabética.",
    polisLogosRelation: "Suministra la arquitectura gramatical del lógos filosófico y científico (la pregunta socrática tί esti y la ontología platónico-aristotélica).",
    citation: "Havelock, 1996, pp. 113-133"
  },
  {
    id: "mneme-hypomnesis",
    term: "mnēmē / hypómnēsis",
    greek: "μνήμη / ὑπόμνησις",
    translation: "Memoria viva interior frente a recordatorio mecánico exterior",
    themeId: 2,
    author: "Walter J. Ong",
    definition: "Oposición formulada por Platón en el mito de Teuth (Fedro): la escritura es acusada de atrofiar la memoria viva (mnēmē) sustituyéndola por marcas externas inertes (hypómnēsis).",
    polisLogosRelation: "Encarna la paradoja del lógos escrito: Platón critica el texto escrito como mudo e indefenso, pero su propia dialéctica filosófica es hija directa de la tecnología alfabética.",
    citation: "Ong, 1997, pp. 81-116"
  },
  {
    id: "hyponoia",
    term: "hyponoia",
    greek: "ὑπόνοια",
    translation: "Sentido subyacente o interpretación alegórica",
    themeId: 2,
    author: "Marcel Detienne",
    definition: "Estrategia hermenéutica inaugurada por pensadores como Teágenes de Regio para salvar a los poemas homéricos del «escándalo de la razón» postulando una verdad física o moral oculta bajo la fábula.",
    polisLogosRelation: "Marca el momento en que la escritura objetiva al mythos convirtiéndolo en «mitología» sospechosa frente a las exigencias morales y racionales de la pólis.",
    citation: "Detienne, 1985, cap. I"
  },
  {
    id: "mnemosyne",
    term: "Mnēmosýnē",
    greek: "Μνημοσύνη",
    translation: "Memoria sacralizada y omnisciencia poética",
    themeId: 3,
    author: "Marcel Detienne",
    definition: "Potencia religiosa y adivinatoria (madre de las Musas) que otorga al poeta inspirado (aoidós) la videncia directa de «lo que es, lo que será y lo que fue».",
    polisLogosRelation: "Pertenece al régimen pre-político de los «maestros de verdad», anterior a la secularización de la palabra en el debate público de la pólis.",
    citation: "Detienne, 1981, pp. 21-28"
  },
  {
    id: "krainein",
    term: "krainein",
    greek: "κραίνειν",
    translation: "Realizar, cumplir o hacer advenir mediante la palabra",
    themeId: 3,
    author: "Marcel Detienne",
    definition: "Fuerza performativa y mágico-religiosa del verbo del poeta, del adivino y del rey de justicia arcaico: la palabra no representa una realidad externa, sino que la instaura en el ser.",
    polisLogosRelation: "Contrasta con el lógos argumentativo de la pólis, donde la palabra ya no decreta verticalmente (krainein) sino que debe persuadir (Peithō) a una asamblea de iguales.",
    citation: "Detienne, 1981, pp. 28-34"
  },
  {
    id: "aletheia-lethe",
    term: "Alétheia / Léthē",
    greek: "Ἀλήθεια / Λήθη",
    translation: "Verdad (Desocultamiento) frente a Olvido (Silencio y Muerte)",
    themeId: 3,
    author: "Marcel Detienne",
    definition: "En el pensamiento arcaico, Alétheia no se opone a la mentira lógica (pseûdos), sino a Léthē (el Olvido nocturno del Hades). Cantar con Alétheia es arrancar la hazaña del silencio letal.",
    polisLogosRelation: "Muestra la genealogía arcaica de la verdad antes de que la filosofía clásica (Platón y Aristóteles en el Tema 5) redefina la verdad como adecuación intelectual y coherencia lógica.",
    citation: "Detienne, 1981, pp. 34-38"
  },
  {
    id: "es-to-meson",
    term: "es tò méson",
    greek: "ἐς τὸ μέσον",
    translation: "«Hacia el centro» o depositado en el espacio común",
    themeId: 3,
    author: "Jean-Pierre Vernant",
    definition: "Acto fundacional de la pólis tras el derrumbe del palacio micénico (Ánax): los asuntos comunes, el botín, el culto y las decisiones se colocan en medio de la asamblea, a la vista de todos.",
    polisLogosRelation: "Transforma la geometría del poder y el estatuto del lógos: la palabra se vuelve pública, visible y sujeta a contradicción en el ágora.",
    citation: "Vernant, 1992, pp. 64-67"
  },
  {
    id: "isonomia",
    term: "isonomía",
    greek: "ἰσονομία",
    translation: "Igualdad de derechos y participación simétrica en la ley",
    themeId: 3,
    author: "Jean-Pierre Vernant / Jacqueline de Romilly",
    definition: "Principio político según el cual los ciudadanos se reconocen como semejantes (hómoioi) e iguales (ísoi) dentro de un cosmos cívico circular, impulsado por la cohesión de la falange hoplítica y las leyes escritas.",
    polisLogosRelation: "Constituye la columna vertebral de la pólis clásica y prepara la democracia radical ateniense del siglo V (Tema 4).",
    citation: "Vernant, 1992, pp. 74-79; Romilly, 1997, pp. 98-104"
  },
  {
    id: "sophrosyne",
    term: "sōphrosýnē",
    greek: "σωφροσύνη",
    translation: "Templanza, dominio de sí y moderación cívica",
    themeId: 3,
    author: "Jean-Pierre Vernant",
    definition: "Virtud ciudadana nacida de la disciplina de la falange hoplítica, que rechaza el furor guerrero individualista (lýssa) del héroe homérico en favor del equilibrio común y la sujeción a la fila.",
    polisLogosRelation: "Permite pacificar la rivalidad agonística dentro de la pólis para que el conflicto se dirima mediante el lógos y el nómos.",
    citation: "Vernant, 1992, pp. 70-74"
  },
  {
    id: "chaos-autoinstitucion",
    term: "chãos / autoinstitución",
    greek: "χάος / αὐτονομία",
    translation: "Abismo sin sentido predeterminado y creación consciente de la ley",
    themeId: 4,
    author: "Cornelius Castoriadis",
    definition: "Reconocimiento griego de que el ser emerge sobre el abismo (chãos) sin garantía divina ni providencia, lo que obliga a la pólis a saberse creadora explícita de sus propias leyes (nómoi).",
    polisLogosRelation: "Explica por qué democracia, filosofía y tragedia nacen juntas: la ciudad usa el lógos deliberativo para autolimitarse frente al vacío y al riesgo de la hýbris.",
    citation: "Castoriadis, 1988, pp. 97-126"
  },
  {
    id: "isegoria-parrhesia",
    term: "isēgoría / parrhēsía",
    greek: "ἰσηγορία / παρρησία",
    translation: "Igualdad de palabra en la asamblea y coraje de decir la verdad",
    themeId: 4,
    author: "Cornelius Castoriadis / Jacqueline de Romilly",
    definition: "Derecho efectivo de todo ciudadano a tomar la palabra en la ekklēsía («¿quién quiere hablar?») unido a la obligación moral de hablar con franqueza asumiendo el riesgo político.",
    polisLogosRelation: "Encarna la materialización institucional del lógos democrático directo, sin representación burocrática ni expertos separados del demos.",
    citation: "Castoriadis, 1988, pp. 125-129; Romilly, 1997, pp. 92-97"
  },
  {
    id: "logologia",
    term: "logología",
    greek: "λογολογία",
    translation: "Soberanía del discurso que produce al Ser como efecto",
    themeId: 5,
    author: "Barbara Cassin",
    definition: "Concepto acuñado para describir el giro de Gorgias frente a Parménides: el ser no antecede a la palabra (ontología), sino que es una creación sintáctica y persuasiva del propio lenguaje.",
    polisLogosRelation: "Lleva al extremo la potencia política de la retórica en la pólis: el lógos actúa como un phármakon (remedio/veneno) capaz de modelar el alma y decidir el rumbo de la ciudad.",
    citation: "Cassin, 2008, pp. 24-39"
  },
  {
    id: "semainein-ti",
    term: "sēmaínein ti",
    greek: "σημαίνειν τι",
    translation: "Significar algo único y determinado",
    themeId: 5,
    author: "Barbara Cassin",
    definition: "Exigencia impuesta por Aristóteles en el libro Gamma de la Metafísica para fundar el principio de no contradicción y refutar a la sofística: hablar con sentido exige fijar una esencia estable.",
    polisLogosRelation: "Intenta domesticar la plasticidad peligrosa del lógos sofístico en la pólis: quien se niega a significar algo unívoco queda expulsado del diálogo racional como una «planta que habla».",
    citation: "Cassin, 2008, pp. 39-45"
  },
  {
    id: "ti-esti-eide",
    term: "tί esti / Eídē",
    greek: "τί ἐστι / Εἴδη",
    translation: "«¿Qué es?» (definición universal) e Ideas inteligibles",
    themeId: 5,
    author: "François Châtelet",
    definition: "Operación socrático-platónica que arranca al lenguaje del relativismo de la opinión (doxa) exigiendo definir la esencia universal (tί esti) y anclándola en realidades inteligibles inmutables (Eídē).",
    polisLogosRelation: "Constituye la «invención de la razón» filosófica (epistémē) como respuesta directa a la crisis de la democracia ateniense y al juicio de Sócrates.",
    citation: "Châtelet, 1993, pp. 26-37"
  },
  {
    id: "epitaphios-stasis",
    term: "epitáphios lógos / stásis",
    greek: "ἐπιτάφιος λόγος / στάσις",
    translation: "Oración fúnebre cívica frente a Guerra civil o fractura interna",
    themeId: 5,
    author: "Nicole Loraux",
    definition: "Discurso oficial anual ateniense que invoca el mito de la autoctonía y la «muerte bella» colectiva para construir una imagen ideal e indivisa de Atenas, ocultando la realidad conflictiva de la stásis.",
    polisLogosRelation: "Demuestra que la separación entre mythos y lógos nunca fue absoluta en la pólis: el lógos politikós fabrica un nuevo mito ideológico de Estado para negar la división social.",
    citation: "Loraux, 2012, pp. 237-248"
  }
];

export const AUTHORS: AuthorProfile[] = [
  {
    id: "vernant",
    name: "Jean-Pierre Vernant",
    themes: [1, 3],
    work: "El hombre griego (1995) / Los orígenes del pensamiento griego (1992)",
    coreThesis: "El hombre griego habita un kósmos vivo donde su identidad es exterior y especular (timé, kléos); tras el colapso del Ánax micénico, la puesta del poder «en el centro» (es tò méson) y la falange hoplítica engendran la pólis y la isonomía.",
    polisLogosProblem: "Demuestra que la razón griega no nació de un «milagro» abstracto, sino de la secularización de la soberanía y la práctica de la palabra-debate en el ágora.",
    keyConcepts: ["kósmos", "phýsis", "hýbris", "timé", "kléos", "Ánax", "es tò méson", "isonomía", "sōphrosýnē"]
  },
  {
    id: "pomeroy",
    name: "Sarah B. Pomeroy",
    themes: [1],
    work: "Diosas, rameras, esposas y esclavas (1987)",
    coreThesis: "Desmonta la idealización masculina de Grecia analizando la subordinación material y jurídica de las mujeres desde el botín homérico (géras) hasta la reclusión en el gineceo ateniense (kýrios, epiklēros) en contraste con Esparta y Gortina.",
    polisLogosProblem: "Evidencia que la democracia y el espacio público del lógos en la Atenas jónica descansaban sobre la exclusión política y patrimonial de las mujeres libres y esclavas.",
    keyConcepts: ["géras", "timé", "kýrios", "epiklēros", "gineceo"]
  },
  {
    id: "hadot",
    name: "Pierre Hadot",
    themes: [1],
    work: "¿Qué es la filosofía antigua? (1998)",
    coreThesis: "Traza el paso desde la historia jónica de la phýsis y la paideia aristocrática hasta la figura de Sócrates como Eros y metaxy en el Banquete: la filosofía antigua no es teoría libresca, sino elección existencial y modo de vida (bios).",
    polisLogosProblem: "Muestra cómo la interrogación socrática irrumpe en la pólis para cuestionar tanto la tradición nobiliaria como el pragmatismo retórico sofístico.",
    keyConcepts: ["phýsis", "paideia", "areté", "Eros", "metaxy", "bios"]
  },
  {
    id: "havelock",
    name: "Eric A. Havelock",
    themes: [2],
    work: "La musa aprende a escribir (1996)",
    coreThesis: "La poesía homérica era una enciclopedia oral conservada mediante mímesis rítmica y corporal; la invención del alfabeto fonético griego separó al hablante del texto, creando la sintaxis del Ser (estin) y la conciencia individual crítica (psychē).",
    polisLogosProblem: "Explica la expulsión platónica de los poetas como una batalla epistemológica por liberar a la pólis de la hipnosis mimética oral e instaurar el lógos conceptual.",
    keyConcepts: ["nómos", "éthos", "mímesis", "estin", "psychē"]
  },
  {
    id: "ong",
    name: "Walter J. Ong",
    themes: [2],
    work: "Oralidad y escritura: Tecnologías de la palabra (1997)",
    coreThesis: "La escritura es una tecnología artificial que, al interiorizarse, reorganiza los sentidos del oído a la vista, instaura el «discurso autónomo» y permite el pensamiento analítico que el propio Platón usa para criticarla en el Fedro.",
    polisLogosProblem: "Ilumina la tensión entre la palabra viva del debate presencial en la pólis (mnēmē) y la palabra escrita (hypómnēsis) que posibilita las leyes fijas y la ciencia filosófica.",
    keyConcepts: ["mnēmē", "hypómnēsis", "discurso autónomo", "Fedro"]
  },
  {
    id: "detienne",
    name: "Marcel Detienne",
    themes: [2, 3],
    work: "Los maestros de verdad en la Grecia arcaica (1981) / La invención de la mitología (1985)",
    coreThesis: "En el mundo arcaico, el poeta es un «maestro de verdad» cuya palabra eficaz (krainein) guiada por Mnēmosýnē desoculta (Alétheia) frente al Olvido (Léthē). Con la escritura, el relato vivo se congela, escandaliza a la razón cívica y nace la «mitología» y la alegoría (hyponoia).",
    polisLogosProblem: "Conecta ambos extremos de la transición: la pérdida de la eficacia sagrada del canto ante la emergencia del espacio público y la crítica letrada del mito en la ciudad.",
    keyConcepts: ["Mnēmosýnē", "krainein", "Alétheia", "Léthē", "mythos", "hyponoia"]
  },
  {
    id: "castoriadis",
    name: "Cornelius Castoriadis",
    themes: [4],
    work: "La polis griega y la creación de la democracia (1988)",
    coreThesis: "La pólis y la filosofía coemergen cuando los griegos rompen la heteronomía religiosa y asumen que el ser reposa sobre el chãos; la democracia es la autoinstitución explícita y trágica de una comunidad que se autolimita frente a la hýbris.",
    polisLogosProblem: "Sitúa al lógos deliberativo (isēgoría, parrhēsía) y a la tragedia como las dos instituciones con las que la democracia directa afronta la ausencia de garantías trascendentes.",
    keyConcepts: ["autoinstitución", "heteronomía", "chãos", "hýbris", "ekklēsía", "isēgoría", "parrhēsía"]
  },
  {
    id: "romilly",
    name: "Jacqueline de Romilly",
    themes: [4],
    work: "El siglo V y la democracia. En ¿Por qué Grecia? (1997)",
    coreThesis: "En la Atenas del siglo V, la libertad se define como obediencia consentida a la ley escrita común (nómos), articulada mediante el debate contradictorio en la asamblea y los tribunales, la igualdad cívica y la tolerancia.",
    polisLogosProblem: "Muestra cómo el lógos retórico y judicial se vuelve el instrumento soberano de convivencia, protección del débil y deliberación pública entre iguales.",
    keyConcepts: ["nómos", "lógos", "isonomía", "isēgoría", "Heliea", "xénoi"]
  },
  {
    id: "cassin",
    name: "Barbara Cassin",
    themes: [5],
    work: "El efecto sofístico (2008)",
    coreThesis: "En su tratado Sobre el no ser y el Encomio de Helena, Gorgias desmonta la ontología de Parménides e instaura la logología: el ser es un efecto del lenguaje y la palabra opera como un phármakon soberano, frente al cual Aristóteles erige el principio de no contradicción (sēmaínein ti).",
    polisLogosProblem: "Desvela la guerra filosófica por el control del lógos en la pólis: la performatividad política de la sofística contra la exigencia aristotélica de univocidad ontológica.",
    keyConcepts: ["logología", "ontología", "phármakon", "Peithō", "sēmaínein ti"]
  },
  {
    id: "chatelet",
    name: "François Châtelet",
    themes: [5],
    work: "La invención de la razón (1993)",
    coreThesis: "La razón no es eterna sino un invento histórico surgido del debate cívico en Atenas; ante la crisis demagógica, Sócrates exige la definición universal (tί esti) y Platón funda la verdad en el mundo trascendente de las Ideas (Eídē) y la epistémē.",
    polisLogosProblem: "Explica el nacimiento de la metafísica platónica como una respuesta política para someter la opinión cambiante del ágora (doxa) al tribunal inmutable de la razón.",
    keyConcepts: ["lógos", "doxa", "tί esti", "Eídē", "epistémē"]
  },
  {
    id: "loraux",
    name: "Nicole Loraux",
    themes: [5],
    work: "La invención de Atenas: Historia de la oración fúnebre en la «ciudad clásica» (2012)",
    coreThesis: "El epitáphios lógos ateniense utiliza el mito de la autoctonía y la «muerte bella» colectiva para fabricar la ideología de una ciudad perfecta, armónica e indivisa, borrando imaginariamente la guerra civil (stásis) y las luchas sociales.",
    polisLogosProblem: "Cuestiona el corte tajante entre mito y razón: en el corazón mismo del lógos politikós democrático reaparece el mito de Estado como dispositivo de cohesión e invisibilización del conflicto.",
    keyConcepts: ["epitáphios lógos", "autoctonía", "lógos politikós", "stásis", "krátos"]
  }
];

export const SEMINAR_QUESTIONS: SeminarQuestion[] = [
  {
    id: "q1",
    themeId: 1,
    question: "Según Jean-Pierre Vernant, ¿por qué el hombre griego arcaico carece de una conciencia introspectiva tipo 'cogito' y cómo construye su identidad?",
    contextConcept: "timé / kléos áphthiton",
    options: [
      "Porque su identidad es exterior y especular: solo se conoce reflejándose en la mirada de sus pares a través del honor social (timé) y la gloria cantada (kléos).",
      "Porque la religión griega imponía un dogma sacerdotal que prohibía el examen interior del alma.",
      "Porque consideraba que la phýsis era materia mecánica inerte ajena a lo humano.",
      "Porque buscaba la salvación individual de su alma en el más allá bienaventurado del Hades."
    ],
    correctIndex: 0,
    explanation: "En el Tema 1 (Vernant, 1995, pp. 26-31), el hombre griego está proyectado hacia afuera dentro de un kósmos vivo. Su ser coincide con su estimación pública (timé), y dado que el Hades es un reino de sombras vacías, la única victoria sobre la muerte es el kléos áphthiton conservado en la memoria cívica.",
    citation: "Vernant, 1995, pp. 26-31"
  },
  {
    id: "q2",
    themeId: 1,
    question: "¿Qué revela la institución ateniense de la 'epiklēros' analizada por Sarah B. Pomeroy respecto a la condición de la mujer en la pólis clásica?",
    contextConcept: "epiklēros / kýrios",
    options: [
      "Que las mujeres atenienses gozaban de plena autonomía patrimonial superior a las de Esparta y Gortina.",
      "Que la heredera sin hermanos no poseía la tierra por derecho propio, sino que operaba como vehículo jurídico bajo tutela (kýrios) para transmitir el patrimonio al pariente varón más próximo.",
      "Que las mujeres participaban con derecho a voz (isēgoría) cuando heredaban el oîkos paterno.",
      "Que Solón abolió la distinción entre esposas legítimas y concubinas en Atenas."
    ],
    correctIndex: 1,
    explanation: "En el Tema 1 (Pomeroy, 1987, pp. 73-78), frente a la mayor libertad económica y física de las mujeres en Esparta o el código de Gortina, la Atenas jónica recluye a la mujer libre en el gineceo bajo tutela perpetua del kýrios y convierte a la epiklēros en mero canal de transmisión patrimonial del oîkos.",
    citation: "Pomeroy, 1987, pp. 73-78"
  },
  {
    id: "q3",
    themeId: 2,
    question: "De acuerdo con Eric A. Havelock, ¿cuál es la verdadera razón epistemológica por la que Platón expulsa a los poetas en la 'República'?",
    contextConcept: "mímesis / psychē / estin",
    options: [
      "Un rechazo puramente estético hacia la métrica dactílica de Homero.",
      "La necesidad de quebrar la identificación psico-afectiva e hipnótica de la mímesis oral para instaurar la distancia crítica de la psychē y la sintaxis conceptual del Ser (estin).",
      "El deseo de restaurar el poder absoluto de los reyes micénicos (Ánax) sobre los aedas.",
      "La defensa de la retórica sofística frente a la tradición religiosa de las Musas."
    ],
    correctIndex: 1,
    explanation: "En el Tema 2 (Havelock, 1996, pp. 19-39, 113-133), la poesía homérica funcionaba como enciclopedia oral conservada mediante mímesis corporal. La tecnología del alfabeto permite separar al sujeto (psychē) del discurso, sustituyendo la acción narrativa por definiciones ontológicas estables (estin).",
    citation: "Havelock, 1996, pp. 19-39, 113-133"
  },
  {
    id: "q4",
    themeId: 2,
    question: "¿En qué consiste la paradoja del 'Fedro' platónico señalada por Walter J. Ong y cómo se relaciona con la invención de la mitología en Detienne?",
    contextConcept: "mnēmē / hypómnēsis / hyponoia",
    options: [
      "Platón condena por escrito a la escritura (por sustituir la mnēmē viva por hypómnēsis externa), usando el pensamiento analítico que solo la propia escritura hizo posible.",
      "Platón rechaza el diálogo oral y propone que la filosofía solo puede existir en tablillas micénicas.",
      "Detienne sostiene que la escritura fortaleció la fe literal e ingenua en los mitos homéricos.",
      "Ong afirma que la escritura es un proceso biológico innato que no altera la estructura de la conciencia."
    ],
    correctIndex: 0,
    explanation: "En el Tema 2, Ong (1997, pp. 81-116) destaca que Platón critica la escritura como discurso autónomo e inerte (hypómnēsis), pero su filosofía abstracta depende enteramente de la cultura alfabética. Paralelamente, Detienne (1985, cap. I) muestra que al fijarse por escrito, el mito pierde su contexto festivo, escandaliza a la razón y obliga a inventar la alegoría (hyponoia).",
    citation: "Ong, 1997, pp. 81-116; Detienne, 1985, cap. I"
  },
  {
    id: "q5",
    themeId: 3,
    question: "En 'Los maestros de verdad en la Grecia arcaica' (Tema 3), ¿cuál es la oposición fundamental que define a la Verdad ('Alétheia') según Marcel Detienne?",
    contextConcept: "Alétheia / Léthē / krainein",
    options: [
      "La oposición lógica entre proposición empíricamente verificable y falsedad matemática.",
      "La polaridad mítico-religiosa entre Alétheia (desocultamiento por la memoria poética Mnēmosýnē) y Léthē (el Olvido, el silencio nocturno y las sombras del Hades).",
      "La oposición jurídica entre ley escrita (nómos) y decreto tiránico.",
      "La distinción aristotélica entre sustancia y accidente."
    ],
    correctIndex: 1,
    explanation: "En el Tema 3 (Detienne, 1981, pp. 21-38), la palabra del aeda es realizadora (krainein) y sagrada. Alétheia (a-privativa + léthē) no se opone al error intelectual (pseûdos), sino a Léthē (el Olvido mortal): ser cantado por el poeta otorga presencia luminosa y ser silenciado condena a la inexistencia.",
    citation: "Detienne, 1981, pp. 21-38"
  },
  {
    id: "q6",
    themeId: 3,
    question: "¿Cómo explica Jean-Pierre Vernant el tránsito desde la soberanía micénica ('Ánax') hasta el espacio político de la 'isonomía'?",
    contextConcept: "es tò méson / sōphrosýnē / isonomía",
    options: [
      "Mediante la concentración del poder en un clero teocrático hereditario.",
      "Al colapsar el palacio del Ánax, el poder se deposita «en el centro» (es tò méson) mediante la palabra-debate y la ley escrita, mientras la falange hoplítica sustituye el furor heroico por la sōphrosýnē entre iguales (isonomía).",
      "A través de la abolición de la infantería hoplítica en favor de los combates singulares en carro.",
      "Mediante el abandono del ágora para retornar al secreto de los linajes aristocráticos (génē)."
    ],
    correctIndex: 1,
    explanation: "En el Tema 3 (Vernant, 1992, pp. 61-79), el universo espiritual de la pólis nace al secularizar el poder colocándolo es tò méson (en el centro común). La reforma hoplítica exige disciplina solidaria (sōphrosýnē) y funda un espacio circular simétrico donde los ciudadanos se reconocen como iguales (isonomía).",
    citation: "Vernant, 1992, pp. 61-79"
  },
  {
    id: "q7",
    themeId: 4,
    question: "Según Cornelius Castoriadis (Tema 4), ¿por qué la democracia griega es una «autoinstitución explícita» de carácter trágico?",
    contextConcept: "chãos / autoinstitución / hýbris",
    options: [
      "Porque los atenienses creían que sus leyes habían sido dictadas directamente por un Dios providencial infalible.",
      "Porque al descubrir que el ser emerge sobre el abismo sin sentido predeterminado (chãos), la comunidad reconoce que las leyes (nómoi) son su propia obra y debe autolimitarse sin garantías externas frente a la hýbris.",
      "Porque delegaba todas las decisiones políticas en un cuerpo de expertos burocráticos.",
      "Porque prohibía cuestionar las leyes ancestrales en la asamblea (ekklēsía)."
    ],
    correctIndex: 1,
    explanation: "En el Tema 4 (Castoriadis, 1988, pp. 97-131), Grecia rompe la heteronomía mítica: política y filosofía coemergen al asumir que no hay garantía extrasocial de la ley sobre el trasfondo del chãos. Por ello la democracia es trágica y exige isēgoría, parrhēsía y autolimitación constante.",
    citation: "Castoriadis, 1988, pp. 97-131"
  },
  {
    id: "q8",
    themeId: 5,
    question: "En el Tema 5, ¿qué entiende Barbara Cassin por «logología» en Gorgias y cómo responde Aristóteles en el libro Gamma de la 'Metafísica'?",
    contextConcept: "logología / phármakon / sēmaínein ti",
    options: [
      "La logología afirma que el lenguaje refleja pasivamente las Ideas platónicas, y Aristóteles lo aprueba.",
      "La logología sostiene que el Ser es un efecto producido por el discurso autónomo y persuasivo (phármakon); Aristóteles replica que hablar exige significar algo unívoco (sēmaínein ti) so pena de rebajarse a una «planta que habla».",
      "La logología es el estudio biológico de las plantas en el Liceo aristotélico.",
      "Gorgias defiende la identidad parmenídea entre ser, pensar y decir contra la retórica."
    ],
    correctIndex: 1,
    explanation: "En el Tema 5 (Cassin, 2008, pp. 24-45), Gorgias invierte a Parménides: la ontología queda subordinada a la logología (el poder creador del lógos como phármakon). Aristóteles restaura el orden ontológico imponiendo el principio de no contradicción y la univocidad del sentido (sēmaínein ti).",
    citation: "Cassin, 2008, pp. 24-45"
  },
  {
    id: "q9",
    themeId: 5,
    question: "¿Cómo explica François Châtelet la «invención de la razón» en Sócrates y Platón frente a la práctica política del ágora?",
    contextConcept: "tί esti / Eídē / epistémē",
    options: [
      "Como una renuncia al diálogo para retornar a los oráculos adivinatorios micénicos.",
      "Sócrates exige la definición conceptual universal («¿qué es?», tί esti) frente a la doxa, y Platón erige el mundo inteligible de las Ideas (Eídē) para fundar la epistémē contra la demagogia que condenó a Sócrates.",
      "Como una alianza con los sofistas para vender discursos judiciales en el Heliea.",
      "Como la afirmación de que toda verdad depende del voto mayoritario de la asamblea."
    ],
    correctIndex: 1,
    explanation: "En el Tema 5 (Châtelet, 1993, pp. 15-37), la razón nace en el espacio dialéctico de la pólis, pero ante la crisis de la doxa y la muerte de Sócrates, la filosofía forja el concepto universal (tί esti) y el tribunal trascendente de las Ideas (Eídē) para asegurar una verdad objetiva (epistémē).",
    citation: "Châtelet, 1993, pp. 15-37"
  },
  {
    id: "q10",
    themeId: 5,
    question: "Según Nicole Loraux, ¿cuál es la función ideológica del 'epitáphios lógos' (oración fúnebre) en la democracia ateniense?",
    contextConcept: "epitáphios lógos / autoctonía / stásis",
    options: [
      "Hacer una crónica historiográfica neutral y detallada de las luchas de clases en el Ática.",
      "Fabricar el imaginario mítico-político de una Atenas autóctona, armónica e indivisa, silenciando la división interna y el peligro de guerra civil (stásis).",
      "Exaltar el individualismo aristocrático por encima del sacrificio colectivo por la ciudad.",
      "Sustituir el culto cívico ateniense por las leyes espartanas de Licurgo."
    ],
    correctIndex: 1,
    explanation: "En el Tema 5 (Loraux, 2012, pp. 237-248), el epitáphios lógos muestra las paradojas de un lógos politikós que recurre al mito de la autoctonía y a la «muerte bella» colectiva para conjurar la stásis (conflicto civil) y presentar el poder del pueblo (krátos) como unidad sin fisuras.",
    citation: "Loraux, 2012, pp. 237-248"
  }
];
