# Minerador 4.0 — Instalação e distribuição no Windows

Índice multiplataforma: [INSTALACAO_MULTIPLATAFORMA.md](INSTALACAO_MULTIPLATAFORMA.md).

Este guia descreve uma instalação **saudável** no sistema local: pré-requisitos, limitações do Windows (SmartScreen, WebView2) e diferença entre artefactos **onefile** e **pasta (onedir)**.

## Pré-requisitos no PC do utilizador

1. **WebView2 Runtime** — O Minerador 4.0 usa `pywebview`, que no Windows depende do motor **Microsoft Edge WebView2**. Na maior parte dos sistemas recentes já vem instalado ou é atualizado pelo Edge/Windows Update. Se a janela não abrir ou aparecer erro de controlo WebView2, instale o runtime em [Distribuição do Microsoft Edge WebView2](https://developer.microsoft.com/microsoft-edge/webview2/).

2. **Antivírus e SmartScreen** — Executáveis gerados com PyInstaller **não são assinados por defeito**. O Windows Defender SmartScreen pode bloquear ou pedir «Mais informações → Executar na mesma». Isto é esperado até existir assinatura de código (certificado EV/OV). Para distribuição profissional, planear **assinatura Authenticode** do `.exe`.

3. **Rede** — O servidor Flask corre em **localhost** (por exemplo `127.0.0.1`). Não é necessário abrir portas na firewall para uso normal; apenas garantir que software de segurança não bloqueie ligações locais.

## Dados da aplicação

- Estado da licença e ficheiros da app: tipicamente `%APPDATA%\Minerador40` (equivalente a `C:\Users\<utilizador>\AppData\Roaming\Minerador40`).
- Desinstalar/apagar manualmente essa pasta remove dados locais da app (faça cópia se precisar).

## Tipos de artefacto

| Modo | Descrição | Vantagens | Notas |
|------|-----------|-----------|--------|
| **Onefile** | Um único `Minerador40.exe` | Fácil de enviar por e-mail/cloud | Extração temporária ao arranque; primeiro arranque mais lento; maior probabilidade de falsos positivos em antivírus |
| **Onedir (pasta)** | Pasta `Minerador40\` com `.exe` + `_internal\` | Arranque mais rápido; estrutura mais familiar aos antivírus | Distribuir como `.zip` da pasta inteira; o utilizador extrai e executa `Minerador40.exe` dentro da pasta |

Para gerar localmente (na raiz do repositório):

```text
python scripts/build_dist_local.py --deps desktop
python scripts/build_dist_local.py --deps desktop --onedir --zip
```

- **`--deps desktop`** (predefinição): instala apenas o runtime mínimo (`requirements-minerador40-desktop.txt`), adequado ao executável.
- **`--deps full`**: usa `requirements.txt` completo (Streamlit, stacks de teste, etc.) — **não** recomendado para o pacote final; aumenta muito o tamanho.
- **`--zip`**: compacta o resultado (`Minerador40-<versão>-windows-onedir.zip` ou `…-onefile.zip`).

## Integridade

Os ficheiros `checksum.md5` e `checksum.sha256` junto ao `.exe` referem-se ao executável principal. Após extrair um `.zip`, volte a gerar ou verificar checksums no destino se distribuir ficheiros alterados.

## Documentação de feedback

Para reportar evolução ou suporte, ver `docs/CANAL_FEEDBACK_LGPD.md` e a secção «Reportar Evolução» na interface (com servidor HTTP local, não abrir o HTML principal via `file://` para rotas completas).
