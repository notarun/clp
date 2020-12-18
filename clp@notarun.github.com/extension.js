const Main = imports.ui.main;
const { Gdk, St } = imports.gi;

const INDICATOR_NAME = 'clp';

const utils = {
  // https://css-tricks.com/converting-color-spaces-in-javascript/
  rgbToHex: (r, g, b) => {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
  }
};

class Clp {
  constructor() {
    this._win = Gdk.get_default_root_window();
    this._display = this._win.get_display();
    this._seat = this._display.get_default_seat();
    this._clipboard = St.Clipboard.get_default();
    this._cursor = Gdk.Cursor.new_for_display(this._display, Gdk.CursorType.TCROSS);

    Gdk.Event.handler_set(ev => this.pick(ev));
  }

  pick(ev) {
    if (ev.get_event_type() !== Gdk.EventType.BUTTON_RELEASE)
      return;

    const [, x, y,] = this._win.get_device_position_double(ev.get_device());
    const color = this._getColorAt(x, y);

    this._clipboard.set_text(St.ClipboardType.CLIPBOARD, color);
    Main.notify(`Picked ${color}`);
    this.ungrab();
  }

  _getColorAt(x, y) {
    const [r, g, b] = Gdk.pixbuf_get_from_window(this._win, x, y, 1, 1).get_pixels();
    return utils.rgbToHex(r, g, b);
  }

  grab() {
    this._seat.grab(
      this._win,
      Gdk.SeatCapabilities.ALL_POINTING,
      false,
      this._cursor,
      null,
      () => this._win.show()
    );
  }

  ungrab() {
    this._seat.ungrab();
  }
}

class ClpIndicator {
  constructor() {
    this._button = new St.Button;

    // FIXME: use a custom icon
    this._icon = new St.Icon({
      iconName: 'edit-clear',
      iconSize: 16,
    });

    this._button.set_child(this._icon);
    this._button.connect('clicked', () => (new Clp).grab());
  }

  enable() {
    Main.panel._rightBox.insert_child_at_index(this._button, 0);
  }

  disable() {
    Main.panel._rightBox.remove_child(this._button);
  }
}

function init() {
  return new ClpIndicator;
}
