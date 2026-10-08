# Wedding Project — AI Agent Guidelines & Architecture Manual

Welcome to the **Royal Sikh Digital Wedding Invitation & Event Platform** (`wedding-card-project`). This file serves as the definitive architecture guide and operating manual for all AI agents and developers working on this codebase.

---

## 1. Project Overview & Vision

This application is an ultra-luxurious, interactive digital wedding invitation and event management platform celebrating the Anand Karaj and Jaggo wedding of **Sandeep Singh & Sarbjeet Kaur** (27 November 2026, The Grand Manor Resort, Nawanshahr, Punjab).

Key product highlights:
- **3D Royal Door Reveal**: An opulent 3D Punjabi door-opening entry animation with gold filigree and regal crest.
- **Interactive Scratch-to-Reveal Card**: Canvas-based heart scratch card revealing the auspicious wedding date.
- **Live Countdown Timer**: Real-time days, hours, minutes, and seconds countdown to the Anand Karaj ceremony.
- **Admin Layout & Module Switcher (`AdminDashboardModal`)**: Live admin center enabling/disabling sections (Scratch Card, Countdown, Photo, Parents/Blessings, Ceremonies, RSVP, Music) with presets and border styles.
- **Live Customizer Drawer (`CustomizerDrawer`)**: Real-time editor allowing couples to edit names, parents, venue details, ceremony itineraries, and upload custom couple photos or background wallpapers.
- **Interactive RSVP & Wishes Wall (`GuestBookRSVP`)**: Guest response tracking, attendance counters, and congratulatory digital guestbook.
- **Multi-Page Printable Royal PDF Export (`PDFTemplate`)**: Generates an A4 4-page wedding invitation booklet using `html2canvas` and `jsPDF` with clickable Google Maps and RSVP links.
- **Shareable Customized Links**: Encodes complete personalized invitation state into shareable URL parameters (`?invitation=...`).
- **Offline Persistence**: Synchronizes all customizations and guest responses to browser `localStorage`.

---

## 2. Technology Stack

- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8 (`@vitejs/plugin-react`)
- **Language**: TypeScript (`~6.0`) with `verbatimModuleSyntax: true`
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `tailwindcss`) + Custom CSS utilities (`src/index.css`)
- **Icons**: Lucide React (`lucide-react`)
- **PDF Generation**: `jspdf` + `html2canvas`
- **Celebration Effects**: `canvas-confetti`
- **Linter**: Oxlint (`oxlint`)

---

## 3. Directory & File Structure

```
d:/wedding card project/
├── AGENTS.md                  # This specification and instruction file
├── package.json               # Project manifest, scripts, and dependencies
├── vite.config.ts             # Vite configuration with React & Tailwind plugins
├── tsconfig.json              # Solution-style TypeScript config
├── tsconfig.app.json          # App TypeScript config (strict, verbatimModuleSyntax)
├── index.html                 # Main HTML root with web fonts and viewport settings
├── public/                    # Static textures, artwork & background images
│   ├── bg_cream_gold.jpg
│   ├── bg_gold_green.jpg
│   ├── bg_maroon_green.jpg
│   ├── bg_royal_velvet.jpg
│   ├── bg_yellow_gold.jpg
│   ├── royal_crest_background.jpg
│   ├── couple_photo.jpg
│   └── couple_sketch_art.jpg
└── src/
    ├── main.tsx               # React application mounting point
    ├── App.tsx                # Central coordinator, state manager, and layout renderer
    ├── types.ts               # Core domain interfaces (EventDetails, GuestResponse)
    ├── index.css              # Typography imports, Tailwind directives, gold gradient classes
    └── components/
        ├── AdminDashboardModal.tsx # Section toggler, presets, border & typography selectors
        ├── CustomizerDrawer.tsx    # Live data editor, theme picker, photo & bg uploader
        ├── DoorReveal.tsx          # 3D interactive double-door opening entry screen
        ├── ScratchToReveal.tsx     # Canvas scratch-to-reveal wedding date card
        ├── CountdownTimer.tsx      # Real-time event countdown timer
        ├── GuestBookRSVP.tsx       # Guest RSVP submission form and wishes board
        └── PDFTemplate.tsx         # Hidden multi-page printable invitation template
```

---

## 4. Key Components & State Flow

