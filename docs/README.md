# Páginas públicas do portal ETE

Esta pasta (`docs/`) publica o site na vitrine **ete.caracore.com.br**. O conteúdo partilhado com a oficina deve manter-se **idêntico** ao de `caracore-ete/docs` (sincronização por robocopy; ver secção abaixo).

## Foco de negócio

A primeira impressão deve orientar decisão e produto Minerador 4.0: `index.html`, `investidores_onepager.html`, protótipo de degustação, download e narrativa executiva. Documentação interna da equipa na **oficina** pertence a `library/` (Markdown), não a `docs/` aqui na loja.

## Entradas principais

- `index.html` — Portal
- `investidores_onepager.html` — decisão e oferta
- `prototipo_degustacao_minerador.html` — maquete do fluxo do produto
- `download.html` — instaladores
- `artigo_ete_v3.html` — artigo executivo
- `laboratorio_campo_largo.html` — laboratório Campo Largo Ouro 4.0
- Guias de instalação (vitrine em HTML): `instalacao_multiplataforma.html`, `instalacao_windows.html`, `instalacao_linux.html`, `instalacao_macos.html`. Cópias Markdown (`INSTALACAO_*.md`) mantêm-se para o repositório e releases.
- MVP financeiro: `mvp_financeiro_v1.html` (vitrine); síntese em Markdown em `mvp_financeiro_v1.md`.

## Publicação e operações

Documentação da esteira na **oficina:** `caracore-ete` → `library/publicacao_site_loja.md`.

## Alinhamento loja ↔ oficina (`caracore-ete`)

- **Vitrine partilhada:** HTML, `assets/css/` (incl. `pages/`), `assets/js/vitrine-shell.js`, `premissas/`, guias `.md` — espelho do repo **`caracore-ete/docs`**.
- **Só na loja (não sobrescrever pelo robocopy deste lado):** `wiki/`, `upgrade-ouro40.html`, termos/licenças/painéis, `artifacts/`, `assets/css/loja.css`, `evolution-status.css`, tipografia/wiki em `assets/css/`, etc.
- **Atualizar a partir da oficina:**  
  `robocopy D:\dev\caracore-ete\docs D:\dev\caracore-ete-releases\docs /E /IS /IT`  
  Sem `/MIR`. Depois confira **`docs/artifacts/VERSION`** = **`caracore-ete/VERSION`**.

## Imagens

Caminhos relativos conforme cada HTML; ver `docs/assets/README.md`.
