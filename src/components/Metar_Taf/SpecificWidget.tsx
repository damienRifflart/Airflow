"use client"

import type { LucideIcon } from "lucide-react";

interface SpecificWidgetProps {
    icon: LucideIcon;
    title: string;
    description: string;
    detail: string;
}

export function SpecificWidget({ icon: Icon, title, description, detail }: SpecificWidgetProps) {
    return (
        <div className="bg-background flex flex-col gap-3 border border-border aspect-rectangle rounded-md p-6">
            <div className="flex flex-row gap-3 items-center">
                <Icon size={20} className="text-accent" />
                <p className="text-muted-foreground text-md">{title}</p>
            </div>
            
            <div className="flex flex-col">
                <h3 className="text-lg whitespace-pre-line">{description}</h3>
                <h2 className="text-muted-foreground text-md">{detail}</h2>
            </div>
        </div>
    );
}