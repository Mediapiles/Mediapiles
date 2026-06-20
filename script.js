/* ============================================================
   PROJECTS — your content lives here.
   title / tag / dur, and src = YouTube | Vimeo | .mp4 link.
   ============================================================ */
const CDN = "https://pub-e5fb502ae11948c795dce1a107c460ca.r2.dev";
const PROJECTS = {
  reels: [
    { title: "EDIT #01", tag: "Retention Hook", dur: "0:28", src: `${CDN}/a%20(1).mp4` },
    { title: "EDIT #02", tag: "Kinetic Style", dur: "0:41", src: `${CDN}/a%20(2).mp4` },
    { title: "EDIT #03", tag: "Jump Cuts", dur: "0:18", src: `${CDN}/a%20(3).mp4` },
    { title: "EDIT #04", tag: "Promo Edit", dur: "0:32", src: `${CDN}/a%20(4).mp4` },
    { title: "EDIT #05", tag: "Talking Head", dur: "0:55", src: `${CDN}/a%20(5).mp4` },
    { title: "EDIT #06", tag: "Visual Hook", dur: "0:24", src: `${CDN}/a%20(6).mp4` },
    { title: "EDIT #07", tag: "Micro-Content", dur: "0:15", src: `${CDN}/a%20(7).mp4` },
    { title: "EDIT #08", tag: "Social Promo", dur: "0:30", src: `${CDN}/a%20(8).mp4` },
    { title: "EDIT #09", tag: "Dynamic Cut", dur: "0:38", src: `${CDN}/a%20(9).mp4` },
    { title: "EDIT #10", tag: "SaaS Teaser", dur: "0:45", src: `${CDN}/a%20(10).mp4` },
    { title: "EDIT #11", tag: "Podcast Clip", dur: "0:22", src: `${CDN}/a%20(11).mp4` },
    { title: "EDIT #12", tag: "Cinematic Reel", dur: "0:27", src: `${CDN}/a%20(12).mp4` },
    { title: "EDIT #13", tag: "Ad Cutdown", dur: "0:16", src: `${CDN}/a%20(13).mp4` },
    { title: "EDIT #14", tag: "TikTok Hook", dur: "0:50", src: `${CDN}/a%20(14).mp4` },
    { title: "EDIT #15", tag: "Action Montage", dur: "0:19", src: `${CDN}/a%20(15).mp4` },
    { title: "EDIT #16", tag: "UGC Style", dur: "0:33", src: `${CDN}/a%20(16).mp4` },
    { title: "EDIT #17", tag: "Explainer Edit", dur: "0:21", src: `${CDN}/a%20(17).mp4` },
    { title: "EDIT #18", tag: "Trending Short", dur: "0:12", src: `${CDN}/a%20(18).mp4` },
    { title: "EDIT #19", tag: "Motion Loop", dur: "0:29", src: `${CDN}/a%20(19).mp4` },
    { title: "EDIT #20", tag: "Aesthetic Vibe", dur: "0:14", src: `${CDN}/a%20(20).mp4` },
    { title: "EDIT #21", tag: "Pacing Flow", dur: "0:26", src: `${CDN}/a%20(21).mp4` },
    { title: "EDIT #22", tag: "Teaser Hook", dur: "0:10", src: `${CDN}/a%20(22).mp4` },
    { title: "EDIT #23", tag: "Storytelling", dur: "0:58", src: `${CDN}/a%20(23).mp4` },
    { title: "EDIT #24", tag: "Creative Cut", dur: "0:23", src: `${CDN}/a%20(24).mp4` },
    { title: "EDIT #25", tag: "Overlay FX", dur: "0:17", src: `${CDN}/a%20(25).mp4` }
  ],
  longform: [
    { title: "PRODUCTION #01", tag: "Cinematic Narrative", dur: "3:42", src: `${CDN}/1%20(1).mp4` },
    { title: "PRODUCTION #02", tag: "Product Showcase", dur: "48:10", src: `${CDN}/1%20(2).mp4` },
    { title: "PRODUCTION #03", tag: "Real Estate", dur: "4:18", src: `${CDN}/1%20(4).mp4` },
    { title: "PRODUCTION #04", tag: "Documentary Short", dur: "6:05", src: `${CDN}/1%20(5).mp4` }
  ]
};

