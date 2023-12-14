import { ButtonGroup, IconButton, InputAdornment, Paper, TextField } from "@suid/material";
import { createData } from "../mgrui/lib/components/utils";
import { IoArrowDown, IoArrowUp, IoClose } from 'solid-icons/io';

export default function LogStreamingSearchBar(props: {
  findNext: (text: string) => void;
  findPrevious: (text: string) => void;
  onClose: () => void;
}) {
  const searchDirection = createData<"up" | "down">("up");
  const text = createData('');
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
                <IconButton color="error">
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