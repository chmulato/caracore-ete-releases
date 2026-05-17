/**
 * Injeta a barra de navegação partilhada da vitrine ETE (docs/).
 * Desativar numa página: <html data-no-vitrine-nav="true"> ou documentElement.dataset.noVitrineNav = 'true' antes do script.
 */
(function () {
  'use strict';

  if (document.documentElement.getAttribute('data-no-vitrine-nav') === 'true') {
    return;
  }

  var items = [
    { href: 'index.html', label: 'Portal' },
    { href: 'investidores_onepager.html', label: 'Negócio' },
    { href: 'download.html', label: 'Download' },
    { href: 'instalacao_multiplataforma.html', label: 'Instalação' },
    { href: 'mvp_financeiro_v1.html', label: 'MVP financeiro' },
    { href: 'prototipo_degustacao_minerador.html', label: 'Degustação' },
    { href: 'canal-feedback.html', label: 'Feedback' }
  ];

  var raw = (window.location.pathname || '').split('/').pop() || 'index.html';
  var path = raw.split('?')[0].split('#')[0];
  if (!path || path === '') path = 'index.html';

  var inner = document.createElement('div');
  inner.className = 'vitrine-nav-inner';

  var brand = document.createElement('a');
  brand.className = 'vitrine-brand';
  brand.href = 'index.html';
  brand.textContent = 'Minerador 4.0 · ETE';
  inner.appendChild(brand);

  var linkRow = document.createElement('div');
  linkRow.className = 'vitrine-links';

  items.forEach(function (item) {
    var a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    if (path === item.href) {
      a.setAttribute('aria-current', 'page');
    }
    linkRow.appendChild(a);
  });

  inner.appendChild(linkRow);

  var nav = document.createElement('nav');
  nav.className = 'vitrine-nav';
  nav.setAttribute('aria-label', 'Navegação da vitrine ETE');
  nav.appendChild(inner);

  if (document.body) {
    document.body.insertBefore(nav, document.body.firstChild);
  }
})();
