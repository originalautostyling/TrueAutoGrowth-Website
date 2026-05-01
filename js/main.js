// TRUE AUTO GROWTH — Shared JS

// Nav scroll
window.addEventListener('scroll', () => {
  document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
function toggleMenu() { document.getElementById('mobileMenu')?.classList.toggle('open'); }
function closeMenu() { document.getElementById('mobileMenu')?.classList.remove('open'); }

// Active nav link
(function () {
  const path = window.location.pathname.replace(/\.html$/, '');
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = (a.getAttribute('href') || '').replace(/\.html$/, '');
    if (href && href !== '/' && path.includes(href.replace(/^\//, ''))) a.classList.add('active');
    if ((href === '/' || href === '/index') && (path === '/' || path === '/index' || path === '')) a.classList.add('active');
  });
})();

// Scroll reveal
const obs = new IntersectionObserver(
  es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.07 }
);
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q')?.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const t = document.querySelector(id);
    if (t && id !== '#') {
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
      closeMenu();
    }
  });
});

// Form submit
window.handleSubmit = function(btn) {
  btn.innerHTML = '&#10003;&nbsp; Submitted — We\'ll be in touch shortly.';
  btn.style.background = '#0f7a3e';
  btn.disabled = true;
};
