# Melya Landing Page — Claude Code Prompt

## Context

Melya (melya.app) is a French SaaS platform that automates psychometric questionnaire administration and scoring for psychologists, primarily TCC (cognitive-behavioral therapy) practitioners. The landing page is a waitlist/pre-launch page. All content is in **French** with inclusive writing (point médian: ·).

## Tech Stack

- **Next.js App Router** — this page lives inside an existing monorepo, under a `(marketing)` route group
- **TailwindCSS** + **shadcn/ui**
- **TypeScript**
- Single page, scroll-based with anchor navigation
- Mobile-first responsive via Tailwind

## Assets (provided separately)

The following assets will be provided as files:

- `logo.svg` — Melya logo (terracotta blob icon + Gelica Bold wordmark)
- `hero-photo.jpg` — stock photo for the hero section (warm therapy/consultation scene)
- `icon-bdi.svg`, `icon-stai.svg`, `icon-lsas.svg`, `icon-pcl5.svg`, `icon-ybocs.svg` — individual scale icons
- `screenshot-dashboard.png` — app dashboard screenshot
- `renata-photo.jpg` — testimonial profile photo (use a placeholder circle if not provided)

Place assets in `public/images/landing/`.

---

## Design System

### Typography

- **Headings:** Gelica (Bold / SemiBold) — load via @font-face from local files or Adobe Fonts. Gelica is a soft rounded serif by Dave Rowland / Eclectotype. Warm, friendly, not cutesy.
- **Body text:** Rethink Sans — load from Google Fonts

### Color Palette (use CSS variables / Tailwind config)

```
--terracotta: #C65D24       /* Primary accent, CTAs, active elements */
--cream-light: #EDE8DF      /* Main page background (body) */
--beige-sand: #D5CCB8       /* Brand beige (used for accents, not body bg) */
--off-white: #FAF8F5        /* Cards, elevated surfaces */
--warm-black: #1A1A1A       /* Headings */
--warm-gray: #4A4540        /* Body text */
--soft-green: #5B8C6A       /* Very subtle accents only: "coming soon" badges, small icons */
```

### Design Tone

- **Warm, organic, minimal, human** — anti-corporate, approachable
- Background: cream-light #EDE8DF everywhere, NOT white
- Organic shapes, soft rounded corners (consistent with the blob in the logo)
- NO harsh shadows, NO neon colors, NO tech-startup clichés
- Subtle animations: gentle fade-ins on scroll, soft hover states on cards
- The overall feel should be: calm, trustworthy, professional but not clinical

---

## Page Structure (top to bottom)

### 1. Navbar (sticky)

- **Left:** Melya logo
- **Center:** Anchor links — Fonctionnalités, Comment ça marche, Tarifs, FAQ
- **Right:** CTA button "Rejoindre la liste d'attente" (terracotta, opens modal)
- Sticky on scroll, subtle background blur/opacity change on scroll
- Mobile: hamburger menu

### 2. Hero Section

- **Left side:**
  - H1: `Envoyez vos échelles en 2 minutes, recevez les résultats cotés automatiquement`
  - Subtitle (p): `Melya automatise la cotation de vos échelles et questionnaires psychologiques. Moins de paperasse, plus de rigueur clinique, plus de temps avec vos patients.`
  - Primary CTA button: `Rejoindre la liste d'attente` (terracotta, opens modal)
  - Secondary CTA link: `Voir comment ça marche` (text link with arrow, scrolls to "Comment ça marche" section)
- **Right side:**
  - Hero photo (warm consultation scene)
  - 3 floating toast notifications overlaid on the photo, staggered with subtle animation:
    - `✓ Test BDI envoyé à M. Dupont`
    - `✓ Vous avez reçu un test`
    - `✓ Vous avez reçu les résultats de M. Dupont`
  - Toasts: off-white background, small, rounded, with a subtle shadow. Appear with a gentle slide-in/fade animation.

### 3. Social Proof (below hero)

- Centered quote block:
  - `"La cotation manuelle est tellement chronophage qu'on finit par renoncer à utiliser les échelles, alors qu'on sait qu'elles peuvent être essentielles à la rigueur clinique du suivi."`
- Profile photo (circular, placeholder if not provided) + attribution:
  - `Renata Dujmusic, Psychologue en TCC`

### 4. Scale Badges (horizontal scroll)

- Horizontal row of 5 badges, scrollable on mobile:
  - Each badge: SVG icon + acronym + short label
  - `BDI — Dépression`
  - `STAI — Anxiété`
  - `LSAS — Anxiété sociale`
  - `PCL-5 — Trauma`
  - `YBOCS — TOC`
- Below the badges, centered text: `Accédez aux échelles psychométriques les plus utilisées, validées scientifiquement`
- Style: off-white cards with subtle border, consistent with app UI

