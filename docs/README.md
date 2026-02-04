# Páginas Web - GitHub Pages

Esta pasta contém os arquivos HTML que serão publicados no GitHub Pages (repositório público **chmulato/ETE-releases**).

**Portal publicado em:** [https://chmulato.github.io/ETE-releases/](https://chmulato.github.io/ETE-releases/)

## Estrutura

- `index.html` - Portal / página inicial
- `index_v2.html` - Apostila HTML (versão atual - Terras Raras)
- `artigo_ete_v3.html` - Artigo executivo (versão revisada e validada)
- `laboratorio_campo_largo.html` - Laboratório Ouro 4.0
- `canal-feedback.html` - Canal de feedback (WhatsApp e Telegram) para sugestões, bugs e insights
- `download.html` - Download do instalador

## Configuração do GitHub Pages

### Método 1: Via Interface Web (Mais Simples)

1. Acesse: **Settings → Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `main` (ou `master`)
4. **Folder:** `/web`
5. Clique em **Save**

### Método 2: Via GitHub Actions (Automático)

O workflow `.github/workflows/pages.yml` já está configurado. Basta:

1. **Settings → Pages**
2. **Source:** `GitHub Actions`
3. Fazer commit e push (deploy automático)

## URLs Resultantes

Após configuração, as páginas estarão disponíveis em:

- `https://[usuario].github.io/[repositorio]/` - Página inicial com links
- `https://[usuario].github.io/[repositorio]/index_v2.html` - Apostila Técnica
- `https://[usuario].github.io/[repositorio]/artigo_ete_v3.html` - Artigo Executivo
- `https://[usuario].github.io/[repositorio]/index.html` - Apostila Legada

## Caminhos de Imagens

As imagens são referenciadas com caminhos relativos:
- `../assets/images/artigos/` - Para artigos
- `../assets/images/aulas/` - Para apostilas

Estes caminhos funcionam porque o GitHub Pages serve tudo da raiz do repositório.

## Documentação Completa

Consulte `GUIA_GITHUB_PAGES.md` na raiz do projeto para instruções detalhadas.
