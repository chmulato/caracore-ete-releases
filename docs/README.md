# PÃ¡ginas Web - GitHub Pages

Esta pasta contÃ©m os arquivos HTML que serÃ£o publicados no GitHub Pages (repositÃ³rio pÃºblico **chmulato/ETE-releases**).

**Portal publicado em:** https://chmulato.github.io/ETE-releases/

## Estrutura

- `index.html` - Portal / pÃ¡gina inicial
- `index_v2.html` - Apostila HTML (versÃ£o atual - Terras Raras)
- `artigo_ete_v3.html` - Artigo executivo (versÃ£o revisada e validada)
- `laboratorio_campo_largo.html` - LaboratÃ³rio Ouro 4.0
- `canal-feedback.html` - Canal de feedback (WhatsApp e Telegram) para sugestÃµes, bugs e insights
- `download.html` - Download do instalador

## ConfiguraÃ§Ã£o do GitHub Pages

### MÃ©todo 1: Via Interface Web (Mais Simples)

1. Acesse: **Settings â†’ Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `main` (ou `master`)
4. **Folder:** `/web`
5. Clique em **Save**

### MÃ©todo 2: Via GitHub Actions (AutomÃ¡tico)

O workflow `.github/workflows/pages.yml` jÃ¡ estÃ¡ configurado. Basta:

1. **Settings â†’ Pages**
2. **Source:** `GitHub Actions`
3. Fazer commit e push (deploy automÃ¡tico)

## URLs Resultantes

ApÃ³s configuraÃ§Ã£o, as pÃ¡ginas estarÃ£o disponÃ­veis em:

- `https://[usuario].github.io/[repositorio]/` - PÃ¡gina inicial com links
- `https://[usuario].github.io/[repositorio]/index_v2.html` - Apostila TÃ©cnica
- `https://[usuario].github.io/[repositorio]/artigo_ete_v3.html` - Artigo Executivo
- `https://[usuario].github.io/[repositorio]/index.html` - Apostila Legada

## Caminhos de Imagens

As imagens sÃ£o referenciadas com caminhos relativos:
- `../assets/images/artigos/` - Para artigos
- `../assets/images/aulas/` - Para apostilas

Estes caminhos funcionam porque o GitHub Pages serve tudo da raiz do repositÃ³rio.

## DocumentaÃ§Ã£o Completa

Consulte `GUIA_GITHUB_PAGES.md` na raiz do projeto para instruÃ§Ãµes detalhadas.

