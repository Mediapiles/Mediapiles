/* ============================================================
   PROJECTS — your content lives here.
   title / tag / dur, and src = YouTube | Vimeo | .mp4 link.
   ============================================================ */
const PROJECTS = {
  reels: [
    { title: "Product Launch",    tag: "DTC Brand",   dur: "0:28", src: "Shorts/COmpres/A (1)-1-6.mp4" },
    { title: "Founder Story",      tag: "SaaS",        dur: "0:41", src: "Shorts/COmpres/A (2)-12-17.mp4" },
    { title: "Hook Edit",          tag: "Creator",     dur: "0:18", src: "Shorts/COmpres/A (3)-19-24.mp4" },
    { title: "Ad Cutdown",         tag: "E-commerce",  dur: "0:32", src: "Shorts/COmpres/A (4)-20-25.mp4" },
    { title: "Talking Head",       tag: "Coach",       dur: "0:55", src: "Shorts/COmpres/A (5)-21-26.mp4" },
    { title: "UGC Remix",          tag: "Beauty",      dur: "0:24", src: "Shorts/COmpres/A (6)-22-27.mp4" },
    { title: "Teaser",             tag: "Event",       dur: "0:15", src: "Shorts/COmpres/A (7)-23-28.mp4" },
    { title: "Promo Reel",         tag: "Fitness",     dur: "0:30", src: "Shorts/COmpres/A (8)-24-29.mp4" },
    { title: "Testimonial",        tag: "SaaS",        dur: "0:38", src: "Shorts/COmpres/A (9)-25-30.mp4" },
    { title: "Explainer",          tag: "Startup",     dur: "0:45", src: "Shorts/COmpres/A (10)-2-7.mp4" },
    { title: "Episode Recap",      tag: "Podcast",     dur: "0:22", src: "Shorts/COmpres/A (11)-3-8.mp4" },
    { title: "Course Trailer",     tag: "Education",   dur: "0:27", src: "Shorts/COmpres/A (12)-4-9.mp4" },
    { title: "Story Ad",           tag: "Fashion",     dur: "0:16", src: "Shorts/COmpres/A (13)-5-10.mp4" },
    { title: "Tutorial Clip",      tag: "Creator",     dur: "0:50", src: "Shorts/COmpres/A (14)-6-11.mp4" },
    { title: "Launch Teaser",      tag: "Tech",        dur: "0:19", src: "Shorts/COmpres/A (15)-7-12.mp4" },
    { title: "Behind the Scenes",  tag: "Studio",      dur: "0:33", src: "Shorts/COmpres/A (16)-8-13.mp4" },
    { title: "Highlight",          tag: "Sports",      dur: "0:21", src: "Shorts/COmpres/A (17)-9-14.mp4" },
    { title: "Quote Card",         tag: "Coach",       dur: "0:12", src: "Shorts/COmpres/A (18)-10-15.mp4" },
    { title: "Carousel Cut",       tag: "Agency",      dur: "0:29", src: "Shorts/COmpres/A (19)-11-16.mp4" },
    { title: "Reaction",           tag: "Creator",     dur: "0:14", src: "Shorts/COmpres/A (20)-13-18.mp4" },
    { title: "Before / After",     tag: "Skincare",    dur: "0:26", src: "Shorts/COmpres/A (21)-14-19.mp4" },
    { title: "Countdown",          tag: "Event",       dur: "0:10", src: "Shorts/COmpres/A (22)-15-20.mp4" },
    { title: "Mini Doc",           tag: "Brand",       dur: "0:58", src: "Shorts/COmpres/A (23)-16-21.mp4" },
    { title: "Drop Promo",         tag: "Streetwear",  dur: "0:23", src: "Shorts/COmpres/A (24)-17-22.mp4" },
    { title: "FAQ Clip",           tag: "SaaS",        dur: "0:17", src: "Shorts/COmpres/A (25)-18-23.mp4" },
  ],
  longform: [
    { title: "Brand Film",      tag: "Documentary / 16:9", dur: "3:42",  src: "Shorts/COmpres/1 (1)-1-1-3.mp4" },
    { title: "Podcast Episode", tag: "Multicam / YouTube", dur: "48:10", src: "Shorts/COmpres/1 (2)-2-2-4.mp4" },
    { title: "Case Study",      tag: "Corporate",          dur: "4:18",  src: "Shorts/COmpres/1 (4)-4-4-1.mp4" },
    { title: "Event Recap",     tag: "Highlights",         dur: "6:05",  src: "Shorts/COmpres/1 (5)-5-5-2.mp4" },
  ]
};

