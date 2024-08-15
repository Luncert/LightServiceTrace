import { Avatar } from "@suid/material";
import logo from '../logo.ico';

export default function HomeHeader() {
  const openNewWindow = () => {
    window.open('/')
  }

  return (
    <div class="flex w-full h-10 shrink-0 items-center py-3 px-2 gap-2">
      <Avatar class="cursor-pointer" alt="Yan Puppy Logo" src={logo}
        sx={{
          width: 24,
          height: 24,
        }}
        onClick={openNewWindow} />
      <span class='font-bold text-shadow'>Light Service Trace</span>
      <div class="ml-auto">
      </div>
    </div>
  );
}
