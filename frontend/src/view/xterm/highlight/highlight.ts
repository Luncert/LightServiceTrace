import { Registry, parseRawGrammar, INITIAL, IGrammar } from 'vscode-textmate';
import { loadWASM, OnigScanner, OnigString } from 'vscode-oniguruma';
import { styledString, getFontStyle } from '../Colors';
import wasmBinUrl from 'vscode-oniguruma/release/onig.wasm?url';
import logLang from './log-lang.xml?raw';
import logColor from './log-color.json';

interface ScopeStyleDef {
  scope: string;
  style: TerminalStyle;
}

function loadColorSchema(colorDefs: ScopeStyleDef[]) {
  const schema: Map<string, TerminalStyle> = new Map();
  colorDefs.forEach((colorDef) => schema.set(colorDef.scope, colorDef.style));
  return schema;
}

// Create a registry that can create a grammar from a scope name.
// https://github.com/textmate/javascript.tmbundle/blob/master/Syntaxes/JavaScript.plist
function getRegistry() {
  const vscodeOnigurumaLib = fetch(wasmBinUrl)
  .then((wasmBin) => loadWASM(wasmBin))
  .then(() => {
    return {
      createOnigScanner(patterns: any) {
        return new OnigScanner(patterns);
      },
      createOnigString(s: any) {
        return new OnigString(s);
      },
    };
  });
  return new Registry({
    onigLib: vscodeOnigurumaLib,
    loadGrammar: async (scopeName: string) => {
      if (PLISTS[scopeName]) {
        const data = PLISTS[scopeName] as string;
        return parseRawGrammar(data);
      }
      console.log(`Unknown scope name: ${scopeName}`);
      return null;
    },
  });
}

const PLISTS: any = {
  'text.log': logLang,
};

const colorSchema: Map<string, TerminalStyle> = loadColorSchema(
  logColor.textMateRules
);

const registry = getRegistry();

function getStyle(scopeNames: string[]): TerminalStyle | undefined {
  // eslint-disable-next-line no-restricted-syntax
  for (const scope of scopeNames) {
    if (colorSchema.has(scope)) {
      return colorSchema.get(scope);
    }
  }
}

let grammar: IGrammar | null;

export default async function highlight(
  source: string,
  output: (s: string) => void
) {
  if (!grammar) {
    grammar = await registry.loadGrammar('text.log');
  }
  if (!grammar) {
    throw new Error('loading grammar failed')
  }
  const buf = [];

  let ruleStack = INITIAL;
  // eslint-disable-next-line no-restricted-syntax
  for (const line of source.split('\n')) {
    if (line.length > 0) {
      const lineTokens = grammar.tokenizeLine(line, ruleStack);

      let prevIndex = 0;
      for (let i = 0; i < lineTokens.tokens.length; i++) {
        const token = lineTokens.tokens[i];

        const style = getStyle(token.scopes);
        if (style != null) {
          buf.push(line.substring(prevIndex, token.startIndex))
          buf.push(
            styledString(
              line.substring(token.startIndex, token.endIndex),
              style.foreground,
              style.background,
              getFontStyle(style.fontStyle || '')
            )
          );
          prevIndex = token.endIndex;
        }
      }
      if (prevIndex < line.length) {
        buf.push(line.substring(prevIndex));
      }

      ruleStack = lineTokens.ruleStack;
    }

    buf.push('\n');
  }

  output(buf.slice(0, buf.length - 1).join(''));
}
