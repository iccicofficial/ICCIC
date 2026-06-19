# ICCIC-2026 — Conference Website

A fast, responsive, **multi-page** website for the **6th International Conference on Cognitive & Intelligent Computing (ICCIC-2026)**, hosted by Vasavi College of Engineering, Hyderabad, India.

Built with plain **HTML + CSS + JavaScript** — no build step, no dependencies — so it runs directly on **GitHub Pages**.

## Structure

```
.
├── index.html              # Home — hero, banner, countdown, highlights, CTA
├── about.html              # About + why attend
├── tracks.html             # Tracks & topics of interest
├── speakers.html           # Keynote speakers (data-driven)
├── committee.html          # Full organising committee (data-driven)
├── call-for-papers.html    # CFP, important dates, guidelines, publication
├── registration.html       # Registration categories & inclusions
├── venue.html              # Venue, travel & accommodation (embedded map)
├── contact.html            # Coordinators, secretariat & map
├── css/styles.css          # Design system, layout, responsive, animations
├── js/
│   ├── components.js        # Shared nav + footer, injected on every page
│   └── main.js             # Countdown, scroll-reveal, speakers/committee data
├── assets/
│   ├── logo.svg            # Brand mark (neural-network badge)
│   └── banner.svg          # Hero illustration (network + smart-city)
├── .nojekyll               # Tells GitHub Pages to serve files as-is
└── README.md
```

## How the shared header/footer works

To avoid duplicating the navigation bar and footer across nine pages, every page contains two empty mounts:

```html
<div id="site-header"></div>
...
<div id="site-footer"></div>
```

`js/components.js` injects the real nav + footer into these and highlights the
current page automatically. **To add or rename a nav item, edit the `PAGES`
array at the top of `js/components.js` once** — it updates everywhere.

## Edit the content

- **Speakers & Committee** — edit the `SPEAKERS` / `COMMITTEE` arrays in `js/main.js`.
- **Nav links** — edit the `PAGES` array in `js/components.js`.
- **Dates, fees, tracks, text** — edit the relevant `.html` file directly.
- **Countdown target** — `const target = ...` in `js/main.js`.
- **Submission link** — the Microsoft CMT URL (`cmt3.research.microsoft.com/ICCIC2025`) appears in `js/components.js` and on the CFP/home pages; update when the 2026 portal opens.
- **Logo / banner** — replace `assets/logo.svg` / `assets/banner.svg`.

## Run locally

The shared header/footer is injected with JavaScript, so open via a local
server (not `file://`) for everything to load:

```bash
python -m http.server 8000   # then visit http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push these files to the `main` branch.
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, Folder = `/ (root)`.
3. Save — your site goes live at `https://<username>.github.io/<repo>/` within a minute.

> A custom domain (e.g. `iccic2026.org`) can be added under the same Pages settings via a `CNAME`.

## Before launch — confirm these

- The 2025 site is the **5th** edition; this site is built as the **6th** edition (**ICCIC-2026**). Adjust if your numbering differs.
- All **dates and fees are tentative/indicative** — replace with official figures once finalised.
- The keynote line-up is carried over from the previous edition as a placeholder; update once the 2026 speakers are confirmed.

---
Content sourced and adapted from the previous edition: <https://sites.google.com/view/iccic2025/>
