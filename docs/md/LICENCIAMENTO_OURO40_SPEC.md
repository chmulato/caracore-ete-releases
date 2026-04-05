# Especificação: Camada comercial e licenciamento — Ouro 4.0 (ETE)

Este documento descreve a arquitetura de **paywall educativo**, **identificação de máquina (HID)**, **validador de licença offline** e **dashboard de gestão** para o simulador chmulato/ETE. A implementação é feita no **repositório ETE** (código-fonte); o portal caracore-ete-releases expõe a página de upgrade e as instruções ao usuário.

**Objetivo:** Fase Ambiental = isca de valor (gratuita); Fase Mineração = joia da coroa (monetizada). Conformidade LGPD: nenhum dado pessoal sensível dentro do binário.

---

## 1. Trava lógica e tela de checkout (Paywall)

- **Gatilho:** Ao tentar acessar o **Módulo Mineração** (ex.: abrir a tela/rota da fase Mineração), o simulador deve:
  1. Verificar se existe licença válida (ver seção 3).
  2. Se **não** existir: exibir uma **tela de checkout** em vez do módulo.
- **Conteúdo da tela de checkout:**
  - Título: "Upgrade para Ouro 4.0"
  - Texto explicando que a fase Mineração é paga; a Ambiental permanece gratuita.
  - **Dados de pagamento PIX:**  
    **Cara-Core Informática** | **CNPJ (chave PIX):** 23.969.028/0001-37  
  - Botão/link: "Copiar ID de Ativação" (chama o módulo HID e copia o Hardware_ID para a área de transferência).
  - Link ou texto: "Envie este ID junto com o comprovante PIX pelo WhatsApp ou Telegram" (pode apontar para a página do portal: `upgrade-ouro40.html` ou para o Canal de Melhorias).
- **Estética:** Layout elegante, consistente com a interface Sci‑Fi/HUD do simulador (fundo escuro, acentos dourados/ciano).

---

## 2. Módulo de identificação de máquina (HID)

- **Objetivo:** Gerar um **Hardware_ID** único e **anônimo** por computador (não deve conter nome de usuário, endereço, etc.).
- **Implementação sugerida (Python):**
  - Combinar dados **não identificáveis** do hardware/OS, por exemplo:
    - UUID da placa ou do disco (se disponível e estável).
    - Nome da máquina (hostname) ou identificador do sistema (ex.: `platform.node()`), **hasheado** (SHA-256) para anonimizar.
    - Outros identificadores estáveis e não sensíveis (ex.: volume serial, se acessível de forma segura).
  - Gerar um **hash único** (ex.: SHA-256) da concatenação desses valores e exibir uma versão **encurtada** ou **codificada** (ex.: primeiros 24 caracteres hex ou Base64) como "ID de Ativação" legível.
- **API exposta ao app:**
  - `get_hardware_id() -> str`: retorna o ID de ativação (string) para exibição e cópia.
- **Botão na UI:** "Copiar ID de Ativação" → chama `get_hardware_id()`, cola na área de transferência (ex.: `pyperclip` ou equivalente no ambiente do app).

---

## 3. Validador de licença offline

- **Arquivo de licença:** `license.key` na **pasta da aplicação** (mesmo diretório do executável ou diretório de dados configurável).
- **Formato sugerido do arquivo (exemplo):**
  - Conteúdo assinado ou criptografado, contendo pelo menos: `hardware_id` (ou hash do HID), `valid_until` (data opcional de expiração), e assinatura ou HMAC para evitar adulteração.
  - Exemplo simplificado (texto):  
    `HARDWARE_ID=<id>|VALID_UNTIL=YYYY-MM-DD|SIGNATURE=<hmac_ou_assinatura>`  
  - A **chave secreta** usada para assinatura/HMAC fica apenas no binário do app (ofuscada) e no script do administrador (gerador de chaves).
