(() => {
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
  reduced.addEventListener('change', clear);
  window.addEventListener('pagehide', clear);
})();
