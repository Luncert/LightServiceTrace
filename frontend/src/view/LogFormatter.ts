import { parseTimestamp } from "./common/Util";
import { styledString } from "./xterm/Colors";
import highlight, { loadGoghColorSchema } from "./xterm/highlight/highlight";
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
  if (loggingColorSchema) {
    loadGoghColorSchema(loggingColorSchema);
  }
  
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

function createPrinterFromFormatter(formatter: LoggingFormatter): SyslogPrinter {
  return async (log: Syslog, printSource?: boolean, custsomParameter?: string) => {
    let raw = '';
    if (printSource) {
      const facility = log.facility >= 16 ? `local${log.facility - 16}` : FacilityCodes[log.facility];
      raw += styledString(`${facility}[${wrapNull(log.host)}/${wrapNull(log.procId)}]`,
        'white', '#2196f3') + ' ';
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

function wrapNull(v: any) {
  return v ? v : "";
}