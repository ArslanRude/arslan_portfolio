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

/* ── SCROLL PROGRESS ── */
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = progress + '%';
}, { passive: true });

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

/* ── NAV SCROLL & HIDE/SHOW ── */
const nav = document.getElementById('nav');
let lastScrollY = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      nav.classList.toggle('scrolled', currentScrollY > 60);
      
      // Hide nav on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
      lastScrollY = currentScrollY;
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ── TEXT SCRAMBLE / DECODE EFFECT ── */
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.originalText = el.textContent;
  }
  
  scramble() {
    const length = this.originalText.length;
    let iteration = 0;
    const maxIterations = length * 3;
    
    const interval = setInterval(() => {
      this.el.textContent = this.originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / 3) {
            return this.originalText[index];
          }
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        })
        .join('');
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        this.el.textContent = this.originalText;
        this.el.classList.add('decoded');
      }
      
      iteration++;
    }, 30);
  }
}

// Initialize scramble on section labels
const scrambleElements = document.querySelectorAll('.section-label');
scrambleElements.forEach(el => {
  const scrambler = new TextScramble(el);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !el.classList.contains('scrambled')) {
        el.classList.add('scrambled');
        scrambler.scramble();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(el);
});

/* ── MARQUEE FILL ── */
const items = ['Generative AI','Agentic Systems','NLP','LangChain','LangGraph','Vue.js','React.js','Next.js','Tailwind CSS','Full-Stack Development','SaaS Products','TypeScript'];
const doubled = [...items,...items].map(t=>`<span><b>✦</b> ${t}</span>`).join('');
const track = document.getElementById('marqueeTrack');
track.innerHTML = doubled + doubled;

/* ── REVEAL ON SCROLL (Original) ── */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
    }
  });
},{threshold:.15, rootMargin:'0px 0px -50px 0px'});
reveals.forEach(el=>io.observe(el));

/* ── ENHANCED REVEAL ANIMATIONS ── */
const revealConfigs = [
  { selector: '.reveal-blur', threshold: 0.15 },
  { selector: '.reveal-left', threshold: 0.15 },
  { selector: '.reveal-right', threshold: 0.15 },
  { selector: '.reveal-scale', threshold: 0.1 },
  { selector: '.reveal-rotate', threshold: 0.1 }
];

revealConfigs.forEach(config => {
  const elements = document.querySelectorAll(config.selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: config.threshold, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => observer.observe(el));
});

/* ── WORD-BY-WORD REVEAL ── */
const wordRevealElements = document.querySelectorAll('.word-reveal');
wordRevealElements.forEach(el => {
  const text = el.textContent;
  const words = text.split(' ');
  el.innerHTML = words.map(word => `<span class="word" style="transition-delay: ${Math.random() * 0.5}s">${word}</span>`).join(' ');
});

const wordObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      wordObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
wordRevealElements.forEach(el => wordObserver.observe(el));

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
  entries.forEach((e, index)=>{
    if(e.isIntersecting){
      setTimeout(() => {
        const width = e.target.dataset.width;
        e.target.style.width = width + '%';
      }, index * 150); // Stagger effect
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

/* ── SCROLL PARALLAX ── */
const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-fast');
const parallaxSlow = document.querySelectorAll('.parallax-slow');
const parallaxFast = document.querySelectorAll('.parallax-fast');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  parallaxSlow.forEach(el => {
    const speed = 0.3;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
  
  parallaxFast.forEach(el => {
    const speed = 0.6;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

/* ── 3D TILT EFFECT ON CARDS ── */
document.querySelectorAll('.project-card, .service-card').forEach(card => {
  card.classList.add('tilt-card');
  
  card.addEventListener('mousemove', function(e) {
    if (isTouchDevice) return;
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    this.style.transition = 'transform 0.5s var(--ease)';
  });
  
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'transform 0.1s ease-out';
  });
});

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

/* ── BUTTON RIPPLE EFFECT ── */
document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
  btn.classList.add('btn-ripple');
  
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ── ACTIVE NAV LINK BASED ON SECTION ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' });

sections.forEach(section => sectionObserver.observe(section));

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