import { Avatar, FormControlLabel, IconButton, Menu, MenuItem, Switch as MuiSwitch, Divider, Paper, Stack, Typography, Box, TextField, Button } from "@suid/material";
import { IoSettingsSharp } from 'solid-icons/io';
import { createData } from "../mgrui/lib/components/utils";
import logo from '../logo.ico';
import { useApp } from "./App";
import { t } from "i18next";
import { useBackdrop } from "../mgrui/lib/components/BackdropWrapper";
import Portal from "../mgrui/lib/components/Portal";
import { For, Match, Switch, onMount } from "solid-js";
import { Sidebar, SidebarItem } from "../mgrui/lib/components/sidebar/Sidebar";

export default function HomeHeader() {
  const app = useApp();
  const backdrop = useBackdrop();
  const useDarkTheme = createData(false, {
    localStorageName: 'useDarkTheme',
    beforeUpdate: (newValue) => {
      app.theme(newValue ? 'dark' : 'light');
    }
  });
  const deserializeJsonMessage = createData(false, {
    localStorageName: 'deserializeJsonMessage',
    beforeUpdate: (newValue) => {
      app.deserializeJsonMessage(newValue);
    }
  });
  const loggingFormat = createData('');
  const activeContent = createData('theme');
  const showConfigModel = createData(true);

  onMount(() => {
    backdrop.show(undefined, () => showConfigModel(false));
  })

  return (
    <div class="flex w-full h-10 shrink-0 items-center p-3 gap-2">
      <Avatar alt="Yan Puppy Logo" src={logo}
        sx={{
          width: 24,
          height: 24,
        }} />
      <span class='font-bold text-shadow'>Light Service Trace</span>
      <div class="ml-auto">
        <IconButton id="settings-button"
          onClick={(event) => {
            backdrop.show(undefined, () => showConfigModel(false));
            showConfigModel(true);
          }}>
          <IoSettingsSharp />
        </IconButton>
        <Portal show={showConfigModel} mount={backdrop.container()}>
          <Paper class="absolute p-2 -translate-x-1/2 -translate-y-1/2 flex w-[600px] h-96">
            <Sidebar class="shrink-0 w-[140px]" onSelected={activeContent} defaultItem="theme">
              <SidebarItem name="theme" class='font-large' style={{width: '100%'}}>
                <span class='font-semibold'>Theme</span>
              </SidebarItem>
              <SidebarItem name="streaming" class='font-large' style={{width: '100%'}}>
                <span class='font-semibold'>Streaming</span>
              </SidebarItem>
            </Sidebar>
            <Divider orientation="vertical" />
            <Stack class="px-4 gap-2 items-start">
              <Switch>
                <Match when={activeContent() === 'theme'}>
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
                    <TextField class="w-72" size="small" label={t("labels.loggingFormat")} onChange={(evt, value) => loggingFormat(value)} />
                    <Button variant="contained" onClick={() => {
                      if (validateLoggingFormat(loggingFormat())) {
                        app.loggingFormat(loggingFormat());
                      }
                    }}>{t("labels.validate")}</Button>
                  </Stack>
                </Match>
              </Switch>
            </Stack>
          </Paper>
        </Portal>
      </div>
    </div>
  );
}

function validateLoggingFormat(format: string) {
  console.log(format)
  return false;
}