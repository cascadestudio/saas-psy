# Mobile responsiveness audit

Audit of `apps/web` for mobile-format issues. Implementer should fix issues by adding Tailwind responsive prefixes (`sm:`, `md:`, etc.) — no layout restructuring required.

**Out of scope (already done):** the (app) layout sidebar/bottom-tab nav in `apps/web/app/(app)/layout.tsx`.

**Priority order:** fix Critical first, then High. Patient-facing routes (`/passation`, `/session`, `/p`) are more sensitive to mobile bugs since patients open them on phones.

---

## Critical

### 1. Settings form — name fields don't stack
- **File:** `apps/web/app/(app)/settings/page.tsx:104`
- **Issue:** `grid-cols-2` for First name + Last name has no responsive variant. Inputs become too narrow on phones.
- **Fix:** `grid grid-cols-1 sm:grid-cols-2 gap-4`

### 2. Liebowitz scale preview — dual-scale grid doesn't stack
- **File:** `apps/web/app/(app)/echelles/[id]/ScalePreview.tsx:134`
- **Issue:** `grid grid-cols-2 gap-4` for anxiety/avoidance options. Options overflow / unselectable on phones.
- **Fix:** `grid grid-cols-1 sm:grid-cols-2 gap-4`

---

## High

### 3. Echelle detail — sticky header conflicts with mobile bottom tab bar
- **File:** `apps/web/app/(app)/echelles/[id]/page.tsx:25`
- **Issue:** `sticky top-0 z-10` does not account for the mobile header (h-14) above it.
- **Fix:** `sticky top-14 md:top-0` (or hide stickiness on mobile entirely).

### 4. Passation results — ScoreArcGauge hardcoded to 300px
- **File:** `apps/web/components/passation/ScoreArcGauge.tsx:14-15`
- **Issue:** SVG `SIZE = 300` overflows / dominates viewport on phones < 390px.
- **Fix:** Make `SIZE` responsive (prop or media-query-based). Suggested: 200 below `sm`, 300 at/above `sm`. If keeping a single SVG size, wrap in `max-w-[200px] sm:max-w-[300px] mx-auto` and let it scale via `width="100%" height="auto"`.

### 5. Settings form — cramped + tap targets
- **File:** `apps/web/app/(app)/settings/page.tsx:104-134`
- **Issue:** Container `max-w-2xl` + default Input padding leaves inputs near the 40px minimum tap height on small phones.
- **Fix:** Ensure `Input` resolves to `min-h-[44px]`; verify wrapper uses `max-w-full sm:max-w-2xl` and consistent `px-4` on the page.

---

## Medium

### 6. ScaleCard — fixed 120px height
- **File:** `apps/web/components/ScaleCard.tsx:22`
- **Issue:** Inline `style={{ height: 120 }}`; can truncate text on narrow viewports.
- **Fix:** Replace with `min-h-[100px] sm:min-h-[120px]` Tailwind class; remove inline style.

### 7. Passation results — subscores grid cramped on tablet
- **File:** `apps/web/app/(app)/passation/[sessionId]/page.tsx:346`
- **Issue:** `grid-cols-1 sm:grid-cols-2` next to a 300px gauge feels tight on iPad.
- **Fix:** `grid grid-cols-1 md:grid-cols-2 gap-x-3 sm:gap-x-6` (defer to 2-col only at md).

### 8. Patient portal batch — session card icon block too tall on small phones
- **File:** `apps/web/app/p/[batchId]/page.tsx:170-230`
- **Issue:** Icon block `h-20 w-full sm:h-auto sm:w-24` is 80px tall on mobile, oversized.
- **Fix:** `h-16 sm:h-auto sm:w-20`.

### 9. SessionRunner — max-w-xl too wide on 320px screens
- **File:** `apps/web/app/session/[sessionId]/components/SessionRunner.tsx:193`
- **Issue:** `max-w-xl` (576px) + `px-5` leaves ~240px content; question text wraps awkwardly on 320px.
- **Fix:** Tighter mobile padding (`px-4 sm:px-5`) and reduce question heading: `text-xl sm:text-2xl lg:text-3xl`.

### 10. Passation header — scale logo hardcoded 72×72
- **File:** `apps/web/app/(app)/passation/[sessionId]/page.tsx:145-164`
- **Issue:** Inline `width:72,height:72` feels heavy on small phones.
- **Fix:** Wrap in responsive box: `w-14 h-14 sm:w-[72px] sm:h-[72px]`.

---

## Low

### 11. Landing hero — toast positions clip on narrow phones
- **File:** `apps/web/components/landing/hero.tsx:70-96`
- **Issue:** Absolute `right-2` / `left-14 bottom-20` may overlap content on < 320px.
- **Fix:** `left-2 sm:left-14`, `bottom-16 sm:bottom-20`.

### 12. Settings — delete-account dialog
- **File:** `apps/web/app/(app)/settings/page.tsx:173-199`
- **Issue:** No explicit mobile width on `DialogContent`.
- **Fix:** Verify `DialogContent` defaults include `w-[calc(100vw-2rem)] sm:max-w-lg`; add if missing.

### 13. Review screen — textarea oversized on mobile
- **File:** `apps/web/app/session/[sessionId]/components/ReviewScreen.tsx:47`
- **Issue:** `min-h-[120px]` feels like dead space on phones.
- **Fix:** `min-h-[100px] sm:min-h-[120px]`.

### 14. Echelle preview dialog — width not mobile-optimized
- **File:** `apps/web/app/(app)/echelles/[id]/ScalePreview.tsx:49`
- **Issue:** Only `sm:max-w-[700px]`; on 375px phones the question list scroll feels awkward.
- **Fix:** `w-[calc(100vw-2rem)] sm:max-w-[700px]` and ensure inner list is scrollable with `max-h-[80vh] overflow-y-auto`.

---

## Already mobile-friendly (no action)

The patient passation flow (`apps/web/app/session/[sessionId]/`) is mostly correct:
- SessionRunner uses responsive padding and `max-w-xl`.
- SingleScaleQuestion buttons are `min-h-[64px]` (well above tap minimum).
- Progress bar is full-width.
- IntroScreen scales icons/text correctly.

Only refinements are listed above (#9, #13).

---

## Implementation notes for the implementer

- Use Tailwind responsive prefixes — do not introduce JS-based viewport detection unless explicitly noted (#4 may need it for SVG sizing).
- Mobile-first: defaults target the smallest screen, `sm:`/`md:` add desktop layout.
- After each fix, verify in browser devtools at: 320px (small phone), 375px (iPhone SE), 768px (tablet), 1024px+ (desktop).
- The mobile bottom tab bar in `(app)/layout.tsx` is `h-16` and the mobile header is `h-14`. Account for these when fixing sticky/fixed elements.
- Tap targets must be at least 44×44px (Apple HIG) — verify any newly-touched buttons/links.
