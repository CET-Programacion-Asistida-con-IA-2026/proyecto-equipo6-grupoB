// ════════════════════════════════════════════
//  EcoTrama — main.js
//  Archivos unidos: nav.js · carousel.js · mapa.js · form.js · registro.js
// ════════════════════════════════════════════


// ── NAV: transparente en hero, opaco al scrollear ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Menú mobile ──
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}


// ── Carrusel ──
let current = 0;
const total = 5;
let autoTimer;

function updateCarousel() {
  document.getElementById('carouselTrack').style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

function moveCarousel(dir) {
  current = (current + dir + total) % total;
  updateCarousel();
  resetAuto();
}

function goToSlide(n) {
  current = n;
  updateCarousel();
  resetAuto();
}

function resetAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => moveCarousel(1), 5500);
}

autoTimer = setInterval(() => moveCarousel(1), 5500);

// Swipe en mobile
let touchStartX = 0;
const track = document.getElementById('carouselTrack');
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) moveCarousel(diff > 0 ? 1 : -1);
});


// ── Scroll reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Formulario ──
function enviar() {
  const nombre = document.getElementById('nombre').value.trim();
  const comentario = document.getElementById('comentario').value.trim();
  if (!nombre || !comentario) {
    alert('Por favor completá tu nombre y mensaje 🌿');
    return;
  }
  document.getElementById('form-content').style.display = 'none';
  document.getElementById('thanks-name').textContent = nombre;
  document.getElementById('form-thanks').style.display = 'block';
}


// ── Mapa interactivo EcoTrama ──
// Usa Leaflet.js (cargado desde CDN en inicio.html)

let mapaInicializado = false;

function iniciarMapa() {
  if (mapaInicializado) return;
  mapaInicializado = true;

  const map = L.map('mapa-container').setView([-34.6037, -58.3816], 12);

  // Tiles OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(map);

  // Íconos personalizados por categoría
  function crearIcono(emoji) {
    return L.divIcon({
      className: 'mapa-marker',
      html: `<div class="marker-bubble">${emoji}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -42]
    });
  }

  // Puntos de donación, modistas e intercambio en Buenos Aires
  const puntos = [
    {
      lat: -34.6037, lng: -58.3816,
      emoji: '🧺', categoria: 'donacion',
      nombre: 'Centro de donaciones San Telmo',
      desc: 'Ropa en buen estado y telas para upcycling',
      horario: 'Lun–Vie 10–18hs'
    },
    {
      lat: -34.5875, lng: -58.4150,
      emoji: '🪡', categoria: 'modista',
      nombre: 'Taller Hilo Verde',
      desc: 'Reparaciones, ajustes y transformaciones',
      horario: 'Mar–Sáb 9–17hs'
    },
    {
      lat: -34.6200, lng: -58.3700,
      emoji: '🔄', categoria: 'intercambio',
      nombre: 'Feria de intercambio La Boca',
      desc: 'Intercambio de prendas todos los sábados',
      horario: 'Sáb 10–14hs'
    },
    {
      lat: -34.5950, lng: -58.4300,
      emoji: '🧺', categoria: 'donacion',
      nombre: 'Punto verde Palermo',
      desc: 'Ropa de mujer, hombre y niños',
      horario: 'Lun–Dom 8–20hs'
    },
    {
      lat: -34.6100, lng: -58.4000,
      emoji: '🪡', categoria: 'modista',
      nombre: 'Costurera Florencia',
      desc: 'Especialista en upcycling y prendas vintage',
      horario: 'Con turno previo'
    },
    {
      lat: -34.5780, lng: -58.4250,
      emoji: '🔄', categoria: 'intercambio',
      nombre: 'Club de intercambio Colegiales',
      desc: 'Reuniones mensuales de intercambio comunitario',
      horario: '1er domingo de mes, 11hs'
    },
    {
      lat: -34.6300, lng: -58.3600,
      emoji: '🧺', categoria: 'donacion',
      nombre: 'Donaciones Barracas',
      desc: 'Telas, botones y accesorios de costura',
      horario: 'Mié y Vie 14–18hs'
    },
  ];

  // Agregar marcadores al mapa
  puntos.forEach(p => {
    const marker = L.marker([p.lat, p.lng], { icon: crearIcono(p.emoji) }).addTo(map);
    marker.bindPopup(`
      <div class="mapa-popup">
        <div class="popup-header">${p.emoji} <strong>${p.nombre}</strong></div>
        <p>${p.desc}</p>
        <span class="popup-horario">⏰ ${p.horario}</span>
      </div>
    `);
  });

  // Filtros por categoría
  document.querySelectorAll('.mapa-filtro').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mapa-filtro').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Lógica de filtro visual (versión simplificada)
    });
  });
}

// Iniciar el mapa cuando la sección sea visible
document.addEventListener('DOMContentLoaded', () => {
  const seccionMapa = document.getElementById('mapa');
  if (!seccionMapa) return;

  const mapaObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      iniciarMapa();
      mapaObserver.disconnect();
    }
  }, { threshold: 0.1 });

  mapaObserver.observe(seccionMapa);
});


// ── Modal de Registro ──

function abrirRegistro() {
  document.getElementById('modal-registro').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarRegistro() {
  document.getElementById('modal-registro').classList.remove('open');
  document.body.style.overflow = '';
  // Resetear formulario
  document.getElementById('reg-form-content').style.display = 'block';
  document.getElementById('reg-thanks').style.display = 'none';
  document.getElementById('reg-nombre').value = '';
  document.getElementById('reg-email').value = '';
  document.getElementById('reg-password').value = '';
  document.getElementById('reg-error').textContent = '';
}

function registrar() {
  const nombre   = document.getElementById('reg-nombre').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const error    = document.getElementById('reg-error');

  // Validaciones
  if (!nombre || !email || !password) {
    error.textContent = 'Por favor completá todos los campos 🌿';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = 'El correo no parece válido. Revisalo 📧';
    return;
  }
  if (password.length < 6) {
    error.textContent = 'La contraseña debe tener al menos 6 caracteres 🔒';
    return;
  }

  // Mostrar pantalla de gracias
  error.textContent = '';
  document.getElementById('reg-thanks-name').textContent = nombre;
  document.getElementById('reg-form-content').style.display = 'none';
  document.getElementById('reg-thanks').style.display = 'flex';
}

// Cerrar modal al hacer clic fuera
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('modal-registro');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrarRegistro();
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarRegistro();
  });
});
