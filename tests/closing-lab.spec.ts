import { expect, test } from "@playwright/test";
import {
  argumentBridges,
  closingPlaybooks,
  collaboratorPlans,
  getClosingPlaybook,
  getRecommendedArgumentBridges,
  getRecommendedObjectionPlaybooks,
  getRecommendedPitches,
  objectionPlaybooks,
  trainingScenarios,
  verticalPitches,
} from "../src/lib/training-data";

test("mobile flow loads each collaborator plan, persists notes, and exports JSON", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await page.goto("/?collaborateur=marjorie-louis");

  await expect(page.getByText("GEDEAS Sales Lab")).toBeVisible();
  await expect(page.getByAltText("GEDEAS").first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Qui prépare son entretien ?" }),
  ).toBeVisible();
  const activeHomeCard = page
    .locator(".person-card.is-active")
    .filter({ hasText: "Marjorie" });
  await expect(activeHomeCard.getByText("Plan actif")).toBeVisible();
  await expect(
    activeHomeCard.getByRole("heading", {
      name: "Marjorie, votre plan de découverte",
    }),
  ).toBeVisible();
  await expect(
    activeHomeCard.getByRole("button", { name: "Prise de contact" }),
  ).toBeVisible();
  await expect(
    activeHomeCard.getByRole("button", { name: "Découverte", exact: true }),
  ).toBeVisible();

  for (const plan of collaboratorPlans) {
    await page.goto(`/?collaborateur=${plan.id}`);
    await page
      .locator(".module-tabs")
      .getByRole("button", { name: "Mon plan" })
      .click();
    await expect(
      page.getByRole("heading", {
        name: `Prise de contact de ${plan.firstName}`,
      }),
    ).toBeVisible();
    await expect(page.getByText(plan.pole).first()).toBeVisible();
    await expect(page.getByText(plan.promise)).toBeVisible();
    await expect(page.getByText("Pitch court")).toBeVisible();
    await expect(page.getByText("Vous allez bien ?")).toBeVisible();
    await expect(page.getByText(plan.openingSteps[1].formulations[0])).toBeVisible();
    await expect(
      page.getByText("C'est un entretien qui dure environ 25 minutes."),
    ).toBeVisible();
    await expect(page.getByText("3. Validation", { exact: true })).toHaveCount(0);
    await expect(page.getByText("Avant de parler solution")).toHaveCount(0);
    await expect(page.getByText("L'idée n'est pas de vous faire un catalogue")).toHaveCount(0);
    await expect(
      page.getByText(getRecommendedPitches(plan)[0].oral),
    ).toBeVisible();
    await expect(page.getByText("À vérifier")).toHaveCount(0);
    await expect(page.getByText("Objections probables")).toHaveCount(0);
    await expect(page.getByText("Actions à tester")).toHaveCount(0);
    await expect(page.getByText("Passer à la découverte")).toBeVisible();
    await expect(
      page.getByText("Dites-m'en plus sur votre situation actuelle.").first(),
    ).toBeVisible();
    await expect(page.locator(".sequence-card input[type='checkbox']")).toHaveCount(
      0,
    );
    await page.getByRole("button", { name: "Ouvrir la découverte" }).click();

    await expect(page.getByText(plan.discoveryThemes[0].title)).toBeVisible();
    await expect(page.getByText(plan.discoveryThemes[0].questions[0])).toHaveCount(
      0,
    );
    await expect(
      page.getByText(plan.discoveryThemes[0].openingQuestion),
    ).toHaveCount(0);
    await page.getByRole("button", { name: plan.discoveryThemes[0].title }).click();
    await expect(page.getByText("Question grand angle")).toBeVisible();
    await expect(
      page.getByText(plan.discoveryThemes[0].openingQuestion),
    ).toBeVisible();
    await page
      .locator(".module-tabs")
      .getByRole("button", { name: "Mon plan" })
      .click();
    await page.getByRole("button", { name: "Carnet terrain" }).click();
    await expect(page.getByLabel("Carnet terrain")).toBeVisible();
    await page.getByRole("button", { name: "Fermer", exact: true }).click();

    const argumentChoices = getRecommendedArgumentBridges(plan);
    const objectionChoices = getRecommendedObjectionPlaybooks(plan);
    const closing = getClosingPlaybook(plan);
    expect(closing).toBeDefined();

    await page
      .locator(".module-tabs")
      .getByRole("button", { name: "Argumenter & conclure" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Argumenter & conclure" }),
    ).toBeVisible();
    await expect(page.getByText(argumentChoices[0].title)).toBeVisible();
    await expect(page.getByText("Vous qui...")).toBeVisible();
    await expect(page.getByText("La solution va permettre de...")).toBeVisible();
    await expect(page.getByText("Grâce à...")).toBeVisible();
    await expect(
      page.locator(".objection-card").filter({
        hasText: objectionChoices[0].title,
      }),
    ).toBeVisible();
    await expect(
      page.locator(".objection-card").filter({ hasText: "Le prix" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Et en dehors de ce point, quels sont les autres freins que vous avez vis-à-vis de ma proposition ?",
      ),
    ).toBeVisible();
    await expect(
      page.getByText("Qu'est-ce qui vous donne ce sentiment de prix trop élevé ?"),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: closing!.title })).toBeVisible();
    await expect(page.getByText("Exemple à dérouler")).toBeVisible();
    await expect(page.getByText("Déroulé fluide")).toBeVisible();
    await expect(page.locator(".closing-step-title").first()).toBeVisible();
    await expect(page.locator(".closing-step-script").first()).toBeVisible();
  }

  const marjorie = collaboratorPlans[0];
  await page
    .locator(".module-tabs")
    .getByRole("button", { name: "Accueil" })
    .click();
  await page.getByRole("button", { name: /Marjorie/ }).click();
  await page
    .locator(".module-tabs")
    .getByRole("button", { name: "Découverte" })
    .click();

  await page.getByRole("button", { name: marjorie.discoveryThemes[0].title }).click();
  await page.getByLabel(marjorie.discoveryThemes[0].questions[0]).check();
  await page
    .locator(".module-tabs")
    .getByRole("button", { name: "Argumenter & conclure" })
    .click();
  await page.getByLabel(/Récapituler l'enjeu/).check();
  await page.getByRole("button", { name: "Carnet terrain" }).click();
  await page
    .getByLabel("Découverte")
    .fill("Je dois faire parler le client avant de proposer.");
  await page
    .getByLabel("Closing")
    .fill("Je dois obtenir une première action datée.");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export .json" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe(
    "gedeas-plan-decouverte-marjorie-louis.json",
  );

  await page.reload();
  await expect(page.getByLabel("Découverte")).toHaveValue(
    "Je dois faire parler le client avant de proposer.",
  );
  await expect(page.getByLabel("Closing")).toHaveValue(
    "Je dois obtenir une première action datée.",
  );
  await page.getByRole("button", { name: "Fermer", exact: true }).click();
  await page
    .locator(".module-tabs")
    .getByRole("button", { name: "Découverte" })
    .click();
  await expect(page.getByText(marjorie.discoveryThemes[0].questions[0])).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: marjorie.discoveryThemes[0].title }).click();
  await expect(
    page.getByLabel(marjorie.discoveryThemes[0].questions[0]),
  ).toBeChecked();
  await page
    .locator(".module-tabs")
    .getByRole("button", { name: "Argumenter & conclure" })
    .click();
  await expect(page.getByLabel(/Récapituler l'enjeu/)).toBeChecked();

  await page
    .locator(".module-tabs")
    .getByRole("button", { name: "Entraînement" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Politique handicap dispersée" }),
  ).toBeVisible();

  await page
    .locator(".module-tabs")
    .getByRole("button", { name: "Dirigeant" })
    .click();
  await expect(page.getByText("Pitch transversal 40 secondes")).toBeVisible();

  await expect(page.locator("[data-nextjs-dialog]")).toHaveCount(0);
  expect(consoleErrors).toEqual([]);
});

test("content guardrails keep the public app sober and complete", () => {
  const serialized = JSON.stringify({
    collaboratorPlans,
    argumentBridges,
    objectionPlaybooks,
    closingPlaybooks,
    trainingScenarios,
    verticalPitches,
  });

  expect(serialized).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  expect(serialized).not.toContain("verbatim");
  expect(serialized).not.toContain("diagnostic individuel");

  for (const plan of collaboratorPlans) {
    expect(plan.pitchIds.length).toBeGreaterThanOrEqual(1);
    expect(plan.openingSteps).toHaveLength(3);
    expect(plan.openingSteps[0].formulations).toEqual([
      "Bonjour, merci de prendre ce temps avec moi.",
      "Vous allez bien ?",
    ]);
    expect(plan.openingSteps.some((step) => step.id === "validation")).toBe(false);
    expect(plan.openingSteps[1].formulations).toEqual([
      expect.stringMatching(/^Aujourd'hui, nous allons parler de /),
      "Je vais vous présenter rapidement GEDEAS, puis nous échangerons sur votre situation, votre organisation et ce que nous pouvons mettre en place ensemble.",
      "C'est un entretien qui dure environ 25 minutes.",
      "C'est bon pour vous ?",
    ]);
    expect(plan.openingSteps[2].formulations[0]).toBe(
      verticalPitches.find((pitch) => pitch.id === plan.pitchIds[0])?.oral,
    );
    expect(plan.discoveryThemes.length).toBeGreaterThanOrEqual(3);
    for (const theme of plan.discoveryThemes) {
      expect(theme.openingQuestion).toBeTruthy();
      expect(theme.openingQuestion.length).toBeGreaterThan(20);
    }
    expect(plan.scenarioIds.length).toBeGreaterThanOrEqual(1);
    expect(plan.nextActions.length).toBeGreaterThanOrEqual(1);
    for (const pitchId of plan.pitchIds) {
      expect(verticalPitches.some((pitch) => pitch.id === pitchId)).toBe(true);
    }
    expect(getRecommendedArgumentBridges(plan).length).toBeGreaterThanOrEqual(2);
    expect(getRecommendedObjectionPlaybooks(plan).length).toBeGreaterThanOrEqual(
      2,
    );
    expect(
      getRecommendedObjectionPlaybooks(plan).some(
        (playbook) => playbook.id === "objection-prix",
      ),
    ).toBe(true);
    expect(getClosingPlaybook(plan)).toBeTruthy();
  }

  const isolateScript =
    "Et en dehors de ce point, quels sont les autres freins que vous avez vis-à-vis de ma proposition ?";
  for (const playbook of objectionPlaybooks) {
    const isolate = playbook.steps.find((step) => step.id === "isolate");
    const dig = playbook.steps.find((step) => step.id === "dig");
    expect(isolate?.script).toBe(isolateScript);
    expect(dig?.questions?.length).toBeGreaterThanOrEqual(2);
  }

  expect(verticalPitches.find((pitch) => pitch.id === "visites-medicales")?.oral).toBe(
    "La visite médicale, c’est rarement une priorité — jusqu’au jour où ça devient un problème. Retards, suivis qui glissent, populations mal couvertes... Chez GEDEAS, on remet le dossier en ordre, on fiabilise le suivi et on redonne à l’entreprise la maîtrise de sa conformité.",
  );
  expect(verticalPitches.find((pitch) => pitch.id === "rrh-responsable-rh")?.oral).toBe(
    "Quand on est responsable RH, les sujets importants deviennent vite une addition de petites urgences. Chez GEDEAS, on aide à remettre de l’ordre, à tenir le rythme et à fiabiliser l’exécution — pour que vous gardiez la maîtrise sans porter seul toute la charge.",
  );

  for (const scenario of trainingScenarios) {
    expect(scenario.visibleSignals.length).toBeGreaterThanOrEqual(3);
    expect(scenario.hiddenSignals.length).toBeGreaterThanOrEqual(3);
    expect(scenario.responseBank.length).toBeGreaterThanOrEqual(3);
  }
});