- **Lógica do validador (no simulador):**
  1. Ler `license.key` se existir.
  2. Verificar assinatura/HMAC.
  3. Comparar o `hardware_id` do arquivo com o `get_hardware_id()` da máquina atual.
  4. Se houver `valid_until`, verificar se a data atual ≤ `valid_until`.
  5. Se tudo for válido → **liberar acesso total** (incluindo Módulo Mineração); caso contrário → manter paywall (exibir checkout ao tentar acessar Mineração).

---

## 4. Dashboard de gestão (O Contador) — script administrador

- **Uso:** Apenas pelo administrador; **não** distribuído com o app.
- **Função:** Gerar arquivos `license.key` (ou strings de licença) a partir dos **IDs de Ativação (Hardware_ID)** enviados pelos clientes (ex.: após pagamento PIX e envio do comprovante).
- **Entrada:** Lista de Hardware_IDs (e opcionalmente data de validade).  
**Saída:** Arquivos `.key` ou strings que o cliente cola/grava em `license.key`.
- **Controle de ativações (planilha ou banco local criptografado):**
  - Colunas sugeridas: **Hardware_ID** | **Data de Ativação** | **Canal de Origem** (ex.: WhatsApp, Telegram) | **Valid_Until** (opcional).
  - A relação **Hardware_ID ↔ Pessoa real** (nome, e-mail, telefone) **não** deve ficar dentro do software distribuído; pode ficar em planilha privada ou ERP, fora do repositório do app, para conformidade LGPD.

---

## 5. Conformidade LGPD

- **Dentro do binário / no código do simulador:**  
  - **Não** armazenar nome, CPF, e-mail, telefone ou qualquer dado pessoal sensível.  
  - O único identificador armazenado ou lido é o **Hardware_ID** (anonimizado) e o conteúdo do `license.key` (ID + validade + assinatura).
- **Relação Hardware_ID ↔ Pessoa real:**  
  - Manter **apenas** no controle financeiro/administrativo externo (ERP, planilha privada, canal de atendimento). O software não envia o Hardware_ID para servidor obrigatório; a ativação é offline.
- **Política de privacidade:** Deixar explícito na página de upgrade (e no app, se houver tela de termos) que o ID de Ativação é anônimo e que a associação com a pessoa fica apenas no controle do titular para fins de entrega da licença e suporte.

---

## 6. Resumo do fluxo

| Etapa | Quem | Ação |
|-------|------|------|
| 1 | Usuário | Usa fase Ambiental gratuita; ao tentar Mineração, vê tela "Upgrade Ouro 4.0" com PIX e botão "Copiar ID de Ativação". |
| 2 | Usuário | Copia ID, paga PIX (Cara-Core Informática, CNPJ 23.969.028/0001-37), envia ID + comprovante por WhatsApp/Telegram. |
| 3 | Admin | Recebe pedido, anota Hardware_ID e canal no controle; gera `license.key` com o script; envia o arquivo ao cliente. |
| 4 | Usuário | Coloca `license.key` na pasta da aplicação; reinicia; Módulo Mineração liberado. |
| 5 | Software | Validador lê `license.key`, confere HID e assinatura; se válido, libera acesso total. |

---

## 7. Referências no portal caracore-ete-releases

- **Página de upgrade (checkout):** upgrade-ouro40.html — dados PIX, instruções e LGPD.
- **Canal de Melhorias:** canal-feedback.html — WhatsApp, Telegram e e-mail para envio do ID e comprovante.

A implementação dos módulos Python (HID, validador, gerador de chaves) e da UI de paywall/checkout é feita no repositório **chmulato/ETE**.

---

## 8. Esboço de implementação (para o repositório ETE)

### 8.1 Hardware ID (anônimo)

