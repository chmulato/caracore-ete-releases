# ConsolidaÃ§Ã£o: ETE Ambiental + ETE MineraÃ§Ã£o â€” Produto Ãšnico Ouro 4.0

Documento de arquitetura e estratÃ©gia que consolida os ecossistemas ETE Ambiental e ETE MineraÃ§Ã£o em um Ãºnico produto comercial e cientÃ­fico de alta performance para a **Cara-Core InformÃ¡tica**. Objetivo: ciÃªncia do Prof. Pawlowsky + viabilidade comercial, com UX fluida, segura e educativa.

---

## 1. Simbiose (Logic & Flow)

### 1.1 Fluxo de dados

- **Ambiental (Free):** Produz dados purificados ao final de cada simulaÃ§Ã£o: volume de Ã¡gua tratada, pH residual, opcionalmente DQO/DBO e vazÃ£o.
- **PersistÃªncia:** Esses dados sÃ£o gravados em estado global (e, se desejado, em arquivo leve, ex.: `~/.ouro40/ambiental_last_run.json`).
- **MineraÃ§Ã£o (Premium):** Ao abrir o mÃ³dulo MineraÃ§Ã£o, o sistema **lÃª** o estado global. Os dados do Ambiental alimentam as **equaÃ§Ãµes de precipitaÃ§Ã£o** e decantaÃ§Ã£o do refino (pH em cascata, volume, concentraÃ§Ãµes).

### 1.2 Gatekeeper (ValidaÃ§Ã£o license.key)

- **CÃ¡lculo em tempo real:** O sistema **sempre** calcula o potencial de lucro (ex.: g de REE, kg equivalente) com base nos dados do Ambiental, mesmo quando o usuÃ¡rio nÃ£o possui licenÃ§a. Isso gera desejo e transparÃªncia.
- **Controles de refino:** O acesso aos controles de refino (iniciar processo, ajustar parÃ¢metros, exportar resultados) **sÃ³ Ã© liberado** apÃ³s validaÃ§Ã£o da `license.key`:
  - FunÃ§Ã£o central: `check_mining_authorization()` â†’ lÃª HID da mÃ¡quina, valida `license.key` (ou token persistido), retorna `True`/`False`.
  - **Sem licenÃ§a:** Dashboard â€œembaÃ§adoâ€ ou com cadeados; exibiÃ§Ã£o em modo **preview** do potencial (â€œPoderia extrair X g REE Â· Y kg eq.â€); botÃ£o â€œDesbloquearâ€ abre modal de pagamento.
  - **Com licenÃ§a:** HUD completo (Ã¢mbar/ouro), controles habilitados, cÃ¡lculos reais de refino liberados.

ReferÃªncia de implementaÃ§Ã£o: [ARQUITETURA_SIMBIOSE_AMBIENTAL_MINERACAO.md](ARQUITETURA_SIMBIOSE_AMBIENTAL_MINERACAO.md).

---

## 2. Back-office (licencas_ete.html)

- **Estrutura de auditoria:** A pÃ¡gina lÃª fontes de pedidos (dados em memÃ³ria/sessÃ£o ou **arquivo JSON** carregado via â€œCarregar log de pedidosâ€).
- **LGPD Resguardo:** Em exibiÃ§Ã£o pÃºblica/administrativa simplificada sÃ£o mostrados **apenas**:
  - [Data/Hora]
  - [Hardware ID AnÃ´nimo]
  - [Status]
  NÃ£o sÃ£o exibidos nomes, CPFs, contatos nem ID de pedido/valor na tabela principal (resguardo mÃ¡ximo).
- **OrdenaÃ§Ã£o e agrupamento:** Pedidos em ordem **decrescente** (mais recentes primeiro), agrupados por **blocos mensais** (ex.: --- FEVEREIRO 2026 ---) para fechamento contÃ¡bil da Cara-Core.
- **Formato de log esperado (JSON):** Array de objetos com `dataHora`, `hardwareId`, `status` (e opcionalmente `id`, `chave`). O painel aceita tambÃ©m variaÃ§Ãµes como `data_hora`, `hardware_id`, `hid`.

---

## 3. Checkout R$ 29,90 (AutomaÃ§Ã£o)

- **Modal de upgrade (portal e protÃ³tipo):**
  - **CNPJ exibido dinamicamente:** 23.969.028/0001-37 (configurÃ¡vel via constante).
  - **Valor configurÃ¡vel:** Constante `PREMIUM_PRICE` ou `CONFIG.VALOR` (ex.: 29.90) exibida em â€œR$ 29,90â€.
- **BotÃ£o â€œCopiar Hardware ID para WhatsAppâ€:** Gera mensagem pronta (valor + ID de AtivaÃ§Ã£o + texto para envio com comprovante PIX), reduzindo a fricÃ§Ã£o entre desejo de compra e confirmaÃ§Ã£o do PIX.
- PÃ¡gina estÃ¡tica de referÃªncia: upgrade-ouro40.html.

---

## 4. VisualizaÃ§Ã£o de dados e legado

- **GrÃ¡ficos de intersecÃ§Ã£o matemÃ¡tica:** No painel principal (protÃ³tipo painel-simbiotico.html) estÃ£o integrados:
  - **TitulaÃ§Ã£o pH** (curva pH Ã— volume de titulante; ponto de equivalÃªncia).
  - **Solubilidade Ã— pH** (curva de solubilidade em funÃ§Ã£o do pH).
  Esses grÃ¡ficos refletem as equaÃ§Ãµes e o legado cientÃ­fico (Pawlowsky).
- **Selo de Qualidade Pawlowsky:** Presente como assinatura de autoridade em **todas** as telas relevantes (Ambiental e MineraÃ§Ã£o, painel de convergÃªncia, upgrade).
- **Barra de auditoria inferior (Log de OperaÃ§Ã£o):** Cada ativaÃ§Ã£o de licenÃ§a (e, no protÃ³tipo, abertura do modal de upgrade) Ã© registrada **localmente** (ex.: `localStorage` no navegador; no app, arquivo `~/.ouro40/audit.log` ou equivalente) para suporte tÃ©cnico e auditoria, sem envio obrigatÃ³rio a servidor (LGPD).

---

## 5. Objetivo final

- **Sistema coeso:** Um Ãºnico produto onde a ciÃªncia do Prof. Pawlowsky encontra a viabilidade comercial da Cara-Core.
- **ExperiÃªncia:** Fluida (fluxo Ambiental â†’ MineraÃ§Ã£o claro), segura (license.key, LGPD, sem dados sensÃ­veis na interface de auditoria) e educativa (grÃ¡ficos de intersecÃ§Ã£o, selo de qualidade, narrativa â€œda Ã¡gua ao mineralâ€).

ImplementaÃ§Ãµes de cÃ³digo (Python, Streamlit, HID, validador, audit log) ficam no repositÃ³rio **chmulato/ETE**; o portal **caracore-ete-releases** mantÃ©m as pÃ¡ginas estÃ¡ticas, o painel de licenÃ§as e os protÃ³tipos de referÃªncia.

