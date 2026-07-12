// ── Modal de Registro ──

let ropaCanvas = null; // referencia global al canvas de animación

// ── Helpers de almacenamiento ──
function obtenerUsuarios() {
  const data = localStorage.getItem('ecotramaUsuarios');
  return data ? JSON.parse(data) : [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem('ecotramaUsuarios', JSON.stringify(usuarios));
}

// ── Estado de sesión ──
function renderAuthUI() {
  const dataGuardada = localStorage.getItem('ecotramaUsuarioActual');
  const usuario = dataGuardada ? JSON.parse(dataGuardada) : null;

  const navArea = document.getElementById('navAuthArea');
  const mobileBtn = document.getElementById('btnRegistroMobile');

  if (!usuario) {
    if (navArea) {
      navArea.innerHTML = `<a href="#" class="btn-nav" id="btnRegistroNav" onclick="abrirRegistro('registro'); return false;">Registrate</a>`;
    }

    if (mobileBtn) {
      mobileBtn.textContent = 'Registrate';
      mobileBtn.onclick = (e) => {
        toggleMenu();
        abrirRegistro('registro');
        e.preventDefault();
        return false;
      };
    }

    return;
  }

  const esModista = usuario.tipo === 'modista';
  const etiqueta = esModista ? 'Modista 🧵' : 'Usuaria 👤';
  const colorFondo = esModista ? '#dae097' : '#afb8cd';

  if (navArea) {
    navArea.innerHTML = `
      <div style="position:relative; display:inline-block;">
        <a href="#" id="chipUsuario" onclick="toggleMenuUsuario(); return false;"
     style="
       display:flex;
       align-items:center;
       gap:8px;
       padding:8px 14px;
       border-radius:999px;
       background:#fbf7df;
       border:1px solid #d8d0a4;
       box-shadow:0 2px 8px rgba(0,0,0,.08);
       cursor:pointer;
       text-decoration:none;
       color:#3a3820;
   ">
          <span style="font-weight:600;">${usuario.nombre}</span>
          <span style="font-size:.72rem; font-weight:700; padding:3px 10px; border-radius:20px; background:${colorFondo}; color:#3a3820;">${etiqueta}</span>
        </a>

        <div id="menuUsuario"
             style="display:none; position:absolute; right:0; top:130%; background:#fff; border:1px solid #e5e0cf; border-radius:10px; box-shadow:0 6px 18px rgba(0,0,0,.12); min-width:150px; overflow:hidden; z-index:50;">
           <a href="#"
             onclick="irAMiPerfil(); return false;"
             style="display:block; padding:10px 14px; font-size:.85rem; color:#3a3820; text-decoration:none; border-bottom:1px solid #eee;">
             Mi perfil
           </a>
           <a href="#"
            onclick="cerrarSesion(); return false;"
            style="display:block; padding:10px 14px; font-size:.85rem; color:#3a3820; text-decoration:none;">
            Cerrar sesión
           </a>
        </div>
      </div>
    `;
  }

  if (mobileBtn) {
    mobileBtn.textContent = `${usuario.nombre} · ${etiqueta}`;
    mobileBtn.onclick = (e) => {
      cerrarSesion();
      e.preventDefault();
      return false;
    };
  }
}

function toggleMenuUsuario() {
  const menu = document.getElementById('menuUsuario');
  if (menu) {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
}

document.addEventListener('click', (e) => {
  const chip = document.getElementById('chipUsuario');
  const menu = document.getElementById('menuUsuario');

  if (menu && chip && !chip.contains(e.target) && !menu.contains(e.target)) {
    menu.style.display = 'none';
  }
});

function cerrarSesion() {
  localStorage.removeItem('ecotramaUsuarioActual');
  renderAuthUI();
}

function abrirRegistro(vista) {
  document.getElementById('modal-registro').classList.add('open');
  document.body.style.overflow = 'hidden';

  if (vista === 'login') {
    mostrarLogin();
  } else {
    mostrarRegistro();
  }
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
  document.getElementById('reg-login-content').style.display = 'none';
  document.getElementById('reg-thanks').style.display = 'none';

  document.getElementById('reg-nombre').value = '';
  document.getElementById('reg-email').value = '';
  document.getElementById('reg-password').value = '';
  document.getElementById('reg-error').textContent = '';

  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('login-error').textContent = '';
}

function mostrarLogin() {
  document.getElementById('reg-form-content').style.display = 'none';
  document.getElementById('reg-thanks').style.display = 'none';
  document.getElementById('reg-login-content').style.display = 'block';
  document.getElementById('reg-error').textContent = '';
  document.getElementById('login-error').textContent = '';
}

function mostrarRegistro() {
  document.getElementById('reg-login-content').style.display = 'none';
  document.getElementById('reg-thanks').style.display = 'none';
  document.getElementById('reg-form-content').style.display = 'block';
  document.getElementById('reg-error').textContent = '';
  document.getElementById('login-error').textContent = '';
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
  // Guardar usuario
  const tipoSeleccionado = document.querySelector('input[name="reg-tipo"]:checked');
  if (!tipoSeleccionado) {
  error.textContent = 'Elegí si sos modista o usuaria 🌿';
  return;
}
  const tipo = tipoSeleccionado.value;

  const usuarios = obtenerUsuarios();

const yaExiste = usuarios.some(
  u => u.email.toLowerCase() === email.toLowerCase()
);

if (yaExiste) {
  error.textContent = 'Ya existe una cuenta con ese correo. Probá iniciar sesión 🌱';
  return;
}

const usuario = { nombre, email, password, tipo };

usuarios.push(usuario);

guardarUsuarios(usuarios);

localStorage.setItem('ecotramaUsuarioActual', JSON.stringify(usuario));

// Actualizar el navbar inmediatamente
renderAuthUI();

// Si estamos en el foro, sincronizar la usuaria activa sin necesitar refresh
if (typeof cargarUsuariaLogueada === "function") {
  cargarUsuariaLogueada();
  if (typeof renderAvComposer === "function") renderAvComposer();
}

  // Mostrar pantalla de gracias
  error.textContent = '';
  document.getElementById('reg-thanks-name').textContent = nombre;
  document.getElementById('reg-form-content').style.display = 'none';
  document.getElementById('reg-thanks').style.display = 'flex';


  // ✨ Lanzar animación de ropa cayendo en TODA la pantalla
  lanzarRopaCayendo();
}

function iniciarSesion() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const error = document.getElementById('login-error');

  if (!email || !password) {
    error.textContent = 'Completá tu correo y contraseña 🌿';
    return;
  }

  const usuarios = obtenerUsuarios();

  const usuario = usuarios.find(
    u =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (!usuario) {
    error.textContent = 'Correo o contraseña incorrectos 🔒';
    return;
  }

  localStorage.setItem(
    'ecotramaUsuarioActual',
    JSON.stringify(usuario)
  );

 error.textContent = '';
  renderAuthUI();

  // Si estamos en el foro, sincronizar la usuaria activa sin necesitar refresh
  if (typeof cargarUsuariaLogueada === "function") {
    cargarUsuariaLogueada();
    if (typeof renderAvComposer === "function") renderAvComposer();
  }

  cerrarRegistro();
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

  renderAuthUI();

  const overlay = document.getElementById('modal-registro');

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cerrarRegistro();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarRegistro();
  });
});
// Perfil 
function irAMiPerfil() {
  if (typeof verMiPerfil === 'function') {
    verMiPerfil();
  } else {
    window.location.href = 'foro.html?perfil=1';
  }
}