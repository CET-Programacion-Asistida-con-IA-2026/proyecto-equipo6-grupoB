const USUARIAS = [
  { id:"celes",     nombre:"Celes Romero",  handle:"@celes.romero",  initials:"CR", grad:"linear-gradient(135deg,#D88AAE,#F7D0D5)", photo:null, portada:"linear-gradient(135deg,#F7D0D5 0%,#D88AAE 50%,#893941 100%)", portadaFoto:null, bio:"Apasionada por la moda consciente ✨ Cofundadora de EcoTrama.", roles:["Compradora","Donante"], zona:"CABA", seguidoras:214, siguiendo:118, logros:["primera_pub","dona_1","likes_5"] },
  { id:"maia",      nombre:"Maia Manetti",  handle:"@maia.manetti",  initials:"MM", grad:"linear-gradient(135deg,#8D8B4C,#DAE097)", photo:null, portada:"linear-gradient(135deg,#DAE097 0%,#8D8B4C 100%)", portadaFoto:null, bio:"Diseñadora textil sustentable 🌿 Todo tiene segunda vida.", roles:["Vendedora","Reparadora"], zona:"CABA", seguidoras:187, siguiendo:95, logros:["primera_pub","dona_1"] },
  { id:"flor",      nombre:"Flor Melg",     handle:"@flor.melg",     initials:"FM", grad:"linear-gradient(135deg,#94B2ED,#65613F)", photo:null, portada:"linear-gradient(135deg,#94B2ED 0%,#65613F 100%)", portadaFoto:null, bio:"Costurera y activista ambiental 🪡 La ropa no es descartable.", roles:["Reparadora"], zona:"La Plata", seguidoras:143, siguiendo:88, logros:["primera_pub"] },
  { id:"cami",      nombre:"Camí Linares",  handle:"@cami.linares",  initials:"CL", grad:"linear-gradient(135deg,#F8B553,#893941)", photo:null, portada:"linear-gradient(135deg,#F8B553 0%,#893941 100%)", portadaFoto:null, bio:"Fan del trueque y las ferias 🛍️ La Plata 📍", roles:["Compradora","Vendedora"], zona:"La Plata", seguidoras:162, siguiendo:104, logros:["primera_pub","likes_5"] },
  { id:"khaterine", nombre:"Khaterine",     handle:"@khaterine.cet", initials:"KH", grad:"linear-gradient(135deg,#D88AAE,#94B2ED)", photo:null, portada:"linear-gradient(135deg,#D88AAE 0%,#94B2ED 100%)", portadaFoto:null, bio:"Emprendedora textil y community manager de EcoTrama 💫", roles:["Vendedora","Donante"], zona:"CABA", seguidoras:198, siguiendo:121, logros:["primera_pub","dona_1","likes_5","comparte_1"] },
];
 
const LOGROS_DEF = [
  { id:"primera_pub",  label:"Primera publicación",  icon:"📝", desc:"Publicaste por primera vez en el foro" },
  { id:"dona_1",       label:"Primera donación",     icon:"🌱", desc:"Registraste tu primera prenda donada" },
  { id:"likes_5",      label:"5 likes recibidos",    icon:"💛", desc:"Tu contenido le gustó a la comunidad" },
  { id:"comparte_1",   label:"Compartiste algo",     icon:"🔁", desc:"Compartiste una publicación" },
  { id:"comentario_5", label:"5 comentarios",        icon:"💬", desc:"Sos parte activa de las conversaciones" },
  { id:"taller_1",     label:"Asististe a un taller",icon:"🪡", desc:"Participaste en un taller de la comunidad" },
];
 
const PORTADAS_OPC = [
  "linear-gradient(135deg,#F7D0D5,#D88AAE)",
  "linear-gradient(135deg,#DAE097,#8D8B4C)",
  "linear-gradient(135deg,#94B2ED,#65613F)",
  "linear-gradient(135deg,#F8B553,#893941)",
  "linear-gradient(135deg,#D88AAE,#94B2ED)",
  "linear-gradient(135deg,#65613F,#3a3228)",
];
 
const ROLES_OPC = ["Compradora","Vendedora","Reparadora","Donante"];
 
