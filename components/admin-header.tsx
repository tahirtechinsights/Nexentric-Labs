"use client";

import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from '@/components/theme-toggle';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

// Define the message interface
interface Message {
  id: number;
  message: string;
  read: boolean;
}

export function AdminHeader() {
  const pathname = usePathname();

  const [notifications] = useState([
    {
      id: 1,
      message: "Welcome! Your account has been created successfully!",
      read: false,
    },
  ]);
  
  // Add type annotation to messages state
  const [messages] = useState<Message[]>([]);

  const getPageName = () => {
    if (pathname === "/admin") return "Dashboard";

    const segments = pathname
      .split("/")
      .filter((segment) => segment.length > 0);

    const lastSegment = segments[segments.length - 1];

    if (!lastSegment) return "Dashboard";

    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };
  
  // Standardize the icon size and styling with a common class
  const iconClass = "h-5 w-5";

  return (
    <header className="sticky top-0 z-10 w-full p-2 bg-background border-b shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="sidebar-trigger-icon" />
          <h1 className="text-xl font-semibold">{getPageName()}</h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Notification Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                <Bell className={iconClass} />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[300px] p-0">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    You have{" "}
                    {notifications.filter((n) => !n.read).length} new messages.
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="p-0">
                  <ScrollArea className="h-[200px] w-full">
                    {notifications.length > 0 ? (
                      <ul className="divide-y divide-border">
                        {notifications.map((notif, index) => (
                          <li
                            key={index}
                            className="p-4 hover:bg-muted transition-colors"
                          >
                            <p className="text-sm">{notif.message}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                        No new notifications.
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>

          {/* Message Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
              >
                <MessageSquare className={iconClass} />
                {messages.length > 0 && (
                  <span className="absolute top-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[300px] p-0">
              <Card className="border-none shadow-none">
                <CardHeader>
                  <CardTitle>Messages</CardTitle>
                  <CardDescription>
                    You have {messages.length} unread messages.
                  </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="p-0">
                  <ScrollArea className="h-[200px] w-full">
                    {messages.length > 0 ? (
                      <ul className="divide-y divide-border">
                        {messages.map((msg, index) => (
                          <li
                            key={index}
                            className="p-4 hover:bg-muted transition-colors"
                          >
                            <p className="text-sm">{msg.message}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex h-[200px] items-center justify-center text-center text-sm text-muted-foreground">
                        You have no new messages.
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}