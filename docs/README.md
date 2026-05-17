# Páginas Web — GitHub Pages

Esta pasta contém os ficheiros HTML publicados no GitHub Pages (repositório público chmulato/ETE-releases ou equivalente configurado no repo de releases).

Portal publicado: https://ete.caracore.com.br/

Documentação da oficina em formato TXT (comandos, premissas, memória): pasta `oficina/` dentro de `docs/`. Começar por `oficina/00_INDICE.txt`.

## Estrutura

- `index.html` — Portal / página inicial
- `index_v2.html` — Apostila HTML (Terras Raras)
- `artigo_ete_v3.html` — Artigo executivo
- `laboratorio_campo_largo.html` — Laboratório Ouro 4.0
- `canal-feedback.html` — Canal de feedback
- `download.html` — Download do instalador

## Configuração do GitHub Pages (interface web)

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: main (ou master)
4. Folder: `/docs` conforme o repositório (no projeto de releases pode ser `/web`; verificar em Settings)
5. Save

Com GitHub Actions: definir Source como GitHub Actions se existir workflow de deploy automático.

## URLs resultantes

Após a configuração, exemplos típicos:

- `https://[usuario].github.io/[repositorio]/` — entrada
- `.../index_v2.html` — apostila técnica
- `.../artigo_ete_v3.html` — artigo executivo

## Caminhos de imagens

Caminhos relativos; artigos e apostilas podem usar `../assets/images/aulas/` ou `../assets/images/artigos/` conforme a página.

## Documentação adicional

Referência operacional do site e do deploy: `docs/oficina/GITHUB_PAGES.txt` e índice `docs/oficina/00_INDICE.txt`.

Guia histórico em Markdown (pode estar desalinhado com o workflow actual): `library/GUIA_GITHUB_PAGES.md`.
