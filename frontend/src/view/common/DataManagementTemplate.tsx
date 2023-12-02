import { Paper, Stack, Typography, useTheme } from "@suid/material";
import { JSX } from "solid-js";
import { names } from "../../mgrui/lib/components/utils";

export default function DataManagementTemplate(props: {
  title: string;
  headers?: JSX.Element;
  fixedContentSizing?: boolean;
  children: JSX.Element;
}) {
  const theme = useTheme();
  return (
    <div class={names("box-border w-full h-full p-3", theme.palette.mode === 'light' ? "bg-zinc-300" : "bg-zinc-700")}>
      <div class="flex flex-col w-full h-full flex-nowrap bg-zinc-100 rounded-md overflow-hidden">
        <Paper square class="p-5 shrink-0 drop-shadow z-10">
          <Stack spacing={2}>
            <Typography variant="h5" component='div'>{props.title}</Typography>
            {props.headers}
          </Stack>
        </Paper>
        <div class={names("flex-1 box-border p-5 border-t overflow-y-auto custom-scrollbar",
          theme.palette.mode === 'light' ? "border-zinc-200 bg-zinc-200" : "border-zinc-600 bg-zinc-600"
        )}>
          <Paper class={names("relative flex flex-col w-full rounded-md drop-shadow overflow-hidden",
            props.fixedContentSizing === false ? "h-max" : "h-full")}>
            {props.children}
          </Paper>
        </div>
      </div>
    </div>
  )
}

