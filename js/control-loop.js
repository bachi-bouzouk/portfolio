(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  function applyLabel() {
    if (!btn) return;
    var current = root.getAttribute('data-theme') || (prefersLight ? 'light' : 'dark');
    btn.textContent = current === 'dark' ? 'Dark' : 'Light';
  }
  applyLabel();

  if (btn) {
    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || (prefersLight ? 'light' : 'dark');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      applyLabel();
      document.dispatchEvent(new CustomEvent('control-loop:theme-changed'));
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  window.ControlLoop = { root: root, reducedMotion: reduced };
})();
