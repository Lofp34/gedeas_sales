# GEDEAS Sales Lab

Application statique Next.js pour préparer les entretiens commerciaux GEDEAS:
prise de contact, découverte, pitchs par verticale et cas d'entraînement.

## Principe

L'application donne à chaque collaborateur un plan sobre et public, adapté à
son pôle, sans publier de verbatim sensible ni diagnostic individuel brut.

Les données restent dans le navigateur via `localStorage`. Les exports `.txt`
et `.json` sont générés côté client, sans backend, base de données ni
authentification.

## Modules

- `Accueil` : choix du collaborateur et reprise du dernier plan.
- `Mon plan` : prise de contact en 4 temps, objections et actions à tester.
- `Découverte` : axes de questions adaptés au collaborateur.
- `Pitchs & cibles` : pitchs GEDEAS/GDS par verticale et interlocuteur.
- `Entraînement` : cas clients jouables en binôme.
- `Dirigeant` : pitch transversal et redistribution vers le bon pôle.

## Commandes

```bash
npm run dev
npm run lint
npm run build
npm run test:e2e
```

## Déploiement Vercel

Le projet est une application Next.js App Router statique:

- pas d'API route;
- pas de base de données;
- pas de variable d'environnement requise.

Pour le déploiement:

1. Pousser le code sur `Lofp34/gedeas_sales`.
2. Importer le dépôt dans Vercel.
3. Conserver les réglages Next.js détectés automatiquement.

## Assets

Le logo GEDEAS est servi localement depuis `public/brand/gedeas-logo-complet.png`
et `public/brand/gedeas-logo.svg`.
