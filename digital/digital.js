// ── CAROUSEL ─────────────────────────────────────────
const track   = document.getElementById('track');
const countEl = document.getElementById('count');
const totalSlides = 4;
let current = 0;
const heroLeft = document.querySelector('.hero-left');

function goTo(i) {
  current = Math.max(0, Math.min(i, totalSlides - 1));
  const w = document.querySelector('.slide').offsetWidth + 20;
  track.style.transform = 'translateX(-' + (current * w) + 'px)';
  document.querySelectorAll('.dot').forEach((d, idx) =>
    d.classList.toggle('active', idx === current)
  );
  countEl.textContent =
    String(current + 1).padStart(2,'0') + ' / ' + String(totalSlides).padStart(2,'0');
  if (window.innerWidth > 900) {
    if (current === 0) {
      heroLeft.style.opacity = '1';
      heroLeft.style.transform = 'translateY(0)';
    } else {
      heroLeft.style.opacity = '0';
      heroLeft.style.transform = 'translateY(8px)';
    }
  } else {
    heroLeft.style.opacity = '1';
    heroLeft.style.transform = 'translateY(0)';
  }
}

document.getElementById('next').onclick = () => goTo(current + 1);
document.getElementById('prev').onclick = () => goTo(current - 1);
document.getElementById('dots').addEventListener('click', e => {
  if (e.target.dataset.index !== undefined) goTo(+e.target.dataset.index);
});

// ── TOUCH SWIPE ──────────────────────────────────────
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 40) diff > 0 ? goTo(current + 1) : goTo(current - 1);
}, { passive: true });

// ── IOS TOGGLE ───────────────────────────────────────
const btns   = document.querySelectorAll('.toggle-btn');
const slider = document.getElementById('slider');

function moveSlider(btn) {
  slider.style.width     = btn.offsetWidth + 'px';
  slider.style.transform = 'translateX(' + (btn.offsetLeft - 4) + 'px)';
}

moveSlider(document.querySelector('.toggle-btn.active'));

btns.forEach(btn => btn.addEventListener('click', () => {
  btns.forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.cards-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + btn.dataset.panel).classList.add('active');
  moveSlider(btn);
}));
