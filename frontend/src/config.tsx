import LogExplorer from "./view/LogExplorer";
import LogStreaming from "./view/LogStreaming";
import { t } from "i18next";

export default ({
  defaultMenu: "log-streaming",
  menus: [
    {
      name: "log-streaming",
      icon: "user-group",
      text: () => t('menu.log-streaming'),
      view: LogStreaming
    },{
      name: "log-explorer",
      icon: "user-group",
      text: () => t('menu.log-explorer'),
      view: LogExplorer
    }
  ]
})