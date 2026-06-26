// ── Carrusel con fade suave ──
let current = 0;
const total = 5;
let autoTimer;
let isTransitioning = false;

function updateCarousel(newIndex) {
  if (isTransitioning) return;
  isTransitioning = true;

  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');

  // Fade out slide actual
  slides[current].style.opacity = '0';
  slides[current].style.zIndex = '1';

  // Preparar nuevo slide
  slides[newIndex].style.zIndex = '2';
  slides[newIndex].style.opacity = '0';
  slides[newIndex].style.display = 'flex';

  // Pequeño delay y fade in
  setTimeout(() => {
    slides[newIndex].style.opacity = '1';
  }, 30);

  setTimeout(() => {
    slides[current].style.display = 'none';
    slides[current].style.opacity = '1';
    current = newIndex;
    isTransitioning = false;
  }, 700);

  // Actualizar dots
  dots.forEach((d, i) => d.classList.toggle('active', i === newIndex));
}

function moveCarousel(dir) {
  const next = (current + dir + total) % total;
  updateCarousel(next);
  resetAuto();
}

function goToSlide(n) {
  if (n === current) return;
  updateCarousel(n);
  resetAuto();
}

function resetAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => moveCarousel(1), 5500);
}

// Inicializar slides
window.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-slide');
  slides.forEach((s, i) => {
    s.style.transition = 'opacity 0.7s ease';
    s.style.position = 'absolute';
    s.style.top = '0';
    s.style.left = '0';
    s.style.width = '100%';
    s.style.height = '100%';
    if (i === 0) {
      s.style.opacity = '1';
      s.style.zIndex = '2';
      s.style.display = 'flex';
    } else {
      s.style.opacity = '0';
      s.style.zIndex = '1';
      s.style.display = 'none';
    }
  });
  resetAuto();
});

// Swipe en mobile
let touchStartX = 0;
const track = document.getElementById('carouselTrack');
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) moveCarousel(diff > 0 ? 1 : -1);
});
