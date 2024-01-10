import { FormControlLabel, Switch as MuiSwitch, Stack, TextField, Button, Box, Divider, Checkbox, Typography, Grid, IconButton, Popover } from "@suid/material";
import { Tab, Tabs } from "../mgrui/lib/components/navigation/Tabs";
import { For, Match, Switch } from "solid-js";
import { t } from "i18next";
import { bucket } from "../mgrui/lib/components/utils";
import { useApp } from "./App";
import { FiDownload, FiUpload } from 'solid-icons/fi';
import { BiRegularReset } from 'solid-icons/bi';

export default function Configuration() {
  const activeContent = bucket('');

  return (
    <div class="flex flex-col border-box w-full h-full p-5 overflow-hidden">
      <Tabs value="general" onChangeTab={activeContent}>
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
  const popover = bucket<[Element, string] | null>(null);

  return (
    <Stack class="gap-2" direction="column">
      <Popover
        sx={{ pointerEvents: "none" }}
        open={popover() !== null}
        anchorEl={popover()?.[0]}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={() => popover()}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>{popover()?.[1]}</Typography>
      </Popover>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={app.enableCustomFilter()}
              onChange={(event, checked) => app.enableCustomFilter(checked)}
              inputProps={{ "aria-label": "controlled" }}
            />}
          label={t("configuration.streaming.enableCustomFilter")}
          labelPlacement="start"
          onMouseEnter={(e) => popover([e.currentTarget, t("configuration.streaming.enableCustomFilterTips")])}
          onMouseLeave={() => popover(null)}
          sx={{ marginLeft: 0 }} />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={app.enableCustomLoggingFormatter()}
              onChange={(event, checked) => app.enableCustomLoggingFormatter(checked)}
              inputProps={{ "aria-label": "controlled" }}
            />}
          label={t("configuration.streaming.enableCustomLoggingFormatter")}
          labelPlacement="start"
          onMouseEnter={(e) => popover([e.currentTarget, t("configuration.streaming.enableCustomLoggingFormatterTips")])}
          onMouseLeave={() => popover(null)}
          sx={{ marginLeft: 0 }} />
      </div>
      {/* <Typography class="inline-block">{t("configuration.streaming.loggingColorSchema")}</Typography>
      <TextField class="w-full custom-scrollbar"
        size="small" value={app.loggingColorSchema()}
        multiline maxRows={16}
        onChange={(evt, value) => app.loggingColorSchema(value)} /> */}
      <Stack class="gap-2 items-center" direction="row">
        <Typography class="inline-block">{t("configuration.streaming.loggingFormatter")}</Typography>
        <Box>
          <IconButton disabled={!app.enableCustomLoggingFormatter()}
            size="small" onClick={() => app.loggingFormatScript(loggingFormatterTemplate)}
            onMouseEnter={(e) => popover([e.currentTarget, t("configuration.streaming.resetLoggingFormatter")])}
            onMouseLeave={() => popover(null)}>
            <BiRegularReset />
          </IconButton>
        </Box>
      </Stack>
      <TextField class="w-full custom-scrollbar"
        disabled={!app.enableCustomLoggingFormatter()}
        size="small" value={app.loggingFormatScript()}
        multiline maxRows={64}
        onChange={(evt, value) => app.loggingFormatScript(value)} />
    </Stack>
  )
}

const loggingFormatterTemplate =
`
Websandbox.connection.setLocalApi({
  /**
   * Format syslog to string.
   * @param syslog log object
   * @returns string formatted log
   */
  accept: function(log) {
    return true;
  },
  format: function(log) {
    // write your logic here
    try {
      const msg = JSON.parse(log.message);
      let r = msg.written_at + " " + msg.type.toUpperCase() + " " + msg.logger + " " + msg.level + " " + msg.msg;
      if (msg.stacktrace) {
        r += " " + msg.stacktrace.join("\\n").replaceAll("\t", "  ");
      }
      return r;
    } catch (e) {
      console.error(e);
    }
    return Levels[log.level] + ' ' + parseTimestamp(log.timestamp) + ' ' + log.message;
  }
});

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