/* marquee words */
const MQ = ["REELS", "SHORTS", "ADS", "PODCASTS", "BRAND FILMS"];
const mqHTML = MQ.map(w => `<span>${w}</span><b>/</b>`).join('');
document.getElementById('mqTrack').innerHTML = mqHTML + mqHTML;

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const IO = 'IntersectionObserver' in window;

/* ---- Shuffle hero videos on every reload ---- */
(function shuffleHero() {
  const pool = [...PROJECTS.reels];
  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const picks = pool.slice(0, 3);
  const frames = document.querySelectorAll('.hframe');
  frames.forEach((frame, i) => {
    if (!picks[i]) return;
    // Create a fresh video element — more reliable than modifying existing ones
    const v = document.createElement('video');
    v.className = 'media';
    v.dataset.src = picks[i].src;
    v.src = picks[i].src;
    v.muted = true;
    v.loop = true;
    v.autoplay = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('preload', 'auto');
    // Insert before grain div so it sits in the right layer
    const grain = frame.querySelector('.grain');
    frame.insertBefore(v, grain);
    // Update the duration badge
    const dur = frame.querySelector('.dur');
    if (dur) dur.textContent = picks[i].dur;
    v.play().catch(() => { });
  });
})();

/* turn any link into an inline, muted, looping autoplay source */
function parseEmbed(src) {
  if (!src) return null;
  let m;
  if ((m = src.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/))) {
    const id = m[1];
    return { type: 'embed', url: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&playsinline=1&modestbranding=1` };
  }
  if ((m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/)))
    return { type: 'embed', url: `https://player.vimeo.com/video/${m[1]}?background=1&autoplay=1&muted=1&loop=1` };
  return { type: 'mp4', url: src };
}

function buildCard(p, vertical) {
  const card = document.createElement('div');
  if (vertical) card.className = 'reel';
  const parsed = parseEmbed(p.src);
  let media = '';
  if (parsed && parsed.type === 'mp4') {
    // Reels get autoplay, loop, muted. Longform get controls.
    if (vertical) {
      media = `<video class="media" data-src="${parsed.url}" autoplay muted loop playsinline preload="none"></video>`;
    } else {
      media = `<video class="media" data-src="${parsed.url}" controls playsinline preload="none"></video>`;
    }
  } else if (parsed && parsed.type === 'embed') {
    media = `<div class="media embed" data-embed="${parsed.url}"></div>`;
  }
  card.innerHTML = `
    <article class="clip">
      <div class="clip-frame">
        <div class="tone"></div><div class="grain"></div>
        ${media}
        <div class="vig"></div>
        <div class="dur">${p.dur}</div>
      </div>
      <div class="clip-meta">
        <h3>${p.title}</h3>
        <span class="tag">${p.tag}</span>
      </div>
    </article>`;
  return card;
}

const reelStrip = document.getElementById('reelStrip');
PROJECTS.reels.forEach((p, i) => { const c = buildCard(p, true); c.style.setProperty('--i', i % 6); reelStrip.appendChild(c); });
const longGrid = document.getElementById('longGrid');
PROJECTS.longform.forEach((p, i) => { const c = buildCard(p, false); c.style.setProperty('--i', i); longGrid.appendChild(c); });

if ('IntersectionObserver' in window) {

  /* --- TIER 1: Preload observer --- */
  const preloadObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting && !v.src && v.dataset.src) {
        v.src = v.dataset.src;
        v.preload = v.hasAttribute('controls') ? 'metadata' : 'auto';
        v.load();
        v.addEventListener('loadeddata', () => v.closest('.clip-frame').classList.add('loaded'), { once: true });
        preloadObs.unobserve(v);
      }
    });
  }, { rootMargin: '1000px 0px', threshold: 0 });

  /* --- TIER 2: Play observer (only for reels) --- */
  const playObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const v = e.target;
      // We only autoplay reels (videos without controls)
      if (v.hasAttribute('controls')) return;

      if (e.isIntersecting) {
        v.dataset.visible = 'true';
        if (!v.src && v.dataset.src) {
          v.src = v.dataset.src;
          v.preload = 'auto';
          v.load();
          v.addEventListener('loadeddata', () => v.closest('.clip-frame').classList.add('loaded'), { once: true });
        }
        v.play().catch(() => { });
      } else {
        v.dataset.visible = 'false';
        v.pause();
      }
    });
  }, { rootMargin: '100px 0px', threshold: 0.01 });

  document.querySelectorAll('video.media').forEach(v => {
    preloadObs.observe(v);
    playObs.observe(v);
  });

} else {
  document.querySelectorAll('video.media').forEach(v => {
    if (!v.src && v.dataset.src) { v.src = v.dataset.src; v.preload = 'auto'; }
    if (!v.hasAttribute('controls')) {
      v.dataset.visible = 'true';
      v.play().catch(() => { });
    }
  });
}

