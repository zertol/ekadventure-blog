# Ekadventure — Adventure Blog

Ekadventure is a travel/adventure blog built with Next.js (App Router), Sanity (headless CMS), and Firebase Cloud Functions. The repo contains three main parts:

- `nextjs-ekadventure/` — the Next.js frontend
- `studio/` — Sanity Studio (content authoring)
- `firebase/` — Cloud Functions and server-side integrations

This README explains what each piece does and how to run the project locally after you fork it.

---

## Table of contents

- About
- Key features
- Repo layout
- Prerequisites
- Quickstart (run locally)
  - Frontend (Next.js)
  - Sanity Studio
  - Firebase functions (emulator)
- Environment variables
  - Frontend
  - Studio
  - Firebase functions
- How the pieces interact
- Building & deployment
- Troubleshooting
- Contributing
- License

---

## About

Ekadventure showcases travel posts, photo galleries, and a nested comments UI. Content is authored in Sanity Studio and delivered by the Next.js frontend. Private operations that require credentials (creating comments, sending emails) are handled by server-side Firebase Cloud Functions.

## Key features

- Next.js frontend with TypeScript and Tailwind
- Sanity Studio for content authoring with custom schema and actions
- Image carousel and lightbox (react-slick + lightgallery / yet-another-react-lightbox)
- Nested comments UI (client) with server endpoint integration
- Firebase Cloud Functions for server-side operations: comments, contact email (Resend), content helpers

## Repo layout

- `nextjs-ekadventure/` — Next.js frontend
  - `app/` — app routes & UI components
  - `src/` — components, hooks, sanity fetchers
  - `public/` — static assets & fonts
  - `package.json` — scripts & dependencies for frontend

- `studio/` — Sanity Studio
  - `schemaTypes/` — schema definitions (posts, authors, comments, categories)
  - `actions/` — Studio document actions (e.g. reply as author)
  - `migrations/` — import utilities (WordPress import helpers)
  - `package.json` — studio scripts & dependencies

- `firebase/` — Firebase project wrapper
  - `functions/` — Cloud Functions (TypeScript)
    - `src/controllers/` — controllers for posts, pages, comments, contact, about
    - `src/utils/` — Sanity helpers and utilities
    - `package.json` — functions scripts (build, serve, deploy)
  - `firebase.json`, `.firebaserc` — Firebase configuration

---

## Prerequisites

- Node.js 18+ (functions target Node 22)
- npm (or yarn / pnpm)
- (Optional) Firebase CLI (`firebase-tools`) to run emulator or deploy functions
- Sanity account / project access for working with production content

---

## Quickstart — run locally

Clone the repository and run the parts you need. You can run all three (frontend, studio, functions) in parallel in separate terminals.

```bash
git clone https://github.com/<your-username>/ekadventure-blog.git
cd ekadventure-blog
```

### Frontend (Next.js)

```bash
cd nextjs-ekadventure
npm install
npm run dev
```

App is usually available at `http://localhost:3000`.

### Sanity Studio (optional - content editing)

```bash
cd studio
npm install
npm run dev
```

Studio is usually available at `http://localhost:3333`.

### Firebase Cloud Functions (emulator)

From `firebase/functions`:

```bash
cd firebase/functions
npm install
# Build and start the functions emulator
npm run serve
# Or build in watch mode and run emulator
npm run serve:watch
```

The functions export endpoints (see `firebase/functions/src/index.ts`) such as:

- `addComment` — creates a comment in Sanity via HTTP mutation
- `sendContactMail` — sends contact form emails via Resend
- `fetchPostDetails`, `fetchAllPosts`, etc. — read endpoints/helpers

---

## Environment variables

Create `.env` files in the appropriate subfolders. Do not wrap values in quotes.

### Studio (`studio/.env`)

```
SANITY_API_TOKEN=sk<your_token_here>
```

### Firebase functions (emulator / deployment)

The functions use secrets such as:

- `SANITY_TOKEN` — Sanity token with create/publish scopes
- `RESEND_API_KEY` — API key for Resend (used by `sendContactMail`)
- (Optional) `GOOGLE_APPLICATION_CREDENTIALS` / service account JSON for certain deployments

Set secrets for the emulator via Firebase CLI or export env vars locally. Example:

```bash
firebase functions:secrets:set RESEND_API_KEY --data "<your_key>"
firebase functions:secrets:set SANITY_TOKEN --data "sk<your_token>"
```

Or export env vars locally before running the emulator.

---

## How the pieces interact

- Content authors create posts and manage content in **Sanity Studio**. The schema and custom Studio actions live in `studio/`.
- The **Next.js frontend** queries Sanity and renders posts, galleries, and comments on public pages.
- **Firebase Cloud Functions** host server-only logic: creating comments (using a SANITY token), sending contact emails (using Resend), and exposing helper read endpoints.

This split keeps private credentials out of the frontend while allowing a fast static/public site.

---

## Building & deployment

### Frontend

```bash
cd nextjs-ekadventure
npm install
npm run build
npm run start
```

Deploy to Vercel for the easiest hosting; remember to set environment variables in Vercel settings.

### Studio

```bash
cd studio
npm install
npm run build
# deploy or host the Studio as needed
```

### Firebase functions

```bash
cd firebase/functions
npm install
npm run build
firebase deploy --only functions
```

---

## Troubleshooting

- If environment variables are undefined: ensure `.env` is in the correct folder (studio vs frontend vs functions) and contains `KEY=value` (no quotes). Restart dev servers after changes.
- If Sanity write operations fail: verify your token scopes and that your Sanity-related environment variables are set correctly.
- Firebase emulator: install Firebase CLI (`npm i -g firebase-tools`) and ensure `firebase.json` is present.

---

## Contributing

- Fork and create a PR. Keep changes scoped and add notes to this README if you add new environment variables or services.

---

## License

This repository is licensed under the MIT License — see the [LICENSE](./LICENSE) file.