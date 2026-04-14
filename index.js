/* ============================================================
   INDEX.JS — Portfolio interactions & animations
   ============================================================ */

/* ------------------------------------------------------------
   1. BOUNCING GEOMETRIC SHAPES
   Creates CSS-only 3D-look shapes that bounce off the viewport
   edges using requestAnimationFrame.
   ------------------------------------------------------------ */

const geoCanvas = document.getElementById('geo-canvas');

// Available shape types (must match CSS classes)
const SHAPE_TYPES = ['geo-cube', 'geo-diamond', 'geo-triangle', 'geo-hex', 'geo-ring'];
const SHAPE_COUNT = 14;
const shapes = [];

function createShapes() {
  for (let i = 0; i < SHAPE_COUNT; i++) {
    const el = document.createElement('div');
    const type = SHAPE_TYPES[i % SHAPE_TYPES.length];
    el.classList.add('geo-shape', type);

    const scale = 0.5 + Math.random() * 1.3;
    const speed = 0.35 + Math.random() * 0.75;
    const angle = Math.random() * Math.PI * 2;

    el._s = {
      x: Math.random() * (window.innerWidth  - 60),
      y: Math.random() * (window.innerHeight - 60),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      scale,
    };

    el.style.left      = el._s.x + 'px';
    el.style.top       = el._s.y + 'px';
    el.style.transform = `scale(${scale})`;

    geoCanvas.appendChild(el);
    shapes.push(el);
  }
}

function animateShapes() {
  const W = window.innerWidth;
  const H = window.innerHeight;

  shapes.forEach(el => {
    const s  = el._s;
    const sz = 60 * s.scale; // approximate bounding box size

    s.x += s.vx;
    s.y += s.vy;

    // Bounce off left / right
    if (s.x <= 0)        { s.x = 0;      s.vx =  Math.abs(s.vx); }
    if (s.x + sz >= W)   { s.x = W - sz; s.vx = -Math.abs(s.vx); }

    // Bounce off top / bottom
    if (s.y <= 0)        { s.y = 0;      s.vy =  Math.abs(s.vy); }
    if (s.y + sz >= H)   { s.y = H - sz; s.vy = -Math.abs(s.vy); }

    el.style.left = s.x + 'px';
    el.style.top  = s.y + 'px';
  });

  requestAnimationFrame(animateShapes);
}

// Reposition shapes if window is resized
window.addEventListener('resize', () => {
  shapes.forEach(el => {
    const s = el._s;
    s.x = Math.min(s.x, window.innerWidth  - 60);
    s.y = Math.min(s.y, window.innerHeight - 60);
  });
});

createShapes();
animateShapes();

/* ------------------------------------------------------------
   2. TYPEWRITER EFFECT FOR HERO HEADLINE
   ------------------------------------------------------------ */
const HEADLINES = [
  'Product Engineer @ Meaningful',
  'Building Supervisible.com',
  'Webflow Expert & Growth Developer',
  'Ing. Mecánico → Full Stack Dev',
];

const headlineEl = document.getElementById('hero-headline');
let hlIdx      = 0;
let charIdx    = 0;
let isDeleting = false;

function typeWriter() {
  const current = HEADLINES[hlIdx];

  if (!isDeleting) {
    headlineEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2200);
      return;
    }
  } else {
    headlineEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      hlIdx = (hlIdx + 1) % HEADLINES.length;
    }
  }

  setTimeout(typeWriter, isDeleting ? 38 : 68);
}

// Start after hero text has faded in
setTimeout(typeWriter, 1100);

/* ------------------------------------------------------------
   3. MOBILE MENU TOGGLE
   ------------------------------------------------------------ */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = navToggle.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-xmark');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const icon = navToggle.querySelector('i');
    icon.classList.add('fa-bars');
    icon.classList.remove('fa-xmark');
  });
});

/* ------------------------------------------------------------
   4. NAVBAR SCROLL CLASS
   ------------------------------------------------------------ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ------------------------------------------------------------
   5. SCROLL-TRIGGERED FADE-IN ANIMATIONS
   Cards stagger in sequentially within each visible group.
   ------------------------------------------------------------ */
const fadeObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Apply staggered delay to cards/items within a row
function observeWithStagger(selector) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    fadeObserver.observe(el);
  });
}

observeWithStagger('.exp-card');
observeWithStagger('.skill-category');
observeWithStagger('.edu-item');
observeWithStagger('.stat');

// About grid as a whole
const aboutGrid = document.querySelector('.about-grid');
if (aboutGrid) {
  aboutGrid.classList.add('fade-in');
  fadeObserver.observe(aboutGrid);
}

/* ------------------------------------------------------------
   6. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
   ------------------------------------------------------------ */
const sections = document.querySelectorAll('section[id], footer[id]');
const navItems  = document.querySelectorAll('.nav-links a');

const highlightObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -60% 0px' });

sections.forEach(s => highlightObserver.observe(s));

/* ------------------------------------------------------------
   7. SKILL PILLS STAGGERED ENTRANCE ANIMATION
   Each pill slides up individually when its category enters view.
   ------------------------------------------------------------ */
document.querySelectorAll('.pill').forEach((pill, i) => {
  pill.style.opacity   = '0';
  pill.style.transform = 'translateY(10px)';
  pill.style.transition = `opacity 0.35s ease ${(i % 8) * 0.05}s, transform 0.35s ease ${(i % 8) * 0.05}s`;
});

const pillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.pill').forEach(pill => {
        pill.style.opacity   = '1';
        pill.style.transform = 'translateY(0)';
      });
      pillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(cat => pillObserver.observe(cat));
