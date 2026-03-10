"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { IconLayoutSidebarLeftCollapse } from "@tabler/icons-react";

// ============ 常量 ============
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_COLLAPSED = "4.5rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";

// ============ Context ============
type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
  isCollapsed: boolean;
  isMobile: boolean;
};

const SidebarContext = React.createContext<SidebarContextType | null>(null);

function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar 必须在 SidebarProvider 内使用");
  return ctx;
}

// ============ Provider ============
function SidebarProvider({ children, defaultOpen = true }: { children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [isMobileOpen, setMobileOpen] = React.useState(false);

  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = React.useCallback(() => {
    if (isMobile) setMobileOpen((v) => !v);
    else setIsOpen((v) => !v);
  }, [isMobile]);

  const value: SidebarContextType = {
    isOpen: isMobile ? isMobileOpen : isOpen,
    toggle,
    isCollapsed: !isOpen && !isMobile,
    isMobile,
  };

  return (
    <SidebarContext.Provider value={value}>
      <div
        className="flex min-h-svh w-full"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-collapsed": SIDEBAR_WIDTH_COLLAPSED,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

// ============ 移动端 Sidebar (Sheet) ============
function MobileSidebar({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isOpen, toggle, isMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <Sheet open={isOpen} onOpenChange={toggle}>
      <SheetContent side="left" className="p-0" style={{ width: SIDEBAR_WIDTH_MOBILE, maxWidth: "85vw" }}>
        <SheetHeader className="sr-only">
          <SheetTitle>侧边栏</SheetTitle>
          <SheetDescription>导航菜单</SheetDescription>
        </SheetHeader>
        <div className={cn("flex h-full flex-col", className)}>{children}</div>
      </SheetContent>
    </Sheet>
  );
}

// ============ 桌面端 Sidebar ============
function DesktopSidebar({
  children,
  className,
  collapsible = "icon",
}: {
  children: React.ReactNode;
  className?: string;
  collapsible?: "icon" | "offcanvas" | "none";
}) {
  const { isCollapsed, isMobile } = useSidebar();

  if (isMobile) return null;

  const width = collapsible === "icon" && isCollapsed ? "var(--sidebar-width-collapsed)" : "var(--sidebar-width)";

  return (
    <aside
      className={cn("group/sidebar hidden flex-col border-r border-zinc-200 bg-white transition-[width] duration-200 md:flex", className)}
      style={{ width }}
      data-collapsed={isCollapsed ? "true" : "false"}
    >
      {children}
    </aside>
  );
}

// ============ 主 Sidebar 组件 ============
function Sidebar({
  children,
  className,
  collapsible = "icon",
}: {
  children: React.ReactNode;
  className?: string;
  collapsible?: "icon" | "offcanvas" | "none";
}) {
  return (
    <>
      <MobileSidebar className={className}>{children}</MobileSidebar>
      <DesktopSidebar className={className} collapsible={collapsible}>
        {children}
      </DesktopSidebar>
    </>
  );
}

// ============ SidebarTrigger 展开/收起按钮 ============
function SidebarTrigger({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { toggle } = useSidebar();
  return (
    <Button variant="ghost" size="icon" className={cn(className)} onClick={toggle} {...props}>
      <IconLayoutSidebarLeftCollapse className="size-5" />
      <span className="sr-only">切换侧边栏</span>
    </Button>
  );
}

// ============ SidebarInset 主内容区 ============
function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return <main className={cn("flex flex-1 flex-col", className)} {...props} />;
}

// ============ 布局子组件 (简单 div) ============
function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2 p-4", className)} data-sidebar="header" {...props} />;
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-1 flex-col overflow-auto", className)} data-sidebar="content" {...props} />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col p-2", className)} data-sidebar="group" {...props} />;
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400", className)}
      data-sidebar="group-label"
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1", className)} data-sidebar="group-content" {...props} />;
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex flex-col gap-0", className)} data-sidebar="menu" {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("relative", className)} data-sidebar="menu-item" {...props} />;
}

function SidebarMenuButton({
  children,
  isActive = false,
  className,
  tooltip,
  ...props
}: React.ComponentProps<"button"> & { isActive?: boolean; tooltip?: string }) {
  const { isCollapsed, isMobile } = useSidebar();
  const button = (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm transition-colors",
        "hover:bg-zinc-50",
        isActive && "bg-zinc-100 font-medium text-zinc-950",
        !isActive && "text-zinc-600",
        isCollapsed && "justify-center px-2",
        className
      )}
      title={tooltip || (isCollapsed && isMobile ? undefined : undefined)}
      {...props}
    >
      {children}
    </button>
  );
  return button;
}

// ============ Export ============
export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
};
