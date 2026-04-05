# Arquitetura: Simbiose Ambiental ↔ Mineração e Gatekeeper de Licença (chmulato/ETE)

Este documento descreve a **interdependência** entre os módulos ETE Ambiental e ETE Mineração, a **validação de licença**, a **auditoria de conversão** e o **resgate de chave de ativação**. A implementação é feita no repositório **chmulato/ETE**.

**Objetivo:** O usuário percebe que a Mineração é a evolução natural e lucrativa do trabalho no Ambiental; fluxo de caixa previsível para Cara-Core.

---

## 1. Simbiose técnica — Estado global e leitura pelo Mineração

### 1.1 Objeto de estado global (Ambiental → compartilhado)

- **Onde:** Um módulo/singleton acessível por ambos os fluxos (ex.: `state/ete_global.py` ou variável de sessão Streamlit compartilhada).
- **Conteúdo sugerido (saídas do Ambiental):**
  - `volume_agua_tratada` (m³ ou L)
  - `ph_residual`
  - Opcional: DQO/DBO residual, vazão, metadados de última simulação (timestamp).
- **Escrita:** Ao finalizar uma rodada do **módulo Ambiental**, persistir essas variáveis no estado global (e, se desejado, em arquivo leve em disco para sobreviver ao refresh, ex.: `~/.ouro40/ambiental_last_run.json`).

### 1.2 Leitura pelo módulo Mineração

- Ao abrir o **módulo Mineração**, o código deve:
  1. **Ler** o estado global (volume tratado, pH residual, etc.).
  2. Se não houver dados do Ambiental, exibir mensagem do tipo: “Execute primeiro uma simulação no módulo Ambiental para ver o potencial de refino aqui.”
  3. Se houver dados:
     - **Com licença válida:** Usar esses valores como **entrada** dos cálculos de decantação/refino (pH em cascata, volume, etc.) e exibir o HUD completo (âmbar/ouro) e resultados reais.
     - **Sem licença (bloqueado):** Exibir um **dashboard “embaçado” ou com cadeados** (overlay, ícones de cadeado, botões desabilitados), mas **mostrando em modo “preview”** quanto de Ouro/Terras Raras o usuário **poderia** estar extraindo com aquela água (cálculo em modo somente-leitura ou com valores de exemplo coerentes com os dados do Ambiental). Texto do tipo: “Desbloqueie o Módulo Mineração para iniciar o refino com estes dados.”

### 1.3 Fluxo resumido

```
[Ambiental] → salva volume_agua_tratada, ph_residual (e opcionais) no estado global
       ↓
[Mineração] → lê estado global
       ↓
  ┌─ authorized? → Sim: HUD âmbar/ouro, cálculos reais, "Iniciar Refino" ativo
  └─ Não: dashboard embaçado/cadeado + preview "Poderia extrair X g REE / Y kg equivalente" + botão abre modal pagamento
```

---

## 2. Validação da licença (The Gatekeeper)

### 2.1 Função central: `check_mining_authorization()`

- **Assinatura sugerida:** `check_mining_authorization() -> bool`
- **Lógica:**
  1. Obter `hardware_id` do módulo HID (mesmo usado para gerar a license.key).
  2. Verificar existência e validade do arquivo `license.key` (ou do token persistido — ver seção 4): formato, assinatura HMAC, confronto com `hardware_id`, data de validade.
  3. Retornar `True` se tudo válido; `False` caso contrário.
- **Uso no código:**
  - Ao carregar a tela do módulo Mineração: `authorized = check_mining_authorization()`.
  - Se `authorized == False`: exibir dashboard embaçado/cadeado + preview de potencial; o botão **“Iniciar Refino”** (ou equivalente) deve **abrir o modal de pagamento** (Cara-Core Informática, PIX, “Copiar ID de Ativação”, link para upgrade-ouro40).
  - Se `authorized == True`: “acender” as cores do HUD de Mineração (âmbar/ouro), habilitar todos os controles e **liberar os cálculos** das equações de decantação (e demais motor de refino).

### 2.2 Modal de pagamento

- Conteúdo alinhado à página estática upgrade-ouro40.html: Cara-Core Informática, CNPJ PIX 23.969.028/0001-37, instruções (copiar ID, enviar comprovante), link para o portal se necessário.
- Botão “Copiar ID de Ativação” → `get_hardware_id()` + copiar para clipboard.

---

## 3. Auditoria de conversão (Business Intelligence)

