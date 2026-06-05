/* TRUE AUTO GROWTH — Main JS v4 */
(function () {
  /* NAV SCROLL STATE */
  const nav = document.getElementById('nav');
  const onScroll = () => nav && nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* MOBILE MENU */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  function openMenu() {
    mobileMenu && mobileMenu.classList.add('open');
    hamburger && (hamburger.classList.add('open'), hamburger.setAttribute('aria-expanded', 'true'));
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu && mobileMenu.classList.remove('open');
    hamburger && (hamburger.classList.remove('open'), hamburger.setAttribute('aria-expanded', 'false'));
    document.body.style.overflow = '';
  }
  window.toggleMenu = () => (mobileMenu && mobileMenu.classList.contains('open')) ? closeMenu() : openMenu();
  window.closeMenu = closeMenu;
  // close mobile menu when a link is tapped
  mobileMenu && mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* TOUCH DROPDOWN (hover handles desktop via CSS) */
  if ('ontouchstart' in window) {
    document.querySelectorAll('.nav-dropdown > a').forEach(trigger => {
      trigger.addEventListener('click', e => {
        const menu = trigger.parentElement.querySelector('.nav-dropdown-menu');
        if (!menu) return;
        const open = menu.style.opacity === '1';
        document.querySelectorAll('.nav-dropdown-menu').forEach(m => { m.style.opacity = '0'; m.style.visibility = 'hidden'; m.style.pointerEvents = 'none'; });
        if (!open) { e.preventDefault(); menu.style.opacity = '1'; menu.style.visibility = 'visible'; menu.style.pointerEvents = 'all'; }
      });
    });
  }

  /* ACTIVE NAV LINK */
  const path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').replace(/\.html$/, '').replace(/\/$/, '') || '/';
    if (href === '/' && path === '/') return a.classList.add('active');
    if (href !== '/' && path.startsWith(href)) a.classList.add('active');
  });

  /* SCROLL REVEAL */
  const obs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* FAQ ACCORDION */
  document.querySelectorAll('.faq-item .faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* SMOOTH ANCHOR SCROLL WITH NAV OFFSET */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - navH - 16, behavior: 'smooth' });
      closeMenu();
    });
  });

  /* DYNAMIC YEAR */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