### 5. Benefits Section (id="fonctionnalites")

- Section title (optional, subtle): `Melya s'occupe de votre charge administrative` or similar
- 4 benefit cards in a 2x2 grid (single column on mobile):

**Card 1: Zéro erreur de cotation**
Le calcul est automatique, basé sur les barèmes officiels. Fini les doutes sur un score fait à la main.

**Card 2: Vos patients remplissent depuis leur téléphone**
Pas d'impression, pas de papier à récupérer. Le patient répond où et quand il veut avant la séance.

**Card 3: Toutes vos passations au même endroit**
Plus de fichiers Excel éparpillés, de PDFs perdus ou de classeurs papier. Un patient, un historique.

**Card 4: Visualisez l'évolution séance après séance**
Suivez la progression de vos patients en un coup d'œil.
→ This card has a small badge in soft-green: `Bientôt disponible`

- Cards: off-white background, soft rounded corners, subtle shadow or border

### 6. How It Works (id="comment-ca-marche")

- Section title: `Comment ça marche ?`
- 3 steps in a horizontal row (stacked on mobile), with step numbers:

**Step 1: Choisissez votre patient et vos échelles**
Sélectionnez un patient existant ou créez-en un en quelques secondes, puis choisissez une ou plusieurs échelles à lui envoyer.

**Step 2: Le patient répond en ligne**
Votre patient·e reçoit un lien par email, remplit le questionnaire depuis son téléphone ou ordinateur, sans créer de compte.

**Step 3: Recevez les résultats cotés automatiquement**
Scores calculés selon les barèmes officiels, disponibles instantanément dans votre espace sécurisé.

- Include the dashboard screenshot below or alongside the steps, displayed in a browser frame mockup (rounded corners, minimal chrome, subtle shadow)

### 7. Without / With Melya Comparison

- Two-column layout (stacked on mobile):

**Sans Melya** (left, neutral/muted styling):

- Cotation manuelle, source d'erreurs et de perte de temps
- Échelles sous-utilisées faute de temps
- Résultats dispersés entre papier, PDFs et Excel

**Avec Melya** (right, highlighted/positive styling with terracotta accents):

- Cotation automatique, fiable et instantanée
- Envoi d'échelles en quelques clics, avant ou après la séance
- Un seul espace sécurisé (serveur HDS) pour tous vos résultats

### 8. Pricing Section (id="tarifs")

- Section title: `Tarifs`
- Two pricing cards side by side (stacked on mobile):

**Card 1: Gratuit**

- Description: `Pour découvrir Melya à votre rythme`
- Features:
  - 5 patients ou 20 passations/mois
  - Accès à toutes les échelles disponibles
  - Cotation automatique
- CTA: `Commencer gratuitement` (outline/secondary style, opens waitlist modal)

**Card 2: Pro — 10€/mois** (8€/mois en abonnement annuel)

- Description: `Pour les praticiens qui utilisent les échelles régulièrement`
- Features:
  - Patients illimités
  - Passations illimitées
  - Historique complet des passations
- CTA: `Rejoindre la liste d'attente` (terracotta/primary style, opens waitlist modal)
- Optionally highlight as "recommended"

### 9. FAQ Section (id="faq")

- Section title: `Questions fréquentes`
- Accordion-style (click to expand), 6 items:

**Q: Quelles échelles psychologiques sont disponibles ?**
A: Melya propose au lancement 5 échelles parmi les plus utilisées en TCC : BDI (dépression), STAI (anxiété), LSAS (anxiété sociale), PCL-5 (trauma) et YBOCS (TOC). De nouvelles échelles sont ajoutées régulièrement en fonction des besoins des psychologues.

**Q: Mes données sont-elles vraiment sécurisées ?**
A: Oui. Melya est hébergé sur un serveur certifié HDS (Hébergeur de Données de Santé), conforme au RGPD. Toutes les données sont chiffrées et stockées en France. Seul·e vous, en tant que praticien·ne, pouvez accéder aux données de vos patients. Aucun·e autre praticien·ne utilisant Melya n'y a accès, et même l'équipe Melya n'a pas accès à vos données cliniques grâce au chiffrement. Vous restez propriétaire de vos données à tout moment. Pour toute question relative à la sécurité : clement@melya.app

**Q: Combien coûte Melya ?**
A: Melya est gratuit jusqu'à 5 patients ou 20 passations par mois. Au-delà, l'abonnement Pro est à 10€/mois (ou 8€/mois en abonnement annuel).

**Q: Comment mes patients reçoivent-ils les questionnaires ?**
A: Vos patients reçoivent un lien par email. Ils répondent directement depuis leur smartphone, tablette ou ordinateur, sans créer de compte.

**Q: Respectez-vous le droit d'auteur des échelles ?**
A: Oui. Les échelles proposées au lancement sont dans le domaine public ou utilisées avec les autorisations appropriées. Nous travaillons avec les éditeurs pour élargir progressivement le catalogue dans le respect des droits d'auteur.

