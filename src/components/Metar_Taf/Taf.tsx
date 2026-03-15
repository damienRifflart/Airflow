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
import { Chip, Skeleton } from "@heroui/react";


interface TafProps {
    airport: Airport;
    units: Units;
}

export function Taf({ airport, units }: TafProps) {
    const [taf, setTaf] = useState<Taf | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchTaf() {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `/api/taf/${airport.icao}`
                )
                const data: Taf[] = await response.json()
                setTaf(data[0])
            } catch (error) {
                console.error("Error when fetching Taf", error)
            } finally {
                setIsLoading(false);
            }
        }
    
        if (airport?.icao) fetchTaf();
    }, [airport])

    if (!airport?.icao) {
        return (
            <div className="rounded-md bg-card border border-border p-6">
                <h3 className="text-2xl font-semibold tracking-wider mb-3">TAF</h3>
                <h3 className="text-lg">No airport selected.</h3>
            </div>
        );
    }

    return (
        <div className="rounded-md bg-card border border-border p-6">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-2xl font-semibold tracking-wider">TAF</h3>
                {airport && (
                <Chip color="accent" variant="soft" className="rounded-md px-5">
                    <Chip.Label className="text-lg">
                    {airport.icao}
                    </Chip.Label>
                </Chip>
                )}
            </div>

            {isLoading ? (
                    <div className="flex flex-col gap-3">
                        <div className="bg-background col-span-3 flex flex-col gap-3 border border-border rounded-md p-6">
                            <Skeleton className="h-4 w-16 rounded-md" />
                            <Skeleton className="h-4 w-full rounded-md" />
                            <Skeleton className="h-4 w-3/4 rounded-md" />
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex-1 bg-background flex flex-col gap-3 border border-border rounded-md p-6">
                                    <div className="flex flex-row gap-3 items-center">
                                        <Skeleton className="h-5 w-5 rounded-md" />
                                        <Skeleton className="h-4 w-24 rounded-md" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Skeleton className="h-5 w-3/4 rounded-md" />
                                        <Skeleton className="h-4 w-1/2 rounded-md" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Skeleton className="h-4 w-48 rounded-md mt-5 mb-2" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="bg-background flex flex-col gap-3 border border-border rounded-md p-5">
                                <div className="flex flex-row gap-3 items-center">
                                    <Skeleton className="h-5 w-5 rounded-md" />
                                    <Skeleton className="h-4 w-2/3 rounded-md" />
                                </div>
                                <Skeleton className="h-5 w-1/3 rounded-md" />
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {Array.from({ length: 3 }).map((_, j) => (
                                        <div key={j} className="flex flex-col gap-1">
                                            <div className="flex flex-row gap-3 items-center">
                                                <Skeleton className="h-5 w-5 rounded-md" />
                                                <Skeleton className="h-4 w-16 rounded-md" />
                                            </div>
                                            <Skeleton className="h-5 w-3/4 rounded-md" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : !taf ? (
                    <h3 className="text-lg">No Taf found for {airport.icao}.</h3>
                ) : (
                    <div className="flex flex-col gap-3">
                        <RawWidget title={"RAW"} description={taf?.rawTAF}/>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            <div><SpecificWidget icon={Clock} title="ISSUED AT" description={getDate(new Date(taf?.issueTime))[0]} detail={getDate(new Date(taf?.issueTime))[1]} /></div>
                            <div><SpecificWidget icon={Clock} title="VALID FROM" description={getDateFromUnix(taf?.validTimeFrom)[0]} detail={getDateFromUnix(taf?.validTimeFrom)[1]} /></div>
                            <div><SpecificWidget icon={Clock} title="VALID TO" description={getDateFromUnix(taf?.validTimeTo)[0]} detail={getDateFromUnix(taf?.validTimeTo)[1]} /></div>
                        </div>
                        <h3 className="text-md text-muted-foreground mt-5 mb-2">DECODED FORECAST</h3>
                        {taf?.fcsts?.map((forecast, index) => (
                            <ForecastWidget key={index} forecast={forecast} units={units} />
                        ))}
                    </div>
                )
            }
        </div>
    );
}