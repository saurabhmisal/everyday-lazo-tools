(() => {
  const motionToggle = document.querySelector('.motion-toggle');
  motionToggle.hidden = false;
  motionToggle.addEventListener('click', () => {
    const paused = document.body.classList.toggle('motion-paused');
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.textContent = paused ? 'Play animation' : 'Pause animation';
  });
  const steps = [...document.querySelectorAll('[data-step]')];
  const replay = document.querySelector('.replay');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timers = [];
  const clear = () => { timers.forEach(clearTimeout); timers = []; steps.forEach(s => s.classList.remove('active')); };
  function play() {
    clear();
    if (reduced.matches) return;
    steps.forEach((step, i) => timers.push(setTimeout(() => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    }, i * 1400)));
    timers.push(setTimeout(clear, 4600));
  }
  replay.hidden = false;
  replay.addEventListener('click', play);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { play(); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(document.querySelector('.workflow'));
  }
  const syncMotion = () => { clear(); motionToggle.hidden = reduced.matches; };
  const scene = document.querySelector('.scene-story');
  let sceneVisible = true;
  const suspend = () => document.body.classList.toggle('motion-suspended', document.hidden || !sceneVisible || reduced.matches);
  if (scene && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => { sceneVisible = entries.some(entry => entry.isIntersecting); suspend(); }).observe(scene);
  }
  document.addEventListener('visibilitychange', suspend);
  reduced.addEventListener('change', suspend);
  suspend();
  syncMotion();
  reduced.addEventListener('change', syncMotion);
  window.addEventListener('pagehide', clear);
})();
