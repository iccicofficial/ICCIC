/* ===================================================================
   ICCIC-2026 — page behaviors: data rendering, countdown, scroll reveal.
   Include AFTER js/components.js.
   =================================================================== */
(function () {
  'use strict';

  /* ---------- Data ---------- */
  const SPEAKERS = [
    { name: 'Adriana Simona Mihaita', role: 'Senior Lecturer · Lead, UTS Future Mobility Lab', aff: 'University of Technology Sydney, Australia' },
    { name: 'Sriparna Saha', role: 'Associate Professor, CSE', aff: 'Indian Institute of Technology, Patna, India' },
    { name: 'Alice E. Smith', role: 'Distinguished Professor, Industrial & Systems Engineering', aff: 'Auburn University, Alabama, USA' },
    { name: 'Danilo Pelusi', role: 'Professor, Computer Science', aff: 'University of Teramo, Italy' },
    { name: 'Keeley A. Crockett', role: 'Professor in Computational Intelligence', aff: 'Manchester Metropolitan University, England' },
    { name: 'Risnandar', role: 'Researcher, AI & Cybersecurity', aff: 'National Research & Innovation Agency (BRIN), Indonesia' }
  ];

  const COMMITTEE = [
    { group: 'Chief Patrons', people: [
      { name: 'P. Ramamohan Rao', aff: 'President, Vasavi Academy of Education, Hyderabad' },
      { name: 'Sri V. M. Parthasarathi', aff: 'Secretary, Vasavi Academy of Education, Hyderabad' }
    ]},
    { group: 'Patrons', people: [
      { name: 'P. Balaji', aff: 'CEO, Vasavi College of Engineering, Hyderabad' },
      { name: 'S. V. Ramana, Ph.D.', aff: 'Vasavi College of Engineering, Hyderabad' }
    ]},
    { group: 'General Chairs', people: [
      { name: 'George Ghinea, Ph.D.', aff: 'Brunel University, London, UK' },
      { name: 'Amit Kumar, Ph.D.', aff: 'BioAxis DNA Research Centre (P) Ltd, Hyderabad' },
      { name: 'T. Adilakshmi, Ph.D.', aff: 'Vasavi College of Engineering, Hyderabad' }
    ]},
    { group: 'Organizing Chairs', people: [
      { name: 'Nagaratna P. Hegde, Ph.D.', aff: 'Vasavi College of Engineering, Hyderabad' },
      { name: 'S. Vinay Kumar', aff: 'Vasavi College of Engineering, Hyderabad' },
      { name: 'Balasubramanian Raman, Ph.D.', aff: 'IIT Roorkee, India' }
    ]},
    { group: 'Technical Program Chairs', people: [
      { name: 'Thi Dieu Linh Nguyen, Ph.D.', aff: 'Hanoi University of Industry, Vietnam' },
      { name: 'Suresh Merugu, Ph.D.', aff: 'IIT Roorkee, India' }
    ]},
    { group: 'Program Chairs', people: [
      { name: 'D. Baswaraj, Ph.D.', aff: 'Vasavi College of Engineering, Hyderabad' },
      { name: 'Pelin Angin, Ph.D.', aff: 'Middle East Technical University, Turkey' },
      { name: 'Priyanka Rathi, Ph.D.', aff: 'NIT Hamirpur, India' },
      { name: 'Mohammed Usman, Ph.D.', aff: 'Bennett University, Noida, India' }
    ]},
    { group: 'Industry Track Chair', people: [
      { name: 'Suman Se', aff: 'SAP Labs' }
    ]}
  ];

  /* ---------- Helpers ---------- */
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const initials = (n) => n.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const esc = (s) => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));

  /* ---------- Speakers ---------- */
  const sg = $('#speakers-grid');
  if (sg) {
    sg.innerHTML = SPEAKERS.map(s => `
      <div class="card spk-card reveal">
        <div class="spk-avatar">${initials(s.name)}</div>
        <h3>${esc(s.name)}</h3>
        <div class="role">${esc(s.role)}</div>
        <div class="aff">${esc(s.aff)}</div>
      </div>`).join('');
  }

  /* ---------- Committee ---------- */
  const cr = $('#committee-root');
  if (cr) {
    cr.innerHTML = COMMITTEE.map(g => `
      <div class="comm-group reveal">
        <h3>${esc(g.group)}</h3>
        <div class="grid cols-3">
          ${g.people.map(p => `
            <div class="card person">
              <div class="pname">${esc(p.name)}</div>
              <div class="paff">${esc(p.aff)}</div>
            </div>`).join('')}
        </div>
      </div>`).join('');
  }

  /* ---------- Countdown ---------- */
  const elDays = $('#cd-days');
  if (elDays) {
    const target = new Date('2026-12-11T09:00:00+05:30').getTime();
    const elHours = $('#cd-hours'), elMins = $('#cd-mins'), elSecs = $('#cd-secs');
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { [elDays, elHours, elMins, elSecs].forEach(e => e && (e.textContent = '00')); return; }
      elDays.textContent = Math.floor(diff / 864e5);
      elHours.textContent = pad(Math.floor((diff % 864e5) / 36e5));
      elMins.textContent = pad(Math.floor((diff % 36e5) / 6e4));
      elSecs.textContent = pad(Math.floor((diff % 6e4) / 1e3));
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.reveal:not(.in)').forEach(el => io.observe(el));
})();
