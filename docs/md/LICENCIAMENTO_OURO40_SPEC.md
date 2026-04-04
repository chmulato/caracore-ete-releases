# EspecificaÃ§Ã£o: Camada comercial e licenciamento â€” Ouro 4.0 (ETE)

Este documento descreve a arquitetura de **paywall educativo**, **identificaÃ§Ã£o de mÃ¡quina (HID)**, **validador de licenÃ§a offline** e **dashboard de gestÃ£o** para o simulador chmulato/ETE. A implementaÃ§Ã£o Ã© feita no **repositÃ³rio ETE** (cÃ³digo-fonte); o portal caracore-ete-releases expÃµe a pÃ¡gina de upgrade e as instruÃ§Ãµes ao usuÃ¡rio.

**Objetivo:** Fase Ambiental = isca de valor (gratuita); Fase MineraÃ§Ã£o = joia da coroa (monetizada). Conformidade LGPD: nenhum dado pessoal sensÃ­vel dentro do binÃ¡rio.

---

## 1. Trava lÃ³gica e tela de checkout (Paywall)

- **Gatilho:** Ao tentar acessar o **MÃ³dulo MineraÃ§Ã£o** (ex.: abrir a tela/rota da fase MineraÃ§Ã£o), o simulador deve:
  1. Verificar se existe licenÃ§a vÃ¡lida (ver seÃ§Ã£o 3).
  2. Se **nÃ£o** existir: exibir uma **tela de checkout** em vez do mÃ³dulo.
- **ConteÃºdo da tela de checkout:**
  - TÃ­tulo: "Upgrade para Ouro 4.0"
  - Texto explicando que a fase MineraÃ§Ã£o Ã© paga; a Ambiental permanece gratuita.
  - **Dados de pagamento PIX:**  
    **Cara-Core InformÃ¡tica** | **CNPJ (chave PIX):** 23.969.028/0001-37  
  - BotÃ£o/link: "Copiar ID de AtivaÃ§Ã£o" (chama o mÃ³dulo HID e copia o Hardware_ID para a Ã¡rea de transferÃªncia).
  - Link ou texto: "Envie este ID junto com o comprovante PIX pelo WhatsApp ou Telegram" (pode apontar para a pÃ¡gina do portal: `upgrade-ouro40.html` ou para o Canal de Melhorias).
- **EstÃ©tica:** Layout elegante, consistente com a interface Sciâ€‘Fi/HUD do simulador (fundo escuro, acentos dourados/ciano).

---

## 2. MÃ³dulo de identificaÃ§Ã£o de mÃ¡quina (HID)

- **Objetivo:** Gerar um **Hardware_ID** Ãºnico e **anÃ´nimo** por computador (nÃ£o deve conter nome de usuÃ¡rio, endereÃ§o, etc.).
- **ImplementaÃ§Ã£o sugerida (Python):**
  - Combinar dados **nÃ£o identificÃ¡veis** do hardware/OS, por exemplo:
    - UUID da placa ou do disco (se disponÃ­vel e estÃ¡vel).
    - Nome da mÃ¡quina (hostname) ou identificador do sistema (ex.: `platform.node()`), **hasheado** (SHA-256) para anonimizar.
    - Outros identificadores estÃ¡veis e nÃ£o sensÃ­veis (ex.: volume serial, se acessÃ­vel de forma segura).
  - Gerar um **hash Ãºnico** (ex.: SHA-256) da concatenaÃ§Ã£o desses valores e exibir uma versÃ£o **encurtada** ou **codificada** (ex.: primeiros 24 caracteres hex ou Base64) como "ID de AtivaÃ§Ã£o" legÃ­vel.
- **API exposta ao app:**
  - `get_hardware_id() -> str`: retorna o ID de ativaÃ§Ã£o (string) para exibiÃ§Ã£o e cÃ³pia.
- **BotÃ£o na UI:** "Copiar ID de AtivaÃ§Ã£o" â†’ chama `get_hardware_id()`, cola na Ã¡rea de transferÃªncia (ex.: `pyperclip` ou equivalente no ambiente do app).

---

## 3. Validador de licenÃ§a offline

- **Arquivo de licenÃ§a:** `license.key` na **pasta da aplicaÃ§Ã£o** (mesmo diretÃ³rio do executÃ¡vel ou diretÃ³rio de dados configurÃ¡vel).
- **Formato sugerido do arquivo (exemplo):**
  - ConteÃºdo assinado ou criptografado, contendo pelo menos: `hardware_id` (ou hash do HID), `valid_until` (data opcional de expiraÃ§Ã£o), e assinatura ou HMAC para evitar adulteraÃ§Ã£o.
  - Exemplo simplificado (texto):  
    `HARDWARE_ID=<id>|VALID_UNTIL=YYYY-MM-DD|SIGNATURE=<hmac_ou_assinatura>`  
  - A **chave secreta** usada para assinatura/HMAC fica apenas no binÃ¡rio do app (ofuscada) e no script do administrador (gerador de chaves).
- **LÃ³gica do validador (no simulador):**
  1. Ler `license.key` se existir.
  2. Verificar assinatura/HMAC.
  3. Comparar o `hardware_id` do arquivo com o `get_hardware_id()` da mÃ¡quina atual.
  4. Se houver `valid_until`, verificar se a data atual â‰¤ `valid_until`.
  5. Se tudo for vÃ¡lido â†’ **liberar acesso total** (incluindo MÃ³dulo MineraÃ§Ã£o); caso contrÃ¡rio â†’ manter paywall (exibir checkout ao tentar acessar MineraÃ§Ã£o).

---

## 4. Dashboard de gestÃ£o (O Contador) â€” script administrador

