// Generates static expanded project pages at public/projects/<slug>.html
// plus the gallery index at public/projects/index.html. Pulls the project
// data from src/projectsData.js so App.jsx and the generated pages stay
// in sync.
//
// Run:  node scripts/build-project-pages.mjs

import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { projects, filters } from '../src/projectsData.js';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(here, '..', 'public', 'projects');

const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// ------- shared CSS (clay + Sora/Manrope, matches the main site) -------
const baseCss = `
:root {
  --clay-panel-alt:#f7f8fb; --clay-panel:#eef1f5;
  --clay-highlight:rgba(255,255,255,0.9);
  --clay-shadow-soft:rgba(31,41,55,0.06);
  --clay-shadow:rgba(31,41,55,0.12);
  --ink:#1a1f2e; --muted:#5a6578;
  --accent:#2563eb; --accent-soft:#dbeafe;
  --ease:cubic-bezier(0.4,0,0.2,1);
}
* { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; }
body {
  font-family:'Manrope',sans-serif;
  background:radial-gradient(circle at top,#f5f6f8 0%,#eceff3 55%,#e7ebf0 100%);
  color:var(--ink); line-height:1.65; min-height:100vh;
}
.app { padding:24px clamp(16px,4vw,40px) 80px; max-width:1280px; margin:0 auto; }
.topbar {
  display:flex; align-items:center; justify-content:space-between; gap:24px;
  position:sticky; top:18px; z-index:5;
  background:rgba(247,248,251,0.85); backdrop-filter:blur(16px) saturate(1.6);
  -webkit-backdrop-filter:blur(16px) saturate(1.6);
  border-radius:999px; padding:14px 26px;
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 8px 32px var(--clay-shadow-soft);
  border:1px solid rgba(255,255,255,0.6);
}
.logo { font-family:'Sora',sans-serif; font-weight:700; letter-spacing:-0.03em; font-size:1.05rem; }
.topbar nav { display:flex; gap:6px; font-size:0.92rem; }
.topbar nav a {
  padding:6px 14px; border-radius:999px;
  color:var(--muted); text-decoration:none; transition:0.25s var(--ease);
}
.topbar nav a.current { color:var(--ink); font-weight:600; background:var(--accent-soft); }
.topbar nav a:hover { color:var(--ink); }
.crumbs-back {
  font-family:'Sora',sans-serif; font-size:0.82rem; color:var(--muted);
  text-decoration:none; padding:8px 14px; border-radius:999px;
}
.crumbs-back:hover { background:var(--clay-panel); color:var(--ink); }
.eyebrow {
  display:inline-flex; gap:8px;
  font-family:'Sora',sans-serif; font-size:0.7rem; letter-spacing:0.2em;
  text-transform:uppercase; color:var(--accent); font-weight:700;
  background:var(--accent-soft); padding:6px 12px; border-radius:999px;
  width:fit-content;
}
.pill-row { display:flex; gap:8px; flex-wrap:wrap; }
.pill {
  font-size:0.8rem; padding:6px 12px;
  background:#fff; border-radius:999px;
  color:var(--ink); font-weight:500;
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 3px 10px var(--clay-shadow-soft);
}
.pill.light { background:var(--clay-panel); box-shadow:none; }
`;

