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
