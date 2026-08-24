// Single dispatcher: pages just `import '../scripts/motion'`. The module runs
// once ever (ClientRouter keeps it alive across navigations), so listeners are
// registered here instead of per-page scripts.
import type { TransitionBeforeSwapEvent } from 'astro:transitions/client';

let io: IntersectionObserver | undefined;
let firstLoad = true;

document.addEventListener('astro:before-swap', (event) => {
  io?.disconnect();
  const next = (event as TransitionBeforeSwapEvent).newDocument;
  // Persist the first-paint hook across ClientRouter's html-attribute swap.
  next.documentElement.classList.add('js');
  // Incoming reveals must be visible before the view-transition snapshot.
  // `.is-shown` skips `rise` so they don't fade up after the slide.
  if (!firstLoad) {
    next.querySelectorAll<HTMLElement>('[data-reveal], [data-stagger] > *').forEach((el) => {
      el.classList.add('is-in', 'is-shown');
    });
  }
});

document.addEventListener('astro:page-load', () => {
  initMailHref();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    firstLoad = false;
    return;
  }
  if (firstLoad) {
    firstLoad = false;
    initReveal();
  }
});

// Phones get mailto (native Mail / Gmail app). Desktop keeps the Gmail
// compose tab. Stored on [data-desktop-href]; the href itself is mailto.
function initMailHref() {
  const mq = window.matchMedia('(min-width: 640px)');
  const apply = () => {
    document.querySelectorAll<HTMLAnchorElement>('a[data-desktop-href]').forEach((a) => {
      const desktop = a.dataset.desktopHref;
      const mobile = a.dataset.mobileHref ?? a.getAttribute('href');
      if (!desktop || !mobile) return;
      if (!a.dataset.mobileHref) a.dataset.mobileHref = mobile;
      a.href = mq.matches ? desktop : a.dataset.mobileHref;
    });
  };
  apply();
  mq.addEventListener('change', apply);
}

// Pre-hides [data-reveal] and [data-stagger] children, then plays the CSS
// `rise` animation (see global.css) when they scroll into view. First paint
// is already hidden via `html.js` in Base.astro — this only runs on the
// initial page-load. Later ClientRouter navigations stamp `.is-in` in
// before-swap so the view-transition snapshot stays intact.
function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-stagger] > *');
  if (!targets.length) return;
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    [...group.children].forEach((child, i) => {
      (child as HTMLElement).style.animationDelay = `${i * 120}ms`;
    });
  });
  io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.replace('will-reveal', 'is-in');
        io?.unobserve(entry.target);
      }
    },
    // Huge top margin: elements jumped past (End key, anchor link, restored
    // scroll position) count as intersecting instead of staying hidden.
    { rootMargin: '10000px 0px -15% 0px' }
  );
  targets.forEach((el) => {
    el.classList.add('will-reveal');
    io!.observe(el);
  });
}
