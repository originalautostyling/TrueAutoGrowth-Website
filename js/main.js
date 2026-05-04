// TRUE AUTO GROWTH — Shared JS

// Nav scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger + mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
  const open = mobileMenu?.classList.toggle('open');
  hamburger?.classList.toggle('open', open);
  // lock body scroll when menu open
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMenu() {
  mobileMenu?.classList.remove('open');
  hamburger?.classList.remove('open');
  document.body.style.overflow = '';
}
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;

// Close menu on outside click
document.addEventListener('click', e => {
  if (mobileMenu?.classList.contains('open') && !mobileMenu.contains(e.target) && !hamburger?.contains(e.target)) closeMenu();
});

// Active nav link
(function () {
  const path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').replace(/\.html$/, '').replace(/\/$/, '') || '/';
    if (href !== '/' && path.startsWith(href)) a.classList.add('active');
    if (href === '/' && path === '/') a.classList.add('active');
  });
})();

// Scroll reveal
const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.07 }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q')?.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Smooth scroll with nav offset
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMenu();
    }
  });
});

// Form submit handler
window.handleSubmit = function(btn) {
  btn.innerHTML = '&#10003;&nbsp; Submitted. We will be in touch shortly.';
  btn.style.background = '#0f7a3e';
  btn.disabled = true;
};
