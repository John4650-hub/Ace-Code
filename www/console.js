const el = document.createElement('div');
document.body.appendChild(el);

eruda.init({
  container: el,
  tool: ['console'],
  useShadowDom: true,
  autoScale: true,
  defaults: {
    displaySize: 5,
    transparency: 0.9,
    theme: 'Monokai Pro'
  }
});
