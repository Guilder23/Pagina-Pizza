/*
  Pizza Rain / Explosión de pizza (3 veces)
  - Se ejecuta cuando la página se carga (incluye recargas/refresh)
  - Evita ejecutar más de una vez por sesión usando sessionStorage
*/

(() => {
  const KEY = 'pizzaRainPlayed_v1';
  const MAX_PIZZAS = 22;
  const DURATION_MS = 4600;


  // Si ya se ejecutó en esta sesión, no repetir
  try {
    if (sessionStorage.getItem(KEY) === '1') return;
    sessionStorage.setItem(KEY, '1');
  } catch (e) {
    // Si sessionStorage no está disponible, igual intentamos
  }

  const container = document.createElement('div');
  container.id = 'pizzaRainContainer';
  container.setAttribute('aria-hidden', 'true');
  Object.assign(container.style, {
    position: 'fixed',
    inset: '0',
    pointerEvents: 'none',
    zIndex: '2500',
    overflow: 'hidden'
  });

  document.body.appendChild(container);

  const pizzaImgs = [
    // Imágenes de ejemplo (puedes reemplazar por las que ya usas)
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548365328-9f547fb0953b?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605471753557-1fcdb7f8d5f8?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1604909052743-94b7f6f5a7f6?q=80&w=600&auto=format&fit=crop'
  ];

  // Helper: crear elemento
  function createPizza({ xPercent, imgSrc, delayMs, strength }) {
    const el = document.createElement('img');
    el.className = 'pizza-rain-item';
    el.src = imgSrc;
    el.alt = '';

    // tamaño escalado según strength
    const size = 26 + Math.round(strength * 18);

    Object.assign(el.style, {
      position: 'absolute',
      left: `${xPercent}%`,
      top: `-${size}px`,
      width: `${size}px`,
      height: 'auto',
      filter: 'drop-shadow(0 10px 15px rgba(0,0,0,.55))',
      opacity: '0',
      transform: 'translate3d(-50%,0,0) rotate(0deg) scale(1)',
      animation: `pizzaFall ${Math.max(900, DURATION_MS - delayMs)}ms cubic-bezier(.2,.7,.2,1) ${delayMs}ms forwards`
    });

    container.appendChild(el);
    return el;
  }

  // Inyectar CSS (animaciones)
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pizzaFall {
      0% { opacity: 0; transform: translate3d(-50%,-40px,0) rotate(0deg) scale(.6); }
      10% { opacity: .95; }
      45% { transform: translate3d(calc(-50% + 14px), 45vh, 0) rotate(110deg) scale(1); }
      75% { transform: translate3d(calc(-50% - 12px), 78vh, 0) rotate(210deg) scale(1.05); }
      100% { opacity: 0; transform: translate3d(-50%, 110vh, 0) rotate(360deg) scale(.9); }
    }

    /* Explosión: se “enciende” 3 veces en el centro */
    .pizza-explode-burst {
      position: absolute;
      left: 50%;
      top: 25%;
      width: 10px;
      height: 10px;
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0;
      border-radius: 999px;
      background: radial-gradient(circle, rgba(255,170,0,.95) 0%, rgba(255,70,0,.45) 30%, rgba(255,70,0,.0) 70%);
      filter: blur(0px);
      animation: pizzaBurst 700ms ease-out forwards;
    }

    @keyframes pizzaBurst {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
      25% { opacity: 1; }
      60% { opacity: .85; transform: translate(-50%, -50%) scale(1.2); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(2.0); }
    }
  `;
  document.head.appendChild(style);

  // Lanzar explosiones 3 veces en el centro
  function explode(times = 3) {
    const base = 650;
    const gap = 900;
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        const burst = document.createElement('div');
        burst.className = 'pizza-explode-burst';
        container.appendChild(burst);
        setTimeout(() => burst.remove(), 900);
      }, base + i * gap);
    }
  }

  // Lluvia de pizzas

  for (let i = 0; i < MAX_PIZZAS; i++) {

    const xPercent = Math.random() * 100;
    const imgSrc = pizzaImgs[i % pizzaImgs.length];
    const delayMs = Math.round(Math.random() * 900) + 200;
    const strength = Math.random();
    createPizza({ xPercent, imgSrc, delayMs, strength });
  }

  explode(3);

  // Desaparecer todo al final
  setTimeout(() => {
    container.style.transition = 'opacity 300ms ease';
    container.style.opacity = '0';
    setTimeout(() => {
      container.remove();
      style.remove();
    }, 350);
  }, DURATION_MS);
})();

