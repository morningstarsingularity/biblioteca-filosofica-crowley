export interface MarkmapNode {
  content: string;
  children: MarkmapNode[];
  payload?: {
    tag?: string;
    lines?: string;
    fold?: number;
  };
}

export const MARKMAP_PASTEL_GOTH_PALETTE = [
  "#c084fc", // Lila pastel
  "#f472b6", // Rosa pastel
  "#a78bfa", // Violeta claro
  "#d8b4fe", // Lavanda
];

export const INDEX_MARKMAP_TREE: MarkmapNode = {
  content:
    "INTRODUCCIÓN A LA FILOSOFÍA Y PRINCIPIOS Y TÉCNICAS DE LA INVESTIGACIÓN FILOSÓFICA I",
  children: [
    {
      content: "Créditos y Autoría",
      children: [
        {
          content: "<strong>Estudiante:</strong> Ledezma Hernández Zeltzin Odette",
          children: [],
        },
        {
          content: "<strong>No. Cuenta:</strong> 422074843",
          children: [],
        },
        {
          content: "<strong>Asignatura:</strong> Biblioteca de Mapas Conceptuales",
          children: [],
        },
        {
          content: "<strong>Tutora Oficial:</strong> Crowley (Guía Filosófica)",
          children: [],
        },
      ],
    },
    {
      content: "Temario Principal",
      children: [
        {
          content: '<a href="#tema-1" data-theme-id="1">Tema 1 "El hombre Griego"</a>',
          children: [
            {
              content: "<em>Toca para cargar dinámicamente el Tema 1 (Vernant, Pomeroy, Hadot)</em>",
              children: [],
            },
          ],
        },
        {
          content:
            '<a href="#tema-2" data-theme-id="2">Tema 2 "Mito y mitología. Oralidad y escritura"</a>',
          children: [
            {
              content: "<em>Toca para cargar dinámicamente el Tema 2 (Havelock, Ong, Detienne)</em>",
              children: [],
            },
          ],
        },
        {
          content:
            '<a href="#tema-3" data-theme-id="3">Tema 3 "MUSAS Y POETAS. Funciones del poeta: mito, rito y verdad. Crisis de soberanía y nacimiento de la polis"</a>',
          children: [
            {
              content: "<em>Toca para cargar dinámicamente el Tema 3 (Detienne, Vernant)</em>",
              children: [],
            },
          ],
        },
        {
          content:
            '<a href="#tema-4" data-theme-id="4">Tema 4 "MITO Y TRAGEDIA. La emergencia del enigma. La polis democrática y la tragedia"</a>',
          children: [
            {
              content: "<em>Toca para cargar dinámicamente el Tema 4 (Castoriadis, Romilly)</em>",
              children: [],
            },
          ],
        },
        {
          content:
            '<a href="#tema-5" data-theme-id="5">Tema 5 "MITO Y LOGOS. La separación del mito y el logos"</a>',
          children: [
            {
              content: "<em>Toca para cargar dinámicamente el Tema 5 (Cassin, Châtelet, Loraux)</em>",
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

export const THEME_MARKMAP_TREES: Record<number, MarkmapNode> = {
  1: {
    content: "Tema 1: El hombre griego",
    children: [
      {
        content: "1. El hombre en el kósmos y la frontera con lo divino (Jean-Pierre Vernant)",
        children: [
          {
            content: "La 'phýsis' animada y el estatuto cósmico del hombre",
            children: [
              {
                content:
                  "El universo constituye un <em>kósmos</em>: totalidad ordenada, armónica y bella que rechaza la escisión moderna sujeto/objeto (Vernant, 1995, pp. 21-22).",
                children: [],
              },
              {
                content:
                  'La <em>phýsis</em> no es materia inerte; es una potencia viva, dinámica y "demoníaca" (<em>daimonía</em>) con la que el hombre está emparentado de forma connatural (Vernant, 1995, pp. 21-22).',
                children: [],
              },
              {
                content:
                  "La teoría de la visión: ver no es procesar imágenes pasivamente, sino proyectar un rayo ígneo (<em>phosphora ómmata</em>) que se une a la luz solar para tocar físicamente lo real (Vernant, 1995, pp. 22-25).",
                children: [],
              },
            ],
          },
          {
            content: "La alteridad divina y los límites de la condición mortal",
            children: [
              {
                content:
                  "Los dioses no son trascendentes ni creadores <em>ex nihilo</em>; nacen en el interior del cosmos a partir de potencias primordiales como Caos y Gea (Vernant, 1995, pp. 15-16).",
                children: [],
              },
              {
                content:
                  "La frontera ontológica infranqueable: los dioses son los <em>athanatoi</em> (inmortales sin vejez ni carencia); el hombre está signado por la privación, el dolor y la muerte (Vernant, 1995, pp. 16-17).",
                children: [],
              },
              {
                content:
                  "Regla cardinal de la sabiduría cívica: rechazo de la <em>hýbris</em>; el mortal debe conocer sus límites y no pretender igualarse a los dioses (Vernant, 1995, pp. 16-17, 26).",
                children: [],
              },
              {
                content:
                  "El culto cívico como deuda y embellecimiento: sin dogmas cerrados ni clero coercitivo, el ritual (sacrificios, danzas, coros) mantiene la armonía comunitaria entre hombres libres (Vernant, 1995, pp. 17-20).",
                children: [],
              },
            ],
          },
          {
            content: "Identidad exterior: 'timé', la mirada del otro y el 'kléos'",
            children: [
              {
                content:
                  "Ausencia del <em>cogito</em> o la introspección subjetiva: el autoconocimiento es especular, el ojo y el alma solo se conocen reflejándose en otro semejante (Vernant, 1995, pp. 26-27).",
                children: [],
              },
              {
                content:
                  "Cultura del honor y la vergüenza: la identidad coincide con la estimación social (<em>timé</em>); perder el reconocimiento de los pares equivale a no ser nadie (Vernant, 1995, pp. 27-28).",
                children: [],
              },
              {
                content:
                  "La inmortalidad como memoria cívica: el Hades es solo un reino de sombras vacías; la única victoria sobre la muerte es la gloria imperecedera (<em>kléos áphthiton</em>) fijada por el canto poético y el monumento (Vernant, 1995, pp. 29-31).",
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "2. La trastienda del héroe: mujeres, matrimonio y propiedad (Sarah B. Pomeroy)",
        children: [
          {
            content: "La mujer en la épica homérica (Edad del Bronce)",
            children: [
              {
                content:
                  "Contradicción estructural: figuras de reinas con relieve dramático e influencia palacial frente a un estatuto objetivo de subordinación patriarcal (Pomeroy, 1987, pp. 31-33).",
                children: [],
              },
              {
                content:
                  "Las mujeres como propiedad, botín de guerra (<em>géras</em>) y premio: su posesión incrementa directamente la <em>timé</em> del guerrero y desata contiendas mortales (Pomeroy, 1987, pp. 40-41).",
                children: [],
              },
              {
                content:
                  "Estrategias de alianza conyugal: coexistencia de enlaces patrilocales (la dote atrae y sella pactos) y matrilocales/matrilineales (el héroe hereda el trono mediante pruebas) (Pomeroy, 1987, pp. 33-35).",
                children: [],
              },
              {
                content:
                  "Doble moral sexual: obligación de monogamia y castidad para la esposa a fin de asegurar herederos legítimos frente al libre acceso del varón a concubinas y esclavas (Pomeroy, 1987, pp. 41-43).",
                children: [],
              },
            ],
          },
          {
            content: "La bifurcación arcaica: Esparta doria frente a Atenas jónica",
            children: [
              {
                content:
                  "El modelo espartano (código de Licurgo): Estado militarizado donde la mujer es valorada como reproductora de soldados para la falange (Pomeroy, 1987, pp. 50-52).",
                children: [],
              },
              {
                content:
                  "Privilegios de la espartana: nutrición equivalente al varón, gimnasia y carreras al aire libre, exención de labores domésticas y control real sobre dotes y tierras (Pomeroy, 1987, pp. 51-54).",
                children: [],
              },
              {
                content:
                  "El modelo de Gortina (Creta): leyes que reconocen derechos patrimoniales a la mujer libre e incluso capacidad jurídica limitada para la sierva y la <em>patroïokhos</em> (Pomeroy, 1987, pp. 54-57).",
                children: [],
              },
              {
                content:
                  "La reclusión en la Atenas jónica: confinamiento de la mujer libre al gineceo, invisibilidad social y tutela perpetua del <em>kýrios</em> bajo la ley de Solón (Pomeroy, 1987, pp. 57, 73-76).",
                children: [],
              },
              {
                content:
                  "La <em>epiklēros</em> ateniense: la heredera sin hermanos no posee la tierra; queda integrada como vehículo para transmitir la propiedad familiar al pariente varón más próximo (Pomeroy, 1987, pp. 77-78).",
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "3. Del orden aristocrático a la interrogación socrática (Pierre Hadot)",
        children: [
          {
            content: "De la 'historia' jónica a la fractura de la 'paideia' tradicional",
            children: [
              {
                content:
                  "Nacimiento de la <em>historia</em> en Mileto: ruptura con las cosmogonías míticas para buscar una explicación racional de la <em>phýsis</em> física accesible a la observación (Hadot, 1998, pp. 23-25).",
                children: [],
              },
              {
                content:
                  "La <em>paideia</em> nobiliaria tradicional: transmisión comunitaria de la excelencia (<em>areté</em>) por ósmosis y emulación directa en la convivencia de adultos y jóvenes (<em>sunousia</em>) (Hadot, 1998, pp. 26-27).",
                children: [],
              },
              {
                content:
                  "La crisis cívica y la revolución sofística: la democracia y los tribunales demandan nuevas competencias; los sofistas profesionalizan la retórica y venden el arte de persuadir como técnica de poder (Hadot, 1998, pp. 28-30).",
                children: [],
              },
            ],
          },
          {
            content: "La resignificación socrático-platónica del filósofo (<em>Banquete</em>)",
            children: [
              {
                content:
                  "Sócrates como encarnación demoníaca de Eros: hijo de Poros (Recurso/Astucia) y Penia (Pobreza/Carencia) (Hadot, 1998, pp. 45-47).",
                children: [],
              },
              {
                content:
                  "La ontología del intervalo (<em>metaxy</em>): el filósofo no es el dios omnisciente que posee la <em>sophia</em> ni el insensato que ignora su propia ignorancia (Hadot, 1998, pp. 47-50).",
                children: [],
              },
              {
                content:
                  "La <em>philosophia</em> como deseo y modo de vida: no es construcción de un sistema doctrinal abstracto cerrado, sino ejercicio cotidiano de desacomodo y transformación personal del ser (<em>bios</em>) (Hadot, 1998, pp. 50-53).",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  2: {
    content: "Tema 2: Mito y mitología. Oralidad y escritura",
    children: [
      {
        content: "Nexo con el Tema 1 (El hombre griego en transición)",
        children: [
          {
            content: "La fractura de la presencia viva",
            children: [
              {
                content:
                  "En el Tema 1, el hombre griego existe proyectado hacia afuera: su identidad depende del reconocimiento visual (<em>timé</em>) y de la memoria comunitaria viva (<em>kléos</em>) (Vernant, 1995, pp. 28-30).",
                children: [],
              },
              {
                content:
                  "El traspaso de la gloria descansaba en el canto poético oral que mantenía al héroe arrancado de las sombras del Hades (Vernant, 1995, pp. 16, 29-30).",
                children: [],
              },
              {
                content:
                  "Cuando la palabra deja de ser aire compartido y se petrifica sobre una superficie física, la relación del hombre con el cosmos, la memoria y su propia conciencia se fractura de manera irreversible (Havelock, 1996, pp. 113-133; Ong, 1997, pp. 81-116).",
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "1. La enciclopedia oral homérica y la memoria acústica (Eric A. Havelock)",
        children: [
          {
            content: "La poesía como tecnología cívica y archivo social",
            children: [
              {
                content:
                  "En una cultura sin transcripción alfabética, la poesía no es un pasatiempo estético ni literatura de entretenimiento (Havelock, 1996, pp. 19-39).",
                children: [],
              },
              {
                content:
                  "Constituye el único mecanismo de almacenamiento de la tradición: custodia el <em>nómos</em> (la ley consuetudinaria) y el <em>éthos</em> (las pautas morales de conducta social) (Havelock, 1996, pp. 19-39).",
                children: [],
              },
              {
                content:
                  "Toda la masa de información técnica, cívica, religiosa, genealógica e institucional de la comunidad debe conservarse en el verso métrico para no perderse en el olvido (Havelock, 1996, pp. 19-39).",
                children: [],
              },
            ],
          },
          {
            content: "Mecanismos mnemotécnicos y mímesis corporal",
            children: [
              {
                content:
                  "Ritmo métrico, metro dactílico, fórmulas modulares, epítetos fijos y rima como prótesis mnemónicas obligatorias (Havelock, 1996, pp. 19-39).",
                children: [],
              },
              {
                content:
                  "El aprendizaje se produce por <em>mímesis</em>: identificación psico-afectiva y visceral absoluta entre el recitador/oyente y el contenido del canto (Havelock, 1996, pp. 19-39).",
                children: [],
              },
              {
                content:
                  "El cuerpo entero (aparato fonador, oído, sistema motriz, danza) se compromete activamente en la preservación del recuerdo social (Havelock, 1996, pp. 19-39).",
                children: [],
              },
            ],
          },
          {
            content: "La expulsión de los poetas en Platón (<em>República</em>)",
            children: [
              {
                content:
                  "No responde a una mojigatería moralizante ni a insensibilidad artística por parte de Platón (Havelock, 1996, pp. 19-39).",
                children: [],
              },
              {
                content:
                  "Es un imperativo epistemológico radical: para instaurar el pensamiento conceptual, abstracto y reflexivo, es imprescindible quebrar el monopolio educativo del aeda y la hipnosis colectiva de la memoria oral (Havelock, 1996, pp. 19-39).",
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "2. La revolución tecnológica del alfabeto griego (Eric A. Havelock)",
        children: [
          {
            content: "La descomposición analítica del sonido",
            children: [
              {
                content:
                  "Ruptura frente a los silabarios orientales y la escritura consonántica fenicia (Havelock, 1996, pp. 113-133).",
                children: [],
              },
              {
                content:
                  "Aislamiento exhaustivo tanto de las vocales como de las consonantes mudas (Havelock, 1996, pp. 113-133).",
                children: [],
              },
              {
                content:
                  "Transforma el flujo sonoro, fugaz y temporal, en un artefacto visible, espacializado, estable e independiente del hablante (Havelock, 1996, pp. 113-133).",
                children: [],
              },
            ],
          },
          {
            content: "De la acción narrativa al concepto abstracto (La sintaxis del Ser)",
            children: [
              {
                content:
                  "Desmantelamiento de la parataxis oral donde solo actuaban agentes personificados (Havelock, 1996, pp. 113-133).",
                children: [],
              },
              {
                content:
                  'Creación de la sintaxis ontológica de la definición formal: entronización del verbo copulativo "ser" (<em>estin</em>) y de categorías lógicas estables (Havelock, 1996, pp. 113-133).',
                children: [],
              },
            ],
          },
          {
            content: "La génesis de la <em>psychē</em> y la distancia crítica",
            children: [
              {
                content:
                  "Al quedar el texto separado del cuerpo del emisor, el mensaje se independiza y puede ser sometido a inspección, duda y relectura solitaria (Havelock, 1996, pp. 113-133).",
                children: [],
              },
              {
                content:
                  "Nace la distancia crítica entre el sujeto que piensa y el objeto pensado: se crea la interioridad reflexiva (<em>psychē</em>) y el individuo autónomo (Havelock, 1996, pp. 113-133).",
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "3. La reestructuración de la conciencia por la escritura (Walter J. Ong)",
        children: [
          {
            content: "La escritura como tecnología artificial y el discurso autónomo",
            children: [
              {
                content:
                  "La escritura no es una emanación biológica natural de la voz; es una tecnología exterior que reestructura la conciencia humana (Ong, 1997, pp. 81-116).",
                children: [],
              },
              {
                content:
                  'El texto escrito inaugura el "discurso autónomo": palabras desvinculadas del contexto vital directo, irrefutables y sordas (Ong, 1997, pp. 81-116).',
                children: [],
              },
            ],
          },
          {
            content: "La paradoja del <em>Fedro</em> platónico y el giro visual",
            children: [
              {
                content:
                  "En el <em>Fedro</em>, Platón condena la escritura porque destruye la memoria viva (<em>mnēmē</em>) e instaura un recordatorio mecánico exterior (<em>hypómnēsis</em>) (Ong, 1997, pp. 81-116).",
                children: [],
              },
              {
                content:
                  "Paradoja histórica: Platón únicamente pudo desarrollar su filosofía analítica gracias al distanciamiento visual y conceptual que la propia escritura le suministró (Ong, 1997, pp. 81-116).",
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "4. La invención de la «mitología» y la crisis del mito (Marcel Detienne)",
        children: [
          {
            content: "Del relato vivo al escándalo de la razón y la alegoría ('hyponoia')",
            children: [
              {
                content:
                  "El <em>mythos</em> es inventado como categoría sospechosa cuando la escritura lo captura y lo aísla de su contexto de enunciación festiva (Detienne, 1985, cap. I).",
                children: [],
              },
              {
                content:
                  "Al ser leídos analíticamente, los crímenes e incoherencias de los dioses homéricos se transforman en un escándalo para la razón cívica (Detienne, 1985, cap. I).",
                children: [],
              },
              {
                content:
                  "Se inventa la interpretación alegórica postulando un sentido oculto (<em>hyponoia</em>) bajo la superficie del relato mítico (Detienne, 1985, cap. I).",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  3: {
    content: "Tema 3: Musas y poetas. Verdad, rito y crisis de soberanía",
    children: [
      {
        content: "0. Nexo con los Temas 1 y 2 (De la memoria encarnada a la secularización del orden)",
        children: [
          {
            content: "La transformación del estatuto de la palabra",
            children: [
              {
                content:
                  "En los temas previos, el reconocimiento cívico (<em>timé</em>) y la preservación de la memoria (<em>kléos</em>) dependían del canto poético para no caer en el Hades.",
                children: [],
              },
              {
                content:
                  'La palabra deja de ser una revelación oracular o decreto mágico monopolizado por poetas y reyes sagrados, y se arroja "al centro" (<em>es tò méson</em>) de la comunidad (Detienne, 1981; Vernant, 1992).',
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "1. La memoria del poeta y los maestros de verdad (Marcel Detienne)",
        children: [
          {
            content: "Mnemosyne como potencia sagrada y eficacia realizadora ('krainein')",
            children: [
              {
                content:
                  'En la Grecia arcaica, la Memoria (<em>Mnēmosýnē</em>) opera como una potencia mítico-religiosa adivinatoria que contempla "lo que es, lo que será y lo que fue" (Detienne, 1981, pp. 21-26).',
                children: [],
              },
              {
                content:
                  "La palabra poética arcaica se rige por su eficacia mágica y realizadora (<em>krainein</em>: realizar, hacer advenir) (Detienne, 1981, pp. 28-32).",
                children: [],
              },
            ],
          },
          {
            content: "La polaridad mítica: 'Alétheia' frente a 'Léthē'",
            children: [
              {
                content:
                  "La Verdad (<em>Alétheia</em>) no tiene como antónimo al error intelectual (<em>pseûdos</em>), sino al Olvido (<em>Léthē</em>), potencia vinculada a la Noche y al Hades (Detienne, 1981, pp. 34-38).",
                children: [],
              },
              {
                content:
                  '<em>Alétheia</em> es el acto de "desocultamiento" que rescata al héroe de las sombras mediante la memoria poética (Detienne, 1981, pp. 36-38).',
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "2. El universo espiritual de la pólis y la crisis de soberanía (Jean-Pierre Vernant)",
        children: [
          {
            content: "El derrumbe del 'Ánax' micénico y la palabra-debate ('Peithō')",
            children: [
              {
                content:
                  "El colapso del orden micénico extingue al <em>Ánax</em>: el poder se fragmenta, se socializa y pierde su aura mística de origen divino (Vernant, 1992, pp. 61-65).",
                children: [],
              },
              {
                content:
                  "La palabra se transforma en debate contradictorio, discusión argumentada y persuasión recíproca (<em>Peithō</em>) ante los ciudadanos (Vernant, 1992, pp. 61-65).",
                children: [],
              },
            ],
          },
          {
            content: "El centro cívico ('es tò méson'), la falange hoplítica y la 'isonomía'",
            children: [
              {
                content:
                  'El poder se coloca "en el centro" (<em>es tò méson</em>) en el ágora y la ley escrita (<em>nómos</em>) fija una regla común objetiva (Vernant, 1992, pp. 64-68).',
                children: [],
              },
              {
                content:
                  "En la falange hoplítica, el furor individual (<em>lýssa</em>) cede ante la templanza y disciplina colectiva (<em>sōphrosýnē</em>) (Vernant, 1992, pp. 68-74).",
                children: [],
              },
              {
                content:
                  "Surge la <em>isonomía</em>: los ciudadanos se reconocen como semejantes (<em>hómoioi</em>) e iguales (<em>ísoi</em>) en un cosmos político circular (Vernant, 1992, pp. 74-79).",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  4: {
    content: "Tema 4: Mito y tragedia. La emergencia del enigma y la democracia",
    children: [
      {
        content: "0. Nexo con el Tema 3 (Del centro cívico al abismo de la interrogación)",
        children: [
          {
            content: "La institucionalización del conflicto y la palabra pública",
            children: [
              {
                content:
                  "La democracia asume que la ley carece de fundamento sagrado exterior: coemerge con la filosofía y la tragedia para confrontar el enigma y la responsabilidad colectiva (Castoriadis, 1988; Romilly, 1997).",
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "1. La pólis griega y la creación de la democracia (Cornelius Castoriadis)",
        children: [
          {
            content: "Autoinstitución explícita, el trasfondo del 'chãos' y la autolimitación",
            children: [
              {
                content:
                  "Ruptura con la heteronomía: la comunidad reconoce que las leyes (<em>nómoi</em>) son su propia creación y pregunta permanentemente «¿es justa esta ley?» (Castoriadis, 1988, pp. 97-112).",
                children: [],
              },
              {
                content:
                  "El fondo último del ser es <em>chãos</em> (abismo sin sentido providencial); la democracia es trágica porque exige autolimitarse frente a la <em>hýbris</em> sin garantías externas (Castoriadis, 1988, pp. 115-126).",
                children: [],
              },
              {
                content:
                  "Democracia directa en la <em>ekklēsía</em> sustentada en la igualdad de palabra (<em>isēgoría</em>), la franqueza (<em>parrhēsía</em>) y el sorteo de cargos (Castoriadis, 1988, pp. 123-131).",
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "2. El siglo V y la democracia ateniense (Jacqueline de Romilly)",
        children: [
          {
            content: "Libertad bajo el 'nómos', debate judicial e ideal de tolerancia",
            children: [
              {
                content:
                  "La libertad griega se define como obediencia consentida a una ley escrita común (<em>nómos</em>) nacida de la deliberación entre iguales (Romilly, 1997, pp. 87-92).",
                children: [],
              },
              {
                content:
                  "En la asamblea y el tribunal del <em>Heliea</em>, la fórmula «¿quién quiere tomar la palabra?» consagra la soberanía del <em>lógos</em> argumentativo (Romilly, 1997, pp. 92-104).",
                children: [],
              },
              {
                content:
                  "Frente al modelo cuartelario espartano, Atenas cultiva la tolerancia en la vida privada y la hospitalidad hacia los extranjeros (<em>xénoi</em>) (Romilly, 1997, pp. 104-110).",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  5: {
    content: "Tema 5: Mito y logos. La separación del mito y el logos",
    children: [
      {
        content: "0. Nexo con el Tema 4 (De la tragedia democrática a la guerra por el logos)",
        children: [
          {
            content: "La disputa por el orden del discurso",
            children: [
              {
                content:
                  "La sofística proclama la soberanía del lenguaje (<em>logología</em>), la filosofía platónico-aristotélica amarra la palabra a la verdad objetiva, y la oración fúnebre forja el mito ideológico de una Atenas indivisa (Cassin, 2008; Châtelet, 1993; Loraux, 2012).",
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "1. El efecto sofístico y la soberanía del lenguaje (Barbara Cassin)",
        children: [
          {
            content: "Gorgias frente a Parménides: 'logología' contra 'ontología'",
            children: [
              {
                content:
                  "En el <em>Tratado sobre el no ser</em>, Gorgias quiebra la identidad parmenídea entre ser, pensar y decir: el Ser es un efecto sintáctico producido por el discurso (<em>logología</em>) (Cassin, 2008, pp. 24-36).",
                children: [],
              },
              {
                content:
                  "En el <em>Encomio de Helena</em>, el <em>lógos</em> actúa como un <em>phármakon</em> y un déspota invisible que modela las almas mediante la persuasión (<em>Peithō</em>) (Cassin, 2008, pp. 36-39).",
                children: [],
              },
            ],
          },
          {
            content: "La réplica aristotélica: significar algo determinado ('sēmaínein ti')",
            children: [
              {
                content:
                  "En <em>Metafísica</em> Gamma, Aristóteles impone el principio de no contradicción: hablar exige significar algo unívoco (<em>sēmaínein ti</em>); quien lo niega se rebaja a una «planta que habla» (Cassin, 2008, pp. 39-45).",
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "2. La invención de la razón (François Châtelet)",
        children: [
          {
            content: "El concepto socrático ('tί esti') y las Ideas platónicas ('Eídē')",
            children: [
              {
                content:
                  "Sócrates invierte la retórica mercenaria desmantelando la <em>doxa</em> y exigiendo la definición universal: «¿qué es?» (<em>tί esti</em>) (Châtelet, 1993, pp. 15-33).",
                children: [],
              },
              {
                content:
                  "Contra la demagogia que condenó a Sócrates, Platón funda la ciencia (<em>epistémē</em>) en el tribunal trascendente de las Ideas inteligibles (<em>Eídē</em>) (Châtelet, 1993, pp. 32-37).",
                children: [],
              },
            ],
          },
        ],
      },
      {
        content: "3. La retórica fúnebre y la invención ideológica de Atenas (Nicole Loraux)",
        children: [
          {
            content: "El 'epitáphios lógos', la autoctonía y el silenciamiento de la 'stásis'",
            children: [
              {
                content:
                  "La oración fúnebre oficial (<em>epitáphios lógos</em>) utiliza el mito de la autoctonía para fabricar una Atenas ideal, armónica e indivisa (Loraux, 2012, pp. 237-243).",
                children: [],
              },
              {
                content:
                  "Operación ideológica del <em>lógos politikós</em>: conjurar y silenciar la división social y la guerra civil (<em>stásis</em>) bajo la «muerte bella» colectiva (Loraux, 2012, pp. 242-248).",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
};
