import { ILinkHandler, Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { ISearchOptions, SearchAddon } from 'xterm-addon-search';
import 'xterm/css/xterm.css';
import XtermWebfont from './font/WebfontAddon';
import BufferAddon from './buffer/BufferAddon';

type KeyListener = (key: string, domEvent: KeyboardEvent) => void;

interface XtermOpt {
  themeMode: 'light' | 'dark';
  linkHandler?: ILinkHandler;
}

export default class Xterm {
  private term: Terminal;

  private fitAddon: FitAddon;

  private searchAddon: SearchAddon;

  private webfontAddon: XtermWebfont;

  private bufferAddon: BufferAddon;

  private observer: ResizeObserver = new ResizeObserver(() => this.fitAddon.fit());

  private internalKeyListener: KeyListener | undefined;
  private keyListener: KeyListener | undefined;
  private dataListener: Callback | undefined;

  constructor(opt?: XtermOpt) {
    this.term = new Terminal({
      theme: {
        foreground: 'rgb(200, 200, 200)',
        background: "rgb(10, 10, 10)",
        cursor: "rgb(10, 10, 10)",
      },
      allowTransparency: true,
      windowsMode: false,
      cursorStyle: 'underline',
      cursorInactiveStyle: 'underline',
      disableStdin: false,
      fontFamily: 'Courier', // krlonjt
      convertEol: true, // support \n
      scrollback: 100000,
      fontSize: 18,
      fontWeight: '400',
      fontWeightBold: '500',
      // letterSpacing: 1,
      tabStopWidth: 2,
      linkHandler: opt?.linkHandler
    });
    this.fitAddon = new FitAddon();
    this.searchAddon = new SearchAddon();
    this.webfontAddon = new XtermWebfont();
    this.bufferAddon = new BufferAddon();
    this.term.loadAddon(this.fitAddon);
    this.term.loadAddon(this.searchAddon);
    this.term.loadAddon(this.webfontAddon);
    this.term.loadAddon(this.bufferAddon);
    // this.term.loadAddon(new WebLinksAddon(opt?.linkHandler));
    this.term.onKey(({key, domEvent}) => {
      this.internalKeyListener && this.internalKeyListener(key, domEvent);
      this.keyListener && this.keyListener(key, domEvent);
    });
    this.term.onData(() => {
      this.dataListener && this.dataListener();
    });
  }

  public on(event: 'key', listener: KeyListener): void;
  public on(event: 'data', listener: Callback): void;
  public on(event: string, listener: any) {
    switch (event) {
      case 'key':
        this.keyListener = listener;
        break;
      case 'data':
        this.dataListener = listener;
        break;
    }
  }

  public attach(elem: HTMLElement) {
    this.webfontAddon.loadWebfontAndOpen(elem);
    // this.term.open(elem);
    this.observer.observe(elem);
    this.fitAddon.fit();
  }

  public dettach(elem: HTMLElement) {
    this.observer.unobserve(elem);
  }

  public write(data: string | Uint8Array) {
    this.term.write(data);
  }

  public writeln(data: string | Uint8Array) {
    this.term.writeln(data);
  }

  public findNext(text: string, searchOptions?: ISearchOptions) {
    this.searchAddon.findNext(text, searchOptions);
  }

  public findPrevious(text: string, searchOptions?: ISearchOptions) {
    this.searchAddon.findPrevious(text, searchOptions);
  }

  public clear() {
    this.term.clear();
  }
}
