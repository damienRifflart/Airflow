"use client"

import type { LucideIcon } from "lucide-react";
import { Wind, Eye, Cloud } from 'lucide-react';

interface GeneralWidgetProps {
  icon: LucideIcon;
  title: string;
  info_wind: string;
  info_visibility: string;
  info_clouds: string;
}

export function GeneralWidget({ icon: Icon, title, info_wind, info_visibility, info_clouds }: GeneralWidgetProps) {
  return (
    <div className="bg-background flex flex-col gap-3 border border-border  rounded-md p-5">
      <div className="flex flex-row gap-3 items-center">
        <Icon size={20} className="text-accent" />
        <p className="text-muted-foreground text-md">{title}</p>
      </div>
      
      <div className="grid grid-cols-2 grid-rows-2 gap-3">
        <div className="flex flex-col">
            <div className="flex flex-row gap-3 items-center">
                <Wind size={20} className="text-muted-foreground" />
                <p className="text-muted-foreground text-md">Wind</p>
            </div>
            <h3 className="text-lg">{info_wind}</h3>
        </div>

        <div className="flex flex-col">
            <div className="flex flex-row gap-3 items-center">
                <Cloud size={20} className="text-muted-foreground" />
                <p className="text-muted-foreground text-md">Clouds</p>
            </div>
            <h3 className="text-lg">{info_clouds}</h3>
        </div>

        <div className="flex flex-col">
            <div className="flex flex-row gap-3 items-center">
                <Eye size={20} className="text-muted-foreground" />
                <p className="text-muted-foreground text-md">Visibility</p>
            </div>
            <h3 className="text-lg">{info_visibility}</h3>
        </div>
      </div>
    </div>
  );
}