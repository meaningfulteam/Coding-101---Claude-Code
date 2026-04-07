/* ============================================================
   INDEX.JS — Portfolio interactions
   ============================================================ */

/* ------------------------------------------------------------
   1. MOBILE MENU TOGGLE
   Opens and closes the nav links when the hamburger is tapped.
   ------------------------------------------------------------ */
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');

  // Swap icon between bars and X
  const icon = navToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

// Close the menu when a link is clicked (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');

    const icon = navToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  });
});

/* ------------------------------------------------------------
   2. SCROLL-TRIGGERED FADE-IN ANIMATIONS
   Uses IntersectionObserver to add a "visible" class when
   elements scroll into view.
   ------------------------------------------------------------ */

// Select all elements that should animate in
const faders = document.querySelectorAll('.fade-in');

const observerOptions = {
  threshold: 0.15,  // Trigger when 15% of the element is visible
};

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

// Automatically add .fade-in to every section and timeline/card element
document.querySelectorAll(
  '.section, .timeline-item, .education-card, .about-grid, .skills-grid'
).forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

/* ------------------------------------------------------------
   3. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   Highlights the nav link whose section is currently in view.
   ------------------------------------------------------------ */
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.nav-links a');

const highlightObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all links
      navItems.forEach(link => link.classList.remove('active'));

      // Add active class to the matching link
      const activeLink = document.querySelector(
        `.nav-links a[href="#${entry.target.id}"]`
      );
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}, {
  rootMargin: '-40% 0px -60% 0px', // Fires when section is near center
});

sections.forEach(section => {
  highlightObserver.observe(section);
});
