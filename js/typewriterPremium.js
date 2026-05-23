// Typewriter "PIZZAS PREMIUN" (SIEMPRE en cada recarga/refresh)
(() => {
  const TEXT = 'PIZZAS PREMIUN';

  const titleEl = document.getElementById('typewriterTitle');
  if (!titleEl) return;

  // Reiniciar en cada carga para que siempre se vea la animación.
  titleEl.textContent = '';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    titleEl.textContent = TEXT;
    return;
  }

  let i = 0;
  const speed = 70; // ms por caracter

  const tick = () => {
    i++;
    titleEl.textContent = TEXT.slice(0, i);
    if (i < TEXT.length) setTimeout(tick, speed);
  };

  setTimeout(tick, 200);
})();


