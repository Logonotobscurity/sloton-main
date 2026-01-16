# Code Refactoring & Improvement Plan

This document outlines a proposed plan for refactoring key areas of the codebase. The primary goals are to improve code structure, enhance readability, and increase long-term maintainability. All proposed changes are incremental, low-risk, and will not alter the existing user interface or functionality.

---

## 1. High-Priority: Extract Reusable Components

### 1.1. `InteractiveCard` Component

*   **File:** `src/components/page-sections/strategic-partner.tsx`
*   **Current State:** The `InteractiveCard` component is currently defined and used exclusively within the `strategic-partner.tsx` file. While co-location can be convenient, this component's structure is generic enough for wider use.
*   **Issue:** This tight coupling prevents its reuse in other sections (e.g., `smarter-automation.tsx`) and makes the `strategic-partner.tsx` file unnecessarily large. It mixes the responsibility of layout with the definition of a child component.
*   **Proposed Refactoring:**
    1.  Create a new file: `src/components/page-sections/strategic-partner/interactive-card.tsx`.
    2.  Move the `InteractiveCard` component definition into this new file.
    3.  Export `InteractiveCard` from the new file.
    4.  Update `strategic-partner.tsx` and `smarter-automation.tsx` to import and use this new, reusable component.
*   **Benefits:**
    *   **Reusability:** The component can be used across different sections of the site.
    *   **Separation of Concerns:** The `strategic-partner.tsx` file becomes purely a layout component, improving readability.
    *   **Maintainability:** Changes to the card's style or logic can be made in one central place.
*   **Risk:** Low. This is a straightforward extraction. We will verify that the card renders identically in its original location after the change.

## 2. Medium-Priority: Consolidate UI Primitives

### 2.1. `ArrowIcon` Component

*   **File:** `src/components/ui/arrow-icon.tsx`
*   **Current State:** This file exists as a simple wrapper around the `ArrowRight` icon from `lucide-react`.
*   **Issue:** While creating custom UI primitives can be useful, this specific case adds an unnecessary layer of abstraction for a single icon. It increases the file count and can lead to confusion about where icons should come from (`lucide-react` vs. `ui/arrow-icon.tsx`). This pattern is similar to the `category-icons.tsx` issue that was previously resolved.
*   **Proposed Refactoring:**
    1.  Replace all usages of `<ArrowIcon />` with the `ArrowRight` icon directly imported from `lucide-react`.
    2.  Apply the necessary `className` attributes directly at the usage site.
    3.  Delete the `src/components/ui/arrow-icon.tsx` file.
*   **Benefits:**
    *   **Consistency:** Standardizes icon usage by sourcing directly from `lucide-react`.
    *   **Reduced Complexity:** Removes an unnecessary file and simplifies the component tree.
*   **Risk:** Low. This is a simple find-and-replace operation. We will ensure all icons render correctly after the change.

## 3. Low-Priority: Standardize Data Structures

### 3.1. Placeholder Image Management

*   **Files:** `src/lib/placeholder-images.json` and various components using it.
*   **Current State:** Placeholder image data is correctly centralized in a JSON file. However, some components import `imageData` directly, while others receive image data as props.
*   **Issue:** The access pattern for placeholder images is inconsistent. A more robust approach would be to create helper functions to retrieve specific image data, ensuring that components are not tightly coupled to the structure of the JSON file.
*   **Proposed Refactoring (Future Consideration):**
    1.  Create a new file `src/lib/image-helpers.ts`.
    2.  Implement functions like `getImageByName(name: string)` that retrieve the corresponding image object from `placeholder-images.json`.
    3.  Update components to use these helper functions instead of importing the entire JSON object.
*   **Benefits:**
    *   **Decoupling:** Components no longer need to know the exact structure of the JSON file.
    *   **Type Safety:** Helper functions can provide better type-checking and error handling if an image is not found.
*   **Risk:** Low. This is a non-urgent improvement that can be implemented gradually to improve data access patterns.

---

## Implementation Plan & Next Steps

1.  **Feedback & Approval:** This plan will be circulated for team review.
2.  **Phase 1 (High-Priority):** Implement the `InteractiveCard` extraction.
3.  **Phase 2 (Medium-Priority):** Implement the `ArrowIcon` consolidation.
4.  **Testing:** After each phase, conduct a visual regression check to ensure the UI remains unchanged and all functionality is intact. The existing Playwright tests for the header should pass without modification.
5.  **Future Work:** The `Placeholder Image Management` refactoring will be added to the technical backlog for future consideration.

This incremental approach ensures that improvements are made in a controlled, low-risk manner, strengthening the codebase for future development.