**Q: Puis-je annuler mon abonnement ?**
A: Oui, à tout moment et sans frais. Vos données restent accessibles après l'annulation. Vous pouvez les exporter si nécessaire.

### 10. Final CTA Section

- Distinct background (cream-light or subtle gradient)
- Centered:
  - H2: `Prêt·e à simplifier votre pratique clinique ?`
  - Subtitle: `Rejoignez les psychologues qui utilisent Melya pour automatiser leurs cotations.`
  - CTA button: `Rejoindre la liste d'attente` (terracotta, opens modal)

### 11. Footer

- Minimal, warm styling on beige-sand or slightly darker background
- **Left:** Melya logo
- **Center:** Links — Contact · Sécurité · Politique de confidentialité · Mentions légales · Échelles disponibles
- **Right:** LinkedIn · Instagram (@melyapsy)
- Bottom: `© 2026 Melya — Hébergé en France sur serveur certifié HDS`

---

## Waitlist Modal

- Triggered by any CTA button on the page
- Centered modal with backdrop overlay (blurred)
- Content:
  - Melya logo or icon
  - Title: `Rejoindre la liste d'attente`
  - Subtitle: `Recevez un accès prioritaire dès le lancement.`
  - Email input field (placeholder: `votre@email.com`)
  - Submit button: `S'inscrire` (terracotta)
  - After submission: success message `Merci ! Vous serez informé·e dès le lancement de Melya.`
- Backend integration: Resend API (email collection endpoint, to be connected by the CTO)
- For now, implement the frontend with a placeholder API call that can be wired up later

---

## SEO

```html
<title>Melya — Automatisez la passation de vos échelles psychologiques</title>
<meta
  name="description"
  content="Envoyez vos échelles en 2 minutes, recevez les résultats cotés automatiquement. Melya simplifie la passation des questionnaires psychométriques pour les psychologues. Hébergé en France sur serveur certifié HDS."
/>
<meta
  property="og:title"
  content="Melya — Automatisez la passation de vos échelles psychologiques"
/>
<meta
  property="og:description"
  content="Envoyez vos échelles en 2 minutes, recevez les résultats cotés automatiquement."
/>
<meta property="og:image" content="/images/landing/og-image.png" />
<meta property="og:url" content="https://melya.app" />
<link rel="canonical" href="https://melya.app" />
```

---

## Important Notes

- **All text is in French** — do NOT translate any content
- **Use inclusive writing** with point médian (·) where already present in the copy: praticien·ne, seul·e, prêt·e, patient·e, aucun·e
- **Animations**: keep them subtle and tasteful — gentle fade-in on scroll, soft hover states. Nothing flashy or bouncy. This is a healthcare tool for professionals.
- **No fake data**: do not invent features or content not specified here
- **Photo/image placeholders**: if an asset is not yet provided, use a styled placeholder (colored rectangle with dimensions matching the expected content, NOT a gray box)
- **Gelica font**: if the font file is not available, use a fallback with similar characteristics (e.g., `'Gelica', 'Recoleta', Georgia, serif`). The CTO will provide the font files.
- **Performance**: optimize images, lazy load below-the-fold sections
- **The page must look production-ready**, not like a template or wireframe

---

## Remaining To-Do

### Assets uploaded

1. ~~Gelica font files (all weights)~~ → `public/fonts/`
2. ~~`logo.svg`~~ → `public/images/landing/`

### Assets still needed

4. `hero-photo.jpg` — warm therapy/consultation scene → `public/images/landing/`
5. `icon-bdi.svg` — BDI scale icon → `public/images/landing/`
6. `icon-stai.svg` — STAI scale icon → `public/images/landing/`
7. `icon-lsas.svg` — LSAS scale icon → `public/images/landing/`
8. `icon-pcl5.svg` — PCL-5 scale icon → `public/images/landing/`
9. `icon-ybocs.svg` — YBOCS scale icon → `public/images/landing/`
10. `screenshot-dashboard.png` — app dashboard screenshot → `public/images/landing/`
11. `renata-photo.jpg` — testimonial profile photo (optional) → `public/images/landing/`
12. `og-image.png` — Open Graph social sharing image (optional) → `public/images/landing/`

### Implementation tasks remaining

13. Integrate `logo.svg` into navbar and footer (replace text "Melya" with SVG)
14. Integrate scale icons into scale badges component
15. Wire up Resend for waitlist email collection (`app/api/waitlist/route.ts`)
16. Add real social links (LinkedIn, Instagram URLs)
17. Add real footer links (Sécurité, Politique de confidentialité, Mentions légales)
18. Final responsive QA pass (mobile, tablet, desktop)
19. Performance: optimize images, verify lazy loading
