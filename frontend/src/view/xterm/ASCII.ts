const CODE_CSI = '\x1b[';
const CODE_SP = '\x20';

export const TextStyles = {
  Bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
  Italics: (s: string) => `\x1b[3m${s}\x1b[0m`,
  Underline: (s: string) => `\x1b[4m${s}\x1b[0m`,
  Black: (s: string) => `\x1b[30m${s}\x1b[0m`,
  Red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  Green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  Yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  Blue: (s: string) => `\x1b[34m${s}\x1b[0m`,
  Magenta: (s: string) => `\x1b[35m${s}\x1b[0m`,
  Cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  White: (s: string) => `\x1b[37m${s}\x1b[0m`,
  BrightBlack: (s: string) => `\x1b[30;1m${s}\x1b[0m`,
  BrightRed: (s: string) => `\x1b[31;1m${s}\x1b[0m`,
  BrightGreen: (s: string) => `\x1b[32;1m${s}\x1b[0m`,
  BrightYellow: (s: string) => `\x1b[33;1m${s}\x1b[0m`,
  BrightBlue: (s: string) => `\x1b[34;1m${s}\x1b[0m`,
  BrightMagenta: (s: string) => `\x1b[35;1m${s}\x1b[0m`,
  BrightCyan: (s: string) => `\x1b[36;1m${s}\x1b[0m`,
  BrightWhite: (s: string) => `\x1b[37;1m${s}\x1b[0m`,
  BgBlack: (s: string) => `\x1b[40m${s}\x1b[0m`,
  BgRed: (s: string) => `\x1b[41m${s}\x1b[0m`,
  BgGreen: (s: string) => `\x1b[42m${s}\x1b[0m`,
  BgYellow: (s: string) => `\x1b[43m${s}\x1b[0m`,
  BgBlue: (s: string) => `\x1b[44m${s}\x1b[0m`,
  BgMagenta: (s: string) => `\x1b[45m${s}\x1b[0m`,
  BgCyan: (s: string) => `\x1b[46m${s}\x1b[0m`,
  BgWhite: (s: string) => `\x1b[47m${s}\x1b[0m`,
};

export const ASCII = {
  // control seqs
  Bel: '\x07',
  Backspace: '\x08',
  Inert: `${CODE_CSI}2~`,
  Delete: `${CODE_CSI}3~`,
};

