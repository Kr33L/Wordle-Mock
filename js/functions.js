function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
};

loadScript('js/words.js');
setTimeout(() => { loadScript('js/main.js'); });