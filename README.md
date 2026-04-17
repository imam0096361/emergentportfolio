# Imam Chowdhury — Portfolio (ASTRA CORE)

World-class HUD-style portfolio built with React + Tailwind + Framer Motion + Canvas WebGL-style animations.

## 🚀 Deploy on Vercel

This repo is configured to deploy **frontend-only** on Vercel. The `vercel.json` at the repo root points Vercel to the `frontend/` folder and uses the Create React App preset.

### One-time setup

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), click **Import Project** → select this GitHub repo.
3. Vercel will detect the `vercel.json`. Click **Deploy**.
4. (Optional) Add your custom domain `imamchowdhury.com` in **Project → Settings → Domains**.

### Local development

```bash
cd frontend
yarn install
yarn start
```

## 🧱 Tech Stack

- **React 19** with Create React App + CRACO
- **Tailwind CSS** + shadcn/ui components
- **Framer Motion** for section reveals
- **Custom Canvas 2D** for the WebGL-style hero wireframe + particles
- **Lucide icons**, **Space Grotesk / Manrope / JetBrains Mono** typography

## 📦 Structure

```
emergentportfolio/
├── vercel.json            # Vercel deploy config (frontend-only)
├── .vercelignore
├── frontend/              # React portfolio (deployed)
│   ├── src/
│   │   ├── components/    # Hero, Systems, Stack, Timeline, AutomateBD, Contact, ...
│   │   └── data/mock.js   # All portfolio content (edit here)
│   └── package.json
└── backend/               # FastAPI (NOT deployed — optional future work)
```

## ✏️ Editing Content

All copy, systems, timeline, awards, stack groups etc. live in **`frontend/src/data/mock.js`**. Edit that one file and redeploy.

## 📩 Contact Form

Currently saves to `localStorage` (frontend-only). To wire up real email notifications later, deploy the FastAPI backend separately (Railway / Render / Fly) and set `REACT_APP_BACKEND_URL` in Vercel env vars.

---

© Imam Chowdhury · [imamchowdhury.com](https://imamchowdhury.com) · [AutomateBD](https://automatebd.xyz)