- **Uso:** Apenas pelo administrador; **nÃ£o** distribuÃ­do com o app.
- **FunÃ§Ã£o:** Gerar arquivos `license.key` (ou strings de licenÃ§a) a partir dos **IDs de AtivaÃ§Ã£o (Hardware_ID)** enviados pelos clientes (ex.: apÃ³s pagamento PIX e envio do comprovante).
- **Entrada:** Lista de Hardware_IDs (e opcionalmente data de validade).  
**SaÃ­da:** Arquivos `.key` ou strings que o cliente cola/grava em `license.key`.
- **Controle de ativaÃ§Ãµes (planilha ou banco local criptografado):**
  - Colunas sugeridas: **Hardware_ID** | **Data de AtivaÃ§Ã£o** | **Canal de Origem** (ex.: WhatsApp, Telegram) | **Valid_Until** (opcional).
  - A relaÃ§Ã£o **Hardware_ID â†” Pessoa real** (nome, e-mail, telefone) **nÃ£o** deve ficar dentro do software distribuÃ­do; pode ficar em planilha privada ou ERP, fora do repositÃ³rio do app, para conformidade LGPD.

---

## 5. Conformidade LGPD

- **Dentro do binÃ¡rio / no cÃ³digo do simulador:**  
  - **NÃ£o** armazenar nome, CPF, e-mail, telefone ou qualquer dado pessoal sensÃ­vel.  
  - O Ãºnico identificador armazenado ou lido Ã© o **Hardware_ID** (anonimizado) e o conteÃºdo do `license.key` (ID + validade + assinatura).
- **RelaÃ§Ã£o Hardware_ID â†” Pessoa real:**  
  - Manter **apenas** no controle financeiro/administrativo externo (ERP, planilha privada, canal de atendimento). O software nÃ£o envia o Hardware_ID para servidor obrigatÃ³rio; a ativaÃ§Ã£o Ã© offline.
- **PolÃ­tica de privacidade:** Deixar explÃ­cito na pÃ¡gina de upgrade (e no app, se houver tela de termos) que o ID de AtivaÃ§Ã£o Ã© anÃ´nimo e que a associaÃ§Ã£o com a pessoa fica apenas no controle do titular para fins de entrega da licenÃ§a e suporte.

---

## 6. Resumo do fluxo

| Etapa | Quem | AÃ§Ã£o |
|-------|------|------|
| 1 | UsuÃ¡rio | Usa fase Ambiental gratuita; ao tentar MineraÃ§Ã£o, vÃª tela "Upgrade Ouro 4.0" com PIX e botÃ£o "Copiar ID de AtivaÃ§Ã£o". |
| 2 | UsuÃ¡rio | Copia ID, paga PIX (Cara-Core InformÃ¡tica, CNPJ 23.969.028/0001-37), envia ID + comprovante por WhatsApp/Telegram. |
| 3 | Admin | Recebe pedido, anota Hardware_ID e canal no controle; gera `license.key` com o script; envia o arquivo ao cliente. |
| 4 | UsuÃ¡rio | Coloca `license.key` na pasta da aplicaÃ§Ã£o; reinicia; MÃ³dulo MineraÃ§Ã£o liberado. |
| 5 | Software | Validador lÃª `license.key`, confere HID e assinatura; se vÃ¡lido, libera acesso total. |

---

## 7. ReferÃªncias no portal caracore-ete-releases

- **PÃ¡gina de upgrade (checkout):** upgrade-ouro40.html â€” dados PIX, instruÃ§Ãµes e LGPD.
- **Canal de Melhorias:** canal-feedback.html â€” WhatsApp, Telegram e e-mail para envio do ID e comprovante.

A implementaÃ§Ã£o dos mÃ³dulos Python (HID, validador, gerador de chaves) e da UI de paywall/checkout Ã© feita no repositÃ³rio **chmulato/ETE**.

---

## 8. EsboÃ§o de implementaÃ§Ã£o (para o repositÃ³rio ETE)

### 8.1 Hardware ID (anÃ´nimo)

```python
# Exemplo: mÃ³dulo hid.py (ou dentro do pacote do app)
import hashlib
import platform
import subprocess
import sys

def get_hardware_id() -> str:
    """Gera um ID Ãºnico e anÃ´nimo para esta mÃ¡quina (sem dados pessoais)."""
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

### 8.2 Formato da licenÃ§a e validaÃ§Ã£o

```python
# license.key: texto com HARDWARE_ID|VALID_UNTIL=YYYY-MM-DD|SIGNATURE=<hmac_hex>
import hmac
import hashlib
from pathlib import Path
from datetime import datetime

SECRET = b"chave-secreta-trocar-em-producao"  # Ofuscar no binÃ¡rio

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
# Script separado: gerar_license.py (uso interno, nÃ£o distribuir)
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
    # Registrar em planilha/DB: HARDWARE_ID | Data AtivaÃ§Ã£o | Canal (WhatsApp/Telegram)
main()
```

- **Planilha de controle (exemplo):** Colunas `Hardware_ID` | `Data_Ativacao` | `Canal_Origem` | `Valid_Until`. Manter fora do cÃ³digo; relaÃ§Ã£o com pessoa real apenas em ERP/planilha privada.

---

## 9. IntegraÃ§Ã£o com os mÃ³dulos Ambiental e MineraÃ§Ã£o

Para a **simbiose tÃ©cnica** (estado global Ambiental â†’ MineraÃ§Ã£o), **dashboard embaÃ§ado** quando sem licenÃ§a, **auditoria de conversÃ£o** e **resgate de chave** no menu de configuraÃ§Ãµes, ver a especificaÃ§Ã£o dedicada: **[ARQUITETURA_SIMBIOSE_AMBIENTAL_MINERACAO.md](ARQUITETURA_SIMBIOSE_AMBIENTAL_MINERACAO.md)**.