- **Objetivo:** Medir o “desejo” pelo produto pago (quantas vezes um usuário **sem licença** interage com o módulo Mineração).
- **Implementação sugerida:**
  - **Evento a registrar:** “usuário gratuito clicou no botão de Mineração” (ou “abriu a tela Mineração” / “clicou em Iniciar Refino” sem licença). Definir um único evento ou poucos eventos claros (ex.: `mining_button_click_no_license`, `mining_screen_view_no_license`).
  - **Log de auditoria interno:** Arquivo ou tabela **local** (não enviar para servidor obrigatório, para LGPD), ex.: `~/.ouro40/audit.log` ou SQLite local, com linhas do tipo:
    - `timestamp | event_type | hardware_id_hash (opcional, anônimo)`
  - Exemplo de linha: `2025-02-03T14:32:00 | mining_click_no_license`
  - **Uso posterior:** O administrador pode, em processo separado (script/BI interno), agregar contagens por dia/semana para taxa de conversão e “desejo” pelo módulo pago. Sem dados pessoais no log.

---

## 4. Resgate de licença (Inserir chave de ativação)

### 4.1 Campo no menu de configurações

- No **menu de configurações** (ou tela equivalente) do simulador, adicionar:
  - Campo: **“Inserir chave de ativação”** (textarea ou input para colar o conteúdo do `license.key` ou o path do arquivo).
  - Botão: **“Validar e ativar”**.

### 4.2 Fluxo de validação e persistência

1. Usuário cola o conteúdo da chave (ou seleciona o arquivo `license.key`).
2. O sistema valida da mesma forma que no Gatekeeper: HMAC, `HARDWARE_ID` vs `get_hardware_id()`, `VALID_UNTIL`.
3. Se **válido**:
   - Gerar um **token criptografado** localmente (ex.: conteúdo da license assinado novamente com chave interna, ou AES do payload) e gravar em arquivo persistente (ex.: `~/.ouro40/.license_token` ou em diretório da aplicação, com permissões restritas).
   - Esse token deve **sobreviver ao fechamento da aplicação**; na próxima abertura, `check_mining_authorization()` pode ler o token do disco em vez de exigir `license.key` na pasta do executável (ou aceitar ambos).
4. Se **inválido**: mensagem clara (“Chave inválida ou não corresponde a este computador. Verifique o ID de Ativação e a license.key enviada.”).

### 4.3 Formato do token persistido (sugestão)

- Evitar gravar a license em claro. Opções:
  - Gravar o conteúdo da `license.key` criptografado com uma chave derivada do próprio HID (ex.: AES(key=KDF(hardware_id)), ciphertext=license_content).
  - Ou gravar em diretório protegido e ler apenas se o HID atual coincidir com o que está no token.
- Ao iniciar o app, `check_mining_authorization()`: (1) tenta ler `license.key` da pasta da aplicação; (2) se não existir, tenta ler o token persistido; (3) valida e retorna True/False.

---

## 5. Resumo da implementação (checklist para o repositório ETE)

| Item | Onde / O quê |
|------|----------------|
| Estado global Ambiental | Módulo/singleton + escrita ao finalizar simulação Ambiental (volume, pH residual, etc.). |
| Leitura no Mineração | Ao abrir Mineração, ler estado global; se vazio, avisar; se preenchido, usar em preview (bloqueado) ou em cálculos reais (licenciado). |
| Dashboard bloqueado | Overlay embaçado/cadeado + preview “Poderia extrair X” + botão “Iniciar Refino” abre modal pagamento. |
| check_mining_authorization() | Função única: HID + license.key (ou token persistido); retorna bool. |
| Modal pagamento | Cara-Core, CNPJ PIX, Copiar ID de Ativação, link upgrade-ouro40. |
| HUD licenciado | Se authorized: cores âmbar/ouro, cálculos de decantação liberados. |
| Auditoria conversão | Log local (arquivo ou SQLite): evento “clique Mineração sem licença” (timestamp + tipo). |
| Configurações | Campo “Inserir chave de ativação” + “Validar e ativar”; ao validar, salvar token criptografado persistente; check_mining_authorization() usa token após reinício. |

---

## 6. Referências

- **Paywall e licença:** [LICENCIAMENTO_OURO40_SPEC.md](LICENCIAMENTO_OURO40_SPEC.md) — HID, license.key, gerador de chaves, LGPD.
- **Página de upgrade (checkout):** upgrade-ouro40.html — PIX e instruções ao usuário.

A implementação em código (Python, Streamlit, estado global, gatekeeper, audit log, token persistido) é feita no repositório **chmulato/ETE**.