const projectCss = `
${baseCss}
.layout {
  display:grid; grid-template-columns:300px 1fr; gap:28px; margin-top:32px;
  align-items:start;
}
.sidebar {
  position:sticky; top:100px;
  display:flex; flex-direction:column; gap:14px;
}
.side-card {
  background:var(--clay-panel-alt); border-radius:22px; padding:22px 24px;
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 8px 24px var(--clay-shadow-soft);
  border:1px solid rgba(255,255,255,0.5);
}
.side-card .hd {
  font-family:'Sora',sans-serif; font-size:0.64rem; letter-spacing:0.2em;
  text-transform:uppercase; color:var(--accent); font-weight:700;
  padding-bottom:12px; margin-bottom:10px;
  border-bottom:1px solid rgba(31,41,55,0.08);
}
.fact-row {
  display:flex; justify-content:space-between; align-items:baseline;
  padding:7px 0; border-bottom:1px dotted rgba(31,41,55,0.08);
  font-size:0.85rem;
}
.fact-row:last-child { border-bottom:none; }
.fact-row .k {
  color:var(--muted); font-family:'Sora',sans-serif;
  font-size:0.66rem; letter-spacing:0.1em; text-transform:uppercase; font-weight:600;
}
.fact-row .v { color:var(--ink); font-weight:500; text-align:right; }
.fact-row .v.hl { color:var(--accent); font-weight:600; }
.nav-list { list-style:none; display:flex; flex-direction:column; gap:2px; }
.nav-list li a {
  display:flex; align-items:center; gap:10px;
  padding:8px 10px; border-radius:10px; text-decoration:none;
  color:var(--muted); font-size:0.88rem;
  font-family:'Sora',sans-serif; font-weight:500;
  transition:0.18s var(--ease);
}
.nav-list li a:hover,
.nav-list li a.active {
  background:var(--clay-panel); color:var(--ink);
}
.nav-list li a .n {
  color:var(--accent); font-weight:700; font-variant-numeric:tabular-nums;
  font-size:0.78rem; min-width:22px;
}
.side-card.stack .pill-row .pill { font-size:0.74rem; padding:4px 10px; }
.content { min-width:0; display:flex; flex-direction:column; gap:18px; }
.hero-card {
  background:var(--clay-panel-alt); border-radius:26px; padding:30px 34px;
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 10px 30px var(--clay-shadow-soft);
  border:1px solid rgba(255,255,255,0.5);
  display:flex; flex-direction:column; gap:12px;
}
h1 {
  font-family:'Sora',sans-serif; font-weight:600;
  font-size:clamp(2rem,3.6vw,2.6rem); letter-spacing:-0.03em; line-height:1.05;
}
h1 .ac { color:var(--accent); }
.hero-card .lede { color:var(--muted); font-size:1rem; max-width:680px; }
.star-block {
  scroll-margin-top:100px;
  display:grid; grid-template-columns:180px 1fr; gap:24px; align-items:start;
  background:var(--clay-panel-alt); border-radius:24px; padding:28px 32px;
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 8px 26px var(--clay-shadow-soft);
  border:1px solid rgba(255,255,255,0.5);
  transition:transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
}
.star-block:hover {
  transform:translateY(-2px);
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 14px 34px var(--clay-shadow);
}
.star-block .label {
  display:flex; flex-direction:column; gap:4px; padding-top:4px;
}
.star-block .label .num {
  font-family:'Sora',sans-serif; font-size:2.4rem; font-weight:700;
  line-height:1; color:var(--accent); letter-spacing:-0.03em;
}
.star-block .label .hd {
  font-family:'Sora',sans-serif; font-size:0.68rem; letter-spacing:0.22em;
  text-transform:uppercase; color:var(--muted); font-weight:700;
}
.star-block .body h2 {
  font-family:'Sora',sans-serif; font-size:1.25rem; font-weight:600;
  letter-spacing:-0.02em; line-height:1.3; margin-bottom:8px;
}
.star-block .body p {
  color:#2a3144; font-size:0.95rem; line-height:1.62; margin-bottom:6px;
}
.star-block .body p:last-child { margin-bottom:0; }
.star-block .body p strong { color:var(--ink); font-weight:600; }
.star-block .body .pill-row { margin-top:10px; }
.mini-metrics {
  display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-top:12px;
}
.mini-metrics .mini {
  background:#fff; border-radius:13px; padding:11px 14px;
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 3px 10px var(--clay-shadow-soft);
}
.mini-metrics .k {
  font-family:'Sora',sans-serif; font-size:0.56rem; letter-spacing:0.14em;
  text-transform:uppercase; color:var(--muted); font-weight:600;
}
.mini-metrics .v {
  font-family:'Sora',sans-serif; font-size:1.15rem; font-weight:700;
  color:var(--accent); margin-top:2px; letter-spacing:-0.02em;
}
.back-strip {
  display:flex; justify-content:space-between; align-items:center;
  padding:16px 22px; margin-top:8px;
  background:var(--clay-panel-alt); border-radius:18px;
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 6px 18px var(--clay-shadow-soft);
  border:1px solid rgba(255,255,255,0.5);
}
.back-strip a {
  font-family:'Sora',sans-serif; font-weight:600;
  color:var(--accent); text-decoration:none; font-size:0.9rem;
}
.back-strip .center { font-size:0.78rem; color:var(--muted); font-style:italic; }
@media (max-width:960px) {
  .layout { grid-template-columns:1fr; }
  .sidebar { position:static; }
  .star-block { grid-template-columns:1fr; gap:14px; padding:24px 26px; }
  .star-block .label { flex-direction:row; align-items:baseline; gap:14px; }
  .star-block .label .num { font-size:2rem; }
  .mini-metrics { grid-template-columns:repeat(2,1fr); }
  .topbar nav { display:none; }
}
`;