/* ---- Lazy-load iframes when they enter view ---- */
if ('IntersectionObserver' in window) {
  const embedObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const el = e.target;
      if (e.isIntersecting && el.classList.contains('embed') && !el.dataset.loaded) {
        el.dataset.loaded = '1';
        el.innerHTML = `<iframe src="${el.dataset.embed}" allow="autoplay; fullscreen" frameborder="0"></iframe>`;
      }
    });
  }, { threshold: 0.01 });
  document.querySelectorAll('.embed').forEach(el => embedObs.observe(el));
}

/* ---- Resume visible videos when tab regains focus or on first tap ---- */
function resumeVisibleVideos() {
  document.querySelectorAll('video.media[data-visible="true"]').forEach(v => {
    if (v.src && v.paused && !v.hasAttribute('controls')) v.play().catch(() => { });
  });
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') resumeVisibleVideos();
});
['click', 'touchstart'].forEach(evt =>
  document.addEventListener(evt, resumeVisibleVideos, { once: true, passive: true })
);

/* CLIENTS — client success metrics and logos from the previous version */
const CLIENTS = [
  {
    name: "Caffeinated Blogger", mono: "CB", color: "var(--brand)", logo: "Clients/CaffeinatedBlogger.jpg",
    before: [5000, 5200, 4800, 5500, 6000, 5800], after: [12000, 25000, 45000, 80000, 150000, 210000], stats: [
      { num: "+15.2", unit: "K", label: "Subscriber growth in 3 months" },
      { num: "4,200", unit: "+", label: "High engagement rate" },
      { num: "12", unit: " Properties Sold", label: "Directly from YouTube leads" },
    ]
  },
  {
    name: "Eness Yilmazer", mono: "EY", color: "var(--ink)", logo: "Clients/Eness Yilmazer.jpg",
    before: [10000, 11000, 10500, 12000, 11500, 13000], after: [20000, 45000, 90000, 180000, 320000, 450000], stats: [
      { num: "+45.5", unit: "K", label: "Since editing rebrand" },
      { num: "12,500", unit: "+", label: "Community interaction" },
      { num: "850", unit: "+ Memberships", label: "New online coaching clients" },
    ]
  },
  {
    name: "Real Estate Report", mono: "RE", color: "var(--pop)", logo: "Clients/Real.Estate.Report.jpg",
    before: [2000, 2100, 2300, 2000, 2500, 2400], after: [15000, 30000, 55000, 95000, 120000, 185000], stats: [
      { num: "+8.4", unit: "K", label: "Organic subscribers" },
      { num: "3,100", unit: "+", label: "Product questions & hype" },
      { num: "$145", unit: "K Revenue", label: "Attributed to short reels" },
    ]
  },
  {
    name: "Sonu Sharma", mono: "SS", color: "var(--brand-deep)", logo: "Clients/Sonu Sharma.jpg",
    before: [50000, 55000, 52000, 60000, 58000, 65000], after: [80000, 150000, 350000, 800000, 1200000, 2500000], stats: [
      { num: "+110", unit: "K", label: "Subscribers gained" },
      { num: "45,000", unit: "+", label: "Viral engagement peak" },
      { num: "2,100", unit: "+ Tickets", label: "Event sales through shorts" },
    ]
  },
  {
    name: "The Ramsey Show", mono: "RS", color: "var(--brand)", logo: "Clients/TheRamseyShow.jpg",
    before: [8000, 8500, 8200, 9000, 8800, 9500], after: [18000, 32000, 60000, 110000, 200000, 310000], stats: [
      { num: "+22.1", unit: "K", label: "Growth in 4 months" },
      { num: "6,800", unit: "+", label: "Higher audience retention" },
      { num: "45", unit: " New Clients", label: "Through organic video reach" },
    ]
  },
  {
    name: "Kallaway Marketing", mono: "KM", color: "var(--pop)", logo: "Clients/kallawaymarketing.jpg",
    before: [15000, 16000, 15500, 17000, 16500, 18000], after: [25000, 50000, 120000, 250000, 400000, 600000], stats: [
      { num: "+32.4", unit: "K", label: "Subscribers added" },
      { num: "18,200", unit: "+", label: "Actionable discussion" },
      { num: "320", unit: "+ Course Sales", label: "Driven by video content" },
    ]
  },
];

