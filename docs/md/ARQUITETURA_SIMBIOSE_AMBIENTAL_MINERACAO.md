# Arquitetura: Simbiose Ambiental â†” MineraÃ§Ã£o e Gatekeeper de LicenÃ§a (chmulato/ETE)

Este documento descreve a **interdependÃªncia** entre os mÃ³dulos ETE Ambiental e ETE MineraÃ§Ã£o, a **validaÃ§Ã£o de licenÃ§a**, a **auditoria de conversÃ£o** e o **resgate de chave de ativaÃ§Ã£o**. A implementaÃ§Ã£o Ã© feita no repositÃ³rio **chmulato/ETE**.

**Objetivo:** O usuÃ¡rio percebe que a MineraÃ§Ã£o Ã© a evoluÃ§Ã£o natural e lucrativa do trabalho no Ambiental; fluxo de caixa previsÃ­vel para Cara-Core.

---

## 1. Simbiose tÃ©cnica â€” Estado global e leitura pelo MineraÃ§Ã£o

### 1.1 Objeto de estado global (Ambiental â†’ compartilhado)

- **Onde:** Um mÃ³dulo/singleton acessÃ­vel por ambos os fluxos (ex.: `state/ete_global.py` ou variÃ¡vel de sessÃ£o Streamlit compartilhada).
- **ConteÃºdo sugerido (saÃ­das do Ambiental):**
  - `volume_agua_tratada` (mÂ³ ou L)
  - `ph_residual`
  - Opcional: DQO/DBO residual, vazÃ£o, metadados de Ãºltima simulaÃ§Ã£o (timestamp).
- **Escrita:** Ao finalizar uma rodada do **mÃ³dulo Ambiental**, persistir essas variÃ¡veis no estado global (e, se desejado, em arquivo leve em disco para sobreviver ao refresh, ex.: `~/.ouro40/ambiental_last_run.json`).

### 1.2 Leitura pelo mÃ³dulo MineraÃ§Ã£o

- Ao abrir o **mÃ³dulo MineraÃ§Ã£o**, o cÃ³digo deve:
  1. **Ler** o estado global (volume tratado, pH residual, etc.).
  2. Se nÃ£o houver dados do Ambiental, exibir mensagem do tipo: â€œExecute primeiro uma simulaÃ§Ã£o no mÃ³dulo Ambiental para ver o potencial de refino aqui.â€
  3. Se houver dados:
     - **Com licenÃ§a vÃ¡lida:** Usar esses valores como **entrada** dos cÃ¡lculos de decantaÃ§Ã£o/refino (pH em cascata, volume, etc.) e exibir o HUD completo (Ã¢mbar/ouro) e resultados reais.
     - **Sem licenÃ§a (bloqueado):** Exibir um **dashboard â€œembaÃ§adoâ€ ou com cadeados** (overlay, Ã­cones de cadeado, botÃµes desabilitados), mas **mostrando em modo â€œpreviewâ€** quanto de Ouro/Terras Raras o usuÃ¡rio **poderia** estar extraindo com aquela Ã¡gua (cÃ¡lculo em modo somente-leitura ou com valores de exemplo coerentes com os dados do Ambiental). Texto do tipo: â€œDesbloqueie o MÃ³dulo MineraÃ§Ã£o para iniciar o refino com estes dados.â€

### 1.3 Fluxo resumido

```
[Ambiental] â†’ salva volume_agua_tratada, ph_residual (e opcionais) no estado global
       â†“
[MineraÃ§Ã£o] â†’ lÃª estado global
       â†“
  â”Œâ”€ authorized? â†’ Sim: HUD Ã¢mbar/ouro, cÃ¡lculos reais, "Iniciar Refino" ativo
  â””â”€ NÃ£o: dashboard embaÃ§ado/cadeado + preview "Poderia extrair X g REE / Y kg equivalente" + botÃ£o abre modal pagamento
```

---

## 2. ValidaÃ§Ã£o da licenÃ§a (The Gatekeeper)

