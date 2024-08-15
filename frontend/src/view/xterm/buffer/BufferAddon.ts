import { Terminal, IDisposable } from "xterm";

export default class BufferAddon {

  private disposables: IDisposable[] = []

  activate(terminal: Terminal) {
    this.disposables.push(terminal.onScroll((a, b) => {
      console.log(a, b)
    }))
    this.disposables.push(terminal.buffer.onBufferChange(buf => {
      console.log(buf.length, buf.viewportY, buf.baseY)
    }))
    terminal.buffer.active
  }

  dispose() {
    this.disposables.forEach(d => d.dispose())
    this.disposables.length = 0
  }
}