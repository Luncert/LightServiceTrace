import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@suid/material";
import TablePagination from "../mgrui/lib/components/table/TablePagination";
import PageSizeSelector from "../mgrui/lib/components/table/PageSizeSelector";
import { conditionalValue, createData } from "../mgrui/lib/components/utils";
import { Filter, Filters  } from "../mgrui/lib/components/filters/Filters";
import { Index, Show, createResource } from "solid-js";
import getBackend from "../service/Backend";
import { t } from "i18next";
import { parseTimestamp } from "./common/Util";
import DataManagementTemplate from "../mgrui/lib/components/template/DataManagementTemplate";
import Field from "../mgrui/lib/components/Field";
import { buildFilterBy, createFilterStore } from "../mgrui/lib/components/filters/Functions";
import { FilterSettings } from "../mgrui/lib/components/filters/FilterSettings";

export default function LogExplorer() {
  const offset = createData(0);
  const pageSize = createData(10);
  
  const filterStore = createFilterStore({
    timestamp: {
      match: { operator: "between", value: [undefined, undefined] },
      columnControl: { visible: true },
      sort: { order: "desc", active: true }
    },
    host: { 
      match: { operator: "like", value: [undefined, undefined] },
      columnControl: { visible: true }
     },
    appName: {
      match: { operator: "like", value: [undefined, undefined] },
      columnControl: { visible: true }
    },
    processId: {
      match: { operator: "like", value: [undefined, undefined] },
      columnControl: { visible: true }
    },
    messageId: {
      match: { operator: "like", value: [undefined, undefined] },
      columnControl: { visible: true }
    },
    structuredData: {
      match: { operator: "like", value: [undefined, undefined] },
      columnControl: { visible: true }
    },
    message: {
      match: { operator: "like", value: [undefined, undefined] },
      columnControl: { visible: true }
    },
  });
  
  const [logs, logsAction] = createResource(
    () => getBackend().getLogs(''), // buildFilterBy(filterStore.accessor, offset(), pageSize())
    { initialValue: { pageable: {} } as Page<Log> }
  );

  return (
    <DataManagementTemplate disableInnerMargin
    headers={
      <Filters>
        <Filter id="timestamp-filter" type="date-range"
          label={t("model.log.timestamp")}
          onStartChange={(d) => filterStore.modifier.timestamp.match.value([d?.getTime(), filterStore.accessor.timestamp.match.value[1]])}
          onEndChange={(d) => filterStore.modifier.timestamp.match.value([filterStore.accessor.timestamp.match.value[0], d?.getTime()])} />
        <Filter id="host-filter" type="text"
          label={t("model.log.host")}
          onChange={filterStore.modifier.host.match.value}
        />
        <Filter id="appName-filter" type="text"
          label={t("model.log.appName")}
          onChange={filterStore.modifier.appName.match.value}
        />
        <Filter id="processId-filter" type="text"
          label={t("model.log.processId")}
          onChange={filterStore.modifier.processId.match.value}
        />
        <Filter id="messageId-filter" type="text"
          label={t("model.log.messageId")}
          onChange={filterStore.modifier.messageId.match.value}
        />
        <Filter id="structuredData-filter" type="text"
          label={t("model.log.structuredData")}
          onChange={filterStore.modifier.structuredData.match.value}
        />
        <Filter id="message-filter" type="text"
          label={t("model.log.message")}
          onChange={filterStore.modifier.message.match.value}
        />
        <Button variant="contained" onClick={logsAction.refetch}>{t("labels.filter")}</Button>
        <FilterSettings store={filterStore} enableColumnControl />
      </Filters>
    }>
      <div class="flex p-2">
        <div class="flex ml-auto gap-2">
          <Field label={t("labels.total")} value={logs().totalElements} />
          <TablePagination
            count={logs().totalElements}
            rowsPerPage={pageSize()}
            onPageChange={(page, recordOffset) => {
              offset(recordOffset);
              logsAction.refetch();
            }}
            style={{"margin-left": "auto"}} />
          <PageSizeSelector onChange={(size) => {
            pageSize(size);
            logsAction.refetch();
          }} />
        </div>
      </div>
      <TableContainer class="custom-scrollbar" component={Paper}>
        <Table class="w-full table-fixed break-all" aria-label="user-list" stickyHeader>
          <TableHead>
            <TableRow>
              <Show when={filterStore.accessor.timestamp.columnControl?.visible}>
                <TableCell align="center" class="w-56">{t("model.log.timestamp")}</TableCell>
              </Show>
              <Show when={filterStore.accessor.host.columnControl?.visible}>
                <TableCell align="center">{t("model.log.host")}</TableCell>
              </Show>
              <Show when={filterStore.accessor.appName.columnControl?.visible}>
                <TableCell align="center">{t("model.log.appName")}</TableCell>
              </Show>
              <Show when={filterStore.accessor.processId.columnControl?.visible}>
                <TableCell align="center">{t("model.log.processId")}</TableCell>
              </Show>
              <Show when={filterStore.accessor.messageId.columnControl?.visible}>
                <TableCell align="center">{t("model.log.messageId")}</TableCell>
              </Show>
              <Show when={filterStore.accessor.structuredData.columnControl?.visible}>
                <TableCell align="center">{t("model.log.structuredData")}</TableCell>
              </Show>
              <Show when={filterStore.accessor.message.columnControl?.visible}>
                <TableCell align="center">{t("model.log.message")}</TableCell>
              </Show>
            </TableRow>
          </TableHead>
          <TableBody>
            <Index each={logs().content}>{(log, idx) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">{parseTimestamp(log().timestamp)}</TableCell>
                <TableCell align="center">{log().host}</TableCell>
                <TableCell align="center">{log().appName}</TableCell>
                <TableCell align="center">{log().processId}</TableCell>
                <TableCell align="center">{log().messageId}</TableCell>
                <TableCell align="center">{log().structuredData}</TableCell>
                <TableCell align="center">{log().message}</TableCell>
              </TableRow>
            )}
            </Index>
          </TableBody>
        </Table>
      </TableContainer>
    </DataManagementTemplate>
  )
}