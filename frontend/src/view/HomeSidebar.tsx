import { Badge, Stack } from '@suid/material';
import { Sidebar, SidebarItem } from '../mgrui/lib/components/sidebar/Sidebar';
import { For, Show } from "solid-js";
import { when } from '../mgrui/lib/components/utils';
import Icon from '../mgrui/lib/components/Icon';
import config from '../config';
import mock from '../mock';
import { Dynamic } from 'solid-js/web';

export default function HomeSidebar(props: { onSelected: (name: string) => void }) {
  return (
    <Sidebar enableCollapse onSelected={props.onSelected} defaultItem={config.defaultMenu}>
      <For each={config.menus as MenuItem[]}>{(item) => (
        <SidebarItem name={item.name} class='font-large'>
          <Stack spacing={1} direction="row" class="px-1 py-0.5 items-center">
            { typeof(item.icon) === 'string'
              ? <Icon name={item.icon} />
              : <Dynamic component={item.icon} />
            }
            <span class='font-semibold'>{typeof(item.text) === 'string' ? item.text : item.text()}</span>
          </Stack>
        </SidebarItem>
      )}
      </For>
    </Sidebar>
  )
}
