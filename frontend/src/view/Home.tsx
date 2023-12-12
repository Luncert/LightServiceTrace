import { Avatar, FormControlLabel, IconButton, Menu, MenuItem, Paper, Switch as MuiSwitch } from "@suid/material";
import { Notification } from "../mgrui/lib/components/NotificationWrapper";
import { createData, names } from "../mgrui/lib/components/utils";
import logo from '../logo.svg';
import { BackdropWrapper } from "../mgrui/lib/components/BackdropWrapper";
import HomeSidebar from "./HomeSidebar";
import config from '../config';
import { For, Match, Switch, ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import { IoSettingsSharp } from 'solid-icons/io';
import { t } from "i18next";
import { useApp } from "./App";
import GlobalizationWrapper from "../mgrui/lib/components/GlobalizationWrapper";

export default function Home() {
  const app = useApp();
  const activeContent = createData(config.defaultMenu);
  const useDarkTheme = createData(false, {
    localStorageName: 'useDarkTheme',
    beforeUpdate: (newValue) => {
      app.theme(newValue ? 'dark' : 'light');
    }
  });
  const settingAnchorEl = createData<null | HTMLElement>(null);
  const openSettingMenu = () => Boolean(settingAnchorEl());
  const closeSettingMenu = () => settingAnchorEl(null);

  return (
    <Notification>
      <GlobalizationWrapper getMessage={(key, args) => t(key)}>
        <BackdropWrapper>
          <Paper square class="flex flex-col w-full h-full">
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
                    settingAnchorEl(event.currentTarget);
                  }}>
                  <IoSettingsSharp />
                </IconButton>
                <Menu
                  id="settings-menu"
                  anchorEl={settingAnchorEl()}
                  open={openSettingMenu()}
                  onClose={closeSettingMenu}
                  MenuListProps={{ "aria-labelledby": "settings-button" }}
                >
                  <MenuItem>
                    <FormControlLabel
                      control={<MuiSwitch checked={useDarkTheme()} onChange={(evt, value) => useDarkTheme(value)} />}
                      label={t(useDarkTheme() ? "labels.darkTheme" : "labels.lightTheme")}
                    />
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div class="flex flex-nowrap w-full" style={{ height: "calc(100% - 40px)"}}>
              <HomeSidebar onSelected={(name) => activeContent(name)}/>
              <div class={names("relative box-border h-full grow")}>
                <Switch>
                  <For each={resolveViews(config.menus)}>{({name, component}) => (
                    <Match when={activeContent() === name}>
                      <Dynamic component={component} />
                    </Match>
                  )}
                  </For>
                </Switch>
              </div>
            </div>
          </Paper>
        </BackdropWrapper>
      </GlobalizationWrapper>
    </Notification>
  )
}

function resolveViews(menu: MenuItem[] | MenuSubItem[]) {
  const views: {name: string, component: ValidComponent}[] = [];
  for (let item of menu) {
    if (item.subItems) {
      views.push(...resolveViews(item.subItems));
    } else {
      views.push({
        name: item.name,
        component: item.view as ValidComponent
      });
    }
  }
  return views;
}
