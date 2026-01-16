
# Duplicate File Analysis & Codence

This document outlines the plan for resolving duplicate files found during the audit. No files will be deleted until this plan is reviewed and approved.

## 1. `desktop-nav.tsx`

*   **Path A:** `src/components/desktop-nav.tsx`
*   **Path B:** `src/components/header/desktop-nav.tsx`
*   **Suggested Canonical Location:** `src/components/header/desktop-nav.tsx`
*   **Reasoning:** The file at Path B contains the modern, refactored navigation logic, including the mega menu structure. The file at Path A is an outdated version. The `src/components/header.tsx` component correctly imports from Path B.
*   **Migration Plan:** Delete the file at `src/components/desktop-nav.tsx`. No import changes are necessary as the correct component is already in use.
*   **Status:** **Completed.**

## 2. `mobile-nav.tsx`

*   **Path A:** `src/components/mobile-nav.tsx`
*   **Path B:** `src/components/header/mobile-nav.tsx`
*   **Suggested Canonical Location:** `src/components/header/mobile-nav.tsx`
*   **Reasoning:** The file at Path B contains the updated mobile navigation logic that uses the `Sheet` and `Accordion` components. Path A contains an older, different implementation. The `src/components/header.tsx` component correctly imports from Path B.
*   **Migration Plan:** Delete the file at `src/components/mobile-nav.tsx`. No import changes are necessary.
*   **Status:** **Completed.**

## 3. `category-icons.tsx`

*   **File:** `src/components/ui/category-icons.tsx`
*   **Conflict:** This file defines custom icon components (e.g., `IconBriefcase`) that are simple wrappers around icons already available in the `lucide-react` library. This creates unnecessary code and potential for inconsistency.
*   **Suggested Canonical Source:** `lucide-react` library.
*   **Reasoning:** The project standard is to use `lucide-react` for icons. Re-exporting them from a custom file adds an unnecessary layer of abstraction and duplicates code. Only truly custom SVG icons should reside in this file.
*   **Migration Plan:**
    1.  Update `src/lib/category-styles.ts` to import icons like `Briefcase`, `HeartPulse`, `Cog`, etc., directly from `lucide-react`.
    2.  Remove the redundant icon definitions from `src/components/ui/category-icons.tsx`, leaving only the truly custom SVG icons.
*   **Status:** **Completed.**
