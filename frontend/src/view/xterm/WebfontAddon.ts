import FontFaceObserver from "fontfaceobserver";
import { ITerminalAddon, Terminal } from "xterm";

export default class XtermWebfont implements ITerminalAddon {

  private term: Terminal | undefined;

  activate(terminal: Terminal) {
    this.term = terminal;
  }

  loadWebfontAndOpen(element: HTMLElement) {
    return new Promise(async (resolve, reject) => {
      if (!this.term) {
        reject("terminal not bind");
        return;
      }
      // const fontFamily = this.term.options.fontFamily || "Courier";
      // await new FontFaceObserver(fontFamily).load();
      // await new FontFaceObserver(fontFamily, { weight: "bold" }).load();
      this.term?.open(element);
      resolve(true);
    });
  };

  dispose() {
  }
};