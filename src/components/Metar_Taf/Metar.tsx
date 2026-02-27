"use client"

import { Chip } from "@heroui/react";
import { RawWidget } from "@/components/Metar_Taf/RawWidget";
import { SpecificWidget } from "@/components/Metar_Taf/SpecificWidget";
import { Clock, Wind, Eye, Thermometer, Gauge, Cloud, ReceiptText } from 'lucide-react';
import type { Airport } from "../../../types/airport";
import type { Metar } from "../../../types/metar";
import { useEffect, useState } from "react";

interface MetarProps {
  airport: Airport;
}

export function Metar({airport}: MetarProps) {
    const [metar, setMetar] = useState<Metar | null>(null)

    useEffect(() => {
        async function fetchMetar() {
            try {
                const response = await fetch(
                    `http://localhost:8000/metar/${airport.icao}`
                )
                const data: Metar[] = await response.json()
                setMetar(data[0])
            } catch (error) {
                console.error("Error when fetching Metar", error)
            }
        }

        if (airport?.icao) {
            fetchMetar()
        }
    }, [airport])

    const getDate = (metar: Metar): [string, string] => {
        const date = new Date(metar.reportTime);
        const month = date.toLocaleString("en-US", {month: "short", timeZone: "UTC"});
        const dayString = `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
        const hourString = `${date.getUTCHours().toString().padStart(2, "0")}h${date.getUTCMinutes().toString().padStart(2, "0")} UTC`;
        return [dayString, hourString];
    };

    return (
        <div className="rounded-md bg-[var(--card)] border border-border mb-10 p-6 space-y-6 w-[50%]">

            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold tracking-wider">METAR</h3>
                {airport && (
                <Chip color="accent" variant="soft" className="rounded-md px-5">
                    <Chip.Label className="text-lg">
                    {metar?.icaoId}
                    </Chip.Label>
                </Chip>
                )}
            </div>

            {metar ? (
                    <div className="grid grid-cols-3 gap-3">
                        <RawWidget title="RAW" description={metar?.rawOb} />
                        <SpecificWidget icon={Clock} title="ISSUED AT" description={metar ? `${getDate(metar)[0]}` : "Undefined"} detail={metar ? `${getDate(metar)[1]}` : "Undefined"} />
                        <SpecificWidget icon={Wind} title="WIND" description={`${metar?.wdir}° at ${metar?.wspd} kt`}
                                    detail={metar?.wgst != null ? `Gusts to ${metar.wgst} kt` : ""} />
                        <SpecificWidget icon={Eye} title="VISIBILITY" description={`${metar?.visib} miles`} detail="" />
                        <SpecificWidget icon={Thermometer} title="TEMPERATURE" description={`${metar?.temp}°C`} detail={`Dewpoint: ${metar?.dewp}°C`} />
                        <SpecificWidget icon={Gauge} title="PRESSURE" description={`${metar?.altim} hpa`} detail="" />
                        <SpecificWidget icon={Cloud} title="CLOUD" detail="" description={
                            metar?.clouds?.length
                                ? metar.clouds.map(c => `${c.cover} at ${c.base} ft`).join("\n")
                                : "No clouds"
                            }
                        />
                        <SpecificWidget icon={ReceiptText} title="CONDITIONS" description={`${metar?.fltCat}`} detail="" />
                    </div>
                ) : airport?.icao ? (
                    <h3 className="text-lg">No Metar found for {airport.icao}.</h3>
                ) : (
                    <h3 className="text-lg">No airport selected.</h3>
                )
            }
        </div>
    );
}