### 2.1 FunÃ§Ã£o central: `check_mining_authorization()`

- **Assinatura sugerida:** `check_mining_authorization() -> bool`
- **LÃ³gica:**
  1. Obter `hardware_id` do mÃ³dulo HID (mesmo usado para gerar a license.key).
  2. Verificar existÃªncia e validade do arquivo `license.key` (ou do token persistido â€” ver seÃ§Ã£o 4): formato, assinatura HMAC, confronto com `hardware_id`, data de validade.
  3. Retornar `True` se tudo vÃ¡lido; `False` caso contrÃ¡rio.
- **Uso no cÃ³digo:**
  - Ao carregar a tela do mÃ³dulo MineraÃ§Ã£o: `authorized = check_mining_authorization()`.
  - Se `authorized == False`: exibir dashboard embaÃ§ado/cadeado + preview de potencial; o botÃ£o **â€œIniciar Refinoâ€** (ou equivalente) deve **abrir o modal de pagamento** (Cara-Core InformÃ¡tica, PIX, â€œCopiar ID de AtivaÃ§Ã£oâ€, link para upgrade-ouro40).
  - Se `authorized == True`: â€œacenderâ€ as cores do HUD de MineraÃ§Ã£o (Ã¢mbar/ouro), habilitar todos os controles e **liberar os cÃ¡lculos** das equaÃ§Ãµes de decantaÃ§Ã£o (e demais motor de refino).

### 2.2 Modal de pagamento

- ConteÃºdo alinhado Ã  pÃ¡gina estÃ¡tica upgrade-ouro40.html: Cara-Core InformÃ¡tica, CNPJ PIX 23.969.028/0001-37, instruÃ§Ãµes (copiar ID, enviar comprovante), link para o portal se necessÃ¡rio.
- BotÃ£o â€œCopiar ID de AtivaÃ§Ã£oâ€ â†’ `get_hardware_id()` + copiar para clipboard.

---

## 3. Auditoria de conversÃ£o (Business Intelligence)

- **Objetivo:** Medir o â€œdesejoâ€ pelo produto pago (quantas vezes um usuÃ¡rio **sem licenÃ§a** interage com o mÃ³dulo MineraÃ§Ã£o).
- **ImplementaÃ§Ã£o sugerida:**
  - **Evento a registrar:** â€œusuÃ¡rio gratuito clicou no botÃ£o de MineraÃ§Ã£oâ€ (ou â€œabriu a tela MineraÃ§Ã£oâ€ / â€œclicou em Iniciar Refinoâ€ sem licenÃ§a). Definir um Ãºnico evento ou poucos eventos claros (ex.: `mining_button_click_no_license`, `mining_screen_view_no_license`).
  - **Log de auditoria interno:** Arquivo ou tabela **local** (nÃ£o enviar para servidor obrigatÃ³rio, para LGPD), ex.: `~/.ouro40/audit.log` ou SQLite local, com linhas do tipo:
    - `timestamp | event_type | hardware_id_hash (opcional, anÃ´nimo)`
  - Exemplo de linha: `2025-02-03T14:32:00 | mining_click_no_license`
  - **Uso posterior:** O administrador pode, em processo separado (script/BI interno), agregar contagens por dia/semana para taxa de conversÃ£o e â€œdesejoâ€ pelo mÃ³dulo pago. Sem dados pessoais no log.

---

## 4. Resgate de licenÃ§a (Inserir chave de ativaÃ§Ã£o)

### 4.1 Campo no menu de configuraÃ§Ãµes

- No **menu de configuraÃ§Ãµes** (ou tela equivalente) do simulador, adicionar:
  - Campo: **â€œInserir chave de ativaÃ§Ã£oâ€** (textarea ou input para colar o conteÃºdo do `license.key` ou o path do arquivo).
  - BotÃ£o: **â€œValidar e ativarâ€**.

### 4.2 Fluxo de validaÃ§Ã£o e persistÃªncia

