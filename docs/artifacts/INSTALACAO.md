# Minerador 4.0 — Instalação (Windows)

> Para Linux e macOS, use o guia `INSTALACAO_MULTIPLATAFORMA.md`.

**Versão do pacote (semver):** 1.1.10 — produto comercial **Minerador 4.0** (Campo Largo); mesmo instalador suporta modo **Free** e ativação **Premium** via `license.key`.

Arquivos desta entrega (Windows):
- Minerador40-windows-x64.exe
- checksums.sha256
- checksums.md5
- INSTALACAO.md (este arquivo)

## Validacao de integridade

No PowerShell, na pasta de artefatos:

```powershell
Get-FileHash -Path .\Minerador40-windows-x64.exe -Algorithm SHA256
Get-FileHash -Path .\Minerador40-windows-x64.exe -Algorithm MD5
```

Compare os valores com os arquivos `checksum.sha256` e `checksum.md5`.

## Requisitos

- Windows 10 ou superior (64 bits)
- 300 MB de espaco livre
- Conexao com internet: nao necessaria

## Execucao

1. Execute `Minerador40-windows-x64.exe` em duplo clique.
2. Conclua o assistente de instalacao.
3. Abra o atalho criado no Desktop para iniciar o simulador.

## Desinstalacao

Painel de Controle > Programas > Programas e Recursos > desinstalar Minerador 4.0.

## Canal oficial

- Pagina de download: ../download.html
- Licenca: ../licenca-uso.html
- Suporte: https://www.caracore.com.br

---

> Versão do instalador: 1.1.10 (produto Minerador 4.0)
> Cara Core Informática — https://www.caracore.com.br
