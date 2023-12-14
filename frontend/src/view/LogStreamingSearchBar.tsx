import { ButtonGroup, IconButton, InputAdornment, Paper, TextField, useTheme } from "@suid/material";
import { createData } from "../mgrui/lib/components/utils";
import { IoArrowDown, IoArrowUp, IoClose } from 'solid-icons/io';

export default function LogStreamingSearchBar() {
  const theme = useTheme();
  const searchDirection = createData<"up" | "down">("up");
  return (
   <Paper class="absolute top-2 right-2">
    <TextField id="log-streaming-search-input" size="small" placeholder="Search"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ButtonGroup class="p-1 gap-1" size="small" sx={{
              "& button": { borderRadius: 2 },
            }}>
              <IconButton color={searchDirection() === "up" ? "primary" : "default"}
                onClick={() => {
                  searchDirection("up");
                }}>
                <IoArrowUp />
              </IconButton>
              <IconButton color={searchDirection() === "down" ? "primary" : "default"}
                onClick={() => {
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
   </Paper> 
  )
}