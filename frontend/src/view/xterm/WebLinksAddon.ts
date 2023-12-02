import { IDisposable, ITerminalAddon, Terminal } from "xterm"
import { WebLinkProvider } from "./WebLinkProvider";

const protocolClause = '((https|loghub)?:\\/\\/)';
const domainCharacterSet = '[\\da-z\\.-]+';
const negatedDomainCharacterSet = '[^\\da-z\\.-]+';
const domainBodyClause = '(' + domainCharacterSet + ')';
const tldClause = '([a-z\\.]{2,6})';
const ipClause = '((\\d{1,3}\\.){3}\\d{1,3})';
const localHostClause = '(localhost)';
const portClause = '(:\\d{1,5})';
const hostClause = '((' + domainBodyClause + '\\.' + tldClause + ')|' + ipClause + '|' + localHostClause + ')' + portClause + '?';
const pathCharacterSet = '(\\/[\\/\\w\\.\\-%~:+@]*)*([^:"\'\\s])';
const pathClause = '(' + pathCharacterSet + ')?';
const queryStringHashFragmentCharacterSet = '[0-9\\w\\[\\]\\(\\)\\/\\?\\!#@$%&\'*+,:;~\\=\\.\\-]*';
const queryStringClause = '(\\?' + queryStringHashFragmentCharacterSet + ')?';
const hashFragmentClause = '(#' + queryStringHashFragmentCharacterSet + ')?';
const negatedPathCharacterSet = '[^\\/\\w\\.\\-%]+';
const bodyClause = '(' + hostClause + '|data)' + pathClause + queryStringClause + hashFragmentClause;
const start = '(?:^|' + negatedDomainCharacterSet + ')(';
const end = ')($|' + negatedPathCharacterSet + ')';
const strictUrlRegex = new RegExp(start + protocolClause + bodyClause + end);

export type LinkHandler = (event: MouseEvent, uri: string) => void

export default class WebLinksAddon implements ITerminalAddon {

  private _terminal: Terminal
  private _linkMatcherId: number | undefined
  private _linkProvider: IDisposable | undefined

  constructor(private _handler: LinkHandler = handleLink) {
  }

  activate(terminal: Terminal): void {
    this._terminal = terminal
    this._linkProvider = this._terminal.registerLinkProvider(new WebLinkProvider(this._terminal, strictUrlRegex, this._handler))
  }

  dispose(): void {
    if (this._linkMatcherId !== undefined && this._terminal !== undefined) {
      this._terminal.deregisterLinkMatcher(this._linkMatcherId);
    }

    this._linkProvider?.dispose();
  }
}

function handleLink(event: MouseEvent, uri: string): void {
  const newWindow = window.open();
  if (newWindow) {
    newWindow.opener = null;
    newWindow.location.href = uri;
  } else {
    console.warn('Opening link blocked as opener could not be cleared');
  }
}