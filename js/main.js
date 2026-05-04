/* TRUE AUTO GROWTH — Main JS v3 */

(function () {

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ── HAMBURGER / MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function openMenu() {
    mobileMenu?.classList.add('open');
    hamburger?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function toggleMenu() {
    mobileMenu?.classList.contains('open') ? closeMenu() : openMenu();
  }

  window.toggleMenu = toggleMenu;
  window.closeMenu = closeMenu;

  // Close on outside tap
  document.addEventListener('click', (e) => {
    if (
      mobileMenu?.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger?.contains(e.target)
    ) closeMenu();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── DESKTOP DROPDOWN ──
     Pure CSS handles hover (opacity/visibility in stylesheet).
     JS only needed for touch devices where hover doesn't exist.
  ── */
  if ('ontouchstart' in window) {
    document.querySelectorAll('.nav-dropdown > a').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const parent = trigger.closest('.nav-dropdown');
        const menu = parent?.querySelector('.nav-dropdown-menu');
        if (!menu) return;
        const isVisible = menu.style.opacity === '1';
        // Close all
        document.querySelectorAll('.nav-dropdown-menu').forEach(m => {
          m.style.opacity = '0';
          m.style.pointerEvents = 'none';
          m.style.visibility = 'hidden';
        });
        if (!isVisible) {
          e.preventDefault(); // prevent nav if just opening
          menu.style.opacity = '1';
          menu.style.pointerEvents = 'all';
          menu.style.visibility = 'visible';
        }
      });
    });
    // Close touch dropdowns on outside tap
    document.addEventListener('touchstart', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown-menu').forEach(m => {
          m.style.opacity = '0';
          m.style.pointerEvents = 'none';
          m.style.visibility = 'hidden';
        });
      }
    }, { passive: true });
  }

  /* ── ACTIVE NAV LINK ── */
  const path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').replace(/\.html$/, '').replace(/\/$/, '') || '/';
    if (href === '/' && path === '/') { a.classList.add('active'); return; }
    if (href !== '/' && path.startsWith(href)) a.classList.add('active');
  });

  /* ── SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.07, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q')?.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── SMOOTH SCROLL (anchor links) ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMenu();
      }
    });
  });

  /* ── FORM SUBMIT HANDLER ── */
  window.handleSubmit = function (btn) {
    btn.innerHTML = '&#10003;&nbsp;Submitted. We will be in touch within 1 to 2 business days.';
    btn.style.background = '#0f7a3e';
    btn.disabled = true;
  };

})();
