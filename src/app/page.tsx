"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  allPeople,
  appPromise,
  collaboratorPlans,
  defaultNotes,
  getCollaboratorPlan,
  getRecommendedPitches,
  getRecommendedScenarios,
  leaderPlan,
  noteFields,
  storageKey,
  trainingScenarios,
  verticalPitches,
  type CollaboratorPlan,
  type SessionNotes,
  type TrainingScenario,
} from "@/lib/training-data";

type View = "home" | "plan" | "discovery" | "pitches" | "practice" | "leader";

type AppState = {
  view: View;
  selectedPersonId: string;
  activeThemeId: string;
  activeScenarioSectionId: string;
  selectedScenarioId: string;
  discoveryChecks: Record<string, Record<string, boolean[]>>;
  actionChecks: Record<string, boolean[]>;
  notes: SessionNotes;
};

const defaultPersonId = "marjorie-louis";

const initialState = (): AppState => ({
  view: "home",
  selectedPersonId: defaultPersonId,
  activeThemeId: "",
  activeScenarioSectionId: "",
  selectedScenarioId: "",
  discoveryChecks: {},
  actionChecks: {},
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
    ["home", "plan", "discovery", "pitches", "practice", "leader"].includes(
      partial.view,
    )
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
    activeThemeId: partial.activeThemeId || "",
    activeScenarioSectionId: partial.activeScenarioSectionId || "",
    selectedScenarioId: partial.selectedScenarioId || "",
    discoveryChecks: partial.discoveryChecks || {},
    actionChecks: partial.actionChecks || {},
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
}: {
  selectedPersonId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="person-grid" aria-label="Choix du collaborateur">
      {allPeople.map((person) => (
        <button
          key={person.id}
          type="button"
          className={
            selectedPersonId === person.id
              ? "person-card is-active"
              : "person-card"
          }
          aria-pressed={selectedPersonId === person.id}
          onClick={() => onSelect(person.id)}
        >
          <span>{person.firstName}</span>
          <strong>{person.role}</strong>
          <small>{person.badge}</small>
        </button>
      ))}
    </div>
  );
}

function PlanSummary({
  plan,
  onGo,
}: {
  plan: CollaboratorPlan;
  onGo: (view: View) => void;
}) {
  return (
    <section className="focus-panel">
      <div>
        <p className="eyebrow">Plan actif</p>
        <h1>{plan.firstName}, votre plan de découverte</h1>
        <p className="lead">{plan.posture}</p>
      </div>

      <div className="status-strip">
        <span>{plan.pole}</span>
        <span>{plan.discoveryThemes.length} axes de découverte</span>
        <span>{plan.scenarioIds.length} cas d&apos;entraînement</span>
      </div>

      <div className="button-row">
        <button type="button" onClick={() => onGo("plan")}>
          Préparer ma prise de contact
        </button>
        <button type="button" onClick={() => onGo("discovery")}>
          Ouvrir ma découverte
        </button>
        <button type="button" className="secondary" onClick={() => onGo("practice")}>
          Jouer un cas
        </button>
      </div>
    </section>
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
    updateState({ view });
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectPerson(id: string) {
    const nextPlan = getCollaboratorPlan(id);
    setState((current) => ({
      ...current,
      selectedPersonId: id,
      view: id === leaderPlan.id ? "leader" : current.view === "leader" ? "plan" : current.view,
      activeThemeId: nextPlan?.discoveryThemes[0]?.id || "",
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
          theme.questions
            .map((question, index) =>
              state.discoveryChecks[plan.id]?.[theme.id]?.[index]
                ? `- ${theme.title}: ${question}`
                : "",
            )
            .filter(Boolean),
        )
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
      notes: state.notes,
      discoveryChecks: state.discoveryChecks[state.selectedPersonId] || {},
      actionChecks: state.actionChecks[state.selectedPersonId] || [],
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
            />
          </section>

          {selectedPlan ? (
            <PlanSummary plan={selectedPlan} onGo={openView} />
          ) : (
            <LeaderSummary onGo={openView} />
          )}
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

              <section className="workspace-band action-band">
                <h3>Actions à tester</h3>
                <ul className="priority-list">
                  {selectedPlan.nextActions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
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
                          <div className="question-list">
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
            </>
          ) : (
            <LeaderSummary onGo={openView} />
          )}
        </section>
      ) : null}

      {state.view === "pitches" ? (
        <section className="workspace">
          <div className="section-head">
            <p className="eyebrow">Module 03</p>
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
              <p className="eyebrow">Module 04</p>
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
            <p className="eyebrow">Module 05</p>
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

      <section className="workspace notes-panel">
        <div className="section-head split-head">
          <div>
            <p className="eyebrow">Carnet terrain</p>
            <h2>Notes exportables</h2>
          </div>
          <div className="button-row no-margin">
            <button type="button" onClick={exportTxt}>
              Export .txt
            </button>
            <button type="button" onClick={exportJson}>
              Export .json
            </button>
          </div>
        </div>
        <div className="notes-grid">
          {noteFields.map((field) => (
            <TextAreaField
              key={field.id}
              id={`note-${field.id}`}
              label={field.label}
              value={state.notes[field.id]}
              placeholder={field.placeholder}
              onChange={(value) => updateNote(field.id, value)}
            />
          ))}
        </div>
      </section>
    </main>
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