const POSTS_INICIALES = [
  { id:1, uid:"celes",     tipo:"texto",  texto:"¡Empezamos EcoTrama con todo! 🌿 Esta comunidad nació del amor por la moda consciente y las ganas de cambiar el mundo desde el placard.", tiempo:"1h",  likes:47, liked:false, compartidos:12, compartido:false, coms:[{uid:"maia",t:"¡Te banco con todo! 🌿"},{uid:"khaterine",t:"EcoTrama para siempre 🌸"}] },
  { id:2, uid:"maia",      tipo:"texto",  texto:"Tip 🧵 Antes de tirar ese jean roto, pensá: ¿se puede convertir en algo nuevo? Yo transformé tres en bolsos y una falda.", tiempo:"2h",  likes:38, liked:false, compartidos:8,  compartido:false, coms:[{uid:"flor",t:"Hice lo mismo con una campera! 🪡"},{uid:"cami",t:"Pasame el tutorial plisss 😍"}] },
  { id:3, uid:"flor",      tipo:"imagen", texto:"Antes / después de una campera rescatada del olvido. Un poco de aguja e hilo, y lista para seguir viviendo 🌱", tiempo:"3h",  likes:29, liked:false, compartidos:5,  compartido:false, coms:[] },
  { id:4, uid:"cami",      tipo:"video",  texto:"¡Hice mi primer trueque en la Feria de Villa Crespo! Cambié una campera por dos vestidos divinos 🛍️", tiempo:"5h",  likes:52, liked:false, compartidos:14, compartido:false, coms:[{uid:"celes",t:"¡El trueque es el futuro! 🔄"}] },
  { id:5, uid:"khaterine", tipo:"link",   link:"https://ecotrama.com.ar/articulo-fastfashion", texto:"Les comparto este artículo sobre cómo la industria textil es la segunda más contaminante del mundo. Hay que hablar de esto.", tiempo:"1d", likes:63, liked:false, compartidos:19, compartido:false, coms:[{uid:"maia",t:"Impresionante. Compartamos esto 📢"}] },
];
 
/* ════════════════════════════════════════
   ESTADO GLOBAL
════════════════════════════════════════ */
let usuarioActivo  = "celes";
let posts          = JSON.parse(JSON.stringify(POSTS_INICIALES));
let tipoActual     = "texto";
let tabActual      = "feed";
let perfilViendo   = null;
let editorDraft    = {};
 
/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  cargarUsuariaLogueada();
  renderAvComposer();
  renderPosts();
  renderExplorar();
  iniciarPortadaGrid();
  iniciarAvatarGrid();
  const params = new URLSearchParams(window.location.search);
if (params.get('perfil') === '1') {
  verMiPerfil();
}
});

/* ════════════════════════════════════════
   USUARIA REAL (conectada con el registro)
════════════════════════════════════════ */
function cargarUsuariaLogueada() {
  const guardado = localStorage.getItem('ecotramaUsuarioActual');
  if (!guardado) {
    // Todavía no se registró ni inició sesión: le pedimos que lo haga
    if (typeof abrirRegistro === "function") abrirRegistro();
    return;
  }
  const datos = JSON.parse(guardado);
  let usuaria = USUARIAS.find(u => u.id === 'yo');
  if (!usuaria) {
    usuaria = {
      id: 'yo',
      nombre: datos.nombre,
      handle: '@' + datos.nombre.toLowerCase().replace(/\s+/g, '.'),
      initials: datos.nombre.slice(0, 2).toUpperCase(),
      grad: 'linear-gradient(135deg,#D88AAE,#F7D0D5)',
      photo: null,
      portada: 'linear-gradient(135deg,#F7D0D5 0%,#D88AAE 50%,#893941 100%)',
      portadaFoto: null,
      bio: '',
      roles: datos.tipo === 'modista' ? ['Reparadora'] : ['Compradora'],
      zona: '',
      seguidoras: 0,
      siguiendo: 0,
      logros: []
    };
    USUARIAS.unshift(usuaria);
  } else {
    // ya existía (por ejemplo, volvió a entrar): actualizamos nombre/tipo por si cambiaron
    usuaria.nombre = datos.nombre;
    usuaria.roles  = datos.tipo === 'modista' ? ['Reparadora'] : ['Compradora'];
  }
  usuarioActivo = 'yo';
}
 