const galleryCss = `
${baseCss}
.hero {
  margin-top:36px; padding:34px 40px;
  background:var(--clay-panel-alt); border-radius:28px;
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 12px 36px var(--clay-shadow-soft);
  border:1px solid rgba(255,255,255,0.5);
  display:flex; flex-direction:column; gap:12px;
}
h1 {
  font-family:'Sora',sans-serif; font-weight:600;
  font-size:clamp(2rem,4vw,2.8rem); letter-spacing:-0.03em; line-height:1.05;
}
h1 .ac { color:var(--accent); }
.hero .lede { color:var(--muted); font-size:1rem; max-width:720px; }
.filters {
  display:flex; gap:8px; flex-wrap:wrap; margin:26px 0 18px;
}
.filter {
  font-family:'Sora',sans-serif; font-size:0.85rem; font-weight:500;
  color:var(--muted); background:var(--clay-panel-alt);
  border:1px solid rgba(255,255,255,0.5);
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 3px 10px var(--clay-shadow-soft);
  padding:8px 16px; border-radius:999px;
  cursor:pointer; transition:0.2s var(--ease);
}
.filter:hover { color:var(--ink); }
.filter.active { background:var(--ink); color:#fff; box-shadow:none; border-color:var(--ink); }
.grid {
  display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
  gap:18px;
}
.card {
  background:var(--clay-panel-alt); border-radius:22px; overflow:hidden;
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 10px 28px var(--clay-shadow-soft);
  border:1px solid rgba(255,255,255,0.5);
  display:flex; flex-direction:column;
  text-decoration:none; color:inherit;
  transition:transform 220ms var(--ease), box-shadow 220ms var(--ease);
}
.card:hover {
  transform:translateY(-4px);
  box-shadow:inset 0 1px 0 var(--clay-highlight),0 18px 40px var(--clay-shadow);
}
.card .thumb {
  height:150px; position:relative; overflow:hidden;
  background-size:cover; background-position:center;
}
.card .thumb::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.18) 100%);
}
.card .cat {
  position:absolute; top:12px; left:14px; z-index:1;
  font-family:'Sora',sans-serif; font-size:0.62rem; letter-spacing:0.2em;
  text-transform:uppercase; font-weight:700;
  color:var(--ink); background:rgba(255,255,255,0.85);
  padding:5px 10px; border-radius:999px;
  backdrop-filter:blur(6px);
}
.card .body { padding:18px 22px 20px; display:flex; flex-direction:column; gap:8px; flex:1; }
.card h3 { font-family:'Sora',sans-serif; font-size:1.05rem; font-weight:600; letter-spacing:-0.01em; line-height:1.25; }
.card p { font-size:0.86rem; color:var(--muted); flex:1; }
.card .tags { display:flex; gap:5px; flex-wrap:wrap; margin-top:4px; }
.card .tag {
  font-size:0.7rem; padding:3px 9px; background:var(--clay-panel);
  border-radius:999px; color:var(--ink); font-weight:500;
}
.card .open {
  font-family:'Sora',sans-serif; font-weight:600; font-size:0.85rem;
  color:var(--accent); margin-top:4px;
}
.empty {
  grid-column:1 / -1; text-align:center; padding:40px;
  color:var(--muted); font-style:italic;
}
@media (max-width:640px) { .topbar nav { display:none; } }
`;

