export type SessionNotes = {
  contact: string;
  discovery: string;
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
    label: "Actions à tester",
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
      "Rassurer le client sur la méthode, le timing et le déroulé de l'entretien.",
  },
  validation: {
    objective:
      "Obtenir un premier oui et vérifier que le terrain de discussion est partagé.",
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
        "Avant de parler solution, j'aimerais comprendre comment le sujet se passe chez vous aujourd'hui.",
        "L'idée n'est pas de vous faire un catalogue, mais de voir si GDS peut vous aider sur un point vraiment utile.",
      ],
    },
    {
      id: "cadre-plan-timing",
      title: "2. Cadre, plan, timing",
      objective: baseOpening.frame.objective,
      formulations: [
        `Je vous propose de prendre environ 30 à 45 minutes sur ${subject}.`,
        "Je vais d'abord vous dire très simplement ce que fait GDS sur ce type de sujet.",
        "Ensuite, je vous poserai quelques questions sur votre situation actuelle, vos irritants et les conséquences concrètes.",
        "Si on voit qu'il y a un vrai sujet, on pourra regarder ensemble la suite logique. Est-ce que ce déroulé vous convient ?",
      ],
    },
    {
      id: "validation",
      title: "3. Validation",
      objective: baseOpening.validation.objective,
      formulations: [
        "Parfait. Si cela vous va, on garde l'objectif suivant: comprendre ce qui fonctionne, ce qui coince et ce qui mérite d'être approfondi.",
        "Je vous arrêterai si je comprends mal, et je vous demanderai parfois des exemples concrets.",
        "L'objectif est que vous ressortiez avec une lecture plus claire, même si nous ne travaillons pas ensemble tout de suite.",
      ],
    },
    {
      id: "pitch",
      title: "4. Pitch court",
      objective:
        "Crédibiliser GDS en quelques phrases, puis rendre la parole au client.",
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
      "Les actions handicap existent souvent, mais elles restent dispersées, peu mesurées et difficiles à défendre en interne.",
    value:
      "GDS remet le sujet à plat avec un audit, une lecture des risques, une feuille de route et des actions concrètes.",
    benefit:
      "Le client gagne en visibilité RH, en preuves RSE et en marge de manoeuvre économique.",
    oral:
      "Beaucoup d'entreprises font des actions handicap sans vrai pilotage global. Chez GDS, on remet les choses à plat avec un audit, une feuille de route et un plan d'action concret, pour transformer une contrainte diffuse en levier RH, RSE et économique.",
    recommendedFor: ["marjorie-louis", "chloe-bonnerue", "lilian-pitault"],
  },
  {
    id: "visites-medicales",
    vertical: "Visites médicales",
    target: "Responsable RH, DRH ou dirigeant d'organisation multi-sites",
    issue:
      "Retards, convocations, suivis renforcés et manque de visibilité transforment une routine RH en risque de conformité.",
    value:
      "GDS clarifie les retards, fiabilise le suivi et installe un pilotage simple avec reporting régulier.",
    benefit:
      "Le client réduit les retards, soulage les RH et garde des preuves plus solides.",
    oral:
      "La visite médicale, c'est rarement une priorité jusqu'au jour où cela devient un problème. Chez GDS, on remet le dossier en ordre, on fiabilise le suivi et on redonne à l'entreprise la maîtrise de sa conformité.",
    recommendedFor: ["nathalie-reveil", "yann-pierron", "lilian-pitault"],
  },
  {
    id: "formation-opco",
    vertical: "Administration formation / OPCO / alternance",
    target: "Support RH formation, responsable alternance ou organisme de formation",
    issue:
      "Quand les volumes montent, conventions, dépôts OPCO, certificats et factures deviennent une chaîne fragile.",
    value:
      "GDS prend en main la chaîne documentaire, suit les anomalies et sécurise le passage de chaque dossier.",
    benefit:
      "Les dossiers partent, les financements sont mieux sécurisés et les équipes récupèrent du temps.",
    oral:
      "Quand les volumes montent, l'administration formation devient vite une fuite de temps, de financement et d'énergie. Chez GDS, on prend la chaîne documentaire en main pour que chaque dossier parte, soit tracé et se termine proprement.",
    recommendedFor: ["sophie-vobore", "chloe-bonnerue", "lilian-pitault"],
  },
  {
    id: "externalisation-rh",
    vertical: "Externalisation administrative RH",
    target: "DRH, responsable RH, DAF ou service comptable",
    issue:
      "Les flux RH tournent, mais sans lecture d'ensemble, avec des pratiques variables et des points de rupture peu visibles.",
    value:
      "GDS standardise, rend les flux lisibles, met des indicateurs simples et prend en charge une partie de l'exécution.",
    benefit:
      "Le client récupère de la visibilité, évite les ruptures et stabilise son organisation RH.",
    oral:
      "Beaucoup d'entreprises ont des flux RH qui tournent, mais sans vraie lecture d'ensemble. Chez GDS, on remet de la lisibilité et de la discipline opérationnelle pour que l'organisation sache enfin où elle en est.",
    recommendedFor: ["yann-pierron", "nathalie-reveil", "lilian-pitault"],
  },
  {
    id: "couture-upcycling",
    vertical: "Retouche / couture / upcycling textile",
    target: "Responsable magasin, achats, exploitation ou pilote RSE",
    issue:
      "Une retouche lente peut freiner une vente, et un textile non revalorisé reste un coût ou un stock dormant.",
    value:
      "GDS apporte une solution locale de retouche, de récupération, de transformation et de valorisation textile.",
    benefit:
      "Le client fluidifie le service, soutient la vente et rend sa démarche RSE plus concrète.",
    oral:
      "Sur la retouche et l'upcycling, la vraie valeur est très concrète: fluidifier le service, gagner en réactivité et donner une seconde vie visible aux textiles. Chez GDS, on transforme un sujet de friction ou de rebut en service utile et racontable.",
    recommendedFor: ["aurelie-gasselin", "lilian-pitault"],
  },
  {
    id: "drh-transverse",
    vertical: "Pitch interlocuteur",
    target: "DRH",
    issue:
      "Les DRH arbitrent entre conformité, charge des équipes, image employeur et budget, souvent sans vision claire du terrain.",
    value:
      "GDS rend pilotables les sujets dispersés: handicap, visites médicales, formation et flux RH.",
    benefit:
      "Le DRH décide plus vite, justifie mieux ses choix et redonne du temps à ses équipes.",
    oral:
      "En tant que DRH, vous avez souvent des sujets sensibles qui avancent, mais sans vraie lecture globale. Chez GDS, on vous aide à les remettre au carré, à mieux les piloter et à redonner de la bande passante à vos équipes.",
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
      "Certaines charges ressemblent à des fatalités alors qu'elles viennent d'un manque de pilotage ou d'anticipation.",
    value:
      "GDS relie lecture économique, audit et structuration des flux pour rendre visibles les coûts cachés.",
    benefit:
      "Le DAF arbitre mieux, limite certains coûts évitables et sécurise ses budgets.",
    oral:
      "Beaucoup de DAF supportent des coûts ou des risques qui ressemblent à des fatalités. Chez GDS, on clarifie ces zones grises pour aider l'entreprise à mieux arbitrer, mieux sécuriser et moins subir.",
    recommendedFor: ["marjorie-louis", "yann-pierron", "lilian-pitault"],
  },
  {
    id: "magasin-transverse",
    vertical: "Pitch interlocuteur",
    target: "Responsable magasin",
    issue:
      "Une retouche mal gérée complique le quotidien de l'équipe et peut casser une promesse de service.",
    value:
      "GDS récupère, ajuste et restitue rapidement avec une logique de proximité.",
    benefit:
      "Le magasin transforme la retouche en service commercial au lieu d'en faire une contrainte annexe.",
    oral:
      "Dans un magasin, une retouche ne doit pas devenir un point de friction. Chez GDS, on apporte une solution locale, rapide et fiable pour que la retouche soutienne la vente au lieu de la ralentir.",
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
      "Chez GDS, nous aidons les entreprises à remettre au clair leurs sujets handicap et QVCT: audit, risques, feuille de route et actions concrètes. L'objectif est de passer d'actions dispersées à une politique lisible, défendable et utile pour les RH comme pour la direction.",
    ),
    discoveryThemes: [
      {
        id: "pilotage-handicap",
        title: "Pilotage handicap",
        intent:
          "Comprendre si le client pilote réellement le sujet ou s'il additionne des actions isolées.",
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
    pitchIds: ["handicap-qvct", "drh-transverse", "daf-transverse"],
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
      "Chez GDS, nous intervenons sur des sujets très concrets: handicap, sensibilisation, alternance, formation et appui administratif. Mon rôle aujourd'hui est surtout de comprendre ce qui bloque chez vous, puis de voir quel angle mérite d'être creusé.",
    ),
    discoveryThemes: [
      {
        id: "besoin-visible",
        title: "Besoin visible",
        intent:
          "Partir de la demande exprimée, sans la prendre pour le vrai besoin final.",
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
    pitchIds: ["handicap-qvct", "formation-opco", "drh-transverse"],
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
      "Chez GDS, nous aidons les organisations à reprendre la main sur les visites médicales: audit initial, remise à plat des retards, suivi opérationnel et reporting simple. Le but est que les RH gardent la maîtrise sans porter seules toute la charge.",
    ),
    discoveryThemes: [
      {
        id: "etat-conformite",
        title: "État de conformité",
        intent:
          "Faire émerger le niveau réel de visibilité sur les retards, convocations et suivis renforcés.",
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
    pitchIds: ["visites-medicales", "drh-transverse", "externalisation-rh"],
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
      "Chez GDS, nous prenons en charge la chaîne documentaire formation: conventions, dépôts, certificats, facturation et suivi des anomalies. Notre valeur est de rendre le flux fiable, traçable et moins lourd pour vos équipes.",
    ),
    discoveryThemes: [
      {
        id: "volume-dossiers",
        title: "Volume et flux",
        intent:
          "Comprendre si le client subit un volume ou une complexité qui dépasse ses moyens internes.",
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
    pitchIds: ["formation-opco", "drh-transverse"],
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
      "Chez GDS, nous aidons les organisations à remettre de la lisibilité dans leurs flux RH: standardisation, indicateurs simples, appui opérationnel et traitement des irritants qui consomment du temps. L'objectif est de clarifier ce qui tient, ce qui casse et ce qui doit être cadré.",
    ),
    discoveryThemes: [
      {
        id: "cartographie-flux",
        title: "Cartographie des flux",
        intent:
          "Comprendre les flux répétitifs, les propriétaires et les zones de flou.",
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
    pitchIds: ["externalisation-rh", "visites-medicales", "daf-transverse"],
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
      "Chez GDS, nous proposons un service local de retouche, de couture et de transformation textile. Notre valeur est très concrète: réactivité, proximité et capacité à transformer une contrainte en service utile pour vos clients ou votre démarche RSE.",
    ),
    discoveryThemes: [
      {
        id: "service-magasin",
        title: "Service magasin",
        intent:
          "Identifier si la retouche freine la vente ou complique l'expérience client.",
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
    pitchIds: ["couture-upcycling", "magasin-transverse"],
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
      "L'entreprise mène déjà plusieurs actions handicap, mais sans lecture consolidée.",
      "La référente doit produire des preuves pour sa direction et ses interlocuteurs RSE.",
      "Elle manque de temps pour structurer le sujet et faire remonter les arbitrages.",
    ],
    visibleSignals: [
      "Actions nombreuses mais peu reliées.",
      "Difficulté à parler budget.",
      "Besoin de crédibilité interne.",
    ],
    hiddenSignals: [
      "Le DAF commence à regarder la contribution.",
      "La direction veut des preuves plus solides.",
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
      "En échangeant, il évoque aussi des difficultés d'alternance et de suivi documentaire.",
      "La bonne réponse peut impliquer plusieurs pôles GDS.",
    ],
    visibleSignals: [
      "Demande initiale peu précise.",
      "Plusieurs interlocuteurs internes concernés.",
      "Besoin de reformulation.",
    ],
    hiddenSignals: [
      "Le vrai irritant est la coordination RH.",
      "Le client a besoin d'un premier tri, pas d'une solution immédiate.",
      "Une orientation vers formation ou handicap peut suivre.",
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
      "Les visites sont suivies, mais les retards s'accumulent sur certains sites.",
      "Le client ne sait pas toujours distinguer les urgences des retards tolérables.",
      "La direction demande une lecture plus fiable.",
    ],
    visibleSignals: [
      "Tableaux de suivi dispersés.",
      "Populations itinérantes difficiles à couvrir.",
      "Relances nombreuses.",
    ],
    hiddenSignals: [
      "Un incident récent a sensibilisé la direction.",
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
      "Le client gère beaucoup de conventions, certificats et échanges OPCO.",
      "Les anomalies sont traitées, mais souvent trop tard.",
      "Les équipes internes veulent gagner du temps sans perdre la visibilité.",
    ],
    visibleSignals: [
      "Volume documentaire élevé.",
      "Suivi par tableaux.",
      "Risque de perte de financement.",
    ],
    hiddenSignals: [
      "Le client a déjà connu des dossiers bloqués.",
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
      "Les outils existent, mais les pratiques changent selon les sites.",
      "Les demandes répétitives saturent les équipes.",
      "La direction veut savoir ce qui peut être cadré ou externalisé.",
    ],
    visibleSignals: [
      "Flux répétitifs.",
      "Pratiques variables.",
      "Indicateurs peu lisibles.",
    ],
    hiddenSignals: [
      "Un incident administratif a déjà bloqué un service.",
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
      "Le magasin a déjà une solution, mais elle manque parfois de réactivité.",
      "Les retouches urgentes créent des frictions avec les clients.",
      "Le responsable est ouvert à un test local si la promesse est simple.",
    ],
    visibleSignals: [
      "Besoin de délai court.",
      "Promesse client à tenir.",
      "Contrainte locale très concrète.",
    ],
    hiddenSignals: [
      "Le magasin cherche surtout un partenaire fiable.",
      "Un test sur quelques retouches peut suffire.",
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
  const recommended = new Set(plan.pitchIds);
  return verticalPitches.filter((pitch) => recommended.has(pitch.id));
}

export function getRecommendedScenarios(planId: string) {
  return trainingScenarios.filter((scenario) =>
    scenario.forCollaborators.includes(planId),
  );
}
