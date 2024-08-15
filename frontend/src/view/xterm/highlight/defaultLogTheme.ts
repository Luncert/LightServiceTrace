import { Mod, styledString as styled } from "../Colors";

type Modifier = (raw: string) => string;
type Theme = {[k: string]: Modifier};

export const theme: Theme = {
  "log.constant": (raw) => styled(raw, "rgb(214, 233, 105)"),
  "log.date": (raw) => styled(raw, "rgb(105, 203, 233)"),
  "log.debug": (raw) => styled(raw, "rgb(105, 114, 233)"),
  "log.error": (raw) => styled(raw, "rgb(0, 0, 0)", "rgb(233, 105, 105)"),
  "log.exception": (raw) => styled(raw, "rgb(207, 49, 49)"),
  "log.exceptiontype": (raw) => styled(raw, "rgb(177, 5, 5)"),
  "log.info": (raw) => styled(raw, "rgb(80, 158, 84)"),
  "log.string": (raw) => styled(raw, "rgb(115, 172, 150)"),
  "log.verbose": (raw) => styled(raw, "rgb(61, 64, 100)"),
  "log.warning": (raw) => styled(raw, "rgb(161, 152, 26)"),
  "log.dataLink": (raw) => styled(raw, "rgb(81, 126, 150)", undefined, Mod.Italic),
  "log.metadata.thread": (raw) => styled(raw, "rgb(100, 150, 100)"),
  "log.metadata.class": (raw) => styled(raw, "rgb(180, 100, 180)"),
  "log.metadata.headers": (raw) => styled(raw, "rgb(100, 100, 100)"),
}