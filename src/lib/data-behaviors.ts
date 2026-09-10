/**
 * Data-Attribute Behavior System
 * 
 * This module implements scroll reveal, counter animations, and other
 * behaviors using data attributes as selectors.
 */

// Check if user prefers reduced motion
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Scroll Reveal Animation
 * Triggers fade-in animations when elements enter viewport
 * Usage: <div data-reveal>Content</div>
 */
export function initScrollReveal() {
  if (prefersReducedMotion()) return;

  const revealElements = document.querySelectorAll('[data-reveal]');
  
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const delay = element.dataset.delay || '0';
          
          // Apply delay if specified
          setTimeout(() => {
            element.classList.add('revealed');
          }, parseInt(delay));
          
          // Stop observing once revealed
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Counter Animation
 * Animates numbers from 0 to target value
 * Usage: <span data-count="1000">1000</span>
 */
export function initCounters() {
  if (prefersReducedMotion()) return;

  const counterElements = document.querySelectorAll('[data-count]');
  
  if (counterElements.length === 0) return;

  const animateCounter = (element: HTMLElement, target: number) => {
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const targetValue = parseInt(element.dataset.count || '0');
          const delay = parseInt(element.dataset.delay || '0');

          setTimeout(() => {
            animateCounter(element, targetValue);
          }, delay);

          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  counterElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Footer folding is owned by `src/components/footer.tsx` (React + data-expanded).
 * A second click handler here double-toggled sections so the accordion looked broken.
 */

/**
 * Initialize all data-attribute behaviors
 * Call this once when the page loads
 */
export function initDataBehaviors() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      initCounters();
    });
  } else {
    initScrollReveal();
    initCounters();
  }
}
