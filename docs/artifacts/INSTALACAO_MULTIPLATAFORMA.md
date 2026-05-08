# Minerador 4.0 — Instalacao Multiplataforma

Versao da release: 1.1.10

Este guia define os artefatos oficiais para distribuicao do Minerador 4.0 em Linux, Windows e macOS.

## Artefatos oficiais por sistema

- Minerador40-linux-x86_64.AppImage
- Minerador40-windows-x64.exe
- Minerador40-macos-universal.dmg
- checksums.sha256
- checksums.md5

## Validacao de integridade

Linux:

```bash
sha256sum Minerador40-linux-x86_64.AppImage
md5sum Minerador40-linux-x86_64.AppImage
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

Linux (AppImage):

```bash
chmod +x Minerador40-linux-x86_64.AppImage
./Minerador40-linux-x86_64.AppImage
```

Windows (.exe):

1. Execute Minerador40-windows-x64.exe.
2. Conclua o assistente de instalacao.
3. Abra o atalho Minerador 4.0.

macOS (.dmg):

1. Abra Minerador40-macos-universal.dmg.
2. Arraste Minerador 4.0 para Applications.
3. Na primeira execucao, se necessario, autorize em Privacy and Security.

## Politica de nomes para automacao

Mantenha exatamente os nomes abaixo em todas as releases para permitir links diretos no portal:

- Minerador40-linux-x86_64.AppImage
- Minerador40-windows-x64.exe
- Minerador40-macos-universal.dmg
- checksums.sha256
- checksums.md5
