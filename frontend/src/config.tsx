import LogExplorer from "./view/LogExplorer";
import LogStreaming from "./view/LogStreaming";
import { BsSearch } from 'solid-icons/bs';
import { FaSolidTerminal } from 'solid-icons/fa'
import { t } from "i18next";

export default ({
  defaultMenu: "log-streaming",
  menus: [
    {
      name: "log-streaming",
      icon: FaSolidTerminal,
      text: () => t('menu.log-streaming'),
      view: LogStreaming
    },{
      name: "log-explorer",
      icon: BsSearch,
      text: () => t('menu.log-explorer'),
      view: LogExplorer
    }
  ]
})