// ============================================================
// THE MAIN EVENT — scripts.js
// Vanilla JS · IntersectionObserver scroll reveals
// Motion level: subtle
// ============================================================

(function () {
  'use strict';

  // ── SCROLL REVEAL ──────────────────────────────────────────
  // Fade-in + slide-up 20px for all .reveal-on-scroll elements
  // when they enter the viewport.

  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (!revealElements.length) return;

  const observerOptions = {
    root: null,           // viewport
    rootMargin: '0px 0px -60px 0px', // trigger 60px before bottom edge
    threshold: 0.12       // 12% of element must be visible
  };

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Add stagger delay based on sibling index within parent
        const siblings = Array.from(entry.target.parentNode.children);
        const index = siblings.indexOf(entry.target);
        const delay = index * 80; // 80ms between siblings

        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('is-visible');

        // Stop observing once revealed — animation runs once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ── STICKY NAV SHADOW ON SCROLL ───────────────────────────
  // Adds a subtle shadow to the fixed header once the user scrolls.

  const siteHeader = document.querySelector('.site-header');

  if (siteHeader) {
    let ticking = false;

    function updateHeader () {
      if (window.scrollY > 20) {
        siteHeader.style.boxShadow = '0 2px 16px rgba(28, 25, 23, 0.08)';
      } else {
        siteHeader.style.boxShadow = 'none';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  // ── ACTIVE NAV HIGHLIGHT ───────────────────────────────────
  // Marks the nav link whose section is currently in view.

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('nav-active');
            }
          });
        }
      });
    }, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

})();