pwd = $(shell pwd)
uuid = clp@notarun.github.com
ext_dir = ~/.local/share/gnome-shell/extensions

ln:
	ln -s $(pwd)/$(uuid) $(ext_dir)/$(uuid)

rm:
	rm -f $(ext_dir)/$(uuid)

.PHONY: ln rm
