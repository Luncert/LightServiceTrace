import { Button, useTheme } from "@suid/material";
import { createData, names } from "../mgrui/lib/components/utils";
import { createMemo, onCleanup, onMount } from "solid-js";
import Xterm from "./xterm/Xterm";
import getBackend, { StreamConnection } from "../service/Backend";
import { t } from "i18next";
import { styledString } from "./xterm/Colors";
import { parseTimestamp } from "./common/Util";
import highlight from "./xterm/highlight/highlight";
import DataManagementTemplate from "../mgrui/lib/components/template/DataManagementTemplate";
import { Filter, Filters } from "../mgrui/lib/components/filters/Filters";
import { buildFilterBy, createFilterStore } from "../mgrui/lib/components/filters/Functions";
import { AppContextDef, useApp } from "./App";

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

function createFormatter(format: string) {
  return (log: Syslog) => {
    try {
      const r = [];
      const msg = JSON.parse(log.message) as LogbackMessage;
      r.push(msg.type?.toUpperCase());
      r.push(msg.level);
      r.push(msg.written_at);
      r.push(msg.logger);
      r.push('[' + msg.thread + ']');
  
      r.push(msg.msg);
      return r.join(' ');
    } catch (e) {
      return defaultLogFormatter(log);
    }
  }
}

function writeLog(log: Syslog, formatter: SyslogFormatter, printSource: boolean) {
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
}

function wrapNull(v: any) {
  return v ? v : "";
}

export default function LogStreaming() {
  const theme = useTheme();
  const app = useApp();

  const term = new Xterm();
  let ref: HTMLDivElement;
  let conn: StreamConnection;

  const connected = createData(false);
  const showSource = createData(false);
  const filterStore = createFilterStore({
    host: { match: { operator: "like", value: "" } },
    appName: { match: { operator: "like", value: "" } },
    processId: { match: { operator: "like", value: "" } },
  });

  const formatter = createMemo(() => {
    if (app.deserializeJsonMessage()) {
      return createFormatter(app.loggingFormat());
    }
    return defaultLogFormatter;
  });

  const onClick = () => {
    if (connected()) {
      conn.close();
    } else {
      conn = getBackend().streaming(buildFilterBy(filterStore),
        term, log => writeLog(log, formatter(), showSource())
          .then(s => term.write(s)));
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
    <DataManagementTemplate disableInnerMargin
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
          onChange={filterStore.host}
          disabled={connected()}
        />
        <Filter id="appName-filter" type="text"
          label={t("model.log.appName")}
          onChange={filterStore.appName}
          disabled={connected()}
        />
        <Filter id="processId-filter" type="text"
          label={t("model.log.processId")}
          onChange={filterStore.processId}
          disabled={connected()}
        />
        <Button variant="contained"
          onClick={() => onClick()}>
          {t(connected() ? "labels.disconnect" : "labels.connect")}
        </Button>
        <Button variant="contained" color="warning"
          onClick={() => term.clear()}>
          {t("labels.clear")}
        </Button>
      </Filters>
      }
    >
      <div class={names("box-border w-full h-full", theme.palette.mode === 'light' ? "bg-zinc-300" : "bg-zinc-700")}>
        <div ref={el => ref = el} class={names("relative flex flex-col w-full h-full flex-nowrap overflow-hidden",
          theme.palette.mode === 'light' ? "light bg-zinc-100" : "dark bg-terminal-dark")}>
        </div>
      </div>
    </DataManagementTemplate>
  )
}