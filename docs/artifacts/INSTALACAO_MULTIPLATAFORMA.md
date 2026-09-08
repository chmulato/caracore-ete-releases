# Minerador 4.0 — Instalacao Multiplataforma

Versao da release: 1.2.3

Este guia define os artefactos oficiais para distribuicao do Minerador 4.0 em Linux, Windows e macOS.

## Artefactos oficiais por sistema

- Minerador40-windows-x64.exe
- Minerador40-windows-x64.zip
- Minerador40-linux-x86_64.tar.gz
- Minerador40-macos-universal.dmg
- checksums.sha256
- checksums.md5

## Validacao de integridade

Linux:

```bash
sha256sum Minerador40-linux-x86_64.tar.gz
md5sum Minerador40-linux-x86_64.tar.gz
```

Windows (PowerShell):

```powershell
Get-FileHash -Path .\Minerador40-windows-x64.exe -Algorithm SHA256
Get-FileHash -Path .\Minerador40-windows-x64.exe -Algorithm MD5
```

macOS:

```bash
shasum -a 256 Minerador40-macos-universal.dmg
md5 Minerador40-macos-universal.dmg
```

Compare os resultados com checksums.sha256 e checksums.md5.

## Instalacao por plataforma

Windows (onefile):

1. Execute Minerador40-windows-x64.exe (duplo clique).
2. Se o SmartScreen avisar, escolha Mais informacoes → Executar.

Windows (pasta ZIP):

1. Extraia Minerador40-windows-x64.zip.
2. Execute Minerador40.exe **dentro** da pasta (leva `_internal/`).

Linux (tar.gz):

```bash
tar -xzf Minerador40-linux-x86_64.tar.gz
./Minerador40/Minerador40
```

macOS (.dmg):

1. Abra Minerador40-macos-universal.dmg.
2. Use a pasta Minerador40 (inclui `_internal/`).
3. Na primeira execucao, se necessario, autorize em Privacy and Security.

## Politica de nomes para automacao

Mantenha exactamente os nomes abaixo em todas as releases para permitir links diretos no portal:

- Minerador40-windows-x64.exe
- Minerador40-windows-x64.zip
- Minerador40-linux-x86_64.tar.gz
- Minerador40-macos-universal.dmg
- checksums.sha256
- checksums.md5
