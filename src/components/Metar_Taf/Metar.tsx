"use client"

import { RawWidget } from "@/components/Metar_Taf/RawWidget";
import { SpecificWidget } from "@/components/Metar_Taf/SpecificWidget";
import { convertTemperature, convertSpeed, convertDistance } from "@/components/unitConversions";
import { getDate } from "@/components/getDate";
import type { Airport } from "../../../types/airport";
import type { Metar } from "../../../types/metar";
import type { Units } from "../../../types/units";
import { Chip } from "@heroui/react";
import { useEffect, useState } from "react";
import { Clock, Wind, Eye, Thermometer, Gauge, Cloud, ReceiptText } from 'lucide-react';

interface MetarProps {
    airport: Airport;
    units: Units;
}

export function Metar({ airport, units }: MetarProps) {
    const [metar, setMetar] = useState<Metar | null>(null)

    useEffect(() => {
        async function fetchMetar() {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/metar/${airport.icao}`
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

    const windStr = metar?.wdir && metar?.wspd
        ? (metar?.wdir === "VRB"
            ? `Variable at ${convertSpeed(metar?.wspd, "Kt", units.speed)} ${units.speed}}`
            : `${metar?.wdir}° at ${convertSpeed(metar?.wspd, "Kt", units.speed)} ${units.speed}`
        )
        : "None";
    const gustsStr = metar?.wgst ? `Gusts to ${convertSpeed(metar.wgst, "Kt", units.speed)} ${units.speed}` : "";
    const cloudsStr = metar?.clouds ?.map(cloud => `${cloud.cover}${cloud.base ? ` at ${convertDistance(cloud.base, "ft", units.distance)} ${units.distance}` : ""}`).join("\n") || "None";
    const visibStr = metar?.visib ? (metar?.visib === "6+" ? `${convertDistance(10000, "m", units.distance)} ${units.distance} +` : `${convertDistance(metar?.visib, "mi", units.distance)} ${units.distance}`) : "Not specified";
    const tempStr = metar?.temp ? `${convertTemperature(metar?.temp, "°C", units.temperature)} ${units.temperature}` : "Not specified";
    const dewP = metar?.dewp ? `Dewpoint: ${convertTemperature(metar?.dewp, "°C", units.temperature)} ${units.temperature}` : "Not specified";

    return (
        <div className="rounded-md bg-card border border-border p-6">

            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold tracking-wider">METAR</h3>
                {airport && (
                <Chip color="accent" variant="soft" className="rounded-md px-5">
                    <Chip.Label className="text-lg">
                        {airport.icao}
                    </Chip.Label>
                </Chip>
                )}
            </div>

            {metar ? (
                    <div className="grid grid-cols-3 gap-3">
                        <RawWidget title="RAW" description={metar?.rawOb} />
                        <SpecificWidget icon={Clock} title="ISSUED AT" description={getDate(new Date(metar.reportTime))[0]} detail={getDate(new Date(metar.reportTime))[1]} />
                        <SpecificWidget icon={Wind} title="WIND" description={windStr} detail={gustsStr} />
                        <SpecificWidget icon={Eye} title="VISIBILITY" description={visibStr} detail="" />
                        <SpecificWidget icon={Thermometer} title="TEMPERATURE" description={tempStr} detail={dewP} />
                        <SpecificWidget icon={Gauge} title="PRESSURE" description={`${metar?.altim} hPa`} detail="" />
                        <SpecificWidget icon={Cloud} title="CLOUD" detail="" description={cloudsStr} />
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