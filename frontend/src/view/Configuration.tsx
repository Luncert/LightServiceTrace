import { FormControlLabel, Switch as MuiSwitch, Stack, TextField, Button, Box, Divider, Checkbox, Typography, Grid, IconButton, Popover } from "@suid/material";
import { Tab, Tabs } from "../mgrui/lib/components/navigation/Tabs";
import { For, Match, Switch } from "solid-js";
import { t } from "i18next";
import { createData } from "../mgrui/lib/components/utils";
import { useApp } from "./App";
import { FiDownload, FiUpload } from 'solid-icons/fi';
import { BiRegularReset } from 'solid-icons/bi';

export default function Configuration() {
  const activeContent = createData('');

  return (
    <div class="flex flex-col border-box w-full h-full p-5 overflow-hidden">
      <Tabs value="streaming" onChangeTab={activeContent}>
        <Tab label="general">General</Tab>
        <Tab label="streaming">Streaming</Tab>
      </Tabs>
      <Box class="border-box custom-scrollbar p-2 overflow-x-hidden overflow-y-auto">
        <Switch>
          <Match when={activeContent() === 'general'}>
            <GeneralConfig />
          </Match>
          <Match when={activeContent() === 'streaming'}>
            <StreamingConfig />
          </Match>
        </Switch>
      </Box>
    </div>
  )
}

function GeneralConfig() {
  const app = useApp();

  const onImport = (inputElem: HTMLInputElement) => {
    if (inputElem.files) {
      const file = inputElem.files[0];
      file.text().then(raw => app.import(raw));
    }
  };
  
  const onExport = () => {
    const element = document.createElement("a");
    element.setAttribute('href', 'data:application/json;charset=utf-8,'
      + encodeURIComponent(app.export()));
    element.setAttribute('download', "LightServiceTraceConfig.json");
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();

    document.body.removeChild(element);
  };

  return (
    <Stack class="gap-2" direction="column">
      <Stack class="gap-2 items-center" direction="row">
        <Typography class="inline-block">{t("configuration.general.sync")}</Typography>
        <label for="import-configuration-input">
          <input
            class="hidden"
            id="import-configuration-input"
            accept="application/json"
            type="file"
            onChange={(evt) => onImport(evt.target)}
          />
          <Button startIcon={<FiUpload />} component="span">Import</Button>
        </label>
        <Button startIcon={<FiDownload />} onClick={onExport}>Export</Button>
      </Stack>
      <div>
        <FormControlLabel
          control={<MuiSwitch checked={app.theme() === 'dark'}
          onChange={(evt, value) => app.theme(value ? 'dark' : 'light')} />}
          label={t("labels.themeSwitch")}
          labelPlacement="start"
          sx={{ marginLeft: 0 }} />
      </div>
    </Stack>
  )
}

/**
 * @pa
 * @returns 
 */
function StreamingConfig() {
  const app = useApp();
  const anchorEl = createData<Element | null>(null);

  return (
    <Stack class="gap-2" direction="column">
      <div>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={app.useCustomLoggingFormatter()}
              onChange={(event, checked) => {
                app.useCustomLoggingFormatter(checked);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />}
          label={t("configuration.streaming.useCustomLoggingFormatter")}
          labelPlacement="start"
          sx={{ marginLeft: 0 }} />
      </div>
      <Stack class="gap-2 items-center" direction="row">
        <Typography class="inline-block">{t("configuration.streaming.loggingFormat.title")}</Typography>
        <Box>
          <IconButton disabled={!app.useCustomLoggingFormatter()}
            size="small" onClick={() => app.loggingFormatScript(loggingFormatterTemplate)}
            onMouseEnter={(e) => anchorEl(e.currentTarget)}
            onMouseLeave={() => anchorEl(null)}>
            <BiRegularReset />
          </IconButton>
          <Popover
            sx={{ pointerEvents: "none" }}
            open={anchorEl() !== null}
            anchorEl={anchorEl()}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={() => anchorEl(null)}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>Reset to template</Typography>
          </Popover>
        </Box>
      </Stack>
      <TextField class="w-full custom-scrollbar"
        disabled={!app.useCustomLoggingFormatter()}
        size="small" value={app.loggingFormatScript()}
        multiline maxRows={64}
        onChange={(evt, value) => app.loggingFormatScript(value)} />
    </Stack>
  )
}

const loggingFormatterTemplate =
`
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

/*
interface Syslog {
  prioVersion: string;
  facility: number;
  level: number;
  version: number;
  timestamp: number;
  host: string;
  appName: string;
  procId: string;
  msgId: string;
  structuredData: string
  message: string;
}
*/

Websandbox.connection.setLocalApi({
  /**
   * Format syslog to string.
   * @param syslog log object
   * @returns string formatted log
   */
  format: function(log) {
    // write your logic here
    return Levels[log.level] + ' ' + parseTimestamp(log.timestamp) + ' ' + log.message;
  }
});

// utilities

function parseTimestamp(timestamp) {
  const date = new Date(timestamp);
  return '' + wrapNumber(date.getFullYear()) + '-' + wrapNumber(date.getMonth() + 1) + '-' + wrapNumber(date.getDate())
    + 'T' + wrapNumber(date.getHours()) + ':' + wrapNumber(date.getMinutes()) + ':' + wrapNumber(date.getSeconds())
    + wrapNumber(date.getMilliseconds(), 3) + 'Z';
}

function wrapNumber(v, bits = 2) {
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
`;