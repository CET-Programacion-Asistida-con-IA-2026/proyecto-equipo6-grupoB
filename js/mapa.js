// ── Mapa interactivo EcoTrama ──
// Usa Leaflet.js (cargado desde CDN en index.html)

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
 function crearIcono(categoria) {
    const iconos = {
      'donacion': 'img/mapa-dona.png',
      'feria': 'img/icono-feria.png'
    };
    const src = iconos[categoria];
    return L.divIcon({
      className: 'mapa-marker',
      html: `<div class="marker-bubble"><img src="${src}" style="width:20px;height:20px;object-fit:contain;"/></div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -42]
    });
  }
  const marcadores = []; // guardamos cada marker junto a su categoría, para poder filtrarlos después
  // Puntos de donación y ferias en Buenos Aires
  const puntos = [
    {
      lat: -34.6037, lng: -58.3816,
      categoria: 'donacion',
      nombre: 'Punto de donación San Telmo',
      desc: 'Ropa en buen estado y telas para upcycling',
      horario: 'Lun–Vie 10–18 hs'
    },
    {
      lat: -34.6200, lng: -58.3700,
      categoria: 'feria',
      nombre: 'Feria americana La Boca',
      desc: 'Venta de ropa usada y accesorios',
      horario: 'Sáb 10–14 hs'
    },
    {
      lat: -34.5950, lng: -58.4300,
      categoria: 'donacion',
      nombre: 'Punto de donación Palermo',
      desc: 'Ropa y calzado en buen estado',
      horario: 'Lun–Dom 8–20 hs'
    },
    {
      lat: -34.5780, lng: -58.4250,
      categoria: 'feria',
      nombre: 'Feria americana Colegiales',
      desc: 'Ropa usada, vintage y accesorios',
      horario: '1er domingo del mes 11–17 hs'
    },
    {
      lat: -34.6300, lng: -58.3600,
      categoria: 'donacion',
      nombre: 'Punto de donación Barracas',
      desc: 'Telas, botones y accesorios de costura',
      horario: 'Mié y Vie 14–18 hs'
    },
  ];

  // Agregar marcadores al mapa
  puntos.forEach(p => {
    const marker = L.marker([p.lat, p.lng], { icon: crearIcono(p.categoria) }).addTo(map);
    marker.bindPopup(`
      <div class="mapa-popup">
        <div class="popup-header">
        <img src="${p.categoria === 'donacion' ? 'img/donacion.png' : 'img/ropa.png'}"
        style="width:18px;height:18px;vertical-align:middle;margin-right:6px;">
        <strong>${p.nombre}</strong>
        </div>
        <p>${p.desc}</p>
        <span class="popup-horario"><img src="img/reloj.png" style="width:15px; height:auto; vertical-align:middle; margin-right:6px;"/> ${p.horario}</span>
      </div>
    `);
    marcadores.push({ marker, categoria: p.categoria });
  });

// Filtros por categoría
  document.querySelectorAll('.mapa-filtro').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mapa-filtro').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const categoriaSeleccionada = btn.dataset.cat;
      marcadores.forEach(({ marker, categoria }) => {
        const debeVerse = categoriaSeleccionada === 'todos' || categoria === categoriaSeleccionada;
        if (debeVerse && !map.hasLayer(marker)) marker.addTo(map);
        if (!debeVerse && map.hasLayer(marker)) map.removeLayer(marker);
      });
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
