# Assets em docs/assets

CSS, JS e imagens usados pelas páginas HTML sob `docs/`.

## Estrutura

- `css/` — Folhas de estilo partilhadas (`laboratorio.css`, `loja.css`, `portal-responsive.css`, `vitrine-ete.css`, `caracore-core-typography.css`, `caracore-institutional-components.css`, `evolution-status.css`, `wiki*.css`, etc.)
- `css/pages/` — Estilos extraídos por página (`page-*.css`), referenciados pelos HTML em `docs/`
- `js/` — Scripts (ex.: `main.js`)
- `img/` — Imagens específicas das páginas em `docs/`
- `pdf/` — PDF gerados (manual Ouro 4.0)

## Uso nas páginas

CSS: caminho relativo, por exemplo `assets/css/laboratorio.css` a partir de uma página em `docs/`.

JS: `assets/js/main.js` quando necessário.

Imagens nesta pasta: `assets/img/nome.png`

## Imagens no resto do repositório

Várias páginas usam ainda `assets/images/` na raiz do projeto (aulas, artigos); não são duplicadas aqui.
