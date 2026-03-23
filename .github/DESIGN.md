# Design System Specification: Editorial Utility

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Architectural Concierge."**

Moving away from the cluttered, "utility-first" look of typical service apps, this system treats the mobile screen as a high-end editorial layout. It balances the rugged efficiency required by local workers with the sophisticated minimalism expected by premium hosts. We achieve this by breaking the "template" look through **Intentional Asymmetry**—where content is weighted to one side to create dynamic eye-flow—and **Tonal Depth**, replacing rigid borders with a sophisticated layering of charcoal and teal.

The result is a UI that feels "built" rather than "drawn," conveying an immediate sense of professional authority and quiet efficiency.

---

## 2. Colors & Surface Philosophy
The palette is rooted in high-contrast prestige. We use `Deep Charcoal` to ground the experience and `Vibrant Teal` to signal intent.

### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to section content.
Structural boundaries must be defined exclusively through background shifts. For example, a `surface-container-low` card sits atop a `surface` background. To separate items in a list, use the Spacing Scale (Token `4` or `5`) to create rhythmic "white space" rather than a grey line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers.
- **Base Level:** `surface` (#fcf9f8) for the main background.
- **Mid Level:** `surface-container-low` (#f6f3f2) for secondary content blocks.
- **Top Level:** `surface-container-highest` (#e5e2e1) for the most critical interactive cards.

### The "Glass & Gradient" Rule
To elevate the "Vibrant Teal" (`primary`), do not use it as a flat block. Apply a subtle linear gradient from `primary` (#006565) to `primary_container` (#008080) at a 135-degree angle. For floating action elements, use a "Frosted Glass" effect: `surface` color at 80% opacity with a 16px backdrop-blur.

---

## 3. Typography
We utilize a pairing of **Manrope** (Display/Headlines) and **Inter** (Body/UI) to balance editorial character with functional legibility.

* **Display & Headline (Manrope):** These are your "Architectural" anchors. Use `display-md` for welcome screens and `headline-sm` for section headers. The wider aperture of Manrope conveys openness and trust.
* **Body & Labels (Inter):** All functional text must adhere to the **16px Minimum Rule**.
* `body-lg` (1rem/16px) is our baseline for all descriptions.
* `title-lg` (1.375rem) is used for list item titles to ensure high-speed scanning for workers on the move.
* **The Power of Scale:** Use extreme contrast between `headline-lg` and `body-lg` to create a clear information hierarchy without needing bold colors.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Stacking**. To make a task card "pop," do not reach for a shadow first. Instead, place a `surface-container-lowest` (#ffffff) card on a `surface-dim` (#dcd9d9) section. This creates a "soft lift" that feels natural and premium.

### Ambient Shadows
When an element must float (e.g., a "Start Job" button), use an **Ambient Shadow**:
- **Color:** `on-surface` (#1c1b1b) at 6% opacity.
- **Blur:** 24px to 32px.
- **Spread:** -4px.
This mimics natural light hitting a matte surface, avoiding the "cheap" look of high-contrast drop shadows.

### The "Ghost Border" Fallback
If a border is required for accessibility (e.g., an empty state or input field), use a **Ghost Border**: `outline-variant` at 15% opacity. Never use 100% opaque lines.

---

## 5. Components

### Buttons (The Interaction Pillars)
- **Primary:** Gradient fill (`primary` to `primary_container`), `xl` roundedness (1.5rem), and `title-md` typography. Minimum height: 56px (Token `12`) to ensure large touch targets.
- **Secondary:** `surface-container-high` fill with `primary` text. No border.
- **Tertiary:** Text-only in `primary`, using `title-sm` with 2.75rem (`8`) horizontal padding for a wide, premium feel.

### Input Fields & Search
- **Container:** `surface-container-low` fill.
- **Shape:** `md` roundedness (0.75rem).
- **Active State:** Change background to `surface-container-highest` and add a 2px `primary` "pill" indicator on the left edge—avoiding a full-box stroke.

### Specialized Task Cards
- **Construction:** Use `spacing-4` padding. Use `surface-container-lowest` as the card base.
- **Icons:** Use Lucide-style icons (24px) in `primary`. Pair them with `label-md` text for metadata (e.g., "30 mins", "Map View").
- **Constraint:** No dividers. Use a 1.2rem (`3.5`) vertical gap between task cards to define separation.

### Navigation (The Floating Dock)
The bottom navigation should not be a full-width bar. Use a "Floating Dock" style: a `surface` container with `full` roundedness, 8% `on-surface` ambient shadow, and 16px backdrop blur. This keeps the UI feeling light and modern.

---

## 6. Do's and Don'ts

### Do
- **DO** use the `20` and `24` spacing tokens for top-of-page margins to create an editorial "Luxury of Space."
- **DO** use asymmetry; align headlines to the left while keeping action buttons centered or right-aligned to create visual tension.
- **DO** ensure all touch targets are at least 48x48dp, even if the visual element (like a small icon) is smaller.

### Don'ts
- **DON'T** use any text smaller than 16px (`1rem`). If information is secondary, reduce its opacity (to `on-surface-variant`) rather than its size.
- **DON'T** use pure black (#000000). Always use `Deep Charcoal` (#1A1A1A) or the `on-surface` token for a softer, more sophisticated high-contrast look.
- **DON'T** use standard "Material Design" shadows. Stick to the Tonal Layering or Ambient Shadow specs defined above.