/* ════════════════════════════════════════
   UTILS
════════════════════════════════════════ */
function getUser(id) { return USUARIAS.find(u => u.id === id) || USUARIAS[0]; }
 
function esc(str) {
  return String(str || "")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
 
function renderAvHTML(user, size) {
  const fs = size * 0.36;
  const bg = user.photo ? "transparent" : user.grad;
  const inner = user.photo
    ? `<img src="${user.photo}" />`
    : `<span style="font-size:${fs}px">${user.initials}</span>`;
  return `<div class="avatar" style="width:${size}px;height:${size}px;background:${bg};">${inner}</div>`;
}
 
function setAvEl(el, user) {
  el.style.background = user.photo ? "transparent" : user.grad;
  el.innerHTML = user.photo
    ? `<img src="${user.photo}"/>`
    : `<span style="font-size:${parseFloat(el.style.width || el.offsetWidth) * 0.36}px">${user.initials}</span>`;
}
 
function leerImagen(file, cb) {
  const r = new FileReader();
  r.onload = e => cb(e.target.result);
  r.readAsDataURL(file);
}
 
/* ════════════════════════════════════════
   SELECTOR DE USUARIA
════════════════════════════════════════ */
function renderAvComposer() {
  const el = document.getElementById("av-composer");
  el.style.width = "42px"; el.style.height = "42px"; el.style.fontSize = "15px";
  setAvEl(el, getUser(usuarioActivo));
}
 
/* ════════════════════════════════════════
   NAVEGACIÓN
════════════════════════════════════════ */
function irA(tab, btn) {
  // ocultar todo
  document.querySelectorAll(".vista").forEach(v => v.classList.remove("activa"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("activo"));
 
  document.getElementById("vista-" + tab).classList.add("activa");
  if (btn) btn.classList.add("activo");
 
  tabActual    = tab;
  perfilViendo = null;
 
  document.getElementById("topbar").style.display  = "";
  document.getElementById("main-nav").style.display = "";
 
  if (tab === "logros")   renderLogros();
  if (tab === "explorar") renderExplorar();
}
 
function verPerfil(uid) {
  perfilViendo = uid;
  document.querySelectorAll(".vista").forEach(v => v.classList.remove("activa"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("activo"));
  document.getElementById("vista-perfil").classList.add("activa");
  renderPerfil(uid);
}
 
function verMiPerfil() {
  const logueada = localStorage.getItem('ecotramaUsuarioActual');
  if (!logueada) {
    if (typeof abrirRegistro === "function") abrirRegistro();
    return;
  }
  verPerfil(usuarioActivo);
  document.getElementById("nav-perfil").classList.add("activo");
}
 
function volverDesdePerfil() {
  perfilViendo = null;
  irA(tabActual, document.getElementById("nav-" + tabActual));
}
 
/* ════════════════════════════════════════
   COMPOSER
════════════════════════════════════════ */
function setTipo(tipo, btn) {
  tipoActual = tipo;
  document.querySelectorAll(".tipo-btn").forEach(b => b.classList.remove("activo"));
  btn.classList.add("activo");
  document.getElementById("composer-link-input").style.display    = tipo === "link"  ? "block" : "none";
  const media = document.getElementById("composer-media-placeholder");
  media.style.display = (tipo === "imagen" || tipo === "video") ? "flex" : "none";
}
 
function actualizarComposer() {
  const txt = document.getElementById("composer-textarea").value;
  const rest = 280 - txt.length;
  const cc = document.getElementById("char-count");
  cc.textContent = rest;
  cc.className = rest < 30 ? "warn" : "";
  document.getElementById("btn-publicar").disabled = txt.trim().length === 0;
}
 
function publicar() {
  const texto = document.getElementById("composer-textarea").value.trim();
  const link  = document.getElementById("composer-link-input").value.trim();
  if (!texto) return;
 
  posts.unshift({
    id: Date.now(), uid: usuarioActivo,
    tipo: tipoActual, texto, link: link || "",
    tiempo: "ahora",
    likes: 0, liked: false,
    compartidos: 0, compartido: false,
    coms: [],
  });
 
  document.getElementById("composer-textarea").value = "";
  document.getElementById("composer-link-input").value = "";
  setTipo("texto", document.querySelector(".tipo-btn"));
  actualizarComposer();
  renderPosts();
}
 
/* ════════════════════════════════════════
   POSTS
════════════════════════════════════════ */
function renderPosts(lista, contenedorId = "lista-posts") {
  const arr = lista || posts;
  const cont = document.getElementById(contenedorId);
  if (!arr.length) {
    cont.innerHTML = `<div class="vacio"><p class="vacio-icon">🌿</p><p class="vacio-txt">Todavía no hay publicaciones.</p></div>`;
    return;
  }
  cont.innerHTML = arr.map(htmlPost).join("");
}
 
function htmlPost(p) {
  const u = getUser(p.uid);
 
  let mediaHtml = "";
  if (p.tipo === "imagen") {
    mediaHtml = `<div class="post-media imagen">🖼️</div>`;
  } else if (p.tipo === "video") {
    mediaHtml = `<div class="post-media video">🎬<div class="play-btn">▶</div></div>`;
  } else if (p.tipo === "link" && p.link) {
    mediaHtml = `<div class="post-link-box">🔗 <span>${esc(p.link)}</span></div>`;
  }
 
  const comsHtml = p.coms.map(c => {
    const cu = getUser(c.uid);
    return `<div class="comentario">
      ${renderAvHTML(cu, 26)}
      <div class="com-burbuja">
        <span class="com-nombre">${esc(cu.nombre)}</span>${esc(c.t)}
      </div>
    </div>`;
  }).join("");
 
  return `
    <article class="post">
      <div class="post-inner">
        <div onclick="verPerfil('${p.uid}')" style="cursor:pointer;flex-shrink:0">
          ${renderAvHTML(u, 42)}
        </div>
        <div class="post-body">
          <div class="post-header">
            <span class="post-nombre" onclick="verPerfil('${p.uid}')">${esc(u.nombre)}</span>
            <span class="post-handle">${u.handle}</span>
            <span class="post-tiempo">· ${p.tiempo}</span>
          </div>
          <p class="post-texto">${esc(p.texto)}</p>
          ${mediaHtml}
          <div class="post-acciones">
            <button class="accion-btn" onclick="toggleComs(${p.id})" id="btn-coms-${p.id}">
              <span class="icon">💬</span>
              <span id="count-coms-${p.id}">${p.coms.length}</span>
            </button>
            <button class="accion-btn${p.compartido?" compartido":""}" onclick="compartir(${p.id})" id="btn-comp-${p.id}">
              <span class="icon">🔁</span>
              <span id="count-comp-${p.id}">${p.compartidos}</span>
            </button>
            <button class="accion-btn${p.liked?" liked":""}" onclick="like(${p.id})" id="btn-like-${p.id}">
              <span class="icon">${p.liked?"❤️":"🤍"}</span>
              <span id="count-like-${p.id}">${p.likes}</span>
            </button>
          </div>
          <div class="comentarios-wrap" id="coms-${p.id}">
            <div id="lista-coms-${p.id}">${comsHtml}</div>
            <div class="com-input-row">
              <input class="com-input" type="text" placeholder="Respondé..." id="input-com-${p.id}" onkeydown="if(event.key==='Enter')enviarCom(${p.id})"/>
              <button class="com-send" onclick="enviarCom(${p.id})">↑</button>
            </div>
          </div>
        </div>
      </div>
    </article>`;
}
 
/* ════════════════════════════════════════
   ACCIONES DE POST
════════════════════════════════════════ */
function like(id) {
  const p = posts.find(x => x.id === id);
  if (!p) return;
  p.liked = !p.liked;
  p.likes += p.liked ? 1 : -1;
  const btn = document.getElementById("btn-like-" + id);
  btn.className = "accion-btn" + (p.liked ? " liked" : "");
  btn.querySelector(".icon").textContent = p.liked ? "❤️" : "🤍";
  document.getElementById("count-like-" + id).textContent = p.likes;
}
 
function compartir(id) {
  const p = posts.find(x => x.id === id);
  if (!p) return;
  p.compartido = !p.compartido;
  p.compartidos += p.compartido ? 1 : -1;
  const btn = document.getElementById("btn-comp-" + id);
  btn.className = "accion-btn" + (p.compartido ? " compartido" : "");
  document.getElementById("count-comp-" + id).textContent = p.compartidos;
}
 
function toggleComs(id) {
  const wrap = document.getElementById("coms-" + id);
  const btn  = document.getElementById("btn-coms-" + id);
  const open = wrap.classList.toggle("visible");
  btn.className = "accion-btn" + (open ? " abierto" : "");
}
 
function enviarCom(id) {
  const input = document.getElementById("input-com-" + id);
  const texto = input.value.trim();
  if (!texto) return;
  const p = posts.find(x => x.id === id);
  if (!p) return;
  p.coms.push({ uid: usuarioActivo, t: texto });
  input.value = "";
  const cu = getUser(usuarioActivo);
  document.getElementById("lista-coms-" + id).insertAdjacentHTML("beforeend", `
    <div class="comentario">
      ${renderAvHTML(cu, 26)}
      <div class="com-burbuja">
        <span class="com-nombre">${esc(cu.nombre)}</span>${esc(texto)}
      </div>
    </div>`);
  document.getElementById("count-coms-" + id).textContent = p.coms.length;
}
 
/* ════════════════════════════════════════
   EXPLORAR
════════════════════════════════════════ */
function renderExplorar(q = "") {
  const filtradas = USUARIAS.filter(u =>
    u.nombre.toLowerCase().includes(q.toLowerCase()) ||
    u.handle.toLowerCase().includes(q.toLowerCase())
  );
  const cont = document.getElementById("lista-usuarias");
  if (!filtradas.length) {
    cont.innerHTML = `<div class="vacio"><p class="vacio-icon">🔍</p><p class="vacio-txt">No se encontraron resultados.</p></div>`;
    return;
  }
  cont.innerHTML = filtradas.map(u => `
    <div class="user-row" onclick="verPerfil('${u.id}')">
      ${renderAvHTML(u, 48)}
      <div>
        <p class="user-row-nombre">${esc(u.nombre)}</p>
        <p class="user-row-handle">${u.handle} · 📍 ${u.zona}</p>
      </div>
    </div>`).join("");
}
 
function buscar(q) { renderExplorar(q); }
 
/* ════════════════════════════════════════
   LOGROS
════════════════════════════════════════ */
function renderLogros() {
  const u = getUser(usuarioActivo);
  const ok = u.logros || [];
  document.getElementById("logros-inner").innerHTML = `
    <div class="logros-user-card">
      ${renderAvHTML(u, 52)}
      <div>
        <div style="font-weight:700;color:var(--jungle);font-size:15px">${esc(u.nombre)}</div>
        <div style="font-size:12.5px;color:var(--soft)">${u.handle}</div>
        <div style="font-size:12px;color:var(--soft);margin-top:2px">${ok.length}/${LOGROS_DEF.length} logros desbloqueados</div>
      </div>
    </div>
    ${LOGROS_DEF.map(l => {
      const desbloq = ok.includes(l.id);
      return `
        <div class="logro-item${desbloq?" ok":""}">
          <span class="logro-icono">${l.icon}</span>
          <div style="flex:1">
            <div class="logro-label">${l.label}</div>
            <div class="logro-desc">${l.desc}</div>
          </div>
          ${desbloq ? '<span class="logro-check">✓</span>' : ""}
        </div>`;
    }).join("")}`;
}
 
/* ════════════════════════════════════════
   PERFIL
════════════════════════════════════════ */
function renderPerfil(uid) {
  const u = getUser(uid);
  const esMio = uid === usuarioActivo;
  const misPosts = posts.filter(p => p.uid === uid);
 
  document.getElementById("perfil-nav-nombre").textContent = u.nombre;
  document.getElementById("perfil-nav-posts").textContent  = misPosts.length + " publicaciones";
 
  const portadaBg  = u.portadaFoto ? "transparent" : u.portada;
  const portadaImg = u.portadaFoto ? `<img class="portada-img" src="${u.portadaFoto}">` : "";
  const btnEditar  = esMio ? `<button class="btn-editar-perfil" onclick="abrirEditor()">✏️ Editar perfil</button>` : "";
  const btnAcciones = !esMio
    ? `<div class="perfil-acciones">
        <button class="btn-seguir">Seguir</button>
        <button class="btn-mensaje">Mensaje</button>
       </div>` : "";
 
  const postsHtml = misPosts.length === 0
    ? `<div class="vacio"><p class="vacio-icon">🌿</p><p class="vacio-txt">Todavía no publicó nada.</p></div>`
    : misPosts.map(htmlPost).join("");
 
  document.getElementById("perfil-contenido").innerHTML = `
    <div class="perfil-portada" style="background:${portadaBg}">
      ${portadaImg}
      ${btnEditar}
    </div>
    <div class="perfil-info">
      <div class="perfil-avatar-wrap">
        ${renderAvHTML({ ...u, grad: u.grad }, 66).replace('class="avatar"', 'class="avatar" style="width:66px;height:66px;font-size:24px;border:3.5px solid #fff;"')}
      </div>
      <h2 class="perfil-nombre">${esc(u.nombre)}</h2>
      <p class="perfil-handle">${u.handle}</p>
      ${u.bio ? `<p class="perfil-bio">${esc(u.bio)}</p>` : ""}
      <p class="perfil-zona">📍 ${u.zona}</p>
      <div class="perfil-stats">
        <span><strong>${u.seguidoras}</strong> seguidoras</span>
        <span><strong>${u.siguiendo}</strong> siguiendo</span>
      </div>
      ${btnAcciones}
    </div>
    ${postsHtml}`;
}
 
/* ════════════════════════════════════════
   EDITOR DE PERFIL
════════════════════════════════════════ */
function abrirEditor() {
  const u = getUser(usuarioActivo);
  editorDraft = JSON.parse(JSON.stringify(u));
 
  // portada
  const prev = document.getElementById("editor-portada-preview");
  prev.style.background      = u.portadaFoto ? "transparent" : u.portada;
  prev.style.backgroundImage = u.portadaFoto ? `url('${u.portadaFoto}')` : "";
  prev.style.backgroundSize  = u.portadaFoto ? "cover" : "";
 
  // avatar
  const av = document.getElementById("av-editor");
  av.style.width = "60px"; av.style.height = "60px"; av.style.fontSize = "22px";
  setAvEl(av, u);
 
  // campos
  document.getElementById("editor-nombre").value = u.nombre;
  document.getElementById("editor-bio").value    = u.bio || "";
  document.getElementById("editor-zona").value   = u.zona || "";
  document.getElementById("bio-count").textContent = `${(u.bio||"").length}/100`;
  document.getElementById("btn-quitar-foto").style.display = u.photo ? "block" : "none";
  actualizarEditorPreview();
 
 
  document.querySelectorAll(".vista").forEach(v => v.classList.remove("activa"));
  document.getElementById("vista-editor").classList.add("activa");
}
 
function actualizarEditorPreview() {
  const nombre = document.getElementById("editor-nombre").value;
  const bio    = document.getElementById("editor-bio").value;
  document.getElementById("editor-prev-nombre").textContent  = nombre;
  document.getElementById("editor-prev-bio").textContent     = bio || "Tu bio aparecerá acá...";
  document.getElementById("editor-prev-bio").style.color     = bio ? "var(--text)" : "var(--soft)";
  document.getElementById("editor-prev-bio").style.fontStyle = bio ? "normal" : "italic";
  const cnt = document.getElementById("bio-count");
  cnt.textContent = `${bio.length}/100`;
  cnt.className = "bio-count" + (bio.length > 90 ? " warn" : "");
}
 
function cargarFotoPerfil(input) {
  const file = input.files[0]; if (!file) return;
  leerImagen(file, src => {
    editorDraft.photo = src;
    const av = document.getElementById("av-editor");
    av.style.background = "transparent";
    av.innerHTML = `<img src="${src}"/>`;
    document.getElementById("btn-quitar-foto").style.display = "block";
  });
}
 
function quitarFotoPerfil() {
  editorDraft.photo = null;
  const av = document.getElementById("av-editor");
  const u = getUser(usuarioActivo);
  av.style.background = u.grad;
  av.innerHTML = `<span style="font-size:22px">${u.initials}</span>`;
  document.getElementById("btn-quitar-foto").style.display = "none";
}
 
function cargarFotoPortada(input) {
  const file = input.files[0]; if (!file) return;
  leerImagen(file, src => {
    editorDraft.portadaFoto = src;
    editorDraft.portada     = "transparent";
    const prev = document.getElementById("editor-portada-preview");
    prev.style.backgroundImage = `url('${src}')`;
    prev.style.backgroundSize  = "cover";
    prev.style.background      = "transparent";
    cerrarModal();
  });
}
 
function guardarPerfil() {
  const u = getUser(usuarioActivo);
  u.nombre      = document.getElementById("editor-nombre").value.trim() || u.nombre;
  u.bio         = document.getElementById("editor-bio").value.trim();
  u.zona        = document.getElementById("editor-zona").value.trim();
  u.photo       = editorDraft.photo;
  u.portada     = editorDraft.portada || u.portada;
  u.portadaFoto = editorDraft.portadaFoto;
  renderAvComposer();
  verPerfil(usuarioActivo);
  document.getElementById("nav-perfil").classList.add("activo");
}
 
function cancelarEditor() { verPerfil(usuarioActivo); }
 
/* ════════════════════════════════════════
   MODAL PORTADA
════════════════════════════════════════ */
function iniciarPortadaGrid() {
  document.getElementById("portada-grid").innerHTML = PORTADAS_OPC.map(p => `
    <button class="portada-swatch" style="background:${p}" onclick="elegirPortada('${p}')">
      <div class="portada-check">✓</div>
    </button>`).join("");
}

const AVATARS_OPC = [
  "img/avatar-auto.png",
  "img/avatar-flor.png",
  "img/avatar-peces.png",
  "img/avatar-vaquita.png",
  "img/avatar-zapatillas.png",
  "img/avatar-zapatos.png",
];

function iniciarAvatarGrid() {
  document.getElementById("avatar-grid").innerHTML = AVATARS_OPC.map(src => `
    <button class="avatar-swatch" style="background-image:url('${src}')" onclick="elegirAvatar('${src}')">
      <div class="portada-check">✓</div>
    </button>`).join("");
}

function abrirModalAvatar() {
  document.querySelectorAll(".avatar-swatch").forEach((sw, i) => {
    sw.classList.toggle("sel", AVATARS_OPC[i] === editorDraft.photo);
  });
  document.getElementById("modal-avatar").classList.add("visible");
}

function elegirAvatar(src) {
  editorDraft.photo = src;
  const av = document.getElementById("av-editor");
  av.style.background = "transparent";
  av.innerHTML = `<img src="${src}"/>`;
  document.getElementById("btn-quitar-foto").style.display = "block";
  cerrarModalAvatar();
}

function cerrarModalAvatar() {
  document.getElementById("modal-avatar").classList.remove("visible");
}

function cerrarModalAvatarSiOverlay(e) {
  if (e.target === document.getElementById("modal-avatar")) cerrarModalAvatar();
}

function abrirModalPortada() {
  // marcar la activa
  document.querySelectorAll(".portada-swatch").forEach((sw, i) => {
    sw.classList.toggle("sel", PORTADAS_OPC[i] === editorDraft.portada && !editorDraft.portadaFoto);
  });
  document.getElementById("modal-portada").classList.add("visible");
}
 
function elegirPortada(grad) {
  editorDraft.portada     = grad;
  editorDraft.portadaFoto = null;
  const prev = document.getElementById("editor-portada-preview");
  prev.style.background      = grad;
  prev.style.backgroundImage = "";
  cerrarModal();
}
 
function cerrarModal() {
  document.getElementById("modal-portada").classList.remove("visible");
}
 
function cerrarModalSiOverlay(e) {
  if (e.target === document.getElementById("modal-portada")) cerrarModal();
}