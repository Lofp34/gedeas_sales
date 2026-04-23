"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  allPeople,
  appPromise,
  collaboratorPlans,
  defaultNotes,
  getClosingPlaybook,
  getCollaboratorPlan,
  getRecommendedArgumentBridges,
  getRecommendedObjectionPlaybooks,
  getRecommendedPitches,
  getRecommendedScenarios,
  leaderPlan,
  noteFields,
  storageKey,
  trainingScenarios,
  verticalPitches,
  type ArgumentBridge,
  type ClosingPlaybook,
  type CollaboratorPlan,
  type ObjectionPlaybook,
  type SessionNotes,
  type TrainingScenario,
} from "@/lib/training-data";

type View =
  | "home"
  | "plan"
  | "discovery"
  | "convince"
  | "pitches"
  | "practice"
  | "leader";

type AppState = {
  view: View;
  selectedPersonId: string;
  activeThemeId: string;
  activeArgumentId: string;
  activeObjectionId: string;
  activeScenarioSectionId: string;
  selectedScenarioId: string;
  discoveryChecks: Record<string, Record<string, boolean[]>>;
  actionChecks: Record<string, boolean[]>;
  closingChecks: Record<string, boolean[]>;
  isNotesDrawerOpen: boolean;
  notes: SessionNotes;
};

const defaultPersonId = "marjorie-louis";

const initialState = (): AppState => ({
  view: "home",
  selectedPersonId: defaultPersonId,
  activeThemeId: "",
  activeArgumentId: "",
  activeObjectionId: "",
  activeScenarioSectionId: "",
  selectedScenarioId: "",
  discoveryChecks: {},
  actionChecks: {},
  closingChecks: {},
  isNotesDrawerOpen: false,
  notes: defaultNotes,
});

function isKnownPerson(id: string) {
  return allPeople.some((person) => person.id === id);
}

function coerceState(value: unknown): AppState {
  if (!value || typeof value !== "object") return initialState();
  const partial = value as Partial<AppState>;
  const view: View =
    partial.view &&
    [
      "home",
      "plan",
      "discovery",
      "convince",
      "pitches",
      "practice",
      "leader",
    ].includes(partial.view)
      ? partial.view
      : "home";
  const selectedPersonId =
    partial.selectedPersonId && isKnownPerson(partial.selectedPersonId)
      ? partial.selectedPersonId
      : defaultPersonId;

  return {
    ...initialState(),
    ...partial,
    view,
    selectedPersonId,
    activeThemeId: "",
    activeArgumentId: partial.activeArgumentId || "",
    activeObjectionId: partial.activeObjectionId || "",
    activeScenarioSectionId: partial.activeScenarioSectionId || "",
    selectedScenarioId: partial.selectedScenarioId || "",
    discoveryChecks: partial.discoveryChecks || {},
    actionChecks: partial.actionChecks || {},
    closingChecks: partial.closingChecks || {},
    isNotesDrawerOpen: Boolean(partial.isNotesDrawerOpen),
    notes: {
      ...defaultNotes,
      ...(partial.notes || {}),
    },
  };
}