const clientsEl = document.getElementById('clients');
const resultsEl = document.getElementById('statGrid');
const chartEl = document.getElementById('chart');

clientsEl.innerHTML = CLIENTS.map((c, i) => `
  <button class="client${i === 0 ? ' active' : ''}" data-i="${i}" aria-pressed="${i === 0}">
    <span class="av" style="background:${c.color}; overflow: hidden; display: flex; align-items: center; justify-content: center;">
      ${c.logo ? `<img src="${c.logo}" alt="${c.name}">` : c.mono}
    </span>
    ${c.name}
  </button>
`).join('');

function renderStats(c) {
  resultsEl.innerHTML = c.stats.map(s => `
    <div class="stat">
      <div class="num">
        <span class="val" data-raw="${s.num}">${s.num}</span>${s.unit ? `<span class="u">${s.unit}</span>` : ''}
      </div>
      <div class="lbl">${s.label}</div>
    </div>
  `).join('');
}

function chartSVG(c) {
  const before = c.before, after = c.after, n = after.length;
  const W = 580, H = 230, L = 12, R = 12, T = 16, B = 26;
  const max = Math.max(...after, ...before) * 1.12;
  const X = i => L + i * ((W - L - R) / (n - 1));
  const Y = v => H - B - (v / max) * (H - T - B);
  const line = a => a.map((v, i) => `${i ? 'L' : 'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
  const area = `${line(after)} L${X(n - 1).toFixed(1)} ${H - B} L${X(0).toFixed(1)} ${H - B} Z`;
  const grid = [0, .25, .5, .75, 1].map(f => { const y = (T + (H - T - B) * f).toFixed(1); return `<line class="g-grid" x1="${L}" y1="${y}" x2="${W - R}" y2="${y}"/>`; }).join('');
  const dots = after.map((v, i) => `<circle class="g-dot" cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="4.5" style="transition-delay:${(0.65 + i * 0.08).toFixed(2)}s"/>`).join('');
  const months = after.map((v, i) => `<text class="g-mo" x="${X(i).toFixed(1)}" y="${H - 8}" text-anchor="middle">M${i + 1}</text>`).join('');
  return `<svg class="growth" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6B34F0" stop-opacity=".26"/><stop offset="1" stop-color="#6B34F0" stop-opacity="0"/></linearGradient></defs>${grid}<path class="g-area" d="${area}"/><path class="g-before" d="${line(before)}"/><path class="g-after" d="${line(after)}"/>${dots}${months}</svg>`;
}

function renderChart(c) {
  chartEl.innerHTML = `<div class="growth-head"><h3>Growth Trajectory</h3><div class="growth-legend"><span class="a"><i></i>After editing</span><span class="b"><i></i>Before editing</span></div></div>` + chartSVG(c);
  if (!reduce) { const a = chartEl.querySelector('.g-after'); const len = a.getTotalLength(); a.style.strokeDasharray = len; a.style.strokeDashoffset = len; }
}

function drawChart() {
  const svg = chartEl.querySelector('.growth'); if (!svg) return;
  if (reduce) { svg.classList.add('run'); return; }
  const a = svg.querySelector('.g-after');
  requestAnimationFrame(() => { svg.classList.add('run'); a.style.strokeDashoffset = '0'; });
}

renderStats(CLIENTS[0]);
renderChart(CLIENTS[0]);

clientsEl.addEventListener('click', e => {
  const btn = e.target.closest('.client'); if (!btn) return;
  const i = +btn.dataset.i;
  clientsEl.querySelectorAll('.client').forEach(b => { const on = b === btn; b.classList.toggle('active', on); b.setAttribute('aria-pressed', on); });
  renderStats(CLIENTS[i]); animateStats();
  renderChart(CLIENTS[i]); drawChart();
});

/* ---- Lazy-load iframes when they enter view ---- */
if ('IntersectionObserver' in window) {
  const embedObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const el = e.target;
      if (e.isIntersecting && el.classList.contains('embed') && !el.dataset.loaded) {
        el.dataset.loaded = '1';
        el.innerHTML = `<iframe src="${el.dataset.embed}" allow="autoplay; fullscreen" frameborder="0"></iframe>`;
      }
    });
  }, { threshold: 0.01 });
  document.querySelectorAll('.embed').forEach(el => embedObs.observe(el));
}



