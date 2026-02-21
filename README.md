# Tech Universe

Tech Universe is an interactive React + Vite + TypeScript web app that visualizes technology domains as galaxies and planets.  
Each planet contains:

- A focused lesson section
- A challenge/quiz
- Category and difficulty metadata
- Progress tracking (explored planets)

The experience supports mouse/touch navigation, zoom controls, responsive mobile behavior, and a modern SPA deployment setup.

## Features

- Multiple technology galaxies with 9 planets each
- Planet detail modal with:
  - Technology overview
  - Concepts
  - Foundation section (context-aware by galaxy)
  - Challenge quiz
- Dynamic explored count per selected galaxy
- Camera controls:
  - Zoom in/out
  - Reset view
  - Drag/pan (mouse and touch)
  - Click planet to focus/zoom
- Responsive design:
  - Mobile-optimized layout
  - Dropdown toggle for mobile navigation tips
- Dynamic footer year (`new Date().getFullYear()`)

## Tech Stack

- React 18
- Vite 5
- TypeScript 5
- Tailwind CSS 3
- PostCSS + Autoprefixer

## Project Structure

```txt
.
├─ src/
│  ├─ components/
│  │  ├─ ControlsPanel.tsx
│  │  ├─ InfoPanel.tsx
│  │  ├─ MiniMap.tsx
│  │  ├─ PlanetDetailModal.tsx
│  │  ├─ SpaceBackground.tsx
│  │  └─ UniverseScene.tsx
│  ├─ data/
│  │  └─ planets.ts
│  ├─ hooks/
│  │  ├─ useElementSdkConfig.ts
│  │  └─ useUniverseNavigation.ts
│  ├─ styles/
│  │  └─ universe.css
│  ├─ types/
│  │  ├─ element-sdk.d.ts
│  │  └─ ml.ts
│  ├─ App.tsx
│  ├─ index.css
│  └─ main.tsx
├─ index.html
├─ vercel.json
├─ tailwind.config.ts
├─ vite.config.ts
└─ package.json
```

## Available Galaxies

Each galaxy currently has 9 planets:

- Machine Learning Galaxy
- Statistics Galaxy
- Data Analysis Galaxy
- Data Science Galaxy
- Fullstack Development Galaxy
- Cyber Security Galaxy
- AI Development Galaxy
- Graphic Designing Galaxy
- Cloud Engineering Galaxy
- Game Development Galaxy
- Mobile App Development Galaxy
- Robotics Galaxy

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - TypeScript compile + Vite production build
- `npm run preview` - preview built app

## Deployment (Vercel)

This project includes a modern SPA rewrite config in `vercel.json`.

### Deploy steps

1. Push project to GitHub/GitLab/Bitbucket.
2. Import repository in Vercel.
3. Vercel will auto-detect Vite settings.
4. Deploy.

If needed, default build settings:

- Build command: `npm run build`
- Output directory: `dist`

## Customization Guide

### Add or edit galaxies/planets

Edit:

- `src/data/planets.ts`

Main places:

- `const ...Planets: Planet[]` arrays
- `export const universes: Universe[]`
- `technologyLessonFocus` map for tailored lesson tone

### Update modal foundation labels by galaxy

Edit:

- `src/App.tsx`

Look for:

- `foundationTitleByUniverse`

### Styling and visuals

- Global styles: `src/index.css`, `src/styles/universe.css`
- Component styles: Tailwind classes in each `src/components/*.tsx`

## Notes

- The app is SPA-based; `vercel.json` rewrites all routes to `index.html`.
- The footer year is dynamic.
- Touch and pointer interactions are supported for mobile usability.

## Author

- Mofetoluwa

