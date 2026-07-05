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
    const iconos = {
      '🧺': 'img/mapa-dona.png',
      '🪡': 'img/mapa-modista.png',
      '🔄': 'img/icono-feria.png'
    };
    const src = iconos[emoji] || emoji;
    return L.divIcon({
      className: 'mapa-marker',
      html: `<div class="marker-bubble"><img src="${src}" style="width:20px;height:20px;object-fit:contain;"/></div>`,
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
