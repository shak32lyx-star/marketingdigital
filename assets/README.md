# DeutschSommer

DeutschSommer est une application web d'apprentissage de l'allemand conçue pour préparer les candidats à l'**examen FIDE** (Français, Italiano, Deutsch pour Étrangers), utilisé en Suisse pour évaluer les niveaux **A1 à B1**. Elle combine des leçons de grammaire structurées, un système de vocabulaire par répétition espacée, une simulation d'examen complète et une correction automatique par intelligence artificielle.

## Fonctionnalités principales

- **Leçons structurées** — Un programme de plusieurs unités mêlant théorie grammaticale, exercices de lecture (`lesen`) et préparation spécifique au format FIDE (oral/écrit).
- **Vocabulaire (Wortschatz)** — Des flashcards avec suivi de progression par mot (`LEARNING` / `MASTERED`), filtrage par unité ou classe grammaticale, et possibilité d'ajouter ses propres mots personnalisés.
- **Simulation d'examen FIDE** — Un examen blanc complet couvrant les quatre parties officielles : *Sprechen* (oral), *Hören* (écoute), *Lesen* (lecture) et *Schreiben* (écrit), avec minuteur et sauvegarde locale des réponses.
- **Correction par IA** — Les réponses (exercice unique ou examen complet) sont évaluées par Google Gemini, qui fournit un retour pédagogique détaillé et attribue un niveau FIDE estimé (A1/A2/B1).
- **Synthèse vocale (Text-to-Speech)** — Génération audio des textes allemands via Azure Cognitive Services Speech, utile pour l'entraînement à la compréhension orale et à la prononciation.
- **Comptes utilisateurs** — Authentification par email/mot de passe (JWT), historique des examens passés, et suivi de la progression individuelle.

## Architecture

Le projet est un monorepo composé de deux applications distinctes :

```
DeutschSommer/
├── backend/     API REST (Node.js / Express)
└── frontend/    Application web (React / TypeScript)
```

### Backend (`backend/`)

- **Stack** : Node.js, Express 5, Prisma ORM, PostgreSQL.
- **Authentification** : JWT + bcrypt (`middleware/auth.js`, `controllers/authController.js`).
- **IA** : Google Gemini (`@google/generative-ai`) pour la correction d'exercices et d'examens.
- **TTS** : Microsoft Cognitive Services Speech SDK pour la synthèse vocale allemande.
- **Base de données** : modélisée avec Prisma (`prisma/schema.prisma`) — utilisateurs, progression par leçon, vocabulaire, progression du vocabulaire, résultats d'examen et logs.

Routes exposées sous `/api` :

| Route              | Description                                       |
|---------------------|----------------------------------------------------|
| `/api/auth`          | Inscription, connexion, changement de mot de passe |
| `/api/ai`             | Correction d'un exercice ou d'un examen complet, historique des résultats |
| `/api/tts`            | Synthèse vocale (texte ou SSML)                    |
| `/api/vocabulary`     | Liste des mots, progression, ajout de mots personnalisés, réinitialisation |
| `/api/progress`       | Lecture et mise à jour de la progression par leçon |

### Frontend (`frontend/`)

- **Stack** : React 19, TypeScript, Vite, Tailwind CSS, React Router.
- **Pages principales** :
  - `HomePage` — tableau de bord et suivi global de progression.
  - `ProgramPage` / `LessonViewer` — parcours des leçons de grammaire et lecture.
  - `WortschatzPage` — entraînement au vocabulaire (flashcards).
  - `ExamPage` — simulation de l'examen FIDE complet avec correction IA.
  - `ExamHistoryPage` — historique des résultats d'examen.
  - `AccountPage` / `LoginPage` — gestion du compte et authentification.
- Les données pédagogiques (leçons, unités, exercices FIDE) sont statiques et stockées dans `frontend/src/data/lessons.json`.

## Prérequis

- Node.js (version récente LTS recommandée)
- Une base de données PostgreSQL
- Une clé API Google Gemini (`GEMINI_API_KEY`)
- Une clé et une région Azure Speech (`AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION`) — optionnel, requis uniquement pour la synthèse vocale

## Installation

### Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` dans `backend/` avec les variables suivantes :

```
DATABASE_URL="postgresql://user:password@localhost:5432/deutschsommer"
JWT_SECRET="votre_secret_jwt"
GEMINI_API_KEY="votre_cle_gemini"
AZURE_SPEECH_KEY="votre_cle_azure"
AZURE_SPEECH_REGION="votre_region_azure"
PORT=5000
```

Appliquer les migrations Prisma puis lancer le serveur :

```bash
npx prisma migrate deploy
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Par défaut, le frontend cible l'API sur `http://localhost:5000/api`. Pour pointer vers une autre URL, définir `VITE_API_URL` dans un fichier `.env` du dossier `frontend/`.

## Scripts utiles

| Emplacement | Commande        | Description                          |
|-------------|-----------------|---------------------------------------|
| `backend/`  | `npm start`     | Démarre le serveur Express            |
| `frontend/` | `npm run dev`   | Démarre le serveur de développement Vite |
| `frontend/` | `npm run build` | Compile l'application pour la production |
| `frontend/` | `npm run lint`  | Lint du code frontend                 |

## Référence

Le contenu pédagogique et les critères de correction s'appuient sur le *fide Test Handbuch* (juillet 2023), inclus à la racine du dépôt.
