/* ══════════════════════════════════════════
   Digital Surplus — Shared JS
   /digital/digital.js
══════════════════════════════════════════ */

// Scroll reveal
const _revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); _revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => _revealObs.observe(el));

// Nav: flat → pill → hide on scroll down → reveal on scroll up
const navWrap = document.getElementById('mainNav');
if (navWrap) {
  let lastY = 0, pillActive = false, scrolledSincePill = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY, delta = y - lastY;
    if (y > 60 && !pillActive) {
      pillActive = true; scrolledSincePill = 0;
      navWrap.classList.add('scrolled'); navWrap.classList.remove('hidden');
    } else if (y <= 60 && pillActive) {
      pillActive = false; scrolledSincePill = 0;
      navWrap.classList.remove('scrolled'); navWrap.classList.remove('hidden');
    }
    if (pillActive) {
      if (delta > 0) { scrolledSincePill += delta; if (scrolledSincePill > 250) navWrap.classList.add('hidden'); }
      else { scrolledSincePill = 0; navWrap.classList.remove('hidden'); }
    }
    lastY = y;
  }, { passive: true });
}