```python
# Exemplo: módulo hid.py (ou dentro do pacote do app)
import hashlib
import platform
import subprocess
import sys

def get_hardware_id() -> str:
    """Gera um ID único e anônimo para esta máquina (sem dados pessoais)."""
    parts = []
    try:
        parts.append(platform.node())
    except Exception:
        pass
    try:
        if sys.platform == "win32":
            out = subprocess.check_output(["wmic", "csproduct", "get", "uuid"], encoding="utf-8", errors="ignore")
            parts.append(out.split("\n")[1].strip())
        elif sys.platform == "darwin":
            out = subprocess.check_output(["ioreg", "-rd1", "-c", "IOPlatformExpertDevice"], encoding="utf-8", errors="ignore")
            for line in out.split("\n"):
                if "IOPlatformUUID" in line:
                    parts.append(line.split('"')[3])
                    break
        else:
            with open("/etc/machine-id", "r", encoding="utf-8", errors="ignore") as f:
                parts.append(f.read().strip())
    except Exception:
        pass
    raw = "|".join(p for p in parts if p)
    if not raw:
        raw = str(id(platform))
    return hashlib.sha256(raw.encode()).hexdigest()[:24].upper()
```

### 8.2 Formato da licença e validação

```python
# license.key: texto com HARDWARE_ID|VALID_UNTIL=YYYY-MM-DD|SIGNATURE=<hmac_hex>
import hmac
import hashlib
from pathlib import Path
from datetime import datetime

SECRET = b"chave-secreta-trocar-em-producao"  # Ofuscar no binário

def _sign(payload: str) -> str:
    return hmac.new(SECRET, payload.encode(), hashlib.sha256).hexdigest()[:32]

def validate_license(app_dir: Path, get_hid: callable) -> bool:
    key_file = app_dir / "license.key"
    if not key_file.exists():
        return False
    try:
        data = key_file.read_text(encoding="utf-8").strip()
        parts = dict(p.split("=", 1) for p in data.split("|") if "=" in p)
        hid_file = parts.get("HARDWARE_ID", "")
        sig = parts.get("SIGNATURE", "")
        valid_until = parts.get("VALID_UNTIL", "")
        payload = f"HARDWARE_ID={hid_file}|VALID_UNTIL={valid_until}"
        if hmac.compare_digest(_sign(payload), sig) and get_hid() == hid_file:
            if valid_until and datetime.strptime(valid_until, "%Y-%m-%d").date() < datetime.now().date():
                return False
            return True
    except Exception:
        pass
    return False
```

### 8.3 Script do administrador (gerar license.key)

```python
# Script separado: gerar_license.py (uso interno, não distribuir)
# Uso: python gerar_license.py <HARDWARE_ID> [VALID_UNTIL YYYY-MM-DD]
import hmac
import hashlib
import sys
from pathlib import Path

SECRET = b"chave-secreta-trocar-em-producao"

def sign(payload: str) -> str:
    return hmac.new(SECRET, payload.encode(), hashlib.sha256).hexdigest()[:32]

def main():
    hid = sys.argv[1].strip().upper()
    valid_until = sys.argv[2] if len(sys.argv) > 2 else "2099-12-31"
    payload = f"HARDWARE_ID={hid}|VALID_UNTIL={valid_until}"
    license_content = f"{payload}|SIGNATURE={sign(payload)}"
    out_path = Path(f"license_{hid[:12]}.key")
    out_path.write_text(license_content, encoding="utf-8")
    print(f"Gerado: {out_path}")
    # Registrar em planilha/DB: HARDWARE_ID | Data Ativação | Canal (WhatsApp/Telegram)
main()
```

- **Planilha de controle (exemplo):** Colunas `Hardware_ID` | `Data_Ativacao` | `Canal_Origem` | `Valid_Until`. Manter fora do código; relação com pessoa real apenas em ERP/planilha privada.

---

## 9. Integração com os módulos Ambiental e Mineração

Para a **simbiose técnica** (estado global Ambiental → Mineração), **dashboard embaçado** quando sem licença, **auditoria de conversão** e **resgate de chave** no menu de configurações, ver a especificação dedicada: **[ARQUITETURA_SIMBIOSE_AMBIENTAL_MINERACAO.md](ARQUITETURA_SIMBIOSE_AMBIENTAL_MINERACAO.md)**.

