import { Button, useTheme } from "@suid/material";
import { createData, names } from "../mgrui/lib/components/utils";
import { onCleanup, onMount } from "solid-js";
import Xterm from "./xterm/Xterm";
import getBackend, { StreamConnection } from "../service/Backend";
import { t } from "i18next";
import { Filter, Filters, createFilterStore } from "../mgrui/lib/components/Filters";
import { styledString } from "./xterm/Colors";
import { parseTimestamp } from "./common/Util";
import highlight from "./xterm/highlight/highlight";
import DataManagementTemplate from "../mgrui/lib/components/template/DataManagementTemplate";

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

async function writeLog(term: Xterm, log: Syslog, printSource: boolean) {
  if (printSource) {
    const facility = log.facility >= 16 ? `local${log.facility - 16}` : FacilityCodes[log.facility];
    term.write(styledString(`${facility}[${wrapNull(log.host)}/${wrapNull(log.procId)}]`,
      'white', '#2196f3') + ' ');
  }

  const toBePrint: string[] = [];
  toBePrint.push(Levels[log.level]);
  toBePrint.push(parseTimestamp(log.timestamp));

  let { message } = log;
  if (message.length > 0) {
    toBePrint.push(message);
  }

  await highlight(toBePrint.join(' ') + '\n', s => term.write(s));
}

function wrapNull(v: any) {
  return v ? v : "";
}

export default function LogStreaming() {
  const theme = useTheme();

  const term = new Xterm();
  let ref: HTMLDivElement;
  let conn: StreamConnection;

  const connected = createData(false);
  const showSource = createData(false);
  const [filters, filterActions] = createFilterStore({
    host: { operator: "like", value: "" },
    appName: { operator: "like", value: "" },
    processId: { operator: "like", value: "" },
  });

  const onClick = () => {
    if (connected()) {
      conn.close();
    } else {
      conn = getBackend().streaming(term, log => writeLog(term, log, showSource()));
    }
    connected(!connected());
  }

  onMount(() => {
    term.attach(ref);
  })

  onCleanup(() => {
    term.dettach();
  })

  return (
    <DataManagementTemplate
      headers={
      <Filters>
        <Filter id="show-source-switch" type="switch"
          label={showSource() ? t("labels.showSourceSwitch") : t("labels.hideSourceSwitch")}
          onChange={(value) => showSource(value)}
          labelPlacement="start"
          disabled={connected()}
        />
        <Filter id="host-filter" type="text"
          label={t("model.log.host")}
          onChange={filterActions.host}
          disabled={connected()}
        />
        <Filter id="appName-filter" type="text"
          label={t("model.log.appName")}
          onChange={filterActions.appName}
          disabled={connected()}
        />
        <Filter id="processId-filter" type="text"
          label={t("model.log.processId")}
          onChange={filterActions.processId}
          disabled={connected()}
        />
        <Button variant="contained"
          onClick={() => onClick()}>
          {t(connected() ? "labels.disconnect" : "labels.connect")}
        </Button>
      </Filters>
      }
    >
      <div class={names("box-border w-full h-full", theme.palette.mode === 'light' ? "bg-zinc-300" : "bg-zinc-700")}>
        <div ref={el => ref = el} class={names("relative flex flex-col w-full h-full flex-nowrap rounded-md overflow-hidden",
          theme.palette.mode === 'light' ? "light bg-zinc-100" : "dark bg-terminal-dark")}>
        </div>
      </div>
    </DataManagementTemplate>
  )
}