export type SessionNotes = {
  contact: string;
  discovery: string;
  argumentation: string;
  objections: string;
  closing: string;
  pitch: string;
  practice: string;
  nextActions: string;
};

export type OpeningStep = {
  id: string;
  title: string;
  objective: string;
  formulations: string[];
};

export type DiscoveryTheme = {
  id: string;
  title: string;
  intent: string;
  openingQuestion: string;
  questions: string[];
  followUps: string[];
  signals: string[];
  avoid: string[];
};

export type CollaboratorPlan = {
  id: string;
  firstName: string;
  fullName: string;
  role: string;
  pole: string;
  badge: string;
  posture: string;
  promise: string;
  openingSteps: OpeningStep[];
  discoveryThemes: DiscoveryTheme[];
  nextActions: string[];
  pitchIds: string[];
  scenarioIds: string[];
};

export type VerticalPitch = {
  id: string;
  vertical: string;
  target: string;
  issue: string;
  value: string;
  benefit: string;
  oral: string;
  recommendedFor: string[];
};

export type ArgumentBridge = {
  id: string;
  title: string;
  discoveryThemeId: string;
  youWho: string;
  solutionBenefit: string;
  thanksTo: string[];
  validationQuestion: string;
  exampleScript: string;
  coachNote: string;
  recommendedFor: string[];
};

export type ObjectionPlaybook = {
  id: string;
  title: string;
  objection: string;
  root: string;
  steps: {
    id: string;
    title: string;
    intent: string;
    script: string;
    questions?: string[];
  }[];
  recommendedFor: string[];
};

export type ClosingPlaybook = {
  id: string;
  title: string;
  scenarioId: string;
  targetAction: string;
  readinessSignals: string[];
  recap: string;
  firstAction: string;
  dateAndValidate: string;
  strongIssueIfBlocked: string;
  contractAsk: string;
  reflectionFallback: string;
  recommendedFor: string[];
};

export type TrainingScenario = {
  id: string;
  title: string;
  forCollaborators: string[];
  interlocutor: string;
  context: string[];
  visibleSignals: string[];
  hiddenSignals: string[];
  objection: string;
  expectedMove: string;
  responseBank: {
    commercialQuestion: string;
    clientAnswer: string;
  }[];
};

export const storageKey = "gedeas-sales-lab-v1";

export const appPromise =
  "Ouvrir, cadrer et faire parler le client avant de proposer une solution GDS.";

export const defaultNotes: SessionNotes = {
  contact: "",
  discovery: "",
  argumentation: "",
  objections: "",
  closing: "",
  pitch: "",
  practice: "",
  nextActions: "",
};

export const noteFields: {
  id: keyof SessionNotes;
  label: string;
  placeholder: string;
}[] = [
  {
    id: "contact",
    label: "Prise de contact",
    placeholder:
      "Phrase d'ouverture, cadre, timing et bascule que je veux tester.",
  },
  {
    id: "discovery",
    label: "Découverte",
    placeholder:
      "Questions retenues, relances utiles, signaux que je dois écouter.",
  },
  {
    id: "argumentation",
    label: "Argumentation",
    placeholder:
      "Enjeu client découvert, avantage GDS, preuves et phrase que je veux dérouler.",
  },
  {
    id: "objections",
    label: "Objections",
    placeholder:
      "Objection travaillée, racine comprise, réponse fine et validation obtenue.",
  },
  {
    id: "closing",
    label: "Closing",
    placeholder:
      "Première action datée, relance si hésitation, contrat ou validation à obtenir.",
  },
  {
    id: "pitch",
    label: "Pitch",
    placeholder:
      "Version orale qui me paraît naturelle, sans catalogue ni jargon.",
  },
  {
    id: "practice",
    label: "Entraînement",
    placeholder:
      "Ce qui a marché en simulation, points à corriger, freins rencontrés.",
  },
  {
    id: "nextActions",
    label: "Suite terrain",
    placeholder:
      "Compte à rappeler, question à poser, rituel de suivi à installer.",
  },
];

const baseOpening = {
  ice: {
    objective:
      "Installer une relation simple et envoyer le signal que l'échange sera utile.",
  },
  frame: {
    objective:
      "Poser le cadre, le plan, le timing et obtenir l'accord du client.",
  },
};

function buildOpeningSteps(subject: string, pitch: string): OpeningStep[] {
  return [
    {
      id: "bris-de-glace",
      title: "1. Bris de glace",
      objective: baseOpening.ice.objective,
      formulations: [
        "Bonjour, merci de prendre ce temps avec moi.",
        "Vous allez bien ?",
      ],
    },
    {
      id: "cadre-plan-timing",
      title: "2. Cadre, plan, timing, validation",
      objective: baseOpening.frame.objective,
      formulations: [
        `Aujourd'hui, nous allons parler de ${subject}.`,
        "Je vais vous présenter rapidement GEDEAS, puis nous échangerons sur votre situation, votre organisation et ce que nous pouvons mettre en place ensemble.",
        "C'est un entretien qui dure environ 25 minutes.",
        "C'est bon pour vous ?",
      ],
    },
    {
      id: "pitch",
      title: "3. Pitch court",
      objective:
        "Crédibiliser GEDEAS en quelques phrases, puis rendre la parole au client.",
      formulations: [pitch, "Pour bien partir, dites-m'en plus sur votre situation actuelle."],
    },
  ];
}

export const verticalPitches: VerticalPitch[] = [
  {
    id: "handicap-qvct",
    vertical: "Handicap / QVCT",
    target: "Référent handicap, DRH, DAF, achats ou pilote RSE",
    issue:
      "Plus une entreprise grossit, plus le handicap et la QVCT deviennent difficiles à tenir. Les actions existent, mais elles sont éparpillées: contribution non optimisée, preuves RSE floues, indicateurs absents. Le sujet est là, mais personne ne le pilote vraiment.",
    value:
      "Chez GEDEAS, on commence par remettre le sujet à plat: audit de situation, identification des risques, feuille de route et plan d'action concret. On transforme une obligation diffuse en politique lisible, défendable en interne et actionnable sur le terrain.",
    benefit:
      "Les clients gagnent en visibilité, en crédibilité RH et en marge de manoeuvre économique. Ils ne subissent plus leur obligation handicap: ils la pilotent.",
    oral:
      "Beaucoup d’entreprises font des actions handicap, mais sans vrai pilotage. Le sujet tourne, mais personne n’en a vraiment la main. Chez GEDEAS, on remet les choses à plat avec un audit, une feuille de route et un plan d’action concret — pour transformer une contrainte en levier RH, RSE et économique.",
    recommendedFor: ["marjorie-louis", "chloe-bonnerue", "lilian-pitault"],
  },
  {
    id: "visites-medicales",
    vertical: "Visites médicales",
    target: "Responsable RH, DRH ou dirigeant d'organisation multi-sites",
    issue:
      "Plus les effectifs augmentent, plus les visites médicales deviennent un angle mort. Retards, populations itinérantes, suivis renforcés mal tracés: ce qui devrait être une routine administrative devient vite un vrai sujet de risque et de non-conformité.",
    value:
      "Chez GEDEAS, on prend le dossier en main: on clarifie ce qui est en retard, on fiabilise le suivi et on met en place un pilotage simple et régulier. L'équipe RH garde la main sans porter seule la charge opérationnelle.",
    benefit:
      "Moins de retards, plus de maîtrise sur la conformité, et des équipes RH soulagées d'un sujet chronophage. Le client pilote enfin un sujet sensible avec des preuves solides.",
    oral:
      "La visite médicale, c’est rarement une priorité — jusqu’au jour où ça devient un problème. Retards, suivis qui glissent, populations mal couvertes... Chez GEDEAS, on remet le dossier en ordre, on fiabilise le suivi et on redonne à l’entreprise la maîtrise de sa conformité.",
    recommendedFor: ["nathalie-reveil", "yann-pierron", "lilian-pitault"],
  },
  {
    id: "formation-opco",
    vertical: "Administration formation / OPCO / alternance",
    target: "Support RH formation, responsable alternance ou organisme de formation",
    issue:
      "Plus les volumes de formation et d'alternance augmentent, plus la machine administrative grippe. Conventions incomplètes, dépôts OPCO manqués, pièces qui traînent: ce n'est plus une question de confort, c'est du financement qui part à la poubelle.",
    value:
      "Chez GEDEAS, on prend en charge toute la chaîne documentaire, de la convention jusqu'au dépôt, au certificat et à la facturation. On suit les anomalies, on relance ce qui bloque et on rend ça fluide sans alourdir le travail des équipes internes.",
    benefit:
      "Les dossiers partent, les financements sont sécurisés, et les équipes RH ou formation récupèrent du temps sur une charge lourde mais peu visible. Le sujet devient enfin traçable.",
    oral:
      "Quand les volumes montent, l’administration formation devient vite une fuite — de temps, de financement, d’énergie. Une pièce manquante, un dépôt raté, et c’est un dossier perdu. Chez GEDEAS, on prend la chaîne documentaire en main pour que chaque dossier parte, soit tracé et se termine proprement.",
    recommendedFor: ["sophie-vobore", "chloe-bonnerue", "lilian-pitault"],
  },
  {
    id: "externalisation-rh",
    vertical: "Externalisation administrative RH",
    target: "DRH, responsable RH, DAF ou service comptable",
    issue:
      "Plus une organisation accumule d'entités, de sites et de prestataires, plus le pilotage RH devient flou. Les flux tournent, mais personne n'a vraiment la lecture d'ensemble: on sent que ça avance sans savoir ce qui tient vraiment et ce qui est en train de dérailler.",
    value:
      "Chez GEDEAS, on remet de la lisibilité: on identifie les points de rupture, on standardise les pratiques, on apporte des indicateurs simples. On prend aussi en charge une partie de l'exécution sans rajouter de complexité inutile.",
    benefit:
      "L'organisation récupère de la visibilité, les flux se fluidifient et les équipes peuvent faire grandir leur organisation RH sur des bases saines sans subir les irritants du quotidien.",
    oral:
      "Beaucoup d’entreprises ont des flux RH qui tournent, mais sans vraie lecture d’ensemble. On sent que ça avance — sans savoir ce qui tient et ce qui va craquer. Chez GEDEAS, on remet de la lisibilité et de la discipline opérationnelle pour que l’organisation sache enfin où elle en est.",
    recommendedFor: ["yann-pierron", "nathalie-reveil", "lilian-pitault"],
  },
  {
    id: "retouche-couture-magasins",
    vertical: "Retouche / couture (magasins)",
    target: "Responsable magasin, gérant ou responsable exploitation",
    issue:
      "Dans un magasin, une retouche qui traîne, c'est une vente qui s'échappe. Le client a trouvé le vêtement, mais si la promesse de service n'est pas au rendez-vous, il repart sans.",
    value:
      "Chez GEDEAS, on apporte un service de retouche de proximité, rapide et régulier. On s'intègre dans le fonctionnement du magasin pour que la retouche devienne un vrai argument de vente.",
    benefit:
      "L'expérience client est fluide, la vente est sécurisée, et le magasin dispose d'un partenaire local sur lequel il peut compter dans la durée.",
    oral:
      "Dans un magasin, une retouche ne doit pas devenir un point de friction. Chez GEDEAS, on apporte une solution locale, rapide et fiable — pour que la retouche soutienne la vente au lieu de la ralentir.",
    recommendedFor: ["aurelie-gasselin", "lilian-pitault"],
  },
  {
    id: "upcycling-recyclage-textile",
    vertical: "Upcycling / recyclage textile",
    target: "Entreprise, achats, exploitation ou pilote RSE",
    issue:
      "Les entreprises qui gèrent des volumes de textiles professionnels ont une obligation légale de recyclage, mais peu disposent d'une filière concrète, traçable et valorisable.",
    value:
      "Chez GEDEAS, on prend en charge la récupération, le tri et la transformation de ces textiles en objets utiles ou valorisables. On documente le circuit et on donne à cette démarche une histoire sociale et environnementale facile à communiquer.",
    benefit:
      "L'obligation légale est couverte, la démarche RSE devient visible et crédible, et ce qui était un stock dormant ou un coût de destruction devient une ressource locale, traçable et racontable.",
    oral:
      "Beaucoup d’entreprises ont une obligation de recyclage textile sans filière vraiment solide derrière. Chez GEDEAS, on prend en charge la récupération et la transformation — pour que cette obligation devienne une preuve RSE concrète, documentée et facile à valoriser.",
    recommendedFor: ["aurelie-gasselin", "lilian-pitault"],
  },
  {
    id: "drh-transverse",
    vertical: "Pitch interlocuteur",
    target: "DRH",
    issue:
      "En multi-sites, les DRH doivent arbitrer entre conformité, charge des équipes, image employeur et budget, souvent sans vision claire du terrain. Les sujets sensibles avancent au coup par coup, sans pilotage global.",
    value:
      "Chez GEDEAS, on intervient sur les sujets qui restent flous malgré les efforts: handicap, visites médicales, formation, flux RH. On audite, on remet au carré, on structure le pilotage.",
    benefit:
      "Les DRH décident plus vite, justifient leurs choix avec des preuves solides et redonnent de la bande passante à leurs équipes.",
    oral:
      "En tant que DRH, vous avez souvent des sujets qui avancent — mais sans vraie lecture globale. Chez GEDEAS, on vous aide à remettre ces sujets au carré, à mieux les piloter et à redonner du temps à vos équipes. Avec des preuves plus solides à la clé.",
    recommendedFor: [
      "marjorie-louis",
      "chloe-bonnerue",
      "nathalie-reveil",
      "yann-pierron",
      "lilian-pitault",
    ],
  },
  {
    id: "daf-transverse",
    vertical: "Pitch interlocuteur",
    target: "DAF",
    issue:
      "Certaines charges semblent inévitables alors qu'elles traduisent souvent un manque de pilotage ou d'anticipation: contribution handicap non optimisée, coûts cachés de non-conformité, flux mal suivis.",
    value:
      "Chez GEDEAS, on relie lecture économique des sujets, audit et structuration des flux. On donne de la clarté là où il y a aujourd'hui de la dépense subie ou du risque mal mesuré.",
    benefit:
      "Le DAF peut mieux arbitrer, sécuriser ses budgets et limiter des coûts évitables avec des actions justifiables par des gains mesurables.",
    oral:
      "Beaucoup de DAF supportent des coûts qui ressemblent à des fatalités — alors qu’ils viennent souvent d’un manque de pilotage. Contribution handicap, non-conformité, flux mal suivis... Chez GEDEAS, on clarifie ces zones grises pour que l’entreprise subisse moins et arbitre mieux.",
    recommendedFor: ["marjorie-louis", "yann-pierron", "lilian-pitault"],
  },
  {
    id: "rrh-responsable-rh",
    vertical: "Pitch interlocuteur",
    target: "RRH / responsable RH",
    issue:
      "Les RRH portent une masse croissante de suivis, de relances et de micro-décisions qui saturent leur quotidien. Ils savent que les sujets sont importants, mais ils n'ont ni le temps ni les outils pour tout tenir sous contrôle.",
    value:
      "Chez GEDEAS, on apporte un appui très opérationnel: méthodes simples, cadre de suivi, relances, remise en ordre et exécution fiable sur les flux sensibles.",
    benefit:
      "Le responsable RH récupère de la lisibilité, de la régularité et du temps utile. Il garde la main sur ses sujets sans avoir à tout absorber seul.",
    oral:
      "Quand on est responsable RH, les sujets importants deviennent vite une addition de petites urgences. Chez GEDEAS, on aide à remettre de l’ordre, à tenir le rythme et à fiabiliser l’exécution — pour que vous gardiez la maîtrise sans porter seul toute la charge.",
    recommendedFor: [
      "chloe-bonnerue",
      "nathalie-reveil",
      "sophie-vobore",
      "lilian-pitault",
    ],
  },
  {
    id: "achats-rse",
    vertical: "Pitch interlocuteur",
    target: "Responsable achats / pilote RSE",
    issue:
      "Les responsables achats et pilotes RSE doivent produire des preuves concrètes sur le handicap, les clauses sociales et les achats responsables. La politique existe sur le papier, la démonstration terrain beaucoup moins.",
    value:
      "Chez GEDEAS, on relie exécution terrain, achats auprès de structures adaptées et preuves documentaires. On rend la politique plus tangible, plus défendable et utile au-delà des appels d'offres.",
    benefit:
      "Les équipes achats et RSE gagnent en crédibilité et en impact. Elles documentent mieux leurs engagements et sortent d'une logique purement déclarative.",
    oral:
      "Sur les achats et la RSE, le plus dur n’est pas d’afficher une intention — c’est de prouver des actions solides. Chez GEDEAS, on relie le terrain, les preuves et l’utilité concrète pour que votre politique soit crédible, mesurable et défendable.",
    recommendedFor: [
      "marjorie-louis",
      "aurelie-gasselin",
      "lilian-pitault",
    ],
  },
  {
    id: "magasin-transverse",
    vertical: "Pitch interlocuteur",
    target: "Responsable magasin",
    issue:
      "Dans un magasin, une retouche mal gérée ou trop lente peut casser une vente, dégrader l'expérience client ou compliquer le quotidien de l'équipe.",
    value:
      "Chez GEDEAS, on apporte un service de proximité, réactif et très concret: on récupère, on ajuste, on restitue vite.",
    benefit:
      "La vente se fluidifie, le client est rassuré, et le magasin s'appuie sur un partenaire local fiable pour tenir sa promesse de service dans la durée.",
    oral:
      "Dans un magasin, une retouche ne doit pas devenir un point de friction. Chez GEDEAS, on apporte une solution locale, rapide et fiable — pour que la retouche soutienne la vente au lieu de la ralentir.",
    recommendedFor: ["aurelie-gasselin"],
  },
];

