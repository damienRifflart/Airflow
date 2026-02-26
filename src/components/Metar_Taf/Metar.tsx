"use client"

import { Chip } from "@heroui/react";
import { RawWidget } from "@/components/Metar_Taf/RawWidget";
import { SpecificWidget } from "@/components/Metar_Taf/SpecificWidget";
import { Clock, Wind, Eye, Thermometer, Gauge, Cloud } from 'lucide-react';

export function Metar() {
  return (
    <div className="rounded-md bg-[var(--card)] border border-border mb-10 p-6 space-y-6 w-[50%]">

        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold tracking-wider">METAR</h3>
            <Chip color="accent" variant="soft" className="rounded-md px-5">
                <Chip.Label className="text-lg">Airport</Chip.Label>
            </Chip>
        </div>

        <div className="grid grid-cols-3 gap-4">
            <RawWidget title={"RAW"} description={"KJFK 251200Z 28012G20KT 10SM FEW025 SCT250 22/13 A2995 RMK AO2 SLP142 T02220133"} />
            <SpecificWidget icon={Clock} title={"TIME"} description={"Feb 26, 2026"} detail={"18h00 UTC"}/>
            <SpecificWidget icon={Wind} title={"WIND"} description={"280° at 12 kt"} detail={"Gusts to 20 kt"}/>
            <SpecificWidget icon={Eye} title={"VISIBILITY"} description={"10 km"} detail={""}/>
            <SpecificWidget icon={Thermometer} title={"TEMPERATURE"} description={"22°C"} detail={"Dewpoint: 13°C"}/>
            <SpecificWidget icon={Gauge} title={"PRESSURE"} description={"1014 hPa"} detail={""}/>
            <SpecificWidget icon={Cloud} title={"WIND"} description={"FEW at 2,500 ft \n SCT at 25,000 ft"} detail={""}/>
        </div>
    </div>
  );
}