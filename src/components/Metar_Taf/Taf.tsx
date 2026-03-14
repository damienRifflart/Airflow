"use client"

import { RawWidget } from "@/components/Metar_Taf/RawWidget";
import { ForecastWidget } from "@/components/Metar_Taf/ForecastWidget";
import { getDate, getDateFromUnix } from "@/components/getDate";
import { SpecificWidget } from "@/components/Metar_Taf/SpecificWidget";
import type { Airport } from "../../../types/airport";
import type { Taf } from "../../../types/taf";
import type { Units } from "../../../types/units";
import { useEffect, useState } from "react";
import { Clock } from 'lucide-react';
import { Chip } from "@heroui/react";


interface TafProps {
    airport: Airport;
    units: Units;
}

export function Taf({ airport, units }: TafProps) {
    const [taf, setTaf] = useState<Taf | null>(null)

    useEffect(() => {
        async function fetchTaf() {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/taf/${airport.icao}`
                )
                const data: Taf[] = await response.json()
                setTaf(data[0])
            } catch (error) {
                console.error("Error when fetching Taf", error)
            }
        }
    
        if (airport?.icao) {
            fetchTaf()
        }
    }, [airport])

    return (
        <div className="rounded-md bg-card border border-border p-6">

            <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold tracking-wider">TAF</h3>
                {airport && (
                <Chip color="accent" variant="soft" className="rounded-md px-5">
                    <Chip.Label className="text-lg">
                    {airport.icao}
                    </Chip.Label>
                </Chip>
                )}
            </div>

            {taf ? (
                    <div className="flex flex-col gap-3">
                        <RawWidget title={"RAW"} description={taf?.rawTAF}/>
                        <div className="flex flex-row gap-3">
                            <div className="flex-1"><SpecificWidget icon={Clock} title="ISSUED AT" description={getDate(new Date(taf?.issueTime))[0]} detail={getDate(new Date(taf?.issueTime))[1]} /></div>
                            <div className="flex-1"><SpecificWidget icon={Clock} title="VALID FROM" description={getDateFromUnix(taf?.validTimeFrom)[0]} detail={getDateFromUnix(taf?.validTimeFrom)[1]} /></div>
                            <div className="flex-1"><SpecificWidget icon={Clock} title="VALID TO" description={getDateFromUnix(taf?.validTimeTo)[0]} detail={getDateFromUnix(taf?.validTimeTo)[1]} /></div>
                        </div>
                        <h3 className="text-md text-muted-foreground mt-5 mb-2">DECODED FORECAST</h3>
                        {taf?.fcsts?.map((forecast, index) => (
                            <ForecastWidget key={index} forecast={forecast} units={units} />
                        ))}
                    
                    </div>
                ) : airport?.icao ? (
                    <h3 className="text-lg">No Taf found for {airport.icao}.</h3>
                ) : (
                    <h3 className="text-lg">No airport selected.</h3>
                )
            }
        </div>
    );
}