import { FormControlLabel, Switch as MuiSwitch, Stack, TextField, Button, Box } from "@suid/material";
import { Tab, Tabs } from "../mgrui/lib/components/navigation/Tabs";
import { Match, Switch } from "solid-js";
import { t } from "i18next";
import { createData } from "../mgrui/lib/components/utils";
import { useApp } from "./App";
import { validateLoggingFormat } from "./LogFormatter";

export default function Configuration() {
  const app = useApp();
  const useDarkTheme = createData(false, {
    localStorageName: 'config.useDarkTheme',
    beforeUpdate: (newValue) => {
      app.theme(newValue ? 'dark' : 'light');
    }
  });

  const deserializeJsonMessage = createData(false, {
    localStorageName: 'config.deserializeJsonMessage',
    beforeUpdate: (newValue) => {
      app.deserializeJsonMessage(newValue);
    }
  });
  const loggingFormat = createData('', {
    localStorageName: 'config.loggingFormat',
    beforeUpdate: (newValue) => {
      app.loggingFormat(newValue);
    }
  });
  
  const activeContent = createData('general');

  return (
    <div class="p-5">
      <Tabs value="general" onChangeTab={activeContent}>
        <Tab label="general">General</Tab>
        <Tab label="streaming">Streaming</Tab>
      </Tabs>
      <Box class="p-2">
        <Switch>
          <Match when={activeContent() === 'general'}>
            <FormControlLabel
              control={<MuiSwitch checked={useDarkTheme()} onChange={(evt, value) => useDarkTheme(value)} />}
              label={t("labels.themeSwitch")}
              labelPlacement="start"
              sx={{ marginLeft: 0 }} />
          </Match>
          <Match when={activeContent() === 'streaming'}>
            <FormControlLabel
              control={<MuiSwitch checked={deserializeJsonMessage()} onChange={(evt, value) => deserializeJsonMessage(value)} />}
              label={t("labels.deserializeJsonMessageSwitch")}
              labelPlacement="start"
              sx={{ marginLeft: 0 }} />
            <Stack class="gap-2 w-full" direction="row">
              <TextField class="w-72 custom-scrollbar" label={t("labels.loggingFormat")}
                multiline rows={4} size="small" value={loggingFormat()}
                onChange={(evt, value) => loggingFormat(value)} />
              <Button variant="contained" onClick={() => {
                validateLoggingFormat(loggingFormat()).then(() => {
                  // TODO: use notification
                }).catch((err) => {
                  // TODO: use notification
                  console.error(err);
                })
              }}>{t("labels.validate")}</Button>
            </Stack>
          </Match>
        </Switch>
      </Box>
    </div>
  )
}