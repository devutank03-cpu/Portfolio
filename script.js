/* ================================================================
   DEVANG TANK PORTFOLIO — script.js
   Handles: Dark Mode, Navbar, Typed Text, Scroll Animations,
            Skill Bars, Counter, Contact Form, Back to Top
   ================================================================ */

'use strict';

// ─── DOM Ready ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initHamburger();
  initTyped();
  initAOS();
  initSkillBars();
  initCounters();
  initContactForm();
  initBackToTop();
  initActiveNavLink();
  setCurrentYear();
});

// ─── 1. Dark / Light Theme ───────────────────────────────────────
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const icon   = document.getElementById('themeIcon');
  const html   = document.documentElement;

  // Load saved preference
  const saved = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', saved);
  updateThemeIcon(icon, saved);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(icon, next);
  });
}

function updateThemeIcon(icon, theme) {
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// ─── 2. Navbar Scroll Effect ─────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const backTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    if (backTop) backTop.classList.toggle('visible', scrollY > 400);
  }, { passive: true });
}

// ─── 3. Hamburger Menu ───────────────────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const links     = navLinks.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── 4. Typed Text Effect ────────────────────────────────────────
function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const roles = [
    'Aspiring Software Developer',
    'MCA Student @ GLS University',
    'Full-Stack Enthusiast',
    'AI & Data Analytics Learner',
    'Problem Solver',
    'Open Source Explorer',
  ];

  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
      }
    }

    setTimeout(type, deleting ? 60 : 90);
  }

  setTimeout(type, 800);
}

// ─── 5. AOS (Animate on Scroll) ──────────────────────────────────
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic',
    });
  }
}

// ─── 6. Skill Bars ───────────────────────────────────────────────
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-width') || '0';
        // Small delay to make it feel intentional
        setTimeout(() => { fill.style.width = width + '%'; }, 200);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(fill => observer.observe(fill));
}

// ─── 7. Counter Animation ────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target')) || 0;
  const duration = 1500;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// ─── 8. Contact Form ─────────────────────────────────────────────
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    // Loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
    btn.disabled  = true;

    // Simulate network request (replace with actual fetch/EmailJS call)
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled  = false;
      form.reset();

      if (success) {
        success.classList.add('visible');
        setTimeout(() => success.classList.remove('visible'), 5000);
      }
    }, 1800);
  });
}

// ─── 9. Back to Top ──────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── 10. Active Nav Link on Scroll ───────────────────────────────
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

  sections.forEach(section => observer.observe(section));
}

// ─── 11. Footer Year ─────────────────────────────────────────────
function setCurrentYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}
