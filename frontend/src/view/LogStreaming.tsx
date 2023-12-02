import { useTheme } from "@suid/material";
import DataManagementTemplate from "./common/DataManagementTemplate";
import { names } from "../mgrui/lib/components/utils";

export default function LogStreaming() {
  const theme = useTheme();

  return (
    <div class={names("box-border w-full h-full p-3", theme.palette.mode === 'light' ? "bg-zinc-300" : "bg-zinc-700")}>
      <div class="flex flex-col w-full h-full flex-nowrap bg-zinc-100 rounded-md overflow-hidden">
      </div>
    </div>
  )
}