function pitchOral(id: string) {
  return verticalPitches.find((pitch) => pitch.id === id)?.oral || "";
}

export const argumentBridges: ArgumentBridge[] = [
  {
    id: "handicap-pilotage-preuves",
    title: "Passer d'actions dispersées à un pilotage défendable",
    discoveryThemeId: "pilotage-handicap",
    youWho:
      "Vous qui avez déjà des actions handicap sur plusieurs sites, avec [prénom du référent] qui porte les RQTH, [prénom RH] qui suit les actions et des achats responsables à valoriser, mais sans vision consolidée des preuves, des priorités et de ce que cela change réellement pour vos équipes.",
    solutionBenefit:
      "La solution que je vous propose va permettre de structurer vos actions handicap, de les rendre visibles et de montrer leur impact RH, RSE, OETH et économique.",
    thanksTo: [
      "Audit de l'existant: RQTH, achats EA/ESAT, sensibilisations, preuves et données disponibles.",
      "Lecture des risques, priorités, contribution OETH et interlocuteurs à embarquer.",
      "Feuille de route simple avec actions, responsables, jalons et éléments à présenter en interne.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui avez déjà des actions handicap sur plusieurs sites, avec un relais handicap mobilisé, des RQTH accompagnées et des achats responsables à valoriser, mais sans vision consolidée des preuves ni des priorités, la solution que je vous propose va permettre de structurer vos actions, de les rendre visibles et de montrer leur impact réel. Grâce à un audit de l'existant, une lecture OETH/RSE des risques et une feuille de route simple avec actions, responsables et jalons, vous pourrez défendre le sujet plus facilement en interne. Qu'en pensez-vous ?",
    coachNote:
      "Remplacer les crochets par les prénoms, chiffres, sites, preuves et achats réellement découverts.",
    recommendedFor: ["marjorie-louis", "chloe-bonnerue", "lilian-pitault"],
  },
  {
    id: "handicap-decision-budget",
    title: "Faire remonter le sujet au bon niveau de décision",
    discoveryThemeId: "interlocuteur-decision",
    youWho:
      "Vous qui avez un référent handicap motivé, mais qui devez aussi embarquer la direction, le DAF ou les achats pour transformer une bonne intention en décision concrète.",
    solutionBenefit:
      "La solution que je vous propose va permettre de traduire le sujet handicap en langage décideur: contribution OETH, risques, preuves RSE, achats responsables et priorités d'action.",
    thanksTo: [
      "Argumentaire relié à la contribution, aux achats responsables et aux preuves RSE attendues en interne ou dans les appels d'offres.",
      "Priorisation des actions selon impact social, faisabilité et effet économique.",
      "Support de synthèse utilisable avec le DAF, la DRH, la direction ou les achats.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui avez un référent handicap motivé, mais qui devez embarquer la direction et le financier avant de lancer une suite, la solution que je vous propose va permettre de rendre le sujet plus clair, plus défendable et plus arbitrable. Grâce à une synthèse reliée aux preuves RSE, aux achats responsables, à la contribution OETH et aux priorités d'action, vous aurez une base concrète pour faire décider sans rester uniquement sur l'intention. Qu'en pensez-vous ?",
    coachNote:
      "Nommer le décideur ou la fonction réellement citée par le client, puis relier l'argument à son critère de décision.",
    recommendedFor: ["marjorie-louis", "lilian-pitault"],
  },
  {
    id: "transverse-clarifier-besoin",
    title: "Transformer une demande floue en besoin qualifié",
    discoveryThemeId: "besoin-visible",
    youWho:
      "Vous qui partez d'une demande encore large, par exemple une sensibilisation, une question d'alternance ou un sujet de suivi RH, avec plusieurs personnes internes qui n'ont pas exactement la même attente.",
    solutionBenefit:
      "La solution que je vous propose va permettre de clarifier le vrai besoin avant de choisir une action, pour éviter de partir sur une sensibilisation, un dossier ou une mise en relation trop étroite.",
    thanksTo: [
      "Questions de tri entre temps, risque, image, preuve et coordination.",
      "Reformulation du besoin en enjeu opérationnel clair.",
      "Orientation vers Marjorie, Sophie, Nathalie, Yann ou Aurélie selon le sujet réellement découvert.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui partez d'une demande encore large, avec une première demande de sensibilisation mais aussi des sujets d'alternance, de visites ou de preuves RSE qui apparaissent en filigrane, la solution que je vous propose va permettre de clarifier le vrai besoin avant de choisir une action. Grâce à une étape courte de qualification, des questions de tri et une reformulation claire, on pourra orienter vers le bon pôle GDS sans vous engager dans une mauvaise direction. Qu'en pensez-vous ?",
    coachNote:
      "Chloé doit reprendre les mots exacts du client: sujet visible, personnes concernées et conséquence attendue.",
    recommendedFor: ["chloe-bonnerue", "lilian-pitault"],
  },
  {
    id: "transverse-coordination",
    title: "Relier le sujet apparent aux flux RH cachés",
    discoveryThemeId: "transversalite",
    youWho:
      "Vous qui évoquez une action ponctuelle, mais qui avez aussi des flux formation, alternance ou suivi RH qui mobilisent [prénom RH], [prénom manager] ou vos interlocuteurs par entité au quotidien.",
    solutionBenefit:
      "La solution que je vous propose va permettre de relier le sujet visible aux flux qui le rendent complexe, pour traiter la bonne cause plutôt qu'un simple symptôme.",
    thanksTo: [
      "Lecture transverse handicap, formation, alternance, visites médicales et administratif RH.",
      "Redistribution au bon collaborateur GDS avec un relais clair pour le client.",
      "Qualification des interlocuteurs internes à associer: RH, achats, DAF, manager ou référent handicap.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui évoquez d'abord une action ponctuelle, mais qui avez aussi des sujets de formation, d'alternance ou de suivi RH qui mobilisent plusieurs personnes par entité, la solution que je vous propose va permettre de relier le sujet visible aux flux qui le rendent complexe. Grâce à une lecture transverse GDS, à l'identification du bon interlocuteur et à une qualification courte des personnes à associer, on évite de traiter seulement le symptôme. Qu'en pensez-vous ?",
    coachNote:
      "Remplacer les prénoms exemples par les vrais interlocuteurs repérés dans l'échange.",
    recommendedFor: ["chloe-bonnerue", "sophie-vobore", "lilian-pitault"],
  },
  {
    id: "visites-conformite-visible",
    title: "Retrouver une vision fiable des visites médicales",
    discoveryThemeId: "etat-conformite",
    youWho:
      "Vous qui avez des données dispersées entre plusieurs sites ou centres de santé, avec des collaborateurs itinérants difficiles à mobiliser et des retards que [prénom RH] doit vérifier avant chaque alerte.",
    solutionBenefit:
      "La solution que je vous propose va permettre de consolider l'état réel des visites médicales, de prioriser les retards et de sécuriser vos preuves de conformité.",
    thanksTo: [
      "Audit des sites, statuts, retards, publics sensibles, VRP ou métiers à habilitation.",
      "Collecte des données auprès des centres de santé au travail et reprise des rattachements manquants.",
      "Reporting simple des retards, priorités, causes et actions en cours.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui avez, par exemple, plusieurs sites, plusieurs centres de santé à coordonner et des collaborateurs itinérants qui annulent ou honorent difficilement leurs rendez-vous, la solution que je vous propose va permettre de consolider l'état réel des visites médicales, de prioriser les retards et de sécuriser vos preuves de conformité. Grâce à un audit des sites, à la collecte auprès des centres de santé au travail et à un reporting simple des causes, priorités et actions en cours, vous reprenez une vision fiable du sujet. Qu'en pensez-vous ?",
    coachNote:
      "Utiliser les chiffres découverts: salariés, sites, centres SPST, retards, visites non honorées, temps RH ou pénalités potentielles.",
    recommendedFor: ["nathalie-reveil", "yann-pierron", "lilian-pitault"],
  },
  {
    id: "visites-charge-rh",
    title: "Sortir les relances répétitives du quotidien RH",
    discoveryThemeId: "charge-rh",
    youWho:
      "Vous qui avez une équipe RH déjà sollicitée, avec des relances répétitives, des convocations à suivre, des no-show et des arbitrages qui reviennent chaque semaine.",
    solutionBenefit:
      "La solution que je vous propose va permettre de soulager les RH tout en gardant une vision claire de ce qui avance, bloque, coûte ou reste prioritaire.",
    thanksTo: [
      "Rituel de suivi avec les RH et les SPST.",
      "Relances structurées par priorité, métier sensible et délai de périodicité.",
      "Points réguliers pour distinguer urgent, bloqué, traité et coût de visite non honorée.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui avez une équipe RH déjà sollicitée, avec des convocations à suivre, des relances qui reviennent et des visites non honorées qui finissent par coûter du temps ou de l'argent, la solution que je vous propose va permettre de soulager les RH tout en gardant la maîtrise du sujet. Grâce à un rituel de suivi, des relances priorisées et des points réguliers sur l'urgent, le bloqué, le traité et les no-show, vous sortez le répétitif du quotidien RH sans perdre la main. Qu'en pensez-vous ?",
    coachNote:
      "Faire nommer la personne qui porte la charge aujourd'hui, puis la reprendre dans le script.",
    recommendedFor: ["nathalie-reveil", "yann-pierron"],
  },
  {
    id: "formation-dossiers-financement",
    title: "Sécuriser les dossiers avant qu'ils coûtent du temps ou du financement",
    discoveryThemeId: "financement",
    youWho:
      "Vous qui gérez des dossiers formation avec conventions, dépôts OPCO, certificats et factures, avec des pièces manquantes ou des anomalies que votre équipe découvre parfois au dernier moment.",
    solutionBenefit:
      "La solution que je vous propose va permettre de sécuriser les dossiers avant qu'ils ne coûtent du temps, de la trésorerie ou du financement.",
    thanksTo: [
      "Suivi par statuts: à déposer, bloqué, validé, facturé ou à corriger.",
      "Relance des pièces, traitement des rejets OPCO et contrôle des certificats ou factures.",
      "Reporting sur les dossiers à risque et les actions attendues côté client.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui gérez des dossiers formation avec conventions, dépôts OPCO, certificats et factures, et qui découvrez parfois une pièce manquante ou une facture non conforme trop tard, la solution que je vous propose va permettre de sécuriser les dossiers avant qu'ils ne coûtent du temps ou du financement. Grâce à un suivi par statuts, à la relance des pièces, au traitement des rejets et à un reporting des dossiers à risque, vous voyez plus tôt ce qui bloque et ce qui doit être corrigé. Qu'en pensez-vous ?",
    coachNote:
      "Insérer le volume réel: nombre de dossiers, période haute, type d'anomalie ou financement concerné.",
    recommendedFor: ["sophie-vobore", "chloe-bonnerue", "lilian-pitault"],
  },
  {
    id: "formation-tracabilite",
    title: "Rendre le flux formation lisible pour l'équipe et la direction",
    discoveryThemeId: "tracabilite",
    youWho:
      "Vous qui savez traiter les dossiers, mais qui manquez d'une vue claire entre alternants recrutés, conventions signées, dossiers déposés, bloqués, validés, facturés ou à corriger quand le volume monte.",
    solutionBenefit:
      "La solution que je vous propose va permettre de rendre le flux formation lisible pour l'équipe et rassurant pour la direction.",
    thanksTo: [
      "Statuts partagés et lecture des anomalies.",
      "Synthèse régulière des dossiers signés, déposés, validés, bloqués et facturés.",
      "Règles simples pour éviter les oublis et les retards.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui savez traiter les dossiers, mais qui manquez d'une vue claire entre alternants recrutés, conventions signées, dossiers déposés, validés, facturés ou à corriger quand le volume monte, la solution que je vous propose va permettre de rendre le flux lisible pour l'équipe et rassurant pour la direction. Grâce à des statuts partagés, une synthèse régulière et des règles simples pour éviter les oublis, vous sécurisez le passage de chaque dossier. Qu'en pensez-vous ?",
    coachNote:
      "Ne pas promettre une automatisation totale: parler visibilité, règles et fiabilité du suivi.",
    recommendedFor: ["sophie-vobore"],
  },
  {
    id: "rh-flux-cadre-commun",
    title: "Donner un cadre commun aux flux RH répétitifs",
    discoveryThemeId: "cartographie-flux",
    youWho:
      "Vous qui avez des flux RH qui tournent, mais avec des pratiques différentes selon les sites, les personnes et les urgences du moment: visites médicales, alternants, réponses administratives ou factures.",
    solutionBenefit:
      "La solution que je vous propose va permettre de poser un cadre commun, de clarifier les responsabilités et d'identifier ce qui peut être externalisé proprement.",
    thanksTo: [
      "Cartographie des étapes, propriétaires, irritants et tâches répétitives déjà stabilisées.",
      "Règles de traitement et indicateurs simples.",
      "Externalisation progressive des tâches répétitives stabilisées.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui avez des flux RH qui tournent, mais avec des pratiques différentes selon les sites, les personnes et les urgences du moment, notamment sur les visites, les alternants, les réponses administratives ou les factures, la solution que je vous propose va permettre de poser un cadre commun et d'identifier ce qui peut être externalisé proprement. Grâce à une cartographie des étapes, des propriétaires et des irritants, puis à quelques règles de traitement et indicateurs simples, on sécurise avant de déléguer. Qu'en pensez-vous ?",
    coachNote:
      "Toujours parler d'externalisation progressive après avoir décrit le flux réel du client.",
    recommendedFor: ["yann-pierron", "lilian-pitault"],
  },
  {
    id: "rh-indicateurs-ruptures",
    title: "Transformer les irritants administratifs en indicateurs pilotables",
    discoveryThemeId: "indicateurs",
    youWho:
      "Vous qui subissez des relances, retards, factures perdues, comptes bloqués ou validations qui restent dans les mails, avec des irritants qui paraissent petits mais finissent par créer de vraies ruptures.",
    solutionBenefit:
      "La solution que je vous propose va permettre de transformer ces irritants en indicateurs simples pour agir avant que la situation ne bloque.",
    thanksTo: [
      "Indicateurs de délais, blocages, responsabilités et points de reprise.",
      "Rituels de suivi courts.",
      "Traitement priorisé des irritants qui menacent la continuité.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui subissez des relances, retards, factures perdues ou comptes bloqués, avec des irritants qui paraissent petits mais finissent par créer de vraies ruptures, la solution que je vous propose va permettre de transformer ces irritants en indicateurs simples. Grâce au suivi des délais, des responsabilités, des blocages et des points de reprise, avec un rituel court et des priorités de traitement, on passe d'une correction après coup à un pilotage plus calme. Qu'en pensez-vous ?",
    coachNote:
      "Reprendre l'irritant exact entendu: facture bloquée, relance répétée, retard ou propriétaire flou.",
    recommendedFor: ["yann-pierron"],
  },
  {
    id: "couture-retouche-service",
    title: "Faire de la retouche un service qui soutient la vente",
    discoveryThemeId: "service-magasin",
    youWho:
      "Vous qui avez déjà une solution de retouche, mais avec des cas urgents, des délais, des demandes répétitives ou des clients qui aimeraient récupérer leur pantalon sous 48 heures.",
    solutionBenefit:
      "La solution que je vous propose va permettre de transformer la retouche en appui commercial complémentaire, sans bousculer ce qui fonctionne déjà.",
    thanksTo: [
      "Test sur quelques retouches urgentes ou répétitives, sans changer le prestataire principal.",
      "Proximité, passage programmé et échanges simples avec le magasin.",
      "Engagement clair sur les cas couverts, les prix et les délais réalistes.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui avez déjà une solution de retouche, mais avec des cas urgents ou des délais qui peuvent gêner le magasin au moment de vendre, la solution que je vous propose va permettre de transformer la retouche en appui commercial complémentaire. Grâce à un test sur quelques retouches ciblées, à un passage programmé et à des engagements simples sur les cas couverts, les prix et les délais, vous vérifiez l'intérêt sans changer tout votre fonctionnement. Qu'en pensez-vous ?",
    coachNote:
      "Ne jamais attaquer le prestataire existant: parler complémentarité et test limité.",
    recommendedFor: ["aurelie-gasselin", "lilian-pitault"],
  },
  {
    id: "couture-textile-rse",
    title: "Rendre la démarche textile RSE concrète et racontable",
    discoveryThemeId: "textile-rse",
    youWho:
      "Vous qui avez des vêtements de travail ou textiles inutilisés, une intention RSE et besoin d'une action visible que vos équipes ou vos clients puissent comprendre.",
    solutionBenefit:
      "La solution que je vous propose va permettre de passer d'un stock dormant à un usage concret, visible et racontable.",
    thanksTo: [
      "Qualification des volumes, usages et publics concernés.",
      "Prototype ou petite série pour tester l'intérêt, comme sur des textiles professionnels à revaloriser.",
      "Histoire sociale et locale mobilisable en boutique, communication interne ou client.",
    ],
    validationQuestion:
      "Qu'en pensez-vous ?",
    exampleScript:
      "Vous qui avez des vêtements de travail ou textiles inutilisés, une intention RSE et besoin d'une action visible que vos équipes ou vos clients puissent comprendre, la solution que je vous propose va permettre de passer d'un stock dormant à un usage concret et racontable. Grâce à la qualification des volumes, à un prototype ou une petite série, et à l'histoire sociale et locale portée par GDS, vous rendez la démarche plus concrète. Qu'en pensez-vous ?",
    coachNote:
      "Faire préciser l'usage final avant de parler transformation textile.",
    recommendedFor: ["aurelie-gasselin"],
  },
];

const allCommercialIds = [
  "marjorie-louis",
  "chloe-bonnerue",
  "nathalie-reveil",
  "sophie-vobore",
  "yann-pierron",
  "aurelie-gasselin",
  "lilian-pitault",
];

export const objectionPlaybooks: ObjectionPlaybook[] = [
  {
    id: "objection-prix",
    title: "Le prix",
    objection:
      "C'est intéressant, mais j'ai peur que ce soit trop cher pour nous.",
    root:
      "Le client ne rejette pas forcément la valeur; il veut être rassuré sur le lien entre investissement, enjeu prioritaire, coût du non-traitement et première étape maîtrisée.",
    steps: [
      {
        id: "welcome",
        title: "Accueillir",
        intent: "Ne pas se justifier trop vite.",
        script:
          "Je comprends, le budget est un vrai sujet et c'est normal de le regarder sérieusement.",
      },
      {
        id: "isolate",
        title: "Isoler",
        intent: "Identifier les autres freins avant de traiter.",
        script:
          "Et en dehors de ce point, quels sont les autres freins que vous avez vis-à-vis de ma proposition ?",
      },
      {
        id: "dig",
        title: "Creuser",
        intent: "Préciser l'origine concrète de l'objection prix.",
        script:
          "Je voudrais comprendre ce qui rend le prix difficile à accepter avant de vous répondre trop vite.",
        questions: [
          "Qu'est-ce qui vous donne ce sentiment de prix trop élevé ?",
          "Par rapport à quel budget ou quelle alternative comparez-vous ?",
          "Qu'est-ce qu'il faudrait voir pour considérer que l'investissement est cohérent ?",
        ],
      },
      {
        id: "treat",
        title: "Traiter",
        intent: "Relier prix, valeur et première phase maîtrisée.",
        script:
          "L'idée n'est pas d'ajouter une dépense, mais de traiter un enjeu qui vous coûte déjà quelque chose. On peut cadrer une première phase limitée, avec un périmètre clair et des preuves attendues, pour vérifier la valeur avant d'aller plus loin.",
      },
      {
        id: "validate",
        title: "Valider",
        intent: "Ramener le client vers une décision concrète.",
        script:
          "Si on cadre une première étape proportionnée à l'enjeu que vous venez de décrire, est-ce que cela répond à votre réserve sur le prix ?",
      },
    ],
    recommendedFor: allCommercialIds,
  },
  {
    id: "objection-actions-deja-en-place",
    title: "Le client a déjà des actions",
    objection:
      "Nous avons déjà des actions en place, je ne sais pas si cela vaut le coup de remettre tout le sujet sur la table.",
    root:
      "Le client craint de dévaloriser l'existant ou de lancer un chantier trop lourd.",
    steps: [
      {
        id: "welcome",
        title: "Accueillir",
        intent: "Reconnaître l'existant sans le contester.",
        script:
          "Je comprends, et c'est plutôt bon signe si des actions existent déjà. L'idée n'est pas de repartir de zéro.",
      },
      {
        id: "isolate",
        title: "Isoler",
        intent: "Identifier les autres freins avant de traiter.",
        script:
          "Et en dehors de ce point, quels sont les autres freins que vous avez vis-à-vis de ma proposition ?",
      },
      {
        id: "dig",
        title: "Creuser",
        intent: "Faire émerger le manque de pilotage ou de preuves.",
        script:
          "Je vais préciser où l'existant est déjà solide et où il reste fragile.",
        questions: [
          "Qu'est-ce qui fonctionne vraiment bien dans vos actions actuelles ?",
          "Qu'est-ce qui reste difficile à prouver ou à défendre en interne ?",
          "Si vous deviez montrer votre progression demain, quelles preuves vous manqueraient ?",
        ],
      },
      {
        id: "treat",
        title: "Traiter",
        intent: "Repositionner GDS sur la lisibilité, pas sur l'ajout d'actions.",
        script:
          "Justement, notre intervention sert à valoriser l'existant, à repérer ce qui manque et à rendre l'ensemble plus lisible pour la RH, la RSE ou la direction.",
      },
      {
        id: "validate",
        title: "Valider",
        intent: "Obtenir un accord de principe sur la prochaine étape.",
        script:
          "Si l'objectif est de clarifier l'existant sans alourdir le dispositif, est-ce que cela répond à votre réserve ?",
      },
    ],
    recommendedFor: ["marjorie-louis", "lilian-pitault"],
  },
  {
    id: "objection-besoin-flou",
    title: "Le besoin n'est pas encore clair",
    objection:
      "Je ne sais pas encore si notre besoin est assez clair pour lancer quelque chose.",
    root:
      "Le client veut avancer, mais il a peur de s'engager trop vite sur une mauvaise solution.",
    steps: [
      {
        id: "welcome",
        title: "Accueillir",
        intent: "Rassurer sur le fait que le flou est une étape normale.",
        script:
          "C'est justement normal à ce stade. Il vaut mieux clarifier avant de choisir une solution.",
      },
      {
        id: "isolate",
        title: "Isoler",
        intent: "Identifier les autres freins avant de traiter.",
        script:
          "Et en dehors de ce point, quels sont les autres freins que vous avez vis-à-vis de ma proposition ?",
      },
      {
        id: "dig",
        title: "Creuser",
        intent: "Identifier l'axe dominant.",
        script:
          "Je vais chercher ce qui est flou pour éviter de vous proposer une action trop large ou trop étroite.",
        questions: [
          "Qu'est-ce qui n'est pas encore clair pour vous aujourd'hui ?",
          "Qui doit être associé pour que le périmètre soit juste ?",
          "Le flou porte plutôt sur le temps, la coordination, le risque, l'image ou la preuve ?",
        ],
      },
      {
        id: "treat",
        title: "Traiter",
        intent: "Proposer une qualification courte.",
        script:
          "Je vous propose de ne pas lancer une mission complète maintenant, mais une étape courte de qualification pour nommer le vrai besoin et orienter vers le bon pôle.",
      },
      {
        id: "validate",
        title: "Valider",
        intent: "Faire valider une suite légère.",
        script:
          "Est-ce que cette étape courte vous semble plus adaptée qu'une proposition trop précise maintenant ?",
      },
    ],
    recommendedFor: ["chloe-bonnerue", "sophie-vobore", "lilian-pitault"],
  },
  {
    id: "objection-suivi-interne",
    title: "C'est juste un sujet de suivi interne",
    objection:
      "Nous sommes globalement conformes, c'est juste un sujet de suivi interne.",
    root:
      "Le client minimise le risque parce qu'il n'a pas encore objectivé les retards, preuves ou coûts de suivi.",
    steps: [
      {
        id: "welcome",
        title: "Accueillir",
        intent: "Ne pas dramatiser.",
        script:
          "Je comprends, et si vous êtes globalement conformes, c'est évidemment une base importante.",
      },
      {
        id: "isolate",
        title: "Isoler",
        intent: "Identifier les autres freins avant de traiter.",
        script:
          "Et en dehors de ce point, quels sont les autres freins que vous avez vis-à-vis de ma proposition ?",
      },
      {
        id: "dig",
        title: "Creuser",
        intent: "Faire ressortir preuve et charge RH.",
        script:
          "Je vais objectiver ce qui reste facile ou difficile à prouver dans votre suivi actuel.",
        questions: [
          "Aujourd'hui, si vous deviez montrer rapidement qui est à jour, qui est en retard et ce qui est en cours, combien de temps cela prendrait ?",
          "Qu'est-ce qui reste manuel ou dépendant d'une seule personne ?",
          "Quel incident ou quelle demande interne rendrait ce suivi plus sensible ?",
        ],
      },
      {
        id: "treat",
        title: "Traiter",
        intent: "Repositionner sur maîtrise et sérénité.",
        script:
          "L'intérêt de GDS est justement de rendre ce suivi prouvable et moins consommateur de temps, sans vous retirer la maîtrise du sujet.",
      },
      {
        id: "validate",
        title: "Valider",
        intent: "Obtenir l'accord sur l'audit initial.",
        script:
          "Si on commence par un audit limité pour objectiver la situation, est-ce que cela répond à votre prudence ?",
      },
    ],
    recommendedFor: ["nathalie-reveil", "yann-pierron", "lilian-pitault"],
  },
  {
    id: "objection-dossiers-particuliers",
    title: "Nos dossiers sont particuliers",
    objection:
      "Nos dossiers sont particuliers, je ne suis pas sûre qu'un prestataire puisse s'adapter.",
    root:
      "Le client protège son expertise interne et craint une prestation trop standardisée.",
    steps: [
      {
        id: "welcome",
        title: "Accueillir",
        intent: "Reconnaître la spécificité métier.",
        script:
          "Je comprends très bien. Sur la formation, chaque organisation a ses règles, ses habitudes et ses exceptions.",
      },
      {
        id: "isolate",
        title: "Isoler",
        intent: "Identifier les autres freins avant de traiter.",
        script:
          "Et en dehors de ce point, quels sont les autres freins que vous avez vis-à-vis de ma proposition ?",
      },
      {
        id: "dig",
        title: "Creuser",
        intent: "Identifier le segment répétitif acceptable.",
        script:
          "Je vais distinguer ce qui est vraiment spécifique de ce qui peut être cadré sans perdre votre maîtrise.",
        questions: [
          "Quelles étapes sont réellement spécifiques chez vous ?",
          "Quelles étapes reviennent souvent avec les mêmes anomalies ?",
          "Qu'est-ce qui vous ferait craindre une perte de contrôle sur les dossiers ?",
        ],
      },
      {
        id: "treat",
        title: "Traiter",
        intent: "Proposer un test ciblé.",
        script:
          "On peut commencer uniquement sur le segment le plus répétitif, garder vos règles comme référence et vous restituer les statuts pour que vous gardiez le contrôle.",
      },
      {
        id: "validate",
        title: "Valider",
        intent: "Valider le test limité.",
        script:
          "Est-ce qu'un test sur ce segment, plutôt qu'une prise en charge globale, vous semblerait acceptable ?",
      },
    ],
    recommendedFor: ["sophie-vobore", "chloe-bonnerue"],
  },
  {
    id: "objection-couche-outil",
    title: "Nous avons déjà des outils",
    objection:
      "Nous avons déjà des outils et nous ne voulons pas créer une couche de plus.",
    root:
      "Le client confond parfois outil, pilotage et exécution, et craint une complexité supplémentaire.",
    steps: [
      {
        id: "welcome",
        title: "Accueillir",
        intent: "Valider la crainte de complexité.",
        script:
          "C'est une vraie vigilance. Ajouter une couche qui ne simplifie rien n'aurait aucun intérêt.",
      },
      {
        id: "isolate",
        title: "Isoler",
        intent: "Identifier les autres freins avant de traiter.",
        script:
          "Et en dehors de ce point, quels sont les autres freins que vous avez vis-à-vis de ma proposition ?",
      },
      {
        id: "dig",
        title: "Creuser",
        intent: "Chercher ce qui reste non maîtrisé malgré les outils.",
        script:
          "Je vais regarder ce que vos outils couvrent déjà et ce qui reste malgré tout fragile.",
        questions: [
          "Malgré vos outils, quels flux restent dépendants d'une personne, d'un site ou d'un suivi manuel ?",
          "Qu'est-ce qui n'est pas visible assez vite aujourd'hui ?",
          "Quelle complexité supplémentaire voulez-vous absolument éviter ?",
        ],
      },
      {
        id: "treat",
        title: "Traiter",
        intent: "Repositionner GDS sur cadre et exécution.",
        script:
          "Notre sujet n'est pas de remplacer vos outils. C'est de clarifier les règles, les responsabilités et les tâches répétitives qui restent difficiles à tenir dans la durée.",
      },
      {
        id: "validate",
        title: "Valider",
        intent: "Faire valider l'approche ciblée.",
        script:
          "Si on se limite aux flux qui restent pénibles malgré les outils, est-ce que cela répond à votre réserve ?",
      },
    ],
    recommendedFor: ["yann-pierron", "nathalie-reveil", "lilian-pitault"],
  },
  {
    id: "objection-prestataire-existant",
    title: "Nous avons déjà une solution",
    objection:
      "Nous avons déjà une couturière, je ne veux pas changer tout notre fonctionnement.",
    root:
      "Le client veut protéger une relation existante et refuse une bascule complète.",
    steps: [
      {
        id: "welcome",
        title: "Accueillir",
        intent: "Ne pas attaquer la solution actuelle.",
        script:
          "Je comprends, et si une solution fonctionne déjà sur une partie des besoins, il ne faut pas la casser.",
      },
      {
        id: "isolate",
        title: "Isoler",
        intent: "Identifier les autres freins avant de traiter.",
        script:
          "Et en dehors de ce point, quels sont les autres freins que vous avez vis-à-vis de ma proposition ?",
      },
      {
        id: "dig",
        title: "Creuser",
        intent: "Identifier les cas non couverts.",
        script:
          "Je vais chercher les cas où votre solution actuelle fonctionne moins bien, sans remettre en cause ce qui marche.",
        questions: [
          "Dans quels cas votre solution actuelle est moins confortable: urgence, volume, proximité, type de retouche ou période de charge ?",
          "Quelles demandes reviennent et restent difficiles à absorber ?",
          "Quel test limité ne bousculerait pas votre fonctionnement actuel ?",
        ],
      },
      {
        id: "treat",
        title: "Traiter",
        intent: "Proposer une complémentarité.",
        script:
          "GDS peut intervenir en complément, uniquement sur les cas non couverts ou les urgences, avec un test simple et sans modifier ce qui marche déjà.",
      },
      {
        id: "validate",
        title: "Valider",
        intent: "Faire valider le test.",
        script:
          "Est-ce qu'un test complémentaire sur quelques cas précis serait une bonne façon de vérifier l'intérêt ?",
      },
    ],
    recommendedFor: ["aurelie-gasselin", "lilian-pitault"],
  },
];

export const closingPlaybooks: ClosingPlaybook[] = [
  {
    id: "closing-handicap-audit",
    title: "Closing Handicap / QVCT",
    scenarioId: "handicap-multisites",
    targetAction: "Planifier un audit court de l'existant handicap et des preuves disponibles.",
    readinessSignals: [
      "Le client reconnaît que les actions sont dispersées.",
      "Un décideur ou comité doit être embarqué.",
      "La preuve RSE, RH ou financière devient importante.",
    ],
    recap:
      "Si je résume, vous avez déjà des actions handicap, des relais internes et peut-être des achats responsables à valoriser, mais il vous manque une vision claire, des preuves solides et une feuille de route défendable.",
    firstAction:
      "La première phase que je vous propose, c'est un audit court de l'existant: RQTH, actions, achats responsables, preuves disponibles, risques et priorités.",
    dateAndValidate:
      "Je vous propose de lancer ce cadrage mardi à 10h ou jeudi à 14h avec la personne RH ou handicap qui porte le sujet. Est-ce que l'un de ces deux créneaux est bon pour vous ?",
    strongIssueIfBlocked:
      "Je comprends que vous vouliez réfléchir. Ce qui me fait vous proposer une date maintenant, c'est que sans état des lieux, vos actions restent difficiles à défendre auprès de la direction, du DAF ou des achats.",
    contractAsk:
      "Pour que nous puissions bloquer le créneau et préparer l'audit, je vous envoie le document de mission. Est-ce que vous pouvez me le retourner signé d'ici demain fin de journée ?",
    reflectionFallback:
      "Si vous préférez réfléchir, je vous propose qu'on fixe dès maintenant un point court vendredi matin pour trancher et éviter que le sujet reste ouvert.",
    recommendedFor: ["marjorie-louis"],
  },
  {
    id: "closing-transverse-qualification",
    title: "Closing Détection transverse",
    scenarioId: "sensibilisation-alternance",
    targetAction: "Fixer une étape courte de qualification et associer le bon pôle GDS.",
    readinessSignals: [
      "Le client accepte que le besoin est encore à clarifier.",
      "Plusieurs sujets ou interlocuteurs internes apparaissent.",
      "Une action trop précise serait prématurée.",
    ],
    recap:
      "Si je résume, votre besoin existe bien, mais il touche plusieurs sujets et il faut d'abord choisir le bon angle avant de vous proposer une action.",
    firstAction:
      "La première phase que je vous propose, c'est une étape courte de qualification avec le bon interlocuteur GDS: Marjorie si c'est handicap/QVCT, Sophie si c'est formation, Nathalie si c'est visites, Yann si c'est flux RH.",
    dateAndValidate:
      "Je vous propose de poser ce point de qualification vendredi à 11h ou lundi à 9h30. Est-ce que l'un de ces créneaux vous convient ?",
    strongIssueIfBlocked:
      "Justement, si on ne cadre pas vite, vous risquez de repartir sur une demande trop large ou trop étroite, et de mobiliser les mauvaises personnes.",
    contractAsk:
      "Je vous confirme le créneau par écrit et je vous envoie les éléments de cadrage. Pouvez-vous me répondre aujourd'hui avec les participants à inviter et le sujet prioritaire à traiter ?",
    reflectionFallback:
      "Si vous avez besoin d'y réfléchir, je vous propose qu'on bloque déjà un point de décision de 15 minutes en début de semaine prochaine.",
    recommendedFor: ["chloe-bonnerue"],
  },
  {
    id: "closing-visites-audit",
    title: "Closing Visites médicales",
    scenarioId: "visites-risque",
    targetAction: "Lancer un audit initial des visites, retards, sites et priorités.",
    readinessSignals: [
      "Le client reconnaît que la visibilité n'est pas parfaite.",
      "Les relances consomment du temps RH.",
      "La preuve de conformité ou la direction entre dans la discussion.",
    ],
    recap:
      "Si je résume, le sujet est suivi, mais vous manquez d'une photographie fiable des retards, des centres concernés, des priorités et des actions en cours.",
    firstAction:
      "La première phase que je vous propose, c'est un audit initial des sites, statuts, retards, populations sensibles et points de blocage avec les centres de santé au travail.",
    dateAndValidate:
      "Je vous propose un point de lancement mercredi à 9h ou jeudi à 16h. Est-ce que l'un de ces créneaux est bon pour vous ?",
    strongIssueIfBlocked:
      "Je comprends votre prudence. Le point important, c'est que tant que la photographie n'est pas claire, vous ne pouvez pas prouver rapidement qui est à jour, qui est en retard, pourquoi ça bloque et ce qui est en cours.",
    contractAsk:
      "Pour lancer l'audit, je vous envoie le contrat et la liste des informations nécessaires. Est-ce que vous pouvez me retourner le contrat signé d'ici cet après-midi ?",
    reflectionFallback:
      "Si vous souhaitez réfléchir, fixons un point court sous 48 heures pour décider si on lance l'audit ou si on ferme le sujet.",
    recommendedFor: ["nathalie-reveil"],
  },
  {
    id: "closing-formation-test",
    title: "Closing Formation / OPCO",
    scenarioId: "formation-opco",
    targetAction: "Démarrer un test sur le segment documentaire le plus répétitif.",
    readinessSignals: [
      "Le client identifie des anomalies ou retours OPCO récurrents.",
      "La peur porte sur l'adaptation, pas sur l'intérêt du sujet.",
      "Un segment répétitif peut être isolé.",
    ],
    recap:
      "Si je résume, vos dossiers ont des spécificités, mais certaines étapes reviennent souvent: convention, dépôt OPCO, certificat, facture, anomalies ou relances.",
    firstAction:
      "La première phase que je vous propose, c'est un test limité sur le segment le plus répétitif, avec vos règles comme référence et un statut clair des dossiers.",
    dateAndValidate:
      "On peut cadrer ce test lundi à 14h ou mardi à 9h30. Est-ce que l'un de ces deux créneaux est le plus simple pour vous ?",
    strongIssueIfBlocked:
      "Je comprends votre prudence. Ce qui me fait proposer un test maintenant, c'est que chaque anomalie vue trop tard continue à consommer du temps et peut fragiliser le financement ou la facturation.",
    contractAsk:
      "Pour cadrer le test, je vous envoie la proposition courte. Est-ce que vous pouvez me la valider par retour de mail aujourd'hui ou demain matin ?",
    reflectionFallback:
      "Si vous souhaitez réfléchir, je vous propose qu'on se redise mardi prochain au plus tard si le test est lancé ou non.",
    recommendedFor: ["sophie-vobore"],
  },
  {
    id: "closing-rh-cartographie",
    title: "Closing Externalisation RH",
    scenarioId: "externalisation-flux",
    targetAction: "Lancer une cartographie courte des flux RH et points de rupture.",
    readinessSignals: [
      "Le client évoque des pratiques variables ou responsabilités floues.",
      "Les outils existent mais ne suffisent pas à piloter.",
      "Des irritants ont déjà créé des ruptures.",
    ],
    recap:
      "Si je résume, vos outils existent, mais certains flux restent variables, dépendants de personnes clés ou difficiles à piloter: visites, alternants, factures, relances ou réponses administratives.",
    firstAction:
      "La première phase que je vous propose, c'est une cartographie courte des flux concernés pour distinguer ce qui reste interne, ce qui doit être cadré et ce qui peut être externalisé progressivement.",
    dateAndValidate:
      "Je vous propose un atelier de cadrage jeudi à 11h ou vendredi à 15h. Est-ce que l'un de ces deux créneaux est possible ?",
    strongIssueIfBlocked:
      "Je comprends que vous vouliez éviter une couche de plus. Justement, sans cartographie, les irritants restent invisibles et continuent à créer des ruptures malgré les outils.",
    contractAsk:
      "Je vous envoie le cadre de mission pour cette cartographie courte. Pouvez-vous me confirmer le lancement par mail d'ici demain midi ?",
    reflectionFallback:
      "Si vous souhaitez réfléchir, bloquons un point de décision rapide cette semaine pour éviter que les flux restent dans le flou.",
    recommendedFor: ["yann-pierron"],
  },
  {
    id: "closing-couture-test",
    title: "Closing Atelier couture",
    scenarioId: "couture-magasin",
    targetAction: "Mettre en place un test local complémentaire sur quelques retouches ciblées.",
    readinessSignals: [
      "Le client ne veut pas changer tout le fonctionnement.",
      "Des cas urgents ou non couverts existent.",
      "Un test limité est acceptable.",
    ],
    recap:
      "Si je résume, votre solution actuelle fonctionne sur une partie des besoins, mais certains cas restent moins confortables pour le magasin ou le client: urgence, volume, délai ou trajet.",
    firstAction:
      "La première phase que je vous propose, c'est un test complémentaire GDS sur quelques cas précis: urgences, retouches simples, passage programmé ou période de charge.",
    dateAndValidate:
      "Est-ce qu'on peut lancer ce test dès la semaine prochaine, avec un premier dépôt mardi matin ou jeudi matin ?",
    strongIssueIfBlocked:
      "Je comprends que vous ne vouliez pas changer tout le fonctionnement. Justement, on garde ce qui marche et on teste seulement les cas qui freinent encore la vente.",
    contractAsk:
      "Je vous envoie les conditions du test et le mode de fonctionnement. Est-ce que vous pouvez me confirmer votre accord par retour de mail aujourd'hui ?",
    reflectionFallback:
      "Si vous souhaitez réfléchir, fixons un point rapide en fin de semaine pour décider si on teste ou si on laisse votre fonctionnement inchangé.",
    recommendedFor: ["aurelie-gasselin"],
  },
];

export const collaboratorPlans: CollaboratorPlan[] = [
  {
    id: "marjorie-louis",
    firstName: "Marjorie",
    fullName: "Marjorie Louis",
    role: "Pôle Handicap / QVCT",
    pole: "Handicap / QVCT",
    badge: "Audit, OETH, RSE, plan d'action",
    posture:
      "Vendre comme une continuité de l'accompagnement: écouter, qualifier, puis rendre la valeur visible.",
    promise:
      "Aider le client à transformer un sujet handicap dispersé en politique pilotée, prouvable et actionnable.",
    openingSteps: buildOpeningSteps(
      "votre politique handicap, vos actions QVCT et les preuves que vous devez produire",
      pitchOral("handicap-qvct"),
    ),
    discoveryThemes: [
      {
        id: "pilotage-handicap",
        title: "Pilotage handicap",
        intent:
          "Comprendre si le client pilote réellement le sujet ou s'il additionne des actions isolées.",
        openingQuestion:
          "Comment le sujet handicap et QVCT est-il piloté aujourd'hui chez vous ?",
        questions: [
          "Comment pilotez-vous aujourd'hui vos actions handicap et QVCT ?",
          "Qui a la vision d'ensemble entre les actions, les preuves et la contribution ?",
          "Qu'est-ce qui vous manque pour défendre le sujet en interne ?",
        ],
        followUps: [
          "Qu'avez-vous déjà tenté ?",
          "Qu'est-ce qui reste difficile malgré les actions en place ?",
          "À qui devez-vous rendre des comptes sur ce sujet ?",
        ],
        signals: [
          "Actions dispersées.",
          "Absence d'indicateurs simples.",
          "Difficulté à faire remonter le sujet au bon niveau.",
        ],
        avoid: [
          "Présenter trop vite une animation ou une action isolée.",
          "Rester sur une logique morale sans parler pilotage.",
        ],
      },
      {
        id: "interlocuteur-decision",
        title: "Interlocuteur et décision",
        intent:
          "Repérer qui porte le sujet, qui décide et qui peut financer une suite.",
        openingQuestion:
          "Comment les décisions se prennent-elles aujourd'hui sur les sujets handicap ou QVCT ?",
        questions: [
          "Qui est vraiment responsable du sujet handicap chez vous ?",
          "Qui arbitre le budget ou la priorité quand il faut passer à l'action ?",
          "Le sujet est-il plutôt RH, RSE, financier ou les trois ?",
        ],
        followUps: [
          "Le DAF ou la direction voient-ils le coût du non-traitement ?",
          "Le référent handicap a-t-il assez de poids pour lancer une démarche ?",
          "Quel serait le bon format pour embarquer la direction ?",
        ],
        signals: [
          "Référent motivé mais isolé.",
          "Décideur non présent dans l'échange.",
          "Budget non identifié.",
        ],
        avoid: [
          "Rester avec un interlocuteur sympathique mais non décideur.",
          "Accepter une demande de devis sans comprendre le circuit de décision.",
        ],
      },
      {
        id: "preuves-rse",
        title: "Preuves RSE et contribution",
        intent:
          "Relier le sujet humain aux preuves attendues, aux achats responsables et à l'économie du dossier.",
        openingQuestion:
          "Quelles preuves ou quels résultats devez-vous pouvoir montrer sur ces sujets ?",
        questions: [
          "Quelles preuves devez-vous produire sur le handicap ou les achats responsables ?",
          "Avez-vous une lecture claire de votre contribution et des leviers possibles ?",
          "Comment montrez-vous que les actions ont un impact réel ?",
        ],
        followUps: [
          "Qu'est-ce qui serait utile pour un comité RH ou RSE ?",
          "Quels indicateurs seraient crédibles en interne ?",
          "Quel risque voyez-vous si le sujet reste flou ?",
        ],
        signals: [
          "Confusion entre action ponctuelle et politique suivie.",
          "Besoin de preuves pour appel d'offres.",
          "Contribution subie plutôt que pilotée.",
        ],
        avoid: [
          "Réduire le sujet à une économie de contribution.",
          "Oublier la preuve et la traçabilité.",
        ],
      },
    ],
    nextActions: [
      "Identifier le décideur réel derrière chaque demande handicap.",
      "Faire verbaliser une conséquence avant de proposer une action.",
      "Terminer chaque échange par une prochaine étape datée.",
    ],
    pitchIds: ["handicap-qvct", "drh-transverse", "daf-transverse", "achats-rse"],
    scenarioIds: ["handicap-multisites"],
  },
  {
    id: "chloe-bonnerue",
    firstName: "Chloé",
    fullName: "Chloé Bonnerue",
    role: "Détection transverse",
    pole: "Handicap, alternance, sensibilisation",
    badge: "Questionnement, reformulation, orientation",
    posture:
      "Faire émerger le besoin sans perdre la qualité relationnelle: écouter large, reformuler simple, orienter juste.",
    promise:
      "Aider le client à nommer son vrai besoin puis à le raccrocher au bon pôle GDS.",
    openingSteps: buildOpeningSteps(
      "vos sujets handicap, alternance, sensibilisation ou suivi RH",
      pitchOral("handicap-qvct"),
    ),
    discoveryThemes: [
      {
        id: "besoin-visible",
        title: "Besoin visible",
        intent:
          "Partir de la demande exprimée, sans la prendre pour le vrai besoin final.",
        openingQuestion:
          "Dites-moi comment le sujet se présente chez vous aujourd'hui.",
        questions: [
          "Qu'est-ce qui vous amène à regarder ce sujet maintenant ?",
          "Qu'attendez-vous concrètement d'un partenaire externe ?",
          "Si on réussissait l'accompagnement, qu'est-ce qui changerait chez vous ?",
        ],
        followUps: [
          "Depuis quand le sujet existe-t-il ?",
          "Qu'est-ce qui rend la situation plus urgente aujourd'hui ?",
          "Qui ressent le plus cette difficulté ?",
        ],
        signals: [
          "Demande formulée de manière vague.",
          "Besoin de réassurance.",
          "Plusieurs pôles GDS potentiellement concernés.",
        ],
        avoid: [
          "Répondre uniquement à la demande apparente.",
          "Orienter trop vite vers un seul pôle.",
        ],
      },
      {
        id: "transversalite",
        title: "Transversalité GDS",
        intent:
          "Détecter les opportunités qui démarrent sur un sujet mais ouvrent vers un autre.",
        openingQuestion:
          "Quand vous regardez ce sujet, quelles autres équipes ou quels autres flux sont concernés ?",
        questions: [
          "Ce sujet touche-t-il aussi vos RH, vos achats ou vos managers ?",
          "Avez-vous d'autres flux associés: formation, alternance, visites, reporting ?",
          "À qui faudrait-il parler si l'on voulait traiter le problème globalement ?",
        ],
        followUps: [
          "Le sujet est-il déjà suivi dans un tableau ou un reporting ?",
          "Quelles équipes sont sollicitées aujourd'hui ?",
          "Quel autre sujet pourrait être traité en même temps ?",
        ],
        signals: [
          "Besoin initial qui cache un flux documentaire.",
          "Plusieurs interlocuteurs internes.",
          "Opportunité de passer d'un one-shot à un accompagnement.",
        ],
        avoid: [
          "Oublier de redistribuer l'information au bon collaborateur.",
          "Rester dans une conversation sympathique sans qualifier.",
        ],
      },
      {
        id: "reformulation",
        title: "Reformulation de valeur",
        intent:
          "Transformer ce que dit le client en enjeu clair, sans dramatiser.",
        openingQuestion:
          "Si vous deviez résumer l'enjeu principal, qu'est-ce qui compte le plus pour vous ?",
        questions: [
          "Si je reformule, votre sujet principal est plutôt le temps, le risque, l'image ou la preuve ?",
          "Quelles conséquences voyez-vous si rien ne change ?",
          "Quelle serait la première amélioration visible pour vous ?",
        ],
        followUps: [
          "Est-ce que je résume correctement ?",
          "Qu'est-ce qui est le plus important à vos yeux ?",
          "Sur quoi faudrait-il être très fiable ?",
        ],
        signals: [
          "Client qui se corrige pendant la reformulation.",
          "Priorité qui devient plus nette.",
          "Langage client réutilisable pour argumenter.",
        ],
        avoid: [
          "Paraphraser sans faire progresser la compréhension.",
          "Utiliser trop de vocabulaire interne GDS.",
        ],
      },
    ],
    nextActions: [
      "Toujours reformuler le besoin avant de parler solution.",
      "Noter le pôle GDS le plus pertinent après chaque échange.",
      "Demander qui doit être associé à la suite.",
    ],
    pitchIds: [
      "handicap-qvct",
      "formation-opco",
      "drh-transverse",
      "rrh-responsable-rh",
    ],
    scenarioIds: ["sensibilisation-alternance"],
  },
  {
    id: "nathalie-reveil",
    firstName: "Nathalie",
    fullName: "Nathalie Reveil",
    role: "Pôle visites médicales",
    pole: "Visites médicales",
    badge: "Conformité, audit, reporting, risque",
    posture:
      "Faire passer la visite médicale d'une tâche administrative à un sujet de maîtrise du risque.",
    promise:
      "Aider les RH à savoir où elles en sont, ce qui est en retard et comment reprendre le contrôle.",
    openingSteps: buildOpeningSteps(
      "la gestion de vos visites médicales, vos retards éventuels et votre niveau de conformité",
      pitchOral("visites-medicales"),
    ),
    discoveryThemes: [
      {
        id: "etat-conformite",
        title: "État de conformité",
        intent:
          "Faire émerger le niveau réel de visibilité sur les retards, convocations et suivis renforcés.",
        openingQuestion:
          "Comment se passe aujourd'hui le suivi des visites médicales chez vous ?",
        questions: [
          "Savez-vous précisément qui est à jour et qui ne l'est pas ?",
          "Comment suivez-vous les retards aujourd'hui ?",
          "Quels publics sont les plus difficiles à couvrir ?",
        ],
        followUps: [
          "À quelle fréquence regardez-vous le sujet ?",
          "Qu'est-ce qui remonte facilement, et qu'est-ce qui reste flou ?",
          "Avez-vous déjà eu une alerte ou une situation inconfortable ?",
        ],
        signals: [
          "Tableaux dispersés.",
          "Retards connus mais non priorisés.",
          "Populations multi-sites ou itinérantes.",
        ],
        avoid: [
          "Présenter le sujet comme une simple délégation administrative.",
          "Oublier le risque employeur.",
        ],
      },
      {
        id: "charge-rh",
        title: "Charge RH",
        intent:
          "Mesurer le poids opérationnel et l'usure liée aux relances, convocations et relations SPST.",
        openingQuestion:
          "Qu'est-ce qui est le plus lourd aujourd'hui dans la gestion des visites médicales ?",
        questions: [
          "Combien de temps vos équipes passent-elles sur les relances et convocations ?",
          "Qu'est-ce qui revient sans cesse dans la gestion quotidienne ?",
          "Quels irritants pourraient être sortis du quotidien RH ?",
        ],
        followUps: [
          "Qui porte réellement ce suivi ?",
          "Qu'est-ce qui bloque quand la personne n'est pas disponible ?",
          "Quel reporting serait vraiment utile ?",
        ],
        signals: [
          "Sujet porté par une seule personne.",
          "Relances répétitives.",
          "Manque de reporting lisible.",
        ],
        avoid: [
          "Sous-estimer la charge mentale du sujet.",
          "Parler outil avant d'avoir parlé fonctionnement.",
        ],
      },
      {
        id: "risque-direction",
        title: "Risque direction",
        intent:
          "Relier les visites médicales à la responsabilité, aux preuves et à la sérénité de pilotage.",
        openingQuestion:
          "Qu'est-ce qui vous inquiète le plus si vous deviez prouver votre conformité demain ?",
        questions: [
          "Que se passerait-il si un incident révélait un retard de suivi ?",
          "Qui serait exposé si la conformité n'était pas prouvable ?",
          "Quelles preuves voudriez-vous pouvoir présenter à la direction ?",
        ],
        followUps: [
          "Le sujet est-il déjà vu comme un risque par la direction ?",
          "Qu'est-ce qui déclencherait une décision plus rapide ?",
          "Avez-vous besoin d'un audit pour objectiver la situation ?",
        ],
        signals: [
          "Direction peu consciente du risque.",
          "Besoin d'audit initial.",
          "Mots comme preuve, sécurité, responsabilité.",
        ],
        avoid: [
          "Faire peur sans objectiver.",
          "Oublier de proposer une première étape de diagnostic.",
        ],
      },
    ],
    nextActions: [
      "Demander une photographie de la conformité avant de proposer une solution.",
      "Relier chaque irritant à une conséquence RH ou direction.",
      "Proposer un audit initial comme prochaine étape simple.",
    ],
    pitchIds: [
      "visites-medicales",
      "rrh-responsable-rh",
      "drh-transverse",
      "externalisation-rh",
    ],
    scenarioIds: ["visites-risque"],
  },
  {
    id: "sophie-vobore",
    firstName: "Sophie",
    fullName: "Sophie Vobore",
    role: "Administration formation",
    pole: "Formation / OPCO / alternance",
    badge: "Dossiers, conventions, certificats, facturation",
    posture:
      "Rendre visible une valeur administrative souvent invisible: sécurité, traçabilité et financement.",
    promise:
      "Aider le client à sécuriser chaque dossier formation ou alternance, de la convention à la facturation.",
    openingSteps: buildOpeningSteps(
      "vos dossiers formation, alternance, conventions et dépôts OPCO",
      pitchOral("formation-opco"),
    ),
    discoveryThemes: [
      {
        id: "volume-dossiers",
        title: "Volume et flux",
        intent:
          "Comprendre si le client subit un volume ou une complexité qui dépasse ses moyens internes.",
        openingQuestion:
          "Comment se passe aujourd'hui la gestion de vos dossiers formation et alternance ?",
        questions: [
          "Combien de dossiers formation ou alternance gérez-vous sur une période haute ?",
          "Quels documents ou étapes créent le plus d'anomalies ?",
          "Où perdez-vous le plus de temps entre convention, dépôt, certificat et facture ?",
        ],
        followUps: [
          "Qui relance quand une pièce manque ?",
          "Comment voyez-vous ce qui est bloqué ?",
          "Le volume est-il régulier ou saisonnier ?",
        ],
        signals: [
          "Volume élevé.",
          "Pièces manquantes.",
          "Suivi par tableaux dispersés.",
        ],
        avoid: [
          "Parler uniquement de saisie administrative.",
          "Oublier l'impact financier des dossiers bloqués.",
        ],
      },
      {
        id: "financement",
        title: "Financement et OPCO",
        intent:
          "Faire verbaliser les risques de perte de financement et les irritants de coordination.",
        openingQuestion:
          "Comment sécurisez-vous aujourd'hui les financements et les retours OPCO ?",
        questions: [
          "Avez-vous déjà perdu du financement ou du temps à cause d'un dossier incomplet ?",
          "Comment suivez-vous les dépôts et retours OPCO ?",
          "Qu'est-ce qui vous permet de savoir qu'un dossier est vraiment sécurisé ?",
        ],
        followUps: [
          "À quel moment découvrez-vous les anomalies ?",
          "Qui est prévenu quand un dossier bloque ?",
          "Qu'est-ce que cela change pour la trésorerie ou la charge interne ?",
        ],
        signals: [
          "Anomalies découvertes tard.",
          "Dépendance à quelques personnes clés.",
          "Financement évoqué comme enjeu réel.",
        ],
        avoid: [
          "Réduire la discussion à de la conformité documentaire.",
          "Ne pas faire exprimer le coût d'un blocage.",
        ],
      },
      {
        id: "tracabilite",
        title: "Traçabilité et reporting",
        intent:
          "Montrer que la valeur est aussi dans la preuve, le statut et la visibilité.",
        openingQuestion:
          "Quelle visibilité avez-vous aujourd'hui sur l'avancement réel de vos dossiers ?",
        questions: [
          "Quelle vision avez-vous aujourd'hui des dossiers déposés, validés, facturés ou à corriger ?",
          "Quels statuts aimeriez-vous suivre plus simplement ?",
          "À qui devez-vous rendre compte de l'avancement ?",
        ],
        followUps: [
          "Quelle information manque le plus souvent ?",
          "Qu'est-ce qui rassurerait votre direction ?",
          "Quel reporting serait utile sans alourdir vos équipes ?",
        ],
        signals: [
          "Besoin de preuve.",
          "Direction ou client interne à rassurer.",
          "Anomalies suivies manuellement.",
        ],
        avoid: [
          "Vendre de l'exécution sans parler visibilité.",
          "Promettre une automatisation totale si le flux reste humain.",
        ],
      },
    ],
    nextActions: [
      "Faire décrire la chaîne documentaire avant de parler prise en charge.",
      "Chercher les anomalies et pertes de temps récurrentes.",
      "Relier la valeur GDS à la traçabilité et au financement sécurisé.",
    ],
    pitchIds: ["formation-opco", "rrh-responsable-rh", "drh-transverse"],
    scenarioIds: ["formation-opco"],
  },
  {
    id: "yann-pierron",
    firstName: "Yann",
    fullName: "Yann Pierron",
    role: "Externalisation RH",
    pole: "Externalisation administrative RH",
    badge: "Process, cadre commun, indicateurs, flux",
    posture:
      "Passer de l'exécution artisanale à une promesse de pilotage fiable, lisible et cadrée.",
    promise:
      "Aider le client à voir où ses flux RH tiennent, où ils cassent et ce qui peut être externalisé proprement.",
    openingSteps: buildOpeningSteps(
      "vos flux RH, vos process répétitifs et vos points de rupture administratifs",
      pitchOral("externalisation-rh"),
    ),
    discoveryThemes: [
      {
        id: "cartographie-flux",
        title: "Cartographie des flux",
        intent:
          "Comprendre les flux répétitifs, les propriétaires et les zones de flou.",
        openingQuestion:
          "Comment vos flux RH répétitifs sont-ils organisés aujourd'hui ?",
        questions: [
          "Quels flux RH répétitifs consomment le plus de temps aujourd'hui ?",
          "Qui est propriétaire de chaque étape ?",
          "Où voyez-vous le plus de ruptures ou d'allers-retours ?",
        ],
        followUps: [
          "Quels flux sont suivis avec des indicateurs ?",
          "Qu'est-ce qui dépend trop d'une personne ou d'un site ?",
          "Qu'est-ce qui est fait différemment selon les équipes ?",
        ],
        signals: [
          "Responsabilité floue.",
          "Pratiques variables.",
          "Flux qui fonctionnent mais restent invisibles.",
        ],
        avoid: [
          "Promettre de tout externaliser sans cadrage.",
          "Ignorer les contraintes internes existantes.",
        ],
      },
      {
        id: "indicateurs",
        title: "Indicateurs utiles",
        intent:
          "Faire émerger les preuves de pilotage attendues par les RH ou la direction.",
        openingQuestion:
          "Comment pilotez-vous aujourd'hui ces flux au-delà du ressenti quotidien ?",
        questions: [
          "Quels indicateurs vous manquent pour piloter ces flux ?",
          "Comment savez-vous aujourd'hui qu'un flux est bien traité ?",
          "Quel reporting serait utile sans créer une usine à gaz ?",
        ],
        followUps: [
          "Qui lit ces indicateurs ?",
          "À quelle fréquence faudrait-il les regarder ?",
          "Quelle décision deviendrait plus simple avec ces données ?",
        ],
        signals: [
          "Demande de visibilité.",
          "Décisions prises au ressenti.",
          "Besoin d'un cadre commun.",
        ],
        avoid: [
          "Multiplier les indicateurs inutiles.",
          "Confondre reporting et pilotage.",
        ],
      },
      {
        id: "ruptures-service",
        title: "Ruptures et continuité",
        intent:
          "Repérer les incidents administratifs qui peuvent bloquer une chaîne complète.",
        openingQuestion:
          "Qu'est-ce qui peut aujourd'hui créer une rupture dans vos flux administratifs RH ?",
        questions: [
          "Quels petits irritants ont déjà créé de gros blocages ?",
          "Avez-vous des sujets de factures, relances ou comptes bloqués ?",
          "Que se passe-t-il quand une étape administrative n'est pas traitée à temps ?",
        ],
        followUps: [
          "Combien de temps perdez-vous à corriger après coup ?",
          "Quel service est impacté en premier ?",
          "Que faudrait-il contrôler en amont ?",
        ],
        signals: [
          "Factures perdues.",
          "Comptes bloqués.",
          "Rupture de service causée par un détail administratif.",
        ],
        avoid: [
          "Minimiser les irritants administratifs.",
          "Rester dans le diagnostic sans proposer de cadre de suivi.",
        ],
      },
    ],
    nextActions: [
      "Toujours cartographier le flux avant de parler solution.",
      "Demander l'indicateur qui manque au client.",
      "Qualifier les irritants qui créent une vraie rupture.",
    ],
    pitchIds: [
      "externalisation-rh",
      "visites-medicales",
      "drh-transverse",
      "daf-transverse",
    ],
    scenarioIds: ["externalisation-flux"],
  },
  {
    id: "aurelie-gasselin",
    firstName: "Aurélie",
    fullName: "Aurélie Gasselin",
    role: "Atelier couture",
    pole: "Retouche / couture / upcycling",
    badge: "Proximité, service, réactivité, RSE textile",
    posture:
      "Ouvrir des conversations simples, locales et concrètes: une promesse utile vaut mieux qu'un grand discours.",
    promise:
      "Aider les magasins et organisations locales à fluidifier la retouche ou à valoriser leurs textiles.",
    openingSteps: buildOpeningSteps(
      "vos besoins de retouche, de service client ou de revalorisation textile",
      pitchOral("retouche-couture-magasins"),
    ),
    discoveryThemes: [
      {
        id: "service-magasin",
        title: "Service magasin",
        intent:
          "Identifier si la retouche freine la vente ou complique l'expérience client.",
        openingQuestion:
          "Comment la retouche est-elle gérée aujourd'hui dans vos magasins ou points de service ?",
        questions: [
          "Comment gérez-vous les retouches aujourd'hui ?",
          "Une retouche trop lente vous a-t-elle déjà fait perdre une vente ?",
          "Quel délai serait vraiment confortable pour votre équipe et vos clients ?",
        ],
        followUps: [
          "Qui s'en occupe au quotidien ?",
          "Quels cas reviennent le plus souvent ?",
          "Qu'est-ce qui rendrait le service plus simple pour le magasin ?",
        ],
        signals: [
          "Allers-retours inutiles.",
          "Retouche vécue comme contrainte.",
          "Besoin de partenaire proche et fiable.",
        ],
        avoid: [
          "Entrer par le prix uniquement.",
          "Oublier l'impact sur la vente et la promesse client.",
        ],
      },
      {
        id: "proximite",
        title: "Proximité et réactivité",
        intent:
          "Faire ressortir la valeur d'un partenaire local plutôt qu'une simple prestation technique.",
        openingQuestion:
          "Qu'attendez-vous d'un partenaire local sur ce type de service ?",
        questions: [
          "Aujourd'hui, qu'est-ce qui vous manque chez vos partenaires de retouche ?",
          "Dans quels cas avez-vous besoin d'une réponse rapide ?",
          "Comment choisissez-vous un prestataire de confiance ?",
        ],
        followUps: [
          "Qu'est-ce qui ferait une vraie différence dans votre quotidien ?",
          "Quels engagements seraient rassurants ?",
          "Quelle première expérimentation serait simple ?",
        ],
        signals: [
          "Critère de délai.",
          "Besoin de confiance.",
          "Ouverture à un test local.",
        ],
        avoid: [
          "Survendre un dispositif lourd.",
          "Ne pas proposer une première étape concrète.",
        ],
      },
      {
        id: "textile-rse",
        title: "Textile et RSE",
        intent:
          "Ouvrir une discussion sur la revalorisation textile et l'histoire sociale du projet.",
        openingQuestion:
          "Que deviennent aujourd'hui vos textiles inutilisés ou en fin de vie ?",
        questions: [
          "Que faites-vous aujourd'hui des textiles non utilisés ou en fin de vie ?",
          "Avez-vous besoin de rendre votre démarche RSE plus concrète ?",
          "Quels objets ou usages auraient du sens pour vos équipes ou vos clients ?",
        ],
        followUps: [
          "Quelle quantité ou quelle fréquence cela représente-t-il ?",
          "Qui porterait le sujet en interne ?",
          "Comment aimeriez-vous raconter la démarche ?",
        ],
        signals: [
          "Stock dormant.",
          "Besoin de preuve RSE visible.",
          "Volonté de donner une seconde vie utile.",
        ],
        avoid: [
          "Parler recyclage sans usage concret.",
          "Oublier la dimension sociale et locale.",
        ],
      },
    ],
    nextActions: [
      "Cartographier les commerces proches et partenaires possibles.",
      "Proposer un test simple plutôt qu'une offre complexe.",
      "Relier la retouche à la vente, au service ou à la preuve RSE.",
    ],
    pitchIds: [
      "retouche-couture-magasins",
      "upcycling-recyclage-textile",
      "magasin-transverse",
      "achats-rse",
    ],
    scenarioIds: ["couture-magasin"],
  },
];

export const leaderPlan = {
  id: "lilian-pitault",
  firstName: "Lilian",
  fullName: "Lilian Pitault",
  role: "Dirigeant / synthèse",
  pole: "Vision transverse GDS",
  badge: "Redistribution, priorisation, pitch réseau",
  pitch:
    "GDS aide les organisations à reprendre la main sur des sujets RH et RSE concrets: handicap, visites médicales, formation, externalisation et textile. Notre force est de transformer des contraintes diffuses en actions pilotées, prouvables et utiles.",
  redistributionQuestions: [
    "Le sujet principal est-il RH, conformité, RSE, financier ou opérationnel ?",
    "Qui porte le problème au quotidien et qui peut décider ?",
    "Le besoin relève-t-il d'un pôle unique ou d'une opportunité transverse ?",
    "Quelle prochaine étape permettrait de qualifier sans mobiliser toute l'équipe ?",
  ],
  priorities: [
    "Qualifier avant de redistribuer au bon pôle.",
    "Limiter le pitch réseau à 40 secondes, puis poser une question.",
    "Suivre les opportunités par propriétaire, prochaine action et date.",
  ],
};

export const allPeople = [
  ...collaboratorPlans.map((plan) => ({
    id: plan.id,
    firstName: plan.firstName,
    fullName: plan.fullName,
    role: plan.role,
    pole: plan.pole,
    badge: plan.badge,
  })),
  {
    id: leaderPlan.id,
    firstName: leaderPlan.firstName,
    fullName: leaderPlan.fullName,
    role: leaderPlan.role,
    pole: leaderPlan.pole,
    badge: leaderPlan.badge,
  },
];

export const trainingScenarios: TrainingScenario[] = [
  {
    id: "handicap-multisites",
    title: "Politique handicap dispersée",
    forCollaborators: ["marjorie-louis", "chloe-bonnerue", "lilian-pitault"],
    interlocutor: "Référente handicap dans un groupe multi-sites",
    context: [
      "L'entreprise mène déjà plusieurs actions handicap: RQTH, sensibilisation, achats responsables ou adaptation de poste.",
      "La référente doit produire des preuves pour sa direction, ses interlocuteurs RSE, ses achats ou son DAF.",
      "Elle manque de temps pour structurer le sujet, valoriser ce qui existe et faire remonter les arbitrages.",
    ],
    visibleSignals: [
      "Actions nombreuses mais peu reliées.",
      "Difficulté à parler budget.",
      "Besoin de crédibilité interne.",
    ],
    hiddenSignals: [
      "Le DAF commence à regarder la contribution OETH et les achats responsables.",
      "La direction veut des preuves plus solides pour ses arbitrages ou appels d'offres.",
      "Un audit court pourrait débloquer la suite.",
    ],
    objection:
      "Nous avons déjà des actions en place, je ne sais pas si cela vaut le coup de remettre tout le sujet sur la table.",
    expectedMove:
      "Valoriser l'existant, puis montrer que l'enjeu est le pilotage, la preuve et la lisibilité, pas l'ajout d'une action.",
    responseBank: [
      {
        commercialQuestion:
          "Comment pilotez-vous aujourd'hui vos actions handicap ?",
        clientAnswer:
          "Nous avons plusieurs actions, mais je n'ai pas toujours une vision claire de ce qui prouve vraiment notre progression.",
      },
      {
        commercialQuestion:
          "Qui doit être convaincu pour avancer sur ce sujet ?",
        clientAnswer:
          "La RH porte le sujet, mais la direction et le financier doivent comprendre l'intérêt.",
      },
      {
        commercialQuestion:
          "Qu'est-ce qui vous manquerait pour défendre une suite ?",
        clientAnswer:
          "Un état des lieux clair et une feuille de route simple seraient utiles.",
      },
    ],
  },
  {
    id: "sensibilisation-alternance",
    title: "Demande floue, besoin transverse",
    forCollaborators: ["chloe-bonnerue", "sophie-vobore", "lilian-pitault"],
    interlocutor: "Responsable RH qui évoque sensibilisation et alternance",
    context: [
      "Le client parle d'abord d'une action de sensibilisation.",
      "En échangeant, il évoque aussi des difficultés d'alternance, de visites médicales ou de suivi documentaire.",
      "La bonne réponse peut impliquer plusieurs pôles GDS.",
    ],
    visibleSignals: [
      "Demande initiale peu précise.",
      "Plusieurs interlocuteurs internes concernés.",
      "Besoin de reformulation.",
    ],
    hiddenSignals: [
      "Le vrai irritant est la coordination RH entre plusieurs interlocuteurs internes.",
      "Le client a besoin d'un premier tri, pas d'une solution immédiate.",
      "Une orientation vers formation, handicap, visites médicales ou externalisation peut suivre.",
    ],
    objection:
      "Je ne sais pas encore si notre besoin est assez clair pour lancer quelque chose.",
    expectedMove:
      "Rassurer, clarifier le besoin par questions, puis proposer une prochaine étape courte de qualification.",
    responseBank: [
      {
        commercialQuestion:
          "Qu'est-ce qui vous amène à regarder ce sujet maintenant ?",
        clientAnswer:
          "Nous avons plusieurs demandes internes et je voudrais comprendre ce qui serait le plus utile.",
      },
      {
        commercialQuestion:
          "Le sujet touche-t-il aussi vos flux formation ou alternance ?",
        clientAnswer:
          "Oui, il y a aussi des dossiers qui prennent beaucoup de temps.",
      },
      {
        commercialQuestion:
          "Si je reformule, le sujet est-il plutôt sensibilisation, coordination ou suivi ?",
        clientAnswer:
          "C'est surtout la coordination et la lisibilité qui nous manquent.",
      },
    ],
  },
  {
    id: "visites-risque",
    title: "Retards de visites médicales",
    forCollaborators: ["nathalie-reveil", "yann-pierron", "lilian-pitault"],
    interlocutor: "Responsable RH dans une organisation multi-sites",
    context: [
      "Les visites sont suivies, mais les retards s'accumulent sur certains sites ou centres de santé au travail.",
      "Le client ne sait pas toujours distinguer les urgences des retards tolérables, surtout avec des populations itinérantes.",
      "La direction, le CSE ou l'inspection peuvent demander une lecture plus fiable.",
    ],
    visibleSignals: [
      "Tableaux de suivi dispersés.",
      "Populations itinérantes difficiles à couvrir.",
      "Relances nombreuses.",
    ],
    hiddenSignals: [
      "Un incident, une visite non honorée ou une question CSE a sensibilisé la direction.",
      "La RH veut garder la main mais sortir l'exécution répétitive.",
      "Un audit initial est acceptable.",
    ],
    objection:
      "Nous sommes globalement conformes, c'est juste un sujet de suivi interne.",
    expectedMove:
      "Reconnaître l'existant, puis faire préciser la preuve, le risque et le coût de suivi interne.",
    responseBank: [
      {
        commercialQuestion:
          "Savez-vous précisément qui est à jour et qui ne l'est pas ?",
        clientAnswer:
          "Nous avons des données, mais elles ne sont pas toujours consolidées rapidement.",
      },
      {
        commercialQuestion:
          "Que se passerait-il si un incident révélait un retard de suivi ?",
        clientAnswer:
          "Ce serait difficile à justifier, surtout sur certains métiers sensibles.",
      },
      {
        commercialQuestion:
          "Quel reporting vous rassurerait vraiment ?",
        clientAnswer:
          "Une vue simple des retards, des actions en cours et des priorités.",
      },
    ],
  },
  {
    id: "formation-opco",
    title: "Dossiers alternance en tension",
    forCollaborators: ["sophie-vobore", "chloe-bonnerue", "lilian-pitault"],
    interlocutor: "Responsable formation dans un groupe en volume",
    context: [
      "Le client gère beaucoup de conventions, certificats, factures, contrats alternants et échanges OPCO.",
      "Les anomalies sont traitées, mais souvent trop tard ou avec trop de suivi manuel.",
      "Les équipes internes veulent gagner du temps sans perdre la visibilité ni la maîtrise des règles.",
    ],
    visibleSignals: [
      "Volume documentaire élevé.",
      "Suivi par tableaux.",
      "Risque de perte de financement.",
    ],
    hiddenSignals: [
      "Le client a déjà connu des dossiers bloqués, incomplets ou facturés avec difficulté.",
      "La direction veut un statut fiable.",
      "Une prise en charge partielle peut suffire pour démarrer.",
    ],
    objection:
      "Nos dossiers sont particuliers, je ne suis pas sûre qu'un prestataire puisse s'adapter.",
    expectedMove:
      "Faire décrire la chaîne actuelle, isoler les étapes critiques et proposer un test sur le segment le plus répétitif.",
    responseBank: [
      {
        commercialQuestion:
          "Où perdez-vous le plus de temps dans la chaîne documentaire ?",
        clientAnswer:
          "Les pièces manquantes et les retours OPCO nous consomment beaucoup d'énergie.",
      },
      {
        commercialQuestion:
          "Qu'est-ce qui vous permet de savoir qu'un dossier est sécurisé ?",
        clientAnswer:
          "Aujourd'hui, c'est surtout notre suivi manuel et l'expérience de l'équipe.",
      },
      {
        commercialQuestion:
          "Quel reporting serait utile sans alourdir vos équipes ?",
        clientAnswer:
          "Un statut clair: déposé, bloqué, validé, facturé ou à corriger.",
      },
    ],
  },
  {
    id: "externalisation-flux",
    title: "Flux RH sans lecture d'ensemble",
    forCollaborators: ["yann-pierron", "nathalie-reveil", "lilian-pitault"],
    interlocutor: "DRH d'un groupe multi-entités",
    context: [
      "Les outils existent, mais les pratiques changent selon les sites, entités ou personnes.",
      "Les demandes répétitives saturent les équipes: visites, alternants, factures, relances ou réponses administratives.",
      "La direction veut savoir ce qui peut être cadré, suivi ou externalisé progressivement.",
    ],
    visibleSignals: [
      "Flux répétitifs.",
      "Pratiques variables.",
      "Indicateurs peu lisibles.",
    ],
    hiddenSignals: [
      "Un incident administratif, une facture perdue ou un compte bloqué a déjà ralenti un service.",
      "Le client ne veut pas tout externaliser.",
      "Le besoin prioritaire est un cadre commun.",
    ],
    objection:
      "Nous avons déjà des outils et nous ne voulons pas créer une couche de plus.",
    expectedMove:
      "Valider le point, puis distinguer outil, pilotage et exécution. Chercher ce qui reste non maîtrisé malgré les outils.",
    responseBank: [
      {
        commercialQuestion:
          "Quels flux RH répétitifs consomment le plus de temps aujourd'hui ?",
        clientAnswer:
          "Ce sont souvent des petites demandes administratives, mais elles reviennent tout le temps.",
      },
      {
        commercialQuestion:
          "Quels indicateurs vous manquent pour piloter ces flux ?",
        clientAnswer:
          "Nous n'avons pas une vue simple des délais, des blocages et des propriétaires.",
      },
      {
        commercialQuestion:
          "Quels petits irritants ont déjà créé de gros blocages ?",
        clientAnswer:
          "Des relances ou factures non traitées peuvent bloquer une chaîne complète.",
      },
    ],
  },
  {
    id: "couture-magasin",
    title: "Retouche qui freine la vente",
    forCollaborators: ["aurelie-gasselin", "lilian-pitault"],
    interlocutor: "Responsable magasin en zone commerciale",
    context: [
      "Le magasin a déjà une solution, mais elle manque parfois de réactivité ou ne couvre pas les urgences.",
      "Les retouches simples, les ourlets ou les délais de 48 heures créent des frictions avec les clients.",
      "Le responsable est ouvert à un test local si la promesse est simple: passage, délai, prix et cas couverts.",
    ],
    visibleSignals: [
      "Besoin de délai court.",
      "Promesse client à tenir.",
      "Contrainte locale très concrète.",
    ],
    hiddenSignals: [
      "Le magasin cherche surtout un partenaire fiable.",
      "Un test sur quelques retouches ou un passage programmé peut suffire.",
      "La démarche locale et sociale peut être un plus.",
    ],
    objection:
      "Nous avons déjà une couturière, je ne veux pas changer tout notre fonctionnement.",
    expectedMove:
      "Ne pas attaquer la solution actuelle. Chercher les cas non couverts et proposer un test complémentaire.",
    responseBank: [
      {
        commercialQuestion:
          "Comment gérez-vous les retouches aujourd'hui ?",
        clientAnswer:
          "Nous avons une solution, mais les délais ne sont pas toujours compatibles avec nos urgences.",
      },
      {
        commercialQuestion:
          "Une retouche trop lente vous a-t-elle déjà fait perdre une vente ?",
        clientAnswer:
          "Oui, surtout quand le client veut repartir vite ou quand il hésite déjà.",
      },
      {
        commercialQuestion:
          "Quelle première expérimentation serait simple ?",
        clientAnswer:
          "Tester sur quelques cas urgents ou sur une période courte serait acceptable.",
      },
    ],
  },
];

export function getCollaboratorPlan(id: string) {
  return collaboratorPlans.find((plan) => plan.id === id);
}

export function getRecommendedPitches(plan: CollaboratorPlan) {
  return plan.pitchIds
    .map((id) => verticalPitches.find((pitch) => pitch.id === id))
    .filter((pitch): pitch is VerticalPitch => Boolean(pitch));
}

export function getRecommendedArgumentBridges(plan: CollaboratorPlan) {
  return argumentBridges.filter((bridge) =>
    bridge.recommendedFor.includes(plan.id),
  );
}

export function getRecommendedObjectionPlaybooks(plan: CollaboratorPlan) {
  return objectionPlaybooks.filter((playbook) =>
    playbook.recommendedFor.includes(plan.id),
  );
}

export function getClosingPlaybook(plan: CollaboratorPlan) {
  return closingPlaybooks.find((playbook) =>
    playbook.recommendedFor.includes(plan.id),
  );
}

export function getRecommendedScenarios(planId: string) {
  return trainingScenarios.filter((scenario) =>
    scenario.forCollaborators.includes(planId),
  );
}
