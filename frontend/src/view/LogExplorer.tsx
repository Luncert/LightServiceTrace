import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@suid/material";
import TablePagination from "../mgrui/lib/components/table/TablePagination";
import PageSizeSelector from "../mgrui/lib/components/table/PageSizeSelector";
import { createData } from "../mgrui/lib/components/utils";
import { Filter, Filters  } from "../mgrui/lib/components/filters/Filters";
import { Index, createResource } from "solid-js";
import getBackend from "../service/Backend";
import { t } from "i18next";
import { parseTimestamp } from "./common/Util";
import DataManagementTemplate from "../mgrui/lib/components/template/DataManagementTemplate";
import Field from "../mgrui/lib/components/Field";
import { buildFilterBy, createFilterStore } from "../mgrui/lib/components/filters/Functions";
import { FilterSettings } from "../mgrui/lib/components/filters/FilterSettings";
import ColumnControl from "../mgrui/lib/components/filters/ColumnControl";
import { useBackdrop } from "../mgrui/lib/components/BackdropWrapper";

export default function LogExplorer() {
  const backdrop = useBackdrop();
  const offset = createData(0);
  const pageSize = createData(10);
  
  const filterStore = createFilterStore({
    timestamp: {
      match: { operator: "between", value: [undefined, undefined] },
      columnControl: { visible: true },
      sort: { order: "desc", active: true }
    },
    host: { 
      match: { operator: "like", value: '' },
      columnControl: { visible: true }
    },
    appName: {
      match: { operator: "like", value: '' },
      columnControl: { visible: false }
    },
    processId: {
      match: { operator: "like", value: '' },
      columnControl: { visible: false }
    },
    messageId: {
      match: { operator: "like", value: '' },
      columnControl: { visible: false }
    },
    structuredData: {
      match: { operator: "like", value: '' },
      columnControl: { visible: true }
    },
    message: {
      match: { operator: "like", value: '' },
      columnControl: { visible: true }
    },
  });
  
  const [logs, logsAction] = createResource(
    async () => {
      const t = setTimeout(() => backdrop.loading(true), 10);
      return getBackend().getLogs(buildFilterBy(filterStore, offset(), pageSize()))
        .finally(() => {
          clearTimeout(t);
          backdrop.loading(false);
        });
    },
    { initialValue: { pageable: {} } as Page<Log> }
  );

  return (
    <DataManagementTemplate disableInnerMargin
    headers={
      <Filters>
        <Filter id="timestamp-filter" type="date-range"
          label={t("model.log.timestamp")}
          onStartChange={filterStore.timestamp}
          onEndChange={filterStore.timestamp} />
        <Filter id="host-filter" type="text"
          label={t("model.log.host")}
          onChange={filterStore.host}
        />
        <Filter id="appName-filter" type="text"
          label={t("model.log.appName")}
          onChange={filterStore.appName}
        />
        <Filter id="processId-filter" type="text"
          label={t("model.log.processId")}
          onChange={filterStore.processId}
        />
        <Filter id="messageId-filter" type="text"
          label={t("model.log.messageId")}
          onChange={filterStore.messageId}
        />
        <Filter id="structuredData-filter" type="text"
          label={t("model.log.structuredData")}
          onChange={filterStore.structuredData}
        />
        <Filter id="message-filter" type="text"
          label={t("model.log.message")}
          onChange={filterStore.message}
        />
        <Button variant="contained" onClick={logsAction.refetch}>{t("labels.filter")}</Button>
        <FilterSettings store={filterStore} enableSorts enableColumnControl />
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
              <ColumnControl attr={filterStore.timestamp}>
                <TableCell align="center" class="w-56">{t("model.log.timestamp")}</TableCell>
              </ColumnControl>
              <ColumnControl attr={filterStore.host}>
                <TableCell align="center">{t("model.log.host")}</TableCell>
              </ColumnControl>
              <ColumnControl attr={filterStore.appName}>
                <TableCell align="center">{t("model.log.appName")}</TableCell>
              </ColumnControl>
              <ColumnControl attr={filterStore.processId}>
                <TableCell align="center">{t("model.log.processId")}</TableCell>
              </ColumnControl>
              <ColumnControl attr={filterStore.messageId}>
                <TableCell align="center">{t("model.log.messageId")}</TableCell>
              </ColumnControl>
              <ColumnControl attr={filterStore.structuredData}>
                <TableCell align="center">{t("model.log.structuredData")}</TableCell>
              </ColumnControl>
              <ColumnControl attr={filterStore.message}>
                <TableCell align="center">{t("model.log.message")}</TableCell>
              </ColumnControl>
            </TableRow>
          </TableHead>
          <TableBody>
            <Index each={logs().content}>{(log, idx) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <ColumnControl attr={filterStore.timestamp}>
                  <TableCell align="center" component="th" scope="row">{parseTimestamp(log().timestamp)}</TableCell>
                </ColumnControl>
                <ColumnControl attr={filterStore.host}>
                  <TableCell align="center">{log().host}</TableCell>
                </ColumnControl>
                <ColumnControl attr={filterStore.appName}>
                  <TableCell align="center">{log().appName}</TableCell>
                </ColumnControl>
                <ColumnControl attr={filterStore.processId}>
                  <TableCell align="center">{log().processId}</TableCell>
                </ColumnControl>
                <ColumnControl attr={filterStore.messageId}>
                  <TableCell align="center">{log().messageId}</TableCell>
                </ColumnControl>
                <ColumnControl attr={filterStore.structuredData}>
                  <TableCell align="center">{log().structuredData}</TableCell>
                </ColumnControl>
                <ColumnControl attr={filterStore.message}>
                  <TableCell align="center">{log().message}</TableCell>
                </ColumnControl>
              </TableRow>
            )}
            </Index>
          </TableBody>
        </Table>
      </TableContainer>
    </DataManagementTemplate>
  )
}