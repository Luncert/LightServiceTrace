import { Button, useTheme } from "@suid/material";
import { conditionalValue, bucket, names } from "../mgrui/lib/components/utils";
import { Show, createMemo, onCleanup, onMount } from "solid-js";
import Xterm from "./xterm/Xterm";
import getBackend, { StreamConnection } from "../service/Backend";
import { t } from "i18next";
import DataManagementTemplate from "../mgrui/lib/components/template/DataManagementTemplate";
import { Filter, Filters } from "../mgrui/lib/components/filters/Filters";
import { buildFilterBy, createFilterStore } from "../mgrui/lib/components/filters/Functions";
import { useApp } from "./App";
import { clearCache, createPrinter } from "./LogFormatter";
import LogStreamingSearchBar from "./LogStreamingSearchBar";

export default function LogStreaming() {
  const theme = useTheme();
  const app = useApp();

  const term = new Xterm();
  let ref: HTMLDivElement;
  let conn: StreamConnection;

  const showSearchBar = bucket(false);
  const connected = bucket(false);
  const filterStore = createFilterStore({
    host: { match: { operator: "like", value: "" } },
    appName: { match: { operator: "like", value: "" } },
    processId: { match: { operator: "like", value: "" } },
  });
  const customFilter = bucket('');

  const printer = createMemo(() => {
    return createPrinter(conditionalValue(app.enableCustomLoggingFormatter(), app.loggingFormatScript()), app.loggingColorSchema());
  });

  const onClick = () => {
    if (connected()) {
      conn.close();
    } else {
      conn = getBackend().streaming(buildFilterBy(filterStore),
        term, log => printer()(log, true, conditionalValue(app.enableCustomFilter(), customFilter()))
        .then(s => term.write(s)));
    }
    connected(!connected());
  }

  onMount(() => {
    term.attach(ref);
    term.on('key', (key, evt) => {
      if (evt.ctrlKey && evt.key === 'f') {
        showSearchBar(true);
      }
    })
  })

  onCleanup(() => {
    if (connected()) {
      conn.close();
    }
    term.dettach(ref);
  })

  return (
    <DataManagementTemplate
      disableOuterMargin disableInnerMargin
      headers={
      <Filters>
        <Filter id="streaming-host-filter" type="text"
          label={t("model.log.host")}
          onChange={filterStore.host}
          disabled={connected()}
        />
        <Filter id="streaming-appName-filter" type="text"
          label={t("model.log.appName")}
          onChange={filterStore.appName}
          disabled={connected()}
        />
        <Filter id="streaming-processId-filter" type="text"
          label={t("model.log.processId")}
          onChange={filterStore.processId}
          disabled={connected()}
        />
        <Show when={app.enableCustomFilter()}>
          <Filter id="streaming-custom-filter" type="text"
            label={t("streaming.customFilter")}
            onChange={customFilter}
            disabled={connected()}
          />
        </Show>
        <Button variant="contained"
          onClick={() => onClick()}>
          {t(connected() ? "labels.disconnect" : "labels.connect")}
        </Button>
        <Button variant="contained" color="warning"
          onClick={() => {
            term.clear();
            clearCache();
          }}>
          {t("labels.clear")}
        </Button>
      </Filters>
      }
    >
      <div class={names("box-border w-full h-full", theme.palette.mode === 'light' ? "bg-zinc-300" : "bg-zinc-700")}>
        <div ref={el => ref = el} class={names("relative w-full h-full overflow-hidden",
          theme.palette.mode === 'light' ? "light bg-zinc-100" : "dark bg-terminal-dark")}>
        </div>
        <Show when={showSearchBar()}>
          <LogStreamingSearchBar
            findNext={(text: string) =>
              term.findNext(text, { caseSensitive: false })
            }
            findPrevious={(text: string) =>
              term.findPrevious(text, { caseSensitive: false })
            }
            onClose={() => showSearchBar(false)}/>
        </Show>
      </div>
    </DataManagementTemplate>
  )
}