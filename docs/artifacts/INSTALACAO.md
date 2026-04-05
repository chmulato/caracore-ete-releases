# Minerador 4.0 - Instalacao (Windows)

Arquivos desta entrega:
- Minerador40.exe
- checksum.sha256
- checksum.md5
- INSTALACAO.md (este arquivo)

## Validacao de integridade

No PowerShell, na pasta de artefatos:

```powershell
Get-FileHash -Path .\Minerador40.exe -Algorithm SHA256
Get-FileHash -Path .\Minerador40.exe -Algorithm MD5
```

Compare os valores com os arquivos `checksum.sha256` e `checksum.md5`.

## Requisitos

- Windows 10 ou superior (64 bits)
- 300 MB de espaco livre
- Conexao com internet: nao necessaria

## Execucao

1. Execute `Minerador40.exe` em duplo clique.
2. Conclua o assistente de instalacao.
3. Abra o atalho criado no Desktop para iniciar o simulador.

## Desinstalacao

Painel de Controle > Programas > Programas e Recursos > desinstalar Minerador 4.0.

## Canal oficial

- Pagina de download: ../download.html
- Licenca: ../licenca-uso.html
- Suporte: https://caracore.com.br

---

> Versao: v4.0.0
> Cara Core Informatica — https://caracore.com.br
