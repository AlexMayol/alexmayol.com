import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Stale triggers reference the outgoing page's DOM; kill them before swap.
document.addEventListener('astro:before-swap', () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
});

// Single dispatcher: pages just `import '../scripts/motion'`. Registering the
// page-load listener here (module runs once) instead of per-page scripts —
// two pages' identical listeners would each run gsap.from() on the same
// elements, and the second from() captures the first one's hidden state as
// its end value, leaving content stuck invisible.
document.addEventListener('astro:page-load', () => {
  if (document.querySelector('[data-reveal]')) initScrollReveal();
  if (document.querySelector('[data-tilt]')) {
    initStagger();
    initFloat();
    initTilt();
  }
});

const reduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initScrollReveal() {
  if (reduced()) return;
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

function initStagger() {
  if (reduced()) return;
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    gsap.from(group.children, {
      y: 32,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.12,
    });
  });
}

function initFloat() {
  if (reduced()) return;
  document.querySelectorAll('[data-float]').forEach((el, i) => {
    gsap.to(el, {
      y: i % 2 === 0 ? -14 : 14,
      rotation: i % 2 === 0 ? 4 : -4,
      duration: 2.6 + i * 0.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });
}

function initTilt() {
  if (reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateZ(4px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}
