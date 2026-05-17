# Páginas públicas do portal ETE

Esta pasta (`docs/`) é a fonte do site publicado na loja e vitrine (fluxo automático para `chmulato/ETE-releases`, domínio típico https://ete.caracore.com.br/).

## Foco de negócio

A primeira impressão deve orientar decisão e produto Minerador 4.0: `index.html`, `investidores_onepager.html`, protótipo de degustação, download e narrativa executiva. Documentação interna da equipa pertence a `library/` (Markdown), não a `docs/`.

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

Ver `library/publicacao_site_loja.md`.

## Alinhamento oficina ↔ loja (`caracore-ete-releases`)

- **Fonte da vitrine partilhada:** editar primeiro em **`caracore-ete/docs`** (HTML, `assets/css/` incl. `pages/`, JS da vitrine, `premissas/`, MD espelhados).
- **Loja:** `caracore-ete-releases/docs` inclui o mesmo conjunto **mais** páginas só da loja (`wiki/`, upgrade, termos, licenças, painéis, `artifacts/`, `loja.css`, etc.).
- **Sincronizar oficina → loja (PowerShell):**  
  `robocopy D:\dev\caracore-ete\docs D:\dev\caracore-ete-releases\docs /E /IS /IT`  
  **Não** usar `/MIR` — assim não se apagam ficheiros exclusivos da loja.
- **Após cada release:** o número em **`docs/artifacts/VERSION`** na loja deve coincidir com **`VERSION`** na raiz da oficina.

## Imagens

Caminhos relativos conforme cada HTML; ver `docs/assets/README.md`.
