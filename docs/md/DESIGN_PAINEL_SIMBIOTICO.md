# Design: Painel de Controle SimbiÃ³tico â€” Ambiental â†” MineraÃ§Ã£o

EspecificaÃ§Ã£o de produto e HMI para harmonizar os ecossistemas ETE Ambiental e ETE MineraÃ§Ã£o em uma **Ãºnica interface simbiÃ³tica**, com foco em conversÃ£o e sensaÃ§Ã£o de jornada incompleta sem o mÃ³dulo pago.

**ImplementaÃ§Ã£o:** RepositÃ³rio chmulato/ETE (simulador). ProtÃ³tipo de referÃªncia no portal: painel-simbiotico.html.

---

## 1. Arquitetura de layout harmonioso

### 1.1 Estrutura dividida

- **Painel de Controle** em duas colunas (ou duas zonas visuais claras):
  - **Esquerda:** MÃ³dulo **Ambiental** (Bio) â€” tratamento de efluentes, parÃ¢metros verdes, saÃ­das (volume tratado, pH residual).
  - **Direita:** MÃ³dulo **MineraÃ§Ã£o** (Metal) â€” decantadores, precipitaÃ§Ã£o, refino de terras raras.
- **ConexÃ£o central:** Uma **linha de fluxo animada** (ou canal visual) que vai da saÃ­da do Ambiental em direÃ§Ã£o Ã  entrada do MineraÃ§Ã£o, representando a **Ã¡gua tratada** que alimenta o refino. A animaÃ§Ã£o (ex.: partÃ­culas ou gradiente em movimento) reforÃ§a que â€œa Ã¡gua do Ambiental vira insumo do MineraÃ§Ã£oâ€.

### 1.2 Paleta de cores

- **TransiÃ§Ã£o gradual** ao longo do eixo horizontal:
  - **Esquerda (Ambiental):** Verde (Bio) â€” ex.: `#059669`, `#10b981`, `#34d399`.
  - **Centro:** TransiÃ§Ã£o verdeâ€“Ã¢mbar â€” ex.: `#84cc16`, `#a3e635`.
  - **Direita (MineraÃ§Ã£o):** Dourado/Ã¢mbar (Metal) â€” ex.: `#d4a853`, `#f59e0b`, `#fbbf24`.
- Uso: bordas, badges, tÃ­tulos de seÃ§Ã£o, linha de fluxo e destaques, para que o usuÃ¡rio â€œleiaâ€ a jornada da esquerda para a direita.

---

## 2. Engenharia do upgrade (feature flagging)

### 2.1 MÃ³dulo MineraÃ§Ã£o com glassmorphism

- O bloco **MineraÃ§Ã£o** (quando sem licenÃ§a) deve usar efeito de **vidro fosco (glassmorphism)**:
  - Fundo semi-transparente (ex.: `backdrop-filter: blur(...)`, `background: rgba(..., 0.4)`).
  - O usuÃ¡rio **enxerga** as silhuetas dos tanques de decantaÃ§Ã£o e os grÃ¡ficos de precipitaÃ§Ã£o, mas com uma **sobreposiÃ§Ã£o elegante** que comunica â€œconteÃºdo premium bloqueadoâ€.
  - Opcional: Ã­cones de cadeado discretos ou overlay com texto â€œMÃ³dulo Premium â€” desbloqueie para refinarâ€.

### 2.2 Badge dinÃ¢mico de preÃ§o

- No **topo** da Ã¡rea MineraÃ§Ã£o (ou no header do painel direito), um **badge dinÃ¢mico**:
  - Texto do tipo: **â€œUpgrade Premium: R$ 29,90â€** (ou valor configurÃ¡vel).
- **VariÃ¡vel no cÃ³digo (fÃ¡cil de alterar):**
  - `PREMIUM_PRICE = 29.90` (float ou string formatada).
  - Exibir em um Ãºnico lugar no cÃ³digo (constante ou config) para que alterar o preÃ§o seja trivial.

---

## 3. BotÃ£o de ativaÃ§Ã£o e modal â€œDesbloqueioâ€

### 3.1 BotÃ£o de destaque

- Um **botÃ£o de upgrade** em evidÃªncia (cor dourada/Ã¢mbar, Ã­cone de â€œdesbloqueioâ€ ou â€œdiamanteâ€) que:
  - **NÃ£o apenas** peÃ§a o pagamento, mas **conte a histÃ³ria**: â€œComo a MineraÃ§Ã£o completa seu ciclo ambientalâ€.