/* marquee words */
const MQ = ["REELS","SHORTS","ADS","PODCASTS","BRAND FILMS"];
const mqHTML = MQ.map(w=>`<span>${w}</span><b>/</b>`).join('');
document.getElementById('mqTrack').innerHTML = mqHTML + mqHTML;

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const IO = 'IntersectionObserver' in window;

/* turn any link into an inline, muted, looping autoplay source */
function parseEmbed(src){
  if(!src) return null;
  let m;
  if((m = src.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/))){
    const id = m[1];
    return {type:'embed', url:`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&rel=0&playsinline=1&modestbranding=1`};
  }
  if((m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/)))
    return {type:'embed', url:`https://player.vimeo.com/video/${m[1]}?background=1&autoplay=1&muted=1&loop=1`};
  return {type:'mp4', url:src};
}

function buildCard(p, vertical){
  const card = document.createElement('div');
  if(vertical) card.className = 'reel';
  const parsed = parseEmbed(p.src);
  let media = '';
  if(parsed && parsed.type==='mp4') {
    const controlsAttr = vertical ? '' : 'controls';
    media = `<video class="media" muted loop playsinline preload="metadata" data-src="${parsed.url}#t=0.001" ${controlsAttr}></video>`;
  } else if(parsed && parsed.type==='embed') {
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
PROJECTS.reels.forEach((p,i)=>{ const c=buildCard(p,true); c.style.setProperty('--i', i%6); reelStrip.appendChild(c); });
const longGrid = document.getElementById('longGrid');
PROJECTS.longform.forEach((p,i)=>{ const c=buildCard(p,false); c.style.setProperty('--i', i); longGrid.appendChild(c); });

/* CLIENTS — client success metrics and logos from the previous version */
const CLIENTS = [
  { name:"Caffeinated Blogger", mono:"CB", color:"var(--brand)", logo:"Clients/CaffeinatedBlogger.jpg",
    before:[5000, 5200, 4800, 5500, 6000, 5800], after:[12000, 25000, 45000, 80000, 150000, 210000], stats:[
    {num:"+15.2", unit:"K",  label:"Subscriber growth in 3 months"},
    {num:"4,200", unit:"+",  label:"High engagement rate"},
    {num:"12",    unit:" Properties Sold", label:"Directly from YouTube leads"},
  ]},
  { name:"Eness Yilmazer", mono:"EY", color:"var(--ink)", logo:"Clients/Eness Yilmazer.jpg",
    before:[10000, 11000, 10500, 12000, 11500, 13000], after:[20000, 45000, 90000, 180000, 320000, 450000], stats:[
    {num:"+45.5", unit:"K",  label:"Since editing rebrand"},
    {num:"12,500", unit:"+",  label:"Community interaction"},
    {num:"850",   unit:"+ Memberships", label:"New online coaching clients"},
  ]},
  { name:"Real Estate Report", mono:"RE", color:"var(--pop)", logo:"Clients/Real.Estate.Report.jpg",
    before:[2000, 2100, 2300, 2000, 2500, 2400], after:[15000, 30000, 55000, 95000, 120000, 185000], stats:[
    {num:"+8.4", unit:"K",  label:"Organic subscribers"},
    {num:"3,100", unit:"+",  label:"Product questions & hype"},
    {num:"$145",  unit:"K Revenue", label:"Attributed to short reels"},
  ]},
  { name:"Sonu Sharma", mono:"SS", color:"var(--brand-deep)", logo:"Clients/Sonu Sharma.jpg",
    before:[50000, 55000, 52000, 60000, 58000, 65000], after:[80000, 150000, 350000, 800000, 1200000, 2500000], stats:[
    {num:"+110",  unit:"K",  label:"Subscribers gained"},
    {num:"45,000", unit:"+",  label:"Viral engagement peak"},
    {num:"2,100", unit:"+ Tickets", label:"Event sales through shorts"},
  ]},
  { name:"The Ramsey Show", mono:"RS", color:"var(--brand)", logo:"Clients/TheRamseyShow.jpg",
    before:[8000, 8500, 8200, 9000, 8800, 9500], after:[18000, 32000, 60000, 110000, 200000, 310000], stats:[
    {num:"+22.1", unit:"K",  label:"Growth in 4 months"},
    {num:"6,800", unit:"+",  label:"Higher audience retention"},
    {num:"45",    unit:" New Clients", label:"Through organic video reach"},
  ]},
  { name:"Kallaway Marketing", mono:"KM", color:"var(--pop)", logo:"Clients/kallawaymarketing.jpg",
    before:[15000, 16000, 15500, 17000, 16500, 18000], after:[25000, 50000, 120000, 250000, 400000, 600000], stats:[
    {num:"+32.4", unit:"K",  label:"Subscribers added"},
    {num:"18,200", unit:"+",  label:"Actionable discussion"},
    {num:"320",   unit:"+ Course Sales", label:"Driven by video content"},
  ]},
];

const clientsEl = document.getElementById('clients');
const resultsEl = document.getElementById('statGrid');
const chartEl = document.getElementById('chart');

clientsEl.innerHTML = CLIENTS.map((c,i)=>`
  <button class="client${i===0?' active':''}" data-i="${i}" aria-pressed="${i===0}">
    <span class="av" style="background:${c.color}; overflow: hidden; display: flex; align-items: center; justify-content: center;">
      ${c.logo ? `<img src="${c.logo}" alt="${c.name}">` : c.mono}
    </span>
    ${c.name}
  </button>
`).join('');

function renderStats(c){
  resultsEl.innerHTML = c.stats.map(s=>`
    <div class="stat">
      <div class="num">
        <span class="val" data-raw="${s.num}">${s.num}</span>${s.unit?`<span class="u">${s.unit}</span>`:''}
      </div>
      <div class="lbl">${s.label}</div>
    </div>
  `).join('');
}

function chartSVG(c){
  const before=c.before, after=c.after, n=after.length;
  const W=580,H=230,L=12,R=12,T=16,B=26;
  const max=Math.max(...after,...before)*1.12;
  const X=i=> L + i*((W-L-R)/(n-1));
  const Y=v=> H-B - (v/max)*(H-T-B);
  const line=a=> a.map((v,i)=>`${i?'L':'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
  const area=`${line(after)} L${X(n-1).toFixed(1)} ${H-B} L${X(0).toFixed(1)} ${H-B} Z`;
  const grid=[0,.25,.5,.75,1].map(f=>{const y=(T+(H-T-B)*f).toFixed(1);return `<line class="g-grid" x1="${L}" y1="${y}" x2="${W-R}" y2="${y}"/>`;}).join('');
  const dots=after.map((v,i)=>`<circle class="g-dot" cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="4.5" style="transition-delay:${(0.65+i*0.08).toFixed(2)}s"/>`).join('');
  const months=after.map((v,i)=>`<text class="g-mo" x="${X(i).toFixed(1)}" y="${H-8}" text-anchor="middle">M${i+1}</text>`).join('');
  return `<svg class="growth" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6B34F0" stop-opacity=".26"/><stop offset="1" stop-color="#6B34F0" stop-opacity="0"/></linearGradient></defs>${grid}<path class="g-area" d="${area}"/><path class="g-before" d="${line(before)}"/><path class="g-after" d="${line(after)}"/>${dots}${months}</svg>`;
}

function renderChart(c){
  chartEl.innerHTML = `<div class="growth-head"><h3>Growth Trajectory</h3><div class="growth-legend"><span class="a"><i></i>After editing</span><span class="b"><i></i>Before editing</span></div></div>` + chartSVG(c);
  if(!reduce){ const a=chartEl.querySelector('.g-after'); const len=a.getTotalLength(); a.style.strokeDasharray=len; a.style.strokeDashoffset=len; }
}

function drawChart(){
  const svg=chartEl.querySelector('.growth'); if(!svg) return;
  if(reduce){ svg.classList.add('run'); return; }
  const a=svg.querySelector('.g-after');
  requestAnimationFrame(()=>{ svg.classList.add('run'); a.style.strokeDashoffset='0'; });
}

renderStats(CLIENTS[0]);
renderChart(CLIENTS[0]);

clientsEl.addEventListener('click', e=>{
  const btn = e.target.closest('.client'); if(!btn) return;
  const i=+btn.dataset.i;
  clientsEl.querySelectorAll('.client').forEach(b=>{ const on=b===btn; b.classList.toggle('active',on); b.setAttribute('aria-pressed', on); });
  renderStats(CLIENTS[i]); animateStats();
  renderChart(CLIENTS[i]); drawChart();
});

/* play media only while in view (keeps it light, no clicks needed) */
if('IntersectionObserver' in window){
  const mediaObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      const el = e.target;
      if(e.isIntersecting){
        if(el.tagName==='VIDEO'){
          if(!el.src && el.dataset.src) {
            el.src = el.dataset.src;
            el.load();
          }
          if(!reduce) el.play().catch(()=>{});
        }
        else if(el.classList.contains('embed') && !el.dataset.loaded){
          el.dataset.loaded='1';
          el.innerHTML = `<iframe src="${el.dataset.embed}" allow="autoplay; fullscreen" frameborder="0"></iframe>`;
        }
      } else if(el.tagName==='VIDEO'){
        el.pause();
        el.removeAttribute('src');
        el.load();
      }
    });
  },{threshold:.08});
  document.querySelectorAll('.media').forEach(el=> mediaObs.observe(el));
}

