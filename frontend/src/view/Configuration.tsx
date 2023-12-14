import { FormControlLabel, Switch as MuiSwitch, Stack, TextField, Button, Box, Divider, Checkbox, Typography, Grid, IconButton } from "@suid/material";
import { Tab, Tabs } from "../mgrui/lib/components/navigation/Tabs";
import { For, Match, Switch } from "solid-js";
import { t } from "i18next";
import { StoreObject, createData, createStoreObject } from "../mgrui/lib/components/utils";
import { useApp } from "./App";
import { FaSolidPlus } from 'solid-icons/fa'
import { AiFillEdit } from 'solid-icons/ai';
import { BiSolidSave } from 'solid-icons/bi';
import { FiDownload, FiUpload } from 'solid-icons/fi';

export default function Configuration() {
  const activeContent = createData('');

  return (
    <div class="p-5">
      <Tabs value="streaming" onChangeTab={activeContent}>
        <Tab label="general">General</Tab>
        <Tab label="streaming">Streaming</Tab>
      </Tabs>
      <Box class="p-2">
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

function StreamingConfig() {
  const app = useApp();

  return (
    <Stack class="gap-2" direction="column">
      <div>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={app.deserializeJsonMessage()}
              onChange={(event, checked) => {
                app.deserializeJsonMessage(checked);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />}
          label={t("configuration.streaming.deserializeJsonMessageCheckbox")}
          labelPlacement="start"
          sx={{ marginLeft: 0 }} />
      </div>
      <LoggingFormatConfig />
    </Stack>
  )
}

function LoggingFormatConfig() {
  const app = useApp();
  const editting = createData(false);

  return (
    <>
      <Stack class="gap-2 items-center" direction="row">
        <Typography class="inline-block" variant="h6">{t("configuration.streaming.loggingFormat.title")}</Typography>
        <Box>
          <Switch>
            <Match when={!editting()}>
              <IconButton size="small" onClick={() => editting(true)}>
                <AiFillEdit />
              </IconButton>
            </Match>
            <Match when={editting()}>
              <IconButton size="small">
                <FaSolidPlus />
              </IconButton>
              <IconButton size="small">
                <BiSolidSave />
              </IconButton>
            </Match>
          </Switch>
        </Box>
      </Stack>
      <For each={Object.keys(app.loggingFormats)}>{key => {
        const item = app.loggingFormats[key as any];
        return (
          <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
              <TextField class="w-full"
                label={t("configuration.streaming.loggingFormat.conditionField")}
                placeholder="Regexp"
                size="small" value={item.host()}
                onChange={(evt, value) => item.host(value)} />
            </Grid>
            <Grid item xs={6} md={8}>
              <TextField class="w-full custom-scrollbar"
                label={t("configuration.streaming.loggingFormat." + item.type())}
                size="small" value={item.value()} multiline maxRows={16}
                onChange={(evt, value) => item.value(value)} />
            </Grid>
          </Grid>
        );
      }}
      </For>
    </>
  )
}