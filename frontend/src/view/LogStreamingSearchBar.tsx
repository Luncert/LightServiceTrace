import { ButtonGroup, IconButton, InputAdornment, Paper, TextField } from "@suid/material";
import { bucket } from "../mgrui/lib/components/utils";
import { IoArrowDown, IoArrowUp, IoClose } from 'solid-icons/io';

export default function LogStreamingSearchBar(props: {
  findNext: (text: string) => void;
  findPrevious: (text: string) => void;
  onClose: () => void;
}) {
  const searchDirection = bucket<"up" | "down">("up");
  const text = bucket('');

  return (
   <Paper class="absolute top-2 right-2">
    <form onSubmit={(e) => {
      if (searchDirection() === 'up') {
        props.findPrevious(text());
      } else {
        props.findNext(text());
      }
      e.preventDefault();
    }}>
      <TextField id="log-streaming-search-input" size="small" placeholder="Search"
        autoComplete="off" focused
        onChange={(evt, v) => text(v)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ButtonGroup class="p-1 gap-1" size="small" sx={{
                "& button": { borderRadius: 2 },
              }}>
                <IconButton color={searchDirection() === "up" ? "primary" : "default"}
                  onClick={() => {
                    props.findPrevious(text());
                    searchDirection("up");
                  }}>
                  <IoArrowUp />
                </IconButton>
                <IconButton color={searchDirection() === "down" ? "primary" : "default"}
                  onClick={() => {
                    props.findNext(text());
                    searchDirection("down");
                  }}>
                  <IoArrowDown />
                </IconButton>
                <IconButton color="error" onClick={() => {
                  props.onClose();
                }}>
                  <IoClose />
                </IconButton>
              </ButtonGroup>
            </InputAdornment>
          )
        }} sx={{
          '& > div': {
            padding: "0.25rem"
          }
        }} />
    </form>
   </Paper> 
  )
}