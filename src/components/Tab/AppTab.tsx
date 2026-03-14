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
        <Tabs.Tab id={id} className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm sm:text-lg hover:bg-border">
            <Icon size={20} />
                {children}
            <Tabs.Indicator className="rounded-md bg-accent shadow-lg shadow-[rgba(147,149,211,0.2)] transition-all duration-200" />
        </Tabs.Tab>
    );
}