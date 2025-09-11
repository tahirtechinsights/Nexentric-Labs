"use client";

import {
  Inbox,
  Building2,
  LayoutDashboard,
  CircleUser,
  Telescope
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import React from "react";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Companies",
    url: "/companies",
    icon: Building2,
  }
];

// Menu items.
const personals = [
  {
    title: "Profile",
    url: "/profile",
    icon: CircleUser,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: Inbox,
  }
];

const company = [
  {
    title: "Discover",
    url: "/discover",
    icon: Telescope,
  },
];

const SidebarLogo = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <div
      className={cn(
        "flex items-center justify-center p-2.5",
        isCollapsed ? "w-10 h-10" : "w-full"
      )}
    >
      <div
        className={cn(
          "h-full w-full flex items-start",
          isCollapsed ? "rounded-lg bg-gray-100" : "bg-transparent"
        )}
      >
        {isCollapsed ? (
          <Image
            src="/assets/Nexentric_Logo.png"
            alt="Nexentric Logo"
            width={50}
            height={30}
            className="object-contain"
          />
        ) : (
          <Image
            src="/assets/Nexentric_Logo_with_Text.png"
            alt="Nexentric Logo"
            width={130}
            height={30}
            className="object-contain"
          />
        )}
      </div>
    </div>
  );
};

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarLogo/>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Personals</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {personals.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Leads</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {company.map((c) => (
                <SidebarMenuItem key={c.title}>
                  <SidebarMenuButton asChild>
                    <a href={c.url}>
                      <c.icon />
                      <span>{c.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}