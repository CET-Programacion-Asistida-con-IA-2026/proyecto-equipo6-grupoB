// ── Modal de Registro ──

let ropaCanvas = null; // referencia global al canvas de animación

function abrirRegistro() {
  document.getElementById('modal-registro').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarRegistro() {
  // Eliminar canvas de animación si sigue activo
  if (ropaCanvas && ropaCanvas.parentNode) {
    document.body.removeChild(ropaCanvas);
    ropaCanvas = null;
  }
  document.getElementById('modal-registro').classList.remove('open');
  document.body.style.overflow = '';
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

  if (!nombre || !email || !password) {
    error.textContent = 'Por favor completá todos los campos 🌿';
    return;
  }
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
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

  // ✨ Lanzar animación de ropa cayendo en TODA la pantalla
  lanzarRopaCayendo();
}

function lanzarRopaCayendo() {
  // Crear canvas que cubre toda la pantalla, por ENCIMA del modal
  const canvas = document.createElement('canvas');
  ropaCanvas = canvas;
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '10000'; // Por encima del modal (z-index 1000)
  canvas.style.pointerEvents = 'none';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const emojis = ['👗','👕','🧵','🪡','🧶','👖','🧣','🧤','👒','✂️','🌸','🌿'];
  let prendas = [];

  // Crear 35 prendas escalonadas desde arriba
  for (let i = 0; i < 35; i++) {
    prendas.push({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * canvas.width,
      y: -60 - Math.random() * 500,   // escalonadas para que no entren todas juntas
      vy: 2.5 + Math.random() * 3.5,
      vx: (Math.random() - 0.5) * 2,
      rot: Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.12,
      size: 28 + Math.random() * 24
    });
  }

  let frame = 0;
  const totalFrames = 240; // ~4 segundos a 60fps

  function caer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    prendas.forEach(p => {
      // Fade out en los últimos 60 frames
      const alpha = frame > totalFrames - 60
        ? (totalFrames - frame) / 60
        : 1;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = 'center';
      ctx.fillText(p.emoji, 0, 0);
      ctx.restore();

      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.rotV;

      // Si salió por abajo, reiniciar desde arriba (solo si quedan frames)
      if (p.y > canvas.height + 40 && frame < totalFrames - 80) {
        p.y = -40 - Math.random() * 100;
        p.x = Math.random() * canvas.width;
      }
    });

    frame++;
    if (frame < totalFrames) {
      requestAnimationFrame(caer);
    } else {
      if (ropaCanvas && ropaCanvas.parentNode) document.body.removeChild(ropaCanvas);
      ropaCanvas = null;
    }
  }

  caer();
}

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('modal-registro');
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrarRegistro();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarRegistro();
  });
});
