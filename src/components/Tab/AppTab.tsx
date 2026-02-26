"use client"

import type { LucideIcon } from "lucide-react";
import { Tabs } from "@heroui/react";

interface AppTabProps {
  id: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function AppTab({ id, icon: Icon, children }: AppTabProps) {
  return (
    <Tabs.Tab id={id} className="rounded-md text-lg flex gap-2 hover:bg-[rgba(147,149,211,0.2)]">
      <Icon size={20} />
      {children}
      <Tabs.Indicator className="rounded-md bg-accent shadow-lg shadow-[rgba(147,149,211,0.2)] transition-all duration-200" />
    </Tabs.Tab>
  );
}