/* nav border on scroll */
const nav=document.getElementById('nav');
if(nav) {
  addEventListener('scroll',()=> nav.classList.toggle('scrolled', scrollY>20));
}

/* ---- life: kinetic headline word ---- */
const WORDS = ["stop scrolling","hit replay","subscribe","stick around","share it","binge it"];
const kw = document.getElementById('kw');
if(kw && !reduce){
  let wi=0;
  setInterval(()=>{ wi=(wi+1)%WORDS.length; kw.textContent=WORDS[wi]; kw.style.animation='none'; void kw.offsetWidth; kw.style.animation='wordIn .5s cubic-bezier(.2,.7,.2,1)'; }, 2400);
}

/* ---- life: count-up stats supporting commas and custom prefixes like $ ---- */
function countUp(el){
  const raw=el.dataset.raw;
  const cleaned = raw.replace(/,/g, '');
  let prefix = '';
  if (cleaned.startsWith('+')) prefix = '+';
  else if (cleaned.startsWith('$')) prefix = '$';
  const numStr = cleaned.replace(/[+$]/, '');
  const target = parseFloat(numStr);
  const decimals = (numStr.split('.')[1] || '').length;
  if(reduce || isNaN(target)){ el.textContent=raw; return; }
  const dur=1000, t0=performance.now();
  function formatNumber(val) {
    const fixed = val.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return prefix + parts.join('.');
  }
  function tick(t){
    const p=Math.min((t-t0)/dur,1), e=1-Math.pow(1-p,3);
    el.textContent = formatNumber(target * e);
    if(p<1) requestAnimationFrame(tick);
    else el.textContent = formatNumber(target);
  }
  requestAnimationFrame(tick);
}

function animateStats(){ resultsEl.querySelectorAll('.val').forEach(countUp); }

/* ---- life: staggered reveals ---- */
if(IO){
  document.body.classList.add('js-anim');
  const gridObs=new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); gridObs.unobserve(e.target);} }); },{threshold:.06});
  document.querySelectorAll('.strip,.grid').forEach(g=> gridObs.observe(g));
  const rvObs=new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); rvObs.unobserve(e.target);} }); },{threshold:.2});
  document.querySelectorAll('.track-head').forEach(el=>{ el.setAttribute('data-rv',''); rvObs.observe(el); });
  const statObs=new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ animateStats(); drawChart(); statObs.disconnect(); } }); },{threshold:.3});
  const resultsSection = document.getElementById('results');
  if(resultsSection) {
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