// ------- individual project page -------
function projectPage(project) {
  const facts = (project.facts || [])
    .map(
      (f) =>
        `      <div class="fact-row"><span class="k">${esc(f.k)}</span><span class="v${
          f.hl ? ' hl' : ''
        }">${esc(f.v)}</span></div>`,
    )
    .join('\n');

  const renderBlock = (n, label, block, extraHtml = '') => {
    if (!block) return '';
    const chips = block.chips
      ? `\n          <div class="pill-row">${block.chips
          .map((c) => `<span class="pill light">${esc(c)}</span>`)
          .join('')}</div>`
      : '';
    return `
      <section id="${label.toLowerCase().replace(/\s+/g, '-')}" class="star-block">
        <div class="label"><span class="num">${n}</span><span class="hd">${esc(
          label,
        )}</span></div>
        <div class="body">
          <h2>${esc(block.h2)}</h2>
          <p>${esc(block.body)}</p>${chips}${extraHtml}
        </div>
      </section>`;
  };

  const metrics = project.star?.result?.metrics;
  const metricsHtml = metrics
    ? `\n          <div class="mini-metrics">${metrics
        .map(
          (m) =>
            `<div class="mini"><div class="k">${esc(m.k)}</div><div class="v">${esc(
              m.v,
            )}</div></div>`,
        )
        .join('')}</div>`
    : '';

  const navItems = [
    ['01', 'The Problem', '#the-problem'],
    ['02', 'My Approach', '#my-approach'],
    ['03', 'The Action', '#the-action'],
    ['04', 'The Result', '#the-result'],
  ]
    .map(
      ([n, label, href]) =>
        `<li><a href="${href}"><span class="n">${n}</span>${esc(label)}</a></li>`,
    )
    .join('\n          ');

  const tagPills = (project.tags || [])
    .map((t) => `<span class="pill">${esc(t)}</span>`)
    .join('');

  // title gets the last word wrapped in accent color
  const words = project.title.trim().split(/\s+/);
  const tail = words.pop();
  const titleHtml = `${esc(words.join(' '))} <span class="ac">${esc(tail)}.</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(project.title)} · Joshua Tarara</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>${projectCss}</style>
</head>
<body>
<div class="app">
  <header class="topbar">
    <div class="logo">Joshua Tarara</div>
    <nav>
      <a href="/#about">About</a>
      <a href="/#skills">Skills</a>
      <a href="/#experience">Experience</a>
      <a class="current" href="/projects/index.html">Projects</a>
      <a href="/#education">Education</a>
    </nav>
    <a class="crumbs-back" href="/projects/index.html">← All projects</a>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <div class="side-card">
        <div class="hd">Fact Sheet</div>
${facts}
      </div>
      <div class="side-card">
        <div class="hd">On This Page</div>
        <ul class="nav-list">
          ${navItems}
        </ul>
      </div>
      <div class="side-card stack">
        <div class="hd">Tech Stack</div>
        <div class="pill-row">${tagPills}</div>
      </div>
    </aside>

    <main class="content">
      <div class="hero-card">
        <span class="eyebrow">${esc(project.category)} · ${esc(
          project.timeframe || '',
        )}</span>
        <h1>${titleHtml}</h1>
        <p class="lede">${esc(project.description)}</p>
      </div>
${renderBlock('01', 'The Problem', project.star?.problem)}
${renderBlock('02', 'My Approach', project.star?.approach)}
${renderBlock('03', 'The Action', project.star?.action)}
${renderBlock(
  '04',
  'The Result',
  project.star?.result,
  metricsHtml,
)}
      <div class="back-strip">
        <a href="/projects/index.html">← All projects</a>
        <span class="center">${esc(project.category)}</span>
        <a href="/#projects">Back to home →</a>
      </div>
    </main>
  </div>
</div>

<script>
  (function () {
    const links = document.querySelectorAll('.nav-list a');
    const sections = Array.from(links)
      .map((a) => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = '#' + e.target.id;
        links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === id));
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach((s) => io.observe(s));
  })();
</script>
</body>
</html>
`;
}

