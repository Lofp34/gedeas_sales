# GEDEAS Sales Lab

Application statique Next.js pour préparer les entretiens commerciaux GEDEAS:
prise de contact, découverte, argumentation, objections, closing, pitchs par
verticale et cas d'entraînement.

## Principe

L'application donne à chaque collaborateur un plan sobre et public, adapté à
son pôle, sans publier de verbatim sensible ni diagnostic individuel brut.

Les exemples et mises en situation sont dérivés des entretiens collaborateurs
des 24 et 25 février 2026, de l'atelier plan de vente du 17 mars 2026, des
fiches personnes GEDEAS et de l'analyse des verticales commerciales.

Les données restent dans le navigateur via `localStorage`. Les exports `.txt`
et `.json` sont générés côté client, sans backend, base de données ni
authentification.

## Modules

- `Accueil` : choix du collaborateur et reprise du dernier plan.
- `Mon plan` : prise de contact en 4 temps et bascule directe vers la découverte.
- `Découverte` : axes de questions adaptés au collaborateur.
- `Argumenter & conclure` : scripts cadrés pour argumenter depuis la découverte,
  traiter les objections dont le prix et conclure avec une action datée par pôle.
- `Pitchs & cibles` : pitchs GEDEAS/GDS par verticale et interlocuteur.
- `Entraînement` : cas clients jouables en binôme.
- `Dirigeant` : pitch transversal et redistribution vers le bon pôle.
- `Carnet terrain` : tiroir flottant accessible sur tous les modules avec exports.

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
