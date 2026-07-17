
/* --- Navigation active au scroll --- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function setActive() {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY + window.innerHeight * 0.35 >= s.offsetTop) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}
window.addEventListener('scroll', setActive, { passive: true });
setActive();

/* Smooth scroll */
navLinks.forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        closeSidebar();
      }
    }
  });
});

/* --- Menu mobile --- */
const toggle  = document.getElementById('menuToggle');
const sidebarEl = document.getElementById('sidebar');
const overlayEl = document.getElementById('menuOverlay');

function closeSidebar() {
  sidebarEl.classList.remove('open');
  overlayEl.classList.remove('open');
  toggle.classList.remove('open');
  document.body.style.overflow = '';
}
function openSidebar() {
  sidebarEl.classList.add('open');
  overlayEl.classList.add('open');
  toggle.classList.add('open');
  /* Empêche le scroll du fond quand la sidebar est ouverte */
  document.body.style.overflow = 'hidden';
}
toggle.addEventListener('click', () => {
  sidebarEl.classList.contains('open') ? closeSidebar() : openSidebar();
});
overlayEl.addEventListener('click', closeSidebar);

/* --- Reveal au scroll --- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 85);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* --- Barres de compétences --- */
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      skillObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('#about').forEach(s => skillObs.observe(s));

/* --- Effet de frappe --- */
const roles = [
  'Développeur Web Full Stack',
  'Étudiant L3 Génie Logiciel',
  'Passionné Backend & IA',
  'Futur Ingénieur Logiciel'
];
let ri = 0, ci = 0, del = false;
const typer = document.getElementById('typing-text');

function type() {
  const w = roles[ri];
  if (!del) {
    typer.textContent = w.slice(0, ++ci);
    if (ci === w.length) { del = true; setTimeout(type, 2200); return; }
  } else {
    typer.textContent = w.slice(0, --ci);
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 45 : 75);
}
type();

/* --- Formulaire de contact --- */
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('f-name').value;
  const email   = document.getElementById('f-email').value;
  const subject = document.getElementById('f-subject').value;
  const message = document.getElementById('f-message').value;

  const body = encodeURIComponent(
    'Nom : ' + name + '\nEmail : ' + email + '\n\n' + message
  );
  window.location.href = 'mailto:ouattarafulbert5@gmail.com'
    + '?subject=' + encodeURIComponent(subject)
    + '&body=' + body;

  const btn = this.querySelector('.btn-amber');
  const orig = btn.innerHTML;
  btn.innerHTML = '✓ Ouvert dans votre messagerie !';
  btn.style.background = 'var(--green)';
  setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 4000);
});
