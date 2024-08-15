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
    // let log = {
    //   "facility": 1,
    //   "level": 6,
    //   "version": 0,
    //   "timestamp": 1723693507985,
    //   "host": "selfbilling-paas-eu10.selfbilling-dev-eu10.selfbilling-deviation-service-01915403-adc7-4640-4e1f-96f3b0cdf",
    //   "appName": null,
    //   "procId": null,
    //   "msgId": null,
    //   "structuredData": null,
    //   "message": "2024-08-15 03:37:46,441 INFO  [org.springframework.kafka.KafkaListenerEndpointContainer#2-0-C-1] - [com.sap.cf.sales.self.billing.service.deviation.infrastructure.messaging.SbcLifecycleEventInHandler] [tenant_id=4fbf2d91-eb06-463e-9e0e-df7ef0ed3a55, component_id=c6a56bf7-1dbf-4858-9000-f9fa2247e55b, component_name=selfbilling-deviation-service-01915403-adc7-4640-4e1f-96f3b0cdf3f4, organization_name=selfbilling-paas-eu10, component_type=application, space_name=selfbilling-dev-eu10, component_instance=0, organization_id=37b90951-2e2d-40af-9055-249fe90d05d9, correlation_id=lukas.li@sap.com|1723693058, space_id=9f386d19-3ab4-4ce8-b961-f456dde1cc0a, container_id=10.36.196.17, tenant_subdomain=sbi-allfeatures-qkk] - dispatch event SIMULATION_COMPLETED from SBWAP\n"
    // }
    // printer()(log, true, conditionalValue(app.enableCustomFilter(), customFilter())).then(s => term.write(s))
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