
# Website UI/UX Design Specification

This document provides a comprehensive overview of the design structure, elements, and principles used throughout the LOG_ON website. It covers everything from the global design system to a section-by-section breakdown of the landing page.

## 1. Global Design System

The website's design is built on a consistent and modern system to ensure a cohesive user experience.

### 1.1. Technology Stack

*   **Framework**: Next.js (App Router)
*   **Styling**: Tailwind CSS
*   **Component Library**: ShadCN UI
*   **Icons**: Lucide React

### 1.2. Color Palette

Colors are defined using HSL variables in `src/app/globals.css` to support light and dark modes easily.

| Token | Light Mode Value | Dark Mode Value | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `hsl(163 100% 21%)` | `hsl(163 63% 62%)` | Main branding, CTAs, links, key icons. |
| **Secondary** | `hsl(158 14% 34%)` | `hsl(160 18% 25%)` | Card backgrounds, secondary elements. |
| **Accent** | `hsl(331 100% 37%)` | `hsl(341 100% 85%)` | Highlights, special notifications, decorative elements. |
| **Background**| `hsl(60 43% 98%)`  | `hsl(75 8% 9.4%)`   | Main page background. |
| **Foreground**| `hsl(75 8% 9.4%)`  | `hsl(60 8% 90%)`    | Default text color. |
| **Muted**     | `hsl(153 38% 86%)` | `hsl(160 18% 25%)`  | De-emphasized text, subtle backgrounds. |
| **Border**    | `hsl(195 12% 78%)` | `hsl(195 12% 24%)`  | Component borders, separators. |

### 1.3. Typography

The typographic scale is designed for clarity, hierarchy, and readability.

*   **Headline Font**: `Abhaya Libre` (imported in `src/app/layout.tsx`)
    *   **Usage**: Used for all major H1 and H2 headings with the `font-headline` class. It provides a strong, distinctive look for grabbing user attention.
*   **Body Font**: `Nunito` (imported in `src/app/layout.tsx`)
    *   **Usage**: Used for all body text, paragraphs, labels, and navigation items with the `font-body` class. It's chosen for its excellent readability at various sizes.

**Rules & Sizing:**
*   **Headlines**: `text-[clamp(2.5rem,8vw,5rem)]` for H1, `text-2xl` to `text-4xl` for H2/H3. Always `font-bold`.
*   **Body Copy**: `text-base` or `text-lg` with `leading-relaxed` for comfortable reading.
*   **Muted Text**: Uses the `text-muted-foreground` class for a less prominent appearance.

### 1.4. Layout & Spacing

*   **Grid System**: The layout is built using Tailwind's responsive Flexbox and Grid utilities (e.g., `grid lg:grid-cols-2 gap-16`).
*   **Container**: A centered container with a max-width of `1400px` (`container` class) is used to ensure content is well-aligned on large screens. Standard padding is applied with `px-4 md:px-6`.
*   **Spacing**: A consistent 8-point scale (multiples of 4px) is used for margins, padding, and gaps via Tailwind's spacing utilities (e.g., `p-4`, `m-8`, `gap-16`) to maintain a consistent visual rhythm.

---

## 2. Header Component (`src/components/header.tsx`)

The header is a responsive and interactive global component that provides site navigation.

*   **Layout**: A sticky header (`sticky top-0 z-50`) that adapts its styling based on the user's scroll position.
*   **Dynamic Styling**:
    *   **Initial State**: The header is larger (`py-4`) and sits within a `max-w-4xl` container, blending with the page content.
    *   **Scrolled State**: When the user scrolls down (`isScrolled` state is true), the header shrinks (`py-2`), adopts a semi-transparent background with a backdrop blur (`bg-background/80 backdrop-blur-lg`), gains a subtle shadow (`shadow-lg`), and expands to a `max-w-6xl` container to feel more like a persistent UI element.
