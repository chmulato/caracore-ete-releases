# Consolidação: ETE Ambiental + ETE Mineração — Produto Único Ouro 4.0

Documento de arquitetura e estratégia que consolida os ecossistemas ETE Ambiental e ETE Mineração em um único produto comercial e científico de alta performance para a **Cara-Core Informática**. Objetivo: ciência do Prof. Pawlowsky + viabilidade comercial, com UX fluida, segura e educativa.

---

## 1. Simbiose (Logic & Flow)

### 1.1 Fluxo de dados

- **Ambiental (Free):** Produz dados purificados ao final de cada simulação: volume de água tratada, pH residual, opcionalmente DQO/DBO e vazão.
- **Persistência:** Esses dados são gravados em estado global (e, se desejado, em arquivo leve, ex.: `~/.ouro40/ambiental_last_run.json`).
- **Mineração (Premium):** Ao abrir o módulo Mineração, o sistema **lê** o estado global. Os dados do Ambiental alimentam as **equações de precipitação** e decantação do refino (pH em cascata, volume, concentrações).

### 1.2 Gatekeeper (Validação license.key)

- **Cálculo em tempo real:** O sistema **sempre** calcula o potencial de lucro (ex.: g de REE, kg equivalente) com base nos dados do Ambiental, mesmo quando o usuário não possui licença. Isso gera desejo e transparência.
- **Controles de refino:** O acesso aos controles de refino (iniciar processo, ajustar parâmetros, exportar resultados) **só é liberado** após validação da `license.key`:
  - Função central: `check_mining_authorization()` → lê HID da máquina, valida `license.key` (ou token persistido), retorna `True`/`False`.
  - **Sem licença:** Dashboard “embaçado” ou com cadeados; exibição em modo **preview** do potencial (“Poderia extrair X g REE · Y kg eq.”); botão “Desbloquear” abre modal de pagamento.
  - **Com licença:** HUD completo (âmbar/ouro), controles habilitados, cálculos reais de refino liberados.

Referência de implementação: [ARQUITETURA_SIMBIOSE_AMBIENTAL_MINERACAO.md](ARQUITETURA_SIMBIOSE_AMBIENTAL_MINERACAO.md).

---

## 2. Back-office (licencas_ete.html)

- **Estrutura de auditoria:** A página lê fontes de pedidos (dados em memória/sessão ou **arquivo JSON** carregado via “Carregar log de pedidos”).
- **LGPD Resguardo:** Em exibição pública/administrativa simplificada são mostrados **apenas**:
  - [Data/Hora]
  - [Hardware ID Anônimo]
  - [Status]
  Não são exibidos nomes, CPFs, contatos nem ID de pedido/valor na tabela principal (resguardo máximo).
- **Ordenação e agrupamento:** Pedidos em ordem **decrescente** (mais recentes primeiro), agrupados por **blocos mensais** (ex.: --- FEVEREIRO 2026 ---) para fechamento contábil da Cara-Core.
- **Formato de log esperado (JSON):** Array de objetos com `dataHora`, `hardwareId`, `status` (e opcionalmente `id`, `chave`). O painel aceita também variações como `data_hora`, `hardware_id`, `hid`.

---

## 3. Checkout R$ 29,90 (Automação)

- **Modal de upgrade (portal e protótipo):**
  - **CNPJ exibido dinamicamente:** 23.969.028/0001-37 (configurável via constante).
  - **Valor configurável:** Constante `PREMIUM_PRICE` ou `CONFIG.VALOR` (ex.: 29.90) exibida em “R$ 29,90”.
- **Botão “Copiar Hardware ID para WhatsApp”:** Gera mensagem pronta (valor + ID de Ativação + texto para envio com comprovante PIX), reduzindo a fricção entre desejo de compra e confirmação do PIX.
- Página estática de referência: upgrade-ouro40.html.

---

## 4. Visualização de dados e legado

- **Gráficos de intersecção matemática:** No painel principal (protótipo painel-simbiotico.html) estão integrados:
  - **Titulação pH** (curva pH × volume de titulante; ponto de equivalência).
  - **Solubilidade × pH** (curva de solubilidade em função do pH).
  Esses gráficos refletem as equações e o legado científico (Pawlowsky).
- **Selo de Qualidade Pawlowsky:** Presente como assinatura de autoridade em **todas** as telas relevantes (Ambiental e Mineração, painel de convergência, upgrade).
- **Barra de auditoria inferior (Log de Operação):** Cada ativação de licença (e, no protótipo, abertura do modal de upgrade) é registrada **localmente** (ex.: `localStorage` no navegador; no app, arquivo `~/.ouro40/audit.log` ou equivalente) para suporte técnico e auditoria, sem envio obrigatório a servidor (LGPD).

---

## 5. Objetivo final

- **Sistema coeso:** Um único produto onde a ciência do Prof. Pawlowsky encontra a viabilidade comercial da Cara-Core.
- **Experiência:** Fluida (fluxo Ambiental → Mineração claro), segura (license.key, LGPD, sem dados sensíveis na interface de auditoria) e educativa (gráficos de intersecção, selo de qualidade, narrativa “da água ao mineral”).

Implementações de código (Python, Streamlit, HID, validador, audit log) ficam no repositório **chmulato/ETE**; o portal **caracore-ete-releases** mantém as páginas estáticas, o painel de licenças e os protótipos de referência.

