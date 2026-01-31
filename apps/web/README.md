This is the complete technical design document optimized based on the final implementation status.

---

# Project Design Document: HVAC Smart Transcript Reviewer

## 1. Executive Summary

This project aims to build a Next.js-based static web page used to display sales/service transcript records between HVAC technicians and homeowners.
The core interaction goal is to simulate an **advanced review experience similar to Microsoft Word / Google Docs**, combined with modern UI design:

*   **Top-Level Overview**: A unified "Summary & Compliance" section that intuitively displays call type, scores, and key compliance items.
*   **Left Column Flow**: Displays the conversation as a "Linear Script Flow", using intuitive **icon avatars** to distinguish roles.
*   **Right Column Flow**: Displays business insight Annotations, with positions precisely aligned to the conversation context.
*   **Visual Connection**: Uses **Connection Bars** to visually link conversation lines with right-side annotations, enhancing context association.

---

## 2. Technical Architecture

*   **Framework**: Next.js 14+ (App Router)
*   **Rendering**: SSG (Static Site Generation) - Page content is injected from JSON at build time.
*   **Styling**: Tailwind CSS (for atomic styling and responsive layout).
*   **Language**: TypeScript (Strict type safety).
*   **Icons**: **Lucide React** (for avatars, rating stars, status icons).
*   **State Management**: React Context / Local State (for handling hover highlight linkage and DOM measurement).

---

## 3. Visual & Layout Specifications

### 3.1 The Canvas Layout

The page uses a **Vertical Stack + Column** structure:

1.  **Unified Hero Section (Top Overview Area)**:
    *   **Summary Section**: Displays Call Type and Summary text on the left, and Overall Score on the right.
    *   **Compliance Section**: Seamlessly follows immediately below the summary. Displays check results (Pass/Missing) and scores for key compliance steps.
    *   *Design Feature*: Both modules are wrapped in a unified white rounded card container, separated only by a thin divider, creating a holistic feel.

2.  **Main Content Area**:
    *   **Desktop (>768px)**: 12-grid layout.
        *   **Transcript Column (8/12)**: Left side, displays the conversation flow.
        *   **Annotations Column (4/12)**: Right side, displays floating annotation cards.
    *   **Mobile (<768px)**: Single column flow layout. Annotations are displayed in a stacked or inline manner.

### 3.2 Top Overview Details (Summary & Compliance)

*   **Call Type**: Displayed above the title as a small uppercase label (e.g., "CALL TYPE").
*   **Overall Score**: 
    *   Numeric display (e.g., "4.5 / 5").
    *   **Star Rating**: Uses `Star` icons.
        *   Logic: Full/Half/Empty.
        *   Color Scheme:
            *   Score >= 4: **Emerald (Green)**
            *   Score >= 2.5: **Amber (Orange)**
            *   Score < 2.5: **Red**
*   **Compliance Items**:
    *   Status Icons: `CheckCircle` (Green/Present) or `XCircle` (Red/Missing).
    *   Score Display: Reuses the Star component and color logic from Overall Score.
    *   Label: Data field has been refactored from `quality` to `score`.

### 3.3 Linear Script Style

*   **Alignment**: Left-aligned linear list.
*   **Avatars**:
    *   **Technician**: Blue background + `Wrench` icon.
    *   **Homeowner**: Amber background + `User` icon.
*   **Connection Bars**:
    *   Located at the far right of the Transcript column (Gutter area).
    *   Slim rounded vertical bars, colored according to the annotation category.
    *   **Interaction**: Highlights the corresponding annotation range when hovered.

### 3.4 Annotation Cards

*   **Shape**: Floating card, white background, rounded corners, subtle shadow.
*   **indicator**: Top border (`border-t-4`) or left border color corresponds to Category.
*   **Alignment**: Uses JS to dynamically calculate the `top` value, ensuring the card aligns visually with the corresponding starting conversation line.

---

## 4. Color System

Semantic color scheme defined based on the `category` field in JSON. These colors apply to: **Connection Bars**, **Annotation Card Decorations**, **Text Highlighting**.

| Category | Color Scheme (Tailwind) | Visual Meaning |
| --- | --- | --- |
| **Introduction** | `Blue` (blue-400) | Process, Opening |
| **Problem Diagnosis** | `Red` (red-400) | Pain points, Faults |
| **Solution Explanation** | `Indigo` (indigo-400) | Solution explanation |
| **Upsell Attempts** | `Amber` (amber-400) | Sales opportunities |
| **Maintenance Plan Offer** | `Emerald` (emerald-400) | Membership service |
| **Closing & Thank You** | `Purple` (purple-400) | Closing, Wrap-up |
| **Sales Insights** | `Pink` (pink-400) | Sales insights |

---

## 5. TypeScript Schema Definition

File Path: `src/types/schema.ts`

```typescript
// 1. Basic Transcript Unit
export interface TranscriptItem {
  id: number;
  speaker: "Technician" | "Homeowner";
  text: string;
}

// 2. Metadata
export interface MetaData {
  call_type: string;
  overall_score: number; // 1-5 float
  summary: string;
}

// 3. Compliance Checklist
export interface ComplianceItem {
  step_name: string;
  description: string;
  status: "present" | "missing" | "missing_in_transcript";
  score: number; // [UPDATED] Renamed from quality
  comment: string;
}

// 4. Annotation
export interface Annotation {
  id: number;
  start_line_id: number;
  end_line_id: number;
  category: string; // Corresponds to the color system above
  title: string;
  content: string;
}

// 5. Complete JSON Structure
export interface TranscriptData {
  transcript: TranscriptItem[];
  meta: MetaData;
  compliance_checklist: ComplianceItem[];
  annotations: Annotation[];
}
```

---

## 6. Core Interaction Logic

1.  **Alignment Algorithm**:
    *   `TranscriptReviewer.tsx` measures the height and offset of each conversation line (`measureLines`) and each card (`measureCards`) inside `useLayoutEffect`.
    *   `calculateAnnotationPositions` function calculates the absolute positioning `top` value for each card, handling collision to avoid overlap.

2.  **Connection Bars (Visual Connection)**:
    *   Rendered in the absolute positioning layer of the `Transcript` column.
    *   Height = `end_line_top + end_line_height - start_line_top`.
    *   Provides clear visual guidance connecting the left text with the right card.

3.  **Hover Link**:
    *   Hovering over connection bars or cards highlights the corresponding entity (two-way linkage).

---

## 7. Directory Structure

```
apps/web/
├── app/
│   ├── page.tsx            # Data fetching and entry point
│   └── globals.css         # Tailwind base styles
├── components/
│   ├── SummarySection.tsx  # [NEW] Top summary & scoring (formerly HeroSection)
│   ├── ComplianceSection.tsx # [NEW] Compliance checklist
│   ├── TranscriptReviewer.tsx # Core container (contains layout & alignment logic)
│   ├── MessageRow.tsx      # Single line conversation component
│   ├── AnnotationCard.tsx  # Annotation card component
│   └── icons/              # (Optional) Custom icons
├── lib/
│   └── alignment.ts        # Alignment algorithm logic
├── types/
│   └── schema.ts           # TS interface definitions
└── public/
    └── transcript.json     # Data source
```

---

## 8. Getting Started & Deployment

### Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000)

### Production Build
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm run start
   ```

### Static Export (Optional)
If you wish to deploy as a static site (HTML/CSS/JS only):
1. Update `next.config.ts` to include `output: 'export'`.
2. Run build:
   ```bash
   npm run build
   ```
3. The static assets will be generated in the `out/` directory.
