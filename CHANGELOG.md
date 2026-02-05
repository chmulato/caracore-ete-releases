# Changelog — chmulato/ETE

Todas as mudanças notáveis do ecossistema **chmulato/ETE** (Conhecimento Aberto + Ferramenta de Execução) são documentadas neste arquivo.

- **Formato:** [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).
- **Versionamento:** [Semantic Versioning](https://semver.org/lang/pt-BR/) para releases do instalador desktop.
- **Categorias de entrega:** [Web/Manifesto] | [Simulador/Engine] | [Legal/DPO] | [DevOps/Automação].

Cada versão inclui uma nota de **Impacto** para o jovem de Campo Largo e para a soberania tecnológica.

---

## [Unreleased]

### [Web/Manifesto]
- *(Nenhuma entrada pendente listada.)*

### [Simulador/Engine]

#### Adicionado
- **Shell Electron (opcional)** — [electron/](electron/): aplicativo desktop alternativo ao pywebview. O Electron inicia o backend Flask com `python -m minerador_40.main --flask-only` e abre o dashboard em uma janela Chromium. Uso: `cd electron && npm install && npm start`. Documentação em [electron/README.md](electron/README.md). O launcher Python continua disponível com `python run_minerador40.py` (pywebview).
- **Modo `--flask-only`** no [minerador_40/main.py](minerador_40/main.py): sobe apenas o servidor Flask na porta 5150, sem abrir janela; usado pelo Electron e em testes E2E.

### [Legal/DPO]
- *(Nenhuma entrada pendente listada.)*

### [DevOps/Automação]

#### Adicionado
- **Script de build local** — [scripts/build_dist_local.py](scripts/build_dist_local.py): por padrão usa o Python atual e gera `dist/Minerador40.exe` e checksums (recomendado Python 3.10.x para alinhar com CI). No Windows, tenta detectar 3.10 em `PYTHON310`, pasta `python/` ou `python/PCbuild/amd64/`. Opções: `--require-python-310` (falhar se não for 3.10), `--python PATH` (executável 3.10), `--skip-version-check` (obsoleto; padrão já continua com qualquer versão). Documentação no [README.md](README.md).
- **Testes E2E com Selenium** — [tests/selenium/](tests/selenium/): suíte de testes de regras de negócio na interface. Conftest inicia o Flask em thread e usa Chrome headless (webdriver-manager). Cobertura: validação ambiental (pH 6–9, DBO ≤ 120, limites e rejeições), desbloqueio da Fase 2, navegação (CTA "Conhecer a Fase 2", steps 1/2), simulação Lab (preview bloqueado sem premium ou métricas com licença), modais Biblioteca Digital e Galeria Estratégica, ativação de licença (chave vazia/inválida), trilha (The Trail), fontes acadêmicas, Índice de Soberania, PIX e link de suporte. Marcador pytest `selenium`; execução: `pytest tests/selenium/ -v`. Dependências: `selenium`, `webdriver-manager` em [requirements.txt](requirements.txt).
- **Ampliação da cobertura Selenium**: 20 testes cobrindo bordas (pH 9 aprovado, pH >9 rejeitado), abertura de entrada na Biblioteca e volta, carregamento da Galeria, mensagens de ativação de licença e elementos de apoio (trail, fontes, PIX).

#### Planejado
- Testes exaustivos do instalador .exe em máquinas limpas (Windows); validação de portabilidade.

---

## [1.1.9] — 2026-01-26

### Impacto

| Público | Efeito |
|--------|--------|
| **Jovem de Campo Largo** | Interface unificada Ambiental ↔ Mineração com fluxo visual; Termos de Uso e Créditos acessíveis pelo Selo Pawlowsky e exibidos antes da primeira ativação Premium; clareza sobre inspiração científica e propriedade do software. |
| **Soberania tecnológica** | Cláusula de Salvaguarda de Legado (Cara-Core, família Pawlowsky, UFPR); build local único (`python scripts/build_dist_local.py`). |

### [Simulador/Engine]

#### Adicionado
- **Layout simbiótico** — Painel dividido: esquerda (ETE Ambiental), faixa central animada (fluxo água tratada), direita (ETE Mineração). Gradiente verde → dourado; módulo Mineração com glassmorphism e badge "Upgrade Premium" quando bloqueado.
- **Modal Desbloqueio de Protocolo Secreto** — Infográfico "Como a Mineração completa seu ciclo ambiental", dados Cara-Core e Hardware ID, ativação por chave; acessível pelo botão de upgrade no overlay.
- **Termos de Uso e Créditos** — Cláusula de Salvaguarda de Legado: atribuição de honra (Pawlowsky/UFPR), propriedade de software (Cara-Core), disclaimer de responsabilidade, uso de imagem. Acessível pelo Selo de Qualidade; exibida antes da primeira ativação Premium (aceite + localStorage).

### [Legal/DPO]

#### Adicionado
- **Cláusula de Salvaguarda de Legado** no simulador: inspiração científica vs. propriedade (código, UI/UX, marca Minerador 4.0 — Cara-Core Informática CNPJ 23.969.028/0001-37); isenção para família Pawlowsky e UFPR; uso de imagem apenas educativo/homenagem.

### [DevOps/Automação]

#### Alterado
- **Build local único** — Referências unificadas em `python scripts/build_dist_local.py`; [minerador_40/README.md](minerador_40/README.md), [build_minerador40.spec](minerador_40/build_minerador40.spec) e [minerador_40/main.py](minerador_40/main.py) apontam apenas para esse script.

---

## [1.1.0] — 2026-01-26

### Impacto

| Público | Efeito |
|--------|--------|
| **Jovem de Campo Largo** | Primeiro delivery no portal público ETE-releases: download do Minerador 4.0 (.exe) com checksums; canal de melhorias (WhatsApp, Telegram, e-mail) para sugestões e bugs. Código-fonte protegido — apenas instalador e site no repositório público. |
| **Soberania tecnológica** | Separação clara: desenvolvimento em chmulato/ETE; distribuição e vitrine em chmulato/ETE-releases. Integridade via SHA-256/MD5; guia INSTALACAO.md em cada release. |

### [DevOps/Automação]

#### Adicionado
- **Primeiro delivery para chmulato/ETE-releases:** workflow de delivery publica Minerador40.exe, checksum.sha256, checksum.md5 e INSTALACAO.md nas Releases do repositório público; README e LICENSE garantidos no branch. Código-fonte não é enviado (proteção por arquitetura).
- **Guia de primeiro delivery:** [library/PRIMEIRO_DELIVERY.md](library/PRIMEIRO_DELIVERY.md) com checklist, secret `TOKEN_DELIVERY_CHMULATOETE_TO_REALEASES` e comandos para tag e push.

### [Web/Manifesto]
- Portal (docs/) e canal de feedback (canal-feedback.html) com WhatsApp, Telegram e e-mail; link do portal incluído no simulador (Reportar Evolução, The Trail, Galeria).

---

## [1.0.0] — 2025-01-26

### Impacto

| Público | Efeito |
|--------|--------|
| **Jovem de Campo Largo** | Acesso a um manifesto web (Ouro 4.0) que responde "por que aprender isso?" e a um simulador desktop que gamifica a jornada Ambiental → Mineração. Manual PDF e Skill Tree com persistência local permitem progressão sem conta. Download do .exe via portal; badge de build transmite confiança. |
| **Soberania tecnológica** | Conhecimento (HTML, PDF) e ferramenta (Python, .exe) desacoplados: a vitrine é patrimônio aberto; o motor de cálculo é instalável e auditável. Pipeline CI valida matemática antes do release; checksum MD5 permite verificação de integridade do binário. |

---

### [Web/Manifesto]

#### Adicionado
- **Laboratório Campo Largo: Ouro 4.0** ([web/laboratorio_campo_largo.html](web/laboratorio_campo_largo.html))
  - Três pilares (O Código, A Matéria, O Futuro); mindset 2025/2026 (Soberania Digital vs. Atômica, Ouro 4.0 & Economia Espacial, IA + Bancada de Lab, Geopolítica de Quintal).
  - Janela do Visionário: timeline 2025→2030→2040, Manifesto do Visionário, imagem do Arquiteto da Realidade.
  - Nível 0: terminal simulado com script Python ETE, checklist de carreira, botões Manual PDF e GitHub; efeito de digitação no título.
  - O Oráculo: painel com medidores (Pureza, Custo, Valor LME), What-If, link para dados no repositório (glassmorphism, neon verde/âmbar).
  - The Blueprint: equivalência grade IFPR ↔ Jornada Marte, link ementa IFPR Campo Largo, badge grau (Técnico Integrado / Superior Tecnológico).
  - The Skill Tree: checklist em três níveis (Scripting & Scouting, Process Engineer, Deep Tech Architect) com checkboxes persistentes em `localStorage`, barra de progresso, cartões com bordas que mudam ao completar.
  - Dedicatória ao Prof. Urivald Pawlowsky (UFPR); rodapé Campo Largo Tech Hub (Mapa de Poder Local, contador "Mentes Ativas").
- **Download Central — Dashboard de Controle** (na mesma página)
  - Botão dinâmico "Baixar Versão Estável v1.0 (Windows)" apontando para `https://github.com/chmulato/ETE/releases/latest`.
  - Badge de status do build (GitHub Actions) e rótulo "Versão validada e Online".
  - Seção **Artefatos de Confiança**: cálculos validados via PyTest (`tests/test_engine.py`), pipeline testes → PyInstaller → Release, MD5 checksum no Release. Ícones de sistema (engrenagem, check) e estilo painel de monitoramento.
- **Manual de Iniciação — Ouro 4.0** em PDF: [web/assets/pdf/Manual_Iniciacao_Ouro40.pdf](web/assets/pdf/Manual_Iniciacao_Ouro40.pdf); gerado por `gerar_manual_ouro40_pdf.py`; botão de download na página Ouro 4.0.
- **CSS** ([web/assets/css/laboratorio.css](web/assets/css/laboratorio.css)) e **JS** ([web/assets/js/main.js](web/assets/js/main.js)): tema escuro, persistência Skill Tree, efeito digitação.
- **Imagens** em [web/assets/img/](web/assets/img/): ifpr.png, o_arquiteto_da_realidade.png, a_ementa.png, your_curriculum.png, dedicatoria.png, campo_largo_tech_hub.png.
- **Metadados OpenGraph** para compartilhamento (og:title, og:image, og:url).
- Link no [index.html](index.html) principal para Manual PDF e Laboratório Campo Largo (rodapé).

#### Alterado
- Dedicatória ao Prof. Pawlowsky: link quebrado (Escavador) removido; sugerido que alunos perguntem à IA ou ao mentor sobre o professor.

---

### [Simulador/Engine]

#### Adicionado
- **Aplicativo desktop "Campo Largo: Minerador 4.0"** ([minerador_40/](minerador_40/))
  - Stack: pywebview (UI), Flask (API local), motor ETE em Python; build Windows via PyInstaller ([build_minerador40.spec](minerador_40/build_minerador40.spec)).
  - **Engine** ([minerador_40/engine.py](minerador_40/engine.py)): `validar_ambiental`, `calcular_neutralizacao_rejeito`, `indice_soberania`; dados simulados para campo (heatmap) e mercado (LME).
  - **API** ([minerador_40/app.py](minerador_40/app.py)): `/api/campo`, `/api/lab/simular`, `/api/mercado`, `/api/ambiental/validar`, `/api/ambiental/neutralizacao`, `/api/soberania`.
- **Fase 1 — O Guardião Ambiental (ETE Ambiental):** validação pH/DBO, score ambiental; desbloqueia Fase 2 ao atingir conformidade.
- **Fase 2 — O Alquimista de Metais (ETE Mineração):** desbloqueada após conformidade; massa de óxidos, lantanídeos, valor de mercado; rejeito enviado ao módulo Ambiental para neutralização.
- **Stepper** no dashboard: [Ambiental: Protegendo o Solo] → [Mineração: Extraindo Valor]; Mineração bloqueada até validação ambiental.
- **Índice de Soberania:** score combinado (Ambiental + Mineração).
- **The Trail — Trilha de Aprendizado:** barra de progresso (estudos teóricos + conquistas no simulador); progresso em `localStorage`.
- **Licenciamento (The Golden Gate)** — [minerador_40/license.py](minerador_40/license.py): validação local de chave (formato `MIN40-XXXXX-XXXXX-XXXXX`), chaves demo, persistência (arquivo criptografado `%APPDATA%/Minerador40/license.dat` e opcionalmente registro Windows). API: `GET /api/license/status`, `POST /api/license/activate`, `GET /api/checkout/pix`. Paywall na Fase 2 com QR PIX (R$ 29,90), preview borrado quando não premium.
- **Biblioteca Digital** — [minerador_40/biblioteca.py](minerador_40/biblioteca.py): conteúdo pedagógico (Kps, cascata, viabilidade, feedstock, CONAMA 430, Parque Newton Puppi); tooltips nos labels; modal "Biblioteca Digital"; entradas Premium bloqueadas até ativação. API: `/api/biblioteca/list`, `/api/biblioteca/entry/<id>`, `/api/tooltips`, `/api/fontes`. Seção Fontes Acadêmicas (Prof. Pawlowsky, CONAMA, Sillén & Martell, Henze et al.).
- **Inventário de imagens e Galeria Estratégica** — [minerador_40/asset_cards.py](minerador_40/asset_cards.py), [docs/INVENTARIO_IMAGENS_ESTRATEGICAS.md](docs/INVENTARIO_IMAGENS_ESTRATEGICAS.md): cards de estudo com link "Estude isto"; modal Galeria Estratégica; selo dedicatoria.png no painel Ambiental. API: `/api/asset-cards`, `/api/asset-cards/<id>`, `/api/asset-cards/categorias`.
- **Validação Growth & PIX** — [docs/VALIDACAO_GROWTH_PIX.md](docs/VALIDACAO_GROWTH_PIX.md): News-Driven UI ([minerador_40/news_alert.py](minerador_40/news_alert.py), `GET /api/news/alert`, banner no topo); Coffee Strategy (copy Golden Gate); botão "Compartilhar meu Índice"; CTA pós-ambiental ("Conhecer a Fase 2"); hero "Por que aprender isso? Porque aqui você domina a matéria-prima que constrói o videogame e o futuro do país."
- **UI:** estética Centro de Refino Espacial; dedicatória Pawlowsky como Selo de Qualidade.

---

### [Legal/DPO]

#### Adicionado
- **Canal de feedback e LGPD** — [docs/CANAL_FEEDBACK_LGPD.md](docs/CANAL_FEEDBACK_LGPD.md): cláusula de consentimento para canais de suporte; triagem de vulnerabilidades (Buffer: falha crítica documentada privadamente antes de nota pública); catalogação Origem → Tipo → Ação em [docs/BACKLOG_EVOLUCAO.md](docs/BACKLOG_EVOLUCAO.md); comunicação de marca (Professor Inspirador + Engenheiro Sério).
- **Seção "Reportar Evolução"** no simulador: canais oficiais (e-mail, Discord/WhatsApp/Telegram via repositório), aviso de privacidade LGPD e mensagem de que o suporte faz a versão Full brilhar.

---

### [DevOps/Automação]

#### Adicionado
- **Validação de qualidade (Local QA)** — [tests/test_engine.py](tests/test_engine.py): PyTest para `validar_ambiental`, `calcular_neutralizacao_rejeito`, `indice_soberania`, `simular_lab` (com `is_premium` mockado). O pipeline só avança se a matemática estiver correta.
- **Pipeline de integração** — [.github/workflows/build_exe.yml](.github/workflows/build_exe.yml): job `test` (Pytest em ubuntu-latest); job `build` (windows-latest, PyInstaller, MD5 checksum, artefato Minerador40-Windows); job `release` (em push de tag `v*`, cria GitHub Release e anexa .exe + checksum.md5).
- **Spec PyInstaller** — [minerador_40/build_minerador40.spec](minerador_40/build_minerador40.spec): configuração para gerar `Minerador40.exe` com templates e static embutidos.

#### Corrigido
- Spec PyInstaller: variável `SPECPATH` ajustada para derivar corretamente o root do projeto quando PyInstaller injeta o caminho do spec.

---

## Como usar este changelog

- **[Unreleased]:** alterações planejadas ou em desenvolvimento.
- **[X.Y.Z]:** versão de release; para o instalador, use a tag `vX.Y.Z` no GitHub para disparar o release automático.
- **Impacto:** cada versão documenta o efeito para o jovem de Campo Largo (formação, acesso, confiança) e para a soberania tecnológica (patrimônio aberto, ferramenta auditável, pipeline confiável).

[Unreleased]: https://github.com/chmulato/ETE/compare/v1.1.9...HEAD  
[1.1.9]: https://github.com/chmulato/ETE/releases/tag/v1.1.9  
[1.1.0]: https://github.com/chmulato/ETE/releases/tag/v1.1.0  
[1.0.0]: https://github.com/chmulato/ETE/releases/tag/v1.0.0
