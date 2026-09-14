if (typeof Lenis === 'undefined') {
  console.error('Lenis não carregou. Verifique o link do CDN ou sua conexão.');
} else {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}