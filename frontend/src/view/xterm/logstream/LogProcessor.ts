import highlight from '../highlight/highlight';
import { styledString } from '../Colors';

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

export default async function processLog(
  data: string,
  output: (s: string) => void,
) {
  // eslint-disable-next-line no-restricted-syntax
  for (const raw of data.split('\n')) {
    if (!raw) {
      continue;
    }

    const log = JSON.parse(raw) as Syslog;

    const facility = log.facility >= 16 ? `local${log.facility - 16}` : FacilityCodes[log.facility];
    output(styledString(`${facility}[${wrapNull(log.host)}/${wrapNull(log.procId)}]`,
      'white', '#2196f3') + ' ');

    const toBePrint: string[] = [];
    toBePrint.push(Levels[log.level]);
    toBePrint.push(parseTimestamp(log.timestamp));

    let { message } = log;
    if (message.length > 0) {
      toBePrint.push(message);
    }

    await highlight(toBePrint.join(' ') + '\n', output);
  }
}

export function parseTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  return `${wrapDateNumber(date.getFullYear())}-${wrapDateNumber(date.getMonth() + 1)}-${wrapDateNumber(date.getDate())}T${wrapDateNumber(date.getHours())}:${wrapDateNumber(date.getMinutes())}:${wrapDateNumber(date.getSeconds())}.${wrapDateNumber(date.getMilliseconds(), 3)}`;
}

function wrapDateNumber(v: number, bits: number = 2) {
  if (v == 0) {
    return '0'.repeat(bits);
  }
  
  let n = v;
  while (n > 0) {
    n = Math.floor(n / 10);
    bits--;
  }
  return bits > 0 ? '0'.repeat(bits) + v : v;
}


function wrapNull(v: any) {
  return v ? v : "";
}