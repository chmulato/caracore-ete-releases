# Minerador 4.0 — Instalação multiplataforma

Distribuição oficial por release (GitHub ou loja **caracore-ete-releases**):

| Plataforma | Ficheiro | Notas |
|------------|----------|--------|
| **Windows** | `Minerador40-windows-x64.exe` | Executável único (onefile no CI). WebView2 Runtime pode ser necessário se o sistema não o tiver. |
| **Linux** | `Minerador40-linux-x86_64.tar.gz` | Extrair; executar `Minerador40/Minerador40`. Requer GTK/WebKitGTK para pywebview. |
| **macOS** | `Minerador40-macos-universal.dmg` | Montar; usar a pasta `Minerador40`. Gatekeeper pode exigir confirmação na primeira execução. |

Também são publicados `checksums.sha256`, `checksums.md5` e este guia como referência rápida.

## Guias detalhados

- [Windows](INSTALACAO_WINDOWS.md)
- [Linux](INSTALACAO_LINUX.md)
- [macOS](INSTALACAO_MACOS.md)

## Integridade

Valide sempre os hashes antes de executar:

```bash
# Linux (tar.gz ou qualquer ficheiro)
sha256sum Minerador40-linux-x86_64.tar.gz
```

```powershell
# Windows (PowerShell)
Get-FileHash -Path .\Minerador40-windows-x64.exe -Algorithm SHA256
```

```bash
# macOS
shasum -a 256 Minerador40-macos-universal.dmg
```

Compare com `checksums.sha256` incluído na release.

## Modo Free × Premium

O mesmo binário corre em modo **Free** (paywall na interface) e **Premium** após ativação. Estado da licença é guardado localmente no sistema.

## Gerar instaladores localmente (desenvolvimento)

Três caminhos possíveis:

1. **Windows** (na raiz do repo, Python 3.10 recomendado):
   ```powershell
   python scripts/build_dist_local.py --onedir --require-python-310
   ```
   Saída típica: pasta `dist/Minerador40/` com `Minerador40.exe`, checksums e opcional `--zip`.

2. **Linux ou macOS** (bash, na raiz do repo):
   ```bash
   chmod +x scripts/build_dist_local_unix.sh
   ./scripts/build_dist_local_unix.sh
   ```
   - Linux: `dist/Minerador40-linux-x86_64.tar.gz` (+ `checksum.md5` / `checksum.sha256` desse ficheiro).
   - macOS: `dist/Minerador40-macos-universal.dmg` (+ checksums).

   Em Linux instale dependências GTK/WebKit para a janela nativa (ver [Linux](INSTALACAO_LINUX.md)).

   Num PC **Windows**, este bash não corre nativamente; para `.tar.gz` / `.dmg` use **WSL2**, VM Linux, um Mac, ou o caminho 3.

3. **Três plataformas sem máquinas mistas:** GitHub → Actions → **Build Minerador 4.0 (test + exe + release)** → *Run workflow*. Descarregue os artefactos de cada job (`Minerador40-Windows`, `Minerador40-Linux`, `Minerador40-macOS`). Para pacotes iguais aos da loja pública, crie uma tag `vX.Y.Z` e siga `library/DELIVERY_ETE_RELEASES.md`.

O empacotamento oficial replica o job **build_multiplatform** em `.github/workflows/build_exe.yml` (PyInstaller `build_minerador40_folder.spec` + `requirements-minerador40-desktop.txt`).
