import LogExplorer from "./view/LogExplorer";
import LogStreaming from "./view/LogStreaming";
import { BsSearch } from 'solid-icons/bs';
import { FaSolidTerminal } from 'solid-icons/fa';
import { IoSettingsSharp } from 'solid-icons/io';
import Configuration from "./view/Configuration";
import { t } from "i18next";

export default ({
  defaultMenu: "configuration",
  menus: [
    {
      name: "log-explorer",
      icon: BsSearch,
      text: () => t('menu.log-explorer'),
      view: LogExplorer
    },
    {
      name: "log-streaming",
      icon: FaSolidTerminal,
      text: () => t('menu.log-streaming'),
      view: LogStreaming
    },
    {
      name: "configuration",
      icon: IoSettingsSharp,
      text: () => t('menu.configuration'),
      view: Configuration
    }
  ]
})