"use client"

import { Chip } from "@heroui/react";
import { RawWidget } from "@/components/Metar_Taf/RawWidget";
import { GeneralWidget } from "@/components/Metar_Taf/GeneralWidget";
import { Clock, Wind, Eye, Thermometer, Gauge, Cloud } from 'lucide-react';

export function Taf() {
  return (
    <div className="rounded-md bg-[var(--card)] border border-border mb-10 p-6 space-y-6 w-[50%]">

        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold tracking-wider">TAF</h3>
            <Chip color="accent" variant="soft" className="rounded-md px-5">
                <Chip.Label className="text-lg">Airport</Chip.Label>
            </Chip>
        </div>

        <div className="flex flex-col gap-3">
            <RawWidget title={"RAW"} description={"TAF KJFK 251130Z 2512/2612 28012G20KT P6SM FEW025 SCT250 FM251800 30015G25KT P6SM SCT035 BKN250 FM260000 32010KT P6SM BKN040 FM260600 34008KT P6SM OVC050 TEMPO 2606/2609 5SM -SHRA BR BKN030"}/>
            <h3 className="text-md text-muted-foreground mt-5 mb-2">DECODED FORECAST</h3>
            <GeneralWidget icon={Clock} title={"2512/2518 (12:00-18:00Z)"} info_wind={"280° at 12kt, gusts to 20kt"} info_visibility={"Greater than 6 km"} info_clouds={"FEW at 2,500ft, SCT at 25,000ft"}/>
            <GeneralWidget icon={Clock} title={"2512/2518 (12:00-18:00Z)"} info_wind={"280° at 12kt, gusts to 20kt"} info_visibility={"Greater than 6 km"} info_clouds={"FEW at 2,500ft, SCT at 25,000ft"}/>
            <GeneralWidget icon={Clock} title={"2512/2518 (12:00-18:00Z)"} info_wind={"280° at 12kt, gusts to 20kt"} info_visibility={"Greater than 6 km"} info_clouds={"FEW at 2,500ft, SCT at 25,000ft"}/>
            <GeneralWidget icon={Clock} title={"2512/2518 (12:00-18:00Z)"} info_wind={"280° at 12kt, gusts to 20kt"} info_visibility={"Greater than 6 km"} info_clouds={"FEW at 2,500ft, SCT at 25,000ft"}/>
        
        </div>
    </div>
  );
}