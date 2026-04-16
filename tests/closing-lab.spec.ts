import { expect, test } from "@playwright/test";
import {
  collaboratorPlans,
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

  for (const plan of collaboratorPlans) {
    await page
      .locator(".module-tabs")
      .getByRole("button", { name: "Accueil" })
      .click();
    await page.getByRole("button", { name: new RegExp(plan.firstName) }).click();

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
    await expect(page.getByText("À vérifier")).toHaveCount(0);
    await expect(page.getByText("Objections probables")).toHaveCount(0);
    await expect(page.locator(".sequence-card input[type='checkbox']")).toHaveCount(
      0,
    );

    await page
      .locator(".module-tabs")
      .getByRole("button", { name: "Découverte" })
      .click();
    await expect(page.getByText(plan.discoveryThemes[0].title)).toBeVisible();
    await expect(page.getByText(plan.discoveryThemes[0].questions[0])).toBeVisible();
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

  await page.getByLabel(marjorie.discoveryThemes[0].questions[0]).check();
  await page
    .getByLabel("Découverte")
    .fill("Je dois faire parler le client avant de proposer.");

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
  await expect(
    page.getByLabel(marjorie.discoveryThemes[0].questions[0]),
  ).toBeChecked();

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
    trainingScenarios,
    verticalPitches,
  });

  expect(serialized).not.toMatch(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  expect(serialized).not.toContain("verbatim");
  expect(serialized).not.toContain("diagnostic individuel");

  for (const plan of collaboratorPlans) {
    expect(plan.pitchIds.length).toBeGreaterThanOrEqual(1);
    expect(plan.discoveryThemes.length).toBeGreaterThanOrEqual(3);
    expect(plan.scenarioIds.length).toBeGreaterThanOrEqual(1);
    expect(plan.nextActions.length).toBeGreaterThanOrEqual(1);
  }

  for (const scenario of trainingScenarios) {
    expect(scenario.visibleSignals.length).toBeGreaterThanOrEqual(3);
    expect(scenario.hiddenSignals.length).toBeGreaterThanOrEqual(3);
    expect(scenario.responseBank.length).toBeGreaterThanOrEqual(3);
  }
});