*   **Desktop Navigation**:
    *   **Structure**: A three-part flex layout: Logo on the left, navigation in the center, and a "Contact Us" button with a `ThemeToggle` on the right.
    *   **Solutions Dropdown**: A complex, multi-column dropdown menu for the "Solutions" link, activated on hover (`group-hover`). It contains lists of services and use cases, each with an icon and a brief description.
    *   **Active Link Indicator**: The current page's link is highlighted with a `text-primary` color and a subtle underline element, providing clear visual feedback.
*   **Mobile Navigation**:
    *   **Structure**: Uses a `Sheet` component that slides in from the right, triggered by a `Menu` icon.
    *   **Content**: The `Sheet` contains the logo, a close button, and an `Accordion` to organize navigation links into "Solutions" and "Company" sections. This is an effective pattern for handling nested navigation on mobile.
    *   **Actions**: A "Contact Us" button and the `ThemeToggle` are placed at the bottom of the sheet for easy access.

---

## 3. Landing Page Breakdown (`src/app/page.tsx`)

The landing page is composed of several distinct, reusable components, each serving a specific purpose.

### 3.1. Hero Section (`src/components/hero.tsx`)

*   **Layout**: A full-viewport-height section (`min-h-[90vh]`) using Flexbox (`flex items-center`) to vertically center content. Content is in a `container` with a `max-w-4xl`.
*   **Background**: Features a subtle `CircuitBackground` component and decorative, blurred gradient blobs for visual depth. This is achieved with absolute positioning and a high `blur-3xl` filter.
*   **Typography**:
    *   **Pre-headline**: "Your Partner in Growth" uses `text-sm uppercase tracking-widest text-primary`.
    *   **Main Headline**: Uses a clamped font size (`text-[clamp(2.5rem,8vw,5rem)]`) for fluid responsiveness, with `font-bold` and `font-headline`. The "tech solution" text is highlighted with `text-primary`.
    *   **Description**: `text-md md:text-xl` with `text-muted-foreground`.
*   **Elements**:
    *   **Buttons**: Two primary CTAs (`Button` component): "Get Your Free AI Assessment" (default variant) and "Explore Our Services" (secondary variant). The first button triggers a `Dialog` modal.
    *   **Dialog**: The modal (`<Dialog />`) contains the `SolutionRecommendationForm` component for lead capture.

### 3.2. Strategic Partner Section (`src/components/strategic-partner.tsx`)

*   **Layout**: A two-column layout on large screens (`grid lg:grid-cols-2 gap-16`). The background is a muted color (`bg-secondary/20`) to visually separate it from the hero.
*   **Left Column (Text Content)**:
    *   **Structure**: A vertical flow of content (`space-y-6`).
    *   **Typography**: H2 headline (`text-2xl md:text-4xl font-bold`) and paragraph text (`text-muted-foreground md:text-lg`).
    *   **Numbered List**: A custom list using Flexbox to align numbers and text content, creating a clear step-by-step process.
*   **Right Column (Interactive Cards)**:
    *   **Structure**: A vertical stack of `Card` components (`space-y-8`).
    *   **Elements**: Each `Card` is interactive, triggering a `Dialog`. They contain an icon (`BrainCircuit`, `Calculator`), a `CardTitle`, a `CardDescription`, and a call-to-action link with an animated `ArrowRight` icon.
    *   **Styling**: Cards have a hover effect (`hover:-translate-y-2`) for interactivity.

### 3.3. Generalist Approach Section (`src/components/generalist-approach.tsx`)

*   **Layout**: Similar to the previous section, it uses a responsive two-column grid (`grid lg:grid-cols-2 gap-16`). The background is also `bg-secondary/20`.
*   **Left Column (Text Content)**:
    *   **Headline**: Features a large, impactful headline with `font-headline` and a clamped font size. A portion of the text is highlighted with `text-primary`.
*   **Right Column (Feature Cards)**:
    *   **Structure**: A two-column grid of `Card` components (`grid grid-cols-1 sm:grid-cols-2 gap-8`).
    *   **Elements**: Each card contains a `CardTitle` and a list of features, with each feature prefixed by a `CheckCircle` icon for visual confirmation.
    *   **Styling**: Cards have a semi-transparent background (`bg-background/80`) and a `backdrop-blur-sm` effect, along with a `hover:scale-105` transition.