/* nav border on scroll */
const nav = document.getElementById('nav');
if (nav) {
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 20));
}

/* ---- life: kinetic headline word ---- */
const WORDS = ["stop scrolling", "hit replay", "subscribe", "stick around", "share it", "binge it"];
const kw = document.getElementById('kw');
if (kw && !reduce) {
  let wi = 0;
  setInterval(() => { wi = (wi + 1) % WORDS.length; kw.textContent = WORDS[wi]; kw.style.animation = 'none'; void kw.offsetWidth; kw.style.animation = 'wordIn .5s cubic-bezier(.2,.7,.2,1)'; }, 2400);
}

/* ---- life: count-up stats supporting commas and custom prefixes like $ ---- */
function countUp(el) {
  const raw = el.dataset.raw;
  const cleaned = raw.replace(/,/g, '');
  let prefix = '';
  if (cleaned.startsWith('+')) prefix = '+';
  else if (cleaned.startsWith('$')) prefix = '$';
  const numStr = cleaned.replace(/[+$]/, '');
  const target = parseFloat(numStr);
  const decimals = (numStr.split('.')[1] || '').length;
  if (reduce || isNaN(target)) { el.textContent = raw; return; }
  const dur = 1000, t0 = performance.now();
  function formatNumber(val) {
    const fixed = val.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return prefix + parts.join('.');
  }
  function tick(t) {
    const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = formatNumber(target * e);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = formatNumber(target);
  }
  requestAnimationFrame(tick);
}

function animateStats() { resultsEl.querySelectorAll('.val').forEach(countUp); }

/* ---- life: staggered reveals ---- */
if (IO) {
  document.body.classList.add('js-anim');
  const gridObs = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); gridObs.unobserve(e.target); } }); }, { threshold: .06 });
  document.querySelectorAll('.strip,.grid').forEach(g => gridObs.observe(g));
  const rvObs = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rvObs.unobserve(e.target); } }); }, { threshold: .2 });
  document.querySelectorAll('.track-head').forEach(el => { el.setAttribute('data-rv', ''); rvObs.observe(el); });
  const statObs = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) { animateStats(); drawChart(); statObs.disconnect(); } }); }, { threshold: .3 });
  const resultsSection = document.getElementById('results');
  if (resultsSection) {
    statObs.observe(resultsSection);
  }
} else {
  animateStats(); drawChart();
}

/* ---- Dark / Light Theme Toggle ---- */
const themeToggle = document.getElementById('themeToggle');
const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && userPrefersDark)) {
  document.body.classList.add('dark-mode');
}

function updateToggleIcon() {
  if (!themeToggle) return;
  const isDark = document.body.classList.contains('dark-mode');
  themeToggle.innerHTML = isDark
    ? `<svg viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.01a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>` // Sun
    : `<svg viewBox="0 0 24 24"><path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-9 8.3-9.9.5-.1 1 .3.9.8-.1.4-.2.8-.2 1.2 0 4.4 3.6 8 8 8 .4 0 .8-.1 1.2-.2.5-.1 1 .4.8.9-.9 4.8-5.1 8.2-9.9 8.2zm-1.8-17.7C7.3 5.1 4.7 8.3 4.7 12c0 4.1 3.4 7.5 7.5 7.5 3.7 0 6.9-2.6 7.7-5.8-.8.2-1.7.3-2.5.3-5.5 0-10-4.5-10-10 0-.8.1-1.7.3-2.5z"/></svg>`; // Moon
}

if (themeToggle) {
  updateToggleIcon();
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateToggleIcon();
  });
}
