const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice) {
  document.addEventListener('mousemove', e=>{
    mx=e.clientX;my=e.clientY;
    dot.style.left=mx+'px';dot.style.top=my+'px';
  });
  (function lerp(){
    rx+=(mx-rx)*.15;ry+=(my-ry)*.15;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(lerp);
  })();
}

/* ── PRELOADER ── */
const preBar = document.getElementById('preBar');
const preCount = document.getElementById('preCount');
const preloader = document.getElementById('preloader');
let count = 0;
const interval = setInterval(()=>{
  count += Math.floor(Math.random()*10)+5;
  if(count>=100){count=100;clearInterval(interval);
    setTimeout(()=>{ preloader.classList.add('fade-out'); setTimeout(()=>preloader.remove(),700); },400);
  }
  preCount.textContent = count+'%';
},70);

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));

/* ── MARQUEE FILL ── */
const items = ['Generative AI','Agentic Systems','NLP','LangChain','LangGraph','Vector Search','RAG','Python','Data Science'];
const doubled = [...items,...items].map(t=>`<span><b>✦</b> ${t}</span>`).join('');
const track = document.getElementById('marqueeTrack');
track.innerHTML = doubled + doubled;

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
    }
  });
},{threshold:.15, rootMargin:'0px 0px -50px 0px'});
reveals.forEach(el=>io.observe(el));

/* ── STAGGER ANIMATION ── */
const staggers = document.querySelectorAll('.stagger-children');
const staggerIo = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      staggerIo.unobserve(e.target);
    }
  });
},{threshold:.1});
staggers.forEach(el=>staggerIo.observe(el));

/* ── COUNTER ── */
function animateCounter(el){
  const target=+el.dataset.target;
  let cur=0; const step=target/50;
  const t=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(t);}el.textContent=Math.round(cur);},25);
}
const cio = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target);cio.unobserve(e.target);}});
});
document.querySelectorAll('.count-num').forEach(el=>cio.observe(el));

/* ── SKILL BARS ── */
const skillBars = document.querySelectorAll('.skill-progress');
const skillIo = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const width = e.target.dataset.width;
      e.target.style.width = width + '%';
      skillIo.unobserve(e.target);
    }
  });
},{threshold:.5});
skillBars.forEach(el=>skillIo.observe(el));

/* ── PARALLAX HERO GLOWS ── */
document.addEventListener('mousemove',e=>{
  if(isTouchDevice) return;
  const xp=(e.clientX/window.innerWidth-.5)*40;
  const yp=(e.clientY/window.innerHeight-.5)*40;
  const glow1 = document.querySelector('.hero-glow-1');
  const glow2 = document.querySelector('.hero-glow-2');
  if(glow1) glow1.style.transform=`translate(${xp}px,${yp}px)`;
  if(glow2) glow2.style.transform=`translate(${-xp}px,${-yp}px)`;
});

const line2 = document.querySelector('.hero-name .line2');
if(line2) {
  // Simple fade-in animation handled by CSS
}

/* ── MAGNETIC BUTTONS ── */
if(!isTouchDevice){
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
      this.style.transition = 'all 0.4s var(--ease)';
    });
    btn.addEventListener('mouseenter', function() {
      this.style.transition = 'transform 0.1s ease-out';
    });
  });
}

/* ── PROJECT CARD MOUSE TRACKING ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    this.style.setProperty('--mouse-x', `${x}%`);
    this.style.setProperty('--mouse-y', `${y}%`);
  });
});

/* ── MOBILE MENU ── */
const menuBtn = document.querySelector('.mobile-menu-btn');
menuBtn.addEventListener('click', function() {
  this.classList.toggle('active');
});

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});