1. UsuÃ¡rio cola o conteÃºdo da chave (ou seleciona o arquivo `license.key`).
2. O sistema valida da mesma forma que no Gatekeeper: HMAC, `HARDWARE_ID` vs `get_hardware_id()`, `VALID_UNTIL`.
3. Se **vÃ¡lido**:
   - Gerar um **token criptografado** localmente (ex.: conteÃºdo da license assinado novamente com chave interna, ou AES do payload) e gravar em arquivo persistente (ex.: `~/.ouro40/.license_token` ou em diretÃ³rio da aplicaÃ§Ã£o, com permissÃµes restritas).
   - Esse token deve **sobreviver ao fechamento da aplicaÃ§Ã£o**; na prÃ³xima abertura, `check_mining_authorization()` pode ler o token do disco em vez de exigir `license.key` na pasta do executÃ¡vel (ou aceitar ambos).
4. Se **invÃ¡lido**: mensagem clara (â€œChave invÃ¡lida ou nÃ£o corresponde a este computador. Verifique o ID de AtivaÃ§Ã£o e a license.key enviada.â€).

### 4.3 Formato do token persistido (sugestÃ£o)

- Evitar gravar a license em claro. OpÃ§Ãµes:
  - Gravar o conteÃºdo da `license.key` criptografado com uma chave derivada do prÃ³prio HID (ex.: AES(key=KDF(hardware_id)), ciphertext=license_content).
  - Ou gravar em diretÃ³rio protegido e ler apenas se o HID atual coincidir com o que estÃ¡ no token.
- Ao iniciar o app, `check_mining_authorization()`: (1) tenta ler `license.key` da pasta da aplicaÃ§Ã£o; (2) se nÃ£o existir, tenta ler o token persistido; (3) valida e retorna True/False.

---

## 5. Resumo da implementaÃ§Ã£o (checklist para o repositÃ³rio ETE)

| Item | Onde / O quÃª |
|------|----------------|
| Estado global Ambiental | MÃ³dulo/singleton + escrita ao finalizar simulaÃ§Ã£o Ambiental (volume, pH residual, etc.). |
| Leitura no MineraÃ§Ã£o | Ao abrir MineraÃ§Ã£o, ler estado global; se vazio, avisar; se preenchido, usar em preview (bloqueado) ou em cÃ¡lculos reais (licenciado). |
| Dashboard bloqueado | Overlay embaÃ§ado/cadeado + preview â€œPoderia extrair Xâ€ + botÃ£o â€œIniciar Refinoâ€ abre modal pagamento. |
| check_mining_authorization() | FunÃ§Ã£o Ãºnica: HID + license.key (ou token persistido); retorna bool. |
| Modal pagamento | Cara-Core, CNPJ PIX, Copiar ID de AtivaÃ§Ã£o, link upgrade-ouro40. |
| HUD licenciado | Se authorized: cores Ã¢mbar/ouro, cÃ¡lculos de decantaÃ§Ã£o liberados. |
| Auditoria conversÃ£o | Log local (arquivo ou SQLite): evento â€œclique MineraÃ§Ã£o sem licenÃ§aâ€ (timestamp + tipo). |
| ConfiguraÃ§Ãµes | Campo â€œInserir chave de ativaÃ§Ã£oâ€ + â€œValidar e ativarâ€; ao validar, salvar token criptografado persistente; check_mining_authorization() usa token apÃ³s reinÃ­cio. |

---

## 6. ReferÃªncias

- **Paywall e licenÃ§a:** [LICENCIAMENTO_OURO40_SPEC.md](LICENCIAMENTO_OURO40_SPEC.md) â€” HID, license.key, gerador de chaves, LGPD.
- **PÃ¡gina de upgrade (checkout):** upgrade-ouro40.html â€” PIX e instruÃ§Ãµes ao usuÃ¡rio.

A implementaÃ§Ã£o em cÃ³digo (Python, Streamlit, estado global, gatekeeper, audit log, token persistido) Ã© feita no repositÃ³rio **chmulato/ETE**.

