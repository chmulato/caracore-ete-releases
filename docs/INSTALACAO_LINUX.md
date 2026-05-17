# Minerador 4.0 — Linux (x86_64)

## Formato da distribuição

O pacote de release é um **ficheiro compactado** (`Minerador40-linux-x86_64.tar.gz`), não um AppImage. Contém a pasta `Minerador40/` gerada pelo PyInstaller em modo **pasta (onedir)** — inclui o binário principal e a subpasta `_internal/` com bibliotecas.

## Instalação rápida

```bash
tar -xzf Minerador40-linux-x86_64.tar.gz
chmod +x Minerador40/Minerador40
./Minerador40/Minerador40
```

Mantenha `Minerador40` e `_internal` no mesmo nível (não mova só o binário).

## Dependências de sistema (pywebview)

O `pywebview` no Linux usa normalmente **GTK 3** e **WebKitGTK**. Em distribuições Debian/Ubuntu:

```bash
sudo apt-get update
sudo apt-get install -y python3-gi gir1.2-gtk-3.0 gir1.2-webkit2-4.1 libgtk-3-0
```

Nomes dos pacotes variam (Fedora: `gtk3`, `webkitgtk4`; Arch: `webkitgtk-4.1`). Se a janela não abrir, instale o binding WebKitGTK correspondente à sua distro.

## Servidor local

O Flask corre em `127.0.0.1` (porta por defeito **5150**). Não é necessário expor portas na firewall para uso normal.

## Dados da aplicação

Ficheiros de estado/licença ficam tipicamente em `~/.local/share/Minerador40` ou equivalente conforme XDG (variável `XDG_DATA_HOME`).

## Integridade

Compare o SHA-256 do `.tar.gz` com o ficheiro `checksums.sha256` da release.
