import { parseTimestamp } from "./common/Util";
import { Mod, styledString } from "./xterm/Colors";
import highlight from "./xterm/highlight/highlight";
import Sandbox from 'websandbox';

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

type SyslogPrinter = (log: Syslog, printSource?: boolean, custsomParameter?: string) => Promise<string>;

interface LoggingFormatter {
  accept(log: Syslog, customParameter?: string): Promise<boolean>;
  format(log: Syslog): Promise<string>;
}

const defaultLogFormatter: LoggingFormatter = {
  accept: async () => true,
  format: async (log: Syslog) => {
    const r: string[] = [];
    r.push(Levels[log.level]);
    r.push(parseTimestamp(log.timestamp));
  
    if (log.message.length > 0) {
      r.push(log.message);
    }
    return r.join(' ');
  }
}

export function validateLoggingFormat(format: string): Promise<string | true> {
  // TODO: use antlr to generate validator
  return new Promise((resolve) => {resolve(true)})
}

export function createPrinter(loggingFormatScript?: string, loggingColorSchema?: string): SyslogPrinter {
  // if (loggingColorSchema) {
  //   loadGoghColorSchema(loggingColorSchema);
  // }
  
  if (!loggingFormatScript) {
    return createPrinterFromFormatter(defaultLogFormatter);
  }

  let container = document.getElementById("websandbox-iframe");
  if (container === null) {
    container = document.createElement("iframe");
    container.style.display = 'none';
    document.body.appendChild(container);
    // FIXME: clean this element?
  }

  const sandbox = Sandbox.create({}, { frameContainer: container });
  const userFormatter = sandbox.promise
    .then(() => {
        console.log('Sandbox is created. Trying to run code inside');
        return sandbox.run(loggingFormatScript);
    });

  return createPrinterFromFormatter({
    accept: (log: Syslog, customParameter?: string) => {
      return userFormatter.then(() => {
        return sandbox.connection.remote.accept(log, customParameter);
      });
    },
    format: async (log: Syslog) => {
      return userFormatter.then(() => {
        return sandbox.connection.remote.format(log);
      }).catch((e) => {
        console.error("failed to call formatter script", e);
        return ;
      })
    }
  });
}

let prevLoggedSource: string | null = null;
const loggingSourceMapping = new Map<string, {id: number, color: string}>();

export function clearCache() {
  loggingSourceMapping.clear();
  prevLoggedSource = null;
}

function createPrinterFromFormatter(formatter: LoggingFormatter): SyslogPrinter {
  return async (log: Syslog, printSource?: boolean, custsomParameter?: string) => {
    let raw = '';
    if (printSource) {
      const source = log.facility + log.host + log.procId;
      if (source !== prevLoggedSource) {
        prevLoggedSource = source;
        if (!loggingSourceMapping.has(source)) {
          const id = loggingSourceMapping.size;
          loggingSourceMapping.set(source, {id, color: getRandomColor(id)})
        }
        const data = loggingSourceMapping.get(source);
        raw += styledString(" ", undefined, data?.color) + " ";
        const facility = log.facility >= 16 ? `local${log.facility - 16}` : FacilityCodes[log.facility];
        raw += styledString("facility: ", "#3f3f3f", undefined, Mod.Italic) + styledString(facility, "#53c44d", undefined, Mod.Italic)
          + styledString(" host: ", "#3f3f3f", undefined, Mod.Italic) + styledString(wrapNull(log.host), "#53c44d", undefined, Mod.Italic)
          + styledString(" procId: ", "#3f3f3f", undefined, Mod.Italic) + styledString(wrapNull(log.procId), "#53c44d", undefined, Mod.Italic)
          + "\n";
        raw += styledString(" ", undefined, data?.color) + " ";
      } else {
        const data = loggingSourceMapping.get(source);
        raw += styledString(" ", undefined, data?.color) + " ";
      }
    }

    return formatter.accept(log, custsomParameter)
      .then((accepted) => {
        if (accepted) {
          return formatter.format(log)
            .then(highlight)
            .then(formatted => {
              formatted = raw + formatted;
              if (!formatted.endsWith('\n')) {
                formatted += '\n';
              }
              return formatted;
            });
        }
        return '';
      })
  };
}

const letters = "89ABCDEF";
function getRandomColor(seed: number) {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)];
  }
  return color;
}

function wrapNull(v: any) {
  return v ? v : "null";
}