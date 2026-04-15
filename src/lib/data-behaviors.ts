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
 * Mobile Footer Folding
 * Makes footer sections collapsible on mobile
 * Usage: Applied automatically to footer sections
 */
export function initMobileFoldingFooter() {
  const footerSections = document.querySelectorAll('[data-footer-section]');
  
  if (footerSections.length === 0) return;

  // Only apply on mobile
  const isMobile = () => window.innerWidth < 768;

  footerSections.forEach((section) => {
    const header = section.querySelector('[data-footer-header]') as HTMLElement;
    const content = section.querySelector('[data-footer-content]') as HTMLElement;
    
    if (!header || !content) return;

    const toggle = () => {
      if (!isMobile()) return; // Only work on mobile

      const isExpanded = section.getAttribute('data-expanded') === 'true';
      section.setAttribute('data-expanded', (!isExpanded).toString());
      
      // Update ARIA
      header.setAttribute('aria-expanded', (!isExpanded).toString());
    };

    // Make header clickable on mobile
    header.addEventListener('click', toggle);
    header.style.cursor = 'pointer';
    
    // Set initial state
    if (isMobile()) {
      section.setAttribute('data-expanded', 'false');
      header.setAttribute('aria-expanded', 'false');
    }
  });

  // Handle resize
  let resizeTimer: NodeJS.Timeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const mobile = isMobile();
      footerSections.forEach((section) => {
        if (!mobile) {
          section.setAttribute('data-expanded', 'true');
          const header = section.querySelector('[data-footer-header]') as HTMLElement;
          if (header) header.setAttribute('aria-expanded', 'true');
        }
      });
    }, 250);
  });
}

/**
 * Initialize all data-attribute behaviors
 * Call this once when the page loads
 */
export function initDataBehaviors() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      initCounters();
      initMobileFoldingFooter();
    });
  } else {
    initScrollReveal();
    initCounters();
    initMobileFoldingFooter();
  }
}
