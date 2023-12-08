import highlight from '../highlight/highlight';
import { styledString } from '../Colors';
import { parseTimestamp } from '../../common/Util';

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

function wrapNull(v: any) {
  return v ? v : "";
}