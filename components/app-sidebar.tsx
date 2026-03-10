"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconLayoutDashboard, IconBox, IconSettings, IconShield } from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

const navigation = [
  {
    group: "Overview",
    items: [
      { title: "Dashboard", href: "/", icon: IconLayoutDashboard },
      { title: "Products", href: "/products", icon: IconBox },
      { title: "Admin Role", href: "/roles", icon: IconShield },
      { title: "Settings", href: "/settings", icon: IconSettings },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-200 bg-white">
      <SidebarHeader className="h-16 justify-center border-b border-zinc-100 px-4 group-data-[collapsed=true]/sidebar:items-center group-data-[collapsed=true]/sidebar:px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12">
              <Link href="/" className="flex items-center gap-3 group-data-[collapsed=true]/sidebar:justify-center">
                <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-md bg-zinc-950 text-zinc-50 font-bold text-xs">
                  LZ
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsed=true]/sidebar:hidden">
                  <span className="truncate font-bold tracking-tight uppercase text-zinc-950">
                    LuxxZone
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-6 group-data-[collapsed=true]/sidebar:items-center">
        {navigation.map((group) => (
          <SidebarGroup key={group.group} className="px-2 group-data-[collapsed=true]/sidebar:items-center">
            <SidebarGroupLabel className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 group-data-[collapsed=true]/sidebar:hidden">
              {group.group}
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-2 group-data-[collapsed=true]/sidebar:mt-0 group-data-[collapsed=true]/sidebar:items-center">
              <SidebarMenu className="group-data-[collapsed=true]/sidebar:items-center">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      tooltip={item.title}
                      className="px-4 py-6 transition-all hover:bg-zinc-50"
                    >
                      <Link href={item.href} className="flex items-center gap-3 group-data-[collapsed=true]/sidebar:justify-center">
                        <item.icon className={`size-8 shrink-0 ${pathname === item.href ? "text-zinc-950" : "text-zinc-500"}`} />
                        <span className={`font-medium tracking-tight group-data-[collapsed=true]/sidebar:hidden ${pathname === item.href ? "text-zinc-950" : "text-zinc-600"}`}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}