function TextAreaField({
  id,
  label,
  value,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="field-block" htmlFor={id}>
      <span>{label}</span>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function CheckLine({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="check-line">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{children}</span>
    </label>
  );
}

type ClosingStepItem = {
  id: string;
  title: string;
  script: string;
};

function getClosingStepItems(playbook?: ClosingPlaybook): ClosingStepItem[] {
  if (!playbook) return [];
  return [
    {
      id: "recap",
      title: "Récapituler l'enjeu",
      script: playbook.recap,
    },
    {
      id: "firstAction",
      title: "Présenter la première phase",
      script: playbook.firstAction,
    },
    {
      id: "dateAndValidate",
      title: "Dater et faire valider",
      script: playbook.dateAndValidate,
    },
    {
      id: "strongIssueIfBlocked",
      title: "Si blocage, rappeler l'enjeu fort",
      script: playbook.strongIssueIfBlocked,
    },
    {
      id: "contractAsk",
      title: "Demander le retour signé",
      script: playbook.contractAsk,
    },
    {
      id: "reflectionFallback",
      title: "S'il veut réfléchir",
      script: playbook.reflectionFallback,
    },
  ];
}

type FoldSection = {
  id: string;
  title: string;
  items?: readonly string[];
  quote?: string;
  text?: string;
};

function ScenarioFold({
  section,
  isOpen,
  onToggle,
}: {
  section: FoldSection;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article className={isOpen ? "fold-card is-open" : "fold-card"}>
      <button type="button" aria-expanded={isOpen} onClick={onToggle}>
        <strong>{section.title}</strong>
        <span>{isOpen ? "Fermer" : "Ouvrir"}</span>
      </button>
      {isOpen ? (
        <div className="fold-body">
          {section.quote ? <p className="quote">{section.quote}</p> : null}
          {section.text ? <p>{section.text}</p> : null}
          {section.items ? (
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function PersonSelector({
  selectedPersonId,
  onSelect,
  onGo,
}: {
  selectedPersonId: string;
  onSelect: (id: string) => void;
  onGo: (view: View) => void;
}) {
  return (
    <div className="person-grid" aria-label="Choix du collaborateur">
      {allPeople.map((person) => {
        const isActive = selectedPersonId === person.id;
        const plan = getCollaboratorPlan(person.id);
        return (
          <article
            key={person.id}
            className={isActive ? "person-card is-active" : "person-card"}
          >
            <button
              type="button"
              className="person-card-main"
              aria-pressed={isActive}
              onClick={() => onSelect(person.id)}
            >
              <span>{person.firstName}</span>
              <strong>{person.role}</strong>
              <small>{person.badge}</small>
            </button>

            {isActive && plan ? (
              <div className="active-plan-card">
                <p className="eyebrow">Plan actif</p>
                <h3>{plan.firstName}, votre plan de découverte</h3>
                <p>{plan.posture}</p>
                <div className="active-plan-status">
                  <span>{plan.pole}</span>
                  <span>{plan.discoveryThemes.length} axes</span>
                  <span>{plan.scenarioIds.length} cas</span>
                </div>
                <div className="button-row active-plan-actions">
                  <button type="button" onClick={() => onGo("plan")}>
                    Prise de contact
                  </button>
                  <button type="button" onClick={() => onGo("discovery")}>
                    Découverte
                  </button>
                  <button type="button" onClick={() => onGo("convince")}>
                    Argumenter & conclure
                  </button>
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => onGo("practice")}
                  >
                    Mise en situation
                  </button>
                </div>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

function LeaderSummary({ onGo }: { onGo: (view: View) => void }) {
  return (
    <section className="focus-panel leader-focus">
      <div>
        <p className="eyebrow">Dirigeant / synthèse</p>
        <h1>Pitch court et redistribution des opportunités</h1>
        <p className="lead">{leaderPlan.pitch}</p>
      </div>
      <div className="button-row">
        <button type="button" onClick={() => onGo("leader")}>
          Ouvrir la synthèse
        </button>
        <button type="button" className="secondary" onClick={() => onGo("pitches")}>
          Voir les pitchs
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  const [state, setState] = useState<AppState>(() => initialState());
  const [isHydrated, setIsHydrated] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      const hydrated = raw ? coerceState(JSON.parse(raw)) : initialState();
      const urlPerson = new URLSearchParams(window.location.search).get(
        "collaborateur",
      );
      if (urlPerson && isKnownPerson(urlPerson)) {
        hydrated.selectedPersonId = urlPerson;
        hydrated.view = urlPerson === leaderPlan.id ? "leader" : hydrated.view;
      }
      setState(hydrated);
    } catch {
      setState(initialState());
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [isHydrated, state]);

  useEffect(() => {
    if (!isHydrated) return;
    const url = new URL(window.location.href);
    url.searchParams.set("collaborateur", state.selectedPersonId);
    window.history.replaceState({}, "", url);
  }, [isHydrated, state.selectedPersonId]);

  const selectedPlan = useMemo(
    () => getCollaboratorPlan(state.selectedPersonId),
    [state.selectedPersonId],
  );
  const personLabel = selectedPlan?.firstName || leaderPlan.firstName;
  const scenarioChoices = useMemo(() => {
    if (selectedPlan) return getRecommendedScenarios(selectedPlan.id);
    return trainingScenarios;
  }, [selectedPlan]);
  const argumentChoices = useMemo(() => {
    if (!selectedPlan) return [];
    return getRecommendedArgumentBridges(selectedPlan);
  }, [selectedPlan]);
  const objectionChoices = useMemo(() => {
    if (!selectedPlan) return [];
    return getRecommendedObjectionPlaybooks(selectedPlan);
  }, [selectedPlan]);
  const closingPlaybook = useMemo(() => {
    if (!selectedPlan) return undefined;
    return getClosingPlaybook(selectedPlan);
  }, [selectedPlan]);
  const closingStepItems = useMemo(
    () => getClosingStepItems(closingPlaybook),
    [closingPlaybook],
  );
  const activeArgument = useMemo(() => {
    return (
      argumentChoices.find((item) => item.id === state.activeArgumentId) ||
      argumentChoices[0]
    );
  }, [argumentChoices, state.activeArgumentId]);
  const activeObjection = useMemo(() => {
    return (
      objectionChoices.find((item) => item.id === state.activeObjectionId) ||
      objectionChoices[0]
    );
  }, [objectionChoices, state.activeObjectionId]);
  const closingScenario = useMemo(() => {
    if (!closingPlaybook) return undefined;
    return trainingScenarios.find(
      (scenario) => scenario.id === closingPlaybook.scenarioId,
    );
  }, [closingPlaybook]);
  const selectedScenario = useMemo(() => {
    return (
      scenarioChoices.find(
        (scenario) => scenario.id === state.selectedScenarioId,
      ) || scenarioChoices[0]
    );
  }, [scenarioChoices, state.selectedScenarioId]);

  function updateState(patch: Partial<AppState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function openView(view: View) {
    setState((current) => ({
      ...current,
      view,
      activeThemeId: view === "discovery" ? "" : current.activeThemeId,
    }));
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectPerson(id: string) {
    const nextPlan = getCollaboratorPlan(id);
    const nextArguments = nextPlan ? getRecommendedArgumentBridges(nextPlan) : [];
    const nextObjections = nextPlan
      ? getRecommendedObjectionPlaybooks(nextPlan)
      : [];
    setState((current) => ({
      ...current,
      selectedPersonId: id,
      view: id === leaderPlan.id ? "leader" : current.view === "leader" ? "plan" : current.view,
      activeThemeId: "",
      activeArgumentId: nextArguments[0]?.id || "",
      activeObjectionId: nextObjections[0]?.id || "",
      selectedScenarioId: nextPlan?.scenarioIds[0] || "",
      activeScenarioSectionId: "",
    }));
    setNotice("");
  }

  function updateNote(field: keyof SessionNotes, value: string) {
    setState((current) => ({
      ...current,
      notes: {
        ...current.notes,
        [field]: value,
      },
    }));
  }

  function toggleDiscoveryCheck(themeId: string, index: number) {
    setState((current) => {
      const personChecks = current.discoveryChecks[current.selectedPersonId] || {};
      const next = [...(personChecks[themeId] || [])];
      next[index] = !next[index];
      return {
        ...current,
        discoveryChecks: {
          ...current.discoveryChecks,
          [current.selectedPersonId]: {
            ...personChecks,
            [themeId]: next,
          },
        },
      };
    });
  }

  function toggleActionCheck(personId: string, index: number) {
    setState((current) => {
      const next = [...(current.actionChecks[personId] || [])];
      next[index] = !next[index];
      return {
        ...current,
        actionChecks: {
          ...current.actionChecks,
          [personId]: next,
        },
      };
    });
  }

  function toggleClosingCheck(personId: string, index: number) {
    setState((current) => {
      const next = [...(current.closingChecks[personId] || [])];
      next[index] = !next[index];
      return {
        ...current,
        closingChecks: {
          ...current.closingChecks,
          [personId]: next,
        },
      };
    });
  }

  function resetSession() {
    const next = initialState();
    setState(next);
    window.localStorage.removeItem(storageKey);
    setNotice("Session réinitialisée.");
  }

  function buildTextExport() {
    const plan = selectedPlan;
    const headline = plan
      ? `Plan GEDEAS Sales Lab - ${plan.fullName}`
      : "Plan GEDEAS Sales Lab - Dirigeant";
    const selectedQuestions =
      plan?.discoveryThemes
        .flatMap((theme) =>
          [
            `- ${theme.title} / question grand angle: ${theme.openingQuestion}`,
            ...theme.questions
              .map((question, index) =>
                state.discoveryChecks[plan.id]?.[theme.id]?.[index]
                  ? `- ${theme.title}: ${question}`
                  : "",
              )
              .filter(Boolean),
          ],
        )
        .join("\n") || "Non renseigné";
    const closingSteps =
      closingStepItems
        .map((step, index) =>
          state.closingChecks[state.selectedPersonId]?.[index]
            ? `- ${step.title}: ${step.script}`
            : "",
        )
        .filter(Boolean)
        .join("\n") || "Non renseigné";

    return [
      headline,
      `Export du ${new Date().toLocaleString("fr-FR")}`,
      "",
      "Promesse",
      plan?.promise || leaderPlan.pitch,
      "",
      "Questions retenues",
      selectedQuestions,
      "",
      "Argumentation sélectionnée",
      activeArgument
        ? [
            activeArgument.title,
            `Vous qui: ${activeArgument.youWho}`,
            `Solution: ${activeArgument.solutionBenefit}`,
            `Grâce à: ${activeArgument.thanksTo.join("; ")}`,
            activeArgument.validationQuestion,
            activeArgument.exampleScript,
          ].join("\n")
        : "Non renseigné",
      "",
      "Objection travaillée",
      activeObjection
        ? [
            activeObjection.title,
            activeObjection.objection,
            activeObjection.steps
              .map((step) =>
                [
                  `- ${step.title}: ${step.script}`,
                  ...(step.questions || []).map(
                    (question) => `  * ${question}`,
                  ),
                ].join("\n"),
              )
              .join("\n"),
          ].join("\n")
        : "Non renseigné",
      "",
      "Closing",
      closingPlaybook
        ? [
            closingPlaybook.title,
            closingPlaybook.targetAction,
            closingStepItems
              .map((step) => `- ${step.title}: ${step.script}`)
              .join("\n"),
            "",
            "Étapes cochées",
            closingSteps,
          ].join("\n")
        : "Non renseigné",
      "",
      "Notes",
      ...noteFields.flatMap((field) => [
        "",
        field.label,
        state.notes[field.id] || "Non renseigné",
      ]),
    ].join("\n");
  }

  function downloadFile(filename: string, content: string, type: string) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setNotice(`Export créé : ${filename}`);
  }

  function exportTxt() {
    downloadFile(
      `gedeas-plan-decouverte-${state.selectedPersonId}.txt`,
      buildTextExport(),
      "text/plain;charset=utf-8",
    );
  }

  function exportJson() {
    const payload = {
      label: "GEDEAS Sales Lab",
      exportedAt: new Date().toISOString(),
      selectedPersonId: state.selectedPersonId,
      selectedPerson: selectedPlan || leaderPlan,
      selectedScenario,
      activeArgument,
      activeObjection,
      closingPlaybook,
      closingSteps: closingStepItems,
      closingScenario,
      notes: state.notes,
      discoveryChecks: state.discoveryChecks[state.selectedPersonId] || {},
      actionChecks: state.actionChecks[state.selectedPersonId] || [],
      closingChecks: state.closingChecks[state.selectedPersonId] || [],
    };

    downloadFile(
      `gedeas-plan-decouverte-${state.selectedPersonId}.json`,
      JSON.stringify(payload, null, 2),
      "application/json;charset=utf-8",
    );
  }

  const completedDiscoveryChecks = Object.values(
    state.discoveryChecks[state.selectedPersonId] || {},
  ).reduce((total, checks) => total + checks.filter(Boolean).length, 0);
  const completedClosingChecks = (
    state.closingChecks[state.selectedPersonId] || []
  ).filter(Boolean).length;

  return (
    <main className="app-shell">
      <header className="top-bar">
        <button
          className="brand-button"
          type="button"
          onClick={() => openView("home")}
          aria-label="Retour à l'accueil"
        >
          <Image
            src="/brand/gedeas-logo-complet.png"
            alt="GEDEAS"
            width={280}
            height={72}
            priority
          />
        </button>
        <div className="top-bar-copy">
          <strong>GEDEAS Sales Lab</strong>
          <span>{appPromise}</span>
        </div>
        <button className="reset-button" type="button" onClick={resetSession}>
          Réinitialiser
        </button>
      </header>

      {notice ? <div className="notice">{notice}</div> : null}

      <nav className="module-tabs" aria-label="Modules de l'application">
        {[
          ["home", "Accueil"],
          ["plan", "Mon plan"],
          ["discovery", "Découverte"],
          ["convince", "Argumenter & conclure"],
          ["pitches", "Pitchs & cibles"],
          ["practice", "Entraînement"],
          ["leader", "Dirigeant"],
        ].map(([view, label]) => (
          <button
            key={view}
            type="button"
            className={state.view === view ? "is-active" : ""}
            onClick={() => openView(view as View)}
          >
            {label}
          </button>
        ))}
      </nav>

      {state.view === "home" ? (
        <section className="home-layout">
          <section className="selector-panel">
            <div className="section-head">
              <p className="eyebrow">Choix du parcours</p>
              <h2>Qui prépare son entretien ?</h2>
              <p>
                Choisissez un collaborateur pour charger sa prise de contact,
                ses axes de découverte et ses cas d&apos;entraînement.
              </p>
            </div>
            <PersonSelector
              selectedPersonId={state.selectedPersonId}
              onSelect={selectPerson}
              onGo={openView}
            />
          </section>
        </section>
      ) : null}

      {state.view === "plan" ? (
        <section className="workspace">
          {selectedPlan ? (
            <>
              <div className="section-head split-head">
                <div>
                  <p className="eyebrow">Module 01</p>
                  <h2>Prise de contact de {selectedPlan.firstName}</h2>
                  <p>{selectedPlan.promise}</p>
                </div>
                <div className="mini-stat">
                  <span>{selectedPlan.pole}</span>
                  <strong>{personLabel}</strong>
                </div>
              </div>

              <div className="sequence-grid">
                {selectedPlan.openingSteps.map((step) => (
                  <article key={step.id} className="sequence-card">
                    <p className="eyebrow">{step.title}</p>
                    <h3>{step.objective}</h3>
                    <div className="script-stack">
                      {step.formulations.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <section className="workspace-band action-band next-step-band">
                <div>
                  <p className="eyebrow">Passer à la découverte</p>
                  <h3>Question de bascule</h3>
                  <p className="handoff-question">
                    Dites-m&apos;en plus sur votre situation actuelle.
                  </p>
                </div>
                <button type="button" onClick={() => openView("discovery")}>
                  Ouvrir la découverte
                </button>
              </section>
            </>
          ) : (
            <LeaderSummary onGo={openView} />
          )}
        </section>
      ) : null}

      {state.view === "discovery" ? (
        <section className="workspace discovery-workspace">
          {selectedPlan ? (
            <>
              <div className="section-head split-head">
                <div>
                  <p className="eyebrow">Module 02</p>
                  <h2>Découverte adaptée</h2>
                  <p>
                    Objectif: faire parler le client sur sa situation, ses
                    irritants et les conséquences avant de proposer.
                  </p>
                </div>
                <div className="mini-stat">
                  <span>Questions cochées</span>
                  <strong>{completedDiscoveryChecks}</strong>
                </div>
              </div>

              <div className="theme-stack">
                {selectedPlan.discoveryThemes.map((theme) => {
                  const isOpen = state.activeThemeId === theme.id;
                  return (
                    <article
                      key={theme.id}
                      className={isOpen ? "theme-card is-open" : "theme-card"}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          updateState({
                            activeThemeId: isOpen ? "" : theme.id,
                          })
                        }
                      >
                        <strong>{theme.title}</strong>
                        <span>{isOpen ? "Fermer" : "Ouvrir"}</span>
                      </button>

                      {isOpen ? (
                        <div className="theme-body">
                          <p className="theme-intent">{theme.intent}</p>
                          <div className="opening-question">
                            <span>Question grand angle</span>
                            <p>{theme.openingQuestion}</p>
                          </div>
                          <div className="question-list discovery-questions">
                            <h4>Questions miroir / approfondissement</h4>
                            {theme.questions.map((question, index) => (
                              <CheckLine
                                key={question}
                                checked={Boolean(
                                  state.discoveryChecks[selectedPlan.id]?.[
                                    theme.id
                                  ]?.[index],
                                )}
                                onChange={() =>
                                  toggleDiscoveryCheck(theme.id, index)
                                }
                              >
                                {question}
                              </CheckLine>
                            ))}
                          </div>
                          <div className="detail-grid">
                            <section>
                              <h4>Relances utiles</h4>
                              <ul>
                                {theme.followUps.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </section>
                            <section>
                              <h4>Signaux à écouter</h4>
                              <ul>
                                {theme.signals.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </section>
                            <section>
                              <h4>À éviter</h4>
                              <ul>
                                {theme.avoid.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </section>
                          </div>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>

              <section className="workspace-band action-band next-step-band">
                <div>
                  <p className="eyebrow">Suite de l&apos;entretien</p>
                  <h3>Argumenter seulement après les enjeux</h3>
                  <p>
                    Une fois les situations concrètes, conséquences et personnes
                    concernées notées, passez à l&apos;argumentation structurée.
                  </p>
                </div>
                <button type="button" onClick={() => openView("convince")}>
                  Argumenter & conclure
                </button>
              </section>
            </>
          ) : (
            <LeaderSummary onGo={openView} />
          )}
        </section>
      ) : null}

      {state.view === "convince" ? (
        selectedPlan ? (
          <ArgumentClosingWorkspace
            plan={selectedPlan}
            argumentChoices={argumentChoices}
            activeArgument={activeArgument}
            objectionChoices={objectionChoices}
            activeObjection={activeObjection}
            closingPlaybook={closingPlaybook}
            closingScenario={closingScenario}
            closingSteps={closingStepItems}
            closingChecks={state.closingChecks[state.selectedPersonId] || []}
            completedClosingChecks={completedClosingChecks}
            onSelectArgument={(activeArgumentId) =>
              updateState({ activeArgumentId })
            }
            onSelectObjection={(activeObjectionId) =>
              updateState({ activeObjectionId })
            }
            onToggleClosing={(index) =>
              toggleClosingCheck(selectedPlan.id, index)
            }
          />
        ) : (
          <section className="workspace">
            <LeaderSummary onGo={openView} />
          </section>
        )
      ) : null}

      {state.view === "pitches" ? (
        <section className="workspace">
          <div className="section-head">
            <p className="eyebrow">Module 04</p>
            <h2>Pitchs & cibles</h2>
            <p>
              Les pitchs recommandés apparaissent d&apos;abord; la bibliothèque
              complète reste visible pour les opportunités transverses.
            </p>
          </div>

          {selectedPlan ? (
            <section className="pitch-section">
              <h3>Recommandés pour {selectedPlan.firstName}</h3>
              <div className="pitch-grid">
                {getRecommendedPitches(selectedPlan).map((pitch) => (
                  <article key={pitch.id} className="pitch-card is-featured">
                    <span>{pitch.vertical}</span>
                    <strong>{pitch.target}</strong>
                    <p>{pitch.oral}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="pitch-section">
            <h3>Bibliothèque GEDEAS / GDS</h3>
            <div className="pitch-grid">
              {verticalPitches.map((pitch) => (
                <article key={pitch.id} className="pitch-card">
                  <span>{pitch.vertical}</span>
                  <strong>{pitch.target}</strong>
                  <dl>
                    <div>
                      <dt>Enjeu</dt>
                      <dd>{pitch.issue}</dd>
                    </div>
                    <div>
                      <dt>Valeur GDS</dt>
                      <dd>{pitch.value}</dd>
                    </div>
                    <div>
                      <dt>Bénéfice</dt>
                      <dd>{pitch.benefit}</dd>
                    </div>
                  </dl>
                  <p className="oral">{pitch.oral}</p>
                </article>
              ))}
            </div>
          </section>
        </section>
      ) : null}

      {state.view === "practice" ? (
        <section className="workspace">
          <div className="section-head split-head">
            <div>
              <p className="eyebrow">Module 05</p>
              <h2>Entraînement</h2>
              <p>
                Le joueur client lit le cas. Le commercial doit obtenir les
                signaux cachés par la qualité de sa découverte.
              </p>
            </div>
            <div className="mini-stat">
              <span>Cas disponibles</span>
              <strong>{scenarioChoices.length}</strong>
            </div>
          </div>

          <div className="scenario-grid">
            {scenarioChoices.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                className={
                  selectedScenario?.id === scenario.id
                    ? "scenario-card is-active"
                    : "scenario-card"
                }
                onClick={() =>
                  updateState({
                    selectedScenarioId: scenario.id,
                    activeScenarioSectionId: "",
                  })
                }
              >
                <span>{scenario.title}</span>
                <strong>{scenario.interlocutor}</strong>
              </button>
            ))}
          </div>

          {selectedScenario ? (
            <ScenarioDetail
              scenario={selectedScenario}
              activeSectionId={state.activeScenarioSectionId}
              onToggle={(sectionId) =>
                updateState({
                  activeScenarioSectionId:
                    state.activeScenarioSectionId === sectionId ? "" : sectionId,
                })
              }
            />
          ) : null}
        </section>
      ) : null}

      {state.view === "leader" ? (
        <section className="workspace">
          <div className="section-head">
            <p className="eyebrow">Module 06</p>
            <h2>Dirigeant / synthèse</h2>
            <p>
              Une vue pour pitcher GDS en réseau, qualifier vite et redistribuer
              l&apos;opportunité au bon pôle.
            </p>
          </div>

          <div className="leader-grid">
            <section className="workspace-band">
              <h3>Pitch transversal 40 secondes</h3>
              <p className="lead">{leaderPlan.pitch}</p>
            </section>
            <section className="workspace-band">
              <h3>Questions de redistribution</h3>
              {leaderPlan.redistributionQuestions.map((question, index) => (
                <CheckLine
                  key={question}
                  checked={Boolean(state.actionChecks[leaderPlan.id]?.[index])}
                  onChange={() => toggleActionCheck(leaderPlan.id, index)}
                >
                  {question}
                </CheckLine>
              ))}
            </section>
            <section className="workspace-band">
              <h3>Priorités de pilotage</h3>
              <ul className="priority-list">
                {leaderPlan.priorities.map((priority) => (
                  <li key={priority}>{priority}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="route-map">
            <h3>Redistribuer au bon collaborateur</h3>
            <div className="route-grid">
              {collaboratorPlans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => selectPerson(plan.id)}
                >
                  <span>{plan.firstName}</span>
                  <strong>{plan.pole}</strong>
                  <small>{plan.badge}</small>
                </button>
              ))}
            </div>
          </section>
        </section>
      ) : null}

      <button
        type="button"
        className="notes-fab"
        onClick={() => updateState({ isNotesDrawerOpen: true })}
      >
        Carnet terrain
      </button>

      <NotesDrawer
        isOpen={state.isNotesDrawerOpen}
        notes={state.notes}
        onClose={() => updateState({ isNotesDrawerOpen: false })}
        onChange={updateNote}
        onExportTxt={exportTxt}
        onExportJson={exportJson}
      />
    </main>
  );
}

function NotesDrawer({
  isOpen,
  notes,
  onClose,
  onChange,
  onExportTxt,
  onExportJson,
}: {
  isOpen: boolean;
  notes: SessionNotes;
  onClose: () => void;
  onChange: (field: keyof SessionNotes, value: string) => void;
  onExportTxt: () => void;
  onExportJson: () => void;
}) {
  return (
    <div className={isOpen ? "notes-drawer is-open" : "notes-drawer"}>
      <button
        type="button"
        className="notes-backdrop"
        aria-label="Fermer le panneau de notes"
        onClick={onClose}
      />
      <aside aria-hidden={!isOpen} aria-label="Carnet terrain">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">Carnet terrain</p>
            <h2>Notes exportables</h2>
          </div>
          <div className="button-row no-margin">
            <button type="button" onClick={onExportTxt}>
              Export .txt
            </button>
            <button type="button" onClick={onExportJson}>
              Export .json
            </button>
            <button type="button" className="secondary" onClick={onClose}>
              Fermer
            </button>
          </div>
        </div>
        <div className="notes-grid">
          {noteFields.map((field) => (
            <TextAreaField
              key={field.id}
              id={`note-${field.id}`}
              label={field.label}
              value={notes[field.id]}
              placeholder={field.placeholder}
              onChange={(value) => onChange(field.id, value)}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}

function ArgumentClosingWorkspace({
  plan,
  argumentChoices,
  activeArgument,
  objectionChoices,
  activeObjection,
  closingPlaybook,
  closingScenario,
  closingSteps,
  closingChecks,
  completedClosingChecks,
  onSelectArgument,
  onSelectObjection,
  onToggleClosing,
}: {
  plan: CollaboratorPlan;
  argumentChoices: ArgumentBridge[];
  activeArgument?: ArgumentBridge;
  objectionChoices: ObjectionPlaybook[];
  activeObjection?: ObjectionPlaybook;
  closingPlaybook?: ClosingPlaybook;
  closingScenario?: TrainingScenario;
  closingSteps: ClosingStepItem[];
  closingChecks: boolean[];
  completedClosingChecks: number;
  onSelectArgument: (id: string) => void;
  onSelectObjection: (id: string) => void;
  onToggleClosing: (index: number) => void;
}) {
  return (
    <section className="workspace convince-workspace">
      <div className="section-head split-head">
        <div>
          <p className="eyebrow">Module 03</p>
          <h2>Argumenter & conclure</h2>
          <p>
            Transformer la découverte en argument cadré, traiter l&apos;objection
            et obtenir une prochaine action datée.
          </p>
        </div>
        <div className="mini-stat">
          <span>Closing {plan.firstName}</span>
          <strong>
            {completedClosingChecks}/{closingSteps.length}
          </strong>
        </div>
      </div>

      <section className="workspace-band">
        <div className="section-head compact-head">
          <p className="eyebrow">1. Argumentation</p>
          <h3>Partir de l&apos;enjeu client, pas du catalogue GDS</h3>
        </div>

        <div className="argument-selector">
          {argumentChoices.map((bridge) => (
            <button
              key={bridge.id}
              type="button"
              className={
                activeArgument?.id === bridge.id
                  ? "argument-card is-active"
                  : "argument-card"
              }
              aria-pressed={activeArgument?.id === bridge.id}
              onClick={() => onSelectArgument(bridge.id)}
            >
              <span>{bridge.title}</span>
              <small>{bridge.youWho}</small>
            </button>
          ))}
        </div>

        {activeArgument ? (
          <article className="script-panel">
            <div className="argument-method-grid">
              <section className="method-step">
                <span>1</span>
                <h4>Vous qui...</h4>
                <p>{activeArgument.youWho}</p>
              </section>
              <section className="method-step">
                <span>2</span>
                <h4>La solution va permettre de...</h4>
                <p>{activeArgument.solutionBenefit}</p>
              </section>
              <section className="method-step">
                <span>3</span>
                <h4>Grâce à...</h4>
                <ul>
                  {activeArgument.thanksTo.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
              <section className="method-step">
                <span>4</span>
                <h4>Validation</h4>
                <p>{activeArgument.validationQuestion}</p>
              </section>
            </div>
            <div className="script-example">
              <p className="eyebrow">Exemple à dérouler</p>
              <p className="script-line">{activeArgument.exampleScript}</p>
              <p className="coach-note">{activeArgument.coachNote}</p>
            </div>
          </article>
        ) : null}
      </section>

      <section className="workspace-band">
        <div className="section-head compact-head">
          <p className="eyebrow">2. Objection</p>
          <h3>Accueillir, isoler, creuser, traiter, valider</h3>
        </div>

        <div className="argument-selector">
          {objectionChoices.map((playbook) => (
            <button
              key={playbook.id}
              type="button"
              className={
                activeObjection?.id === playbook.id
                  ? "argument-card objection-card is-active"
                  : "argument-card objection-card"
              }
              aria-pressed={activeObjection?.id === playbook.id}
              onClick={() => onSelectObjection(playbook.id)}
            >
              <span>{playbook.title}</span>
              <small>{playbook.objection}</small>
            </button>
          ))}
        </div>

        {activeObjection ? (
          <article className="script-panel">
            <p className="quote">{activeObjection.objection}</p>
            <p className="theme-intent">{activeObjection.root}</p>
            <div className="objection-flow">
              {activeObjection.steps.map((step) => (
                <section key={step.id}>
                  <span>{step.title}</span>
                  <strong>{step.intent}</strong>
                  <p>{step.script}</p>
                  {step.questions ? (
                    <ul className="objection-questions">
                      {step.questions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        ) : null}
      </section>

      {closingPlaybook ? (
        <section className="workspace-band">
          <div className="section-head compact-head">
            <p className="eyebrow">3. Closing par pôle</p>
            <h3>{closingPlaybook.title}</h3>
            {closingScenario ? (
              <p>
                Mise en situation support: {closingScenario.title} avec{" "}
                {closingScenario.interlocutor}.
              </p>
            ) : null}
          </div>

          <div className="closing-layout">
            <section className="closing-readiness">
              <h4>Signaux de passage</h4>
              <ul>
                {closingPlaybook.readinessSignals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </section>

            <section className="closing-script">
              <h4>Déroulé fluide</h4>
              <div className="question-list">
                {closingSteps.map((step, index) => (
                  <CheckLine
                    key={step.id}
                    checked={Boolean(closingChecks[index])}
                    onChange={() => onToggleClosing(index)}
                  >
                    <span className="closing-step-content">
                      <span className="closing-step-title">{step.title}</span>
                      <span className="closing-step-script">{step.script}</span>
                    </span>
                  </CheckLine>
                ))}
              </div>
            </section>
          </div>

          <div className="closing-prompts">
            <section>
              <h4>Si le client hésite</h4>
              <p>{closingPlaybook.strongIssueIfBlocked}</p>
            </section>
            <section>
              <h4>Validation / contrat</h4>
              <p>{closingPlaybook.contractAsk}</p>
            </section>
          </div>
        </section>
      ) : null}
    </section>
  );
}

function ScenarioDetail({
  scenario,
  activeSectionId,
  onToggle,
}: {
  scenario: TrainingScenario;
  activeSectionId: string;
  onToggle: (sectionId: string) => void;
}) {
  const sections: FoldSection[] = [
    {
      id: "context",
      title: "Contexte",
      items: scenario.context,
    },
    {
      id: "visible",
      title: "Signaux visibles",
      items: scenario.visibleSignals,
    },
    {
      id: "hidden",
      title: "Signaux cachés",
      items: scenario.hiddenSignals,
    },
    {
      id: "objection",
      title: "Objection et mouvement attendu",
      quote: scenario.objection,
      text: scenario.expectedMove,
    },
  ];

  return (
    <article className="scenario-detail">
      <div className="scenario-heading">
        <div>
          <p className="eyebrow">Cas sélectionné</p>
          <h2>{scenario.title}</h2>
          <p>{scenario.interlocutor}</p>
        </div>
      </div>

      <div className="fold-stack">
        {sections.map((section) => (
          <ScenarioFold
            key={section.id}
            section={section}
            isOpen={activeSectionId === section.id}
            onToggle={() => onToggle(section.id)}
          />
        ))}
      </div>

      <section className="response-bank">
        <h3>Banque de réponses rapides</h3>
        <div>
          {scenario.responseBank.map((item) => (
            <article key={item.commercialQuestion}>
              <strong>{item.commercialQuestion}</strong>
              <p>{item.clientAnswer}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