- Ao **clicar**, abrir um **modal** (ou painel lateral) que inclua:
  1. **InfogrÃ¡fico curto:** â€œDa Ã¡gua tratada ao mineralâ€ â€” 2â€“3 passos visuais (Ambiental â†’ Ã¡gua tratada â†’ MineraÃ§Ã£o â†’ concentrado/REE).
  2. **Dados Cara-Core InformÃ¡tica:** CNPJ PIX 23.969.028/0001-37, instruÃ§Ãµes de pagamento.
  3. **Campo â€œHardware IDâ€ (somente leitura)** + botÃ£o **â€œCopiar ID de AtivaÃ§Ã£oâ€**, apresentados como parte de um **â€œDesbloqueio de Protocolo Secretoâ€** (tom lÃºdico/Sciâ€‘Fi, sem perder clareza).

### 3.2 Tom visual do modal

- EstÃ©tica de â€œprotocolo secretoâ€ ou â€œterminal de ativaÃ§Ã£oâ€: fonte monospace para o ID, bordas discretas, Ã­cone de cadeado ou escudo. Mensagem do tipo: â€œEnvie este ID + comprovante PIX para receber sua chave de ativaÃ§Ã£o.â€

---

## 4. ConsistÃªncia com o legado â€” Selo Pawlowsky

- O **Selo de Qualidade Pawlowsky** (ou â€œInspirado pelo Legado Pawlowskyâ€) deve aparecer em **ambos** os mÃ³dulos:
  - **Ambiental:** canto ou rodapÃ© da zona esquerda.
  - **MineraÃ§Ã£o:** canto ou rodapÃ© da zona direita (mesmo com glassmorphism).
- Objetivo: Validar que a **ciÃªncia por trÃ¡s do mÃ³dulo pago** Ã© tÃ£o rigorosa quanto a do gratuito; reforÃ§a confianÃ§a e continuidade da jornada.

---

## 5. Objetivo final (narrativa de produto)

- O usuÃ¡rio deve sentir que o sistema estÃ¡ **â€œincompletoâ€** sem o mÃ³dulo MineraÃ§Ã£o **nÃ£o** por falta de funÃ§Ã£o bÃ¡sica, mas porque **a jornada da Ã¡gua para o mineral Ã© uma histÃ³ria Ãºnica** que ele quer **terminar de contar**.
- A interface deve:
  - Mostrar claramente o **fluxo** Ambiental â†’ MineraÃ§Ã£o (linha animada, cores).
  - Deixar **visÃ­vel** o que estÃ¡ â€œatrÃ¡s do vidroâ€ (silhuetas, grÃ¡ficos) para criar desejo.
  - Oferecer um **upgrade narrativo** (infogrÃ¡fico + protocolo de ativaÃ§Ã£o) em vez de apenas um preÃ§o.

---

## 6. Checklist de implementaÃ§Ã£o (chmulato/ETE)

| Item | DescriÃ§Ã£o |
|------|------------|
| Layout dividido | Esquerda = Ambiental, Direita = MineraÃ§Ã£o; painel Ãºnico. |
| Linha de fluxo | AnimaÃ§Ã£o (partÃ­culas/gradiente) da esquerda para a direita = Ã¡gua tratada. |
| Paleta | Verde (Bio) â†’ centro â†’ Dourado (Metal); aplicada a bordas, badges, tÃ­tulos. |
| Glassmorphism MineraÃ§Ã£o | Blur + overlay quando sem licenÃ§a; silhuetas de tanques/grÃ¡ficos visÃ­veis. |
| Badge preÃ§o | â€œUpgrade Premium: R$ {PREMIUM_PRICE}â€; PREMIUM_PRICE = 29.90 (configurÃ¡vel). |
| BotÃ£o upgrade | Destaque; ao clicar â†’ modal com infogrÃ¡fico + Cara-Core + Hardware ID. |
| Modal | InfogrÃ¡fico â€œComo a MineraÃ§Ã£o completa seu cicloâ€ + PIX + â€œProtocoloâ€ (ID + Copiar). |
| Selo Pawlowsky | Presente em Ambiental e MineraÃ§Ã£o (rodapÃ© ou canto). |

ProtÃ³tipo de referÃªncia visual no portal: **painel-simbiotico.html**.

