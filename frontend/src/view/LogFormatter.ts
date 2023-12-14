import { parseTimestamp } from "./common/Util";
import { styledString } from "./xterm/Colors";
import highlight from "./xterm/highlight/highlight";

const Levels = [
  "EMERGENCY",
  "ALERT",
  "CRITICAL",
  "ERROR",
  "WARNING",
  "NOTICE",
  "INFO",
  "DEBUG",
];

const FacilityCodes = [
  "kern",
  "user",
  "mail",
  "daemon",
  "auth",
  "syslog",
  "lpr",
  "news",
  "uucp",
  "cron",
  "authpriv",
  "ftp",
  "ntp",
  "security",
  "console",
  "solaris-cron"
  // 16–23 local0 – local7 Locally used facilities
];

type SyslogPrinter = (log: Syslog, printSource?: boolean) => Promise<string>;

type SyslogFormatter = (log: Syslog) => string;

const defaultLogFormatter = (log: Syslog) => {
  const r = [];
  r.push(Levels[log.level]);
  r.push(parseTimestamp(log.timestamp));

  if (log.message.length > 0) {
    r.push(log.message);
  }
  return r.join(' ');
}

export function validateLoggingFormat(format: string): Promise<string | true> {
  // TODO: use antlr to generate validator
  return new Promise((resolve) => {resolve(true)})
}

export function createPrinter(format?: string): SyslogPrinter {
  if (!format) {
    return createPrinterFromFormatter(defaultLogFormatter);
  }

  let resolveReference = false;
  let pattern = '';
  let prev = '';
  const patterns: (SyslogFormatter | string)[] = [];
  for (let c of format) {
    if (resolveReference) {
      if (c === '}') {
        const paths = pattern.split(".");
        pattern = '';

        patterns.push((log) => {
          let obj: any = log;
          for (let path of paths) {
            if (path in obj) {
              obj = obj[path];
            } else {
              console.error(`invalid reference ${paths.join('.')}, source: ${log}`)
              return '';
            }
          }
          return obj;
        });
        resolveReference = false;
      } else {
        pattern += c;
      }
    } else if (c === '{' && prev !== '\\') {
      resolveReference = true;

      patterns.push(pattern);
      pattern = '';
    } else {
      pattern += c;
    }
  }
  if (pattern) {
    patterns.push(pattern);
  }

  const formatter = (log: Syslog) => {
    return patterns.map((p) => typeof(p) === 'string' ? p : p(log)).join('');
  }

  return createPrinterFromFormatter(formatter);
}

function createPrinterFromFormatter(formatter: SyslogFormatter): SyslogPrinter {
  return (log: Syslog, printSource?: boolean) => {
    let raw = '';
    if (printSource) {
      const facility = log.facility >= 16 ? `local${log.facility - 16}` : FacilityCodes[log.facility];
      raw += styledString(`${facility}[${wrapNull(log.host)}/${wrapNull(log.procId)}]`,
        'white', '#2196f3') + ' ';
    }

    raw += formatter(log);

    if (!raw.endsWith('\n')) {
      raw += '\n';
    }

    return highlight(raw);
  };
}

function wrapNull(v: any) {
  return v ? v : "";
}