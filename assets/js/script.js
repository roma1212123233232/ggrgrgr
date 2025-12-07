// script.js — аккуратный, понятный, доступный аккордеон
document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.accordion-item'));

  // helper: close all
  function closeAll() {
    items.forEach(it => {
      it.setAttribute('aria-expanded', 'false');
    });
  }

  // init: ensure all closed
  closeAll();

  // click / keyboard handlers
  items.forEach(item => {
    const header = item.querySelector('.acc-header');

    header.addEventListener('click', () => {
      const isOpen = item.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        item.setAttribute('aria-expanded', 'false');
      } else {
        closeAll();
        item.setAttribute('aria-expanded', 'true');
        // optional: scroll into view smoothly a little
        setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 220);
      }
    });

    // keyboard: Enter or Space toggles
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const idx = items.indexOf(item);
        const next = items[(idx + 1) % items.length];
        next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const idx = items.indexOf(item);
        const prev = items[(idx - 1 + items.length) % items.length];
        prev.focus();
      }
    });
  });

  // Optional: open first item on load
  if (items.length) {
    items[0].setAttribute('aria-expanded', 'true');
  }
});
