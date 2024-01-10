import { Paper } from "@suid/material";
import { Notification } from "../mgrui/lib/components/NotificationWrapper";
import { bucket, names } from "../mgrui/lib/components/utils";
import { BackdropWrapper } from "../mgrui/lib/components/BackdropWrapper";
import HomeSidebar from "./HomeSidebar";
import config from '../config';
import { For, ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import { t } from "i18next";
import GlobalizationWrapper from "../mgrui/lib/components/GlobalizationWrapper";
import HomeHeader from "./HomeHeader";

export default function Home() {
  const activeContent = bucket(config.defaultMenu);

  return (
    <Notification>
      <GlobalizationWrapper getMessage={(key, args) => t(key)}>
        <BackdropWrapper>
          <Paper square class="flex flex-col w-full h-full">
            <HomeHeader />
            <div class="flex flex-nowrap w-full" style={{ height: "calc(100% - 40px)"}}>
              <HomeSidebar selected={activeContent}/>
              <div class="relative box-border h-full grow" style={{ "flex-shrink": 100 }}>
                <For each={resolveViews(config.menus)}>{({name, component}) => (
                  <div class={names("w-full h-full", activeContent() === name ? "block" : "hidden")}>
                    <Dynamic component={component} />
                  </div>
                )}
                </For>
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