// ------- gallery page -------
function galleryPage() {
  const cards = projects
    .map((p) => {
      const bg = p.imageUrl
        ? `background-image:url(${p.imageUrl});`
        : `background-image:${p.gradient};`;
      const tags = (p.tags || [])
        .slice(0, 3)
        .map((t) => `<span class="tag">${esc(t)}</span>`)
        .join('');
      return `        <a class="card" href="/projects/${p.slug}.html" data-category="${esc(
        p.category,
      )}">
          <div class="thumb" style="${bg}"><span class="cat">${esc(p.category)}</span></div>
          <div class="body">
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.description)}</p>
            <div class="tags">${tags}</div>
            <span class="open">View project →</span>
          </div>
        </a>`;
    })
    .join('\n');

  const filterButtons = filters
    .map(
      (f) =>
        `<button class="filter${f === 'All' ? ' active' : ''}" data-filter="${esc(
          f,
        )}" type="button">${esc(f)}</button>`,
    )
    .join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>All Projects · Joshua Tarara</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>${galleryCss}</style>
</head>
<body>
<div class="app">
  <header class="topbar">
    <div class="logo">Joshua Tarara</div>
    <nav>
      <a href="/#about">About</a>
      <a href="/#skills">Skills</a>
      <a href="/#experience">Experience</a>
      <a class="current" href="/projects/index.html">Projects</a>
      <a href="/#education">Education</a>
    </nav>
    <a class="crumbs-back" href="/">← Back to site</a>
  </header>

  <section class="hero">
    <h1>Every project I&rsquo;ve <span class="ac">shipped.</span></h1>
    <p class="lede">The full catalog — defense housings, RF layouts, fixturing, mechatronics, UAS, computer vision, and business-development work. Filter by area, then click a card for the full write-up.</p>
  </section>

  <div class="filters">
    ${filterButtons}
  </div>

  <div class="grid" id="grid">
${cards}
  </div>
</div>

<script>
  (function () {
    const buttons = document.querySelectorAll('.filter');
    const cards = document.querySelectorAll('.card');
    const grid = document.getElementById('grid');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter;
        buttons.forEach((b) => b.classList.toggle('active', b === btn));
        let shown = 0;
        cards.forEach((c) => {
          const match = f === 'All' || c.dataset.category === f;
          c.style.display = match ? '' : 'none';
          if (match) shown++;
        });
        const existing = grid.querySelector('.empty');
        if (existing) existing.remove();
        if (!shown) {
          const div = document.createElement('div');
          div.className = 'empty';
          div.textContent = 'No projects in this category yet.';
          grid.appendChild(div);
        }
      });
    });
  })();
</script>
</body>
</html>
`;
}

// ------- main -------
async function run() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  for (const p of projects) {
    const path = resolve(outDir, `${p.slug}.html`);
    await writeFile(path, projectPage(p), 'utf8');
    console.log('wrote', `public/projects/${p.slug}.html`);
  }

  const indexPath = resolve(outDir, 'index.html');
  await writeFile(indexPath, galleryPage(), 'utf8');
  console.log('wrote', 'public/projects/index.html');

  console.log(`\nDone — ${projects.length} project pages + gallery.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