export const CSI = {
  // CSI
  /**
   * Inert n (blank) characters after current position.
   * @param n
   */
  ICH: (n: number = 1) => `${CODE_CSI + n}@`,

  /**
   * Scroll viewport n times to the left.
   */
  SL: (n: number = 1) => `${CODE_CSI + n + CODE_SP}@`,

  /**
   * Scroll viewport n times to the right.
   */
  SR: (n: number) => `${CODE_CSI + n + CODE_SP}A`,

  /**
   * Move cursor n times up.
   */
  CUU: (n: number = 1) => `${CODE_CSI + n}A`,

  /**
   * Move cursor n times down.
   */
  CUD: (n: number = 1) => `${CODE_CSI + n}B`,

  /**
   * Move cursor n times forward.
   */
  CUF: (n: number = 1) => `${CODE_CSI + n}C`,

  /**
   * Move cursor n times backward.
   */
  CUB: (n: number = 1) => `${CODE_CSI + n}D`,

  /**
   * Move cursor n times down and to the first column.
   */
  CNL: (n: number = 1) => `${CODE_CSI + n}E`,

  /**
   * Move cursor n times up and to the first column.
   */
  CPL: (n: number = 1) => `${CODE_CSI + n}F`,

  /**
   * Move cursor to n-th column of the active row.
   */
  CHA: (n: number = 1) => `${CODE_CSI + n}G`,

  /**
   * Set cursor to position [l, c].
   */
  CUP: (l: number, c: number) => `${CODE_CSI + l};${c}H`,

  /**
   * Move cursor n times tabs forward.
   */
  CHT: (n: number = 1) => `${CODE_CSI + n}I`,

  /**
   * Selective erase in display. Currently the same as ED.
   */
  DECSED: (n: number) => `${CODE_CSI}?${n}J`,

  /**
   * Erase various parts of the viewport.
   */
  ED: (n: number) => `${CODE_CSI + n}J`,

  /**
   * Selective erase in line. Currently the same as EL.
   */
  DECSEL: (n: number) => `${CODE_CSI}?${n}K`,

  /**
   * Erase various parts of the active row.
   */
  EL: (n: number) => `${CODE_CSI + n}K`,

  /**
   * Insert n blank lines at active row.
   */
  IL: (n: number = 1) => `${CODE_CSI + n}L`,

  /**
   * Delete n liens at active row.
   */
  DL: (n: number = 1) => `${CODE_CSI + n}M`,

  /**
   * Delete n characters.
   */
  DCH: (n: number = 1) => `${CODE_CSI + n}P`,

  /**
   * Scroll n lines up.
   */
  SU: (n: number = 1) => `${CODE_CSI + n}S`,

  /**
   * Scroll n lines down.
   */
  SD: (n: number = 1) => `${CODE_CSI + n}T`,

  /**
   * Erase n characters from current cursor position to the right.
   */
  ECH: (n: number = 1) => `${CODE_CSI + n}X`,

  /**
   * Move cursor n tabs backward.
   */
  CBT: (n: number = 1) => `${CODE_CSI + n}Z`,

  /**
   * Horizontal position absolute. Same as CHA.
   */
  HPA: (n: number) => `${CODE_CSI + n}\``,

  /**
   * Horizontal position relative. Same as CUF.
   */
  HPR: (n: number) => `${CODE_CSI + n}a`,

  /**
   * Repeat preceding character.
   */
  REP: (n: number = 1) => `${CODE_CSI + n}b`,

  /**
   * Primary device attributes.
   */
  DA1: `${CODE_CSI}c`,

  /**
   * Secondary device attribuets.
   */
  DA2: `${CODE_CSI}>c`,

  /**
   * Vertical position absolute.
   */
  VPA: (n: number = 1) => `${CODE_CSI + n}d`,

  /**
   * Vertical position relative.
   */
  VPR: (n: number = 1) => `${CODE_CSI + n}e`,

  /**
   * Horizontal and vertical position. Same as CUP.
   */
  HVP: (l: number, c: number) => `${CODE_CSI + l};${c}f`,

  /**
   * Clear tab stops at current position (0) or all (3).
   */
  TBC: (n: number = 0) => `${CODE_CSI + n}g`,

  /**
   * Set various terminal modes.
   * - 2: Keyboard action Mode (KAM). Always no. (Not support)
   * - 4: Insert Mode (IRM).
   * - 12: Send/receive (SRM). Always off. (Not support)
   * - 20: Automatic Newline (LNM). Always off. (Not support)
   */
  SM: (n: number) => `${CODE_CSI + n}h`,

  /**
   * Set various terminal attribuets.
   * - 1: Application Cursor Keys (DECCKM).✓
   * - 2: Designate US-ASCII for character sets G0-G3 (DECANM).✓
   * - 3: 132 Column Mode (DECCOLM).✓
   * - 6: Origin Mode (DECOM).✓
   * - 7: Auto-wrap Mode (DECAWM).✓
   * - 8: Auto-repeat Keys (DECARM). Always on.✗
   * - 9: xterm mouse protocol.✓
   * - 12: Start Blinking Cursor.✓
   * - 25: Show Cursor (DECTCEM).✓
   * - 47: Use Alternate Screen Buffer.✓
   * - 66: Application keypad (DECNKM).✓
   * - 1000: X11 xterm mouse protocol.✓
   * - 1002: Use Cell Motion Mouse Tracking.✓
   * - 1003: Use All Motion Mouse Tracking.✓
   * - 1004: Send FocusIn/FocusOut events✓
   * - 1005: Enable UTF-8 Mouse Mode.✗
   * - 1006: Enable SGR Mouse Mode.✓
   * - 1015: Enable urxvt Mouse Mode.✗
   * - 1047: Use Alternate Screen Buffer.✓
   * - 1048: Save cursor as in DECSC.✓
   * - 1049: Save cursor and switch to alternate buffer clearing it.Partial
   * - 2004: Set bracketed paste mode.✓
   */
  DECSET: (n: number) => `${CODE_CSI}?${n}h`,

  /**
   * Set various terminal attributes.
   * - 2: Keyboard Action Mode (KAM). Always on.✗
   * - 4: Replace Mode (IRM). (default)✓
   * - 12: Send/receive (SRM). Always off.✗
   * - 20: Normal Linefeed (LNM). Always off.✗
   */
  RM: (n: number) => `${CODE_CSI + n}l`,

  /**
   * Reset various terminal attributes.
   *
   * Supported param values by DECRST:
   * - 1: Normal Cursor Keys (DECCKM).✓
   * - 2: Designate VT52 mode (DECANM).✗
   * - 3: 80 Column Mode (DECCOLM).Broken
   * - 6: Normal Cursor Mode (DECOM).✓
   * - 7: No Wraparound Mode (DECAWM).✓
   * - 8: No Auto-repeat Keys (DECARM).✗
   * - 9: Don’t send Mouse X & Y on button press.✓
   * - 12: Stop Blinking Cursor.✓
   * - 25: Hide Cursor (DECTCEM).✓
   * - 47: Use Normal Screen Buffer.✓
   * - 66: Numeric keypad (DECNKM).✓
   * - 1000: Don’t send Mouse reports.✓
   * - 1002: Don’t use Cell Motion Mouse Tracking.✓
   * - 1003: Don’t use All Motion Mouse Tracking.✓
   * - 1004: Don’t send FocusIn/FocusOut events.✓
   * - 1005: Disable UTF-8 Mouse Mode.✗
   * - 1006: Disable SGR Mouse Mode.✓
   * - 1015: Disable urxvt Mouse Mode.✗
   * - 1047: Use Normal Screen Buffer (clearing screen if in alt).✓
   * - 1048: Restore cursor as in DECRC.✓
   * - 1049: Use Normal Screen Buffer and restore cursor.✓
   * - 2004: Reset bracketed paste mode.✓
   */
  DECRST: (n: number) => `${CODE_CSI}?${n}l`,

  /**
   * Set/Reset various text attributes.
   */
  SGR: (n: number) => `${CODE_CSI + n}m`,

  /**
   * Request cursor position (CPR) with Ps = 6.
   */
  DSR: (n: number) => `${CODE_CSI + n}n`,

  /**
   * Only CPR is supported (same as DSR).
   */
  DECDSR: (n: number) => `${CODE_CSI}?${n}n`,

  /**
   * Reset several terminal attributes to initial state.
   */
  DECSTR: `${CODE_CSI}!p`,

  /**
   * Set cursor style.
   *
   * Supported cursor styles:
   * - empty, 0 or 1: steady block
   * - 2: blink block
   * - 3: steady underline
   * - 4: blink underline
   * - 5: steady bar
   * - 6: blink bar
   */
  DECSCUSR: (n: number = 0) => `${CODE_CSI + n + CODE_SP}q`,

  /**
   * Set top and bottom margins of the viewport [top;bottom] (default = viewport size).
   */
  DECSTBM: (l: number, n: number) => `${CODE_CSI + l};${l}r`,

  /**
   * Save cursor position, charmap and text attributes.
   */
  SCOSC: `${CODE_CSI}s`,

  /**
   * Restore cursor position, charmap and text attributes.
   */
  SCORC: `${CODE_CSI}u`,

  /**
   * Insert Ps columns at cursor position.
   */
  DECIC: (n: number) => `${CODE_CSI + n}'}`,

  /**
   * Delete Ps columns at cursor position.
   */
  DECDC: (n: number) => `${CODE_CSI + n}'~`,
}
