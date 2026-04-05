# Design: Painel de Controle Simbiótico — Ambiental ↔ Mineração

Especificação de produto e HMI para harmonizar os ecossistemas ETE Ambiental e ETE Mineração em uma **única interface simbiótica**, com foco em conversão e sensação de jornada incompleta sem o módulo pago.

**Implementação:** Repositório chmulato/ETE (simulador). Protótipo de referência no portal: painel-simbiotico.html.

---

## 1. Arquitetura de layout harmonioso

### 1.1 Estrutura dividida

- **Painel de Controle** em duas colunas (ou duas zonas visuais claras):
  - **Esquerda:** Módulo **Ambiental** (Bio) — tratamento de efluentes, parâmetros verdes, saídas (volume tratado, pH residual).
  - **Direita:** Módulo **Mineração** (Metal) — decantadores, precipitação, refino de terras raras.
- **Conexão central:** Uma **linha de fluxo animada** (ou canal visual) que vai da saída do Ambiental em direção à entrada do Mineração, representando a **água tratada** que alimenta o refino. A animação (ex.: partículas ou gradiente em movimento) reforça que “a água do Ambiental vira insumo do Mineração”.

### 1.2 Paleta de cores

- **Transição gradual** ao longo do eixo horizontal:
  - **Esquerda (Ambiental):** Verde (Bio) — ex.: `#059669`, `#10b981`, `#34d399`.
  - **Centro:** Transição verde–âmbar — ex.: `#84cc16`, `#a3e635`.
  - **Direita (Mineração):** Dourado/âmbar (Metal) — ex.: `#d4a853`, `#f59e0b`, `#fbbf24`.
- Uso: bordas, badges, títulos de seção, linha de fluxo e destaques, para que o usuário “leia” a jornada da esquerda para a direita.

---

## 2. Engenharia do upgrade (feature flagging)

### 2.1 Módulo Mineração com glassmorphism

- O bloco **Mineração** (quando sem licença) deve usar efeito de **vidro fosco (glassmorphism)**:
  - Fundo semi-transparente (ex.: `backdrop-filter: blur(...)`, `background: rgba(..., 0.4)`).
  - O usuário **enxerga** as silhuetas dos tanques de decantação e os gráficos de precipitação, mas com uma **sobreposição elegante** que comunica “conteúdo premium bloqueado”.
  - Opcional: ícones de cadeado discretos ou overlay com texto “Módulo Premium — desbloqueie para refinar”.

### 2.2 Badge dinâmico de preço

- No **topo** da área Mineração (ou no header do painel direito), um **badge dinâmico**:
  - Texto do tipo: **“Upgrade Premium: R$ 29,90”** (ou valor configurável).
- **Variável no código (fácil de alterar):**
  - `PREMIUM_PRICE = 29.90` (float ou string formatada).
  - Exibir em um único lugar no código (constante ou config) para que alterar o preço seja trivial.

---

## 3. Botão de ativação e modal “Desbloqueio”

### 3.1 Botão de destaque

- Um **botão de upgrade** em evidência (cor dourada/âmbar, ícone de “desbloqueio” ou “diamante”) que:
  - **Não apenas** peça o pagamento, mas **conte a história**: “Como a Mineração completa seu ciclo ambiental”.
- Ao **clicar**, abrir um **modal** (ou painel lateral) que inclua:
  1. **Infográfico curto:** “Da água tratada ao mineral” — 2–3 passos visuais (Ambiental → água tratada → Mineração → concentrado/REE).
  2. **Dados Cara-Core Informática:** CNPJ PIX 23.969.028/0001-37, instruções de pagamento.
  3. **Campo “Hardware ID” (somente leitura)** + botão **“Copiar ID de Ativação”**, apresentados como parte de um **“Desbloqueio de Protocolo Secreto”** (tom lúdico/Sci‑Fi, sem perder clareza).

### 3.2 Tom visual do modal

- Estética de “protocolo secreto” ou “terminal de ativação”: fonte monospace para o ID, bordas discretas, ícone de cadeado ou escudo. Mensagem do tipo: “Envie este ID + comprovante PIX para receber sua chave de ativação.”

---

## 4. Consistência com o legado — Selo Pawlowsky

- O **Selo de Qualidade Pawlowsky** (ou “Inspirado pelo Legado Pawlowsky”) deve aparecer em **ambos** os módulos:
  - **Ambiental:** canto ou rodapé da zona esquerda.
  - **Mineração:** canto ou rodapé da zona direita (mesmo com glassmorphism).
- Objetivo: Validar que a **ciência por trás do módulo pago** é tão rigorosa quanto a do gratuito; reforça confiança e continuidade da jornada.

---

## 5. Objetivo final (narrativa de produto)

- O usuário deve sentir que o sistema está **“incompleto”** sem o módulo Mineração **não** por falta de função básica, mas porque **a jornada da água para o mineral é uma história única** que ele quer **terminar de contar**.
- A interface deve:
  - Mostrar claramente o **fluxo** Ambiental → Mineração (linha animada, cores).
  - Deixar **visível** o que está “atrás do vidro” (silhuetas, gráficos) para criar desejo.
  - Oferecer um **upgrade narrativo** (infográfico + protocolo de ativação) em vez de apenas um preço.

---

## 6. Checklist de implementação (chmulato/ETE)

| Item | Descrição |
|------|------------|
| Layout dividido | Esquerda = Ambiental, Direita = Mineração; painel único. |
| Linha de fluxo | Animação (partículas/gradiente) da esquerda para a direita = água tratada. |
| Paleta | Verde (Bio) → centro → Dourado (Metal); aplicada a bordas, badges, títulos. |
| Glassmorphism Mineração | Blur + overlay quando sem licença; silhuetas de tanques/gráficos visíveis. |
| Badge preço | “Upgrade Premium: R$ {PREMIUM_PRICE}”; PREMIUM_PRICE = 29.90 (configurável). |
| Botão upgrade | Destaque; ao clicar → modal com infográfico + Cara-Core + Hardware ID. |
| Modal | Infográfico “Como a Mineração completa seu ciclo” + PIX + “Protocolo” (ID + Copiar). |
| Selo Pawlowsky | Presente em Ambiental e Mineração (rodapé ou canto). |

Protótipo de referência visual no portal: **painel-simbiotico.html**.

