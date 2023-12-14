import { FormControlLabel, Switch as MuiSwitch, Stack, TextField, Button, Box, Divider, Checkbox, Typography, Grid, IconButton } from "@suid/material";
import { Tab, Tabs } from "../mgrui/lib/components/navigation/Tabs";
import { For, Match, Switch } from "solid-js";
import { t } from "i18next";
import { StoreObject, createData, createStoreObject } from "../mgrui/lib/components/utils";
import { useApp } from "./App";
import { FaSolidPlus } from 'solid-icons/fa'
import { AiFillEdit } from 'solid-icons/ai';
import { BiSolidSave } from 'solid-icons/bi';
import { createStore } from "solid-js/store";

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

  const useDarkTheme = createData(false, {
    localStorageName: 'config.useDarkTheme',
    beforeUpdate: (newValue) => {
      app.theme(newValue ? 'dark' : 'light');
    }
  });

  return (
    <Stack class="gap-2" direction="column">
      <Stack class="gap-2 items-center" direction="row">
        <Typography class="inline-block">{t("configuration.general.sync")}</Typography>
        <Button>Export</Button>
        <Button>Import</Button>
      </Stack>
      <div>
        <FormControlLabel
          control={<MuiSwitch checked={useDarkTheme()} onChange={(evt, value) => useDarkTheme(value)} />}
          label={t("labels.themeSwitch")}
          labelPlacement="start"
          sx={{ marginLeft: 0 }} />
      </div>
    </Stack>
  )
}

function StreamingConfig() {
  const app = useApp();

  const deserializeJsonMessage = createData(false, {
    localStorageName: 'config.deserializeJsonMessage',
    beforeUpdate: (newValue) => {
      app.deserializeJsonMessage(newValue);
    }
  });

  return (
    <Stack class="gap-2" direction="column">
      <div>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={deserializeJsonMessage()}
              onChange={(event, checked) => {
                deserializeJsonMessage(checked);
              }}
              inputProps={{ "aria-label": "controlled" }}
            />}
          label={t("labels.deserializeJsonMessageCheckbox")}
          labelPlacement="start"
          sx={{ marginLeft: 0 }} />
      </div>
      {/* <Divider sx={{marginBottom: "0.5rem"}} /> */}
      <LoggingFormatConfig />
    </Stack>
  )
}

function LoggingFormatConfig() {
  const app = useApp();

  const editting = createData(false);

  const loggingFormats = createLoggingFormatStore();

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
      <For each={Object.keys(loggingFormats)}>{key => {
        const item = loggingFormats[key as any];
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

function createLoggingFormatStore(): StoreObject<LoggingFormat[]> {
  const [v, setV] = createStore([
    {
      host: "xx.com",
      type: 'script',
      value: "asd"
    }
  ]);
  return createStoreObject(v, setV, "config.loggingFormats") as any;
}

interface LoggingFormat {
  host: UpdateAndGetFunc<string>;
  type: UpdateAndGetFunc<'format' | 'script'>;
  value: UpdateAndGetFunc<string>;
}