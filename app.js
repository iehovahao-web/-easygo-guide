(() => {
  const toast = document.getElementById('toast');
  let toastTimer;
  function tell(message) { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); }
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const text = button.dataset.copy;
    try {
      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try { await navigator.clipboard.writeText(text); copied = true; } catch (_) {}
      }
      if (!copied) {
        const input = document.createElement('textarea'); input.value = text; input.setAttribute('readonly', ''); input.style.cssText = 'position:fixed;top:-9999px'; document.body.appendChild(input); input.select(); const ok = document.execCommand('copy'); input.remove(); if (!ok) throw new Error('copy unavailable');
      }
      tell(window.guideMessage('copied'));
    } catch (_) { tell(window.guideMessage('copyFailed')); }
  }));
  const dialog = document.getElementById('image-dialog');
  const fullImage = document.getElementById('dialog-image');
  const title = document.getElementById('dialog-title');
  const save = document.getElementById('dialog-download');
  let previousFocus;
  document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
    if (!dialog.showModal) { window.open(button.dataset.image, '_blank', 'noopener'); return; }
    previousFocus = button;
    fullImage.src = button.dataset.image;
    fullImage.alt = button.dataset.caption;
    title.textContent = button.dataset.caption;
    save.href = button.dataset.image;
    save.download = button.dataset.filename || button.dataset.image.split('/').pop();
    dialog.showModal(); document.body.classList.add('modal-open');
  }));
  function closeImage() { dialog.close(); }
  document.getElementById('dialog-close').addEventListener('click', closeImage);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeImage(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); if (previousFocus) previousFocus.focus({preventScroll:true}); });
})();
