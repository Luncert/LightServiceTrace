import parse from 'color-parse';

export const Mod = {
  Bold: 1,
  Dim: 2,
  Italic: 4,
  Underline: 8,
  Inverse: 16,
  Hidden: 32,
  Strikethrough: 64,
};

const FontStyleMapping = {
  bold: Mod.Bold,
  dim: Mod.Dim,
  italic: Mod.Italic,
  underline: Mod.Underline,
  inverse: Mod.Inverse,
  hidden: Mod.Hidden,
  strikethrough: Mod.Strikethrough,
};

export function getFontStyle(s: string) {
  return s ? FontStyleMapping[s.toLowerCase()] : 0
}

const ModCodes = [
  {
    mod: Mod.Bold,
    code: 1,
  },
  {
    mod: Mod.Dim,
    code: 2,
  },
  {
    mod: Mod.Italic,
    code: 3,
  },
  {
    mod: Mod.Underline,
    code: 4,
  },
  {
    mod: Mod.Inverse,
    code: 7,
  },
  {
    mod: Mod.Hidden,
    code: 8,
  },
  {
    mod: Mod.Strikethrough,
    code: 9,
  },
];

interface Color {
  space: string;
  values: number[];
  alpha: number;
}

function parseColor(color: string): number[] {
  const c: Color = parse(color);
  if (c.space !== 'rgb') {
    throw new Error('only rgb color is supported');
  }
  return c.values;
}

function addFontStyle(buf: string[], fontStyle: number) {
  for (let i = 0; i < ModCodes.length; i++) {
    if (fontStyle & ModCodes[i].mod) {
      buf.push(`\u001b[${ModCodes[i].code}m`);
    }
  }
}

// https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html#8-colors
export function styledString(
  value: string,
  fg?: string,
  bg?: string,
  fontStyle?: number
) {
  const buf: string[] = [];

  if (fg) {
    const c = parseColor(fg);
    buf.push(`\u001b[38;2;${c[0]};${c[1]};${c[2]}m`);
  }

  if (bg) {
    const c = parseColor(bg);
    buf.push(`\u001b[48;2;${c[0]};${c[1]};${c[2]}m`);
  }

  if (fontStyle) {
    addFontStyle(buf, fontStyle);
  }

  buf.push(value);
  buf.push('\u001b[0m');

  return buf.join('');
}
