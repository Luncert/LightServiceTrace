import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@suid/material";
import TablePagination from "../mgrui/lib/components/table/TablePagination";
import PageSizeSelector from "../mgrui/lib/components/table/PageSizeSelector";
import { createData } from "../mgrui/lib/components/utils";
import { Filter, Filters, buildFilterBy, createFilterStore } from "../mgrui/lib/components/Filters";
import { Index, createResource } from "solid-js";
import getBackend from "../service/Backend";
import DataManagementTemplate from "./common/DataManagementTemplate";
import { t } from "i18next";

export default function LogExplorer() {
  const offset = createData(0);
  const pageSize = createData(10);
  
  const [filters, filterActions] = createFilterStore({
    createdAt: { operator: "between", value: [undefined, undefined] },
  });
  
  const [logs, logsAction] = createResource(
    () => getBackend().getLogs(buildFilterBy(filters, offset(), pageSize())),
    { initialValue: { pageable: {} } as Page<Log> }
  );

  return (
    <DataManagementTemplate title={t('title')}
    headers={
      <Filters onApply={logsAction.refetch}>
        <Filter id="order-created-at-filter" type="date-range"
          label={t("model.log.timestamp")}
          onStartChange={(d) => filterActions.createdAt([d?.getTime(), filters.createdAt.value[1]])}
          onEndChange={(d) => filterActions.createdAt([filters.createdAt.value[0], d?.getTime()])} />
      </Filters>
    }>
      <div class="flex p-2">
        <div class="flex ml-auto gap-2">
          <TablePagination
            count={logs()?.totalElements || 100}
            rowsPerPage={logs()?.pageable?.pageSize || 10}
            onPageChange={logsAction.refetch}
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
              <TableCell align="center">{t("model.log.id")}</TableCell>
              <TableCell align="center">{t("model.log.timestamp")}</TableCell>
              <TableCell align="center">{t("model.log.host")}</TableCell>
              <TableCell align="center">{t("model.log.appName")}</TableCell>
              <TableCell align="center">{t("model.log.processId")}</TableCell>
              <TableCell align="center">{t("model.log.messageId")}</TableCell>
              <TableCell align="center">{t("model.log.structuredData")}</TableCell>
              <TableCell align="center">{t("model.log.message")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Index each={logs().content}>{(log, idx) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">{log().id}</TableCell>
                <TableCell align="center">{log().timestamp}</TableCell>
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