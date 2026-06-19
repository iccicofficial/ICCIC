/* ===================================================================
   ICCIC-2026 — shared header & footer, injected on every page.
   Include BEFORE js/main.js.
   =================================================================== */
(function () {
  'use strict';

  const PAGES = [
    { href: 'index.html',          label: 'Home' },
    { href: 'about.html',          label: 'About' },
    { href: 'history.html',        label: 'History' },
    { href: 'tracks.html',         label: 'Tracks' },
    { href: 'speakers.html',       label: 'Speakers' },
    { href: 'committee.html',      label: 'Committee' },
    { href: 'call-for-papers.html',label: 'Papers' },
    { href: 'registration.html',   label: 'Register' },
    { href: 'venue.html',          label: 'Venue' },
    { href: 'contact.html',        label: 'Contact' }
  ];

  const CMT = 'https://cmt3.research.microsoft.com/ICCIC2026';

  // Current file name (default to index.html)
  let current = location.pathname.split('/').pop() || 'index.html';
  if (current === '') current = 'index.html';

  /* ---------- Header ---------- */
  const links = PAGES.map(p =>
    `<a href="${p.href}"${p.href === current ? ' class="active"' : ''}>${p.label}</a>`
  ).join('');

  const headerHTML = `
    <div class="progress-bar" id="progress"></div>
    <header class="nav" id="nav">
      <div class="container nav-inner">
        <a href="index.html" class="brand">
          <img class="logo-img" src="assets/logo.svg" alt="ICCIC logo" width="44" height="44" />
          <span>ICCIC-2026<small>Cognitive &amp; Intelligent Computing</small></span>
        </a>
        <nav class="nav-links" id="navLinks">
          ${links}
          <a href="${CMT}" target="_blank" rel="noopener" class="btn btn-primary nav-cta">Submit Paper</a>
        </nav>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>`;

  /* ---------- Footer ---------- */
  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a href="index.html" class="brand" style="margin-bottom:1rem;">
              <img class="logo-img" src="assets/logo.svg" alt="ICCIC logo" width="44" height="44" />
              <span>ICCIC-2026<small>Cognitive &amp; Intelligent Computing</small></span>
            </a>
            <p class="muted" style="max-width:34ch;">The 6th International Conference on Cognitive &amp; Intelligent Computing, hosted by Vasavi College of Engineering, Hyderabad, India.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="about.html">About</a></li>
              <li><a href="history.html">History &amp; Past Editions</a></li>
              <li><a href="tracks.html">Tracks</a></li>
              <li><a href="speakers.html">Speakers</a></li>
              <li><a href="committee.html">Committee</a></li>
            </ul>
          </div>
          <div>
            <h4>Participate</h4>
            <ul>
              <li><a href="call-for-papers.html">Call for Papers</a></li>
              <li><a href="registration.html">Registration</a></li>
              <li><a href="venue.html">Venue &amp; Travel</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:convenericcic@gmail.com">convenericcic@gmail.com</a></li>
              <li><a href="tel:+919849115882">+91 98491 15882</a></li>
              <li class="muted">Ibrahimbagh, Hyderabad &ndash; 500031</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 ICCIC · Vasavi College of Engineering. All rights reserved.</span>
          <span>Springer · Scopus-Indexed Proceedings</span>
        </div>
      </div>
    </footer>
    <button class="to-top" id="toTop" aria-label="Back to top">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>`;

  /* ---------- Inject ---------- */
  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');
  if (headerMount) headerMount.outerHTML = headerHTML;
  if (footerMount) footerMount.outerHTML = footerHTML;

  /* ---------- Behaviors ---------- */
  const $ = (s) => document.querySelector(s);
  const nav = $('#nav');
  const hamburger = $('#hamburger');
  const navLinks = $('#navLinks');
  const progress = $('#progress');
  const toTop = $('#toTop');

  function onScroll() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
    if (progress) {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      progress.style.width = (p || 0) + '%';
    }
    if (toTop) toTop.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }));
  }
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
