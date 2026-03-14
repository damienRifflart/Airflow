"use client"

import { TempChart } from '@/components/Charts/TempChart';
import { WindChart } from '@/components/Charts/WindChart';
import { PressureChart } from '@/components/Charts/PressureChart';
import { VisibilityChart } from '@/components/Charts/VisibilityChart';
import { convertTemperature, convertSpeed, convertDistance } from "@/components/unitConversions";
import { useEffect, useState } from 'react';
import type { Metar } from "../../../types/metar";
import type { Airport } from "../../../types/airport";
import type { Units } from '../../../types/units';
import type { TempDataPoint, WindDataPoint, PressureDataPoint, VisibilityDataPoint } from '../../../types/charts';

interface ChartsProps {
    airport: Airport;
    units: Units;
}

export function Charts({ airport, units}: ChartsProps) {
    const [tempList, setTempList] = useState<TempDataPoint[]>([]);
    const [windList, setWindList] = useState<WindDataPoint[]>([]);
    const [pressureList, setPressureList] = useState<PressureDataPoint[]>([]);
    const [visibilityList, setVisibilityList] = useState<VisibilityDataPoint[]>([]);

    useEffect(() => {
        async function fetchMetarHistory() {
            if (!airport?.icao) return;

            try {
                const response = await fetch(
                    `http://localhost:8000/api/metarhistory/${airport.icao}`
                );
                const data: Metar[] = (await response.json()).reverse();

                const tempData = data.map(m => ({
                    reportTime: new Date(m.reportTime),
                    temperature: parseFloat(convertTemperature(m.temp, "°C", units.temperature) as string),
                    dewpoint: parseFloat(convertTemperature(m.dewp, "°C", units.temperature) as string)
                }));
                setTempList(tempData);
                const windData = data.map(m => ({
                    reportTime: new Date(m.reportTime),
                    windspeed: parseFloat(convertSpeed(m.wspd, "Kt", units.speed) as string),
                    gusts: m.wgst ? parseFloat(convertSpeed(m.wgst, "Kt", units.speed) as string) : 0
                }));
                setWindList(windData.filter((d) => new Date(d.reportTime).getHours() % 6 === 0));
                const pressureData = data.map(m => ({
                    reportTime: new Date(m.reportTime),
                    pressure: m.altim
                }));
                setPressureList(pressureData);
                const visibilityData = data.map(m => ({
                    reportTime: new Date(m.reportTime),
                    visibility: m.visib === "6+" ? convertDistance("6", "mi", units.distance) : convertDistance(m.visib, "mi", units.distance)
                }))
                setVisibilityList(visibilityData);

            } catch (error) {
                console.error("Error when fetching Metar history", error);
            }
        }

        fetchMetarHistory();
    }, [airport]);

    return (
        <div>
            <h3 className='text-2xl font-semibold tracking-wider mb-1'>Weather Trends</h3>
            <p className="text-sm text-muted-foreground mb-10">Historical data from the past seven days</p>

            <div className="flex flex-col gap-5">
                <div className="bg-card p-6 rounded-md border border-border">
                    <TempChart data={tempList} title="Temperature & Dewpoint" units={units} />
                </div>

                <div className="bg-card p-6 rounded-md border border-border">
                    <PressureChart data={pressureList} title="Atmospheric pressure" />
                </div>

                <div className="bg-card p-6 rounded-md border border-border">
                    <WindChart data={windList} title="Wind Speed & Gusts" units={units} />
                </div>

                <div className="bg-card p-6 rounded-md border border-border">
                    <VisibilityChart data={visibilityList} title="Visibility" units={units} />
                </div>
            </div>
        </div>
    )
}