import { Badge, Stack } from '@suid/material';
import { Sidebar, SidebarItem } from '../mgrui/lib/components/sidebar/Sidebar';
import { For, Show } from "solid-js";
import { when } from '../mgrui/lib/components/utils';
import Icon from '../mgrui/lib/components/Icon';
import config from '../config';
import mock from '../mock';

export default function HomeSidebar(props: { onSelected: (name: string) => void }) {
  const messageNotification = mock.MessageNotification as MessageNotification;
  return (
    <Sidebar class="shrink-0 w-[160px]" onSelected={props.onSelected} defaultItem={config.defaultMenu}>
        <For each={config.menus as MenuItem[]}>{(item) => (
          <SidebarItem name={item.name} class='font-large' style={{width: '100%'}}
            subMenu={
              when(item.subItems !== undefined, (
                <For each={item.subItems}>{(subItem) =>
                  <SidebarItem name={subItem.name}
                    subMenu={
                      when(subItem.subItems !== undefined, (
                        <For each={subItem.subItems}>{(subItem1) =>
                          <SidebarItem name={subItem1.name}>
                            <span class="font-normal px-1 py-0.5">{subItem1.text}</span>
                            <Show when={messageNotification[subItem1.name] > 0}>
                              <Badge color="primary" badgeContent={1} />
                            </Show>
                          </SidebarItem>}
                        </For>
                      ))
                    }>
                    <span class="font-normal px-1 py-0.5">{subItem.text}</span>
                    <Show when={messageNotification[subItem.name] > 0}>
                      <Badge color="primary" badgeContent={1} />
                    </Show>
                  </SidebarItem>}
                </For>
              ))
            }>
            <Stack spacing={1} direction="row" class="px-1 py-0.5">
              <Icon name={item.icon} />
              <span class='font-semibold'>{typeof(item.text) === 'string' ? item.text : item.text()}</span>
            </Stack>
            <Show when={messageNotification[item.name] > 0}>
              <Badge color="primary" badgeContent={1} />
            </Show>
          </SidebarItem>
        )}
        </For>
    </Sidebar>
  )
}
