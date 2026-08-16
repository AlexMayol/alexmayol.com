// Single dispatcher: pages just `import '../scripts/motion'`. The module runs
// once ever (ClientRouter keeps it alive across navigations), so listeners are
// registered here instead of per-page scripts.
let io: IntersectionObserver | undefined;

document.addEventListener('astro:before-swap', () => io?.disconnect());

document.addEventListener('astro:page-load', () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  initReveal();
});

// Pre-hides [data-reveal] and [data-stagger] children, then plays the CSS
// `rise` animation (see global.css) when they scroll into view. Content stays
// visible if this script never runs — the hidden state is only applied here.
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
