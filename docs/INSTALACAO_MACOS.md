# Minerador 4.0 — macOS

## Formato da distribuição

A release inclui um **ficheiro de disco** (`Minerador40-macos-universal.dmg`). Ao montar, verá a pasta **`Minerador40`** com o binário e `_internal/` (modo PyInstaller **onedir**).

O nome **macos-universal** segue o ficheiro publicado na release; em geral o binário corresponde à arquitetura do runner de CI (por exemplo arm64 em `macos-latest`), salvo configuração explícita de *fat binary* no projeto.

## Instalação rápida

1. Abra o `.dmg` e arraste a pasta `Minerador40` para `Applications` ou para uma pasta à sua escolha.
2. Execute o programa **`Minerador40`** dentro dessa pasta (ícone de terminal/GUI conforme o Finder).

Não apague `_internal/` — o programa precisa dessa pasta ao lado do binário.

## Gatekeeper e apps não assinados

Binários gerados em CI **não são assinados** com Apple Developer ID por defeito. Na primeira execução o macOS pode bloquear:

- **Definições → Privacidade e segurança** → permitir a execução, ou
- Clicar com o botão direito no binário → **Abrir** → confirmar.

Se descarregou via browser e aparecer erro de ficheiro isolado:

```bash
xattr -cr /caminho/para/Minerador40
```

(substitua pelo caminho real da pasta)

## WebView

O `pywebview` no macOS usa o motor WebKit do sistema. Mantenha o macOS atualizado para reduzir incompatibilidades.

## Servidor local

O Flask corre em `127.0.0.1` (porta **5150**). Firewall pessoal raramente bloqueia tráfego local; se bloquear, permita ligações apenas a localhost.

## Dados da aplicação

Estado e licença: tipicamente em `~/Library/Application Support/Minerador40` (ou equivalente definido pela app).

## Integridade

Valide o SHA-256 do `.dmg` com `checksums.sha256` na mesma release:

```bash
shasum -a 256 Minerador40-macos-universal.dmg
```
