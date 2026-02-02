/* Global interactions, preferences, modal handling, PWA registration */
(() => {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.querySelector('.modal-close');

  // Open description modal
  document.querySelectorAll('.btn-desc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const product = e.currentTarget.dataset.product;
      openModal(`<h3>${escapeHtml(product)}</h3><p>Description courte pour ${escapeHtml(product)}. Ajoute ici les détails, ingrédients, et options.</p><p><strong>Prix</strong> : voir la fiche produit</p><div style="margin-top:12px"><button class="btn btn-primary" data-action="order" data-product="${escapeHtml(product)}">Commander</button></div>`);
    });
  });

  // Order button opens order modal or triggers WhatsApp
  document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const product = e.currentTarget.dataset.product;
      const message = encodeURIComponent(`Bonjour, je souhaite commander : ${product}`);
      // Open WhatsApp in new tab
      window.open(`https://wa.me/243891122145?text=${message}`, '_blank', 'noopener');
    });
  });

  // Modal helpers
  function openModal(html) {
    modalContent.innerHTML = html;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // delegate order inside modal
    modalContent.querySelectorAll('[data-action="order"]').forEach(b => {
      b.addEventListener('click', () => {
        const product = b.dataset.product;
        const message = encodeURIComponent(`Bonjour, je souhaite commander : ${product}`);
        window.open(`https://wa.me/243891122145?text=${message}`, '_blank', 'noopener');
      });
    });
  }
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalContent.innerHTML = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // Theme toggle and accent picker
  const themeToggle = document.getElementById('themeToggle');
  const accentPicker = document.getElementById('accentPicker');

  const storage = window.localStorage;
  const userTheme = storage.getItem('ll-theme') || 'dark';
  const userAccent = storage.getItem('ll-accent') || '#e74c3c';
  applyTheme(userTheme);
  applyAccent(userAccent);

  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    storage.setItem('ll-theme', next);
  });

  accentPicker.addEventListener('click', () => {
    const color = prompt('Couleur d’accent hex (ex #e74c3c)', userAccent) || userAccent;
    applyAccent(color);
    storage.setItem('ll-accent', color);
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.style.setProperty('--bg', '#f7f7f9');
      document.documentElement.style.setProperty('--muted', 'rgba(20,20,20,0.85)');
      document.documentElement.style.setProperty('--glass-border', 'rgba(0,0,0,0.06)');
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.setProperty('--bg', '#0f0f12');
      document.documentElement.style.setProperty('--muted', 'rgba(255,255,255,0.75)');
      document.documentElement.style.setProperty('--glass-border', 'rgba(255,255,255,0.08)');
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  function applyAccent(color) {
    document.documentElement.style.setProperty('--accent', color);
    // derive a lighter accent
    try {
      const lighter = shadeColor(color, 12);
      document.documentElement.style.setProperty('--accent-2', lighter);
    } catch (e) {
      document.documentElement.style.setProperty('--accent-2', color);
    }
  }

  // small util to shade hex color
  function shadeColor(hex, percent) {
    const f = hex.slice(1), t = percent<0?0:255, p = Math.abs(percent)/100;
    const R = parseInt(f.substring(0,2),16), G = parseInt(f.substring(2,4),16), B = parseInt(f.substring(4,6),16);
    const newR = Math.round((t - R)*p) + R;
    const newG = Math.round((t - G)*p) + G;
    const newB = Math.round((t - B)*p) + B;
    return `#${(0x1000000 + (newR<<16) + (newG<<8) + newB).toString(16).slice(1)}`;
  }

  // small escape for inserted HTML
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, (m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }

  // Register service worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch(()=>{/* silent */});
    });
  }
})();
