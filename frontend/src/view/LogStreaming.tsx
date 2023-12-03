import { useTheme } from "@suid/material";
import { names } from "../mgrui/lib/components/utils";
import { onCleanup, onMount } from "solid-js";
import Xterm from "./xterm/Xterm";
import getBackend from "../service/Backend";
import processLog from "./xterm/logstream/LogProcessor";

export default function LogStreaming() {
  const theme = useTheme();

  const term = new Xterm();
  let ref: HTMLDivElement;
  let conn: EventSource;

  onMount(() => {
    term.attach(ref);
    conn = getBackend().streaming(term);
  })

  onCleanup(() => {
    term.dettach();
    if (conn) {
      conn.close();
    }
  })

  return (
    <div class={names("box-border w-full h-full p-3", theme.palette.mode === 'light' ? "bg-zinc-300" : "bg-zinc-700")}>
      <div ref={el => ref = el} class="relative flex flex-col w-full h-full flex-nowrap bg-zinc-100 rounded-md overflow-hidden">
      </div>
    </div>
  )
}