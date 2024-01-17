const el = document.createElement('div');
document.body.appendChild(el);

eruda.init({
  container: el,
  useShadowDom: true,
  autoScale: true,
  defaults: {
    displaySize: 100,
    transparency: 0.9,
    theme: 'Monokai Pro'
  }
});
