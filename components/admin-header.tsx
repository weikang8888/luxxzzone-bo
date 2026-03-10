"use client";

import { IconLogout, IconSettings, IconBell } from "@tabler/icons-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-md">
      {/* 左侧：侧边栏切换按钮 */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-zinc-500 hover:text-zinc-950" />
      </div>

      {/* 右侧：通知与用户信息 */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-zinc-500">
          <IconBell className="size-5" />
          <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-red-500" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-zinc-50">
                <div className="flex size-8 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 font-bold text-xs">
                  A
                </div>
                <div className="hidden text-left lg:block">
                  <p className="text-xs font-bold text-zinc-950 uppercase">Admin User</p>
                  <p className="text-[10px] text-zinc-500">Super Admin</p>
                </div>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-56 rounded-none">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-zinc-400">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer py-2 text-xs uppercase tracking-widest">
              <IconSettings className="mr-2 size-4" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer py-2 text-xs uppercase tracking-widest text-red-600">
              <IconLogout className="mr-2 size-4" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
