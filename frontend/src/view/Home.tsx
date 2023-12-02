import { Avatar, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@suid/material";
import { Notification } from "../mgrui/lib/components/NotificationWrapper";
import { createData, names } from "../mgrui/lib/components/utils";
import logo from '../logo.svg';
import DataManagementTemplate from "./common/DataManagementTemplate";
import { Filter, Filters, buildFilterBy, createFilterStore } from "../mgrui/lib/components/Filters";
import { Index, createResource } from "solid-js";
import { t } from "i18next";
import { BackdropWrapper } from "../mgrui/lib/components/BackdropWrapper";
import TablePagination from "../mgrui/lib/components/table/TablePagination";
import PageSizeSelector from "../mgrui/lib/components/table/PageSizeSelector";
import { FaSolidAngleRight } from "solid-icons/fa";
import getBackend from "../service/Backend";
import HomeSidebar from "./HomeSidebar";
import config from '../config';

export default function Home() {
  const offset = createData(0);
  const pageSize = createData(10);
  const activeContent = createData(config.defaultMenu);
  
  const [filters, filterActions] = createFilterStore({
    createdAt: { operator: "between", value: [undefined, undefined] },
  });
  
  const [logs, logsAction] = createResource(
    () => getBackend().getLogs(buildFilterBy(filters, offset(), pageSize())),
    { initialValue: { pageable: {} } as Page<Log> }
  );
  
  return (
    <Notification>
      <BackdropWrapper>
        <Paper square class="flex flex-col w-full h-full">
          <div class="flex w-full h-10 shrink-0 items-center p-3 gap-2">
            <Avatar alt="Yan Puppy Logo" src={logo} 
              sx={{
                width: 24,
                height: 24,
              }} />
              
            <span class='font-bold text-shadow'>Light Service Trace</span>
          </div>
          <div class="flex flex-nowrap w-full" style={{ height: "calc(100% - 40px)"}}>
            <HomeSidebar onSelected={(name) => activeContent(name)}/>
            <div class={names("relative box-border h-full grow")}>
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
            </div>
          </div>
        </Paper>
      </BackdropWrapper>
    </Notification>
  )
}

export function parseTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  return `${wrapDateNumber(date.getFullYear())}-${wrapDateNumber(date.getMonth() + 1)}-${wrapDateNumber(date.getDate())} ${wrapDateNumber(date.getHours())}:${wrapDateNumber(date.getMinutes())}:${wrapDateNumber(date.getSeconds())}.${wrapDateNumber(date.getMilliseconds(), 3)}`;
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