### 3.4. Partnership Approach Section (`src/components/partnership-approach.tsx`)

*   **Layout**: Another two-column grid layout (`grid lg:grid-cols-2 gap-12`).
*   **Left Column (Text Content)**:
    *   **Partner Logos**: A section displaying trusted partner logos (`Google Cloud`, `AWS`, etc.) using `next/image` for optimization. Each logo is paired with its name.
    *   **CTA**: A prominent `Button` to "Start a Project".
*   **Right Column (Carousel)**:
    *   **Element**: Features the `CaseStudiesCarousel` component, which displays client success stories in an interactive, auto-scrolling carousel.
    *   **Styling**: The carousel uses custom navigation arrows and is built with `embla-carousel-react`.

### 3.5. Training CTA Section (`src/components/training-cta.tsx`)

*   **Layout**: A three-column grid (`grid lg:grid-cols-3`) on a darker background (`bg-secondary/20`) with content inside a rounded container.
*   **Left Column**: Contains a title with a `GraduationCap` icon, descriptive text, and a primary `Button` to explore training programs.
*   **Right Columns**: A two-column grid (`lg:col-span-2 grid md:grid-cols-2`) displaying two featured course `Card`s. Each card has an icon, title, description, and a "Learn More" button.

### 3.6. Statement Section (`src/components/statement.tsx`)

*   **Layout**: A full-width, centered text section (`text-center max-w-4xl`).
*   **Background**: Utilizes the `CircuitBackground` component for a tech-themed visual texture.
*   **Typography**: A single, powerful H2 headline with a clamped font size and uppercase text (`text-[clamp(1.8rem,5vw,3rem)] font-bold uppercase`). Key words like "small," "versatile," and "results" are highlighted with primary and accent colors.
*   **CTA**: A single, centered `Button` encourages users to "Start a Conversation".

### 3.7. Featured Insights Section (`src/components/featured-insights.tsx`)

*   **Layout**: A three-column grid (`grid lg:grid-cols-3 gap-8`) for displaying article cards.
*   **Elements**: Each `Card` represents a blog post and includes:
    *   An optimized `Image` from the article.
    *   `Badge`s for tags.
    *   A `CardTitle` and `CardDescription` (using `line-clamp-3` for clean truncation).
    *   A "Read More" link with an animated `ArrowRight` icon.
*   **CTA**: A centered `Button` below the grid links to the main insights page.

### 3.8. FAQ Section (`src/components/faq.tsx`)

*   **Layout**: A centered section (`max-w-3xl mx-auto`) on a `bg-secondary/20` background.
*   **Element**: Uses the `Accordion` component (`src/components/ui/accordion.tsx`) to create a clean, interactive FAQ list. Each `AccordionItem` has a question as the trigger and an answer in the content.
*   **Icons**: Each question is prefixed with a relevant `lucide-react` icon.

### 3.9. Chatbot Embed Section (`src/components/chatbot-embed.tsx`)

*   **Layout**: A centered section (`max-w-4xl mx-auto`).
*   **Element**: The core of this section is an `iframe` that embeds a Botpress chatbot. The `iframe` is housed within a `Card` component to give it a native look and feel.
*   **Card Structure**: The `CardHeader` includes a title and a `ShareModal`, while the `CardFooter` provides a link to the A/B Testing page.

### 3.10. Tech Stack Carousel Section (`src/components/tech-stack-carousel.tsx`)

*   **Layout**: A full-width section with a horizontally scrolling, infinite marquee effect.
*   **Animation**: The infinite scroll is achieved with custom CSS animation (`animate-infinite-scroll` defined in `tailwind.config.ts`).
*   **Masking**: A `mask-image` with a linear gradient is used to fade the logos in and out at the edges, creating a seamless loop.
*   **Elements**: The carousel contains a series of `Image` components, each displaying a technology logo.

This detailed structure ensures a consistent, professional, and user-friendly experience across the entire landing page.
