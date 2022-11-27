⚠ **DEPRECATED**: broken in newer gnome version,
use [https://github.com/tuberry/color-picker](https://github.com/tuberry/color-picker) intead.

## clp
a minimal color picker for gnome shell.

#### instructions
```bash
# installation
git clone https://github.com/notarun/clp
cd clp
make ln
# alt + f2, r, return (restart gnome-shell)
gnome-extensions enable clp@notarun.github.com

# debugging
journalctl -f -o cat /usr/bin/gnome-shell
```

#### todo
```
- use a custom icon
- esc to ungrab
- submit to https://extensions.gnome.org/
```