### `src/App.tsx`
- **Central State**:
  - `eventDetails: EventDetails`: Groom/bride names, parents, date, venue, maps URL, ceremony schedule.
  - `layoutConfig: LayoutConfig`: Visibility flags for scratch card, countdown, photo, story, events, guestbook, music toggle, plus `cardBorderStyle` and `fontFamily`.
  - `selectedTemplate: string`: Active theme ID (`royal-crest`, `gold-green`, `maroon-green`, `cream-gold`, `yellow-gold`, `royal-velvet`).
  - `couplePhoto: string`: Couple image path or uploaded data URL.
  - `responses: GuestResponse[]`: List of submitted RSVPs.
- **Storage Sync**: Automatically loads from and updates `localStorage` (`wedding_layout_config`, `wedding_event_details`, `wedding_selected_template`, `wedding_guest_responses`).
- **Share Links**: Generates Base64 URL parameter `?invitation=...` encoding `eventDetails`, `layoutConfig`, `selectedTemplate`, and `isSketchActive`.

### `src/components/AdminDashboardModal.tsx`
- **Props**: Receives `isOpen`, `onClose`, `eventDetails`, `onUpdateEventDetails`, `selectedTemplate`, `onSelectTemplate`, `layoutConfig`, and `onUpdateLayoutConfig`.
- **Tabs**:
  1. *Page Modules & Layout Switcher*: Live toggle checkboxes for each section, plus quick presets (`Enable All`, `Minimalist Invite`, `Reset`).
  2. *Predefined Themes & Borders*: Background selection, `cardBorderStyle` selector (`royal-double`, `ornate-gold`, `minimal`), and `fontFamily` selector (`Cinzel`, `Playfair Display`, `Great Vibes`).
  3. *Venue & Ceremony Data*: Quick editing for names, venue, and map URL.

### `src/components/CustomizerDrawer.tsx`
- Slides in from the right edge.
- Provides granular editing for every ceremony event (add, remove, edit titles/dates/times).
- Handles file uploads for couple photos and custom backgrounds.
- Contains direct shortcut button to launch the `AdminDashboardModal`.

### `src/components/PDFTemplate.tsx`
- Renders 4 high-res A4 pages (`.pdf-page-node`) offscreen at `left: -9999px`.
- When `downloadPDF()` is triggered, `html2canvas` captures each page at `scale: 2` and `jsPDF` bundles them into an A4 printable document with interactive hyperlink annotations for Google Maps and RSVP.

---

## 5. Design & Aesthetic System

- **Color Tokens**:
  - Background: Deep Velvet Burgundy (`#2b080b`), Midnight Maroon (`#140608`, `#1c0406`)
  - Accent / Borders: Imperial Gold (`#d4af37`), Champagne Glow (`#fce09b`, `#ffd700`)
  - Text: Rose Tinted Off-White (`#fce7f3`), Pure Gold (`#fce09b`)
- **Typography Classes**:
  - `.font-cinzel`: Royal serif heading typeface (`Cinzel, serif`)
  - `.font-calligraphic`: Traditional reading serif (`Cormorant Garamond, serif`)
  - `.font-cursive`: Romantic signature script (`Great Vibes, cursive`)
  - `.font-display`: Majestic editorial serif (`Playfair Display, serif`)
  - `.text-gold-shine`: Linear metallic gold shimmer gradient text
- **Border Elegance Utilities**:
  - `royal-double`: `border-4 border-double border-[#d4af37]/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)]`
  - `ornate-gold`: `border-2 border-[#d4af37] shadow-[0_0_35px_rgba(212,175,55,0.45)]`
  - `minimal`: `border border-[#d4af37]/40 shadow-xl`

---

## 6. Critical Agent Coding Rules

1. **Strict TypeScript & Type-Only Imports**:
   - `tsconfig.app.json` has `verbatimModuleSyntax: true`.
   - **MANDATORY**: Any imported type or interface MUST use `import type { ... }` or `import { type MyType }`. Failure to do so will cause TS1484 build errors.
2. **Never Remove Unused Code Without Inspection**:
   - Verify if a component or handler is meant to be wired up before deleting it.
3. **Preserve User Customizations**:
   - Always load defaults gracefully from `localStorage` and persist updates.
4. **Maintain Aesthetic Excellence**:
   - This is a luxury wedding invitation product. Do NOT use plain HTML controls or generic colors (blue, red). Always use the established gold and burgundy design system.
5. **Always Verify Builds**:
   - Run `npm run build` after making modifications to ensure 100% clean builds with zero TypeScript or Vite errors.

---

## 7. Developer & Build Commands

```bash
# Start Vite development server (default: http://localhost:5173/)
npm run dev

# Run full TypeScript type-check and Vite production bundle
npm run build

# Run fast code linting
npm run lint

# Preview the built production bundle
npm run preview
```
