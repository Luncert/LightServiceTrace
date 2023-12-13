import { Avatar } from "@suid/material";
import logo from '../logo.ico';
import { useBackdrop } from "../mgrui/lib/components/BackdropWrapper";

export default function HomeHeader() {
  const backdrop = useBackdrop();

  return (
    <div class="flex w-full h-10 shrink-0 items-center p-3 gap-2">
      <Avatar alt="Yan Puppy Logo" src={logo}
        sx={{
          width: 24,
          height: 24,
        }} />
      <span class='font-bold text-shadow'>Light Service Trace</span>
      <div class="ml-auto">
      </div>
    </div>
  );
}
