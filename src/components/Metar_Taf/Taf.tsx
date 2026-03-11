"use client"

import { Chip } from "@heroui/react";
import { RawWidget } from "@/components/Metar_Taf/RawWidget";
import { ForecastWidget } from "@/components/Metar_Taf/ForecastWidget";
import { Clock } from 'lucide-react';
import type { Airport } from "../../../types/airport";
import type { Taf } from "../../../types/taf";
import { useEffect, useState } from "react";
import { SpecificWidget } from "@/components/Metar_Taf/SpecificWidget";
import type { Units } from "../../../types/units";

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
                    `http://localhost:8000/taf/${airport.icao}`
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

    const getDateFromUnix = (unix: number): [string, string] => {
        const date = new Date(unix * 1000);
        const optionsDate: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
        const optionsHour: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' };
        return [date.toLocaleString('en-US', optionsDate), date.toLocaleString('en-US', optionsHour)];
    }

    const getDate = (date1: string): [string, string] => {
        const date = new Date(date1);
        const month = date.toLocaleString("en-US", {month: "short", timeZone: "UTC"});
        const dayString = `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
        const hourString = `${date.getUTCHours().toString().padStart(2, "0")}h${date.getUTCMinutes().toString().padStart(2, "0")} UTC`;
        return [dayString, hourString];
    };

    return (
        <div className="rounded-md bg-card border border-border mb-10 p-6 space-y-2">

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
                            <div className="flex-1"><SpecificWidget icon={Clock} title="ISSUED AT" description={taf ? `${getDate(taf.issueTime)[0]}` : "Undefined"} detail={taf ? `${getDate(taf.issueTime)[1]}` : "Undefined"} /></div>
                            <div className="flex-1"><SpecificWidget icon={Clock} title="VALID FROM" description={taf ? `${getDateFromUnix(taf?.validTimeFrom)[0]}` : "Undefined"} detail={taf ? `${getDateFromUnix(taf?.validTimeFrom)[1]}` : "Undefined"} /></div>
                            <div className="flex-1"><SpecificWidget icon={Clock} title="VALID TO" description={taf ? `${getDateFromUnix(taf?.validTimeTo)[0]}` : "Undefined"} detail={taf ? `${getDateFromUnix(taf?.validTimeTo)[1]}` : "Undefined"} /></div>
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